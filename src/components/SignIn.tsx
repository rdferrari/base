import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { View, Text, Button, TextInput } from "react-native";
import { Auth } from "aws-amplify";
import { useForm, Controller } from "react-hook-form";

type FormValues = {
  username: string;
  password: string;
};

const SignIn = () => {
  const { control, handleSubmit, errors, reset } = useForm();
  const [error, setError] = useState("");
  let history = useHistory();
  console.log(history);

  async function signIn(data: FormValues) {
    const { username, password } = data;
    try {
      const { user } = await Auth.signIn({
        username,
        password,
      });
      console.log({ user });
      reset({
        name: "",
        password: "",
      });
    } catch (err) {
      console.log({ err, data });
      setError(err.message);
    }
  }

  return (
    <View>
      <Text>Sign in form</Text>
      <Text>*Username</Text>
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
          />
        )}
        name="username"
        rules={{ required: true }}
        defaultValue=""
      />
      {errors.username && <Text>Username is required.</Text>}

      <Text>*Password</Text>
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
          />
        )}
        name="password"
        rules={{ required: true }}
        defaultValue=""
      />
      {errors.password && <Text>Password is required.</Text>}

      {error}

      <Button onPress={handleSubmit(signIn)} title="Sign in" />
    </View>
  );
};

export default SignIn;
