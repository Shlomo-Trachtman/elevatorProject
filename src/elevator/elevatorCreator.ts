export class Elevator {
    elevatorHeight: number;
    numElevators: number;

    constructor(elevatorHeight: number, numElevators: number) {
        this.elevatorHeight = elevatorHeight;
        this.numElevators = numElevators;
    }

    createElevators(buildingIndex: number): HTMLDivElement {
        const elevatorsContainer = document.createElement('div');
        elevatorsContainer.classList.add('elevatorsContainer');

        for (let e = 0; e < this.numElevators; e++) {
            const elevatorDiv = document.createElement('div');
            elevatorDiv.classList.add(`elevator${e}`);
            const elevatorImg = document.createElement('img');
            elevatorImg.id = `b${buildingIndex}-e${e}`;
            elevatorImg.src = "./public/elv.png";
            elevatorImg.height = this.elevatorHeight;
            elevatorDiv.appendChild(elevatorImg);
            elevatorsContainer.appendChild(elevatorDiv);
        }
        return elevatorsContainer;
    }
}
