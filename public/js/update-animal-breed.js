var breedsBySpecies = {
    Dog: [
        "Golden Retriever",
        "Corgi",
        "Poodle"
    ],
    Cat: [
        "Siamese",
        "Maine Coon",
        "Ragdoll"
    ],
    Rabbit: [
        "Holland Lop",
        "Netherland Dwarf",
        "Polish"
    ]
};

function updateBreeds() {
    var speciesSelect = document.getElementById("addSpecies");
    var breedSelect = document.getElementById("addBreed");

    var selectedSpecies = speciesSelect.value;

    breedSelect.innerHTML = '<option value="">-- Select Breed --</option>';

    if (selectedSpecies && breedsBySpecies[selectedSpecies]) {
        breedsBySpecies[selectedSpecies].forEach(function (breed) {
            var option = document.createElement("option");

            option.value = breed;
            option.text = breed;

            breedSelect.add(option);
        });
    }
}