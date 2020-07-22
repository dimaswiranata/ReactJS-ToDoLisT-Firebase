import React, { useState } from 'react'
import './Todo.css'
import { 
  ListItem, 
  ListItemText, 
  List, 
  ListItemAvatar ,
  Button,
  Modal,
  makeStyles
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
import { db } from "./firebase";
import firebase from "firebase";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}))

function Todo({todo}) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');

  const updateTodo = () => {
    db.collection('todos').doc(todo.id).set({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }, { merge: true });
    setOpen(false);
  }

  return (
    <>
      <Modal
        open={open}
        onClose={event => setOpen(false)}
      >
        <div className={classes.paper}>
          <h1>I am a modal</h1>
          <input placeholder={todo.todo} value={input} onChange={event => setInput(event.target.value)}/>
          <Button onClick={updateTodo}>Update Todo</Button>
        </div>
      </Modal>
      <List className="todo__list">
        <ListItem>
          <ListItemAvatar>
          </ListItemAvatar>
          <ListItemText primary={todo.todo} secondary="Dummy deadline"/>
        </ListItem>
        <Button onClick={event => setOpen(true)}>Edit</Button>
        <DeleteIcon onClick={event => db.collection('todos').doc(todo.id).delete()}/>
      </List>
    </>
  )
}

export default Todo
