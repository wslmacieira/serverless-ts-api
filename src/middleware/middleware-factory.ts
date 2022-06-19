import middy from "@middy/core"
import jsonBodyParser from "@middy/http-json-body-parser"
import { schemaValidator } from './schema-validator'

export const middleware = (handler: any, schema: any) => {
  return middy(handler)
    .use(jsonBodyParser())
    .use(schemaValidator(schema))
}
