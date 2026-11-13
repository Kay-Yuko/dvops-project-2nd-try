
const fs = require('fs').promises;
const path = require('path');

const resources_file = path.join(__dirname, 'resources.json');

const allowedvalues= {
    gender: ['male', 'female'],
    age: ['child', 'teen', 'adult'],
    species: ['dog', 'cat', 'rabbit']
};

// Read and normalise an individual filter value.
function getFilterValue(query, field) {
    const raw = query[field];

    if (raw === undefined || raw === null || raw === '') {
        return '';
    }

    if (typeof raw !== 'string') {
        throw new Error(
            `Invalid ${field}: only one value is allowed.`
        );
    }

    const value = raw.trim().toLowerCase();
    return value === 'any' ? '' : value;
}


function validateFilters(query) {
    const filters = {};

    for (const field of [
        'name', 'gender', 'age', 'species', 'breed'
    ]) {
        filters[field] = getFilterValue(query, field);
    }

    for (const [field, allowed] of Object.entries(allowedvalues)) {
        if (filters[field] && !allowed.includes(filters[field])) {
            throw new Error(
                `Invalid ${field}. Allowed values: ${allowed.join(', ')}.`
            );
        }
    }

    if (
        filters.name.length > 80 
        
    ) {
        throw new Error(
            'Invalid name. Use up to 80 characters without control characters.'
        );
    }

    if (
        filters.breed.length > 80 
       
    ) {
        throw new Error(
            'Invalid breed. Use up to 80 characters without control characters.'
        );
    }

    return filters;
}

// Backend route handler.
async function filterResources(req, res) {
    let filters;

    try {
        filters = validateFilters(req.query);
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }

    try {
        const contents = await fs.readFile(
            resources_file,
            'utf8'
        );

        const animals = JSON.parse(contents);

        if (!Array.isArray(animals)) {
            throw new Error(
                'The resources database must contain an array.'
            );
        }

        const matches = animals.filter((animal) =>
            Object.entries(filters).every(([field, selected]) => {
                if (!selected) {
                    return true;
                }

                const actual = String(
                    animal[field] ?? ''
                ).trim().toLowerCase();

                return field === 'name'
                    ? actual.includes(selected)
                    : actual === selected;
            })
        );

        return res.status(200).json(matches);

    } catch (error) {
        console.error('Filtering failed:', error);

        return res.status(500).json({
            message: 'Unable to load animal records.'
        });
    }
}

module.exports = { filterResources };
