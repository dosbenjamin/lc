import { authContract } from '@auth/auth.contract';
import { env } from '@env';
import { initClient, initContract } from '@ts-rest/core';

const contract = initContract();
const apiContract = contract.router(
  {
    auth: authContract,
  },
  {
    validateResponseOnClient: true,
  },
);

export const apiClient = initClient(apiContract, {
  baseUrl: env.API_URL,
  baseHeaders: {},
});
