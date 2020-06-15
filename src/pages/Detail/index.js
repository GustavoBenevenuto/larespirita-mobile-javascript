import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';


const Detail = () => {

    const [data, setData] = useState({
        house: {
            id: 0,
            name: '',
            longitude: 0,
            latitude: 0,
            uf: '',
            city: '',
            neighborhood: '',
            street: '',
            number: '',
            telephone: '',
            email: '',
        },
        activity: [
            {
                name: '',
                weekday: '',
                hours: '',
            }
        ]

    });
    const page = useRoute();
    const pageParams = page.params;

    const [teste, setTeste] = useState([
        { key: '1', nome: 'Gustavo', idade: 20 },
        { key: '2', nome: 'Mário', idade: 22 },
        { key: '3', nome: 'Júlia', idade: 20 },
        { key: '4', nome: 'Adriana', idade: 21 },
        { key: '5', nome: 'Marcela', idade: 20 },
        { key: '6', nome: 'Camila', idade: 19 },
        { key: '7', nome: 'Luisa', idade: 23 },
        { key: '8', nome: 'Lara', idade: 25 },
    ]);

    useEffect(() => {
        axios.get(`http://192.168.0.10:3333/house/${pageParams.id}`)
            .then(response => { setData(response.data) })
            .catch(e => alert('Erro ao redenrizar os dados no mapa ' + e))
    }, []);

    return (
        <View style={s.container}>
            <View style={s.header}>
                <Image source={require('../../assets/home.png')}
                    style={s.image} />
                <View>
                    <Text style={s.title}>
                        {data.house.name}
                    </Text>
                    <Text style={s.description}>
                        {data.house.uf} - {data.house.city}
                    </Text>
                    <Text style={s.description}>
                        {data.house.neighborhood}, {data.house.street} - {data.house.number}
                    </Text>
                </View>
            </View>

            <View style={s.content}>
                <FlatList data={data.activity} renderItem={(item) => {
                    return (
                        <>
                            <Text style={s.titleWeekday}>{item.item.weekday}</Text>
                            <View style={s.card}>
                                <Text style={s.titleCard}>{item.item.name}</Text>
                                <Text style={s.descriptionCard}>Horário: {item.item.hours}</Text>
                            </View>
                        </>
                    );
                }} />
            </View>
        </View>
    )
}

const s = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F3F3F3",
    },

    header: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
        borderBottomWidth: 3,
        borderBottomColor: 'gray',
    },

    content: {
        flex: 4,
        // backgroundColor: 'blue',
    },

    // --------------- HEADER ---------------
    image: {
        width: 70,
        height: 70,
    },

    title: {
        color: '#051F54',
        fontSize: 25,
        marginLeft: 10,
    },

    description: {
        color: '#051F54',
        fontSize: 16,
        marginLeft: 12,
    },
    // --------------- HEADER ---------------

    // --------------- CONTENT ---------------
    titleWeekday: {
        fontSize: 25,
        color: 'gray',
        marginLeft: 10,
        paddingLeft: 10,
    },

    card: {
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 15,
        marginRight: 15,
        padding: 10,
        backgroundColor: '#D7E0F4',
        borderLeftWidth: 6,
        borderLeftColor: '#051F54',
        borderRadius: 10,
    },

    titleCard: {
        fontSize: 23,
        color: '#051F54',
    },

    descriptionCard: {
        fontSize: 18,
        color: '#051F54',
    },
    // --------------- CONTENT ---------------

});

export default Detail;