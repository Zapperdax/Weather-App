const weather = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weather.addEventListener('submit', (e)=> {
    e.preventDefault();
    const location = search.value;
    messageOne.textContent = "Loading...";
    messageTwo.textContent = '';

    fetch('/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        if(data.err){
            messageOne.textContent = 'Error: ' + data.err;
            messageTwo.textContent = '';
        } else {
            messageOne.textContent= '';
            messageTwo.textContent = data.location + ' ' + data.currentWeather + ' ' + data.temperature + '° C' +
            ' Feels Like ' + data.feels_like + '° C Humidity:' + data.humidity + '%';
        }
        });
    });
});
