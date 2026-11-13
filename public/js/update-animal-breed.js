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