g

router
  .route("/")
  .get((req, res, next) => {
    Car.find()
      .then((cars) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(cars);
      })
      .catch((err) => next(err));
  })
  .post((req, res, next) => {
    Car.create(req.body)
      .then((car) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(car);
      })
      .catch((err) => next(err));
  })
  .put((req, res) => {
    res.statusCode = 403;
    res.end("PUT operation not supported");
  })
  .delete((req, res, next) => {
    Car.deleteMany()
      .then((response) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(response);
      })
      .catch((err) => next(err));
  });

router
  .route("/:carId")
  .get((req, res, next) => {
    Car.findById(req.params.carId)
      .then((car) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(car);
      })
      .catch((err) => next(err));
  })
  .post((req, res) => {
    res.end(
      `Will add the car: ${req.body.model}, ${req.body.make}, ${req.body.year}`
    );
  })
  .put((req, res, next) => {
    Car.findByIdAndUpdate(
      req.params.carId,
      {
        $set: req.body,
      },
      { new: true }
    )
      .then((car) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(car);
      })
      .catch((err) => next(err));
  })
  .delete((req, res, next) => {
    Car.findByIdAndDelete(req.params.carId)
      .then((response) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(response);
      })
      .catch((err) => next(err));
  });

module.exports = router;
