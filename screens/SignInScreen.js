
import * as React from 'react';
import { Button, Text, TextInput, ToastAndroid,View ,StyleSheet,SafeAreaView } from 'react-native';
import { AuthCtx } from '../context/authCtx';
import {get} from '../rest'

const SignInScreen =()=> {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [loading,setLoading] = React.useState(false);

    const { isLoading ,signIn,dispatch } = React.useContext(AuthCtx);

    const login = async ()=>{
      setLoading(true)
      const {data,error } = await  get('/crisnil/fake-api/profile');
        if(data){
          setLoading(false)
         // if(data.user == username  && data.password == password){
            dispatch({type:"SIGN_IN",token:"secret-token"});
            dispatch({type:"SET_PROFILE",profile:data})
         // }
         // else{
         //   ToastAndroid.show('Invalid Credentials', ToastAndroid.LONG);
        //  }
        }
        else{
          setLoading(false);
          ToastAndroid.show('Something went wrong!', ToastAndroid.Long);
        }
       
    }
    const onSignIn =()=>{
      dispatch({type:"SIGN_IN",token:"secret-token"})
    }

    
    return (
      <SafeAreaView style={styles.container}>
        {loading?
           <View>
           <Text>Loading...</Text>
         </View>  
         :
      
      <View>
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button title="Sign in" onPress={login} loading={loading}/>
      </View>
      }
      </SafeAreaView>
    );
  }
  export default SignInScreen;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });