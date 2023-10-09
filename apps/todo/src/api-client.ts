import { authContract } from '@auth/auth.contract';
import { env } from '@env';
import { initContract } from '@ts-rest/core';
import { initQueryClient } from '@ts-rest/react-query';

const contract = initContract();

const apiContract = contract.router(
  {
    auth: authContract,
  },
  {
    validateResponseOnClient: true,
    pathPrefix: '/api',
  },
);

export const apiClient = initQueryClient(apiContract, {
  baseUrl: env.API_URL,
  baseHeaders: {},
});
