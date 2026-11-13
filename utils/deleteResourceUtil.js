
const fs = require('fs').promises;
const path = require('path');

const RESOURCES_FILE = path.join(__dirname, 'resources.json');

async function deleteResource(req, res) {
    const id = req.params.id;

    // Validate the animal ID.
    if (
        typeof id !== 'string' ||
        id.trim() === '' ||
        id.length > 100
    ) {
        return res.status(400).json({
            message: 'Invalid animal ID.'
        });
    }

    try {
        const data = await fs.readFile(RESOURCES_FILE, 'utf8');
        const resources = JSON.parse(data);

        if (!Array.isArray(resources)) {
            return res.status(500).json({
                message: 'Invalid animal database.'
            });
        }

        const animalIndex = resources.findIndex(
            animal => String(animal.id) === id
        );

        if (animalIndex === -1) {
            return res.status(404).json({
                message: 'Animal not found.'
            });
        }

        const deletedAnimal = resources[animalIndex];

        resources.splice(animalIndex, 1);

        await fs.writeFile(
            RESOURCES_FILE,
            JSON.stringify(resources, null, 2),
            'utf8'
        );

        return res.status(200).json({
            message: 'Animal deleted successfully.',
            animal: deletedAnimal
        });

    } catch (error) {
        console.error('Delete animal error:', error);

        return res.status(500).json({
            message: 'Unable to delete animal.'
        });
    }
}

module.exports = { deleteResource };
