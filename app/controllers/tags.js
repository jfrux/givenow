var mongoose = require('mongoose')
  , Project = mongoose.model('Project')

exports.index = function (req, res) {
  var perPage = 5
    , page = req.param('page') > 0 ? req.param('page') : 0

  Project
    .find({ tags: req.param('tag') })
    .populate('user', 'name')
    .sort({'createdAt': -1}) // sort by date
    .limit(perPage)
    .skip(perPage * page)
    .exec(function(err, projects) {
      if (err) return res.render('500')
      Project.count({ tags: req.param('tag') }).exec(function (err, count) {
        res.render('projects/index', {
            title: "" + req.param('param') + " Projects"
          , projects: projects
          , page: page
          , pages: count / perPage
        })
      })
    })
}
