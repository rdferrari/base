import React from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useAppDispatch } from "../../../hooks";
import { nanoid } from "@reduxjs/toolkit";
import { stylesGeneral } from "../../styles/stylesGeneral";

import { postAdded } from "./postsSlice";

type FormValues = {
  title: string;
  content: string;
};

const AddPost = () => {
  const { control, handleSubmit, errors, reset } = useForm();

  const dispatch = useAppDispatch();

  async function onSavePostClicked(data: FormValues) {
    const { title, content } = data;
    try {
      if (title && content) {
        dispatch(
          postAdded({
            id: nanoid(),
            title,
            content,
          })
        );

        reset({
          title: "",
          content: "",
        });
      }
    } catch (err) {
      console.log("Ops");
    }
  }

  return (
    <View style={stylesGeneral.page_container}>
      <View style={stylesGeneral.auth_container}>
        <Text style={stylesGeneral.page_title}>Add post</Text>
        <View style={stylesGeneral.auth_form_container}>
          <Text style={stylesGeneral.input_text}>*Title</Text>
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <TextInput
                style={stylesGeneral.input_default}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
                placeholder="Title"
              />
            )}
            name="title"
            rules={{ required: true }}
            defaultValue=""
          />
          {errors.title && (
            <Text style={stylesGeneral.text_alert}>Title is required.</Text>
          )}

          <Text style={stylesGeneral.input_text}>*Content</Text>
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <TextInput
                style={stylesGeneral.input_default}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
                placeholder="Content"
              />
            )}
            name="content"
            rules={{ required: true }}
            defaultValue=""
          />
          {errors.content && (
            <Text style={stylesGeneral.text_alert}>Content is required.</Text>
          )}

          <TouchableOpacity
            style={stylesGeneral.bt_default}
            onPress={handleSubmit(onSavePostClicked)}
          >
            <Text style={stylesGeneral.bt_text}>Add post</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default AddPost;
