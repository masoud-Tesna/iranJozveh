import { z } from 'zod';
import { setInputRule } from '@/utils/setInputRule';

export const NewVersionZod = z.object({
  versionName: z.string({ required_error: setInputRule('requiredInput', { inputName: 'شماره ورژن' }) }),
  updateNotes: z.array(z.string()).optional(),
  isForce: z.boolean().optional()
});
