import { CredentialZod } from './credential';
import { RegisterZod } from './register';

export const LoginZod = RegisterZod.pick({ password: true }).extend({
    credential: CredentialZod
});
