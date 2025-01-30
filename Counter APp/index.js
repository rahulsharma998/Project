let count = 0;
let maxValue=parseInt(document.getElementById("maxValueInput").value)||100;

const counter = document.getElementById('counter');
const increment = document.getElementById('Incre');
const decrement = document.getElementById('decre');
const reset = document.getElementById('reset');
const customValueInput = document.getElementById('customValue');
const voiceControlButton = document.getElementById('voice-control');
const progressBar= document.getElementById("progress-bar");
const progressPercentage=document.getElementById("progress-percentage");


function updateCounter() {
  counter.textContent = count;
}

increment.addEventListener('click', () => {
  const customValue = parseInt(customValueInput.value) || 1;
  count += customValue;
  updateCounter();
});

decrement.addEventListener('click', () => {
  const customValue = parseInt(customValueInput.value) || 1;
  count -= customValue;
  updateCounter();
});

reset.addEventListener('click', () => {
  count = 0;
  updateCounter();
});

document.addEventListener('keydown', function (event) {
  const customValue = parseInt(customValueInput.value) || 1;

  if (event.key === '+') {
    count += customValue;
    updateCounter();
  } else if (event.key === '-') {
    count -= customValue;
    updateCounter();
  } else if (event.key === 'r') {
    count = 0;
    updateCounter();
  }
});

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.continuous = false;
recognition.lang = 'en-US';

voiceControlButton.addEventListener('click', () => {
  recognition.start();
});

recognition.onresult = (e) => {
  const command = e.results[0][0].transcript.toLowerCase();
  console.log('Voice command received:', command);

  if (command.includes('increment')) {
    const customValue = parseInt(customValueInput.value) || 1;
    count += customValue;
    updateCounter();
    alert('Increment by ' + customValue);
  } else if (command.includes('decrement')) {
    const customValue = parseInt(customValueInput.value) || 1;
    count -= customValue;
    updateCounter();
    alert('Decrement by ' + customValue);
  } else if (command.includes('reset')) {
    count = 0;
    updateCounter();
    alert('Reset to 0');
  } else {
    alert("Sorry, I didn't understand the command.");
  }
};

maxValueInput.addEventListener('input',()=>{
  maxValue=parseInt(maxValueInput.value)||100;
  updateCounter();
});


function updateProgressBar() {
  const percentage = Math.min((count / maxValue) * 100, 100);  
  progressBar.style.width = `${percentage}%`;  
  progressPercentage.textContent = `${Math.round(percentage)}%`;  
}


function updateCounter(){
  count=Math.max(0,Math.min(count,maxValue));
  counter.textContent=count;
  updateProgressBar();
}
