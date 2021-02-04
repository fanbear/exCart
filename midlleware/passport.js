const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../model/User');
const bcrypt = require('bcrypt');   

passport.serializeUser(function(user, done) {
    console.log('Сеарилизация', user);
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    console.log('Десеарилизация', id);
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

passport.use(new LocalStrategy({usernameField: 'login'},
    async function(login, password, done) {
        
        const user = await User.findOne({ login: login });
        console.log(user);
        if (user) {
            const passwordTrigger = bcrypt.compareSync(password, user.password);

            if (passwordTrigger) {
                return done(null, user);
            } else {
                return done(null, false, { message: 'Incorrect password.' });
            }
        } else {
            return done(null, false, { message: 'Incorrect login.' });
        }
        
    }
));