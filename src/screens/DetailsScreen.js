import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
  Share,
  StatusBar,
} from 'react-native';
import {AppBar, HStack, IconButton} from '@react-native-material/core';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import RenderHtml, {defaultSystemFonts} from 'react-native-render-html';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Snackbar from 'react-native-snackbar';
import moment from 'moment';
import 'moment/locale/ar-ma';

import {FONTS, COLORS} from '../constants';
import {AuthorCard, ItemSeparator, NetworkAlert} from '../components';
import {getAuthor, getImage} from '../services';

const {height, width} = Dimensions.get('screen');

const setHight = h => (height / 100) * h;
const setWidth = w => (width / 100) * w;

const systemFonts = [...defaultSystemFonts, FONTS.DroidKufi];

const DetailsScreen = ({route, navigation}) => {
  const {post, category, categories} = route.params;

  const [author, setAuthor] = useState(null);
  const [liked, setLiked] = useState(false);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    getAuthor(post?.author).then(response => setAuthor(response.data));
    fetchFavorites();
  }, []);

  const onShare = async () => {
    await Share.share({
      message: `${post?.title?.rendered}\n${post?.link}`,
    });
  };

  const fetchFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem('favorites');
      const posts = JSON.parse(storedFavorites) || [];
      const exist = posts.some(favorite => favorite.id === post.id);
      setLiked(exist);
      setFavorites(posts);
    } catch (error) {
      console.log(error);
    }
  };

  const addToFavorites = async () => {
    try {
      let updatedFavorites = [];
      if (liked) {
        updatedFavorites = favorites.filter(
          favorite => favorite.id !== post.id,
        );
      } else {
        updatedFavorites = [post, ...favorites];
      }
      setLiked(prevState => !prevState);
      await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      Snackbar.show({
        text: !liked
          ? 'Post added to favorites'
          : 'Post removed from favorites',
        duration: Snackbar.LENGTH_LONG,
        action: {
          text: 'UNDO',
          textColor: 'green',
          onPress: () => Snackbar.dismiss(),
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
      <StatusBar barStyle="dark-content" />
      <AppBar
        title={() => <Text style={styles.headerName}>{category}</Text>}
        centerTitle
        transparent
        tintColor={COLORS.WHITE}
        leading={props => (
          <IconButton
            icon={props => <Feather name="chevron-left" {...props} size={30} />}
            onPress={() => navigation.goBack()}
            {...props}
          />
        )}
        trailing={props => (
          <HStack>
            <IconButton
              icon={props => (
                <AntDesign
                  name={liked ? 'heart' : 'hearto'}
                  onPress={() => addToFavorites()}
                  {...props}
                  size={24}
                  color={liked ? COLORS.HEART : COLORS.WHITE}
                />
              )}
              {...props}
            />
            <IconButton
              icon={props => (
                <Feather
                  name="share"
                  size={28}
                  onPress={() => onShare()}
                  {...props}
                />
              )}
              {...props}
            />
          </HStack>
        )}
      />
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          resizeMode="cover"
          source={{uri: getImage(post?.jetpack_featured_media_url)}}
        />
      </View>
      <LinearGradient
        colors={['rgba(0, 0, 0, 0.5)', 'rgba(217, 217, 217, 0)']}
        style={styles.linearGradient}
      />
      <ItemSeparator height={setHight(30)} />
      <NetworkAlert />
      <View style={styles.postTitleContainer}>
        <RenderHtml
          contentWidth={width}
          source={{html: post?.title?.rendered}}
          baseStyle={styles.postTitle}
          systemFonts={systemFonts}
        />
      </View>
      <Text style={styles.categoryText}>
        {post?.categories
          ?.map(id => categories?.find(category => category.id === id)?.name)
          ?.join(', ')}
      </Text>
      <Text style={styles.categoryText}>{moment(post?.date).fromNow()}</Text>
      <View style={styles.contentContainer}>
        <Text style={styles.contentTitle}>Content</Text>
        <RenderHtml
          contentWidth={width}
          source={{html: post?.excerpt?.rendered}}
          tagsStyles={tagsStyle}
          systemFonts={systemFonts}
        />
      </View>
      <View>
        <Text style={styles.authorTitle}>Author</Text>
        <View style={{paddingHorizontal: 20, paddingVertical: 10}}>
          <AuthorCard name={author?.name} />
        </View>
      </View>
    </ScrollView>
  );
};

const tagsStyle = {
  p: {
    color: COLORS.TEXT_COLOR,
    fontFamily: FONTS.DroidKufi,
    fontSize: 13,
    textAlign: 'justify',
  },
};

const styles = StyleSheet.create({
  linearGradient: {
    width: setWidth(100),
    height: setHight(8),
    position: 'absolute',
    top: 0,
    elevation: 9,
  },
  headerName: {
    fontFamily: FONTS.DroidKufi,
    fontSize: 20,
    color: COLORS.WHITE,
  },
  imageContainer: {
    height: setHight(35),
    width: setWidth(145),
    alignItems: 'center',
    position: 'absolute',
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
