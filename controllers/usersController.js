const { Watch } = require("@material-ui/icons");
const passport = require("passport");
const { Watchlist, Account } = require("../models");
const account = require("../models/account");
const { remove } = require("../models/watchlist");

module.exports = {
  getUser: function (req, res) {
    const { user } = req.session.passport;

    if (user) {
      Account.findOne({ username: user }).then((userData) => {
        console.log("This is the user data right here, people!");
        console.log(userData);
        console.log("This is the end of the user data.");
        const { _id, username } = userData;
        return res.status(200).json({
          id: _id,
          username,
          authenticated: true,
        });
      });
    } else {
      return res.status(401).json({
        error: "User is not authenticated",
        authenticated: false,
      });
    }
  },
  register: function (req, res, next) {
    console.log("/register handler", req.body);
    Account.register(
      new Account({ username: req.body.username }),
      req.body.password,
      (err, account) => {
        if (err) {
          return res.status(500).send({ error: err.message });
        }

        passport.authenticate("local")(req, res, () => {
          req.session.save((err) => {
            if (err) {
              //ToDo:log the error and look for an existing user
              req.session.username = req.user.username;
              req.session.user_id = req.user._id;
              return next(err);
            }

            res.send(200, "successful register");
          });
        });
      }
    );
  },
  login: function (req, res, next) {
    console.log("/login handler");
    if (!req.session.passport.user) {
      return false;
    }
    req.session.save((err) => {
      if (err) {
        return next(err);
      }
      req.session.username = req.user.username;
      req.session.user_id = req.user._id;
      console.log("The three codemigos are here to save the day");
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
      res.status(200).send("OK");
    });
  },

  test: function (req, res, next) {
    console.log(`Ping Dinger ${req.statusCode}`);
    res.status(200).send("Dong!");
  },

  //user clicks button, stock symbol gets put in database. Watchlist data appends to dashboard page.
  addToWatchlist: function (req, res) {
    console.log(
      `This is whipped cream goin in the coffee goin on right here guys ${req.statusCode}`
    );
    // update state user string for the symbol
    let data;
    Watchlist.create(req.body)
      .then((wish) => {
        data = wish;
        //console log the data of the watchlist
        // console.log("congratulations, you did it, ya filthy animal")
        // console.log(data)
        // console.log("We should have console logged data already")
        //Find an account with the id that is logged in, and add the watchlist data to the set
        return Account.findOne({ _id: req.session.user_id });
      })
      .then((user) => {
        let result = user.watchlist.find((w) => {
          return w.symbol === req.body.symbol;
        });
        if (result) {
          return { message: "Already Added" };
        } else {
          return Account.findOneAndUpdate(
            { _id: req.session.user_id },
            { $addToSet: { watchlist: data } },
            { new: true }
          );
        }
      })
      .then((data) => {
        if (data.message){
          res.json(data)
        } else {
          res.json({...data, message: "Successfully Added"});
        }
      })
      .catch((err) => {
        console.log(err);
        res.json(err);
      });
  },

  //Get the watchlist data from the db
  getWatchList: function (req, res) {
    // console.log(`This is getting the watchlist ${req.statusCode}`);
    //Find the data for the account that is logged in
    Account.findOne({ _id: req.session.user_id })
      .then((data) => {
        //Take data.watchlist and convert it to json
        res.json(data.watchlist);
      })
      .catch((err) => {
        console.log(err);
        res.json(err);
      });
    // getWatchlist.create(req.body)
  },

  //Delete a stock from the watchlist
  deleteStock: function (req, res) {
    console.log(req.params);
    console.log("This is req data", req.params.id);
    //Update the watchlist by id
    Watchlist.findByIdAndDelete(req.params.id)
      .then((list) => {
        console.log("This is list", list);
        console.log("This is the list data", list._id);
        // Finds Account (with user_id) with that added the stock
        Account.findByIdAndUpdate(
          { _id: req.session.user_id },
          {
            $pull: {
              // goes to watch list and pulls out the _id from the accounts watchlist
              watchlist: {
                _id: list._id,
              },
            },
          },
          (err, docs) => {
            if (err) {
              throw err;
            }
            console.log("this is the docs", docs);
          }
        );
      })
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        console.log(err);
        res.json(err);
      });
  },
};
