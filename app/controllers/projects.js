
var mongoose = require('mongoose')
  , Project = mongoose.model('Project')
  , _ = require('underscore')

// New project
exports.new = function(req, res){
  var newProject = new Project();
  console.log(newProject);
  res.render('projects/new', {
      title: 'New Project'
    , project: newProject
  })
}


// Create an project
exports.create = function (req, res) {
  var project = new Project(req.body)
  project.user = req.user

  project.save(function(err){
    if (err) {
      res.render('projects/new', {
          title: 'New Project'
        , project: project
        , errors: err.errors
      })
    }
    else {
      res.redirect('/projects/'+project._id)
    }
  })
}


// Edit an project
exports.edit = function (req, res) {
  res.render('projects/edit', {
    title: 'Edit '+req.project.title,
    project: req.project
  })
}


// Update project
exports.update = function(req, res){
  var project = req.project

  project = _.extend(project, req.body)

  project.save(function(err, doc) {
    if (err) {
      res.render('projects/edit', {
          title: 'Edit Project'
        , project: project
        , errors: err.errors
      })
    }
    else {
      res.redirect('/projects/'+project._id)
    }
  })
}


// View an project
exports.show = function(req, res){
  res.render('projects/show', {
    title: req.project.title,
    project: req.project,
    comments: req.comments
  })
}


// Delete an project
exports.destroy = function(req, res){
  var project = req.project
  project.remove(function(err){
    // req.flash('notice', 'Deleted successfully')
    res.redirect('/projects')
  })
}


// Listing of Projects
exports.index = function(req, res){
  var perPage = 5
    , page = req.param('page') > 0 ? req.param('page') : 0

  Project
    .find({})
    .populate('user', 'name')
    .sort({'createdAt': -1}) // sort by date
    .limit(perPage)
    .skip(perPage * page)
    .exec(function(err, projects) {
      if (err) return res.render('500')
      Project.count().exec(function (err, count) {
        res.render('projects/index', {
            title: 'List of Projects'
          , projects: projects
          , page: page
          , pages: count / perPage
        })
      })
    })
}

