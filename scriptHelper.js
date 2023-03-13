// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
   let missionTarget = document.getElementById("missionTarget");
   missionTarget.innerHTML = `
                <h2>Mission Destination</h2>
                <ol>
                    <li>Name: </li>
                    <li>Diameter: </li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: </li>
                    <li>Number of Moons: </li>
                </ol>
                <img src=""> `;
   
}

function validateInput(testInput) {
   if(testInput ==""){
    return "Empty";
   }else if(isNaN(testInput)){
    return "Not a Number";
   } else if(isNaN(testInput) == false){
    return "Is a Number";
   }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    let pilotStatus = document.getElementById("pilotStatus");
    let coPilotStatus = document.getElementById("copilotStatus");
    let fuelStatus = document.getElementById("fuelStatus");
    let launchStatus = document.getElementById("launchStatus");
    let cargoStatus = document.getElementById("cargoStatus");

   if(validateInput(pilot) == "Empty" || validateInput(copilot) == "Empty" || validateInput(fuelLevel) == "Empty" || validateInput(cargoLevel) == "Empty"){
    alert("All fields are required!")
   }
   else if(validateInput(pilot) == "Is a Number" || validateInput(copilot) == "Is a Number" || validateInput(fuelLevel) == "Not a Number" || validateInput(cargoLevel) == "Not a Number"){
    alert("Make sure to enter valid information for each field!");
   }
    else{
    list.style.visibility = "visible";
    pilotStatus.innerHTML= `Pilot ${pilot} is ready for launch`;
    coPilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;
   }
    if(Number(fuelLevel) < 10000){
        list.style.visibility = "visible";
        fuelStatus.innerHTML = `Fuel level too low for launch`;
        launchStatus.innerHTML = `Shuttle not ready for launch`;
        launchStatus.style.color = "red";
    }
    else if(Number(cargoLevel) > 10000){
        list.style.visibility = "visible";
        cargoStatus.innerHTML = `Cargo mass too heavy for launch`;
        launchStatus.innerHTML = `Shuttle not ready for launch`;
        launchStatus.style.color = "red";
    }
    else if(Number(fuelLevel) > 10000 && Number(cargoLevel) < 10000){
        list.style.visibility = "visible";
        fuelStatus.innerHTML = `Fuel level high enough for launch`;
        cargoStatus.innerHTML = `Cargo mass low enough for launch`;
        launchStatus.innerHTML = `Shuttle is ready for launch`;
        launchStatus.style.color = "green";
    }
   }




async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
        return response.json();
        });

    return planetsReturned;
}

function pickPlanet(planets) {
    let planetIndex = Math.floor(Math.random()*planets.length);
    return planets(planetIndex);
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
