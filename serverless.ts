import type { AWS } from '@serverless/typescript';

// import hello from '@functions/hello';
import blog from '@functions/blog';

const serverlessConfiguration: AWS = {
  service: 'blog',
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
    },
  },
  plugins: ['serverless-webpack'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    region: 'us-east-1',
    endpointType: 'REGIONAL',
    stackName: 'myblogstackserverless',
    apiName: 'myblogapi',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    vpc: {
      securityGroupIds: ['sg-03421f081c29e4801'],
      subnetIds: ['subnet-00b9a6dbf34c906a7'],
    },
    httpApi: {
      authorizers: {
        cognitoBlogAuthorizer: {
          name: 'cognito-blog-authorizer',
          issuerUrl:
            'https://cognito-idp.us-east-1.amazonaws.com/us-east-1_v9TUHpREw',
          identitySource: '$request.header.Authorization',
          audience: '20i0jvua4etdubhkkvnjklmnrm',
        },
      },
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
    lambdaHashingVersion: '20201221',
    tags: {
      Name: 'AWS Lambda Blog Fn',
      purpose: 'Training Project',
      createdBy: 'rchandran@presidio.com',
      owner: 'rchandran@presidio.com',
    },
  },
  // import the function via paths
  functions: { blog },
  resources: {
    Resources: {
      ApiGatewayAuthorizer: {
        Type: 'AWS::ApiGateway::Authorizer',
        Properties: {
          Name: 'cognito-blog-authorizer',
          IdentitySource: 'method.request.header.Authorization',
          RestApiId: {
            Ref: 'ApiGatewayRestApi',
          },
          Type: 'COGNITO_USER_POOLS',
          ProviderARNs: [
            'arn:aws:cognito-idp:us-east-1:877969058937:userpool/us-east-1_v9TUHpREw',
          ],
        },
      },
    },
  },
};

module.exports = serverlessConfiguration;
