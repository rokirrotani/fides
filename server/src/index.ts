import express from 'express';

const app = express();

app.use(express.json());

// Rotta di test
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

app.get('/', (_req, res) => {
  res.send('Server Fides è attivo!');
});

// Avvio server
app.listen(4000, () => {
  console.log("✅ Server Fides avviato su http://localhost:4000");
});
