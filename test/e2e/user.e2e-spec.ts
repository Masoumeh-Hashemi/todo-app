import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { IUserRepository } from 'src/domain/user/repositories/user.repository';
import { AppModule } from 'src/application/app.module';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  let userRepository: IUserRepository;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    userRepository = moduleFixture.get<IUserRepository>('UserRepository');
  });

  it('/users/register (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/users/register')
      .send({ username: 'johndoe', password: 'password123' })
      .expect(201);

    expect(response.body).toEqual({
      success: true,
      message: 'User registered successfully',
      data: expect.objectContaining({
        __v: 0,
        _id: expect.any(String),
        createdAt: expect.any(String),
        password: 'password123',
        todoLists: [],
        username: 'johndoe',
      }),
    });

    const user = await userRepository.findById(response.body.data._id);
    expect(user).toBeDefined();
  });

  afterAll(async () => {
    await app.close();
  });
});
