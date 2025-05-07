const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const app = require('./app');

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ Conectado a MongoDB');
  app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));
})
.catch(err => {
  console.error('❌ Error al conectar a MongoDB:', err.message);
  process.exit(1);
});
