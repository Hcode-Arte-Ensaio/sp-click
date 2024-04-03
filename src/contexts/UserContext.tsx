import { User } from 'firebase/auth';
import { createContext } from 'react';
import { useUser } from '../firebase';

export const UserContext = createContext<User | undefined>(undefined);

export function UserProvider({ children }: React.PropsWithChildren) {
  const user = useUser();
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
