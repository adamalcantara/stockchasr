const passport = require('passport');
const {Watchlist, Account} = require("../models");

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
			req.session.username = req.user.username
			req.session.user_id = req.user._id
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
	addToWatchlist: function (req, res) {
		console.log(`This is whipped cream goin in the coffee goin on right here guys ${req.statusCode}`);
		// update state user string for the symbol
		Watchlist.create(req.body)
		.then (data => {
			return Account.findOneAndUpdate({_id: req.session.user_id}, {$addToSet: {watchlist: data}}, {new:true} )
		}).then(data => {
			res.json(data)
			console.log(data)
		}).catch (err => {
			console.log(err)
			res.json(err)
		})
		res.status(200).send("Sounds good, John!");
	},

	getWatchList: function (req, res) {
		console.log(`This is getting the watchlist ${req.statusCode}`);
		Account.findOne({_id: req.session.user_id})
		.then(data => {
			res.json(data.watchlist)
		}) .catch (err => {
			console.log(err)
			res.json(err)
		})
		// getWatchlist.create(req.body)

		
	}
};