const Koa = require('koa');
const Router = require('koa-router');



const app = new Koa();
const router = new Router();

router.get('/calculator', (ctx) => {
    ctx.body = 'calculator';
})

router.get('/', (ctx) => {
    ctx.body = 'Hello World';
})


// app.use(async ctx => {
//   ctx.body = 'Hello World!';
// });

app.use(router.routes());

app.listen(process.env.PORT || 5000);