const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const dishRoutes = require('./src/routes/dishes')

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware function
function loggerMiddleware(req, res, next) {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next(); // Call the next middleware function in the stack
}

app.use(cors());
app.use(loggerMiddleware)
app.use(express.json());
app.use(dishRoutes);

app.listen(PORT, () => {
    console.log("Server is running...");
});

console.log('Exiting')