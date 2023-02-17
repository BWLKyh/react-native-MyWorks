import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {ItemType} from '../types';
interface ItemProps {
  data: ItemType;
  updateItem: (key: number, value: string) => void;
  finishItem: (key: number) => void;
  deleteItem: (key: number) => void;
}
function Item(props: ItemProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const {data} = props;
  const [edit, setEdit] = useState(false);
  return (
    <View
      style={{
        backgroundColor: isDarkMode ? Colors.black : Colors.white,
        margin: 10,
        padding: 10,
        borderColor: data.finished ? 'green' : '#841584',
        borderWidth: 2,
      }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity
          style={styles.checkbox}
          onPress={() => props.finishItem(data.id)}>
          {data.finished && <Text style={{color: '#409EFF'}}>✔</Text>}
        </TouchableOpacity>
        {edit ? (
          <TextInput
            style={styles.input}
            value={data.content}
            onChangeText={val => props.updateItem(data.id, val)}
          />
        ) : (
          <Text style={data.finished ? styles.unfinished : styles.finished}>
            {data.content}
          </Text>
        )}
        <TouchableOpacity onPress={() => props.deleteItem(data.id)}>
          <Text style={{fontSize: 22, color: '#949494'}}>×</Text>
        </TouchableOpacity>
      </View>
      {!data.finished && (
        <Button
          onPress={() => setEdit(!edit)}
          title={edit ? '保存' : '编辑'}
          color="#841584"
          disabled={data.finished}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  checkbox: {
    borderWidth: 2,
    borderColor: '#b4dce3',
    width: 20,
    height: 20,
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  finished: {
    borderColor: '#555555',
  },
  unfinished: {
    borderColor: '#999999',
  },
  input: {
    borderWidth: 1,
  },
});

export default Item;
