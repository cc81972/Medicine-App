import './App.css';
import {useEffect, useState} from "react";
import Axios from "axios"


function App() {
  const [listOfMedicine, setListOfMedicine] = useState([]);
  const [name, setName] = useState("")
  const [dosage, setDosage] = useState(0)
  const [time, setTime] = useState("")

  useEffect(() => {
    Axios.get("http://localhost:3001/getMedicine").then((response) => {
    setListOfMedicine(response.data);
    });
  },[]);

  const createMedicine = () => {
    Axios.post("http://localhost:3001/createMedicine", {
      name,
      dosage,
      time,
    }).then((response) => {
      setListOfMedicine([
        ...listOfMedicine,
        {
          name,
          dosage,
          time,
        },
      ]);
    });
  };

  const deleteMedicine = async(id) => {
    try {
      const response = await fetch("http://localhost:3001/deleteMedicine/" + id, { method: "DELETE" });
      console.log(id)
      if (!response.ok) {
        throw new Error("Delete request failed");
      }
      window.location.reload();
      // const data = await response.json();
      // console.log("Deleted Medicine ID:", data.result._id);
    } catch (error) {
      console.error("Error deleting medicine:", error);
    }
  }

  return (
    <div className="App">
      <div className="maincontainer">
        <div className="welcomecontainer">
          <h1 className="welcome">Hello, here is your medicine for today </h1>
        </div>
        <div className="MedicineDisplay">
          {listOfMedicine.map((medicine) => {
            return <div className="individualMedicine" key={medicine._id}>
              <input type="checkbox" id="medicineconsumed"></input>
              <div className='name'>
                <h1 >Name: {medicine.name}</h1>
              </div>
              <div className='dosage'>
                <h1 >Dosage: {medicine.dosage}</h1>
              </div>
              <div className='time'>
                <h1 >Time: {medicine.time}</h1>
              </div>
              <div className="delete" onClick={e=> deleteMedicine(medicine._id)}>Delete</div>
              <hr></hr>
            </div>
          })}
        </div>
        <div>
          <form className="newMedicineContainer">
            <input type="text" placeholder="Name..." onChange={(event) => {setName(event.target.value);}} required></input>
            <input type="number" placeholder="Dosage..." onChange={(event) => {setDosage(event.target.value);}} required></input>
            <input type="text" placeholder="Time..." onChange={(event) => {setTime(event.target.value);}} required></input>
            <button className="createMedicineButton" onClick={createMedicine}>Add Medicine</button>
          </form>
        </div>
      </div>
      <div className="imgcontainer">
        <img src="https://breakbrunch.com/wp-content/uploads/2021/03/6052cfb57d8b37829.jpg" alt="businesscat"/>
      </div>
    </div>
  );
}

export default App;
