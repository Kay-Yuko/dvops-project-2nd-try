
const fs = require('fs').promises;
const path = require('path');

const RESOURCES_FILE = path.join('utils', 'resources.json');
const TEMPLATE_FILE = path.join('utils', 'resources.template.json');

async function addResource(req, res) {
    try {
        const newResource = {
            name: req.body.name,
            image: req.body.image,
            gender: req.body.gender,
            age: req.body.age,
            species: req.body.species,
            breed: req.body.breed,
            status: req.body.status,
            description: req.body.description
        };

        let resources = [];

        try {
            const data = await fs.readFile(RESOURCES_FILE, 'utf8');
            resources = JSON.parse(data);

        } catch (err) {
            if (err.code === 'ENOENT') {
                const templateData = await fs.readFile(TEMPLATE_FILE, 'utf8');
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
