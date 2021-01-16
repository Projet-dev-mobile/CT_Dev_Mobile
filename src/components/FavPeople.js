import React, { useState, useEffect } from 'react';
import {Alert, View, TextInput, Button, StyleSheet, Text, FlatList, Keyboard, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
import Colors from '../definitions/Colors';
import Assets from '../definitions/Assets';

import DisplayError from './DisplayError';

import { getPeopleDetails } from '../api/themoviedb';
import { getTVCredits } from '../api/themoviedb';

const FavPeople = ({ navigation, favPeople }) => {

    const [isError, setIsError] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [people, setPeople] = useState([]);
    const [isMoreResults, setIsMoreResults] = useState(true);

    useEffect(() => {
        refreshFavPeople();
    }, [favPeople]); // A chaque fois que les people suivis changent

    

    const refreshFavPeople = async () => {
        setIsRefreshing(true);
        setIsError(false);
        let people = [];
        try {
          for (const id of favPeople) {
            const themoviedbSearchResult = await getPeopleDetails(id)
            people.push(themoviedbSearchResult);
          };
          setPeople(people);
        } catch (error) {
          setIsError(true);
          setPeople([]);
          setIsMoreResults(true);
        }
        setIsRefreshing(false);
    };

    const navigateToPeopleDetails = (peopleID) => {
        navigation.navigate("People", { peopleID });
    };

    

    return (

        <View style={styles.container}>
        {
            isError ?
            (<DisplayError message='Impossible de récupérer les personnalités suivies' />) :
            (<FlatList
                data={people}
                extraData={favPeople}
                keyExtractor={(item, index) => index.toString()}
                renderItem={
                    ({item}) => <TouchableOpacity style={styles.container}
                    onPress={() => { navigateToPeopleDetails(item.id) }}>
                    
                        <Image style={styles.icon} source={Assets.icons.profile} />
                     <View style={styles.informationContainer}>
                       <View style={styles.titleContainer}>
                         <Text style={styles.title}>
                           {item.name}
                         </Text>
                         
                       </View>
                       <Text style={[styles.data, styles.cuisine]}
                         numberOfLines={1}>
                            {item.known_for_department}
                       </Text>
                       <View style={styles.statsContainer}>
                         <View style={styles.statContainer}>
                           <Text style={[styles.data, styles.stat]}>
                                 
                           </Text>
                         </View>
                       </View>
                     </View>
                   </TouchableOpacity>
                } 
                onEndReachedThreshold={0.5}
                refreshing={isRefreshing}
            />)
        }
        </View>
    );
};


const mapStateToProps = (state) => {
    return {
      favPeople: state.favPeople
    }
  }

export default connect(mapStateToProps)(FavPeople);

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      paddingVertical: 8,
    },
    informationContainer: {
      flex: 1,
      marginLeft: 12,
      justifyContent: 'center',
    },
    titleContainer: {
      flexDirection: 'row',
    },
    statsContainer: {
      flexDirection: 'row',
      marginTop: 12,
    },
    statContainer: {
      flexDirection: 'row',
      marginRight: 8,
    },
    noThumbnailContainer: {
      width: 128,
      height: 128,
      alignItems: 'center',
      justifyContent: 'center',
    },
    thumbnail: {
      width: 128,
      height: 128,
      borderRadius: 12,
      backgroundColor: Colors.mainGreen,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    data: {
      fontSize: 16,
    },
    cuisine: {
      fontStyle: 'italic',
    },
    icon: {
      tintColor: Colors.mainBlue,
    },
    stat: {
      marginLeft: 4,
    },
  });
  