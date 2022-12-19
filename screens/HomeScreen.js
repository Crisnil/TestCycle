import * as React from 'react';
import { Button, Text, FlatList, View ,StyleSheet,
SafeAreaView } from 'react-native';
import { AuthCtx } from '../context/authCtx';
import {get} from '../rest'


const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const HomeScreen =()=> {
  const {dispatch,profile } = React.useContext(AuthCtx);
   const [post,setPost] = React.useState([]);
   const [refresh,setRefresh] = React.useState(false)

  React.useEffect(() => {
    letfetching = true;
    fetchpost();
    return () => {
        letfetching = false
    }
}, []);


const fetchpost = async ()=>{
  setRefresh(true)
  const {data,error}= await get('/crisnil/fake-api/posts')
      if(data){
          console.log(data)
          setPost(data)
      }
      setRefresh(false)
  }

  const onSignOut =()=>{
    dispatch({type:"SIGN_OUT"})
  }

  const renderItem = ({ item }) => (
    <Item title={item.title} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
      onRefresh={fetchpost}
      refreshing={refresh}
        data={post}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});