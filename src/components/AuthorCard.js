import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import { COLORS, FONTS, IMAGES } from '../constants';

const AuthorCard = ({ name }) => {
    return (
        <View style={styles.container}>
            <Image
                source={IMAGES.USER_IMAGE}
                style={styles.image}
                resizeMode='cover'
            />
            <Text style={styles.name}>{name}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 20,
    },
    name: {
        width: 80,
        textAlign: "center",
        color: COLORS.BLACK,
        fontFamily: FONTS.BOLD,
        fontSize: 12,
    },
});

export default AuthorCard;
