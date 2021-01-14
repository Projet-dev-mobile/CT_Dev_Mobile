import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';

import FirstPage from '../components/FirstPage';
import SecondPage from '../components/SecondPage';
import Assets from '../definitions/Assets';
import Colors from '../definitions/Colors';

const SearchNavigation = createStackNavigator();
const TabNavigation = createBottomTabNavigator();

function firstPageStackScreens(){
    return (
        
        <SearchNavigation.Navigator
          initialRouteName="FirstPageView"
        >
  
          <SearchNavigation.Screen
            name="FirstPageView"
            component={FirstPage}
            options={{ title: 'Première page' }}
          />
         
        </SearchNavigation.Navigator>
  
      );
}

function secondPageStackScreens(){
    return (
        
        <SearchNavigation.Navigator
          initialRouteName="SecondPageView"
        >
  
          <SearchNavigation.Screen
            name="SecondPageView"
            component={SecondPage}
            options={{ title: 'Deuxième page' }}
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
            name="Recherche"
            component={firstPageStackScreens}
            options={() => ({
                tabBarIcon: ({ color }) => {
                  return <Image source={Assets.icons.search} style={{ tintColor: color }}/>;
                }
              })}
          />
          <TabNavigation.Screen
            name="Favoris"
            component={secondPageStackScreens}
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