import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5, FontAwesome, MaterialIcons, Fontisto } from '@expo/vector-icons';

import WelcomeScreen from './src/screens/WelcomeScreen';
import SignInScreen from './src/screens/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import AccountScreen from './src/screens/AccountScreen';

import WorldMapScreen from './src/screens/WorldMapScreen';
import CountriesScreen from './src/screens/CountriesScreen';
import TravelScreen from './src/screens/TravelScreen';
import ChatScreen from './src/screens/ChatScreen';

import { Provider as SignProvider } from './src/context/SignContext';
import { Provider as CountriesProvider } from './src/context/CountriesContext';
import { Provider as ChatProvider } from './src/context/ChatContext';
import { navigationRef } from './src/navigationRef';

const SignNavigator = createStackNavigator();
const WorldNavigator = createBottomTabNavigator();
const MainNavigator = createStackNavigator();

const SignScreen = () => (
  <SignNavigator.Navigator screenOptions={{headerShown: false}}>
    <SignNavigator.Screen name="SignIn" component={SignInScreen} />
    <SignNavigator.Screen name="SignUp" component={SignUpScreen} />
  </SignNavigator.Navigator>
);

const WorldScreen = () => (
  <WorldNavigator.Navigator screenOptions={{headerShown: false}}
      tabBarOptions={{
				labelStyle: {
					fontSize: 15
				}
			}}>
    <WorldNavigator.Screen name="World Map" component={WorldMapScreen}
        options={{
          tabBarIcon: () => <Fontisto name="world" size={24} color="black" />
        }
      }/>
    <WorldNavigator.Screen name="Travel" component={TravelScreen}
        options={{
          tabBarIcon: () => <FontAwesome name="plane" size={24} color="black" />
        }
      }/>
    <WorldNavigator.Screen name="Chat" component={CountriesScreen}
        options={{
          tabBarIcon: () => <MaterialIcons name="chat" size={24} color="black" />
        }
      }/>
    <WorldNavigator.Screen name="Account" component={AccountScreen}
        options={{
          tabBarIcon: () => <MaterialIcons name="account-box" size={24} color="black" />
        }
      }/>
  </WorldNavigator.Navigator>
);
export default () => {
  return <SignProvider>
          <CountriesProvider>
            <ChatProvider>
              <NavigationContainer ref={navigationRef}>
                <MainNavigator.Navigator>
                  <MainNavigator.Screen options={{headerShown: false}} name="Welcome" component={WelcomeScreen} />
                  <MainNavigator.Screen options={{headerShown: false}} name="Authentification" component={SignScreen} />
                  <MainNavigator.Screen options={{headerShown: false}} name="World" component={WorldScreen} />
                  <MainNavigator.Screen options={{headerShown: true}} name="World Chat" component={ChatScreen}
                    options={({ route }) => ({ title: route.params.name })}/>
                </MainNavigator.Navigator>
              </NavigationContainer>
            </ChatProvider>
          </CountriesProvider>
        </SignProvider>
}
