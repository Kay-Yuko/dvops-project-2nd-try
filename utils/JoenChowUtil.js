
const fs = require('fs').promises;
const path = require('path');
const { Resource } = require('./StudentsUtil');

const RESOURCES_FILE = path.join(__dirname, 'students.json');
const TEMPLATE_FILE = path.join('utils', 'students.template.json')

const allowedGenders = ['male', 'female'];
const allowedAges = ['adult', 'teen', 'child'];
const allowedSpecies = ['dog', 'cat', 'rabbit'];
const allowedStatuses = ['available', 'adopted', 'reserved'];

const breedsBySpecies = {
    dog: [
        'Golden retriever',
        'Corgi',
        'Poodle'
    ],
    cat: [
        'Siamese',
        'Maine coon',
        'Ragdoll'
    ],
    rabbit: [
        'Holland lop',
        'Netherland dwarf',
        'Polish'
    ]
};

async function addResource(req, res) {
    try {

        // Backend validation
        if (
            typeof req.body.name !== 'string' || !req.body.name.trim() ||
            typeof req.body.image !== 'string' || !req.body.image.trim() ||
            typeof req.body.gender !== 'string' || !req.body.gender.trim() ||
            req.body.age === undefined || req.body.age === null || String(req.body.age).trim() === '' ||
            typeof req.body.species !== 'string' || !req.body.species.trim() ||
            typeof req.body.breed !== 'string' || !req.body.breed.trim() ||
            typeof req.body.status !== 'string' || !req.body.status.trim() ||
            typeof req.body.description !== 'string' || !req.body.description.trim()
        ) {
            return res.status(400).json({
                message: 'All fields are required and must be valid.'
            });
        }

        // Validate dropdown values
        if (!allowedGenders.includes(req.body.gender)) {
            return res.status(400).json({
                message: 'Invalid gender.'
            });
        }

        if (!allowedAges.includes(req.body.age)) {
            return res.status(400).json({
                message: 'Invalid age category.'
            });
        }

        if (!allowedSpecies.includes(req.body.species)) {
            return res.status(400).json({
                message: 'Invalid species.'
            });
        }

        if (!allowedStatuses.includes(req.body.status)) {
            return res.status(400).json({
                message: 'Invalid adoption status.'
            });
        }

        // Validate breed based on selected species
        if (!breedsBySpecies[req.body.species].includes(req.body.breed)) {
            return res.status(400).json({
                message: 'Invalid breed for the selected species.'
            });
        }

        const newResource = new Resource(
            req.body.name,
            req.body.age,
            req.body.description,
            req.body.image,
            req.body.gender,
            req.body.status,
            req.body.species,
            req.body.breed
        );

        let resources = [];

        try {
            const data = await fs.readFile(RESOURCES_FILE, 'utf8');
            resources = JSON.parse(data);

        } catch (err) {
            if (err.code === 'ENOENT') {
                const templateData = await fs.readFile(TEMPLATE_FILE, 'utf-8');
                resources = JSON.parse(templateData);
            } else {
                throw err;
            }
        }

        resources.push(newResource);

        await fs.writeFile(
            RESOURCES_FILE,
            JSON.stringify(resources, null, 2),
            'utf8'
        );

        return res.status(201).json({
            message: "Animal added successfully",
            resource: newResource
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: error.message
        });
    }
}

module.exports = { addResource };
