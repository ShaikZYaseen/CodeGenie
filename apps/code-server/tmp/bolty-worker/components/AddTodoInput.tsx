```tsx
    import React, { useState } from 'react';
    import { View, TextInput, Button, StyleSheet } from 'react-native';

    interface AddTodoInputProps {
      onAddTodo: (title: string) => void;
    }

    const AddTodoInput: React.FC<AddTodoInputProps> = ({ onAddTodo }) => {
      const [text, setText] = useState('');

      const handleAdd = () => {
        if (text.trim().length !== 0) {
          onAddTodo(text.trim());
          setText('');
        }
      };

      return (
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            value={text}
            onChangeText={setText}
            placeholder="Enter new todo"
            onSubmitEditing={handleAdd}
          />
          <Button title="Add" onPress={handleAdd} />
        </View>
      );
    };

    const styles = StyleSheet.create({
      container: {
        flexDirection: 'row',
        padding: 8
      },
      input: {
        flex: 1,
        marginRight: 8,
        borderWidth: 1,
        borderColor: '#ccc',
      },
    });

    export default AddTodoInput;
    ```