const User = require('../models/user');

module.exports.login = (req, res) => {
    res.render('login');
};

module.exports.authentication = async(req, res) => {
    const profil = req.user.profil
    req.flash('success', "Bienvenue !");
    const redirectUrl = req.session.returnTo || `/${profil}/home`;
    delete req.session.returnTo;
    res.redirect(redirectUrl);
};

module.exports.logout = (req, res) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        req.flash('success', "Déconnecté avec succès!");
        res.redirect('/login');
    });
  };

module.exports.signup = (req, res) => {
    res.render("signup")
}

module.exports.signingup = async (req, res) => {
    const body = req.body;
    const password = body.password;
    const user = new User({ 
        prenom: body.prenom,
        nom: body.nom,
        inscDate: new Date(),
        email: body.email, 
        profil: body.profil, 
        username: body.email 
    });
    
    try {
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) {
                return next(err);
            }
            res.redirect(`/${body.profil}/home`);
        });
    } catch (error) {
        req.flash("error", "Erreur lors de l'inscription :", error);
        res.redirect("/signup");
    }
}