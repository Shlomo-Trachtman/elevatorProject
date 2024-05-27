import { Elevator } from './elevatorCreator';
import { Floor } from './floorCreator';

export class Building {
    mainContainer: HTMLDivElement;
    floorHeight: number;
    numFloors: number;
    numElevators: number;
    numOfBuildings: number;
    allBuildings: HTMLDivElement;
    elevatorHeight: number;

    constructor(mainContainer: HTMLDivElement, floorHeight: number, elevatorHeight: number,
                numFloors: number, numElevators: number, numOfBuildings: number, allBuildings: HTMLDivElement) {
        this.mainContainer = mainContainer;
        this.floorHeight = floorHeight;
        this.elevatorHeight = elevatorHeight;
        this.numFloors = numFloors;
        this.numElevators = numElevators;
        this.numOfBuildings = numOfBuildings;
        this.allBuildings = allBuildings;
    }

    createBuilding(buildingIndex: number): HTMLDivElement {
        const buildingDiv = document.createElement('div');
        buildingDiv.classList.add('building');
        buildingDiv.id = `b${buildingIndex}`;
        this.allBuildings.appendChild(buildingDiv);

        const floor = new Floor(this.numFloors);
        const elevator = new Elevator(this.elevatorHeight, this.numElevators);

        const floorsContainer = floor.createFloors(buildingIndex);
        const elevatorsContainer = elevator.createElevators(buildingIndex);

        buildingDiv.appendChild(floorsContainer);
        buildingDiv.appendChild(elevatorsContainer);

        return buildingDiv;
    }

    createBuildings() {
        for (let i = 0; i < this.numOfBuildings; i++) {
            this.createBuilding(i);
        }
    }
}
