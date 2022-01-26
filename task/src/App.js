import React, {useState} from "react";
import data from "./mock-data.json"
import './App.css';

const App = () => {
  const [workers, setWorkers] = useState(data);
  const [addFormData, setAddFormData] = useState({
    id: '',
    firstName: '',
    lastName: '',
    department: '',
    salary: '',
  });

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute('name');
    const fieldValue = event.target.value;


    const newFormData = {...addFormData};
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  }

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newWorker = {
      id: 6 + addFormData.id++,
      firstName: addFormData.firstName,
      lastName: addFormData.lastName,
      department: addFormData.department,
      salary: parseInt(addFormData.salary),
    };

    const newWorkers = [...workers,newWorker];
    setWorkers(newWorkers)
    console.log(newWorkers);

  };

  const handleDeleteWorker = (workerId) => {
    const newWorkers = [...workers];
    const index = workers.findIndex((worker) => worker.id === workerId);

    newWorkers.splice(index, 1);

    setWorkers(newWorkers);
  }

// -------------------------------------------------
// summary salary
  const wor = [...workers];
  const sumSalary = wor.map((item) => {

    return parseFloat(item.salary)

  });
  const summary = sumSalary.reduce((a, b) => a + b)

  console.log(sumSalary);
// ----------------------------------------------------

  const [search, setSearch] = useState("");

  return (
      <div className="App">
        <table>
          <tbody>
          <input type="text" placeholder="Search..."
                 onChange={event => setSearch(event.target.value)}
          />
          {workers.filter((val) => {
            if (search === "") {
              return val
            } else if (
                val.firstName.toLowerCase().includes(search.toLowerCase()) ||
                val.lastName.toLowerCase().includes(search.toLowerCase()) ||
                val.department.toLowerCase().includes(search.toLowerCase()) ||
                val.salary.toLowerCase().includes(search.toLowerCase())
            ) {
              return val
            }
          }).map((val,key) => {
            return (
                <div className="workers" key={key}>
                  <table>
                    <thead>
                    <tr>
                      <td>{val.id + "."}</td>
                      <td>{val.firstName}</td>
                      <td>{val.lastName}</td>
                      <td>{val.department}</td>
                      <td>{val.salary} USD</td>
                      <td>
                        <button
                            onClick={handleDeleteWorker}
                        >Delete</button>
                      </td>
                    </tr>
                    </thead>
                  </table>
                </div>
            )
          })}
          <p id="sum">Summary {summary} USD</p>
          </tbody>
        </table>
        <h2>Add new worker</h2>
        <form onSubmit={handleAddFormSubmit}>
          <input
              type="text"
              name="firstName"
              required="required"
              placeholder="Enter a first name"
              onChange={handleAddFormChange}
          />
          <input
              type="text"
              name="lastName"
              required="required"
              placeholder="Enter a last name"
              onChange={handleAddFormChange}
          />
          <input
              type="text"
              name="department"
              required="required"
              placeholder="Enter a department"
              onChange={handleAddFormChange}
          />
          <input
              type="text"
              name="salary"
              required="required"
              placeholder="Enter a salary"
              onChange={handleAddFormChange}
          />
          <button type="submit">Add worker</button>
        </form>

      </div>
  );
}

export default App;
