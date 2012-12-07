var mongoose = require('mongoose')
  , User = mongoose.model('User')

exports.index = function (req, res) {
  res.render('search/index', {
      title: res.locals.appName + ' / Search',
      user: req.user
  })
}