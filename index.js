let input_ip = document.querySelector("#input_ip");
const btn_submit = document.querySelector("#btn_ip");
const api =
  "https://geo.ipify.org/api/v1?apiKey=at_IGgfN6y8XuYIAyf90S4pk9l3OlLfY&ipAddress=";
const tilesProvider = "	https://a.tile.openstreetmap.org/{z}/{x}/{y}.png";
const p = document.getElementsByClassName('p-section');
const bubble = document.getElementById('bubble');


for(let i=0; i<p.length; i++){
  p[i].innerHTML = "Cargando..."
}

async function getIp(){
    const res = await fetch('https://api.ipify.org/?format=json');
    const data = await res.json();
    const { ip } = data;
    getLocation(api, ip)
    .then((data)=>{
      p[0].innerHTML = ip;
      p[1].innerHTML = data.location.city
      p[2].innerHTML = data.location.timezone
      p[3].innerHTML = data.isp 
    })
    return ip;  
}
getIp();


async function getLocation(api, ip) {
  try {
    const res = await fetch(`${api}${ip}`);
    const data = await res.json();
    const coords = [data.location.lat, data.location.lng];
    mymap.setView(coords);
    const marker = L.marker(coords).bindPopup("You are here!");
    mymap.addLayer(marker);
    console.log("Estos son mis datos: ", data);
    return data;
  } catch (e) {
    console.error(e);
  }
}

input_ip.addEventListener('click', (e) => {
 bubble.classList.add('bubble-class')
 console.log(e);
})



btn_submit.addEventListener("click", () => {
  if (input_ip.value === "") {
    alert('Tienes que ingresar una IP');
    getIp()
    .then( (ip) => {
      p[0].innerHTML = ip;
    })
  }
  

  getLocation(api, input_ip.value)
  .then((data)=>{
    p[0].innerHTML = input_ip.value
    p[1].innerHTML = data.location.city
    p[2].innerHTML = data.location.timezone
    p[3].innerHTML = data.isp 
  })
});

let mymap = L.map("mapid").setView([51.505, -0.09], 13);
L.tileLayer(tilesProvider, {
  maxZoom: 18,
}).addTo(mymap);

mymap.locate({ enableHighAccuracy: true });

mymap.on("locationfound", (e) => {
    // console.log(e);
  const coords = [e.latlng.lat, e.latlng.lng];
  mymap.setView(coords);
  const marker = L.marker(coords).bindPopup("You are here!");
  mymap.addLayer(marker);
});
