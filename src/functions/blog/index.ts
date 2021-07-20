// import schema from './schema';
import { handlerPath } from '@libs/handlerResolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  tags: {
    Name: 'AWS Cognito User Pool',
    purpose: 'Training Project',
    createdBy: 'rchandran@presidio.com',
    owner: 'rchandran@presidio.com',
  },
  events: [
    {
      http: {
        method: 'get',
        path: 'blog',
        authorizer: {
          type: 'COGNITO_USER_POOLS',
          authorizerId: { Ref: 'ApiGatewayAuthorizer' },
        },
        // request: {
        //   schema: {
        //     'application/json': schema,
        //   },
        // },
      },
    },
  ],
};
