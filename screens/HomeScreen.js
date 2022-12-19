import * as React from 'react';
import { Button, Text, FlatList, View ,StyleSheet,TextInput,ToastAndroid,
SafeAreaView } from 'react-native';
import { AuthCtx } from '../context/authCtx';
import {get, post} from '../rest';
import _ from 'lodash';


const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const HomeScreen =()=> {
  const {dispatch,profile } = React.useContext(AuthCtx);
   const [posting,setPosting] = React.useState([]);
   const [refresh,setRefresh] = React.useState(false)
   const [title, setTitle] = React.useState('');
   

  React.useEffect(() => {
    let fetching = true;
    fetchpost();
    return () => {
        fetching = false
    }
}, []);


const fetchpost = async ()=>{
  setRefresh(true)
  const {data,error}= await get('/crisnil/fake-api/posts')
      if(data){
          setPosting(data)
      }
      setRefresh(false)
  }

  const onAdd = async ()=>{
   let posts = _.clone(posting)
   let itemA = {};
   itemA.title = title;
   itemA.id = title;
   
   const {data,error} = await post('/crisnil/fake-api/posts',{itemA})
    if(data){
      
      ToastAndroid.show('Post Success!', ToastAndroid.LONG);
      posts.push(itemA)
    setPosting(posts);
    setTitle('')
    }
    else if(error){
      ToastAndroid.show('Something went wrong wiht API!', ToastAndroid.LONG);
    }
    
  }

  const renderItem = ({ item }) => (
    <Item title={item.title} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
      style={{flex:2}}
      onRefresh={fetchpost}
      refreshing={refresh}
        data={posting}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />

      <TextInput
              style={styles.input}
              onChangeText={setTitle}
              value={title}
      />
      <Button title="Submit" onPress={onAdd}  style={styles.item}/>
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
    flex:1
  },
  input:{
    backgroundColor:'#fff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    fontSize: 32,
  },
  title: {
    fontSize: 32,
  },
});