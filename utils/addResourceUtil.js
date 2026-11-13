
const fs = require('fs').promises;
const path = require('path');
const { Resource } = require('./ResourceUtil');

const RESOURCES_FILE = path.join('utils', 'resources.json');
const TEMPLATE_FILE = path.join('utils', 'resources.template.json');

async function addResource(req, res) {
    try {
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
