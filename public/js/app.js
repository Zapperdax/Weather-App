console.log("Client Side JS");

fetch("http://puzzle.mead.io/puzzle").then((response) => {
  response.json().then((data) => {
    console.log(data);
  });
});




const weather = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weather.addEventListener('submit', (e)=> {
    e.preventDefault();
    const location = search.value;
    messageOne.textContent = "Loading...";
    messageTwo.textContent = '';

    fetch('http://localhost:2533/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        if(data.err){
            messageOne.textContent = 'Error: ' + data.err;
            messageTwo.textContent = '';
        } else {
            messageOne.textContent= '';
            messageTwo.textContent = data.location + ' ' + data.currentWeather + ' ' + data.temperature + '° C';
        }
        });
    });
});