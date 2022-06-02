import React, { useContext, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Context as SignContext} from '../context/SignContext';
import SignForm from '../components/SignForm';

const SignInScreen = () => {
  const {state, signin, clearErrorMessage} = useContext(SignContext);

  return <View style={styles.sign}>
    <SignForm
      signin={true}
      btnName="Sign In"
      errorMsg={state.errorMessage}
      onSubmit={(email, password) => signin(email,password)}
      signMethodText="Sign Up, if you don't have an account"
      routeName="SignUp"
      />
  </View>
}

const styles = StyleSheet.create({
  sign: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 100
  }
})

export default SignInScreen;
