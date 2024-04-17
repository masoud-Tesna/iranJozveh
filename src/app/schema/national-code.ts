import { z } from 'zod';
import { isValidNationalCode } from '@/utils/helpers';
import { setInputRule } from '@/utils/setInputRule';

export const NationalCodeZod = z.string({ required_error: setInputRule('requiredInput', { inputName: 'کد ملی' }) })
.length(10, setInputRule('length', { inputName: 'کد ملی', length: 10 })).refine(
  (value) => isValidNationalCode(value),
  { message: setInputRule('invalidNationalCode') }
);

export type TNationalCode = z.infer<typeof NationalCodeZod>;
