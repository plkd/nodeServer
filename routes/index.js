/**
 * Created by lijiliang on 2017/12/8.
 */
module.exports = (app) => {
  app.use('/api',require('./reg'));
  app.use('/api',require('./login'));
  app.use('/api',require('./article'));
  app.use('/api',require('./admin'));
  app.use('/api',require('./classify'));
}