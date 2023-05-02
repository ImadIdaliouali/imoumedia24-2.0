import React from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, Dimensions } from 'react-native';

import { FONTS, COLORS } from '../constants';

const { width } = Dimensions.get("screen");

const PostCard = ({ title, category, image, date, onPress }) => {
    return (
        <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
            <ImageBackground
                style={styles.container}
                source={{ uri: image }}
                imageStyle={styles.image}
            >
                <View style={styles.overlay}>
                    <View style={styles.topRightConatiner}>
                        <View style={{ ...styles.textContainer, backgroundColor: "rgba(0,0,0,0.6)" }}>
                            <Text style={styles.text}>{date}</Text>
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.text}>{category}</Text>
                        </View>
                    </View>
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleText} numberOfLines={2}>{title}</Text>
                    </View>
                </View>
            </ImageBackground>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 200,
        width: width * 0.9,
        borderRadius: 12,
        overflow: "hidden",
        elevation: 5,
        marginVertical: 8,
    },
    image: {
        borderRadius: 12,
    },
    overlay: {
        flex: 1,
        justifyContent: "space-between",
    },
    topRightConatiner: {
        flexDirection: "row",
        alignSelf: "flex-end",
        margin: 8,
    },
    textContainer: {
        backgroundColor: COLORS.ACTIVE,
        opacity: 0.9,
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 8,
        marginLeft: 4,
    },
    text: {
        color: COLORS.WHITE,
        fontFamily: FONTS.DroidKufi,
        fontSize: 12,
    },
    titleContainer: {
        height: 70,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0,0,0,0.6)",
        borderBottomRightRadius: 12,
        borderBottomLeftRadius: 12,
        padding: 8,
    },
    titleText: {
        color: COLORS.WHITE,
        fontFamily: FONTS.DroidKufi,
        fontSize: 16,
    },
});

export default PostCard;
