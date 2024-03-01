import { z } from 'zod';
import { setInputRule } from '@/utils/setInputRule';

export const MobileNumberZod = z.string({ required_error: setInputRule('requiredInput', { inputName: 'شماره موبایل' }) })
.startsWith('09', setInputRule('inputStartWith', { inputName: 'شماره موبایل', startWith: '09' }))
.length(11, setInputRule('length', { inputName: 'شماره موبایل', length: 11 }));
