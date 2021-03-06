window.addEventListener('load', ()=> {
  let long;
  let lat;

  if  (navigator.geolocation){
    navigator.geolocation.getCurrentPosition( position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const api = `https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`;

      fetch(api)
      .then(respone => {
        return respone.json();
      }).then(data => {
        console.log(data);  
      })

    });
  }
});