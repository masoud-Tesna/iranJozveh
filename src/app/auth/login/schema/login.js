import {z} from 'zod';
import {NationalCodeZod} from '@/app/schema/nationalCode';
import {PasswordZod} from '@/app/schema/password';

export const LoginZod = z.object({
  nationalCode: NationalCodeZod,
  password: PasswordZod
});
