const express = require("express");
const router = express.Router();
const passport = require("passport");
const cookieParser = require('cookie-parser');
const users = require("../controllers/user");

router.use(cookieParser());

router
    .route("/login")
    .get(users.login)
    .post(
        passport.authenticate("local", {
            failureFlash: true,
            failureRedirect: "/login",
            keepSessionInfo: true
        }),
        users.authentication
    );

router
    .route("/signup")
    .get(users.signup)
    .post(users.signingup);

router.get("/logout", users.logout);

module.exports = router;
