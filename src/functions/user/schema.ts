export const schemaJson = {
  type: "object",
  properties: {
    name: { type: 'string' },
    age: { type: 'number' },
    doc: { type: 'string' },
  },
  required: ['name', 'age', 'doc']
} as const;

import { object, string, number } from 'yup'

export const schema = {
  body: object({
    name: string().required(),
    age: number().required(),
    doc: string().required()
  })
}
