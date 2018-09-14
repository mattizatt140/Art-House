const express       = require('express');
const mongoose      = require('mongoose');
const passport      = require('passport');
const flash         = require('connect-flash');
const morgan        = require('morgan');
const cookieParser  = require('cookie-parser');
const bodyParser    = require('body-parser');
const session       = require('express-session');
const path          = require('path');
const configDB      = require('./config/database');
mongoose.connect(configDB.url, {useNewUrlParser: true});

require('./config/passport')(passport);

let app = express();

app.use(express.static(path.join(__dirname, '../client/dist/ArtHouse/')));
app.set('views', path.join(__dirname, '../client/dist/ArtHouse/'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// Set middleware
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Set passport
app.use(session({
    secret: 'adi23nx0sc1adoi201s0so',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./routes/index')(app, passport);

module.exports = app;
