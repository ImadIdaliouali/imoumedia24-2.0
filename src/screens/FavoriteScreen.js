import React, {useState, useEffect} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {AppBar, IconButton} from '@react-native-material/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Snackbar from 'react-native-snackbar';
import moment from 'moment';

import {COLORS, FONTS} from '../constants';
import {getImage} from '../services';
import {LoadingComponent, PostCard} from '../components';

const FavoriteScreen = ({route, navigation}) => {
  const {categories} = route.params;

  const [favorites, setFavorites] = useState(null);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem('favorites');
      const posts = JSON.parse(storedFavorites) || [];
      setFavorites(posts);
    } catch (error) {
      console.log(error);
    }
  };

  const removeAllFavorites = async () => {
    try {
      await AsyncStorage.removeItem('favorites');
      Snackbar.show({
        text: 'remove All Favorites',
        duration: Snackbar.LENGTH_LONG,
        action: {
          text: 'UNDO',
          textColor: 'green',
          onPress: () => Snackbar.dismiss(),
        },
      });
      setFavorites([]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <AppBar
        title={() => <Text style={styles.headerName}>Favorites</Text>}
        centerTitle
        color={COLORS.BASIC_BACKGROUND}
        tintColor={COLORS.GRAY}
        leading={props => (
          <IconButton
            icon={props => <Feather name="chevron-left" {...props} size={30} />}
            onPress={() => navigation.goBack()}
            {...props}
          />
        )}
        trailing={props => (
          <IconButton
            icon={props => (
              <MaterialCommunityIcons
                name="delete-sweep-outline"
                onPress={() => removeAllFavorites()}
                {...props}
                size={26}
              />
            )}
            {...props}
          />
        )}
      />
      {favorites ? (
        <FlatList
          data={favorites}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={<Text>No Favorites</Text>}
          renderItem={({item}) => {
            const category = categories.find(
              category => category.id === item.categories[0],
            )?.name;
            return (
              <PostCard
                title={item.title.rendered}
                category={category}
                image={getImage(item.jetpack_featured_media_url)}
                date={moment(item.date).fromNow()}
                onPress={() =>
                  navigation.navigate('details', {
                    post: item,
                    category,
                    categories,
                  })
                }
              />
            );
          }}
        />
      ) : (
        <LoadingComponent />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BASIC_BACKGROUND,
  },
  headerName: {
    fontSize: 24,
    color: COLORS.ACTIVE,
    fontFamily: FONTS.BOLD,
  },
  listContainer: {
    alignItems: 'center',
    paddingHorizontal: 16,
  },
});

export default FavoriteScreen;
