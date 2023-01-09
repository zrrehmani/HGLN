function WebHook() {
        app.post('/webhook', function (req, res) {
            console.log(req.body);
            res.send('ok');
        });
}

module.exports = WebHook;