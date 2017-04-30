import path from 'path';

import express from 'express';
import session from 'express-session';

import passport from 'passport';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

import handlebars from 'express-handlebars';

import config from '../config';
import Oauth from './modules/oauth';
import Routes from './routes';

const app = express();
const oauth = new Oauth(config.get('oauth'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session({
  secret: '529D411F1F86A51201B0205F68AA3BFC40B508B5FBFEEB369E3E676782CBD4D3',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.engine('handlebars', handlebars({
  layoutsDir: path.join(__dirname, '/views/layouts'),
  partialsDir: path.join(__dirname, '/views/partials'),
  helpers: {
    dateFormat: timestamp => `<span class='dateFormat'>${timestamp}</span>`
  }
}));

app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

passport.use(oauth.getStrategy());

(new Routes()).init(app, passport);
app.use(express.static(path.join(__dirname, './static'), {extensions: ['html']}));

app.listen(3000, function () {
  console.log('App listening on port 3000!');
});