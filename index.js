/*******************************************************************************
 * Feel free to remove this comment block and all other comments after pulling. 
 * They're for information purposes only.
 * 
 * This layout is provided to you for an easy and quick setup to either pull
 * or use to correct yours after working at least 1 hour on Team Activity 02.
 * Throughout the course, we'll be using Express.js for our view engines.
 * However, feel free to use pug or handlebars ('with extension hbs'). You will
 * need to make sure you install them beforehand according to the reading from
 * Udemy course. 
 * IMPORTANT: Make sure to run "npm install" in your root before "npm start"
 *******************************************************************************/
// Our initial setup (package requires, port number setup)
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const PORT = process.env.PORT || 5000 // So we can run on heroku || (OR) localhost:5000
const cors = require('cors');
const corsOptions = require('./util/database').corsOptions;
const options = require('./util/database').options;
const mongoose = require('mongoose');
const MONGODB_URL = process.env.MONGODB_URL || 'mongodb+srv://mongo341:mongo341@cluster0-j1hjj.mongodb.net/shop?retryWrites=true&w=majority';
const MONGODB_URI = 'mongodb+srv://mongo341:mongo341@cluster0-j1hjj.mongodb.net/shop';
const session = require('express-session');
const mongodbStore = require('connect-mongodb-session')(session);


const app = express();

const store = new mongodbStore({
  uri:MONGODB_URI,
  collection: 'sessions'
});  

const User = require(path.join(path.dirname(process.mainModule.filename), 'basicsApp','model','user.js'));

// Route setup. You can implement more in the future!
const ta01Routes = require('./controllers/routes/ta01');
const ta02Routes = require('./controllers/routes/ta02');
const ta03Routes = require('./controllers/routes/ta03'); 
const ta05Routes = require('./controllers/routes/ta05');
const pa02Routes = require('./controllers/routes/pa02'); 
const pa03Routes = require('./basicsApp/basicsApp');

app.use(express.static(path.join(__dirname, 'public')))
   .set('views', path.join(__dirname, 'views'))
   .set('view engine', 'ejs')
   // For view engine as Pug
   //.set('view engine', 'pug') // For view engine as PUG. 
   // For view engine as hbs (Handlebars)
   //.engine('hbs', expressHbs({layoutsDir: 'views/layouts/', defaultLayout: 'main-layout', extname: 'hbs'})) // For handlebars
   //.set('view engine', 'hbs')
   .use(bodyParser({extended: false})) // For parsing the body of a POST
   .use(session({secret:"team secret", resave:false, saveUninitialized:false, store:store}))
   .use((req, res, next) => {
    if (!req.session.user) {
      return next();
    }
    User.findById(req.session.user._id)
    .populate('cart.items.productID')
      .then(user => {        
        req.user = user;
        
        next();
      })
      .catch(e => console.log(e));
  })
   .use('/ta01', ta01Routes)
   .use('/ta02', ta02Routes) 
   .use('/ta03', ta03Routes) 
   .use('/ta05', ta05Routes)
   .use('/pa02', pa02Routes)
   .use('/basicsApp', pa03Routes)
   
   
   
   




   .get('/', (req, res, next) => {
     // This is the primary index, always handled last. 
     res.render('pages/index', {title: 'Welcome to my CSE341 repo', path: '/'});
    })
   .use((req, res, next) => {
     // 404 page
     res.render('pages/404', {title: '404 - Page Not Found', path: req.url})
   });
//cors configuration
app.use(cors(corsOptions));




mongoose
  .connect(
    MONGODB_URL, options
  )
  .then(result => {
    app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
  })
  .catch(err => {
    console.log(err);
  });

   