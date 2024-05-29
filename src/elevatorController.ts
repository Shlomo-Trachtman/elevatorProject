import { Elevator } from './moveElevator';

export class ElevatorController {
    numOfBuildings: number;
    elevators: Elevator[];

    constructor(numElevators: number, floorHeight: number, numOfBuildings: number) {
        this.elevators = [];
        this.numOfBuildings = numOfBuildings;

        // Initialize elevators for each building
        for (let buil = 0; buil < numOfBuildings; buil++) {
            for (let i = 0; i < numElevators; i++) {
                const elevatorElement = document.getElementById(`b${buil}-e${i}`);
                if (elevatorElement) {
                    const elevator = new Elevator({ id: i, element: elevatorElement, floorHeight });
                    this.elevators.push(elevator);
                } else {
                    console.error(`Elevator element with ID 'b${buil}-e${i}' not found.`);
                }
            }
        }
    }

    callElevator(buildingId: string, targetFloor: number, button: HTMLButtonElement) {
        // Find elevators belonging to the specified building
        const elevatorsInBuilding = this.elevators.filter(elevator => elevator.element.id.startsWith(buildingId));

        // Find if there's an elevator on the target floor in the specified building
        const elevatorOnFloor = elevatorsInBuilding.find(elevator => elevator.currentFloor === targetFloor);

        // If there's no elevator on the target floor in the specified building
        const test: {
            time: number,
            elevator: Elevator
        } = {
            time: Infinity,
            elevator: elevatorsInBuilding[0]
        };

        if (!elevatorOnFloor) {
            for (let i = 0; i < elevatorsInBuilding.length; i++) {
                const elevator = elevatorsInBuilding[i];
                if (elevator.destinations.length === 0) {
                    const time = Math.abs(elevator.currentFloor - targetFloor) * 0.5;
                    if (time < test.time) {
                        test.time = time;
                        test.elevator = elevator;
                    }
                    continue;
                }
                let time = Math.abs(elevator.currentFloor - elevator.destinations[0]) * 0.5;
                for (let j = 0; j < elevator.destinations.length - 1; j++) {
                    time += Math.abs(elevator.destinations[j] - elevator.destinations[j + 1]) * 0.5 + 2;
                }
                time += Math.abs(elevator.destinations[elevator.destinations.length - 1] - targetFloor) * 0.5;
                if (time < test.time) {
                    test.time = time;
                    test.elevator = elevator;
                }
            }
        }

        // Create a timer for displaying the waiting time
        const timer = new Timer();
        const timerElement = timer.createTimer(parseInt(buildingId), targetFloor);
        document.body.appendChild(timerElement);

        // Update timer every second
        const timerInterval = setInterval(() => {
            test.time -= 1;
            if (test.time <= 0) {
                clearInterval(timerInterval);
                timerElement.innerText = '';
                timerElement.remove(); // Remove timer element when time is up
            } else {
                timerElement.innerText = `${test.time}`;
            }
        }, 1000);

        // Move elevator to the target floor
        return test.elevator.moveToFloor(targetFloor);
    }
}

// Timer class for creating timers with unique IDs
export class Timer {
    createTimer(buildingIndex: number, floor: number): HTMLDivElement {
        const timerDiv = document.createElement('div');
        timerDiv.classList.add('timer');
        // Assign a unique ID for each floor's timer within the building
        timerDiv.id = `b${buildingIndex}-t${floor}-timer`;
        return timerDiv;
    }
}
