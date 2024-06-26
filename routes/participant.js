const express = require("express");
const router = express.Router();
const { isLoggedIn, isParticipant } = require('../utils/middleware');
const participant = require("../controllers/participant");

router
    .route("/home")
    .get(isLoggedIn, isParticipant, participant.home)

router
    .route("/evenement/:id")
    .get(isLoggedIn, isParticipant, participant.evenement)

router
    .route("/register/:id")
    .post(isLoggedIn, isParticipant, participant.registration)

router
    .route("/unregister/:eventId/:registrationId")
    .delete(isLoggedIn, isParticipant, participant.unregistration)

router
    .route("/programme/:id")
    .get(isLoggedIn, isParticipant, participant.programme)

router
    .route("/notifications/:id")
    .get(isLoggedIn, isParticipant, participant.notifications)

router
    .route("/event/:id/rating")
    .post(isLoggedIn, isParticipant, participant.evaluation)
    
module.exports = router;
