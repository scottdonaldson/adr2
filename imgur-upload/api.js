var imgur = require('imgur'),
    firebase = require('firebase');

imgur.setClientId(process.env.IMGUR_ID);

var fireBaseRef = new firebase('https://adr2.firebaseio.com/');

module.exports = function(app) {

    function postImage(req, res) {
        res.header("Access-Control-Allow-Origin", "*");

        if ( req.body ) {
            var image = req.body.image;

            if ( image ) {
                imgur.uploadBase64(image).then(function(response) {

                    var link = response.data.link;

                    var img = fireBaseRef.push();
                    img.set({
                        url: link,
                        time: new Date().getTime()
                    });

                    res.json(response.data.link);

                }).catch(function(err) {
                    console.error(err.message);
                });
            }
        }

        res.send('No data received.');
    }

    app.get('/upload', postImage);

    app.post('/upload', postImage);
};
