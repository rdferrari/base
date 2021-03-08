import React, { useState } from "react";
import { unwrapResult } from "@reduxjs/toolkit";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useAppDispatch } from "../../../hooks";
import { nanoid } from "@reduxjs/toolkit";
import { stylesGeneral } from "../../styles/stylesGeneral";

import { addNewTodo } from "./todosSlice";

type FormValues = {
  name: string;
  description: string;
};

const AddTodo = () => {
  const { control, handleSubmit, errors, reset } = useForm();

  const dispatch = useAppDispatch();

  async function onSaveTodoClicked(data: FormValues) {
    const { name, description } = data;
    console.log(data);
    try {
      if (name && description) {
        const resultAction = await dispatch(addNewTodo({ name, description }));
        unwrapResult(resultAction);
        reset({
          name: "",
          description: "",
        });
      }
    } catch (err) {
      console.error("Failed to save the post: ", err);
    }
  }

  return (
    <View style={stylesGeneral.page_container}>
      <View style={stylesGeneral.auth_container}>
        <Text style={stylesGeneral.page_title}>Add Todo</Text>
        <View style={stylesGeneral.auth_form_container}>
          <Text style={stylesGeneral.input_text}>*Name</Text>
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <TextInput
                style={stylesGeneral.input_default}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
                placeholder="Name"
              />
            )}
            name="name"
            rules={{ required: true }}
            defaultValue=""
          />
          {errors.name && (
            <Text style={stylesGeneral.text_alert}>Name is required.</Text>
          )}

          <Text style={stylesGeneral.input_text}>*Description</Text>
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <TextInput
                style={stylesGeneral.input_default}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
                placeholder="Description"
              />
            )}
            name="description"
            rules={{ required: true }}
            defaultValue=""
          />
          {errors.description && (
            <Text style={stylesGeneral.text_alert}>
              Description is required.
            </Text>
          )}

          <TouchableOpacity
            style={stylesGeneral.bt_default}
            onPress={handleSubmit(onSaveTodoClicked)}
          >
            <Text style={stylesGeneral.bt_text}>Add todo</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default AddTodo;
