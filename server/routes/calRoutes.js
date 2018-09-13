const gcal = require("google-calendar");
const requireLogin = require("../middlewares/requireLogin");
const mongoose = require("mongoose");

module.exports = app => {
  // 我的日曆條目
  app.all("/api/calendarList", function(req, res) {
    // if (!req.user.googleToken) return res.redirect("/auth");

    const accessToken = req.user.googleToken;

    gcal(accessToken).calendarList.list(function(err, data) {
      if (err) {
        res.send(500, err);
      }
      return res.send(data);
    });
  });

  // 我的日曆事件
  app.all(
    "/api/calendars/:calendarId/events",
    requireLogin,
    async (req, res) => {
      if (!req.user.googleToken) return res.redirect("/");

      const accessToken = req.user.googleToken;
      // const calendarId = req.user.googleEmails;
      const calendarId = req.params.calendarId;

      gcal(accessToken).events.list(calendarId, function(err, data) {
        if (err) {
          res.send(500, err);
        }
        return res.send(data);
      });
    }
  );
  // 快速加單日事件(only title)
  app.all("/api/calendars/:calendarId/events/quickAdd", requireLogin, function(
    req,
    res
  ) {
    if (!req.user.googleToken) return res.redirect("/");

    const accessToken = req.user.googleToken;
    const calendarId = req.params.calendarId;
    const text = req.query.text || "Hello World";

    gcal(accessToken).events.quickAdd(calendarId, text, function(err, data) {
      if (err) return res.send(500, err);
      return res.send(data);
      // return res.redirect("/api/calendars/" + calendarId + "/events");
    });
  });

  app.all(
    "/api/calendars/:calendarId/events/:eventId/update",
    requireLogin,
    function(req, res) {
      if (!req.user.googleToken) return res.redirect("/");

      const accessToken = req.user.googleToken;
      const calendarId = req.params.calendarId;
      const eventId = req.params.eventId;

      gcal(accessToken).events.update(calendarId, eventId, function(err, data) {
        if (err) return res.send(500, err);
        return res.redirect("/api/calendars/" + calendarId + "/events");
      });
    }
  );

  app.all(
    "/api/calendars/:calendarId/events/:eventId/remove",
    requireLogin,
    function(req, res) {
      if (!req.user.googleToken) return res.redirect("/");

      const accessToken = req.user.googleToken;
      const calendarId = req.params.calendarId;
      const eventId = req.params.eventId;

      gcal(accessToken).events.delete(calendarId, eventId, function(err, data) {
        if (err) {
          res.send(500, err);
        }
        return res.send(data);
        // return res.redirect("/api/calendars/" + calendarId + "/events");
      });
    }
  );

  app.all(
    "/api/calendars/:calendarId/events/:eventId/get",
    requireLogin,
    function(req, res) {
      if (!req.user.googleToken) return res.redirect("/");

      const accessToken = req.user.googleToken;
      const calendarId = req.params.calendarId;
      const eventId = req.params.eventId;

      gcal(accessToken).events.get(calendarId, eventId, function(err, data) {
        if (err) {
          res.send(500, err);
        }
        return res.send(data);
        // return res.redirect("/api/calendars/" + calendarId+"/events");
      });
    }
  );
};
