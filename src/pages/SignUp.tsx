import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { Auth } from "aws-amplify";
import { useForm, Controller } from "react-hook-form";
import { Redirect, Link } from "react-router-native";
import { stylesGeneral } from "../styles/stylesGeneral";

type FormValues = {
  username: string;
  email: string;
  password: string;
};

const SignUp = () => {
  const { control, handleSubmit, errors, reset } = useForm();
  // const [error, setError] = useState("");
  const [userNotConfirmed, setUserNotConfirmed] = useState(false);

  async function signIn(data: FormValues) {
    const { username, email, password } = data;
    try {
      await Auth.signUp({
        username,
        password,
        attributes: {
          email,
        },
      });
      reset({
        username: "",
        email: "",
        password: "",
      });
      setUserNotConfirmed(true);
    } catch (err) {
      console.log({ err, data });
    }
  }

  if (userNotConfirmed) return <Redirect to="/user-confirmation" />;

  return (
    <View style={stylesGeneral.page_container}>
      <View style={stylesGeneral.auth_container}>
        <Text style={stylesGeneral.page_title}>Sign up</Text>
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
                placeholder="Username"
              />
            )}
            name="username"
            rules={{ required: true }}
            defaultValue=""
          />
          {errors.username && (
            <Text style={stylesGeneral.text_alert}>Username is required.</Text>
          )}

          <Text style={stylesGeneral.input_text}>*Email</Text>
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <TextInput
                style={stylesGeneral.input_default}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
                placeholder="Email"
              />
            )}
            name="email"
            rules={{ required: true }}
            defaultValue=""
          />
          {errors.email && (
            <Text style={stylesGeneral.text_alert}>Email is required.</Text>
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
                placeholder="Password"
                secureTextEntry={true}
              />
            )}
            name="password"
            rules={{ required: true }}
            defaultValue=""
          />
          {errors.password && (
            <Text style={stylesGeneral.text_alert}>Password is required.</Text>
          )}

          <TouchableOpacity
            style={stylesGeneral.bt_default}
            onPress={handleSubmit(signIn)}
          >
            <Text style={stylesGeneral.bt_text}>Sign up</Text>
          </TouchableOpacity>

          <Link component={TouchableOpacity} to="/sign-in">
            <Text style={stylesGeneral.page_text}>Sign in</Text>
          </Link>
        </View>
      </View>
    </View>
  );
};

export default SignUp;
