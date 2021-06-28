import { clockTime, endTime } from "./index";

//Muestra tiempo restante
export const displayTimeLeft = (seconds: number):void => {
    if(seconds){
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes}:${remainderSeconds < 10 ? "0" : ""}${remainderSeconds}`;
    clockTime.textContent = display;
    document.title = (display === "0:00") ? "Pomodoro Finalizado" : display;}
    else return;
};

// Muestra hora de finalización
export const displayEndTime = (timestamp: number):void => {
    const end = new Date(timestamp);
    const hour = end.getHours();
    const minutes = end.getMinutes();
    endTime.textContent = `Próximo descanso - ${hour}:${minutes < 10 ? "0" : ""}${minutes}`;
};

