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
    // Inizializza database SQLite
    await initDatabase();

    // Middleware globali
    app.use(cors(corsOptions));
    app.use(morgan('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(requestLogger);

    // Serve static files (uploads)
    app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

    // Routes base
    app.get('/', (req, res) => {
      res.send('🏠 Server Fides è attivo!');
    });

    // API Routes
    app.use('/api', apiRoutes);

    // 404 handler
    app.use(notFound);

    // Error handler (SEMPRE PER ULTIMO!)
    app.use(errorHandler);

    // Graceful shutdown
    process.on('SIGINT', async () => {
      console.log('\n🛑 Shutting down server...');
      await closeDatabase();
      process.exit(0);
    });

    // Start server
    app.listen(PORT, () => {
      console.log(`\n✅ Server Fides avviato su http://localhost:${PORT}`);
      console.log(`📋 API Health: http://localhost:${PORT}/api/health`);
      console.log(`🏠 Properties: http://localhost:${PORT}/api/properties`);
      console.log(`📁 Uploads: http://localhost:${PORT}/uploads`);
      console.log(`🗄️ Database: SQLite inizializzato\n`);
    });

  } catch (error) {
    console.error('❌ Errore nell\'avvio del server:', error);
    process.exit(1);
  }
}

startServer();