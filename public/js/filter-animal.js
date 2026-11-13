
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
    async function populateBreeds() {
        const select = element('breed');

        try {
            const response = await fetch('/view-resources');

            if (!response.ok) {
                throw new Error('Unable to load breeds.');
            }

            const animals = await response.json();

            if (!Array.isArray(animals)) {
                throw new Error('Invalid animal list.');
            }

            const breeds = [
                ...new Set(
                    animals
                        .map((animal) =>
                            String(animal.breed ?? '').trim()
                        )
                        .filter(Boolean)
                )
            ].sort((a, b) => a.localeCompare(b));

            select.replaceChildren(new Option('Any', 'any'));

            for (const breed of breeds) {
                select.add(new Option(breed, breed));
            }

        } catch (error) {
            console.error('Could not populate breeds:', error);
        }
    }

    // Reset all filters to their default values.
    function clearPetFilters() {
        for (const field of fields) {
            element(field).value =
                field === 'name' ? '' : 'any';
        }

        clearTimeout(typingTimer);
        applyPetFilters();
    }

    // Register frontend event listeners.
    document.addEventListener('DOMContentLoaded', () => {
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
                control.addEventListener(
                    'change',
                    applyPetFilters
                );
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
