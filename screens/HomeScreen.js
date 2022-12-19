import * as React from 'react';
import { Button, Text, TextInput, View ,StyleSheet } from 'react-native';
import { AuthCtx } from '../context/authCtx';

const HomeScreen =()=> {
  const {dispatch } = React.useContext(AuthCtx);


  const onSignOut =()=>{
    dispatch({type:"SIGN_OUT"})
  }
  return (
    <View>
      <Text>Signed in!</Text>
      <Button title="Sign out" onPress={onSignOut} />
    </View>
  );
}

export default HomeScreen;