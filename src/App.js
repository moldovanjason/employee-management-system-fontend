import "./App.css";
import React, { useState } from "react";
import Axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [wage, setWage] = useState(0);
  const [newWage, setNewWage] = useState(0);

  const [employeeList, setEmployeeList] = useState([]);

  const addEmployee = () => {
    Axios.post("https://beginners-crud.herokuapp.com/create", {
      name: name,
      age: age,
      country: country,
      position: position,
      wage: wage,
    }).then(() => {
      setEmployeeList([
        ...employeeList,
        {
          name: name,
          age: age,
          country: country,
          position: position,
          wage: wage,
        },
      ]);
    });
  };

  const getEmployees = () => {
    Axios.get("https://beginners-crud.herokuapp.com/employees").then(
      (response) => {
        setEmployeeList(response.data);
      }
    );
  };

  const updateEmployeeWage = (id) => {
    Axios.put("https://beginners-crud.herokuapp.com/update", {
      wage: newWage,
      id: id,
    }).then((response) => {
      setEmployeeList(
        employeeList.map((val) => {
          return val.id == id
            ? {
                id: val.id,
                name: val.name,
                country: val.country,
                age: val.age,
                position: val.position,
                wage: newWage,
              }
            : val;
        })
      );
    });
  };

  const deleteEmployee = (id) => {
    Axios.delete(`https://beginners-crud.herokuapp.com/delete/${id}`).then(
      (response) => {
        setEmployeeList(
          employeeList.filter((val) => {
            return val.id != id;
          })
        );
      }
    );
  };

  return (
    <div className="App">
      <h1>Employee Management System</h1>
      <div className="information">
        <label className="Title">Enter Employee Information</label>
        <input
          type="text"
          onChange={(e) => {
            setName(e.target.value);
          }}
          placeholder="Name..."
        />
        <input
          type="number"
          onChange={(e) => {
            setAge(e.target.value);
          }}
          placeholder="Age..."
        />
        <input
          type="text"
          onChange={(e) => {
            setCountry(e.target.value);
          }}
          placeholder="Country..."
        />
        <input
          type="text"
          onChange={(e) => {
            setPosition(e.target.value);
          }}
          placeholder="Position..."
        />
        <input
          type="number"
          onChange={(e) => {
            setWage(e.target.value);
          }}
          placeholder="Wage..."
        />
        <button onClick={addEmployee}>Add Employee</button>
      </div>
      <div className="employees">
        <button onClick={getEmployees}>Show Employees</button>
        {employeeList.map((val, key) => {
          return (
            <div className="employee">
              <h3>Name: {val.name}</h3>
              <h3>Age: {val.age}</h3>
              <h3>Position: {val.position}</h3>
              <h3>Country: {val.country}</h3>
              <h3>Wage: {val.wage}</h3>
              <div className="rightSide">
                <input
                  className="employeePlaceholder"
                  type="number"
                  placeholder="New Wage..."
                  onChange={(e) => {
                    setNewWage(e.target.value);
                  }}
                />
                <button
                  onClick={() => {
                    updateEmployeeWage(val.id);
                  }}
                >
                  Update Wage
                </button>
                <button
                  className="deleteBtn"
                  onClick={() => {
                    deleteEmployee(val.id);
                  }}
                >
                  Delete Employee
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}


export default App;
