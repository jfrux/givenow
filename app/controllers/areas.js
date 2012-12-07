var mongoose = require('mongoose')
  , User = mongoose.model('User')

exports.index = function (req, res) {
  res.render('areas/index', {
      title: res.locals.appName + ' / Areas',
      user: req.user
  })
}