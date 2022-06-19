export const schemaValidator = (schema: any) => {
  const before = async (req: any) => {
    try {
      const { body, queryStringParameters } = req.event

      if (schema.body) {
        schema.body.validateSync(body)
      }

      if (schema.queryStringParameters) {
        schema.queryStringParameters.validateSync(queryStringParameters)
      }

      return Promise.resolve()
    } catch (e: any) {
      delete e.stack
      return {
        statusCode: 400,
        body: JSON.stringify({
          errors: e.errors
        })
      }
    }
  }
  return {
    before
  }
}
