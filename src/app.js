require('dotenv').config();
const express = require('express');
const passport = require('passport');
const expressSession = require('express-session');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT;
const userRoutes = require('./routes/userRoute');
const tasksRoutes = require('./routes/taskRoute');
const { initializingPassport } = require('./middlewares/userLogin');

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(expressSession({
    secret: 'my-secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 6 * 60 * 60 * 1000,
    }
}));
app.use(passport.session());

mongoose.connect(process.env.DB_URI);
const db = mongoose.connection;

db.on('connected', () => {
    console.log('connected to mongodb');
});

db.on('error', (err) => {
    console.log('connections err', err);
});

initializingPassport(passport);

app.use('/user', userRoutes);
app.use('/task', tasksRoutes);

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});