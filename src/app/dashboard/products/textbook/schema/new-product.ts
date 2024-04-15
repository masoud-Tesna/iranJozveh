import { z } from 'zod';
import { setInputRule } from '@/utils/setInputRule';

export const NewProductZod = z.object({
  category: z.string(),
  name: z.string({ required_error: setInputRule('requiredInput', { inputName: 'نام درسنامه' }) })
  .min(2, setInputRule('minLength', { inputName: 'نام درسنامه', length: 2 })),
  pageCount: z.string({ required_error: setInputRule('requiredInput', { inputName: 'تعداد صفحات' }) }),
  price: z.string({ required_error: setInputRule('requiredInput', { inputName: 'قیمت' }) }),
  file: z.string({ required_error: setInputRule('imageUploadRequired', { inputName: 'فایل PDF' }) }),
  image: z.string({ required_error: setInputRule('imageUploadRequired', { inputName: 'تصویر درسنامه' }) })
});
