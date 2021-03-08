import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { View, ScrollView, Text, FlatList } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";

// import AddPost from "../features/posts/AddPost";
import AddTodo from "../features/todos/AddTodo";
import { selectAllTodos, fetchTodos } from "../features/todos/todosSlice";

interface ITodo {
  todo: { id?: string; name: string; description: string };
}

const TodoExcerpt = ({ todo }: ITodo) => {
  return (
    <View key={todo.id}>
      <Text>{todo.id}</Text>
      <Text>{todo.name}</Text>
      <Text>{todo.description}</Text>
    </View>
  );
};

// use styles as usual
function List(): JSX.Element {
  const todos = useAppSelector(selectAllTodos);

  const dispatch = useAppDispatch();

  const todoStatus = useAppSelector((state) => state.todos.status);
  const error = useAppSelector((state) => state.todos.error);

  useEffect(() => {
    if (todoStatus === "idle") {
      dispatch(fetchTodos());
    }
  }, [todoStatus, dispatch]);

  let content;

  if (todoStatus === "loading") {
    content = <Text className="loader">Loading...</Text>;
  } else if (todoStatus === "succeeded") {
    // Sort todos in reverse chronological order by datetime string
    // const orderedPosts = todos
    //   .slice()
    //   .sort((a, b) => b.date.localeCompare(a.date));

    content = (
      <FlatList
        data={todos}
        renderItem={({ item }) => <TodoExcerpt key={item.id} todo={item} />}
      />
    );
  } else if (todoStatus === "error") {
    content = <div>{error}</div>;
  }

  return (
    <View>
      <Text>My List</Text>
      <ScrollView>
        <AddTodo />
        {content}
      </ScrollView>
    </View>
  );
}

export default List;
