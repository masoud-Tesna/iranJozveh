import { z } from 'zod';
import { MobileNumberZod } from '@/app/schema/mobile-number';
import { NationalCodeZod } from '@/app/schema/national-code';
import { FullNameZod } from '@/app/schema/full-name';
import { setInputRule } from '@/utils/setInputRule';

export const NewUserZod = z.object({
  fullName: FullNameZod,
  mobileNumber: MobileNumberZod,
  nationalCode: NationalCodeZod,
  selectedProducts: z.array(z.object({
    value: z.string(),
    label: z.string()
  }), { required_error: setInputRule('requiredSelectBox', { inputName: 'درسنامه های مجاز' }) })
});
