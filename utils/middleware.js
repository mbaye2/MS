module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl
        req.flash('error', 'Connectez-vous d\'abord');
        return res.redirect('/login');
    }
    next();
}

module.exports.isOrganisateur = (req, res, next) => {
    if(req.user.profil !== 'organisateur'){
        req.flash('error', 'Non autorisé');
        return res.redirect('/login');
    }else{
        next()
    }
};

module.exports.isParticipant = (req, res, next) => {
    if(req.user.profil !== 'participant'){
        req.flash('error', 'Non autorisé');
        return res.redirect('/login');
    }else{
        next()
    }
};