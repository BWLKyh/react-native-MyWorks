/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  TextInput,
} from 'react-native';
import {Colors, Header} from 'react-native/Libraries/NewAppScreen';
import Item from './components/Item';
import {ItemType} from './types';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [id, setId] = useState<number>(1);
  const [content, setContent] = useState<string>('');
  const [list, setList] = useState<ItemType[]>([]);

  const addItem = () => {
    let arr = list;
    arr.unshift({
      id,
      content,
      finished: false,
    });
    setList(arr);
    setId(id + 1);
    setContent('');
  };
  const updateItem = (key: number, value: string) => {
    let arr = list.map(l => {
      if (l.id === key) {
        l.content = value;
      }
      return l;
    });
    setList(arr);
    setContent('');
  };
  const finishItem = (key: number) => {
    let arr = list.map(l => {
      if (l.id === key) {
        l.finished = true;
      }
      return l;
    });
    setList(arr);
    setContent('');
  };
  const deleteItem = (key: number) => {
    let arr = list.filter(l => l.id !== key);
    setList(arr);
    setContent('');
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <TextInput
            style={styles.editor}
            value={content}
            placeholder="请输入内容"
            onChangeText={(val: string) => setContent(val)}
            onSubmitEditing={addItem}
          />

          {list.length > 0 && (
            <View style={styles.todoList}>
              {list.map(item => (
                <Item
                  key={item.id}
                  data={item}
                  updateItem={updateItem}
                  finishItem={finishItem}
                  deleteItem={deleteItem}
                />
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  editor: {
    fontSize: 18,
  },
  todoList: {
    marginTop: 32,
  },
});

export default App;
