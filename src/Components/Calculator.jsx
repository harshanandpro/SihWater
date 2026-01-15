import "./Calculator.css";
import { useState } from "react";

const Calculator = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  const [nextPageCalc , setnextPageCalc] = useState(false)
  const [rooftop , setRooftop] = useState(0)
   return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <h1 className="calculator_top">Calculator</h1>
        {nextPageCalc ?
        <div className="calculator_body">
            <h3>You can Save {rooftop * 950} Liters Per Year!</h3>
            <button className="calculator_retry" onClick={() => setnextPageCalc(false)}>ReCalculate</button>
        </div>
        :
        <div className="calculator_body">
            <h3>Enter the area of your rooftop</h3>
            <input onChange={(e) => setRooftop(e.target.value)} type="number" className="calculator_input" placeholder="rooftop area in sq meter"/>
            <button className="calculator_submit" onClick={() => setnextPageCalc(true)}>Submit</button>
        </div>  
      }
        
        <div className="calculator_bottom">
            <button className="close-btn " onClick={onClose}>
            Close
            </button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
