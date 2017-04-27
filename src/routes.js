class Routes {
  init(app, passport) {
    this.passport = passport;

    app.get('/', (req, res, next) => {
      if (req.query.code) {
        return this._authenticateCallback(req, res, next);
      }
      return res.render('index', {isAuthenticated: req.isAuthenticated()});
    });

    app.get('/profile', this._ensureAuthenticated(), (req, res) => {
      return res.render('profile', JSON.parse(req.user));
    });

    app.get('/login', passport.authenticate('oauth2'));

    passport.serializeUser(this._serializer);
    passport.deserializeUser(this._serializer);

  }

  _serializer(user, done) {
    done(null, user);
  }

  _ensureAuthenticated() {
    return (req, res, next) => {
      if (req.isAuthenticated()) {
        return next();
      }
      return res.redirect('/login');
    };
  }

  _authenticateCallback(req, res, next) {
    this.passport.authenticate('oauth2', function (err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.redirect('/');
      }
      req.login(user, function (err) {
        if (err) {
          return next(err);
        }
        return res.redirect('/profile');
      });
    })(req, res, next);
  }
}

export default Routes;