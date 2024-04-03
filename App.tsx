import { UserProvider } from './src/contexts/UserContext';
import AppNavigation from './src/navigation';

export default function App() {
  return (
    <UserProvider>
      <AppNavigation />
    </UserProvider>
  );
}
