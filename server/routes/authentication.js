module.exports = (app, passport) => {
    app.post('/authenticate/register', (req, res, next) => {
        passport.authenticate('local-register', (err, user, info) => {
            if (err) return next(err);
            if (!user) return res.json({success: false, msg: info, redirect: null});
            req.logIn(user, (err) => {
                if (err) return next(err);
                return res.json({success: true, msg: 'Successful Registration', redirect: '/feed'});
            });
        })(req, res, next);
    });
      
    app.post('/authenticate/login', (req, res, next) => {
        passport.authenticate('local-login', (err, user, info) => {
            if (err) return next(err);
            if (!user) return res.json({success: false, msg: info, redirect: null});
            req.logIn(user, (err) => {
                if (err) return next(err);
                return res.json({success: true, msg: null, redirect: '/feed'});
            });
        })(req, res, next);
    });
}