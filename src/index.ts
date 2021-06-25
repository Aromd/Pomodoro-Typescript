const clockTime = document.querySelector('.clock__time') as HTMLParagraphElement;
const endTime = document.querySelector('.clock__endtime') as HTMLParagraphElement;
const modal = document.querySelector('.modal__wrapper') as HTMLDivElement;
const closeBtn = document.querySelector('.modal__close img') as HTMLImageElement;
const optionsBtn = document.querySelector('.btn__options') as HTMLButtonElement;
const startBtn = document.querySelector('.btn__start') as HTMLButtonElement;
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
let countdown: NodeJS.Timeout;

//Muestra tiempo restante
const displayTimeLeft = (seconds: number) => {
    if(seconds){
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes}:${remainderSeconds < 10 ? "0" : ""}${remainderSeconds}`;
    clockTime.textContent = display;
    document.title = (display === "0:00") ? "Pomodoro Finalizado" : display;}
    else return;
};

// Muestra hora de finalización
const displayEndTime = (timestamp: number) => {
    const end = new Date(timestamp);
    const hour = end.getHours();
    const minutes = end.getMinutes();
    endTime.textContent = `Próximo descanso - ${hour}:${minutes < 10 ? "0" : ""}${minutes}`;
}

interface isPomodoro {
    started: boolean;
    time: number;
    timer(): void;
}

const pomodoro: isPomodoro = {
       started: false,
       time: 25,
       timer(){
           //limpia los timers existentes
            clearInterval(countdown);

           const now = Date.now();
           const then = now + (this.time * 60) * 1000;
           displayTimeLeft(this.time*60);
           displayEndTime(then);

           countdown = setInterval(() => {
            const secondsLeft = Math.round((then - Date.now()) / 1000);
            // Se detiene al llegar a 0
            if(secondsLeft < 0){
                clearInterval(countdown);
                return;
            }
            //display
            displayTimeLeft(secondsLeft);
           }, 1000);
       }
}

window.onload= () => {displayTimeLeft(25*60)};

const formData = (form: HTMLFormElement) => {
    const inputs = form.querySelectorAll('input');
    let values: {[prop: string]: string} = {};

    inputs.forEach(input => {
        values[input.id] = input.value;
    });
    return values;
};

form.addEventListener('submit', (e) => {
    e.preventDefault();
    clearInterval(countdown);
    const data = formData(form);
    const pomoMinutes = parseInt(data.datapomodoro);
    const breakMinutes = parseInt(data.databreak);
    pomodoro.time = pomoMinutes;
    displayTimeLeft(pomoMinutes*60);
    modal.classList.remove('open');
    form.reset();
    endTime.textContent = "";
});

startBtn.addEventListener('click', () => {
    pomodoro.timer();
});

stopBtn.addEventListener('click', () => {
    clearInterval(countdown);
    console.log("detener");
    endTime.textContent = "";
});