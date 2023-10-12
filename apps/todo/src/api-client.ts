import { authContract } from '@auth/auth.contract';
import { authOptions } from '@auth/auth.options';
import { IS_SERVER } from '@common/common.constants';
import { env } from '@env';
import { initContract, tsRestFetchApi } from '@ts-rest/core';
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
  api: async (fetchOptions) => {
    // const session = await (IS_SERVER
    //   ? import('next-auth').then(({ getServerSession }) => getServerSession(authOptions))
    //   : import('next-auth/react').then(({ getSession }) => getSession()));

    // Check validity

    // If invalid
    // Refresh validity

    return tsRestFetchApi({
      ...fetchOptions,
      headers: {
        ...fetchOptions.headers,
        // ...(session && {
        //   Authorization: `Bearer ${session?.accessToken}`,
        // }),
      },
    });
  },
});
