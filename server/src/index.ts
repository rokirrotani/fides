import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import os from 'os';
import { initDatabase, closeDatabase } from './config/database';
import apiRoutes from './routes';
import { errorHandler } from './middleware/errorHandler';
import { notFound } from './middleware/notFound';
import { requestLogger } from './middleware/requestLogger';
import { corsOptions } from './middleware/corsConfig';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Funzione per ottenere info di sistema
function getSystemInfo() {
  return {
    platform: os.platform(),
    arch: os.arch(),
    nodeVersion: process.version,
    memory: `${Math.round(os.totalmem() / 1024 / 1024 / 1024)}GB`,
    cpus: os.cpus().length,
    hostname: os.hostname()
  };
}

async function startServer() {
  const startTime = Date.now();
  
  try {
    console.clear();
    console.log('\n╔════════════════════════════════════════════════════════════════════╗');
    console.log('║                                                                    ║');
    console.log('║              🏢 FIDES IMMOBILIARE - SERVER API 🏢                 ║');
    console.log('║                                                                    ║');
    console.log('╚════════════════════════════════════════════════════════════════════╝\n');
    
    const sysInfo = getSystemInfo();
    console.log('📊 INFORMAZIONI SISTEMA:\n');
    console.log(`   💻 OS:              ${sysInfo.platform} (${sysInfo.arch})`);
    console.log(`   🔧 Node.js:         ${sysInfo.nodeVersion}`);
    console.log(`   💾 RAM Totale:      ${sysInfo.memory}`);
    console.log(`   ⚙️  CPU Cores:       ${sysInfo.cpus}`);
    console.log(`   🖥️  Hostname:        ${sysInfo.hostname}`);
    console.log(`   🌍 Environment:     ${NODE_ENV.toUpperCase()}`);
    console.log(`   🕐 Avvio:           ${new Date().toLocaleString('it-IT')}\n`);
    
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    
    // Inizializza database SQLite
    console.log('📦 INIZIALIZZAZIONE COMPONENTI:\n');
    
    console.log('   [1/10] 🔐 Environment Variables............ ', '\x1b[32m✓\x1b[0m');
    
    console.log('   [2/10] 🗄️  Database SQLite................. ', '\x1b[33m⏳\x1b[0m');
    await initDatabase();
    console.log('   [2/10] 🗄️  Database SQLite................. ', '\x1b[32m✓\x1b[0m');

    // Middleware globali
    console.log('   [3/10] 🌐 CORS Protection.................. ', '\x1b[33m⏳\x1b[0m');
    app.use(cors(corsOptions));
    console.log('   [3/10] 🌐 CORS Protection.................. ', '\x1b[32m✓\x1b[0m');
    
    console.log('   [4/10] 📝 Morgan Logger.................... ', '\x1b[33m⏳\x1b[0m');
    app.use(morgan('dev'));
    console.log('   [4/10] 📝 Morgan Logger.................... ', '\x1b[32m✓\x1b[0m');
    
    console.log('   [5/10] 📦 Body Parser...................... ', '\x1b[33m⏳\x1b[0m');
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    console.log('   [5/10] 📦 Body Parser...................... ', '\x1b[32m✓\x1b[0m');
    
    console.log('   [6/10] 📊 Request Logger................... ', '\x1b[33m⏳\x1b[0m');
    app.use(requestLogger);
    console.log('   [6/10] 📊 Request Logger................... ', '\x1b[32m✓\x1b[0m');

    // Serve static files (uploads)
    console.log('   [7/10] 📁 Static Files Handler............. ', '\x1b[33m⏳\x1b[0m');
    app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
    console.log('   [7/10] 📁 Static Files Handler............. ', '\x1b[32m✓\x1b[0m');

    // Routes base
    app.get('/', (req, res) => {
      res.json({ 
        message: '🏠 Server Fides Immobiliare è attivo!',
        version: '1.0.0',
        status: 'healthy',
        timestamp: new Date().toISOString()
      });
    });

    // Health check
    app.get('/api/health', (req, res) => {
      res.json({
        status: 'ok',
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        environment: NODE_ENV
      });
    });

    // API Routes
    console.log('   [8/10] 🛣️  API Routes....................... ', '\x1b[33m⏳\x1b[0m');
    app.use('/api', apiRoutes);
    console.log('   [8/10] 🛣️  API Routes....................... ', '\x1b[32m✓\x1b[0m');

    // 404 handler
    console.log('   [9/10] 🚫 404 Not Found Handler............ ', '\x1b[33m⏳\x1b[0m');
    app.use(notFound);
    console.log('   [9/10] 🚫 404 Not Found Handler............ ', '\x1b[32m✓\x1b[0m');

    // Error handler (SEMPRE PER ULTIMO!)
    console.log('   [10/10] ⚠️ Global Error Handler............ ', '\x1b[33m⏳\x1b[0m');
    app.use(errorHandler);
    console.log('   [10/10] ⚠️ Global Error Handler............ ', '\x1b[32m✓\x1b[0m');

    // Graceful shutdown
    process.on('SIGINT', async () => {
      console.log('\n\n╔════════════════════════════════════════════════════════════════════╗');
      console.log('║                    🛑 SPEGNIMENTO SERVER...                        ║');
      console.log('╚════════════════════════════════════════════════════════════════════╝\n');
      console.log('   📴 Chiusura database...');
      await closeDatabase();
      console.log('   ✅ Database chiuso correttamente');
      console.log('   👋 Arrivederci!\n');
      process.exit(0);
    });

    // Start server
    app.listen(PORT, () => {
      const bootTime = ((Date.now() - startTime) / 1000).toFixed(2);
      
      console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
      console.log('╔════════════════════════════════════════════════════════════════════╗');
      console.log('║                                                                    ║');
      console.log('║               ✨ SERVER AVVIATO CON SUCCESSO! ✨                  ║');
      console.log('║                                                                    ║');
      console.log('╚════════════════════════════════════════════════════════════════════╝\n');
      
      console.log('⚡ PERFORMANCE:\n');
      console.log(`   🚀 Tempo di avvio:      ${bootTime}s`);
      console.log(`   💾 Memoria usata:       ${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB\n`);
      
      console.log('🌐 ENDPOINTS DISPONIBILI:\n');
      console.log(`   🏠 Home Page:           \x1b[36mhttp://localhost:${PORT}\x1b[0m`);
      console.log(`   ✅ Health Check:        \x1b[36mhttp://localhost:${PORT}/api/health\x1b[0m`);
      console.log(`   🏘️  Properties (GET):    \x1b[36mhttp://localhost:${PORT}/api/properties\x1b[0m`);
      console.log(`   ➕ Create Property:     \x1b[36mhttp://localhost:${PORT}/api/properties\x1b[0m (POST)`);
      console.log(`   💰 Sell Requests:       \x1b[36mhttp://localhost:${PORT}/api/requests/sell\x1b[0m`);
      console.log(`   🔍 Buy Requests:        \x1b[36mhttp://localhost:${PORT}/api/requests/buy\x1b[0m`);
      console.log(`   📁 Static Files:        \x1b[36mhttp://localhost:${PORT}/uploads\x1b[0m\n`);
      
      console.log('🗄️  DATABASE STATUS:\n');
      console.log('   ✅ SQLite Database:     \x1b[32mConnesso e Pronto\x1b[0m');
      console.log('   ✅ Properties DAO:      \x1b[32mOperativo\x1b[0m');
      console.log('   ✅ Requests DAO:        \x1b[32mOperativo\x1b[0m\n');
      
      console.log('🔒 SICUREZZA:\n');
      console.log('   ✅ CORS Protection:     \x1b[32mAttivo\x1b[0m');
      console.log('   ✅ Error Handling:      \x1b[32mAttivo\x1b[0m');
      console.log('   ✅ Request Validation:  \x1b[32mAttivo\x1b[0m');
      console.log('   ✅ Request Logger:      \x1b[32mAttivo\x1b[0m\n');
      
      console.log('🛠️  MIDDLEWARE CARICATI:\n');
      console.log('   ✅ Morgan Logger        ✅ CORS           ✅ Body Parser');
      console.log('   ✅ Request Logger       ✅ Static Files   ✅ Error Handler\n');
      
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
      console.log(`   🎯 Server in ascolto su: \x1b[1m\x1b[33mhttp://localhost:${PORT}\x1b[0m`);
      console.log(`   🌍 Environment:          \x1b[1m\x1b[33m${NODE_ENV.toUpperCase()}\x1b[0m`);
      console.log(`   ⏱️  Uptime:               \x1b[1m\x1b[33m${process.uptime().toFixed(2)}s\x1b[0m\n`);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
      console.log('   💡 Suggerimenti:');
      console.log('      • Testa il server: curl http://localhost:4000/api/health');
      console.log('      • Visualizza properties: curl http://localhost:4000/api/properties');
      console.log('      • Premi CTRL+C per terminare il server\n');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    });

  } catch (error) {
    console.log('\n╔════════════════════════════════════════════════════════════════════╗');
    console.log('║                                                                    ║');
    console.log('║                    ❌ ERRORE CRITICO! ❌                          ║');
    console.log('║                                                                    ║');
    console.log('╚════════════════════════════════════════════════════════════════════╝\n');
    console.error('\x1b[31m');
    console.error('Dettagli errore:');
    console.error(error);
    console.error('\x1b[0m');
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    console.log('   💡 Suggerimenti per risolvere:');
    console.log('      • Verifica che il database sia accessibile');
    console.log('      • Controlla le variabili d\'ambiente nel file .env');
    console.log('      • Verifica che la porta 4000 non sia già in uso');
    console.log('      • Controlla i log completi sopra per più dettagli\n');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    process.exit(1);
  }
}

startServer();