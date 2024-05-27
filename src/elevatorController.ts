import { Elevator } from './moveElevator';

export class ElevatorController {

    numOfBuildings : number;

    elevators: Elevator[];

    constructor(numElevators: number, floorHeight: number, numOfBuildings: number) {
        this.elevators = [];
        this.numOfBuildings = numOfBuildings;
            for (let buil = 0; buil < numOfBuildings; buil++){
                for (let i = 0; i < numElevators; i++){                
                    const elevatorElement = document.getElementById(`b${buil}-e${i}`);
                    if (elevatorElement) {
                        const elevator = new Elevator({ id: i, element: elevatorElement, floorHeight });
                        this.elevators.push(elevator);
                    } else {
                        console.error(`Elevator element with ID 'b${buil}-e${i}' not found.`);
                    }}
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
        
        const timer = setInterval(() => {
            let buil = buildingId;
            const title = document.getElementById(`b${buil}-t${targetFloor}`) as HTMLButtonElement;
            test.time -= 1;
            if (test.time <= 0) {
                clearInterval(timer);
                title.innerText = '';
            } else {
                title.innerText = `${test.time} seconds.`;
            }
        }, 1000);
        
        return test.elevator.moveToFloor(targetFloor);

        }
}