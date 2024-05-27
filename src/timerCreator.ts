export class Timer {
    createTimer(buildingIndex: number, floor: number): HTMLDivElement {
        const timerDiv = document.createElement('div');
        timerDiv.classList.add('timer');
        // Assign a unique ID for each floor's timer within the building
        timerDiv.id = `b${buildingIndex}-timer-f${floor}`;
        return timerDiv;
    }
}
