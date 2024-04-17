import {z} from 'zod';
import {PasswordZod} from '@/app/schema/password';
import {setInputRule} from '@/utils/setInputRule';

export const LoginZod = z.object({
  nationalCode: z.string({required_error: setInputRule('requiredInput', {inputName: 'کد ملی'})}),
  password: PasswordZod
});
