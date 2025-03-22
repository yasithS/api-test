import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { authService } from '../services/auth-service';

const SignupStepOne = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleNext = async () => {
    if (!firstName.trim() || !lastName.trim() || !username.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    
    setLoading(true);
    try {
      const response = await authService.signupStepOne(firstName, lastName, username);
      
      // If successful, navigate to step two with the user data
      navigation.navigate('SignupStepTwo', {
        firstName,
        lastName,
        username
      });
    } catch (error) {
      Alert.alert('Error', error.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>SignUp</Text>
      
      {/* Illustration */}
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/signup.png')}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      
      {/* Input Fields */}
      <View style={styles.inputsContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter Your First Name"
          value={firstName}
          onChangeText={setFirstName}
          placeholderTextColor="#B8B8B8"
          editable={!loading}
        />
        
        <TextInput
          style={styles.input}
          placeholder="Enter Your Last Name"
          value={lastName}
          onChangeText={setLastName}
          placeholderTextColor="#B8B8B8"
          editable={!loading}
        />
        
        <TextInput
          style={styles.input}
          placeholder="Enter Your Username"
          value={username}
          onChangeText={setUsername}
          placeholderTextColor="#B8B8B8"
          editable={!loading}
        />
      </View>
      
      {/* Progress Indicator */}
      <View style={styles.progressContainer}>
        <View style={styles.progressIndicatorActive} />
        <View style={styles.progressIndicatorInactive} />
      </View>
      
      {/* Next Button */}
      <TouchableOpacity 
        style={[styles.nextButton, loading && styles.nextButtonDisabled]}
        onPress={handleNext}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.nextButtonText}>Next</Text>
        )}
      </TouchableOpacity>
      
      {/* Sign In Link */}
      <View style={styles.signInContainer}>
        <Text style={styles.accountText}>Have an Account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.signInText}>Sign in here</Text>
        </TouchableOpacity>
      </View>
      
      {/* Bottom Line */}
      <View style={styles.bottomLine} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#16837D',
    textAlign: 'center',
    marginTop: 10,
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  image: {
    width: '70%',
    height: 220,
  },
  inputsContainer: {
    marginTop: 20,
  },
  input: {
    height: 55,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    color: '#333',
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 25,
  },
  progressIndicatorActive: {
    width: 40,
    height: 8,
    backgroundColor: '#16837D',
    borderRadius: 4,
    marginHorizontal: 5,
  },
  progressIndicatorInactive: {
    width: 40,
    height: 8,
    backgroundColor: '#E5E5E5',
    borderRadius: 4,
    marginHorizontal: 5,
  },
  nextButton: {
    backgroundColor: '#16837D',
    height: 55,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  nextButtonDisabled: {
    backgroundColor: '#A0A0A0',
    opacity: 0.7,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 5,
  },
  accountText: {
    fontSize: 16,
    color: '#333',
  },
  signInText: {
    fontSize: 16,
    color: '#16837D',
  },
  bottomLine: {
    height: 5,
    width: 120,
    backgroundColor: '#000',
    borderRadius: 2.5,
    alignSelf: 'center',
    position: 'absolute',
    bottom: 15,
  },
});

export default SignupStepOne;