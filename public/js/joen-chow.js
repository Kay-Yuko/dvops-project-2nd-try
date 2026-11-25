function checkAdminRole() {
    var role = JSON.parse(sessionStorage.getItem("role"));

    if (!role || role.id !== 2) {
        alert("Access denied! Admin only.");
        return false;
    }

    return true;
}

function addResource() {

    // if (!checkAdminRole()) {
    //     return;
    // }

    var response = "";

    // Get the Add Animal popup
    var popup = document.getElementById("Popup");

    // Create an object to hold form data
    var jsonData = new Object();

    jsonData.name = popup.querySelector("#name").value;
    jsonData.image = popup.querySelector("#image").value;
    jsonData.gender = popup.querySelector("#gender").value;
    jsonData.age = popup.querySelector("#age").value;
    jsonData.species = popup.querySelector("#addSpecies").value;
    jsonData.breed = popup.querySelector("#addBreed").value;
    jsonData.status = popup.querySelector("#status").value;
    jsonData.description = popup.querySelector("#description").value;

    // Validate required fields (all must be filled in)
    if (jsonData.name == "" ||
        jsonData.image == "" ||
        jsonData.gender == "" ||
        jsonData.age == "" ||
        jsonData.species == "" ||
        jsonData.breed == "" ||
        jsonData.status == "" ||
        jsonData.description == "") {

        alert('All fields are required!');
        return; // Stop execution if validation fails
    }

    // Configure the request to POST data to /add-resource
    var request = new XMLHttpRequest();

    request.open("POST", "/add-resource", true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.setRequestHeader('roleId', currentRole.id);

    // Define what happens when the server responds
    request.onload = function () {
        response = JSON.parse(request.responseText);

        console.log(response);

        // If animal is successfully added
        if (request.status == 201) {
            alert('Added Animal: ' + jsonData.name + '!');

            // Clear form fields after success
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
            // Show error if animal could not be added
            alert('Unable to add animal!');
        }
    };

    // Send the request with JSON-formatted data
    request.send(JSON.stringify(jsonData));
}
