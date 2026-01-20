import { verifyAdminCredentials, generatePasswordHash } from '../config/security';

describe('Security Module', () => {
  describe('verifyAdminCredentials', () => {
    it('✅ Dovrebbe verificare credenziali corrette', async () => {
      const result = await verifyAdminCredentials(
        'fidesimmobiliare2026',
        'f1d3s1mm0b1l1@r3'
      );
      expect(result).toBe(true);
    });

    it('❌ Dovrebbe rifiutare username errato', async () => {
      const result = await verifyAdminCredentials(
        'wronguser',
        'f1d3s1mm0b1l1@r3'
      );
      expect(result).toBe(false);
    });

    it('❌ Dovrebbe rifiutare password errata', async () => {
      const result = await verifyAdminCredentials(
        'fidesimmobiliare2026',
        'wrongpassword'
      );
      expect(result).toBe(false);
    });

    it('🔒 Dovrebbe essere case-sensitive per username', async () => {
      const result = await verifyAdminCredentials(
        'FIDESIMMOBILIARE2026',
        'f1d3s1mm0b1l1@r3'
      );
      expect(result).toBe(false);
    });
  });

  describe('generatePasswordHash', () => {
    it('🔐 Dovrebbe generare hash valido', async () => {
      const hash = await generatePasswordHash('testpassword');
      
      expect(hash).toBeDefined();
      expect(hash.length).toBeGreaterThan(50);
      expect(hash).toMatch(/^\$2[aby]\$/); // bcrypt pattern
    });

    it('🎲 Dovrebbe generare hash diversi per stessa password', async () => {
      const hash1 = await generatePasswordHash('samepassword');
      const hash2 = await generatePasswordHash('samepassword');
      
      expect(hash1).not.toBe(hash2);
    });
  });
});
