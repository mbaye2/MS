const Event = require('../models/event');
const Registration = require('../models/registration');
const Notification = require('../models/notification');
const { capitalize } = require('../utils/utils')

module.exports.home = async (req, res) => {
    const userConnected = req.user;
    const events = await Event.find({ organizerId: userConnected._id })
    res.render("organisateur/home", { userConnected, capitalize, events })
}

module.exports.nouvelEvenement = (req, res) => {
    res.render("organisateur/nouvel-evenement")
}

module.exports.creationEvenement = async(req, res) => {
    const body = req.body
    const event = new Event({
        title: body.title,
        description: body.description,
        date: new Date(body.date),
        place: body.lieu,
        capacity: body.capacite,
        createdAt: new Date(),
        organizerId: req.user._id
    });
    await event.save();
    req.flash('success', 'Evénement créé avec succès !');
    res.redirect(`/organisateur/home`)
}

module.exports.evenement = async(req, res) => {
    const event = await Event.findById(req.params.id)
    const registrations = await Registration.find({ eventId: req.params.id }).populate("participantId")
    res.render("organisateur/evenement", { event, capitalize, registrations })
}

module.exports.sendNotif = async(req, res) => {
    console.log(req.body)
    res.send('ok')
}

module.exports.displayEdit = async(req, res) => {
    const event = await Event.findById(req.params.id)
    res.render("organisateur/modifier-evenement", { event })
}

module.exports.delete = async(req, res) => {
    const event = await Event.findById(req.params.id)
    await Event.findByIdAndDelete(req.params.id)

    const notif = new Notification({
        type: "Urgent",
        sentDate: new Date(),
        message: `L'événement ${capitalize(event.title)} a été supprimé!`,
        eventId: req.params.id
    })
    await notif.save();

    req.flash('success', `L'événement ${capitalize(event.title)} a été supprimé!`)
    res.redirect("/organisateur/home")
}

module.exports.editEvent = async(req, res) => {
    const body = req.body
    const event = await Event.findById(req.params.id)

    event.title = body.title
    event.description = body.description
    event.date = body.date
    event.place = body.lieu
    event.capacity = body.capacite

    await event.save()

    req.flash("success", "L'événement a été modifié")
    res.redirect(`/organisateur/evenement/${req.params.id}`)
}
