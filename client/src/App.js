import Axios from "axios"
import { useState } from "react"
import style from "./style.css"

function App() {

  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [wage, setWage] = useState(0);
  const [newWage, seNewtWage] = useState(0);

  const [employeeList, setEmployeeList] = useState([]);

  const getEmployees = () => {

    Axios.get('http://localhost:3001/employees').then((response) => {
      setEmployeeList(response.data);

    })

  }

  const addEmployee = () => {
    Axios.post('http://localhost:3001/create', {
      name: name,
      age: age,
      country: country,
      position: position,
      wage: wage
    }).then(() => {
      setEmployeeList([
        ...employeeList,
        {
          name: name,
          age: age,
          country: country,
          position: position,
          wage: wage
        }
      ])
    })
  }

  const updateEmployeeWage = (id) => {
    Axios.put("http://localhost:3001/update", { wage: newWage, id: id }).then((response) => {
      setEmployeeList(
        employeeList.map((val) => {
          return val.id == id ? {
            id: val.id,
            name: val.name,
            country: val.country,
            age: val.age,
            position: val.position,
            wage: newWage

          } : val;
        })
      )
    })
  }



  return (
    <div className="App Container">
      <h1><center>กรอกข้อมูล</center></h1>

      <div className="infomation">
        <form action="">



          <div className="mb-3">
            <p id="top1"><input 
              type="text"
              className="form-control"
              placeholder="ชื่อ:"
              onChange={(event) => {
                setName(event.target.value)
              }}
            /></p>
          </div>


          <div className="mb-3">
            <p id="top1"><input
              type="number"
              className="form-control"
              placeholder="อายุ:"
              onChange={(event) => {
                setAge(event.target.value)
              }}
            /></p>
          </div>

          <div className="mb-3">
            <p id="top1"><input
              type="text"
              className="form-control"
              placeholder="ประเทศ:"
              onChange={(event) => {
                setCountry(event.target.value)
              }}
            /></p>
          </div>

          <div className="mb-3">
            <p id="top1"><input
              type="text"
              className="form-control"
              placeholder="สถานะ:"
              onChange={(event) => {
                setPosition(event.target.value)
              }}
            /></p>
          </div>

          <div className="mb-3">
            <p id="top1"><input
              type="text"
              className="form-control"
              placeholder="เงินเดือน:"
              onChange={(event) => {
                setWage(event.target.value)
              }}
            /></p>
          </div>
          <center><button className="btn btn-success" id="top2" onClick={addEmployee}>ยืนยันข้อมูล</button></center>
        </form>
      </div>
      <hr />
      <div className="employee">
        <center ><button className="btn btn-primary" id="top2" onClick={getEmployees}>ตรวจสอบข้อมูล</button></center>
        <br></br>

        {employeeList.map((val, key) => {
          return (
            <div className="employee card">
              <div className="card-body text-left">
                <p className="card-text">name: {val.name}</p>
                <p className="card-text">age: {val.age}</p>
                <p className="card-text">country: {val.country}</p>
                <p className="card-text">position: {val.position}</p>
                <p className="card-text">wage: {val.wage}</p>
                <div className="d-flex">
                  <input
                    type="number"
                    style={{ width: "400px" }}
                    placeholder="15000..."
                    className="form-control"
                    onChange={(event) => {
                      seNewtWage(event.target.value)
                    }}
                  />
                  <button classname="btn btn-warning" onClick={() => { updateEmployeeWage(val.id) }}>Update</button>

                </div>
              </div>
            </div>
          )
        })}


      </div>
    </div>
  );
}

export default App;
