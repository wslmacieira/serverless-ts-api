import { schemaJson } from './schema';
import { handlerPath } from '@libs/handler-resolver';

export const createUser = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'post',
        path: 'user',
        request: {
          schemas: {
            'application/json': schemaJson,
          },
        },
      },
    },
  ],
};

