import React, { useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Context as SignContext } from '../context/SignContext';
import SignForm from '../components/SignForm';

const SignUpScreen = () => {
  const {state, signup, clearErrorMessage} = useContext(SignContext);

  return <View style={styles.sign}>
    <SignForm
      signin={false}
      btnName="Sign Up"
      errorMsg={state.errorMessage}
      onSubmit={(email, password, name) => signup(email, password, name)}
      signMethodText="Sign In, if you already have an account"
      routeName="SignIn"/>
  </View>

}

const styles = StyleSheet.create({
  sign: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 100
  }
})

export default SignUpScreen;
