require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const todoRoutes = require('./routes/tododb.js')
const port = process.env.PORT;
const db = require('./database/db.js');
const session = require('express-session');
const authRoutes = require('./routes/authRoutes');
const { isAuthenticated } = require('./middleware/middlewares.js');


// Set folder views untuk EJS
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET, // Gunakan secret key yang aman
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Set ke true jika menggunakan HTTPS
}));

app.use('/', authRoutes);

app.use('/todos', isAuthenticated, todoRoutes);
app.set('view engine', 'ejs');
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
}); 