const fs = require('fs').promises;
const path = require('path');
const RESOURCES_FILE = path.join('utils', 'resources.json');
async function editResource(req, res) {
    try {
        const { id } = req.params;
        const { name, image, gender, age, species, breed, status, description } = req.body;
        let resources = [];
        try {
            const data = await fs.readFile(RESOURCES_FILE, 'utf8');
            resources = JSON.parse(data);
        } catch (err) {
            if (err.code === 'ENOENT') {
                return res.status(404).json({ message: 'No Animal found to edit.' });
            } else {
                throw err;
            }
        }
        const resourceIndex = resources.findIndex(r => r.id == id);
        if (resourceIndex === -1) {
            return res.status(404).json({ message: 'Animal not found.' });
        }
        // Update resource fields
        resources[resourceIndex] = {
            // copies the existing animal's information into the new object.
            ...resources[resourceIndex],
            name: name || resources[resourceIndex].name,
            image: image || resources[resourceIndex].image,
            gender: gender || resources[resourceIndex].gender,
            age: age || resources[resourceIndex].age,
            species: species || resources[resourceIndex].species,
            breed: breed || resources[resourceIndex].breed,
            status: status || resources[resourceIndex].status,
            description: description || resources[resourceIndex].description
        };
        await fs.writeFile(RESOURCES_FILE, JSON.stringify(resources, null, 2),
            'utf8');
        return res.status(200).json({
            message: 'Animal updated successfully!',
            resource: resources[resourceIndex]
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
}
module.exports = { editResource };