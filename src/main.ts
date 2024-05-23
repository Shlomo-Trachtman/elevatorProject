import { ElevatorController } from './controller';
import { BuildingAndElevators } from './creator';

let numOfBuildings: number = 1;
let numberOfFloors: number = 7; // Default number of floors
let numberOfElevators: number = 3; // Default number of elevators
const floorHeight = 103;

const submitBtn = document.getElementById('submitBtn')!;
const mainContainer = document.querySelector('.mainContainer')! as HTMLDivElement;



const buildingsContainer = document.createElement('div');
buildingsContainer.classList.add('allBuildings');
document.body.appendChild(buildingsContainer);


const all = document.querySelector('.allBuildings')! as HTMLDivElement;

console.log(all, "all");

// Create an array to store elevator controllers for each building

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
        const buildingAndElevators = new BuildingAndElevators(mainContainer, floorHeight, numberOfFloors, numberOfElevators, numOfBuildings,buildingsContainer);
        buildingAndElevators.CreateBuilding(b);
        
        const elevatorController = new ElevatorController(numberOfElevators, floorHeight, numOfBuildings);
    
        // Access an individual element from the buildingContainer collection
        all.addEventListener('click', (event) => {
            const idOfThisFloor = (event.target as HTMLElement).id;
            console.log(idOfThisFloor);
            console.log(parseInt(idOfThisFloor.substring(1)));

            elevatorController.callElevator(parseInt(idOfThisFloor.substring(1)));
    
        })
    }


});
















