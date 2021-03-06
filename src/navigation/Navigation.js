import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';

import Search from '../components/Search';
import Followed from '../components/Followed';
import People from '../components/People';
import FavPeople from '../components/FavPeople';

import Assets from '../definitions/Assets';
import Colors from '../definitions/Colors';

const SearchNavigation = createStackNavigator();
const TabNavigation = createBottomTabNavigator();


function peopleStackScreens(){
  return (
      
      <SearchNavigation.Navigator
        initialRouteName="PeopleSearch"
      >

        <SearchNavigation.Screen
          name="PeopleSearch"
          component={Search}
        />

        <SearchNavigation.Screen
          name="People"
          component={People}
        />
       
      </SearchNavigation.Navigator>

    );
}


function followedStackScreens(){
  return (
      
      <SearchNavigation.Navigator
        initialRouteName="Followed"
      >

        <SearchNavigation.Screen
          name="Followed"
          component={FavPeople}
        />

        <SearchNavigation.Screen
          name="People"
          component={People}
        />
       
      </SearchNavigation.Navigator>

    );
}

function RootStack() {
    return (
        <TabNavigation.Navigator
            tabBarOptions={{
            activeTintColor: Colors.mainBlue,
            }}>
          <TabNavigation.Screen
            name="People"
            component={peopleStackScreens}
            options={() => ({
                tabBarIcon: ({ color }) => {
                  return <Image source={Assets.icons.search} style={{ tintColor: color }}/>;
                }
              })}
          />
          <TabNavigation.Screen
            name="Followed"
            component={followedStackScreens}
            options={() => ({
                tabBarIcon: ({color}) => {
                  return <Image source={Assets.icons.fav} style={{ tintColor: color }} />;
                }
              })}
          />
          
        </TabNavigation.Navigator>
      );
}
  
export default RootStack;