import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../app/navigation/types';

// ✅ Spécifie bien "SignIn" ici
type NavigationProp = StackNavigationProp<RootStackParamList, 'SignIn'>;

const mockNavigate = jest.fn();

const mockNavigation = {
  navigate: mockNavigate,
  dispatch: jest.fn(),
  goBack: jest.fn(),
  reset: jest.fn(),
  setOptions: jest.fn(),
  isFocused: jest.fn(),
  canGoBack: jest.fn(),
  dangerouslyGetParent: jest.fn(),
  dangerouslyGetState: jest.fn(),
} as Partial<NavigationProp> as NavigationProp;

export { mockNavigate, mockNavigation };
