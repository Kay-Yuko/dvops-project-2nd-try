
// Function to open the edit popup and pre-fill it with the selected animal's data
function editResource() {
    var selectedResource = window.currentAnimal;

    // Pre-fill the popup input fields
    document.getElementById("name").value = selectedResource.name;
    document.getElementById("image").value = selectedResource.image;
    document.getElementById("gender").value = selectedResource.gender;
    document.getElementById("age").value = selectedResource.age;
    document.getElementById("editSpecies").value = selectedResource.species;
    updateBreeds("editSpecies", "editBreed", selectedResource.breed);
    document.getElementById("status").value = selectedResource.status;
    document.getElementById("description").value = selectedResource.description;

    // Set update button's onclick attribute to call updateResource() with the animal's ID
    document.getElementById("updateButton").setAttribute(
        "onclick",
        'updateResource("' + selectedResource.id + '")'
    );

    // Show the edit popup from html
    document.getElementById("Popup").style.display = "flex";
}


// Function to send updated animal data to the backend API
function updateResource(id) {
    var response = "";

    // Create a JSON object from the popup input fields
    var jsonData = {
        name: document.getElementById("name").value,
        image: document.getElementById("image").value,
        gender: document.getElementById("gender").value,
        age: document.getElementById("age").value,
        species: document.getElementById("editSpecies").value,
        breed: document.getElementById("editBreed").value,
        status: document.getElementById("status").value,
        description: document.getElementById("description").value
    };

    // Basic validation
    if (
        jsonData.name == "" ||
        jsonData.image == "" ||
        jsonData.gender == "" ||
        jsonData.age == "" ||
        jsonData.species == "" ||
        jsonData.breed == "" ||
        jsonData.status == "" ||
        jsonData.description == ""
    ) {
        alert("All fields are required!");
        return;
    }

    // Configure the request as PUT to the edit-resource endpoint
    var request = new XMLHttpRequest();
    request.open("PUT", "/edit-resource/" + id, true);
    request.setRequestHeader('Content-Type', 'application/json');

    request.onload = function () {
        response = JSON.parse(request.responseText);

        // If the backend confirms success
        if (response.message == "Animal updated successfully!") {
            alert('Edited Animal: ' + jsonData.name + '!');

            // Close popup
            document.getElementById("Popup").style.display = "none";

            // Refresh animal details
            viewAnimalDetails();
        } else {
            alert('Unable to edit animal!');
        }
    };

    // Send the JSON data to the server
    request.send(JSON.stringify(jsonData));
}
