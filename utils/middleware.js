module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl
        req.flash('error', 'Connect first');
        return res.redirect('/login');
    }
    next();
}

// module.exports.isAdmin = (req, res, next) => {
//     if(req.user.role !== 'admin'){
//         req.flash('error', 'Not allowed');
//         return res.redirect('/login');
//     }else{
//         next()
//     }
// };