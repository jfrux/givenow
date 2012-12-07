var mongoose = require('mongoose')
  , User = mongoose.model('User')

exports.index = function (req, res) {
  res.render('discover/index', {
      title: res.locals.appName + ' / Discover',
      user: req.user
  })
}