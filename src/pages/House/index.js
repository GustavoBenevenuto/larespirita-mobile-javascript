import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';

MapboxGL.setAccessToken('pk.eyJ1IjoiZ3VzdGF2b2JlbmUiLCJhIjoiY2tiZmszYjV3MHdiNTJybXVnbmRzYXM4dyJ9.l1WeraEe0RO-pw9GlZ-pXQ');

const House = () => {

    const [data, setData] = useState([]);
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);

    const page = useRoute();
    const pageParams = page.params;

    const navigation = useNavigation();

    useEffect(() => {
        axios.get('http://192.168.0.10:3333/house', {
            params: {
                uf: pageParams.uf,
                city: pageParams.city,
            }
        })
            .then(response => setData(response.data))
            .catch(e => alert('Erro ao redenrizar os dados no mapa ' + e))
    }, []);

    const handleToDetail = id => {
        navigation.navigate('Detail', {id: id});
    }

    return (
        <View style={s.container}>
            <View style={s.content}>
                <Text style={s.title}>Bem vindo!</Text>
                <Text style={s.description}>Encontre no mapa um centro espírita.</Text>
            </View>

            <MapboxGL.MapView
                style={s.map}
                showUserLocation
                rotateEnabled={false}
            >
                <MapboxGL.Camera zoomLevel={5} centerCoordinate={[-43.9341399, -19.8273332]} />

                {data.map(item => {
                    return (
                        <MapboxGL.PointAnnotation
                            onDeselected={() => {handleToDetail(item.id)}}
                            id={item.id.toString()}
                            coordinate={[item.longitude, item.latitude]}
                            key={item.id}
                        >
                            <View style={s.annotationContainer}>
                                <View style={s.annotationFill}/>
                            </View>
                            <MapboxGL.Callout title={item.name}/>
                        </MapboxGL.PointAnnotation>
                    )
                })}

            </MapboxGL.MapView>
        </View>
    )
}
const s = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F3F3F3",
        marginTop: 10,
    },

    content: {
        flex: 1,
        justifyContent: 'center',
        marginLeft: 25,
    },

    title: {
        color: '#051F54',
        fontSize: 24,
    },

    description: {
        color: '#051F54',
        fontSize: 18,
    },

    map: {
        flex: 7,
        borderColor: '#051F54',
        borderWidth: 10,
        borderRadius: 20,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 10,

    },

    annotationContainer: {
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 15,
    },
    annotationFill: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#051F54',
        transform: [{ scale: 0.8 }],
    },
});

export default House;