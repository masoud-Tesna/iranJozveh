import {z} from 'zod';
import {NationalCodeZod} from '@/app/schema/nationalCode';
import {PasswordZod} from '@/app/schema/password';
import { isValidNationalCode, setInputRule } from '@/utils/helpers';

export const LoginZod = z.object({
  nationalCode: z.string({ required_error: setInputRule('requiredInput', { inputName: 'کد ملی' }) }),
  password: PasswordZod
});
