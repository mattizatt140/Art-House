var LocalStrategy   = require('passport-local').Strategy;
var User            = require('../models/user');

module.exports = function(passport) {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });

    passport.use('local-register', new LocalStrategy({
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true
    }, (req, username, password, done) => {
            User.findOne({'username' : username}, (err, user) => {
                if (err) {
                    return done(err);
                } else if (user) {
                    return done(null, false, 'Oops! That username is taken');
                } else {
                    var newUser = new User();

                    newUser.username = username;
                    newUser.password = newUser.generateHash(password);

                    newUser.save(err => {
                        if (err) {
                            throw err;
                        }
                        return done(null, newUser);
                    });
                }
            });
        }));

    passport.use('local-login', new LocalStrategy({
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true
    }, (req, username, password, done) => {
        User.findOne({'username' :  username}, (err, user) => {
            if (err) {
                return done(err);
            } else if (!user) {
                return done(null, false, 'Oops! Invalid username');
            } else if (!user.validPassword(password)) {
                return done(null, false, 'Oops! Wrong password.');
            }
            return done(null, user);
        });
    }));
};
