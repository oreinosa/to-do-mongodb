const router = require("express").Router();
const authCheck = require('../middlewares/authCheck');
const { getCurrent, login, register, logout } = require('../controllers/auth.controller');
const { checkIfAllowed, updateCount } = require('../middlewares/rate-limiter');
// /current - get current user
router.get("/current", authCheck, getCurrent);
// /register - register new account
router.post("/register", register);
// /login - login to account
router.post("/login", checkIfAllowed, login, updateCount);
// /logout - logout from sessions
// router.post("/logout", logout);

module.exports = router;