// server/tests/todoController.test.js
const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const todoRoutes = require('../routes/todos');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use('/api/todos', todoRoutes);

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.disconnect();
});

describe('Todo API', () => {
  let todoId = '';

  it('should create a new todo', async () => {
    const res = await request(app)
      .post('/api/todos')
      .send({ text: 'Test todo' });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.text).toBe('Test todo');
    todoId = res.body._id;
  });

  it('should get all todos', async () => {
    const res = await request(app).get('/api/todos');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should toggle a todo', async () => {
    const res = await request(app).put(`/api/todos/${todoId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.completed).toBe(true);
  });

  it('should update a todo', async () => {
    const res = await request(app)
      .put(`/api/todos/${todoId}/edit`)
      .send({ text: 'Updated text' });

    expect(res.statusCode).toEqual(200);
    expect(res.body.text).toBe('Updated text');
  });

  it('should delete a todo', async () => {
    const res = await request(app).delete(`/api/todos/${todoId}`);
    expect(res.statusCode).toEqual(204);
  });
});
