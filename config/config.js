module.exports = {
	development: {
		domain:'http://localhost:3000'
		,db: 'mongodb://localhost/ojects_dev'
		,singly: {
			clientID: "d7aa3f87bcecd1c1d141debcc62bc896"
			, clientSecret: "7955d49b8a28febbfa0b408f77f78de5"
			, callbackURL: "http://localhost:3000/auth/callback"
		}
		,email:{
			domain: "smtp.sendgrid.net",
			host: "smtp.sendgrid.net",
			port : 587,
			authentication: "login",
			auth: {
		        user: "joshuairl",
		        pass: "cfr010408"
		    }
		}
	}
	,test: {
		domain:'http://test.bilddit.com'
		,db: 'mongodb://ojectsTest:public@96.11.233.122:27017/ojects_test'
		,singly: {
			clientID: "d7aa3f87bcecd1c1d141debcc62bc896"
			, clientSecret: "7955d49b8a28febbfa0b408f77f78de5"
			, callbackURL: "http://dev.bilddit.com:3000/auth/singly/callback"
		}
		
		,email:{
			domain: "smtp.sendgrid.net",
			host: "smtp.sendgrid.net",
			port : 587,
			authentication: "login",
			username: "joshuairl",
			password: "cfr010408"
		}
	}
	,production: {
		domain:'http://bilddit.com'
		,db:'mongodb://nodejitsu:765f1155853af1c84f8705d9c8ba1cb9@alex.mongohq.com:10073/nodejitsudb4268044403'
		,singly: {
			clientID: "8defc7d0e5618684d03677faec009ae0"
			, clientSecret: "758c6552aaa7eb032e8fa6c6abd4b3b0"
			, callbackURL: "http://bilddit.com/auth/callback"
		}
		,email:{
			domain: "smtp.sendgrid.net",
			host: "smtp.sendgrid.net",
			port : 587,
			authentication: "login",
			username: "joshuairl",
			password: "cfr010408"
		}
	}
}