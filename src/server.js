require('dotenv').config();
const app = require('./app');
const connectDB = require('./database/db');

const PORT = process.env.PORT || 5000;

// Start server only after DB connects
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});