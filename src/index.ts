import { displayEndTime, displayTimeLeft } from "./display";
import { formData } from "./form";
import { isPomodoro } from "./interface";

export const clockTime = document.querySelector('.clock__time') as HTMLParagraphElement;
export const endTime = document.querySelector('.clock__endtime') as HTMLParagraphElement;
const modal = document.querySelector('.modal__wrapper') as HTMLDivElement;
const closeBtn = document.querySelector('.modal__close img') as HTMLImageElement;
const optionsBtn = document.querySelector('.btn__options') as HTMLButtonElement;
const startPauseBtn = document.querySelector('.btn__start') as HTMLButtonElement;
const stopBtn = document.querySelector('.btn__stop') as HTMLButtonElement;
const form = document.querySelector('form') as HTMLFormElement;


// Abrir y cerrar modal
optionsBtn.addEventListener('click', () => {
    modal.classList.add('open');
});

closeBtn.addEventListener('click', () => {
    modal.classList.remove('open');
});

// pomodoro 
// let secondsLeft: number;

const pomodoro: isPomodoro = {
       started: false,
       initialSeconds: 1500,
       secondsLeft: 1500,
}

let countdown: NodeJS.Timeout;

const timer = (timePomodoro: number) => {
    //limpia los timers existentes
     clearInterval(countdown);

    const now = Date.now();
    const then = now + (timePomodoro) * 1000;
    displayTimeLeft(timePomodoro);
    displayEndTime(then);

    countdown = setInterval(() => {
     pomodoro.secondsLeft = Math.round((then - Date.now()) / 1000);
     // Se detiene al llegar a 0
     if(pomodoro.secondsLeft < 0){
         clearInterval(countdown);
         return;
     }
     //display
     displayTimeLeft(pomodoro.secondsLeft);
     return pomodoro.secondsLeft;
    }, 1000);
}


form.addEventListener('submit', (e) => {
    e.preventDefault();
    clearInterval(countdown);
    const data = formData(form);
    const pomoMinutes = parseInt(data.datapomodoro);
    const breakMinutes = parseInt(data.databreak);
    pomodoro.secondsLeft = pomoMinutes*60;
    displayTimeLeft(pomodoro.secondsLeft);
    modal.classList.remove('open');
    form.reset();
    endTime.textContent = "";
    pomodoro.started = false;
    startPauseBtn.textContent="Inicio";
    pomodoro.initialSeconds = pomoMinutes*60;
});


startPauseBtn.addEventListener('click', () => {
    if(!pomodoro.started){
        pomodoro.started = true;
        timer(pomodoro.secondsLeft);
        startPauseBtn.textContent="Pausa"
    } else {
        clearInterval(countdown);
        pomodoro.started = false;
        endTime.textContent = "";
        startPauseBtn.textContent="Inicio";
    }
});

stopBtn.addEventListener('click', () => {
    clearInterval(countdown);
    pomodoro.secondsLeft = pomodoro.initialSeconds;
    displayTimeLeft(pomodoro.secondsLeft);
    pomodoro.started = false;
    startPauseBtn.textContent = "Inicio";
    endTime.textContent = "";
});

window.onload = () => {displayTimeLeft(pomodoro.secondsLeft)};