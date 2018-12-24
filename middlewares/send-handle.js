const sendHandle = () => {
  // 处理请求成功方法
  const render = ctx => {
    return (data, message) => {
      ctx.set('Content-Type', 'application/json')
      ctx.body = {
        errno: 0,
        data: data,
        message: message || '请求成功',
      }
    }
  }

  // 处理请求失败方法
  const renderError = ctx => {
    return (errno, message, code) => {
      ctx.set('Content-Type', 'application/json')
      ctx.status = code || 500
      ctx.body = {
        errno: errno || 1,
        data: null,
        message: message || '未知错误',
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
