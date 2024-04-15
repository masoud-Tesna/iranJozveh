import { z } from 'zod';
import { setInputRule } from '@/utils/setInputRule';

export const NewCourseZod = z.object({
  name: z.string({ required_error: setInputRule('requiredInput', { inputName: 'نام دوره' }) })
  .min(2, setInputRule('minLength', { inputName: 'نام دوره', length: 2 })),
  image: z.string({ required_error: setInputRule('imageUploadRequired', { inputName: 'تصویر دوره' }) }),
  price: z.string({ required_error: setInputRule('requiredInput', { inputName: 'قیمت' }) }),
  description: z.string()
});
