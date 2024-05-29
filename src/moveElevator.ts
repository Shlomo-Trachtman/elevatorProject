export class Elevator {
    id: number;
    currentFloor: number;
    element: HTMLElement;
    floorHeight: number;
    destinations: number[];
    inMotion: boolean;
    elevatorSound: HTMLAudioElement;

    constructor({ id, element, floorHeight }: { id: number; element: HTMLElement; floorHeight: number; }) {
        this.id = id;
        this.currentFloor = 0;
        this.element = element!;
        this.floorHeight = floorHeight;
        this.destinations = [];
        this.inMotion = false; // Initialize inMotion flag to false
        this.elevatorSound = new Audio('./public/ding.mp3');
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
        }, ((calculateDuration * 1000)));


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