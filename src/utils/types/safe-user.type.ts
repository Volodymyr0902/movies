import { User } from '../../models/user';

export type SafeUser = Pick<User, 'id' | 'email' | 'name'>;
