const Event = require('../models/event');
const Registration = require('../models/registration');
const Notification = require('../models/notification');
const Evaluation = require('../models/evaluation');
const { capitalize, tagEvent } = require('../utils/utils')

module.exports.home = async (req, res) => {
    const userConnected = req.user;
    const allEvents = await Event.find({})
    const mappedEvents = allEvents.map(tagEvent);
    const events = mappedEvents.filter(event => event.tag === "Demain" || event.tag === "");
    res.render("participant/home", { userConnected, capitalize, events })
}

module.exports.evenement = async(req, res) => {
    const event = await Event.find({ _id: req.params.id }).populate("organizerId")
    const finalEvent = event.map(tagEvent);
    let isRate = false
    let rating = []
    if(finalEvent[0].tag === "Dépassé") {
        isRate = true
        rating = await Evaluation.find({ participantId: req.user.id, eventId: req.params.id })
    }
    let registration = await Registration.find({ eventId: req.params.id, participantId: req.user._id })
    res.render("participant/evenement", { event: finalEvent, capitalize, registration, isRate, rating })
}

module.exports.registration = async(req, res) => {
    const registration = new Registration({
        dateRegister: new Date(),
        participantId: req.user._id,
        eventId: req.params.id
    })
    await registration.save()
    req.flash('success', 'Vous êtes inscrit à événement');
    res.redirect(`/participant/evenement/${req.params.id}`)
}

module.exports.unregistration = async(req, res) => {
    await Registration.findByIdAndDelete(req.params.registrationId)
    req.flash('success', 'Vous vous êtes désinscrit de cet événement');
    res.redirect(`/participant/evenement/${req.params.eventId}`)
}

module.exports.programme = async(req, res) => {
    const registrations = await Registration.find({ participantId: req.user._id }).populate("eventId")
    let allRegistrations = []
    for (let i = 0; i< registrations.length; i++) {
        if (registrations[i].eventId !== null) {
            allRegistrations.push(registrations[i])
        }
    }
    res.render("participant/programme", { allRegistrations, capitalize })
}

module.exports.notifications = async(req, res) => {
    const registrations = await Registration.find({ participantId: req.params.id })
    let allNotifications = [];
    let events = [];
    for (let i = 0; i < registrations.length; i++) {
        const notifications = await Notification.find({ eventId: registrations[i].eventId })
        allNotifications.push(...notifications)
    }
    for (let i = 0; i < allNotifications.length; i++) {
        const event = await Event.findById(allNotifications[i].eventId)
        if (event) {
            events.push(event)
        } else {
            events.push("Evénement supprimé")
        }
    }
    res.render("participant/notifications", { allNotifications, events, numberNotif: allNotifications.length, capitalize })
}

module.exports.evaluation = async(req, res) => {
    const evaluation = new Evaluation({
        Rating: req.body.rating,
        Comment: req.body.comment,
        ratingDate: new Date(),
        participantId: req.user._id,
        eventId: req.params.id
    });
    await evaluation.save();
    req.flash("success", "Merci d'avoir évalué")
    res.redirect(`/participant/evenement/${req.params.id}`)
}
