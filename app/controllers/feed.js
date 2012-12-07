var mongoose = require('mongoose')
  , User = mongoose.model('User')

exports.index = function (req, res) {
  res.render('feed/index', {
      title: res.locals.appName + ' / News Feed'
  })
}