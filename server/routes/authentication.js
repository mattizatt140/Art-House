module.exports = (app, passport) => {
    app.post('/register', (req, res, next) => {
        passport.authenticate('local-register', (err, user, info) => {
            if (err) return next(err);
            if (!user) return res.json({success: false, msg: info});
            req.logIn(user, (err) => {
                if (err) return next(err);
                return res.json({success: true, redirect: '/feed'});
            });
        })(req, res, next);
    });
      
    app.post('/login', (req, res, next) => {
        passport.authenticate('local-login', (err, user, info) => {
            if (err) return next(err);
            if (!user) return res.json({success: false, msg: info});
            req.logIn(user, (err) => {
                if (err) return next(err);
                return res.json({success: true, redirect: '/feed'});
            });
        })(req, res, next);
    });
}