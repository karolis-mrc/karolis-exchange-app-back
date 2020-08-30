const Koa = require('koa');
const Router = require('koa-router');
const cors = require('@koa/cors');
const calculator = require('./fetcher');


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


app.use(router.routes());
app.listen(process.env.PORT || 5000);