import * as React from 'react';
import { Button, Text, FlatList, View ,StyleSheet,TextInput,
SafeAreaView } from 'react-native';
import { AuthCtx } from '../context/authCtx';
import {get} from '../rest';
import _ from 'lodash';


const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const HomeScreen =()=> {
  const {dispatch,profile } = React.useContext(AuthCtx);
   const [post,setPost] = React.useState([]);
   const [refresh,setRefresh] = React.useState(false)
   const [title, setTitle] = React.useState('');
   

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
          setPost(data)
      }
      setRefresh(false)
  }

  const onAdd =()=>{
   let posts = _.clone(post)
   let itemA = {};
   itemA.title = title;
   itemA.id = Math.random();
   posts.push(itemA)
   setPost(posts);
   setTitle("")
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