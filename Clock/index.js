const tabs ={
    clock: document.getElementById("ClockTab"),
    Stopwatch: document.getElementById("StopwatchTab"),
    timer: document.getElementById("TimerTab"),
    alarm: document.getElementById("AlarmTab"),
};
const sections={
    clock: document.getElementById("ClockSection"),
    Stopwatch: document.getElementById("StopwatchSection"),
    timer: document.getElementById("TimerSection"),
    alarm: document.getElementById("AlarmSection"),
}

function showSelection(selectedSection){
    Object.keys(sections).forEach(section =>{
        sections[section].classList.toggle('hidden',section !==selectedSection);
    });
}

tabs.clock.addEventListener('click',()=>showSelection('clock'));
tabs.Stopwatch.addEventListener('click',()=>showSelection('Stopwatch'));
tabs.timer.addEventListener('click',()=>showSelection('timer'));
tabs.alarm.addEventListener('click',()=>showSelection('alarm'));

showSelection('clock');

// world Clock 

const worldClockContainer=document.getElementById("worldClock");
const addCityButton=document.getElementById("addcity");
const locationInput = document.getElementById("locationInput");
const map=L.map('map').setView([20,0],2);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

map.on('click', async function (e) {
    const {lat,lng}=e.latlng;

    const  geocodeurl=`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`;
    const res=await fetch(geocodeurl);
    const data=await res.json();
    const location=data.address.city || data.address.town || data.address.village || "Unknown Location";
    const country=data.address.country
    const timezone = `${data.address.country_code}/${data.address.city || 'unknown'}`; 
    addClock(`${location}, ${country}`, timezone);
});

async function fetchTimeZone(lat,lng) {
    const timezoneurl=`https://worldtimeapi.org/api/timezone`;
    const res=await fetch(`${timezoneurl}/${lat},${lng}`);
    if (res.ok){
        const data=await res.json();
        return data.timezone;
    }
    alert("could not fetch timezone!");
    return 'UTC';
}

function addClock(location,country,timezone){
    fetch(`https://worldtimeapi.org/api/timezone/${timezone}`)
    .then(res=>res.json())
    .then(data=>{
        const clockDiv=document.createElement('div');
        clockDiv.className='clock';
        clockDiv.innerHTML=`
        <h3>${data.timezone}</h3>
        <div class="time">${new Date(data.datetime).toLocaleTimeString()}</div>`;
        worldClockContainer.appendChild(clockDiv);
        setInterval(()=>{
            clockDiv.querySelector('.time').textContent= new Date().toLocaleTimeString('en-US',{timezone:location});
        },1000);
    })
    .catch(()=>alert("Invalid Location!"));
}
addCityButton.addEventListener('click',()=>{
    const location=locationInput.value.trim();
    if(location) addClock(location,'UTC');
    locationInput.value="";
});