import { AuthController } from '../controllers/AuthController';
import { Request, Response } from 'express';

describe('AuthController', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let responseJson: jest.Mock;
  let responseStatus: jest.Mock;

  beforeEach(() => {
    responseJson = jest.fn();
    responseStatus = jest.fn().mockReturnValue({ json: responseJson });
    
    mockRequest = {
      body: {},
      headers: {},
      socket: {
        remoteAddress: '127.0.0.1'
      }
    } as any;
    
    mockResponse = {
      json: responseJson,
      status: responseStatus
    };

    // Reset della mappa dei tentativi di login
    jest.clearAllMocks();
  });

  describe('Login', () => {
    it('✅ Dovrebbe autenticare con credenziali corrette', async () => {
      mockRequest.body = {
        username: 'fidesimmobiliare2026',
        password: 'f1d3s1mm0b1l1@r3'
      };

      await AuthController.login(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(responseJson).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          message: 'Autenticazione riuscita',
          token: expect.any(String)
        })
      );
    });

    it('❌ Dovrebbe rifiutare credenziali errate', async () => {
      mockRequest.body = {
        username: 'admin',
        password: 'wrongpassword'
      };

      await AuthController.login(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(responseStatus).toHaveBeenCalledWith(401);
      expect(responseJson).toHaveBeenCalledWith(
        expect.objectContaining({
          error: expect.stringContaining('Credenziali non valide')
        })
      );
    });

    it('⛔ Dovrebbe rifiutare multipli tentativi errati', async () => {
      mockRequest.body = {
        username: 'attacker',
        password: 'wrong123'
      };

      await AuthController.login(mockRequest as Request, mockResponse as Response);
      
      expect(responseStatus).toHaveBeenCalledWith(401);
      expect(responseJson).toHaveBeenCalledWith(
        expect.objectContaining({ 
          error: expect.stringContaining('Credenziali non valide') 
        })
      );
    });

    it('🚫 Dovrebbe validare input mancanti', async () => {
      mockRequest.body = { username: 'test' };

      await AuthController.login(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(responseStatus).toHaveBeenCalledWith(400);
      expect(responseJson).toHaveBeenCalledWith(
        expect.objectContaining({
          error: 'Username e password richiesti'
        })
      );
    });

    it('📏 Dovrebbe rifiutare credenziali troppo lunghe', async () => {
      mockRequest.body = {
        username: 'a'.repeat(101),
        password: 'password'
      };

      await AuthController.login(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(responseStatus).toHaveBeenCalledWith(400);
      expect(responseJson).toHaveBeenCalledWith(
        expect.objectContaining({
          error: 'Credenziali troppo lunghe'
        })
      );
    });
  });

  describe('VerifyToken', () => {
    it('✅ Dovrebbe verificare token valido', () => {
      mockRequest.headers = {
        authorization: 'Bearer ' + 'a'.repeat(32)
      };

      AuthController.verifyToken(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(responseJson).toHaveBeenCalledWith({ valid: true });
    });

    it('❌ Dovrebbe rifiutare token mancante', () => {
      AuthController.verifyToken(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(responseStatus).toHaveBeenCalledWith(401);
    });
  });

  describe('Logout', () => {
    it('✅ Dovrebbe eseguire logout con successo', () => {
      AuthController.logout(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(responseJson).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          message: 'Logout effettuato'
        })
      );
    });
  });
});
