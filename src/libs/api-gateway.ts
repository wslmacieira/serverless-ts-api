import type { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from "aws-lambda"
// import type { FromSchema } from "json-schema-to-ts";

export declare type FromModel<S extends Object> = S
type ValidatedAPIGatewayProxyEvent<S> = Omit<APIGatewayProxyEvent, 'body'> & { body: FromModel<S> }
export type ValidatedEventAPIGatewayProxyEvent<S> = Handler<ValidatedAPIGatewayProxyEvent<S>, APIGatewayProxyResult>
export const formatJSONResponse = (response: Record<string, unknown>, statusCode: number) => {
  return {
    statusCode,
    body: JSON.stringify(response)
  }
}
