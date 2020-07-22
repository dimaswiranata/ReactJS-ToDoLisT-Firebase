import React, { useState, useEffect } from 'react';
import { Button, FormControl, InputLabel, Input } from '@material-ui/core';
import { db } from "./firebase";
import firebase from "firebase";
import Todo from "./Todo";
import './App.css';

function App() {

  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  // when the app loads, we need to listen to the database and fetch new todos as they het added/removed
  useEffect(() => {
    //this code here... fires when the app.js loads
    db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      // console.log(snapshot.docs.map(doc => doc.data()));
      setTodos(snapshot.docs.map(doc => ({id: doc.id, todo: doc.data().todo})));
    })
    return () => {
      console.log('Clean Up');
    }
  }, [])

  const addTodo = (event) => {
    event.preventDefault();
    
    db.collection('todos').add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })

    setInput('');
  }

  return (
    <div className="App">
      <h1>Hello Guys</h1>
      <form>
        <FormControl>
          <InputLabel>Write a Todo</InputLabel>
          <Input
            value={input}
            onChange={event => setInput(event.target.value)}
          />
        </FormControl>

        <Button 
          disabled={!input}
          type="submit" 
          onClick={addTodo} 
          variant="contained" 
          color="primary"
        >
          Add Todo
        </Button>
      </form>

      <ul>
        {
          todos.map(todo => (
            <Todo todo={todo}/>
          ))
        }
      </ul>

    </div>
  );
}

export default App;
