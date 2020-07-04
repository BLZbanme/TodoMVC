const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const { secertKey } = require('../config');

const opts = {
    secretOrKey: secertKey,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}

const User = require('../models/User');


module.exports = passport => {
    passport.use(
        new JwtStrategy(opts, async (jwt_payload, done) => {
            const user = await User.findOne({
                where: {
                    username: jwt_payload.username
                }
            })
            if (user) {
                return done(null, user);
            }
            else {
                return done(null, false);
            }
        })
    )
}