const Koa = require('koa');
const Router = require('koa-router');
const cors = require('@koa/cors');
const calculator = require('./fetcher');
const FacebookStrategy = require('passport-facebook');
const passport = require('passport');

const FACEBOOK_APP_ID = "361813864814408";
const FACEBOOK_APP_SECRET = "158550e4f295e02aaacafcf2426d605c";

const app = new Koa();
app.use(cors());
const router = new Router();

router.get('/rates', async (ctx) => {
    ctx.body = await calculator.getRates();
})

// router.get('/endpoint', async (ctx) => {
//     // console.log(ctx.request.query);
//     ctx.body = process.env.dataURL;
// })

router.post('/log', async (ctx) => {
    ctx.body = await calculator.getRates();
})

router.get('/', (ctx) => {
    ctx.body = 'Hello World';
})

passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3000/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ facebookId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

router.get('/auth/facebook',
  passport.authenticate('facebook'));

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/home' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

app.use(router.routes());
app.listen(process.env.PORT || 5000);