var notif = require("notif");

notif.register(function (n, cb) {
  console.log(n.actor.username + ' ' + n.verb + ' ' + ((n.object && n.object.username) ? n.object.username : ''));
  console.log('save notif to db...');
  cb();
});