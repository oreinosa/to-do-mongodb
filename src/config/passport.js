// Load User model
const User = require('../models/user.model');

const ERROR_MESSAGE = "The email or password is incorrect.";

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET,
};

/**
 * Export JWT strategy function
 */
module.exports = (passport) => {
  passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      console.log(jwt_payload);
      const user = await User.findOne({ id: jwt_payload.sub });
      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    } catch (e) {
      console.log(e);
      done(e, false);
    }
  }));
};
/**
 * Export passport local strategy function
 */
// module.exports = (passport) => {
//   passport.use(
//     new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
//       // Match user
//       try {
//         // find one by email
//         const user = await User.findOne({
//           email
//         });
//         // if user is not found
//         if (!user) {
//           return done(null, false, { message: ERROR_MESSAGE });
//         }
//         // else, if found compare password hash
//         const isMatch = await bcrypt.compare(password, user.password);
//         // if there's a match
//         if (isMatch) {
//           // remove password and return user
//           return done(null, { ...user._doc, password: undefined });
//         } else {
//           // return message if password is incorrect
//           return done(null, null, { message: ERROR_MESSAGE });
//         }
//       } catch (e) {
//         // return error message 
//         console.log(e);
//         return done(null, null, { message: ERROR_MESSAGE, e });
//       }
//     })
//   );

//   passport.serializeUser((user, done) => {
//     // save user add to deserealize
//     done(null, user._id);
//   });

//   passport.deserializeUser(async (id, done) => {
//     // return user to use in request
//     try {
//       const user = await User.findById(id, "-password").exec();
//       done(null, user);
//     } catch (e) {
//       done(null, null, { message: "User not found" })
//     }
//   });
// };