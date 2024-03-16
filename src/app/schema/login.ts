import { MobileNumberZod } from './mobile-number';
import { RegisterZod } from './register';

export const LoginZod = RegisterZod.pick({ password: true }).extend({
  credential: MobileNumberZod
});
