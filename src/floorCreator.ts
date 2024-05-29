import { Timer } from './timerCreator';
import { ElevatorController } from './elevatorController';

export class Floor {
    numFloors: number;

    constructor(numFloors: number) {
        this.numFloors = numFloors;
    }

    createFloors(buildingIndex: number): HTMLDivElement {
        const floorsContainer = document.createElement('div');
        floorsContainer.classList.add('floorsContainer');

        for (let floor = this.numFloors; floor >= 0; floor--) {
            const floorDiv = document.createElement('div');
            floorDiv.classList.add('floor');
            
            // Create and append the floor button
            const button = document.createElement('button');
            button.id = `b${buildingIndex}-f${floor}`;
            button.classList.add('metal', 'linear');
            button.innerText = `${floor}`;
            floorDiv.appendChild(button);

            // Create and append the timer for the floor
            const timer = new Timer();
            const timerDiv = timer.createTimer(buildingIndex, floor);

            floorDiv.appendChild(timerDiv);

            floorsContainer.appendChild(floorDiv);
        }
        return floorsContainer;
    }
}
