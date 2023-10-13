import { authContract } from '@users/users.contract';
import { env } from '@env';
import { initContract, tsRestFetchApi } from '@ts-rest/core';
import { initQueryClient } from '@ts-rest/react-query';
import { getSession } from '@users/users.helpers';

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
  api: async (fetchOptions) => {
    const session = await getSession();

    // Check validity
    if (session && Date.parse(session?.accessTokenValidUntil) > Date.now()) {
      console.log('invalid');

      // Refresh validity
      // await until refreshed
    }

    return tsRestFetchApi({
      ...fetchOptions,
      headers: {
        ...fetchOptions.headers,
        ...(session && {
          Authorization: `Bearer ${session?.accessToken}`,
        }),
      },
    });
  },
});
