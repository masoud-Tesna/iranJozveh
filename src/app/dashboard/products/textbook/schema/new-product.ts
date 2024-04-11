import { z } from 'zod';
import { MobileNumberZod } from '@/app/schema/mobile-number';
import { NationalCodeZod } from '@/app/schema/national-code';
import { FullNameZod } from '@/app/schema/full-name';
import { setInputRule } from '@/utils/setInputRule';

export const NewProductZod = z.object({
  category: z.string(),
  name: z.string({ required_error: setInputRule('requiredInput', { inputName: 'نام محصول' }) })
  .min(2, setInputRule('minLength', { inputName: 'نام محصول', length: 2 })),
  pageCount: z.string({ required_error: setInputRule('requiredInput', { inputName: 'تعداد صفحات' }) }),
  price: z.string({ required_error: setInputRule('requiredInput', { inputName: 'قیمت' }) }),
  file: z.string({ required_error: setInputRule('imageUploadRequired', { inputName: 'فایل PDF' }) }),
  image: z.string({ required_error: setInputRule('imageUploadRequired', { inputName: 'تصویر محصول' }) })
});
