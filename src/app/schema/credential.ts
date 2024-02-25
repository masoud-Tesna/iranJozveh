import { z } from 'zod';
import { setInputRule } from '@/utils/setInputRule';

export const CredentialZod = z.string({ required_error: setInputRule('requiredInput', { inputName: 'شماره موبایل' }) }).length(11, setInputRule('length', { inputName: 'شماره موبایل', length: 11 }));
