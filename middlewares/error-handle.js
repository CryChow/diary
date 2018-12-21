module.exports = async (ctx, next) => {
  try {
    await next()
  } catch (e) {
    ctx.errno = e.code || 500
    ctx.body = {
      errno: e.errno || 1,
      msg: e.message || '未知错误',
      body: null,
    }
  }
}
