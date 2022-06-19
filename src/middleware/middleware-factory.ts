import middy from "@middy/core"
import jsonBodyParser from "@middy/http-json-body-parser"
import { Handler } from "aws-lambda"
import { loggerMiddleware } from "./logger"
import { schemaValidator } from './schema-validator'

export const middleware = (handler: Handler, schema: any = {}) => {
  return middy(handler)
    .use(jsonBodyParser())
    .use(schemaValidator(schema))
    .use(loggerMiddleware())
}
