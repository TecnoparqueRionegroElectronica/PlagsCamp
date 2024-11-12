// screens/DetailScreen.js
import React from 'react';
import { View, Text } from 'react-native';

const DetailScreen = ({ route }) => {
const { itemId } = route.params;

return (
    <View>
    <Text>Pantalla de Detalles</Text>
    <Text>ID del Elemento: {itemId}</Text>
    </View>
);
};

export default DetailScreen;