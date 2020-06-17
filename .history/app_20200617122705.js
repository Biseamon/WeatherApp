window.addEventListener('load', ()=> {
  let long;
  let lat;
  let tempDesc = document.querySelector(".description");
  let tempDegree = document.querySelector(".degree");
  let locationTimeZone = document.querySelector(".location-timezone");

  if  (navigator.geolocation){
    navigator.geolocation.getCurrentPosition( position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const proxy = 'https://cors-anywhere.herokuapp.com/'
      const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`;

      fetch(api)
      .then(respone => {
        return respone.json();
      }).then(data => {
        console.log(data);
        const {temperature, summary} = data.currently;  
        //set elements from the API;
        tempDegree.textContent = temperature;
        tempDesc.textContent = summary;
        locationTimeZone.textContent = data.timezone;
      });

    });
  }

  

});