module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash("error", "You need to login to add a review !");
    return res.redirect("/login");
  }
  next();
};
