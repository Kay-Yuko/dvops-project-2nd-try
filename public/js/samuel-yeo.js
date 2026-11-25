function checkAdminRole() {
    var role = JSON.parse(sessionStorage.getItem("role"));

    if (!role || role.id !== 2) {
        alert("Access denied! Admin only.");
        return false;
    }

    return true;
}

document.addEventListener('DOMContentLoaded', function () {
    const deleteButton = document.querySelector('.deletebtn');

    if (!deleteButton) {
        return;
    }

    deleteButton.addEventListener('click', async function (event) {
        event.preventDefault();


        if (!checkAdminRole()) {
            return;
        }//comment this for backend to work

        const params = new URLSearchParams(window.location.search);
        const id = params.get('id');

        if (!id) {
            alert('Unable to delete animal: Missing animal ID.');
            return;
        }

        const confirmed = confirm(
            'Are you sure you want to delete this animal? This action cannot be undone.'
        );

        if (!confirmed) {
            return;
        }

        deleteButton.style.pointerEvents = 'none';

        try {
            const response = await fetch(
                '/delete-resource/' + encodeURIComponent(id),
                {
                    method: 'DELETE',
                    headers: {
                        'roleId': currentRole.id
                    }
                }
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(
                    result.message || 'Unable to delete animal.'
                );
            }

            alert(result.message);
            window.location.href = 'index.html';

        } catch (error) {
            alert('Deletion failed: ' + error.message);
            deleteButton.style.pointerEvents = '';
        }
    });
});


(function () {
    'use strict';

    const fields = ['name', 'gender', 'age', 'species', 'breed'];

    const ids = {
        name: 'filterName',
        gender: 'filterGender',
        age: 'filterAge',
        species: 'filterSpecies',
        breed: 'filterBreed'
    };

    let typingTimer;
    let activeRequest;

    const element = (field) =>
        document.getElementById(ids[field]);

    const normalise = (value) =>
        String(value ?? '').trim().toLowerCase();

    // Display the matching animals.
    function renderFilteredAnimals(animals) {
        const container = document.getElementById('animalList');

        container.replaceChildren();

        if (!animals.length) {
            const message = document.createElement('p');

            message.className = 'no-results';
            message.textContent =
                'No pets match these filters. Try changing your selection.';

            container.appendChild(message);
            return;
        }

        for (const animal of animals) {
            const link = document.createElement('a');

            link.href =
                `details.html?id=${encodeURIComponent(String(animal.id ?? ''))}`;

            const card = document.createElement('div');
            card.className = 'animal';

            const imageBox = document.createElement('div');
            imageBox.className = 'petImage';

            if (animal.image) {
                const image = document.createElement('img');

                image.src = String(animal.image);
                image.alt = String(animal.name ?? 'Pet');

                image.style.width = '100%';
                image.style.height = '100%';
                image.style.objectFit = 'cover';

                imageBox.appendChild(image);
            }

            const status = document.createElement('div');
            status.className = 'petStatus';
            status.textContent = String(
                animal.status ?? 'Unknown'
            );

            imageBox.appendChild(status);

            const info = document.createElement('div');
            info.className = 'animalInfo';

            const name = document.createElement('p');
            name.textContent = String(
                animal.name ?? 'Unnamed pet'
            );

            const tags = document.createElement('div');
            tags.className = 'animalTags';

            for (const field of ['gender', 'age', 'breed']) {
                const tag = document.createElement('div');

                tag.textContent = String(
                    animal[field] ?? 'Unknown'
                );

                tags.appendChild(tag);
            }

            info.append(name, tags);
            card.append(imageBox, info);
            link.appendChild(card);
            container.appendChild(link);
        }
    }

    // Collect filters and request matching pets.
    async function applyPetFilters() {
        const params = new URLSearchParams();

        for (const field of fields) {
            const value = element(field).value.trim();

            if (value && normalise(value) !== 'any') {
                params.set(field, value);
            }
        }

        if (
            params.get('name') &&
            params.get('name').length > 80
        ) {
            showError('Name must be at most 80 characters.');
            return;
        }

        if (activeRequest) {
            activeRequest.abort();
        }

        const controller = new AbortController();
        activeRequest = controller;

        try {
            const response = await fetch(
                `/filter-resources?${params.toString()}`,
                { signal: controller.signal }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || 'Unable to filter pets.'
                );
            }

            renderFilteredAnimals(data);

        } catch (error) {
            if (error.name !== 'AbortError') {
                showError(error.message);
            }

        } finally {
            if (activeRequest === controller) {
                activeRequest = null;
            }
        }
    }

    // Display server or validation errors.
    function showError(message) {
        const container = document.getElementById('animalList');

        const alert = document.createElement('p');
        alert.className = 'no-results';
        alert.setAttribute('role', 'alert');
        alert.textContent = message;

        container.replaceChildren(alert);
    }

    // Load breeds from the existing animal database.

    function populateBreeds() {
        const species = element('species').value;
        const breedSelect = element('breed');

        // Use the same breed list as the Add and Edit Animal forms.
        const breeds = species === 'any'
            ? Object.values(breedsBySpecies).flat()
            : (breedsBySpecies[species] || []);

        // Remove duplicate breeds and sort alphabetically.
        const uniqueBreeds = [...new Set(breeds)]
            .sort((a, b) => a.localeCompare(b));

        // Reset the dropdown and its previous selection.
        breedSelect.replaceChildren(new Option('Any', 'any'));

        // Add breeds belonging to the selected species.
        uniqueBreeds.forEach(function (breed) {
            breedSelect.add(new Option(breed, breed));
        });

        // Clear the previous breed filter.
        breedSelect.value = 'any';
    }


    // Reset all filters to their default values.

    function clearPetFilters() {
        for (const field of fields) {
            element(field).value =
                field === 'name' ? '' : 'any';
        }

        // Restore the complete list of supported breeds.
        populateBreeds();

        clearTimeout(typingTimer);
        applyPetFilters();
    }


    // Register frontend event listeners.
    document.addEventListener('DOMContentLoaded', () => {
        // Filtering controls only exist on the homepage.
        if (
            !document.getElementById('filterName') ||
            !document.getElementById('animalList')
        ) {
            return;
        }

        for (const field of fields) {
            const control = element(field);

            if (field === 'name') {
                control.addEventListener('input', () => {
                    clearTimeout(typingTimer);

                    typingTimer = setTimeout(
                        applyPetFilters,
                        250
                    );
                });

            } else {
                control.addEventListener('change', () => {

                    // Update breed options whenever species changes.
                    if (field === 'species') {
                        populateBreeds();
                    }

                    // Refresh the animal listing.
                    applyPetFilters();
                });
            }

        }

        document
            .getElementById('clearFilters')
            .addEventListener('click', clearPetFilters);

        populateBreeds();
    });

    // Allow other features to refresh filtered results.
    window.applyPetFilters = applyPetFilters;

})();
