var data;
var input =document.querySelector('#search');
var btn = document.querySelector('button');
console.log(input);
// http://api.weatherapi.com/v1/forecast.json?key=e5e884ed3d074c9580984541252104&q=${key}&days=3
//https://api.weatherapi.com/v1/search.json?key=e5e884ed3d074c9580984541252104&q=${key}

async function fetchData(key) {
    var response= await fetch(`http://api.weatherapi.com/v1/forecast.json?key=e5e884ed3d074c9580984541252104&q=${key}&days=3`);
    data = await response.json();
    console.log(data);
    displayData(data);  
    console.log(data.location.name);
     
}


input.addEventListener('input',function(){
    console.log(input.value);
    fetchData(input.value);
    
})

function getUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function(position) {
        var lat = position.coords.latitude;
        var lon = position.coords.longitude;
        fetchData(`${lat},${lon}`);
      },
      function() {
        console.log("Location blocked, using default.");
        fetchData("Cairo");
      }
    );
  } else {
    fetchData("Cairo");
  }
}

getUserLocation();

function displayData(data) {
    var cartona1='';
    var cartona2='';
    var cartona3='';

    const today = new Date();

    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    const dayAfterTomorrow = new Date();
    dayAfterTomorrow.setDate(today.getDate() + 2);

    var Day=data.forecast.forecastday;
    console.log(Day);
    
    for (let i = 0; i < Day.length; i++) {
        cartona1 =`
                <div class="card-header">
                  <div class="d-flex justify-content-between">
                    <p class='text-text-uppercase'>${today.toDateString().split(' ',1).join(' ') + 'day'}</p>
                    <p>${today.toDateString().split(' ')[2] + today.toDateString().split(' ')[1]}</p>
                  </div>
                </div>
                <div class="card-body p-5">
                  <p class="card-text text-muted fs-5">${data.location.name}</p>
                  <h1 class="card-title display-1">${Day[0].day.avgtemp_f}</h1>
                  <p class="card-text text-muted fs-5">${Day[0].day.avgtemp_c}</p>
                  <img src="${Day[0].day.condition.icon}" >
                  <p class="text-primary">${Day[0].day.condition.text}</p>
                </div>
                <div class="d-flex justify-content-center align-items-center gap-3 p-2">
                  <div class="d-flex justify-content-between gap-2 text-muted">
                    <i class="fa-solid fa-umbrella-beach mt-2"></i>
                    <p class="fs-5">20%</p>
                  </div>
                  <div class="d-flex justify-content-between gap-2 text-muted">
                    <i class="fa-solid fa-tower-broadcast mt-2"></i>
                    <p class="fs-5">18km/h</p>
                  </div>
                  <div class="d-flex justify-content-between gap-2 text-muted">
                    <i class="fa-solid fa-film mt-2"></i>
                    <p class="fs-5">East</p>
                  </div>
                </div>
        `
        cartona2 =`
                <div class="card-header">
                  <div class="d-flex justify-content-between">
                    <p>${tomorrow.toDateString().split(' ',1).join(' ') + 'day'}</p>
                    <p>${tomorrow.toDateString().split(' ')[2] + tomorrow.toDateString().split(' ')[1]}</p>
                  </div>
                </div>
                <div class="card-body p-5 text-center">
                  <h1 class="card-title display-1">${Day[1].day.avgtemp_f}</h1>
                  <p class="card-text text-muted fs-5">${Day[1].day.avgtemp_c}</p>
                  <img src="${Day[1].day.condition.icon}" >
                  <p class="text-primary">${Day[1].day.condition.text}</p>
                </div>
        `
        cartona3 =`
                <div class="card-header">
                  <div class="d-flex justify-content-between">
                    <p>${dayAfterTomorrow.toDateString().split(' ',1).join(' ') + 'day'}</p>
                    <p>${dayAfterTomorrow.toDateString().split(' ')[2] + dayAfterTomorrow.toDateString().split(' ')[1]}</p>
                  </div>
                </div>
                <div class="card-body p-5 text-center">
                  <h1 class="card-title display-1">${Day[2].day.avgtemp_f}</h1>
                  <p class="card-text text-muted fs-5">${Day[2].day.avgtemp_c}</p>
                  <img src="${Day[2].day.condition.icon}" >
                  <p class="text-primary">${Day[2].day.condition.text}</p>
                </div>
        ` 
        
    }
    document.getElementById('onecard').innerHTML = cartona1;
    document.getElementById('twocard').innerHTML = cartona2;
    document.getElementById('threecard').innerHTML = cartona3;
}


