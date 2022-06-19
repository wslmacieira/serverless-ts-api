import type { AWS } from '@serverless/typescript';
import * as user from './src/functions'

const serverlessConfiguration: AWS = {
  service: 'aws-serverless-typescript-api',
  frameworkVersion: '3',
  plugins: [
    // 'serverless-plugin-typescript',
    'serverless-esbuild',
    'serverless-offline',
    'serverless-dynamodb-local'
  ],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    region: 'us-east-1',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
    iam: {
      role: {
        statements: [{
          Effect: "Allow",
          Action: [
            "dynamodb:DescribeTable",
            "dynamodb:Query",
            "dynamodb:Scan",
            "dynamodb:GetItem",
            "dynamodb:PutItem",
            "dynamodb:UpdateItem",
            "dynamodb:DeleteItem",
          ],
          Resource: "arn:aws:dynamodb:${opt:region, self:provider.region}:*:table/UsersTable",
        }],
      },
    },
  },
  // import the function via paths
  functions: {
    ...user
  },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
    dynamodb: {
      start: {
        port: 5000,
        inMemory: true,
        migrate: true,
      },
      stages: "dev"
    }
  },
  resources: {
    Resources: {
      TodosTable: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          TableName: "UsersTable",
          AttributeDefinitions: [{
            AttributeName: "userId",
            AttributeType: "S",
          }],
          KeySchema: [{
            AttributeName: "userId",
            KeyType: "HASH"
          }],
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1
          },

        }
      }
    }
  }
};
module.exports = serverlessConfiguration;