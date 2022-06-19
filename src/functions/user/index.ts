import { handlerPath } from '@libs/handler-resolver';

export const getAllUsers = {
  handler: `${handlerPath(__dirname)}/handler.mainGetAll`,
  events: [
    {
      http: {
        method: 'get',
        path: 'user',
      },
    },
  ],
};

export const createUser = {
  handler: `${handlerPath(__dirname)}/handler.mainCreate`,
  events: [
    {
      http: {
        method: 'post',
        path: 'user',
      },
    },
  ],
};

export const getUser = {
  handler: `${handlerPath(__dirname)}/handler.mainGet`,
  events: [
    {
      http: {
        method: 'get',
        path: 'user/{id}',
      },
    },
  ],
};

export const updateUser = {
  handler: `${handlerPath(__dirname)}/handler.mainUpdate`,
  events: [
    {
      http: {
        method: 'put',
        path: 'user/{id}',
      },
    },
  ],
};

export const deleteUser = {
  handler: `${handlerPath(__dirname)}/handler.mainDelete`,
  events: [
    {
      http: {
        method: 'delete',
        path: 'user/{id}',
      },
    },
  ],
};

