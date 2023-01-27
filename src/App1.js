import React, {useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
//fab import
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Tooltip from '@mui/material/Tooltip';
//dialog import
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
//card import
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
//design
// import { useTheme } from '@mui/material/styles';
import Checkbox from '@mui/material/Checkbox';
//import { pink } from '@mui/material/colors';
import ModeIcon from '@mui/icons-material/Mode';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import FormControlLabel from '@mui/material/FormControlLabel';

function App1() {
  const [todo, setTodo] = useState(); //single todo
  const [fullList, setFullList] = useState([]);//list of single todos
  const [todoList, setTodoList] = useState([]); //list of title and respective todo list
  const [currentTodo, setcurrentTodo] = useState();
  const [title, setTitle] = useState(""); //current title
  const [open, setOpen] = useState(false); //fab functioning
  const [list, setList] = useState(false); // to-do button functioning//change name
  const [count, setCount]= useState(0);//total items count
  const [checked, setChecked]= useState([0]);//functioning of checked box
  const [countChecked, setCountChecked]=useState(0);//totsl checked items count
  
 
  const HandleOpen = () => {
    //opens dialog box
    setOpen(true);
  };

  const HandleClose = () => {
    //close dialog box
    setOpen(false);
  };

  const HandleListOpen = (ct) => {
    //open to-do list
    setcurrentTodo(ct);
    setList(true);
  };

  
  useEffect(() => {
    console.log(todoList);
    console.log(fullList);
  }, [todoList, fullList]);

  const HandleListClose = () => {
    //close to-do list
    setList(false);
  };

  const HandleSaveTodos = () => {
    setTodoList([...todoList, { title: title, fullList: [], totalItems: 0, totalChecked: 0 }]);
    setTitle("");
    HandleClose();
  };

  const HandleSaveItems = (e) => {
    setFullList((ct)=>{
      return[...ct, todo];
    }
    );
    setTodo("");
  };

  const HandleSaveFunc = () => {
   setTodoList(
      todoList.map((singleList) => {
        if (singleList.title === currentTodo.title) {
          return { ...singleList, fullList:singleList.fullList.concat(fullList), totalItems: (singleList.totalItems===0)?count:singleList.totalItems, totalChecked: countChecked};// condition to see if count is zero then update otherwise don't
        } else {
          return singleList;
        }
      })
    );
    setFullList([]);

    setCount(0);
    setCountChecked(0);
    HandleListClose(false);

  };

  const HandleChange = (event) => {
    setTitle(event.target.value);
  };

  const HandleItemChange = (event) => {
    setTodo(event.target.value);
  };

  const handleCheckBoxChange=(value)=>{
const currentIndex = checked.indexOf(value);
const newChecked=[...checked];

if(currentIndex===-1){
  newChecked.push(value);
}else{
  newChecked.splice(currentIndex,1);
}
setChecked(newChecked);
  }

  
  return (
    <div style={{backgroundColor:"#E1F2FE", height:"100vh"}}>
    <div style={{backgroundColor:"#98D2EB", height:"20vh", borderEndStartRadius:"50%", borderEndEndRadius: "50%", opacity:"0.80"}}>
      <h1 style={{textAlign:"center", color:"#0a014f"}}>Hi, Shruti</h1>
    </div>
    <div style={{display:"flex"}}> 
    {/* Card:1 To enter the Title */}
   
        <Dialog onClose={HandleClose} open={open} >
        <div style={{backgroundColor:'#98D2EB'}}>
          <DialogTitle style={{color:"#0a014f"}} >Add Your To-Do Title</DialogTitle>
          <DialogContent >
            <TextField
              value={title}
              id="title"
              label="TITLE"
              onChange={HandleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button style={{color:"#0a014f"}} onClick={HandleClose}>Cancel</Button>
            <Button style={{color:"#0a014f"}} onClick={HandleSaveTodos}>Save</Button>
          </DialogActions>
          </div>
        </Dialog>
     
</div>
      <div >
      {/* Card:2 To display home screen card w Title */}
        {todoList.length === 0 
        ? (<div style={{position: "fixed", bottom: "50px", right: "95px", color:"#0a014f"}}>Start your first TODO list by clicking the button</div>)
         : ( todoList.map((i) => (
          <Button
                  onClick={() => {
                    HandleListOpen(i)
                  }}
                > <Card
              style={{ display: "flex", height: "30vh", width: "30vw", margin: "10px", backgroundColor:'#B2B1CF', flexDirection:'column'}}
              sx={{ maxWidth: 345 }}
            >
              <CardContent style={{display:'flex', flexDirection:'column', flex:'8'}}>
                <Typography gutterBottom variant="h5" component="div" style={{color:"#0a014f", display:"flex", flex:'8'}}>
                <div style={{display:"flex", flexDirection:"column", flex: "1", justifyContent: "center"}}>  {i.title}</div>
                  <IconButton aria-label="mode">
        <ModeIcon sx={{
    color: "#0a014f"}}
    />
      </IconButton>
                </Typography>
                
                <Typography variant="body2" color="#0a014f" style={{flex:"2"}}>
                  {i.totalChecked}/{i.totalItems}
                </Typography>
              </CardContent>
              <CardActions style={{flex: "4", display: "flex", justifyContent: "end"}}>
               
                <IconButton aria-label="delete" style={{ justifyContent: "flex-end"}}>
        <DeleteIcon sx={{
    color: "#0a014f"}}
    />
      </IconButton>
                </CardActions>
              
            </Card>
            </Button>
          ))
        )}
      </div>

      <Tooltip disableFocusListener title="Add new TO-DO list" arrow>
      <Fab
        onClick={HandleOpen}
        style={{ position: "fixed", bottom: "30px", right: "30px", color:"#0a014f"}}
      // color={theme.palette.primary}
        aria-label="add"
      >
        <AddIcon />
      </Fab>
      </Tooltip>

      
      <div>
      {/* Card:3 To enter and display the To-Do's */}
        <Dialog open={list} onClose={HandleListOpen} >
        <div style={{backgroundColor:"#B2B1CF"}}>
          <DialogTitle style={{color:"#0a014f"}} >To-Do List</DialogTitle>
{currentTodo?.fullList?.map((i)=>(
  <div>
  <FormControlLabel control={ <Checkbox {...i} onClick={() => {
              setCountChecked(countChecked+1)
              handleCheckBoxChange(i)
            } }checked={checked.indexOf(i)!== -1} tabIndex={-1} sx={{
    color: "#0a014f",
    '&.Mui-checked': {
      color: "#0a014f",
    },
  }}  />} label={i} />

            <IconButton aria-label="delete">
        <DeleteIcon sx={{
    color: "#0a014f"}}
    />
      </IconButton>
</div>
            )) }
            
          <DialogContent>
            <TextField
              value={todo}
              id="todo"
              label="To-Do Item"
              type="text"
              onChange={HandleItemChange}
            />
            <Button style={{color:"#0a014f"}} onClick={() => {
              setCount(count+1)
                HandleSaveItems()
            }
            
                  }>ADD</Button>
 </DialogContent> 
          <DialogActions>
          <Button style={{color:"#0a014f"}} onClick={HandleListClose}>Cancel</Button>
            <Button style={{color:"#0a014f"}} onClick={HandleSaveFunc}>SAVE CHANGES</Button>
          </DialogActions>
          </div>
        </Dialog>
      </div>
      
    </div>
  );
}

export default App1;
