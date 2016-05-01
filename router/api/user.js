import Router from 'koa-router'
import User from './../models/user'

const router = new Router()

router
  .get('/', ctx => {
    ctx.body = "Hello This is User api"
  })
  .post('/', async (ctx, next) => {
    let isExist = await User.find({name: ctx.request.body.name}).length !== 0 
    if (isExist) {
      throw new ctx.Err({ message: '用户已存在', status: 400})
    }
    ctx.body = await new User(ctx.request.body).save()
  })

export default router