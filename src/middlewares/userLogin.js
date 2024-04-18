const { User } = require('../models/userModel');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

exports.initializingPassport = (passport) => {
    passport.use(new LocalStrategy(async (username, password, done) => {
        try {
            const user = await User.findOne({ username });
            if (!user || !await bcrypt.compare(password, user.password)) {
                return done(null, false, { message: "Incorrect username or password" });
            };
            return done(null, user);
        } catch (error) {
            return done(error, false);
        };
    }));
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id);
            done(null, user);
        } catch (error) {
            done(error, false);
        };
    });
};