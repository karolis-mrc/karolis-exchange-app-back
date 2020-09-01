const Koa = require('koa');
const Router = require('koa-router');
const jwt = require('jsonwebtoken');
const cors = require('@koa/cors');
const fetcher = require('./fetcher');
const {OAuth2Client} = require('google-auth-library');
const bodyParser = require('koa-bodyparser');
const { use } = require('passport');

const app = new Koa();
app.use(cors());
app.use(bodyParser());
const router = new Router();

const CLIENT_ID = '111244544025-fuilllp04thvdu6np56uurcpgjvq6jld.apps.googleusercontent.com';

const client = new OAuth2Client(CLIENT_ID);
async function verify(token) {
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID
  });
}

app.use( async function(ctx, next) {
    const {authorization} = ctx.request.headers;
    const token = authorization.split(' ')[1];
    const decoded = jwt.decode(token);
    await verify(token);
    return next();
});

router.get('/rates', async (ctx) => {
    ctx.body = await fetcher.getRates();
});

router.post('/log', async (ctx) => {
    const {authorization} = ctx.request.headers;
    const toke = authorization.split(' ')[1];
    const decode = jwt.decode(toke);
    let userId = decode.sub;
    userId = await fetcher.storeUser(userId);
});

router.get('/', (ctx) => {
    ctx.body = 'Hello from server';
});

const port = process.env.PORT;
console.log(`Your port is ${port}`);

app.use(router.routes());
app.listen(process.env.PORT || 5000);