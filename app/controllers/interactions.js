var mongoose = require('mongoose')
  , User = mongoose.model('User')

exports.index = function (req, res) {
  res.render('interactions/index', {
      title: res.locals.appName + ' / Interactions',
      user: req.user
  })
}