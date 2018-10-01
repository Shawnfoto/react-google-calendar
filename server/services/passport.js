const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const refresh = require("passport-oauth2-refresh");

const keys = require("../config/keys");
const mongoose = require("mongoose");

const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  // console.log("*deserial", id);
  User.findById(id).then(user => {
    done(null, user);
  });
});

const strategy = new GoogleStrategy(
  {
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: "/auth/google/callback",
    proxy: true
  },
  async (accessToken, refreshToken, profile, done) => {
    //  (accessToken, refreshToken, profile, done) => {

    console.log("*accessToken", accessToken);
    console.log("**refreshToken", refreshToken);
    // // refreshToken.access_token
    // const { access_token } = refreshToken;
    // console.log("****access_token", access_token);
    // console.log("profile.emails[0].value", profile.emails[0].value);

    const existingUser = await User.findOne({
      googleEmails: profile.emails[0].value
    });
    // console.log("*existingUser", existingUser);

    if (existingUser) {
      const NewToken = await User.findOneAndUpdate({
        googleToken: accessToken
      });
      // console.log("*NewToken", NewToken);
      if (NewToken) {
        // console.log("*if NewToken");
        return done(null, NewToken);
      }
      // console.log("*else");
      return done(null, existingUser);
    }

    const user = await new User({
      googleEmails: profile.emails[0].value,
      googleToken: accessToken
    }).save();
    done(null, user);

    //--

    // var user = {
    //   googleEmails: profile.emails[0].value,
    //   accessToken: accessToken,
    //   refreshToken: refreshToken
    // };
    // User.findOneAndUpdate({ googleEmails: user.googleEmails }, user, { upsert: true }, function(err, user) {
    //   if (err) { return done(err); }
    //   done(null, user);
    // });
    //--
  }
);

passport.use(strategy);

refresh.use(strategy);
