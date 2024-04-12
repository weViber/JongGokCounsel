const controller = require("../controllers/reservation.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/reservation/reservation", controller.reservation);
  app.post("/api/reservation/confirm", controller.confirm);
  app.post("/api/reservation/update", controller.update);
  app.post("/api/reservation/changetime", controller.changetime);
  app.post("/api/reservation/cancel", controller.cancel);
};