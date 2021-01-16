import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { connect } from 'react-redux';

import DisplayError from './DisplayError';

import { getPeopleDetails } from '../api/themoviedb';
import { getTVCredits } from '../api/themoviedb';

const FavPeople = ({ navigation, favPeople }) => {

    const [isError, setIsError] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [people, setPeople] = useState([]);

    useEffect(() => {
        refreshFavRestaurants();
      }, [favRestaurants]); // A chaque fois que les restaurants favoris changent


    return (

        <View style={styles.container}>
        {
            isError ?
            (<DisplayError message='Impossible de récupérer les restaurants favoris' />) :
            (<FlatList
                data={restaurants}
                extraData={favRestaurants}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                <RestaurantlistItem
                    restaurantData={item}
                    onClick={navigateToRestaurantDetails}
                    isFav={amIaFavRestaurant(item.id)} />
                )}
                refreshing={isRefreshing}
                onRefresh={refreshFavRestaurants}
            />)
        }
        </View>
    );
};
