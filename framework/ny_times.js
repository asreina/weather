const request = require('request');

exports.GetArticles = function(callback){
    var url = "https://api.nytimes.com/svc/news/v3/content/all/all.json?api-key=2lD502HxFixoUjGJ5KkAkLUdWEVY9BnC"

    request(url, { json: true }, (err, res, body) => {
        if(err) {
            throw err;
        } else {

            var titles = [body.results[0].title, body.results[1].title, body.results[2].title];
           callback(titles);

        }

    });
}
