import { QueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';

import { ContentLayout } from '@/components/layouts';
import { getUserQueryOptions } from '@/features/users/api/get-user';
import { UserEditForm } from '@/features/users/components/users-edit-form';
import { Authorization, ROLES } from '@/lib/authorization';

export const userLoader =
  (queryClient: QueryClient, userId: string) => async () => {
    const query = getUserQueryOptions(userId);

    /*return (
      queryClient.getQueryData(query.queryKey) ??
      (await queryClient.fetchQuery(query))
    );*/

    const data = queryClient.getQueryData(query.queryKey);
    if (data) {
      return data;
    }
    return await queryClient.fetchQuery(query);
  };

export const EditUserRoute = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  if (!id) {
    navigate('/app/users');
    return null;
  }

  return (
    <ContentLayout title="Users">
      <Authorization
        forbiddenFallback={<div>Only admin can view this.</div>}
        allowedRoles={[ROLES.ADMIN]}
      >
        <UserEditForm userId={id} />
      </Authorization>
    </ContentLayout>
  );
};
