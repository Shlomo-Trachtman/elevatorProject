import { BuildingElement } from '../../types.ts';




export class Elevator implements BuildingElement {
    id: number;
    currentFloor: number;
    element: HTMLElement;
    floorHeight: number;
    destinations: number[];
    inMotion: boolean; // Flag to indicate whether the elevator is in motion
    elevatorSound: HTMLAudioElement;

    constructor(id: number, element: HTMLElement, floorHeight: number) {
        this.id = id;
        this.currentFloor = 0;
        this.element = element!;
        this.floorHeight = floorHeight;
        this.destinations = [];
        this.inMotion = false; // Initialize inMotion flag to false
        this.elevatorSound = new Audio('ding.mp3');
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
        let duration = Math.abs((this.currentFloor *+ this.floorHeight) - distanceToMove) / speed;
        duration = Math.max(0.5, Math.min(3, duration)); // Clamp duration between 0.5s and 3s

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
            for (let i = 0; i < numElevators; i++){                
                const elevatorElement = document.getElementById(`e${i}`);
                if (elevatorElement) {
                    const elevator = new Elevator(i, elevatorElement, floorHeight);
                    this.elevators.push(elevator);
                } else {
                    console.error(`Elevator element with ID 'e${i}' not found.`);
                }
        }
    }


    




    callElevator(targetFloor: number) {
        // Find if there's elevator on the target floor
        const elevatorOnFloor = this.elevators.find(elevator => elevator.currentFloor === targetFloor);

        // If there's no elevator on the target floor
        const test :{
            time: number,
            elevator: Elevator
        } =  {  
            time: 0,
            elevator: this.elevators[0]
         }
           
        if (!elevatorOnFloor) {

            for (let instanceElevatorIndex = 0; instanceElevatorIndex < this.elevators.length; instanceElevatorIndex ++) {
                const elevator = this.elevators[instanceElevatorIndex];
                if (elevator.currentFloor === 0) {
                    test.time = targetFloor * 0.5;
                    test.elevator = elevator;
                    break;
                }


                if (elevator.destinations.length === 0) {
                    const time = Math.abs(elevator.currentFloor - targetFloor) * 0.5;
                    if (time < test.time) {
                        test.time = time;
                        test.elevator = elevator;
                    }
                    continue;
                }


                let len = elevator.destinations.length * 2;
                for (let j = 0; j < elevator.destinations.length; j++) {
                    len += Math.abs(elevator.currentFloor - elevator.destinations[j]) * 0.5; 
                    if (test.time === 0 || len < test.time) {
                        test.time = len;
                        test.elevator = elevator;
                    }
                }
            }
        }

        return test.elevator.moveToFloor(targetFloor);
    }
    

    
    

    private setTimer(elevator: Elevator, timerElement: HTMLElement, targetFloor: number, totalTime: number) {
        let timeElapsed = 0;
        const timerInterval = setInterval(() => {
            timeElapsed += 1000; // Increment time by 1 second
            
            // Calculate remaining time
            const remainingTime = Math.max(0,totalTime - timeElapsed);
            console.log(`HHH ${totalTime}`);
            const minutes = Math.floor((remainingTime / (1000 * 60)) % 60).toString().padStart(2, "0");
            const seconds = Math.floor((remainingTime / 1000) % 60).toString().padStart(2, "0");
            timerElement.textContent = `${minutes}:${seconds}`;

            // Check if the elevator has reached the floor
            if (elevator.currentFloor === targetFloor) {
            
                clearInterval(timerInterval);
            }
        }, 1000);
    }
}