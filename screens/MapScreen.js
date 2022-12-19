import React from 'react';
import {View ,StyleSheet,Dimensions } from 'react-native';
import MapView,{ Marker } from 'react-native-maps';
import _ from 'lodash';

let { height, width } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const latitudeDelta = 0.0092;
const longitudeDelta = latitudeDelta * ASPECT_RATIO;
function randomColor() {
    return `#${Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, 0)}`;
}
//51.50848584532908, -0.08819087602776149

const MapScreen = () => {

    const [region,setRegion] = React.useState({ latitude: 51.50848584532908,
        longitude: -0.08819087602776149,
        latitudeDelta:latitudeDelta,
        longitudeDelta: longitudeDelta,
     },)
    const [markers,setMarkers] = React.useState([{title:"Sample",description:"short description",coordinate:{latitude: 51.50642507224466, longitude: -0.0883714109659195}}])

    const onPanDrag =()=>{

    } 
    const addMarker =(e)=>{
        console.log(e.nativeEvent.coordinate)
        let marks  = _.clone(markers);
        const marked = {title:"Sample",description:"short description",coordinate:e.nativeEvent.coordinate}
        marks.push(marked);
        setMarkers(marks);
    } 
   
    return (
        <View style={styles.container}>
            <MapView style={styles.map} 
                initialRegion={region}
                mapType={"hybrid"}
                followsUserLocation={true}
                showsMyLocationButton={true}
                showsUserLocation={true}
                showsCompass={true}
                moveOnMarkerPress={true}
                onPanDrag={onPanDrag}
                onPress={addMarker}
            >
               {markers.map((marker, index) => (
                        <Marker
                        key={index}
                        coordinate={marker.coordinate}
                        title={marker.title}
                        description={marker.description}
                        />
                    ))}
            </MapView>
        </View>
    );
};



export default MapScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      width: '100%',
      height: '100%',
    },
  });