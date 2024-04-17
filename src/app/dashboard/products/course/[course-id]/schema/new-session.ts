import { z } from 'zod';
import { setInputRule } from '@/utils/setInputRule';

export const NewSessionZod = z.object({
  number: z.string({ required_error: setInputRule('requiredInput', { inputName: 'شماره جلسه' }) }),
  time: z.string({ required_error: setInputRule('requiredInput', { inputName: 'مدت زمان' }) }),
  description: z.string().min(10, setInputRule('minLength', { inputName: 'توضیحات', length: 10 })).optional(),
  video: z.object({}, { required_error: setInputRule('requiredUpload', { inputName: 'ویدئو جلسه' }) })
});
