var mongoose = require('mongoose')
  , Project = mongoose.model('Project')
  , User = mongoose.model('User')
  , async = require('async')

module.exports = function (app, passport, auth) {
  // user routes
  var users = require('../app/controllers/users')
  app.get('/login', users.login)
  app.get('/signup', users.signup)
  app.get('/signup/complete', users.complete)
  app.post('/signup/complete', users.complete_save)
  app.get('/logout', users.logout)
  app.post('/users', users.create)
  app.get('/users/:userId', users.show)
  app.post('/users/session', passport.authenticate('local', {failureRedirect: '/login'}), users.session)

  
  // GET /auth/singly/callback
  // Use passport.authenticate() as route middleware to authenticate the
  // request. If authentication fails, the user will be redirected back to the
  // login page. Otherwise, the primary route function function will be called,
  // which, in this example, will redirect the user to the home page.
  app.get('/auth/callback', passport.authenticate('singly', {
    failureRedirect: '/login'
  }),users.authCallback);

  // GET /auth/singly
  // Use passport.authenticate() as route middleware to authenticate the
  // request. The first step in Singly authentication will involve
  // redirecting the user to api.singly.com. After authorization, Singly will
  // redirect the user back to this application at /auth/singly/callback
  app.get('/auth/singly', passport.authenticate('singly'));
  
  // app.get('/auth/facebook', passport.authenticate('facebook', { scope: [ 'email', 'user_about_me'], failureRedirect: '/login' }), users.signin)
  // app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), users.authCallback)
  // app.get('/auth/twitter', passport.authenticate('twitter', { failureRedirect: '/login' }), users.signin)
  // app.get('/auth/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/login' }), users.authCallback)
  // app.get('/auth/google', passport.authenticate('google', { failureRedirect: '/login', scope: ['https://www.googleapis.com/auth/userinfo.profile','https://www.googleapis.com/auth/userinfo.email'] }), users.signin)
  // app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login', scope: ['https://www.googleapis.com/auth/userinfo.profile','https://www.googleapis.com/auth/userinfo.email'] }), users.authCallback)
  
  

  // app.param('userId', function (req, res, next, id) {
  //   console.error('XXX: Loading user', id);

  //   User
  //     .findOne({ _id : id })
  //     .exec(function (err, user) {
  //       if (err) return next(err)
  //       if (!user) return next(new Error('Failed to load User ' + id))
  //       req.profile = user
  //       next()
  //     })
  // });

  // photos routes
  var photos = require('../app/controllers/photos')
  app.get('/photos/upload', photos.upload)
  app.post('/photos/upload', photos.doUpload);

  // search routes

  var emailPreview = require('../app/controllers/emailpreview')
  app.get('/emailpreview/:template', emailPreview.show)

  var search = require('../app/controllers/search')
  app.get('/search', search.index)
  
  // areas routes
  var areas = require('../app/controllers/areas')
  app.get('/areas', areas.index)
  
  // discover routes
  var discover = require('../app/controllers/discover')
  app.get('/discover', discover.index)

  // feed routes
  var feed = require('../app/controllers/feed')
 
  // stars routes
  var stars = require('../app/controllers/stars')
  app.get('/stars', stars.index)

  // interactions routes
  var interactions = require('../app/controllers/interactions')
  app.get('/interactions', interactions.index)
 
  // resources routes
  var resources = require('../app/controllers/resources')
  app.get('/resources', resources.index)
  app.get('/resources/new', auth.requiresLogin, resources.new)
  app.post('/resources', auth.requiresLogin, resources.create)
  app.get('/resources/:id', resources.show)
  app.get('/resources/:id/edit', auth.requiresLogin, auth.resource.hasAuthorization, resources.edit)
  app.put('/resources/:id', auth.requiresLogin, auth.resource.hasAuthorization, resources.update)
  app.del('/resources/:id', auth.requiresLogin, auth.resource.hasAuthorization, resources.destroy)
  
  // project settings
  var settings = require('../app/controllers/settings')
  app.get('/settings', auth.requiresLogin, settings.profile)
  app.get('/settings/profile', auth.requiresLogin, settings.profile)
  app.get('/settings/password', auth.requiresLogin, settings.password)
  app.get('/settings/invite', auth.requiresLogin, settings.invite)
  app.get('/settings/delete', auth.requiresLogin, settings.delete)

  // project routes
  var projects = require('../app/controllers/projects')
  app.get('/projects', projects.index)
  app.get('/projects/new', auth.requiresLogin, projects.new)
  app.post('/projects', auth.requiresLogin, projects.create)
  app.get('/projects/:id', projects.show)
  app.get('/projects/:id/edit', auth.requiresLogin, auth.project.hasAuthorization, projects.edit)
  app.put('/projects/:id', auth.requiresLogin, auth.project.hasAuthorization, projects.update)
  app.del('/projects/:id', auth.requiresLogin, auth.project.hasAuthorization, projects.destroy)

  // front pages routes
  var front = require('../app/controllers/front')
  app.param('template', function (req, res, next, tmpl) {
    console.error('XXX: Loading preview', tmpl);

    req.emailTemplate = tmpl;
    next();
  })

  app.param('username', function (req, res, next, id) {
    console.error('XXX: Loading user', id);

    User
      .findOne({ username : id })
      .populate('picture')
      .exec(function (err, user) {
        if (err) return next(err)
        if (!user) return next(new Error('Failed to load User ' + id))
        //console.log(user);
        req.profile = user
        next()
      })
  })
  
  // home route
  app.get('/', function(req,res) {
    if(req.isAuthenticated()) {
      feed.index(req,res);
    } else {
      front.home(req,res);
    }
  });

  // comment routes
  var comments = require('../app/controllers/comments')
  app.post('/projects/:id/comments', auth.requiresLogin, comments.create)

  // tag routes
  var tags = require('../app/controllers/tags')
  app.get('/tags/:tag', tags.index)
  
  //faker data
  app.get('/generate/users',function(req,res) {
    var Faker = require('Faker');

    var bigSet = [];

    for(i = 20; i >= 0; i--){
      bigSet.push({
        "name":Faker.Name.findName(),
        "username":Faker.Internet.userName(),
        "email":Faker.Internet.email()
      });
    };

    fs.writeFile('../examples/bigDataSet.json', JSON.stringify(bigSet), function() {
      sys.puts("bigDataSet generated successfully!");
    });

    var randomName = Faker.Name.findName(); // Rowan Nikolaus
    var randomEmail = Faker.Internet.email(); // Kassandra.Haley@erich.biz
    var randomCard = Faker.Helpers.createCard(); // random contact card containing many properties
  });
  app.get('/:username', users.show)
  app.get('/:username/follow', users.follow)
  app.get('/:username/areas', users.areas)
  app.get('/:username/activity', users.activity)
  
  app.param('id', function(req, res, next, id){
    Project
      .findOne({ _id : id })
      .populate('user', 'name')
      .populate('comments')
      .exec(function (err, project) {
        if (err) return next(err)
        if (!project) return next(new Error('Failed to load project ' + id))
        req.project = project

        var populateComments = function (comment, cb) {
          User
            .findOne({ _id: comment._user })
            .select('name')
            .exec(function (err, user) {
              if (err) return next(err)
              comment.user = user
              cb(null, comment)
            })
        }

        if (project.comments.length) {
          async.map(req.project.comments, populateComments, function (err, results) {
            next(err)
          })
        }
        else
          next()
      })
  })

}
