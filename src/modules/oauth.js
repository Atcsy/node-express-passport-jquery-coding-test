import OAuth2Strategy from 'passport-oauth2';
import request from 'request';

class Oauth {
  constructor(config) {
    this.config = config;
  }

  _getProfile(token) {
    return new Promise((resolve, reject) => {
      request.get(
        {
          url: this.config.userInfoURL,
          headers: {
            'Authorization': `Bearer ${token}`,
            'Cache-Control': 'no-cache'
          }
        },
        function (err, res, body) {
          if (res.statusCode === 200) {
            return resolve(body);
          } else {
            return reject(body);
          }
        }
      );
    });
  }

  getStrategy() {
    return new OAuth2Strategy(this.config,
      (accessToken, refreshToken, profile, cb) => {
        this._getProfile(accessToken)
          .then(profile => {
            return cb(null, profile);
          })
          .catch(err => {
            return cb(err);
          });
      }
    )
  }
}

export default Oauth