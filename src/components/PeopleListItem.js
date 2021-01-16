import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';

import Assets from '../definitions/Assets';
import Colors from '../definitions/Colors';

const PeopleListItem = (item, isFav = false) => {

    console.log(item.name);
    return (
        <TouchableOpacity style={styles.container}
        >
            <Image source={Assets.icons.profile} />
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
                    
      );
};

export default PeopleListItem;

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
      tintColor: Colors.mainGreen,
    },
    stat: {
      marginLeft: 4,
    },
  });
  