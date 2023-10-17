import { usersContract } from '@users/users.contract';
import { env } from '@env';
import { ApiFetcherArgs, initContract, tsRestFetchApi } from '@ts-rest/core';
import { initQueryClient } from '@ts-rest/react-query';
import { getSession } from 'next-auth/react';
import { failAndRetryAsync } from '@common/common.helpers';
import { isTokenValid, refreshToken } from '@users/users.helpers';
import { REFRESH_TOKEN_MAX_RETRIES } from '@users/users.constants';

const contract = initContract();
const apiContract = contract.router(
  {
    users: usersContract,
  },
  {
    validateResponseOnClient: true,
    pathPrefix: '/api',
  },
);

export const apiClient = initQueryClient(apiContract, {
  baseUrl: env.API_URL,
  baseHeaders: {},
  api: async (fetchOptions: ApiFetcherArgs) => {
    const session = await getSession();

    if (session && !(await isTokenValid())) {
      await failAndRetryAsync(refreshToken, REFRESH_TOKEN_MAX_RETRIES);
    }

    return tsRestFetchApi({
      ...fetchOptions,
      headers: {
        ...fetchOptions.headers,
        ...(session?.accessToken && {
          Authorization: `Bearer ${session?.accessToken}`,
        }),
      },
    });
  },
});
