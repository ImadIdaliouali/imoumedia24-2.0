import React from 'react';
import { StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native';

import { FONTS, COLORS } from '../constants';

const { width } = Dimensions.get("screen");

const setWidth = (w) => (width / 100) * w;

const CategoryCard = ({ categoryId, categoryName, active, onPress }) => {
    return (
        <TouchableOpacity
            style={{
                ...styles.container,
                backgroundColor: active ? COLORS.ACTIVE : COLORS.WHITE
            }}
            activeOpacity={0.5}
            onPress={() => onPress(categoryId)}
        >
            <Text
                style={{
                    ...styles.categoryText,
                    color: active ? COLORS.WHITE : COLORS.BLACK
                }}
            >
                {categoryName}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        borderRadius: 5,
        paddingVertical: 8,
        elevation: 3,
        marginVertical: 2,
        width: setWidth(25),
    },
    categoryText: {
        fontSize: 11,
        fontFamily: FONTS.DroidKufi,
    },
});

export default CategoryCard;
