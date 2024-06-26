const express = require("express");
const router = express.Router();
const { isLoggedIn } = require('../utils/middleware');
const participant = require("../controllers/participant");

router
    .route("/home")
    .get(isLoggedIn, participant.home)

router
    .route("/evenement/:id")
    .get(isLoggedIn, participant.evenement)

router
    .route("/register/:id")
    .post(isLoggedIn, participant.registration)

router
    .route("/unregister/:eventId/:registrationId")
    .delete(isLoggedIn, participant.unregistration)

router
    .route("/programme/:id")
    .get(isLoggedIn, participant.programme)

    router
        .route("/notifications/:id")
        .get(isLoggedIn, participant.notifications)
    
module.exports = router;
