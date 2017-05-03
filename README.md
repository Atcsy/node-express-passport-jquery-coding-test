# Express.js + Passport.js OAuth login with jQuery

## Configuration

Create a `development.json` config file in the `config` folder with the following content:
```
{
  "oauth": {
    "authorizationURL": "https://[DOMAIN]/oauth/authorize",
    "tokenURL": "https://[DOMAIN]/oauth/token",
    "clientID": "coding_test",
    "clientSecret": "[SECRET]",
    "callbackURL": "http://localhost:3000",
    "userInfoURL": "https://[DOMAIN]/oauth/userinfo"
  }
}
```

Replace the `[DOMAIN]` and  `[SECRET]` placeholders with your data.

# Installation

Run `npm install`

# Usage

Run `node server.js` and navigate to [http://localhost:3000](http://localhost:3000) in your browser.

# Docker

To run the project in Docker, simply run the following commands:
```
docker build -t coding-test .
docker run -it --rm -p 3000:3000 coding-test
```

To stop it, simply CTRL+C it, or use `docker kill` command.

# Notes
Installed babel to be able to use ES6 `import`s. 