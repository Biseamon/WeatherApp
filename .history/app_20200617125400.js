window.addEventListener('load', ()=> {
  let long;
  let lat;
  let tempDesc = document.querySelector(".description");
  let tempDegree = document.querySelector(".degree");
  let locationTimeZone = document.querySelector(".location-timezone");
  let degreeSection = document.querySelector(".temperature");
  let degreeF = document.querySelector(".temperature span");

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
        const {temperature, summary, icon} = data.currently;  
        //set elements from the API;
        tempDegree.textContent = temperature;
        tempDesc.textContent = summary;
        locationTimeZone.textContent = data.timezone;
        //Formula for celcius
        let celcius = (tempDegree - 32) * (5 / 9);

        //set icons
        setIcons(icon, document.querySelector('.icon'));

        //Celcius convertion
        degreeSection.addEventListener('click', () => {
          if(degreeF.textContent === 'F'){
            degreeF.textContent = 'C';
            degreeSection.textContent = Math.floor(celcius);
          }else{
            degreeF.textContent = 'F';
            degreeSection.textContent = tempDegree;
          }
        })


      });

    });
  }

  function setIcons(icon, iconID){
      const skycons = new Skycons({color:"white"});
      const currIcon = icon.replace(/-/g, "_").toUpperCase();
      skycons.play();
      return skycons.set(iconID, Skycons[currIcon]);
  }

});