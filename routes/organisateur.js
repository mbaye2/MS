const express = require("express");
const router = express.Router();
const { isLoggedIn, isOrganisateur } = require('../utils/middleware');
const organisateur = require("../controllers/organisateur");

router
    .route("/home")
    .get(isLoggedIn, isOrganisateur, organisateur.home)

router
    .route("/nouvelEvenement")
    .get(isLoggedIn, isOrganisateur, organisateur.nouvelEvenement)
    .post(isLoggedIn, isOrganisateur, organisateur.creationEvenement)

router
    .route("/evenement/:id")
    .get(isLoggedIn, isOrganisateur, organisateur.evenement)
    .delete(isLoggedIn, isOrganisateur, organisateur.delete)

router
    .route("/evenement/:id/edit")
    .get(isLoggedIn, isOrganisateur, organisateur.displayEdit)
    .put(isLoggedIn, isOrganisateur, organisateur.editEvent)

router
    .route("/notif/:id")
    .post(isLoggedIn, isOrganisateur, organisateur.sendNotif)
    
module.exports = router;
