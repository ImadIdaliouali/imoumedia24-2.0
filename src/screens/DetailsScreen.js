import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Dimensions, Share, StatusBar } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import HTMLView from 'react-native-htmlview';
import 'moment/locale/ar-ma';

import { FONTS, COLORS } from '../constants';
import { AuthorCard, ItemSeparator } from '../components';
import { getAuthor, getImage } from '../services';

const { height, width } = Dimensions.get('screen');

const setHight = (h) => (height / 100) * h;
const setWidth = (w) => (width / 100) * w;

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
            <LinearGradient
                colors={["rgba(0, 0, 0, 0.5)", "rgba(217, 217, 217, 0)"]}
                start={{ x: 0, y: 0.3 }}
                style={styles.linearGradient}
            />
            <View style={styles.imageContainer}>
                <Image
                    style={styles.image}
                    resizeMode="cover"
                    source={{ uri: getImage(post?.jetpack_featured_media_url) }}
                />
            </View>
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
                <Text style={styles.postTitle}>{post?.title?.rendered}</Text>
            </View>
            <Text style={styles.categoryText}>
                {post?.categories?.map(id => categories?.find(category => category.id === id)?.name)?.join(", ")}
            </Text>
            <Text style={styles.categoryText}>{moment(post?.date).fromNow()}</Text>
            <View style={styles.contentContainer}>
                <Text style={styles.contentTitle}>Content</Text>
                <HTMLView
                    value={post?.excerpt?.rendered}
                    stylesheet={styles}
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
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    linearGradient: {
        width: setWidth(100),
        height: setHight(6),
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
    p: {
        color: COLORS.TEXT_COLOR,
        paddingVertical: 5,
        fontFamily: FONTS.DroidKufi,
        fontSize: 13,
        textAlign: "justify",
    },
    authorTitle: {
        marginLeft: 20,
        color: COLORS.BLACK,
        fontFamily: FONTS.BOLD,
        fontSize: 18,
    },
});

export default DetailsScreen;
