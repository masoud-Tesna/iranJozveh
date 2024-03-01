import { MobileNumberZod } from './mobileNumber';
import { RegisterZod } from './register';

export const LoginZod = RegisterZod.pick({ password: true }).extend({
  credential: MobileNumberZod
});
