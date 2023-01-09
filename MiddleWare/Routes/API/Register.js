function register(req, res) {
    var user = new User(req.body);
    user.save(function (err) {
        if (err) {
            res.status(500).send(err);
        }
        res.status(201).json(user);
    });
}