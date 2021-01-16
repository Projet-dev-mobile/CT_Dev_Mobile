import React ,{ Component, useState } from 'react';
import {Alert, View, TextInput, Button, StyleSheet, Text, FlatList, Keyboard, TouchableOpacity, Image } from 'react-native';
import { Layout } from '@ui-kitten/components';
import Colors from '../definitions/Colors';
import { getPeopleList } from '../api/themoviedb';
import DisplayError from '../components/DisplayError';
import { connect } from 'react-redux';

import Assets from '../definitions/Assets';


import PeopleListItem from '../components/PeopleListItem';
import favPeople from '../store/reducers/favPeople';

const Search = ({navigation , favPeople})=>{

    const [people, setPeople] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isMoreResults, setIsMoreResults] = useState(true);
    const [nextOffset, setNextOffset] = useState(0);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isError, setIsError] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const requestPeople = async (prevPeople, offset) => {
        setIsRefreshing(true);
        setIsError(false);
        try {
          const themoviedbSearchResult = await getPeopleList(searchTerm, offset);
          //console.log(themoviedbSearchResult.results[0]['name']);
          setPeople([...prevPeople, ...themoviedbSearchResult.results]);
          //console.log(people[0].name);
          //console.log(people);
          
        
        } catch (error) {
          setIsError(true);
          setIsMoreResults(true);
          setNextOffset(0);
        }
        setIsRefreshing(false);
      };


    const searchPeople = () => {
        Keyboard.dismiss();
        requestPeople([], 0);
    };

    const loadMorePeople = () => {
        if (isMoreResults) {
          requestPeople(people, nextOffset);
        };
    };

    const navigateToPeopleDetails = (peopleID) => {
        
        navigation.navigate("People", { peopleID });
    };


    return (
        <View >
            <TextInput
                placeholder='Search'
                onChangeText={(text) => setSearchTerm(text)}
                onSubmitEditing={searchPeople}
            />
            <Button
                title='Rechercher'
                color={Colors.mainBlue}
                onPress={searchPeople}

            />
            <Button
                title='X'
                color={Colors.mainBlue}
            />
            {
                isError ?
                (<DisplayError message='Impossible de récupérer les personnalités' />) :
                (<FlatList
                    data={people}
                    extraData={favPeople}
                    keyExtractor={(item, index) => index.toString()}
                    /*renderItem={({ item}) => (
                    <PeopleListItem
                        peopleData={item}
                        //onClick={navigateToPeopleDetails}
                    />
                    )}*/
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
                                 {item.known_for[1].title}{"\n"}
                                 {item.known_for[2].title}
                               </Text>
                             </View>
                           </View>
                         </View>
                       </TouchableOpacity>
                    } 
                    onEndReached={loadMorePeople}
                    onEndReachedThreshold={0.5}
                    refreshing={isRefreshing}
                    onRefresh={searchPeople}
                />)
            }
        </View>
        
    );
}

const mapStateToProps = (state) => {
    return {
      favPeople: state.favPeople
    }
  }

export default connect(mapStateToProps)(Search);

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
  