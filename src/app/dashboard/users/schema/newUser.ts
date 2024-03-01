import { z } from 'zod';
import { MobileNumberZod } from '@/app/schema/mobileNumber';
import { NationalCodeZod } from '@/app/schema/nationalCode';
import { FullNameZod } from '@/app/schema/fullName';
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
