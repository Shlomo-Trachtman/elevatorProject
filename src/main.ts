import { ElevatorController } from './elevator/elevatorController';
import { Building } from './building/buildingCreator';

const floorHeight = 110;
const elevatorHeight = 107;

const mainContainer = document.querySelector('.mainContainer')! as HTMLDivElement;

const buildingsContainer = document.createElement('div');
buildingsContainer.classList.add('allBuildings');
document.body.appendChild(buildingsContainer);

const all = document.querySelector('.allBuildings')! as HTMLDivElement;

async function loadConfig() {
    try {
        const response = await fetch('buildingConfig.json');
        const config = await response.json();

        config.buildings.forEach((buildingConfig: { floors: number; elevators: number }, index: number) => {
            const { floors, elevators } = buildingConfig;
            console.log(`Building ${index + 1} - Floors: ${floors}, Elevators: ${elevators}`);

            const buildingAndElevators = new Building(mainContainer, floorHeight, elevatorHeight, floors, elevators, config.buildings.length, buildingsContainer);
            buildingAndElevators.createBuilding(index);

            const elevatorController = new ElevatorController(elevators, floorHeight, config.buildings.length);

            all.addEventListener('click', (event) => {
                const clickedElement = event.target as HTMLElement;
                if (clickedElement.tagName === "BUTTON") {
                    const buttonElement = clickedElement as HTMLButtonElement;
                    const idOfThisFloor = buttonElement.id;
                    const buildingId = idOfThisFloor.split('-')[0];
                    const floorNumber = parseInt(idOfThisFloor.split('-')[1].substring(1));
                    elevatorController.callElevator(buildingId, floorNumber, buttonElement);
                }
            });
        });
    } catch (error) {
        console.error('Error loading configuration:', error);
    }
}

// Call the loadConfig function directly when the script is executed
loadConfig();
