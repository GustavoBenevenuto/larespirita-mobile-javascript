import React, { useEffect, useState} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native'

const App = () => {

    const [ufs, setUfs] = useState([]);
    const [selectedUf, setSelectedUf] = useState('');
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState('0');

    const navigation = useNavigation();

    useEffect(() => {
        axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome')
            .then(response => {
                const states = response.data.map(item => {
                    return {
                        value: item.sigla,
                        label: item.nome
                    }
                });
                setUfs(states);
            })
            .catch(e => alert('Erro ao carregar os estados '+e));
    },[]);

    useEffect(() => {
        axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
        .then(response => {
            const cityNames = response.data.map(item => {
                return {
                    value: item.nome,
                    label: item.nome,
                }
            });
            setCities(cityNames);
        })
        .catch(e => alert('Error ao carregar as cidades '+e));
    },[selectedUf]);


    const handleNavigateHouse = () => {
        navigation.navigate('House', { uf: selectedUf, city: selectedCity });
    }

    return (
        <View style={s.container}>
            <View style={s.header}>
                <Image source={require('../../assets/pray.png')}
                    style={s.image} />
                <Text style={s.text}>
                    Ajudando pessoas a escontrarem lugares onde poderão praticar o auto-conhecimento, a caridade para como o próximo.
                </Text>
            </View>

            <View style={s.content}>
                <View>

                    <RNPickerSelect
                        style={{
                            viewContainer: {
                                borderBottomWidth: 1,
                                borderBottomColor: '#322153'
                            }
                        }}
                        placeholder={{ label: 'Selecione o estado' }}
                        value={selectedUf}
                        onValueChange={(value) => setSelectedUf(value)}
                        items={ufs}
                    />
                </View>

                <View >
                    <RNPickerSelect
                        style={{
                            viewContainer: {
                                borderBottomWidth: 1,
                                borderBottomColor: '#322153'
                            }
                        }}
                        placeholder={{ label: 'Selecione a cidade' }}
                        value={selectedCity}
                        onValueChange={(value) => setSelectedCity(value)}
                        items={cities}
                    />
                </View>
            </View>

            <View style={s.footer}>
                <TouchableOpacity style={s.button} activeOpacity={0.7} onPress={handleNavigateHouse}>
                    <Text style={s.buttonText}>ENCONTRAR</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default App;

const s = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F3F3F3",
    },

    header: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'space-around'
    },

    content: {
        flex: 1,
        justifyContent: 'space-around',
        marginLeft: 40,
        marginRight: 40,
    },

    footer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
    },

    // --------------- HEADER ---------------
    image: {
        width: 200,
        height: 200,
    },

    text: {
        color: '#051F54',
        textAlign: 'center',
        fontSize: 16,
    },
    // --------------- HEADER ---------------


    // --------------- FOOTER ---------------
    button: {
        width: 400,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#5DC4DD',
        height: 60,
        borderRadius: 10,
        overflow: 'hidden',
        marginTop: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        
        elevation: 12,
    },

    buttonText: {
        textAlign: 'center',
        color: '#FFF',
        fontFamily: 'Roboto_500Medium',
        fontSize: 20,
    }

    // --------------- FOOTER ---------------

}); 