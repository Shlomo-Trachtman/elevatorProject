import { ElevatorController } from './elevatorController';
import { Building } from './buildingCreator';

let numOfBuildings: number = 1;
let numberOfFloors: number = 7; // Default number of floors
let numberOfElevators: number = 3; // Default number of elevators
const floorHeight = 110;
const elevatorHeight = 107;

const submitBtn = document.getElementById('submitBtn')!;
const mainContainer = document.querySelector('.mainContainer')! as HTMLDivElement;

const buildingsContainer = document.createElement('div');
buildingsContainer.classList.add('allBuildings');
document.body.appendChild(buildingsContainer);

const all = document.querySelector('.allBuildings')! as HTMLDivElement;

submitBtn.addEventListener('click', () => {
    console.log('submit button clicked');
    const numBuildingsInput = document.getElementById('numBuildings') as HTMLInputElement;
    const numFloorsInput = document.getElementById('numFloors') as HTMLInputElement;
    const numElevatorsInput = document.getElementById('numElevators') as HTMLInputElement;

    numOfBuildings = parseInt(numBuildingsInput.value);
    numberOfFloors = parseInt(numFloorsInput.value);
    numberOfElevators = parseInt(numElevatorsInput.value);

    console.log(`Number of buildings: ${numOfBuildings}`);
    console.log(`Number of floors: ${numberOfFloors}`);
    console.log(`Number of elevators: ${numberOfElevators}`);

    for (let b = 0; b < numOfBuildings; b++) {
        const buildingAndElevators = new Building(mainContainer, floorHeight, elevatorHeight, numberOfFloors, numberOfElevators, numOfBuildings, buildingsContainer);
        buildingAndElevators.createBuilding(b);
        
        const elevatorController = new ElevatorController(numberOfElevators, floorHeight, numOfBuildings);
    
        // Access an individual element from the buildingContainer collection
        all.addEventListener('click', (event) => {
            const clickedElement = event.target as HTMLElement;
            // Check if the clicked element is a floor button
            if (clickedElement.tagName === "BUTTON") {
                const buttonElement = clickedElement as HTMLButtonElement; // Type assertion
                const idOfThisFloor = buttonElement.id;
                const buildingId = idOfThisFloor.split('-')[0]; // Extract building ID from floor ID
                const floorNumber = parseInt(idOfThisFloor.split('-')[1].substring(1)); // Extract floor number from floor ID
                elevatorController.callElevator(buildingId, floorNumber, buttonElement);
            }
        });
    }
});
