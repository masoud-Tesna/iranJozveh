import { z } from 'zod';
import { setInputRule } from '@/utils/setInputRule';

export const FullNameZod = z.string({ required_error: setInputRule('requiredInput', { inputName: 'نام و نام خانوادگی' }) })
.min(5, setInputRule('minLength', { inputName: 'نام و نام خانوادگی', length: 5 }))
.max(40, setInputRule('maxLength', { inputName: 'نام و نام خانوادگی', length: 40 }));
