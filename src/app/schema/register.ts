import { z } from 'zod';
import { setInputRule } from '@/utils/setInputRule';
import { PasswordZod } from '@/app/schema/password';
import { NationalCodeZod } from '@/app/schema/nationalCode';
import { CredentialZod } from '@/app/schema/credential';

export const RegisterZod = z.object({
    firstName: z.string({ required_error: setInputRule('requiredInput', { inputName: 'نام' }) }),
    lastName: z.string({ required_error: setInputRule('requiredInput', { inputName: 'نام خانوادگی' }) }),
    mobileNumber: CredentialZod,
    nationalCode: NationalCodeZod,
    password: PasswordZod,
    realstateName: z.string({ required_error: setInputRule('requiredInput', { inputName: 'نام املاک' }) }),
    realstateRegNo: z.string({ required_error: setInputRule('requiredInput', { inputName: 'کد شناسایی' }) }),
    realstateAddress: z.string({ required_error: setInputRule('requiredInput', { inputName: 'آدرس' }) })
});
