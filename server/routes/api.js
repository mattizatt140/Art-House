module.exports = function(app) {
  app.post('/api/isLoggedIn', (req, res, next) => {
    req.user ? res.send(true) : res.send(false);
  });
};
