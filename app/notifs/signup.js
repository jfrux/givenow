var notif = require("notif");

notif.register('signup', function (notification) {
	res.airmail.send('emails/signup/html', 
	  { user:req.user },
	  {to: req.user.email, subject: "Welcome to Bilddit!" }, 
	  function(err, mail) {
	    console.log("sending email...");
	    if(err) return console.log(err);
	    console.log("MAIL: sent!");
	    res.end()
	 });
});