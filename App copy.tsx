import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";

import Amplify, { API, graphqlOperation, Auth } from "aws-amplify";
import { GraphQLResult } from "@aws-amplify/api";
import { ListTodosQuery } from "./src/API";
import { withAuthenticator } from "aws-amplify-react-native";
import { createTodo, deleteTodo } from "./src/graphql/mutations";
import { listTodos } from "./src/graphql/queries";

import { useForm, Controller } from "react-hook-form";

import config from "./aws-exports";
Amplify.configure(config);

interface ITodo {
  id?: string;
  name: string;
  description: string | null;
}

type FormValues = {
  name: string;
  description: string;
};

const App = () => {
  const [todos, setTodos] = useState<ITodo[] | []>([]);
  // react-hook-form
  const { control, handleSubmit, errors, reset } = useForm<FormValues>();

  useEffect(() => {
    fetchTodos();
  }, []);

  async function signOut() {
    try {
      await Auth.signOut();
    } catch (error) {
      console.log("error signing out: ", error);
    }
  }

  async function fetchTodos() {
    try {
      const todoData = (await API.graphql(
        graphqlOperation(listTodos)
      )) as GraphQLResult<ListTodosQuery>;
      const todos = todoData.data.listTodos.items;
      setTodos(todos);
    } catch (err) {
      console.log("error fetching todos");
    }
  }

  async function addTodo(data: ITodo) {
    try {
      const todo: ITodo = { ...data };
      setTodos([...todos, todo]);
      await API.graphql(graphqlOperation(createTodo, { input: todo }));
      reset({
        name: "",
        description: "",
      });
    } catch (err) {
      console.log("error creating todo:", err);
    }
  }

  const removeTodo = async (id: string) => {
    try {
      const input = { id };
      const result = await API.graphql(
        graphqlOperation(deleteTodo, {
          input,
        })
      );
      const deletedTodoId = result.data.deleteTodo.id;
      const updatedTodo = todos.filter((todo) => todo.id !== deletedTodoId);
      setTodos(updatedTodo);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <Button
        onPress={() => signOut()}
        title="Sign out"
        color="#841584"
        accessibilityLabel="Sign out button"
      />
      <Text>Title</Text>
      <Controller
        as={TextInput}
        control={control}
        name="name"
        onChange={(args: any) => args[0].nativeEvent.text}
        rules={{ required: true }}
        defaultValue=""
        style={styles.input}
      />
      {errors.name && <Text>This is required.</Text>}

      <Text>Description</Text>
      <Controller
        as={TextInput}
        control={control}
        name="description"
        onChange={(args: any) => args[0].nativeEvent.text}
        defaultValue=""
        style={styles.input}
      />

      <Button title="Submit" onPress={handleSubmit(addTodo)} />

      {todos.map((todo: ITodo, index: number) => (
        <View key={todo.id ? todo.id : index} style={styles.todo}>
          <Text style={styles.todoName}>{todo.name}</Text>
          <Text>{todo.description}</Text>
          <Button title="Delete" onPress={() => removeTodo(todo.id)} />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  todo: { marginBottom: 15 },
  input: { height: 50, backgroundColor: "#ddd", marginBottom: 10, padding: 8 },
  todoName: { fontSize: 18 },
});

export default withAuthenticator(App);
