import { useEffect, useState } from 'react';
import Axios from 'axios';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import './App.css';
  
function App() {
  
  // Initializing all the state variables 
  const [info, setInfo] = useState([]);
  const [input, setInput] = useState("");
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [options, setOptions] = useState([]);
  const [output, setOutput] = useState("");
  
  // Calling the api whenever the dependency changes
  useEffect(() => {
    Axios.get(
      `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from}.json`)
    .then((res) => {
      setInfo(res.data[from]);
    })
  }, [from]);
  
  // Calling the convert function whenever
  // a user switches the currency
  useEffect(() => {
    setOptions(Object.keys(info));
    convert();
  }, [info])
    
  // Function to convert the currency
  function convert() {
    if (input === "" || isNaN(input)) {
      setOutput("Click convert");
      return;
    }
    var rate = info[to];
    setOutput(parseFloat(input) * rate);
  }
  
  // Function to switch between two currency
  function flip() {
    var temp = from;
    setFrom(to);
    setTo(temp);
    convert();
  }

  return (
    <div className="App">
      <div className="heading">
        <h1>Fiat/Crypto Currency converter</h1>
        <h6>A fiat money is a type of currency that is declared legal tender by a government.</h6>
        <h6>A cryptocurrency is a digital currency, which is an alternative form of payment created using encryption algorithms.</h6>
      </div>
      <div className="container">
        <div className="left">
          <h3>Amount</h3>
          <input type="text" 
             placeholder="Enter the amount in numbers or decimal" 
             value={input}
             onChange={(e) => setInput(e.target.value.replace(/[^0-9.]/g, ''))} />
        </div>
        <div className="middle">
          <h3>From</h3>
          <Dropdown options={options} 
                    onChange={(e) => { setFrom(e.value) }}
          value={from} placeholder="From" />
        </div>
        <div className="switch">
          <button onClick={() => { flip() }}>Switch</button>
        </div>
        <div className="right">
          <h3>To</h3>
          <Dropdown options={options} 
                    onChange={(e) => {setTo(e.value)}} 
          value={to} placeholder="To" />
        </div>
      </div>
      <div className="result">
        <button onClick={() => { convert() }}>Convert</button>
        <h2>Converted Amount:</h2>
        <p>{input === "" ? "" : input + " " + from + " = " + (output === "Click convert" ? output : output.toFixed(5) + " " + to)}</p>
      </div>
    </div>
  );
}
  
export default App;
