import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { User } from '@/types/api';

export const getUser = (id: string): Promise<User> => {
  return api.get(`/users/${id}`);
};

export const getUserQueryOptions = (id: string) => {
  return queryOptions({
    queryKey: ['users', id],
    queryFn: () => getUser(id),
  });
};

type UseUsersOptions = {
  queryConfig?: QueryConfig<typeof getUserQueryOptions>;
};

export const useUser = (id: string, { queryConfig }: UseUsersOptions = {}) => {
  return useQuery({
    ...getUserQueryOptions(id),
    ...queryConfig,
  });
};
