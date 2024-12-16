'use client';
import TextComponent from '@/components/Text';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UserSession } from '@/entity/UserSession';
import useLocalStorage from '@/hooks/useLocalStorage';
import useNavigateTo from '@/hooks/useNavigateTo';
import { authSchema } from '@/schema/auth';
import { PASSWORD, USERNAME } from '@/utils/constant';
import { zodResolver } from '@hookform/resolvers/zod';
import { useId, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export default function AuthPage() {
  const form = useForm<z.infer<typeof authSchema>>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });
  const [validationError, setValidationError] = useState<string | null>(null);
  const id = useId();
  const navigate = useNavigateTo();

  const submit = (values: z.infer<typeof authSchema>) => {
    if (values.username !== USERNAME) {
      setValidationError('Invalid User');
      return;
    }
    if (values.password !== PASSWORD) {
      setValidationError('Invalid User');
      return;
    }

    useLocalStorage.set<UserSession>('session', { username: values.username, id });
    navigate('/');
  };

  return (
    <div className="h-screen w-screen px-4 flex justify-center items-center">
      <div className="w-full lg:w-1/3 p-12 border-1 border-gray-400 rounded-lg">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submit)} className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input onFocus={() => setValidationError(null)} placeholder="Username" {...field} />
                  </FormControl>
                  {validationError ? <TextComponent className="text-red-hris text-base mt-4">{validationError}</TextComponent> : <FormMessage />}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input onFocus={() => setValidationError(null)} type="password" placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end space-x-4">
              <Button size={'sm'} className="bg-blue-hris text-white hover:bg-blue-hris hover:opacity-90" type="submit">
                Save
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
