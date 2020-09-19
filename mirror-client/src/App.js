import React, { useState } from "react";
import "./App.css";
import TodoListInterface from "./components/TodoListInterface.js";
import StatTracker from "./components/StatTracker.js";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

function App() {
  // const [item, setItem] = useState({ task: "" });
  // const [list, setList] = useState([]);

  // const TodoList = () => {
  //   const deleteListItem = (deletionIndex) => {
  //     const newList = list.filter((listItem, index) => {
  //       if (deletionIndex !== index) {
  //         return listItem;
  //       }
  //       return 0;
  //     });
  //     setList(newList.filter((item) => item !== "0"));
  //     handleSubmit(newList.filter((item) => item !== "0"));
  //   };
  //   return (
  //     <ul className="todo-list">
  //       {list.map((listItem, index) => {
  //         return (
  //           <li
  //             key={index}
  //             onClick={() => deleteListItem(index)}
  //             className="list-element"
  //           >
  //             {listItem}
  //           </li>
  //         );
  //       })}
  //     </ul>
  //   );
  // };

  // const handleAddButton = (e) => {
  //   e.preventDefault();
  //   if (item === "") return;
  //   list.push(item);
  //   setItem("");
  //   handleSubmit();
  // };

  // const handleSubmit = (submittedList = null) => {
  //   if (submittedList !== null) {
  //     fetch("http://192.168.0.32:5001/api/updateTodo", {
  //       method: "POST",
  //       headers: {
  //         Accept: "application/json, text/plain, */*",
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ list: submittedList }),
  //     })
  //       .then((data) => data.text())
  //       .then((info) => console.log(info));
  //     return;
  //   }
  //   const listAsString = list.join(",");
  //   fetch("http://192.168.0.32:5001/api/updateTodo", {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json, text/plain, */*",
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ list: listAsString }),
  //   })
  //     .then((data) => data.text())
  //     .then((info) => console.log(info));
  // };

  // const getTodoList = () => {
  //   const getUrl = "http://192.168.0.32:5001/api/getTodo";
  //   fetch(getUrl)
  //     .then((data) => {
  //       return data.text();
  //     })
  //     .then((info) => {
  //       setList(info.split(","));
  //     });
  // };

  // useEffect(() => {
  //   getTodoList();
  // }, []);
  const [tabValue, setTabValue] = useState(0);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };
  return (
    <div className="home">
      {/* <div className="todo-app">
        <h2>Todo List Client</h2>
        <form>
          <input
            type="text"
            placeholder="Enter task..."
            value={item.task}
            onChange={(e) => setItem(e.target.value)}
            className="list-input"
          />
          <button onClick={handleAddButton} className="add-btn">
            Add
          </button>
        </form>
        <TodoList />
      </div> */}
      {/* --- NEW --- */}
      <h2 className="home-title">Smart Mirror Web Client</h2>
      <AppBar position="static">
        <Tabs
          value={tabValue}
          onChange={handleChange}
          aria-label="home-tabs"
          indicatorColor="secondary"
          variant="fullWidth"
        >
          <Tab label="Todo List" />
          <Tab label="Stat Tracker" />
        </Tabs>
      </AppBar>
      {tabValue === 0 && <TodoListInterface />}
      {tabValue === 1 && <StatTracker />}
    </div>
  );
}

export default App;
