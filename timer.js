const minContainer = document.querySelector("#min");
const secContainer = document.querySelector("#sec");
const header = document.querySelector("h1");

let timer_set = 0;
let min = 0;
let sec = 0;
let interval = null;

// Función para obtener parámetros de URL
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Inicializa timer con el tiempo pasado por URL (en minutos)
function initializeTimerFromURL() {
  const timeParam = getQueryParam("time");
  if (timeParam) {
    timer_set = parseInt(timeParam) * 60;
    updateHMS();
    minContainer.setAttribute("readonly", "true");
    secContainer.setAttribute("readonly", "true");
  }
}

// Actualiza el UI con minutos y segundos
const updateUI = () => {
  minContainer.value = min.toString().padStart(2, "0");
  secContainer.value = sec.toString().padStart(2, "0");
};

// Actualiza minutos y segundos a partir de timer_set (en segundos)
const updateHMS = () => {
  min = Math.floor(timer_set / 60);
  sec = timer_set % 60;
  updateUI();
};

// Resetea el timer

// Acción cuando el timer termina
const endTicking = () => {
  header.innerText = "Time's Up!!";
  const audio = new Audio('bell_sound.mp3'); // Asegúrate que el archivo exista en la ruta
  audio.play();

  setTimeout(() => {
    header.innerText = "The FishTank Pomodoro";
  }, 3000);

  resetTime();
};

// Función que corre el timer en intervalos
const startTicking = () => {
  if (timer_set > 0) {
    interval = setInterval(() => {
      timer_set -= 1;

      if (timer_set <= 0) {
        clearInterval(interval);
        interval = null;
        endTicking();
      } else {
        updateHMS();
      }
    }, 1000);
  } else {
    alert("Por favor, ingresa un tiempo mayor a 0.");
  }
};

// Inicia el timer con los valores de los inputs
const startTime = () => {
  if (interval) {
    alert("El temporizador ya está corriendo.");
    return;
  }

  min = parseInt(minContainer.value) || 0;
  sec = parseInt(secContainer.value) || 0;

  if (sec >= 60) {
    min += Math.floor(sec / 60);
    sec = sec % 60;
  }

  timer_set = min * 60 + sec;

  if (timer_set <= 0) {
    alert("Por favor, ingresa un tiempo mayor a 0.");
    return;
  }

  minContainer.setAttribute("readonly", "true");
  secContainer.setAttribute("readonly", "true");

  updateHMS();
  startTicking();
};

// Para el timer
const stopTime = () => {
  if (interval) {
    clearInterval(interval);
    interval = null;
  }

  minContainer.removeAttribute("readonly");
  secContainer.removeAttribute("readonly");
};

// Escuchar cambios manuales para mantener UI actualizada
minContainer.addEventListener("change", () => {
  min = parseInt(minContainer.value) || 0;
  updateUI();
});

secContainer.addEventListener("change", () => {
  sec = parseInt(secContainer.value) || 0;
  if (sec >= 60) {
    min += Math.floor(sec / 60);
    sec = sec % 60;
  }
  updateUI();
});

// Al cargar la página inicializar con el parámetro URL si existe
window.onload = () => {
  initializeTimerFromURL();
};
