
function addResource() {
    var response = "";

    var popup = document.getElementById("Popup");

    // Get values specifically from the Add Animal popup
    var jsonData = new Object();

    jsonData.name = popup.querySelector("#name").value;
    jsonData.image = popup.querySelector("#image").value;
    jsonData.gender = popup.querySelector("#gender").value;
    jsonData.age = popup.querySelector("#age").value;
    jsonData.species = popup.querySelector("#addSpecies").value;
    jsonData.breed = popup.querySelector("#addBreed").value;
    jsonData.status = popup.querySelector("#status").value;
    jsonData.description = popup.querySelector("#description").value;

    var request = new XMLHttpRequest();

    request.open("POST", "/add-resource", true);
    request.setRequestHeader('Content-Type', 'application/json');

    request.onload = function () {
        response = JSON.parse(request.responseText);

        console.log(response);

        if (request.status == 201) {
            alert('Added Animal: ' + jsonData.name + '!');

            // Clear popup fields
            popup.querySelector("#name").value = "";
            popup.querySelector("#image").value = "";
            popup.querySelector("#gender").value = "";
            popup.querySelector("#age").value = "";
            popup.querySelector("#addSpecies").value = "";
            popup.querySelector("#addBreed").value = "";
            popup.querySelector("#status").value = "";
            popup.querySelector("#description").value = "";

            // Close popup
            popup.style.display = "none";

            // Reload animal list
            viewResources();

        } else {
            alert('Unable to add animal: ' + response.message);
        }
    };

    request.onerror = function () {
        alert("Unable to connect to server!");
    };

    request.send(JSON.stringify(jsonData));
}
