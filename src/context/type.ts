import { Role } from './role';

export interface ApplicationState {
  username: String | null;
  role: Role | null;
  isLogin: Boolean;
}
