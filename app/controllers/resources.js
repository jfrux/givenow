
var mongoose = require('mongoose')
  , Resource = mongoose.model('Resource')
  , _ = require('underscore')

// New resource
exports.new = function(req, res){
  res.render('resources/new', {
      title: 'New Resource'
    , resource: new Resource({})
  })
}


// Create an resource
exports.create = function (req, res) {
  var resource = new Resource(req.body)
  resource.user = req.user

  resource.save(function(err){
    if (err) {
      res.render('resources/new', {
          title: 'New Resource'
        , resource: resource
        , errors: err.errors
      })
    }
    else {
      res.redirect('/resources/'+resource._id)
    }
  })
}


// Edit an resource
exports.edit = function (req, res) {
  res.render('resources/edit', {
    title: 'Edit '+req.resource.title,
    resource: req.resource
  })
}


// Update resource
exports.update = function(req, res){
  var resource = req.resource

  resource = _.extend(resource, req.body)

  resource.save(function(err, doc) {
    if (err) {
      res.render('resources/edit', {
          title: 'Edit Resource'
        , resource: resource
        , errors: err.errors
      })
    }
    else {
      res.redirect('/resources/'+resource._id)
    }
  })
}


// View an resource
exports.show = function(req, res){
  res.render('resources/show', {
    title: req.resource.title,
    resource: req.resource,
    comments: req.comments
  })
}


// Delete an resource
exports.destroy = function(req, res){
  var resource = req.resource
  resource.remove(function(err){
    // req.flash('notice', 'Deleted successfully')
    res.redirect('/resources')
  })
}

// Listing of Resources
exports.index = function(req, res){
  var perPage = 100
    , page = req.param('page') > 0 ? req.param('page') : 0

  Resource
    .find({}) // sort by name
    .limit(perPage)
    .skip(perPage * page)
    .exec(function(err, resources) {
      if (err) return res.render('500')
      Resource.count().exec(function (err, count) {
        res.render('resources/index', {
            title: 'List of Resources'
          , resources: resources
          , page: page
          , pages: count / perPage
        })
      })
    })
}

