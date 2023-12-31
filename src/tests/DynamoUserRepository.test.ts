import { v4 as uuidv4 } from 'uuid';
import { fakerEN as faker } from '@faker-js/faker';

import type { User } from '../domain/user/User';
import DynamoUserRepository from '../infrastructure/DynamoUserRepository';

const dynamoDBConfigParams = {
  region: 'us-east-1',
  endpoint: 'http://localhost:4566',
  credentials: {
    accessKeyId: 'test',
    secretAccessKey: 'test'
  }
};

const dynamoUserRepository = new DynamoUserRepository(dynamoDBConfigParams);

let user: User;

beforeEach(() => {
  user = {
    id: uuidv4(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    createdAt: new Date()
  };
});

afterEach(async () => {
  const users = await dynamoUserRepository.findAll();

  for (const user of users) {
    await dynamoUserRepository.delete(user.id);
  }
});

describe('Test User DyanamoDB repository', () => {
  it('should save a user and find it by id', async () => {
    const user: User = {
      id: uuidv4(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      createdAt: new Date()
    };

    await dynamoUserRepository.save(user);

    const savedUser = await dynamoUserRepository.findById(user.id);

    expect(savedUser).toEqual(user);
  });

  it('should update a user', async () => {
    await dynamoUserRepository.save(user);

    const savedUser = (await dynamoUserRepository.findById(user.id)) as User;

    const userToUpdate: User = {
      ...savedUser,
      lastName: 'Travolta'
    };

    await dynamoUserRepository.update(savedUser.id, userToUpdate);

    const updatedUser = await dynamoUserRepository.findById(savedUser.id);

    expect(updatedUser?.lastName).toEqual('Travolta');
    expect(updatedUser?.updatedAt).not.toBeNull();
  });

  it('should delete a user', async () => {
    await dynamoUserRepository.save(user);

    const savedUser = await dynamoUserRepository.findById(user.id);

    expect(savedUser).not.toBeUndefined();

    await dynamoUserRepository.delete(user.id);

    const deletedUser = await dynamoUserRepository.findById(user.id);

    expect(deletedUser).toBeUndefined();
  });

  it('should find all users', async () => {
    const anotherUser: User = {
      id: uuidv4(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      createdAt: new Date()
    };

    await dynamoUserRepository.save(user);
    await dynamoUserRepository.save(anotherUser);

    const users = await dynamoUserRepository.findAll();

    expect(users.length).toEqual(2);
  });
});
