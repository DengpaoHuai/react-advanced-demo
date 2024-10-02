import { Pen } from 'lucide-react';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, Input, Textarea } from '@/components/ui/form';
import { useNotifications } from '@/components/ui/notifications';
import { Spinner } from '@/components/ui/spinner';

import { useUser } from '../api/get-user';
import { useUpdateProfile } from '../api/update-profile';

export const updateUserInputSchema = z.object({
  email: z.string().min(1, 'Required').email('Invalid email'),
  firstName: z.string().min(1, 'Required'),
  lastName: z.string().min(1, 'Required'),
  bio: z.string(),
});

export const UserEditForm = ({ userId }: { userId: string }) => {
  const userQuery = useUser(userId);
  const { addNotification } = useNotifications();
  const updateProfileMutation = useUpdateProfile({
    mutationConfig: {
      onSuccess: () => {
        addNotification({
          type: 'success',
          title: 'Profile Updated',
        });
      },
    },
  });

  if (userQuery.isLoading) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  const user = userQuery.data;
  console.log(user);
  if (!user) return null;

  return (
    <Form
      id="update-profile"
      onSubmit={(values) => {
        updateProfileMutation.mutate({ data: values });
      }}
      options={{
        defaultValues: {
          firstName: user.firstName ?? '',
          lastName: user.lastName ?? '',
          email: user.email ?? '',
          bio: user.bio ?? '',
        },
      }}
      schema={updateUserInputSchema}
    >
      {({ register, formState }) => (
        <>
          <Input
            label="First Name"
            error={formState.errors['firstName']}
            registration={register('firstName')}
          />
          <Input
            label="Last Name"
            error={formState.errors['lastName']}
            registration={register('lastName')}
          />
          <Input
            label="Email Address"
            type="email"
            error={formState.errors['email']}
            registration={register('email')}
          />

          <Textarea
            label="Bio"
            error={formState.errors['bio']}
            registration={register('bio')}
          />
          <Button type="submit" form="update-profile">
            <div className="flex items-center">
              <Pen size={16} />
              <span className="ml-2">Update Profile</span>
            </div>
          </Button>
        </>
      )}
    </Form>
  );
};
