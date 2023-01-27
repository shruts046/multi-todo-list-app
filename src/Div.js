import React, { useEffect, useState } from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function Div() {
  const [todo, setTodo] = useState(); //single
  const [todoItems, setTodoItems] = useState([]); //list of single
  const [todoList, setTodoList] = useState([]); //list of list
  const [title, setTitle] = useState(""); //single title
  const [currentTodo, setCurrentTodo] = useState();
  const [titleOpen, setTitleOpen] = useState(false); //fab
  const [itemsOpen, setItemsOpen] = useState(false); //todo

  const handleTitleOpen = () => {
    setTitleOpen(true);
  };

  const handleTitleClose = () => {
    setTitleOpen(false);
  };
  const handleItemsOpen = async (i) => {
    await setCurrentTodo(i);
    await setItemsOpen(true);
  };

  const handleItemsClose = () => {
    setItemsOpen(false);
  };

  const handleSaveTodoList = () => {
    setTodoList([...todoList, { title: title, todoItems: [] }]);
    setTitle("");
    handleTitleClose();
  };

  const handleSaveTodoItem = () => {
    setTodoItems((currentData) => {
      return [...currentData, todo];
    });
    setTodo("");
  };

  const handleUpdateTodoList = () => {
    setTodoList(
      todoList.map((item) => {
        if (item.title === currentTodo.title) {
          return { ...item, todoItems: item.todoItems.concat(todoItems) };
        } else {
          return item;
        }
      })
    );
    setTodoItems([]);
    handleItemsClose(false);
  };

  useEffect(() => {
    console.log(todoList);
    console.log(todoItems);
  }, [todoList, todoItems]);

  return (
    <div style={{ height: "100vh" }}>
      {todoList.length === 0
        ? null
        : todoList.map((item) => {
            return (
              <div
                onClick={() => handleItemsOpen(item)}
                style={{ height: "100px", fontSize: "30px" }}
              >
                {item.title}
              </div>
            );
          })}

      <Dialog open={itemsOpen} onClose={handleItemsOpen}>
        <DialogTitle>Enter todo item</DialogTitle>
        <DialogContent>
          <DialogContentText>Add Your todo items</DialogContentText>
          <TextField
            id="todoItem"
            label="Todo Item"
            type="text"
            value={todo}
            onChange={(event) => setTodo(event.target.value)}
          />
          <Button onClick={handleSaveTodoItem}>Add Item</Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleItemsClose}>Cancel</Button>
          <Button onClick={handleUpdateTodoList}>Save</Button>
        </DialogActions>

        {currentTodo?.todoItems?.map((i) => {
          return <div>{i}</div>;
        })}
      </Dialog>

      <Fab
        style={{ position: "fixed", right: "20px", bottom: "20px" }}
        color="primary"
        aria-label="add"
        onClick={handleTitleOpen}
      >
        <AddIcon />
      </Fab>
      <Dialog open={titleOpen} onClose={handleTitleClose}>
        <DialogTitle>Enter Title</DialogTitle>
        {title}
        <DialogContent>
          <DialogContentText>Add Your todo Title</DialogContentText>
          <TextField
            id="title"
            label="Title"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleTitleClose}>Cancel</Button>
          <Button
            onClick={() => {
              handleSaveTodoList();
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Div;
