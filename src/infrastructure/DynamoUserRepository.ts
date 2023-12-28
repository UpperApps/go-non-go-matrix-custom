/* eslint-disable id-length */

import { DynamoDB } from '@aws-sdk/client-dynamodb';

import type { UserRepository } from '../domain/user/UserRepository';
import type { User } from '../domain/user/User';

// TASK Replace it by the real configuration
// Require AWS SDK and instantiate DocumentClient
const dynamoDB = new DynamoDB({
  region: 'us-east-1',
  endpoint: 'http://localhost:4566',
  credentials: {
    accessKeyId: 'test',
    secretAccessKey: 'test'
  }
});

const USER_PK = 'USER';

const DynamoUserRepository: UserRepository = {
  // TASK #1: Implement the methods below
  save: async (user) => {
    console.log('Saving user', user);

    const params = {
      TableName: 'go-non-go-matrix',
      Item: {
        pk: { S: USER_PK },
        sk: { S: user.id },
        firstName: { S: user.firstName },
        lastName: { S: user.lastName },
        email: { S: user.email },
        password: { S: user.password },
        createdAt: { S: user.createdAt.toTimeString() }
      }
    };

    await dynamoDB.putItem(params).catch((err) => console.log(`Error saving user: ${err}`));
  },

  // TASK #2: Implement the methods below
  update: async (user) => {
    console.log('Updating user', user);
    await Promise.resolve();
  },

  // TASK #3: Implement the methods below
  delete: async (id) => {
    console.log('Deleting user', id);
    await Promise.resolve();
  },

  // TASK #4: Implement the methods below
  findById: async (id) => {
    console.log('Finding user by Id', id);

    const params = {
      TableName: 'go-non-go-matrix',
      Key: {
        pk: { S: USER_PK },
        sk: { S: id }
      }
    };

    const data = await dynamoDB
      .getItem(params)
      .then((data) => data.Item)
      .catch((err) => err);

    console.log('Data found');
    console.log(data);

    let user: User | null = null;

    if (data.Item) {
      user = {
        id: data.Item.sk.S || '',
        firstName: data.Item.firstName.S || '',
        lastName: data.Item.lastName.S || '',
        email: data.Item.email.S || '',
        password: data.Item.password.S || '',
        createdAt: new Date(data.Item.createdAt.S || '')
      };
    }

    console.log('User found');
    console.log(user);

    return user;
  },

  // TASK #5: Implement the methods below
  findAll: () => {
    console.log('Finding all users');
    return Promise.resolve([]);
  }
};

export default DynamoUserRepository;
