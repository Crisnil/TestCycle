
import * as React from 'react';
import { Button, Text, TextInput ,StyleSheet} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import SignInScreen from './screens/SignInScreen';
import MapScreen from './screens/MapScreen';
import { AccountProvider } from './context/account';
import authCtx,{AuthCtx} from'./context/authCtx';
import * as SecureStore from 'expo-secure-store';



const Stack = createStackNavigator();

export default function App({ navigation }) {
  
   const [state, dispatch] = React.useReducer(authCtx, {});



   const onSignOut =()=>{
     dispatch({type:"SIGN_OUT"})
   }
  React.useEffect(() => {
   
    
    const bootstrapAsync = async () => {
      let userToken;

      try {
        // Restore token stored in `SecureStore` or any other encrypted storage
         userToken = await SecureStore.getItemAsync('userToken');
         await dispatch({ type: 'RESTORE_TOKEN', token: userToken });
      } catch (e) {
        // Restoring token failed
      }

      
    };

    bootstrapAsync();
  }, []);

  const Drawer = createDrawerNavigator();
  
console.log(state);
 
   if(state.isLoading){
    return(
      <Stack.Screen name="Splash" component={SplashScreen} />
    )
   }
  return (
    <AuthCtx.Provider
      value={{...state,dispatch}}
    >
    <AccountProvider>
      <NavigationContainer>
          {state.userToken == null ? (
            <Stack.Navigator>
           
            <Stack.Screen
              name="SignIn"
              component={SignInScreen}
              options={{
                title: 'Sign in',
                // When logging out, a pop animation feels intuitive
                animationTypeForReplace: state.isSignout ? 'pop' : 'push',
              }}
            />
            </Stack.Navigator>
          ) : (
            // User is signed in
            
            <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Home" component={HomeScreen}  />
            <Drawer.Screen name="Map" component={MapScreen}  />
            <Drawer.Screen name="ProfileScreen" component={ProfileScreen} 
            options={({ navigation, route }) => ({
              // Add a placeholder button without the `onPress` to avoid flicker
              headerRight: () => (
                <Button title="Sign Out" onPress={onSignOut} />
              ),
            })}
            />
          </Drawer.Navigator>
          )}
        
      </NavigationContainer>
      
    </AccountProvider>
    </AuthCtx.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding:10
  },
});
