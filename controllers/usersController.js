const Account = require("../models/account");
const passport = require('passport');

module.exports = {
	getUser: function (req, res) {

		const { user } = req.session.passport

		if (user) {
			Account.findOne({ username: user })
				.then(userData => {
					console.log(userData);
					const { _id, username } = userData;
					return res.status(200).json({
						id: _id,
						username,
						authenticated: true
					})
				})
		} else {
			return res.status(401).json({
				error: 'User is not authenticated',
				authenticated: false
			});
		}
	},
	register: function (req, res, next) {
		console.log('/register handler', req.body);
		Account.register(new Account({ username: req.body.username }), req.body.password, (err, account) => {
			if (err) {
				return res.status(500).send({ error: err.message });
			}

			passport.authenticate('local')(req, res, () => {
				req.session.save((err) => {
					if (err) {
						//ToDo:log the error and look for an existing user

						return next(err);
					}

					res.send(200, "successful register");
				});
			});
		});
	},
	login: function (req, res, next) {
		console.log('/login handler');
		if (!req.session.passport.user) {
			return false;
		}
		req.session.save((err) => {
			if (err) {
				return next(err);
			}
			console.log('The three codemigos are here to save the day')
			console.log(`User at login ${req.user.username}`);

			res.status(200).json({ test: " testvalue" });
		});
	},
	logout: function (req, res, next) {
		req.logout();
		req.session.save((err) => {
			if (err) {
				return next(err);
			}
			res.status(200).send('OK');
		});
	},

	test: function (req, res, next) {
		console.log(`Ping Dinger ${req.statusCode}`);
		res.status(200).send("Dong!");
	},


	//user clicks button, stock symbol gets put in database. Watchlist data appends to dashboard page. 
	watchlist: function (req, res, next) {
		console.log(`This is whipped cream goin in the coffee goin on right here guys ${req.statusCode}`);
		// update state user string for the symbol
		this.setState({
			symbol: String,
		});
		//create API in new method
		
		//that route calls this controller

		// call the model and save to that model

		//push to array with query

		//custom err if user selects an already followed stock

		res.status(200).send("Sounds good, John!");
	},

};