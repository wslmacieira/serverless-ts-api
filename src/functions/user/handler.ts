import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middleware } from '@middleware/middleware-factory';
import User from 'src/model/user';
import { v4 } from "uuid";
import userService from '../../service'

import { schema, schemaJson } from './schema';

const createUser: ValidatedEventAPIGatewayProxyEvent<typeof schemaJson> = async (event) => {
  try {
    const id = v4();
    console.log(event.body);

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

export const main = middleware(createUser, schema);
