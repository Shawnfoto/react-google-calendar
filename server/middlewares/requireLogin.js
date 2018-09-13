module.exports = (req, res, next) => {
  if (!req.user) {
    res.send({ code: 401, error: "You must log in!" });
    return res.redirect("/");
  }

  next();
};
