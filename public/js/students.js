function viewResources() {
    var response = '';
    var request = new XMLHttpRequest();
    request.open('GET', '/view-resources', true);
    request.setRequestHeader('Content-Type', 'application/json');

    request.onload = function () {
        response = JSON.parse(request.responseText);


        if (response.length === 0) {
            document.getElementById('animalList').innerHTML =
                '<p class="no-results">No pets found. Try refreshing your page.</p>';
            return;
        }
        var html = '';

        for (var i = 0; i < response.length; i++) {
            html += '<a href="details.html?id=' + response[i].id + '">' +
            '<div class="animal">' +
                '<div class="petImage">' +
                '<div class="petStatus">' + response[i].status + '</div>' +
            '</div>' +

                '<div class="animalInfo">' +
                '<p>' +
                response[i].name +
                '</p>' +

                '<div class="animalTags">' +
                '<div>' + response[i].gender + '</div>' +
                '<div>' + response[i].age + '</div>' +
                '<div>' + response[i].breed + '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</a>';
        }

        document.getElementById('animalList').innerHTML = html;
    };

    request.send();
}

function viewAnimalDetails() {
    var response = '';
    var request = new XMLHttpRequest();

    var params = new URLSearchParams(window.location.search);
    var id = params.get('id');

    request.open('GET', '/view-resources/' + id, true);
    request.setRequestHeader('Content-Type', 'application/json');

    request.onload = function () {
        response = JSON.parse(request.responseText);
        // stores the currently displayed animal in window.currentAnimal.
        window.currentAnimal = response;

        var html = '';

        html += '<div class="entireData" id="entireData">' +
            '<div class="animalTags-details">' +
            '<div>' +
            '<p>' + response.gender + '</p>' +
            '</div>' +
            '<div>' +
            '<p>' + response.age + '</p>' +
            '</div>' +
            '<div>' +
            '<p>' + response.breed + '</p>' +
            '</div>' +
            '</div>' +

            '<h1 class="animalName">' + response.name + '</h1>' +
            '<hr style="width: 90%; margin: 20px auto;">' +

            '<div class="animalDetails" id="animalDetails">' +
            '<div class="animalImage">' +
            '<img src="' + response.image + '">' +
            '</div>' +

            '<div class="animalDescription">' +
            '<h2>About ' + response.name + '</h2>' +
            '<p>' + response.description + '</p>' +
            '<button class="adoptButton">' +
            '<p>Adopt ' + response.name + '</p>' +
            '</button>' +
            '</div>' +
            '</div>' +
            '</div>';

        document.getElementById('entireData').innerHTML = html;
    };

    request.send();
}

var currentRole = JSON.parse(sessionStorage.getItem("role")) || {
    id: 1,
    name: "User"
};

function switchRole() {
    if (currentRole.id === 1) {
        currentRole.id = 2;
        currentRole.name = "Admin";
    } else {
        currentRole.id = 1;
        currentRole.name = "User";
    }

    sessionStorage.setItem("role", JSON.stringify(currentRole));
    console.log("Current role:", currentRole);

    updateRoleUI();
}

function updateRoleUI() {
    var addButton = document.querySelector(".addbtn");
    var editButton = document.getElementById("editButton");
    var deleteButton = document.getElementById("deleteAnimalButton");
    var roleButton = document.getElementById("roleSwitch");

    if (currentRole.id === 2) {
        if (addButton) addButton.style.display = "none";
        if (editButton) editButton.style.display = "none";
        if (deleteButton) deleteButton.style.display = "none";
    } else {
        if (addButton) addButton.style.display = "block";
        if (editButton) editButton.style.display = "block";
        if (deleteButton) deleteButton.style.display = "block";
    }

    if (roleButton) {
        if (currentRole.id === 1) {
            roleButton.textContent = "Switch to Admin";
        } else {
            roleButton.textContent = "Switch to User";
        }
    }
}

var breedsBySpecies = {
    dog: [
        "Golden retriever",
        "Corgi",
        "Poodle"
    ],
    cat: [
        "Siamese",
        "Maine coon",
        "Ragdoll"
    ],
    rabbit: [
        "Holland lop",
        "Netherland dwarf",
        "Polish"
    ]
};

function updateBreeds(speciesId, breedId, selectedBreed) {
    var speciesSelect = document.getElementById(speciesId);
    var breedSelect = document.getElementById(breedId);

    var selectedSpecies = speciesSelect.value;

    // Clear previous breeds
    breedSelect.innerHTML = '<option value="">-- Select Breed --</option>';

    if (selectedSpecies && breedsBySpecies[selectedSpecies]) {
        breedsBySpecies[selectedSpecies].forEach(function (breed) {
            var option = document.createElement("option");

            option.value = breed;
            option.text = breed;

            breedSelect.add(option);
        });
    }

    // Select the animal's existing breed when editing
    if (selectedBreed) {
        breedSelect.value = selectedBreed;
    }
}