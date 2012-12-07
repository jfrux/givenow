var singlyApi = function(config,user) {
	var hostBaseUrl = (config.domain || 'http://localhost:' + port);
	var apiBaseUrl = process.env.SINGLY_API_HOST || 'https://api.singly.com';
	var request = require("request");

	this.deleteAccount = function(callback) {
		request.del(apiBaseUrl + '/profile?access_token=' + user.accessToken);
	}
}

module.exports = singlyApi;