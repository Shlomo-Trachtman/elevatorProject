export class Elevator {
    id: number;
    currentFloor: number;
    element: HTMLElement;
    floorHeight: number;
    destinations: number[];
    inMotion: boolean; // Flag to indicate whether the elevator is in motion
    elevatorSound: HTMLAudioElement;

    constructor({ id, element, floorHeight }: { id: number; element: HTMLElement; floorHeight: number; }) {
        this.id = id;
        this.currentFloor = 0;
        this.element = element!;
        this.floorHeight = floorHeight;
        this.destinations = [];
        this.inMotion = false; // Initialize inMotion flag to false
        this.elevatorSound = new Audio('./src/ding.mp3');
    }

    playElevatorSound() {
        this.elevatorSound.play();
        

    }

    stopElevatorSound() {
        this.elevatorSound.pause();
        this.elevatorSound.currentTime = 0;
    }


    moveToFloor(targetFloor: number) {
        this.destinations.push(targetFloor);
        this.processNextDestination();

    }

    private processNextDestination() {
        if (!this.inMotion && this.destinations.length > 0 && this.currentFloor !== this.destinations[0]) {
            const nextFloor = this.destinations.shift()!;
            document.getElementById(`f${nextFloor}`)?.classList.remove('active');
            this.animateMovementToFloor(nextFloor);

        }
    }

    private animateMovementToFloor(targetFloor: number) {
        let distanceToMove: number;
        if (targetFloor === 0) {
            distanceToMove = 0;
        } else {
            distanceToMove = targetFloor * this.floorHeight;
        }

        // Calculate the duration of the movement
        let floorPressed = targetFloor;
        const speed = 110 / 0.5;
        const stop = 2000;
        let calculateDuration: number;
        if (floorPressed === 0) {
            calculateDuration = (this.currentFloor * this.floorHeight) / speed;
        } else {
            calculateDuration = Math.abs((this.currentFloor - floorPressed) * this.floorHeight) / speed;
        }

        console.log(`Moving from floor ${this.currentFloor} to floor ${targetFloor}`);
        this.inMotion = true;
        this.animateMovement(distanceToMove);
        this.currentFloor = targetFloor;

        setTimeout(() => {
            console.log(`Elevator Reached The Floor`);
            this.playElevatorSound();
        }, ((calculateDuration * 1000) - 500));


        setTimeout(() => {
            if (this.destinations.length > 0) {
                console.log(`Elevator Goes To Next Destination`);
            }
            this.inMotion = false;
            this.processNextDestination();
            this.stopElevatorSound();
        }, (calculateDuration * 1000) + stop);

    }

    public animateMovement(distanceToMove: number) {
        const speed = 110 / 0.5;
        const stop = 2000;
        let duration = Math.abs((this.currentFloor * this.floorHeight) - distanceToMove) / speed;

        this.element.style.transition = `transform ${duration}s linear`;
        this.element.style.transform = `translateY(-${distanceToMove}px)`;

        const timerInterval = setInterval(() => {
            duration--; // Decrease duration by 1 second
            // Stop the timer when duration is less than 0
            if (duration < 0) clearInterval(timerInterval);
        }, 1000);
    }
}




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