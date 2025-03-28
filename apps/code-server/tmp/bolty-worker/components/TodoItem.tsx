```tsx
    import React from 'react';
    import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

    interface TodoItemProps {
      title: string;
      completed: boolean;
      onToggle: () => void;
    }

    const TodoItem: React.FC<TodoItemProps> = ({ title, completed, onToggle }) => (
      <TouchableOpacity onPress={onToggle}>
        <View style={styles.container}>
          <Text style={completed ? styles.textCompleted : styles.text}>{title}</Text>
        </View>
      </TouchableOpacity>
    );

    const styles = StyleSheet.create({
      container: {
        padding: 10,
        marginVertical: 4,
        backgroundColor: '#ddd',
        borderWidth: 1,
        borderColor: '#ccc',
      },
      text: {
        color: '#333',
      },
      textCompleted: {
        color: '#aaa',
        textDecorationLine: 'line-through',
      },
    });

    export default TodoItem;
    ```