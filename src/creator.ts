


export class BuildingAndElevators {
    mainContainer : HTMLDivElement;
    floorHeight: number;
    numFloors: number;
    numElevators: number;
    numOfBuildings: number;
    allBuildings: HTMLDivElement;


    constructor(mainContainer : HTMLDivElement, floorHeight:number,
                    numFloors: number, numElevators: number, numOfBuildings: number, allBuildings: HTMLDivElement ) {
        this.mainContainer = mainContainer;
        this.floorHeight = floorHeight;
        this.numFloors = numFloors;
        this.numElevators = numElevators;
        this.numOfBuildings = numOfBuildings;
        this.allBuildings = allBuildings;

    
    }

    CreateFloors = () => {

        // Create floors container
        const floorsContainer = document.createElement('div');
        floorsContainer.classList.add('floorsContainer');


        for (let floor = this.numFloors; floor >= 0; floor--) {
            const floorDiv = document.createElement('div');
            floorDiv.classList.add('floor');
            const button = document.createElement('button');
            button.id = `f${floor}`;
            button.classList.add('metal', 'linear');
            button.innerText = `${floor}`;
            floorDiv.appendChild(button);
            floorsContainer.appendChild(floorDiv);
        }
        return floorsContainer;
    }

    CreateElevators = () => {

        // Create elevators container
        const elevatorsContainer = document.createElement('div');
        elevatorsContainer.classList.add('elevatorsContainer');
        

        for (let e = 0; e < this.numElevators; e++) {
            const elevatorDiv = document.createElement('div');
            elevatorDiv.classList.add(`elevator${e}`);
            const elevatorImg = document.createElement('img');
            elevatorImg.id = `e${e}`;
            elevatorImg.src = "./src/elv.png";
            elevatorImg.height = this.floorHeight;
            elevatorDiv.appendChild(elevatorImg);
            elevatorsContainer.appendChild(elevatorDiv);
        }
        return elevatorsContainer;
    }

    CreateBuilding = (b: number) => {

        // remove main container
        this.mainContainer.remove()

        // Create building container
        const buildingContainer = document.createElement('div');
        this.allBuildings.appendChild(buildingContainer);

        buildingContainer.classList.add(`buildingContainer${b}`);


        // Create floors elements
        const Floors = this.CreateFloors();
    
        // Create elevators
        const Elevators = this.CreateElevators();
    
        // Append floors container to building container

        buildingContainer.appendChild(Floors);
        buildingContainer.appendChild(Elevators);
        // Append building container to main container
        // this.mainContainer.appendChild(buildingContainer);

    }

}