const sendHandle = () => {
  // 处理请求成功方法
  const render = ctx => {
    return (data, msg) => {
      ctx.set('Content-Type', 'application/json')
      ctx.body = {
        errno: 0,
        data: data,
        msg: msg || '请求成功',
      }
    }
  }

  // 处理请求失败方法
  const renderError = ctx => {
    return (errno, msg) => {
      ctx.set('Content-Type', 'application/json')
      ctx.body = {
        errno: errno || 1,
        data: null,
        msg: msg || '请求失败',
      }
    }
  }

  return async (ctx, next) => {
    ctx.sendSucess = render(ctx)
    ctx.sendError = renderError(ctx)
    await next()
  }
}

module.exports = sendHandle
