```tsx
    import React from 'react';
    import { View, FlatList, Text, StyleSheet } from 'react-native';
    import TodoItem from '@/components/TodoItem';
    import AddTodoInput from '@/components/AddTodoInput';
    import useTodoList from '@/hooks/useTodoList';

    const TodoScreen: React.FC = () => {
      const { todos, addTodo, toggleTodo } = useTodoList();

      return (
        <View style={styles.container}>
          <AddTodoInput onAddTodo={addTodo} />
          <FlatList
            data={todos}
            renderItem={({ item }) => 
              <TodoItem
                title={item.title}
                completed={item.completed}
                onToggle={() => toggleTodo(item.id)}
              />
            }
            keyExtractor={item => item.id}
          />
        </View>
      );
    };

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        marginTop: 20,
      },
    });

    export default TodoScreen;
    ```