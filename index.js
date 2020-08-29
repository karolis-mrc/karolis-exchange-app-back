const Koa = require('koa');
const Router = require('koa-router');
const cors = require('@koa/cors');
const calculator = require('./fetcher');



const app = new Koa();
const router = new Router();

router.get('/rates', async (ctx) => {
    // console.log(ctx.request.query);
    ctx.body = await calculator.getRates();
})

router.post('/log', async (ctx) => {
    // console.log(ctx.request.query);
    ctx.body = await calculator.getRates();
})

router.get('/', (ctx) => {
    ctx.body = 'Hello World';
})


// app.use(async ctx => {
//   ctx.body = 'Hello World!';
// });

app.use(router.routes());

app.listen(process.env.PORT || 5000);