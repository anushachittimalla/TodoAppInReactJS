import './App.css';
import React, {useState} from 'react';
import Task from './Task';

function App() {
  const[taskDetails, setTaskDetails] = useState({
    nameOfTask:"",
    dateTime:""
  });
  const[taskInputContainer, setTaskInputContainer] = useState(false);
  const[allTasksDetails, setallTaskDetails] =useState([]);
  const[isEditAction, setEditAction] = useState(false);
  const[editIndex, setEditIndex] = useState(0);

  const enterTaskDetails= e =>{
    setTaskInputContainer(true);
    setEditAction(false);
    setTaskDetails({
      nameOfTask:"",
      dateTime:""
      
    })
  }

  const changeHandler= e =>{
    setTaskDetails({...taskDetails, [e.target.name] : e.target.value})

  };

  const saveHandler= e =>{
    setTaskInputContainer(false);
    console.log(taskDetails);
    setTaskDetails(taskDetails);
    if(isEditAction) {
      allTasksDetails.splice(editIndex, 1, taskDetails);
    } else {
      allTasksDetails.push(taskDetails);
    }    
    console.log(allTasksDetails)
  }

  const deleteHandler = i => {
    setallTaskDetails(allTasksDetails.filter((task, index) => index !== i));
  }

  const editHandler = i => {
    setTaskInputContainer(true);
    setEditAction(true);
    setEditIndex(i);
    setTaskDetails(allTasksDetails[i]);
  }

  return (
    <div className="App background container mt-3 mb-3">
      <h1>  TODO LIST</h1>
      <div style={{textAlign: 'left', marginLeft: "3%", marginBottom: "1%"}}>
        <button className='btn btn-primary' onClick={enterTaskDetails}> Add Task</button>
      </div>
      {taskInputContainer &&
        <div> 
          <label>Task Name: </label>
          <input type="text" name="nameOfTask" className='mt-3' onChange={changeHandler} value={taskDetails.nameOfTask}/> <br/>
          <label > Date &amp; Time : </label>
          <input type="datetime-local" name="dateTime" className='mt-3' onChange={changeHandler} value={taskDetails.dateTime} /> <br/>
          <button className='btn btn-primary m-3' onClick={saveHandler}> Save </button>
        </div>
      }
      {allTasksDetails.length > 0 &&
        <div className="back-ground">
          {allTasksDetails.map((each, index) => {
            return <Task index={index} details={each} deleteFunc={deleteHandler} editFunc={editHandler} />
          })}
        </div> 
      }     
    </div>
  );
}

export default App;
