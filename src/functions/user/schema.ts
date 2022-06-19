import { object, string, number } from '@libs/validator'

export const schema = {
  body: object({
    name: string().required(),
    age: number().required(),
    doc: string().required()
  })
}
