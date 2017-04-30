import convict from 'convict';

class Config {
  static load() {
    const config = convict({
      env: {
        doc: "The application environment.",
        format: ["production", "development", "test"],
        default: "development",
        env: "NODE_ENV"
      },
      oauth: {
        authorizationURL: {
          doc: "Authorization URL",
          env: "AUTH_URL",
          format: String,
          default: ""
        },
        tokenURL: {
          doc: "Token URL",
          env: "TOKEN_URL",
          format: String,
          default: ""
        },
        clientID: {
          doc: "Client ID",
          env: "CLIENT_ID",
          format: String,
          default: ""
        },
        clientSecret: {
          doc: "Client secret",
          env: "CLIENT_SECRET",
          format: String,
          default: ""
        },
        callbackURL: {
          doc: "Callback URL",
          env: "CALLBACK_URL",
          format: String,
          default: ""
        },
        userInfoURL: {
          doc: "User API",
          env: "USER_URL",
          format: String,
          default: ""
        }
      }
    });

    const env = config.get('env');
    config.loadFile(`./config/${env}.json`);

    config.validate({allowed: 'strict'});

    return config;
  }
}

export default Config.load();