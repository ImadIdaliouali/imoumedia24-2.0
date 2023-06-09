import React, {useEffect, useState} from 'react';
import {
  FlatList,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {AppBar, IconButton} from '@react-native-material/core';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import 'moment/locale/ar-ma';

import {FONTS, COLORS} from '../constants';
import {
  CategoryCard,
  PostCard,
  ItemSeparator,
  LoadingComponent,
  NetworkAlert,
} from '../components';
import {getCategories, getPosts, getImage} from '../services';

const HomeScreen = ({navigation}) => {
  const [activeCategory, setActiveCategory] = useState(-1);
  const [categories, setCategories] = useState([{id: -1, name: 'الرئيسية'}]);
  const [recentPosts, setRecentPosts] = useState([]);
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoadingRecentPosts, setIsLoadingRecentPosts] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    getCategories().then(response =>
      setCategories([categories[0], ...response.data]),
    );
    setIsLoadingRecentPosts(true);
    getPosts()
      .then(response => setRecentPosts(response.data))
      .catch(error => console.error(error))
      .finally(() => setIsLoadingRecentPosts(false));
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [currentPage]);

  useEffect(() => {
    setPosts([]);
    setCurrentPage(1);
  }, [activeCategory]);

  const fetchPosts = () => {
    setIsLoading(true);
    getPosts(currentPage, activeCategory >= 0 ? activeCategory : null)
      .then(response => setPosts([...posts, ...response.data]))
      .catch(error => console.error(error))
      .finally(() => setIsLoading(false));
  };

  const onRefresh = () => {
    setRefresh(true);
    setActiveCategory(prevState => prevState);
    setRefresh(false);
  };

  const loadMorePosts = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={COLORS.BASIC_BACKGROUND}
      />
      <AppBar
        title={() => <Text style={styles.appName}>imoumedia24</Text>}
        centerTitle
        color={COLORS.BASIC_BACKGROUND}
        tintColor={COLORS.GRAY}
        leading={props => (
          <IconButton
            icon={props => <MaterialCommunityIcons name="menu" {...props} />}
            onPress={() => navigation.openDrawer()}
            {...props}
          />
        )}
        trailing={props => (
          <IconButton
            icon={props => <MaterialIcons name="star-border" {...props} />}
            onPress={() => navigation.navigate('favorite', {categories})}
            {...props}
          />
        )}
      />
      <NetworkAlert />
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refresh}
            onRefresh={() => onRefresh()}
            colors={[COLORS.ACTIVE]}
          />
        }>
        <View style={styles.categoryListContainer}>
          <FlatList
            data={categories}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id}
            ItemSeparatorComponent={() => <ItemSeparator width={20} />}
            ListHeaderComponent={() => <ItemSeparator width={20} />}
            ListFooterComponent={() => <ItemSeparator width={20} />}
            renderItem={({item}) => (
              <CategoryCard
                categoryId={item.id}
                categoryName={item.name}
                active={item.id === activeCategory}
                onPress={setActiveCategory}
              />
            )}
          />
        </View>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Recent News</Text>
          <TouchableOpacity activeOpacity={0.8}>
            <Text style={styles.headerSubTitle}>Show All</Text>
          </TouchableOpacity>
        </View>
        <View>
          {isLoadingRecentPosts ? (
            <LoadingComponent />
          ) : (
            <FlatList
              data={recentPosts}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item.id}
              ItemSeparatorComponent={() => <ItemSeparator width={15} />}
              ListHeaderComponent={() => <ItemSeparator width={15} />}
              ListFooterComponent={() => <ItemSeparator width={15} />}
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
          )}
        </View>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>All News</Text>
          <TouchableOpacity activeOpacity={0.8}>
            <Text style={styles.headerSubTitle}>Show All</Text>
          </TouchableOpacity>
        </View>
        <View>
          <FlatList
            data={posts}
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
                      category,
                      categories,
                    })
                  }
                />
              );
            }}
            ListFooterComponent={() =>
              isLoading ? <LoadingComponent /> : null
            }
            onEndReached={() => loadMorePosts()}
            onEndReachedThreshold={0.5}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BASIC_BACKGROUND,
  },
  appBarContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  appName: {
    fontSize: 24,
    color: COLORS.ACTIVE,
    fontFamily: FONTS.BOLD,
    textTransform: 'uppercase',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  headerTitle: {
    fontSize: 28,
    color: COLORS.BLACK,
    fontFamily: FONTS.REGULAR,
    fontWeight: '500',
  },
  headerSubTitle: {
    fontSize: 13,
    color: COLORS.ACTIVE,
    fontFamily: FONTS.BOLD,
    textTransform: 'uppercase',
  },
  categoryListContainer: {
    paddingTop: 10,
  },
});

export default HomeScreen;
