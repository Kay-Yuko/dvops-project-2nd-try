
const request = require('supertest');
const { app, server } = require('../index');

afterAll(() => server.close());

describe('Pet Adoption API', () => {
    let resourceId;

    // POST - Add a new animal
    it('POST /add-resource should create a new animal', async () => {
        const newAnimal = {
            name: 'API Test Animal',
            age: 'adult',
            description: 'Animal created during API testing',
            image: 'images/dummy.jpg',
            gender: 'male',
            status: 'available',
            species: 'dog',
            breed: 'Poodle'
        };

        const res = await request(app)
            .post('/add-resource')
            .send(newAnimal);

        expect(res.status).toBe(201);
        expect(res.body.message).toBe('Animal added successfully');
        expect(res.body.resource.name).toBe(newAnimal.name);
        expect(res.body.resource.species).toBe(newAnimal.species);
        expect(res.body.resource.breed).toBe(newAnimal.breed);
        expect(res.body.resource.id).toBeDefined();

        resourceId = res.body.resource.id;
    });

    // GET - View all animals
    it('GET /view-resources should retrieve all animals', async () => {
        const res = await request(app)
            .get('/view-resources');

        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);

        const addedAnimal = res.body.find(
            animal => animal.id === resourceId
        );

        expect(addedAnimal).toBeDefined();
        expect(addedAnimal.name).toBe('API Test Animal');
    });

    // GET - View one animal by ID
    it('GET /view-resources/:id should retrieve an animal by ID', async () => {
        const res = await request(app)
            .get(`/view-resources/${resourceId}`);

        expect(res.status).toBe(200);
        expect(res.body.id).toBe(resourceId);
        expect(res.body.name).toBe('API Test Animal');
    });

    // PUT - Edit an animal
    it('PUT /edit-resource/:id should update an animal', async () => {
        const updatedAnimal = {
            name: 'Updated API Test Animal',
            age: 'senior',
            breed: 'Golden Retriever'
        };

        const res = await request(app)
            .put(`/edit-resource/${resourceId}`)
            .send(updatedAnimal);

        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Animal updated successfully!');
        expect(res.body.resource.id).toBe(resourceId);
        expect(res.body.resource.name).toBe(updatedAnimal.name);
        expect(res.body.resource.age).toBe(updatedAnimal.age);
        expect(res.body.resource.breed).toBe(updatedAnimal.breed);
    });

    // DELETE - Delete an animal
    it('DELETE /delete-resource/:id should delete an animal', async () => {
        const res = await request(app)
            .delete(`/delete-resource/${resourceId}`);

        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Animal deleted successfully.');
        expect(res.body.animal.id).toBe(resourceId);
    });

    // GET - Check that deleted animal cannot be found
    it('GET /view-resources/:id should return 404 for a deleted animal', async () => {
        const res = await request(app)
            .get(`/view-resources/${resourceId}`);

        expect(res.status).toBe(404);
        expect(res.body.message).toBe('Animal not found');
    });
});
