const express = require("express");
const router = express.Router();
const { isLoggedIn } = require('../utils/middleware');
const organisateur = require("../controllers/organisateur");

router
    .route("/home")
    .get(isLoggedIn, organisateur.home)

router
    .route("/nouvelEvenement")
    .get(isLoggedIn, organisateur.nouvelEvenement)
    .post(isLoggedIn, organisateur.creationEvenement)

router
    .route("/evenement/:id")
    .get(isLoggedIn, organisateur.evenement)
    .delete(isLoggedIn, organisateur.delete)

router
    .route("/evenement/:id/edit")
    .get(isLoggedIn, organisateur.displayEdit)
    .put(isLoggedIn, organisateur.editEvent)

router
    .route("/notif/:id")
    .post(isLoggedIn, organisateur.sendNotif)
    
module.exports = router;
