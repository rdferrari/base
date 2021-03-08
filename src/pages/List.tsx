import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { View, Text } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";

import AddPost from "../features/posts/AddPost";
import { selectAllTodos, fetchTodos } from "../features/todos/todosSlice";

export const styles = EStyleSheet.create({
  my_text: {
    fontSize: 100,
  },
});

interface Post {
  id: string;
  title: string;
  content: string;
}

const TodoExcerpt = ({ todo }) => {
  return (
    <View key={todo.id}>
      <Text>{todo.name}</Text>
      <Text>{todo.description}</Text>
    </View>
  );
};

// use styles as usual
function List(): JSX.Element {
  const posts = useAppSelector((state) => state.posts);
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
    content = <div className="loader">Loading...</div>;
  } else if (todoStatus === "succeeded") {
    // Sort todos in reverse chronological order by datetime string
    // const orderedPosts = todos
    //   .slice()
    //   .sort((a, b) => b.date.localeCompare(a.date));

    content = todos.map((todo) => <TodoExcerpt key={todo.id} todo={todo} />);
  } else if (todoStatus === "error") {
    content = <div>{error}</div>;
  }

  const renderedPosts = posts.map((post: Post) => (
    <View key={post.id}>
      <Text>{post.title}</Text>
      <Text>{post.content.substring(0, 100)}</Text>
    </View>
  ));

  return (
    <View>
      <Text>My List</Text>
      <AddPost />
      {renderedPosts}
      {content}
    </View>
  );
}

export default List;
