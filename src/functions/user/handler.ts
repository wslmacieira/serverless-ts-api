import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middleware } from '@middleware/middleware-factory';
import User from 'src/model/user';
import { v4 } from "uuid";
import userService from '../../service'

import { schema } from './schema';

const getAllUsers: ValidatedEventAPIGatewayProxyEvent<User[]> = async () => {
  const users = await userService.getAllUsers();
  return formatJSONResponse({
    users
  }, 200)
}

const createUser: ValidatedEventAPIGatewayProxyEvent<User> = async (event) => {
  try {
    const id = v4();
    const user: User = await userService.createUser({
      userId: id,
      name: event.body.name,
      age: event.body.age,
      doc: event.body.doc,
      createdAt: new Date().toISOString(),
    })
    return formatJSONResponse({
      user
    }, 201);
  } catch (e) {
    return formatJSONResponse({
      message: e
    }, 500);
  }
};

const getUser: ValidatedEventAPIGatewayProxyEvent<User> = async (event) => {
  const id = event.pathParameters?.id as string;
  try {
    const user = await userService.getUser(id)
    return formatJSONResponse({
      user, id
    }, 200);
  } catch (e) {
    return formatJSONResponse({
      message: e
    }, 500);
  }
}

const updateUser: ValidatedEventAPIGatewayProxyEvent<User> = async (event) => {
  const id = event.pathParameters?.id as string;
  try {
    const user = await userService.updateUser(id)
    return formatJSONResponse({
      user, id
    }, 200);
  } catch (e) {
    return formatJSONResponse({
      message: e
    }, 500);
  }
}

const deleteUser: ValidatedEventAPIGatewayProxyEvent<User> = async (event) => {
  const id = event.pathParameters?.id as string;
  try {
    const user = await userService.deleteUser(id)
    return formatJSONResponse({
      user, id
    }, 200);
  } catch (e) {
    return formatJSONResponse({
      message: e
    }, 500);
  }
}

export const hello = async (event: any) => {
  event
  return formatJSONResponse({
    message: 'Hello World'
  }, 200)
}

export const mainGetAll = middleware(getAllUsers);
export const mainCreate = middleware(createUser, schema);
export const mainGet = middleware(getUser);
export const mainUpdate = middleware(updateUser);
export const mainDelete = middleware(deleteUser);
