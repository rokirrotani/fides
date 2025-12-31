import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import { initDatabase, closeDatabase } from './config/database';
import apiRoutes from './routes';
import { errorHandler } from './middleware/errorHandler';
import { notFound } from './middleware/notFound';
import { requestLogger } from './middleware/requestLogger';
import { corsOptions } from './middleware/corsConfig';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

async function startServer() {
  try {
    console.log('\n🚀 Avvio Server Fides Immobiliare...\n');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    // Inizializza database SQLite
    console.log('\n📦 INIZIALIZZAZIONE COMPONENTI:\n');
    console.log('  ✅ Environment variables caricato');
    
    await initDatabase();
    console.log('  ✅ Database SQLite connesso e inizializzato');

    // Middleware globali
    app.use(cors(corsOptions));
    console.log('  ✅ CORS configurato');
    
    app.use(morgan('dev'));
    console.log('  ✅ Morgan logger attivo');
    
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    console.log('  ✅ Body parser configurato');
    
    app.use(requestLogger);
    console.log('  ✅ Request logger personalizzato attivo');

    // Serve static files (uploads)
    app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
    console.log('  ✅ Static files handler configurato');

    // Routes base
    app.get('/', (req, res) => {
      res.send('🏠 Server Fides è attivo!');
    });

    // API Routes
    app.use('/api', apiRoutes);
    console.log('  ✅ API Routes registrate');

    // 404 handler
    app.use(notFound);
    console.log('  ✅ 404 Handler configurato');

    // Error handler (SEMPRE PER ULTIMO!)
    app.use(errorHandler);
    console.log('  ✅ Error Handler globale configurato');

    // Graceful shutdown
    process.on('SIGINT', async () => {
      console.log('\n🛑 Shutting down server...');
      await closeDatabase();
      process.exit(0);
    });
    console.log('  ✅ Graceful shutdown configurato');

    // Start server
    app.listen(PORT, () => {
      console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
      console.log('🎉 SERVER AVVIATO CON SUCCESSO!\n');
      console.log('📍 ENDPOINTS DISPONIBILI:\n');
      console.log(`  🏠 Home:           http://localhost:${PORT}`);
      console.log(`  ✅ Health Check:   http://localhost:${PORT}/api/health`);
      console.log(`  🏘️  Properties:     http://localhost:${PORT}/api/properties`);
      console.log(`  💰 Sell Requests:  http://localhost:${PORT}/api/requests/sell`);
      console.log(`  🔍 Buy Requests:   http://localhost:${PORT}/api/requests/buy`);
      console.log(`  📁 Static Files:   http://localhost:${PORT}/uploads`);
      console.log('\n🗄️  DATABASE:\n');
      console.log('  ✅ SQLite Database: Ready');
      console.log('  ✅ Properties DAO: Ready');
      console.log('  ✅ Requests DAO: Ready');
      console.log('\n🔒 SICUREZZA:\n');
      console.log('  ✅ CORS Protection: Active');
      console.log('  ✅ Error Handling: Active');
      console.log('  ✅ Request Validation: Active');
      console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log(`\n👉 Server in ascolto sulla porta ${PORT}`);
      console.log('👉 Premi CTRL+C per terminare\n');
    });

  } catch (error) {
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    console.error('❌ ERRORE CRITICO nell\'avvio del server:\n');
    console.error(error);
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    process.exit(1);
  }
}

startServer();