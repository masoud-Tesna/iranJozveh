import { z } from 'zod';
import { setInputRule } from '@/utils/setInputRule';

export const PasswordZod = z.string({ required_error: setInputRule('requiredInput', { inputName: 'رمز عبور' }) }).min(8, setInputRule('minLength', { inputName: 'رمز عبور', length: 8 }));

