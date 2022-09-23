import { StackActions } from "@react-navigation/native";
import { createStackNavigator} from react-navigation-StackActions;
import LoginScreen from "../Screen/LoginScreen";
import RegisterScreen from "../Screen/RegisterScreen";
import ForgotPassword from "../Screen/ForgotPassword";

const AuthNavigation = createStackNavigator(
    {
        signIn: {screen: LoginScreen},
        signUp: {screen: RegisterScreen},
        ForgotPassword: {screen: ForgotPassword}
    },
    {
        initialRouteName: signIn,
        headerMode: 'none'
    }
);

export default AuthNavigation;
