const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const keys = require('../config/keys');
const mongoose = require('mongoose');
const User = mongoose.model('user');

const option = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: keys.jwt
}

module.exports = passport => {
    passport.use(
        new JwtStrategy(option, async (payload, done) => {
            
            try {
                const user = await User.findOne(payload.userid).select('login id');
                
                if(user) {
                    done(null, user);
                } else {
                    done(null, false);
                }
            } catch(err) {
                console.log(err);
            }
        })
    )
}