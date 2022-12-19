
import * as React from 'react';
import { Button, Text, Image, View ,StyleSheet } from 'react-native';
import { AuthCtx } from '../context/authCtx';


 const  ProfileScreen = ()=> {

const {dispatch,profile}= React.useContext(AuthCtx);

    return (
      <View>
        <Text>Name : {profile.user}</Text>
        
      <Image
        source={{uri: profile.avatar}}
        style={{width: 200, height: 200}}
      />
      </View>
    );
  }
  export default ProfileScreen;

  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    flexDirection:'column',
    padding:5
  },
});