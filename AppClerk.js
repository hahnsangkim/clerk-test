/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootProvider } from './components/Context';
import HomeScreen from './components/HomeScreen';
import Header from './components/Header';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-react";
import { Constants } from 'expo-constants';
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import SignInWithOAuth from "./components/SignInWithOAuth";
import * as SecureStore from "expo-secure-store";
import Config from 'react-native-config';

console.log('REACT_APP_CLERK_PUBLISHABLE_KEY from Config:', Config);
console.log('REACT_APP_CLERK_PUBLISHABLE_KEY from dotenv:', process.env);
// if (!Config.REACT_APP_CLERK_PUBLISHABLE_KEY) {
//   throw new Error("Missing Publishable Key");
// }
// const clerkPubKey = Config.REACT_APP_CLERK_PUBLISHABLE_KEY
const clerkPubKey = "pk_test_Y2FwaXRhbC1kb2UtNTEuY2xlcmsuYWNjb3VudHMuZGV2JA";

const tokenCache = {
  async getToken(key) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

const SignOut = () => {
  const { isLoaded,signOut } = useAuth();
  if (!isLoaded) {
    return null;
  }
  return (
    <View>
      <Button
        title="Sign Out"
        onPress={() => {
          signOut();
        }}
      />
    </View>
  );
};

function App() {

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <ClerkProvider 
      tokenCache={tokenCache}
      publishableKey={clerkPubKey}>
      <SafeAreaProvider>
        <RootProvider>
          <GestureHandlerRootView>
            <SafeAreaView style={backgroundStyle}>
              {/* <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                backgroundColor={backgroundStyle.backgroundColor}
              /> */}
              <SignedIn>
              <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={backgroundStyle}>
                  {/* <HomeScreen /> */}
                  <Text> You are singed in</Text>
                  <SignOut/>
              </ScrollView>
              </SignedIn>
              <SignedOut>
                <Text>You are signed out</Text>
                <SignInWithOAuth />
              </SignedOut>
            </SafeAreaView>
          </GestureHandlerRootView>
        </RootProvider>
      </SafeAreaProvider>
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
