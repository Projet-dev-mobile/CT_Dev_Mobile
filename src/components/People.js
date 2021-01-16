import React ,{ Component, useState, useEffect } from 'react';
import {Alert, View, TextInput,ActivityIndicator,ScrollView, Button, StyleSheet, Text, Image,FlatList, Keyboard } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { connect } from 'react-redux';

import { getPeopleDetails } from '../api/themoviedb';
import { getTVCredits } from '../api/themoviedb';

import Colors from '../definitions/Colors';
import Assets from '../definitions/Assets';

const People = ({route , favPeople, dispatch})=>{

    const [isLoading, setIsLoading] = useState(true);
    const [people, setPeople] = useState(null);
    const [tvCredits, setTVCredits] = useState(null);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        requestPeople();
      }, []); // Uniquement à l'initialisation

    const requestPeople = async () => {
        try {
          const themoviedbPeopleResult = await getPeopleDetails(route.params.peopleID);
          setPeople(themoviedbPeopleResult);
          const themoviedbTVResult = await getTVCredits(route.params.peopleID);
          setTVCredits(themoviedbTVResult);
         
          setIsLoading(false);
        } catch (error) {
          setIsError(true);
        }
    }

    
    const savePeople = async () => {
        const action = { type: 'SAVE_PEOPLE', value: route.params.peopleID };
        dispatch(action);
    }

    const unsavePeople = async () => {
        const action = { type: 'UNSAVE_PEOPLE', value: route.params.peopleID };
        dispatch(action);
    }

    const displayPeopleImage = () => {
        if (people.profile_path) {
          return (
            <Image
              source={{ uri: people.profile_path }} />
          );
        };
        return (
          <View>
            <Image source={Assets.icons.missingIMG} />
          </View>
        );
    };

    
    const displaySavePeople = () => {
        if (favPeople.findIndex(i => i === route.params.peopleID) !== -1) {
          // Le people est suivi
          return (
            <Button
              title='Retirer des favoris'
              color={Colors.mainBlue}
              onPress={unsavePeople}
            />
          );
        }
        // Le people n'est pas suivi
        return (
          <Button
            title='Ajouter aux favoris'
            color={Colors.mainBlue}
            onPress={savePeople}
          />
        );
      }



    return (
        <View style={styles.container}>
      {isError ?
        (<DisplayError message='Impossible de récupérer les données de la personnalité' />) :
        (isLoading ?
          (<View style={styles.containerLoading}>
            <ActivityIndicator size="large" />
          </View>) :

          (<ScrollView style={styles.containerScroll}>
            
            <View >
              <View >
              {displayPeopleImage()}
              </View>
              <View >
                <Text h1>
                  {people.name}
                </Text>
                <Text>
                  {people.known_for_department}
                </Text>
                <Text>
                  {people.birthday}
                </Text>
                <Text>
                  {people.deathday}
                </Text>
              </View>
                {displaySavePeople()}

            </View>
            
            <View>
                <Text h4>
                    Biography
                </Text>
                <Text>
                    {people.biography}{'\n'}
                </Text>

            </View>
            <View>
                <Text h4>
                    Credits
                </Text>
                <Text>
                    A FAIRE
                </Text>

                
            </View>
            
          </ScrollView>)
        )}
    </View>

    );
}

const mapStateToProps = (state) => {
    return {
      favPeople: state.favPeople
    }
  }

export default connect(mapStateToProps)(People); 

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    tinyLogo: {
        width: 50,
        height: 50,
      },
    containerLoading: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    containerScroll: {
      flex: 1,
      paddingHorizontal: 12,
      paddingVertical: 25,
    },
    containerCardTop: {
      elevation: 1,
      borderRadius: 3,
      padding: 12,
      flexDirection: 'row',
      backgroundColor: 'white',
    },
    containerCardBottom: {
      elevation: 1,
      marginTop: 16,
      borderRadius: 3,
      padding: 12,
      backgroundColor: 'white',
    },
    containerNoRestaurantImage: {
      height: 128,
      alignItems: 'center',
      justifyContent: 'center',
      borderTopLeftRadius: 3,
      borderTopRightRadius: 3,
      backgroundColor: 'white',
    },
    restaurantImage: {
      height: 180,
      backgroundColor: Colors.mainGreen,
      borderTopLeftRadius: 3,
      borderTopRightRadius: 3,
    },
    containerEstab: {
      flex: 4,
    },
    containerNoteAndVotes: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    containerNote: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 3,
      flexDirection: 'row',
      alignItems: 'flex-end',
    },
    textNote: {
      color: 'white',
      fontWeight: "bold",
      fontSize: 16,
    },
    textMaxNote: {
      fontSize: 12,
      marginLeft: 3,
      color: 'white',
    },
    textVotes: {
      fontStyle: "italic",
      fontSize: 12,
    },
    textName: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    textTitle: {
      fontWeight: 'bold',
      color: Colors.mainGreen,
      fontSize: 16,
      marginTop: 16,
    },
    textContent: {
      fontSize: 16,
    },
  });
  