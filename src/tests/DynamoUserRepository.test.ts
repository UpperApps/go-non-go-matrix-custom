import { v4 as uuidv4 } from 'uuid';

import type { User } from '../domain/user/User';
import dynamoUserRepository from '../infrastructure/DynamoUserRepository';

describe('Test User DyanamoDB repository', () => {
  it('should save a user and find it by id', () => {
    // TASK #1: Implement the tests below
    const user: User = {
      id: uuidv4(),
      firstName: 'John',
      lastName: 'Doe',
      email: 'test@gmail.com',
      password: '1234',
      createdAt: new Date()
    };

    dynamoUserRepository.save(user);

    const savedUser = dynamoUserRepository.findById(user.id);

    expect(savedUser.then((value) => value?.id)).toEqual(user.id);
  });

  // it('should update a user', () => {
  //   // TASK #3: Implement the tests below
  //   const user: User = {
  //     id: uuidv4(),
  //     firstName: 'John',
  //     lastName: 'Doe',
  //     email: 'test@gmail.com',
  //     password: '1234',
  //     createdAt: new Date()
  //   };
  //
  //   dynamoUserRepository.save(user);
  //
  //   const savedUser = dynamoUserRepository
  //     .findById(user.id)
  //     .then((data) => {
  //       const user = {
  //         id: data?.id || '',
  //         firstName: data?.firstName || '',
  //         lastName: data?.lastName || '',
  //         email: data?.email || '',
  //         password: data?.password || '',
  //         createdAt: data?.createdAt || new Date()
  //       };
  //       return user;
  //     })
  //     .catch((err) => err);
  //
  //   const userToUpdate: User = {
  //     id: uuidv4(),
  //     firstName: savedUser.firstName || '',
  //     lastName: 'Travolta',
  //     email: savedUser.email || '',
  //     password: savedUser.password || '',
  //     createdAt: savedUser.createdAt,
  //     updatedAt: new Date()
  //   };
  //
  //   dynamoUserRepository.update(userToUpdate);
  //
  //   const updatedUser = dynamoUserRepository.findById(user.id);
  //
  //   expect(updatedUser.lastName).toEqual('Travolta');
  //   expect(updatedUser.updatedAt).not.toBeNull();
  // });

  it('should delete a user', () => {
    // TASK #4: Implement the tests below
    const user: User = {
      id: uuidv4(),
      firstName: 'John',
      lastName: 'Doe',
      email: 'test@gmail.com',
      password: '1234',
      createdAt: new Date()
    };

    dynamoUserRepository.save(user);

    const savedUser = dynamoUserRepository.findById(user.id);

    expect(savedUser).not.toBeNull();

    dynamoUserRepository.delete(user.id);

    const deletedUser = dynamoUserRepository.findById(user.id);

    expect(deletedUser).toBeNull();
  });

  it('should find all users', () => {
    // TASK #5: Implement the tests below
    const user1: User = {
      id: uuidv4(),
      firstName: 'John',
      lastName: 'Doe',
      email: 'test@gmail.com',
      password: '1234',
      createdAt: new Date()
    };

    const user2: User = {
      id: uuidv4(),
      firstName: 'John',
      lastName: 'Travolta',
      email: 'test@gmail.com',
      password: '4567',
      createdAt: new Date()
    };

    dynamoUserRepository.save(user1);
    dynamoUserRepository.save(user2);

    const users = dynamoUserRepository.findAll();

    expect(users.then((value) => value.length)).toEqual(2);
  });
});
