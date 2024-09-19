import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { RegisterScreenProps } from "~/src/app/navigators/AuthNavigators/AuthNavigator";
import { Button } from "react-native-paper";

const Register = ({ route, navigation }: RegisterScreenProps) => {

  return (
    <View>
      <Text>asdasd</Text>
      <Text>asdasd</Text>
      <Button
        mode="contained"
        onPress={() => navigation.navigate("Login")}
      >
        Go back
      </Button>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({});
