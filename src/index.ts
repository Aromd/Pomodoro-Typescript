// Abrir y cerrar modal
const closeBtn = document.querySelector('.modal__close img') as HTMLImageElement;
const modal = document.querySelector('.modal__wrapper') as HTMLDivElement;
const optionsBtn = document.querySelector('.btn__options') as HTMLButtonElement;
const minutesDom = document.querySelector('.minutes') as HTMLSpanElement;
const secondsDom = document.querySelector('.seconds') as HTMLSpanElement;
const startBtn = document.querySelector('.btn_start') as HTMLButtonElement;

optionsBtn.addEventListener('click', () => {
    modal.classList.add('open');
});

closeBtn.addEventListener('click', () => {
    modal.classList.remove('open');
});

// pomodoro 

const pomodoro = {
       started: false,
       minutes: 25,
       seconds: 0,
       //setea los minutos del pomodoro
       setPomodoroTime(minutes: number = 25): void {
           this.minutes = Math.abs(minutes);
           this.minutes < 10 && this.minutes > -1
           ? minutesDom.innerText = "0" + this.minutes.toFixed().toString()
           : minutesDom.innerText = this.minutes.toFixed().toString();
           secondsDom.innerText = "0" + this.seconds.toString();
       },
       // 
       refreshPomodoro():void {
           if(this.minutes != 0) {
                this.seconds = 60;
                setInterval(() => {
                    const newTime = this.seconds -1;
                    this.setPomodoroTime(newTime);
                }, 1000);
           }
       }
}

window.onload = () => {
    pomodoro.setPomodoroTime();
    pomodoro.refreshPomodoro();
};



const play = (): void => {
    setInterval(() => {

    }, 1000)
}