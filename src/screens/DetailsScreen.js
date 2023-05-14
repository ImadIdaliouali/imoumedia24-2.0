import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Dimensions, Share, StatusBar } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import RenderHtml, { defaultSystemFonts } from 'react-native-render-html';
import 'moment/locale/ar-ma';

import { FONTS, COLORS } from '../constants';
import { AuthorCard, ItemSeparator, NetworkAlert } from '../components';
import { getAuthor, getImage } from '../services';

const { height, width } = Dimensions.get('screen');

const setHight = (h) => (height / 100) * h;
const setWidth = (w) => (width / 100) * w;

const systemFonts = [...defaultSystemFonts, FONTS.DroidKufi];

const DetailsScreen = ({ route, navigation }) => {
    const { post, categories } = route.params;

    const [author, setAuthor] = useState({});

    useEffect(() => {
        getAuthor(post?.author)
            .then(response => setAuthor(response.data));
    }, []);

    const onShare = async () => {
        await Share.share({
            message: `${post?.title?.rendered}\n${post?.link}`,
        });
    }

    return (
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
            <StatusBar
                barStyle="dark-content"
            />
            <View style={styles.imageContainer}>
                <Image
                    style={styles.image}
                    resizeMode="cover"
                    source={{ uri: getImage(post?.jetpack_featured_media_url) }}
                />
            </View>
            <LinearGradient
                colors={["rgba(0, 0, 0, 0.5)", "rgba(217, 217, 217, 0)"]}
                style={styles.linearGradient}
            />
            <View style={styles.headerContainer}>
                <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.goBack()}>
                    <Feather
                        name="chevron-left"
                        size={35}
                        color={COLORS.WHITE}
                    />
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.5} onPress={() => onShare()}>
                    <Feather
                        name="share"
                        size={28}
                        color={COLORS.WHITE}
                    />
                </TouchableOpacity>
            </View>
            <ItemSeparator height={setHight(37)} />
            <View style={styles.postTitleContainer}>
                <RenderHtml
                    contentWidth={width}
                    source={{ html: post?.title?.rendered }}
                    baseStyle={styles.postTitle}
                    systemFonts={systemFonts}
                />
            </View>
            <Text style={styles.categoryText}>
                {post?.categories?.map(id => categories?.find(category => category.id === id)?.name)?.join(", ")}
            </Text>
            <Text style={styles.categoryText}>{moment(post?.date).fromNow()}</Text>
            <View style={styles.contentContainer}>
                <Text style={styles.contentTitle}>Content</Text>
                <RenderHtml
                    contentWidth={width}
                    source={{ html: post?.excerpt?.rendered }}
                    tagsStyles={tagsStyle}
                    systemFonts={systemFonts}
                />
            </View>
            <View>
                <Text style={styles.authorTitle}>Author</Text>
                <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
                    <AuthorCard
                        name={author?.name}
                    />
                </View>
            </View>
            <NetworkAlert />
        </ScrollView>
    );
}

const tagsStyle = {
    p: {
        color: COLORS.TEXT_COLOR,
        fontFamily: FONTS.DroidKufi,
        fontSize: 13,
        textAlign: "justify",
    },
};

const styles = StyleSheet.create({
    linearGradient: {
        width: setWidth(100),
        height: setHight(8),
        position: "absolute",
        top: 0,
        elevation: 9,
    },
    imageContainer: {
        height: setHight(35),
        width: setWidth(145),
        alignItems: "center",
        position: "absolute",
        left: setWidth((100 - 145) / 2),
        top: 0,
        borderBottomRightRadius: 300,
        borderBottomLeftRadius: 300,
        elevation: 8,
    },
    image: {
        borderBottomRightRadius: 300,
        borderBottomLeftRadius: 300,
        width: setWidth(145),
        height: setHight(35),
    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        position: "absolute",
        right: 0,
        left: 0,
        top: 20,
        elevation: 20,
    },
    postTitleContainer: {
        paddingHorizontal: 20,
    },
    postTitle: {
        color: COLORS.BLACK,
        fontFamily: FONTS.DroidKufi,
        fontSize: 17,
    },
    categoryText: {
        color: COLORS.TEXT_COLOR,
        paddingHorizontal: 20,
        paddingTop: 5,
        fontFamily: FONTS.DroidKufi,
    },
    contentContainer: {
        backgroundColor: COLORS.EXTRA_LIGHT_GRAY,
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginVertical: 10,
    },
    contentTitle: {
        color: COLORS.BLACK,
        fontFamily: FONTS.BOLD,
        fontSize: 18,
    },
    authorTitle: {
        marginLeft: 20,
        color: COLORS.BLACK,
        fontFamily: FONTS.BOLD,
        fontSize: 18,
    },
});

export default DetailsScreen;
