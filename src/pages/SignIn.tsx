import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { Auth } from "aws-amplify";
import { useForm, Controller } from "react-hook-form";
import { stylesGeneral } from "../styles/stylesGeneral";

type FormValues = {
  username: string;
  password: string;
};

const SignIn = () => {
  const { control, handleSubmit, errors, reset } = useForm();
  const [error, setError] = useState("");

  async function signIn(data: FormValues) {
    const { username, password } = data;
    try {
      const { user } = await Auth.signIn({
        username,
        password,
      });
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
    <View style={stylesGeneral.page_container}>
      <View style={stylesGeneral.auth_container}>
        <Text style={stylesGeneral.page_title}>Sign in form</Text>
        <View style={stylesGeneral.auth_form_container}>
          <Text style={stylesGeneral.input_text}>*Username</Text>
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <TextInput
                style={stylesGeneral.input_default}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
              />
            )}
            name="username"
            rules={{ required: true }}
            defaultValue=""
          />
          {errors.username && (
            <Text style={stylesGeneral.text_alert}>Username is required.</Text>
          )}

          <Text style={stylesGeneral.input_text}>*Password</Text>
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <TextInput
                style={stylesGeneral.input_default}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
              />
            )}
            name="password"
            rules={{ required: true }}
            defaultValue=""
          />
          {errors.password && (
            <Text style={stylesGeneral.text_alert}>Password is required.</Text>
          )}

          <Text style={stylesGeneral.text_alert}>{error}</Text>

          <TouchableOpacity
            style={stylesGeneral.button_default}
            onPress={handleSubmit(signIn)}
          >
            <Text style={stylesGeneral.button_text}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SignIn;
