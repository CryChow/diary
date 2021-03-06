module.exports = async (ctx, next) => {
  try {
    await next()
  } catch (e) {
    ctx.status = e.code || 500
    ctx.body = {
      errno: e.errno || 1,
      message: e.message || '未知错误',
      body: null,
    }
  }
}
