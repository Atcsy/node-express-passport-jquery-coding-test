class Routes {
  init(app, passport) {
    this.passport = passport;

    app.get('/', (req, res, next) => {
      if (req.query.code) {
        return this._authenticateCallback(req, res, next);
      }
      return res.render('index', {
        isAuthenticated: req.isAuthenticated(),
        renderedAt: new Date().toISOString()
      });
    });

    app.get('/profile',
      this._ajaxOnly(),
      (req, res, next) => {
      return res.render('profile', {user: this._safeJSONParse(req.user)});
    });

    app.get('/login',
      this._ensureAuthenticated(),
      (req, res, next) => {
        return res.redirect('/');
      }
    );

    passport.serializeUser(this._serializer);
    passport.deserializeUser(this._serializer);

  }

  _ajaxOnly() {
    return (req, res, next) => {
      if(req.get('X-Requested-With') !== 'XMLHttpRequest') {
        return res.redirect('/');
      }
      return next();
    }
  }

  _safeJSONParse(input) {
    try {
      return JSON.parse(input);
    } catch(e) {
      return null;
    }
  }

  _serializer(user, done) {
    done(null, user);
  }

  _ensureAuthenticated() {
    return (req, res, next) => {
      if (req.isAuthenticated()) {
        return next();
      }
      this.passport.authenticate('oauth2')(req, res, next);
    };
  }

  _authenticateCallback(req, res, next) {
    this.passport.authenticate('oauth2', function (err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return next(user);
      }
      req.login(user, function (err) {
        if (err) {
          return next(err);
        }
        return res.redirect('/');
      });
    })(req, res, next);
  }
}

export default Routes;