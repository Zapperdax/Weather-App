const request = require('request');
const weather = (address, callback) => {
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" +address+ "&appid=b7e02431091ec55d052437889b25ad9e&units=metric";
    request({url: url, json: true}, (err, res) => {
        if(err){
            callback('Unable To Connect To Open Weather Map', undefined);
        } else if (res.body.message){
            callback(res.body.message + ' Unable To Get Location', undefined);
        } else {
            callback(undefined, {
                location: res.body.name,
                currentWeather: res.body.weather[0].main,
                temperature: res.body.main.temp
            });
        }
    });
}

module.exports = weather;