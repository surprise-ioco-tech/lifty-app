import React, {useState} from 'react';
import {Keyboard, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-elements';
import {TaskInput} from './taskinput';
import {TaskItem} from './taskitem';

export default function HomeScreen({navigation, route}) {
  console.log('NAVIGATION', navigation);
  console.log('ROUTE', route);
  const [tasks, setTasks] = useState([]);
  const {itemId, otherParam} = route.params;
  console.log('THE ROUTE PARAMS;;;', itemId);
  console.log('THE OTHER PARAM;;;', otherParam);

  const addTask = task => {
    if (task == null) return;
    setTasks([...tasks, task]);
    Keyboard.dismiss();
  };

  const deleteTask = deleteIndex => {
    setTasks(tasks.filter((value, index) => index != deleteIndex));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>TODO LIST</Text>
      <ScrollView style={styles.scrollView}>
        {tasks.map((task, index) => {
          return (
            <View key={index} style={styles.taskContainer}>
              <TaskItem
                index={index + 1}
                task={task}
                deleteTask={() => deleteTask(index)}
              />
            </View>
          );
        })}
      </ScrollView>
      <View style={styles.homeButton}>
        <Button
          color="secondary"
          size={200}
          title={'GOTO LOGIN'}
          onPress={() =>
            navigation.navigate('Login', {
              itemId: 86,
              otherParam: 'anything you want here',
            })
          }></Button>
      </View>

      <TaskInput addTask={addTask} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1A3C',
  },
  heading: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    marginTop: 30,
    marginBottom: 10,
    marginLeft: 20,
  },
  scrollView: {
    marginBottom: 70,
  },
  taskContainer: {
    marginTop: 20,
  },
  homeButton: {
    // borderColor: '#fff',
    // backgroundColor: '#3E3364',
    // borderWidth: 1,
    flex: 1,
    // marginHorizontal: 20,
    width: 300,
    borderRadius: 12,
    flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'space-between',
    paddingHorizontal: 10,
    position: 'absolute',
    bottom: 150,
  },
});
