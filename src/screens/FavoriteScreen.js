import React, {useState, useEffect} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

import {COLORS} from '../constants';
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

  return (
    <View style={styles.container}>
      {favorites ? (
        <FlatList
          data={favorites}
          keyExtractor={item => item.id}
          contentContainerStyle={{alignItems: 'center'}}
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
});

export default FavoriteScreen;
