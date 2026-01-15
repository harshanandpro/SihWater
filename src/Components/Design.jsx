import "./Design.css";
import { useEffect, useState } from "react";

const Calculator = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  const [nextPageCalc , setnextPageCalc] = useState(false)
  const [rooftop , setRooftop] = useState(0)
  const [struc , setStruc] = useState("")
  useEffect(() => {
    if(rooftop <= 50 ){
        setStruc("Single downpipe + barrel storage")
    }
    else if(50 < rooftop < 150){
        setStruc("Multi downpipe + first-flush")
    }
    else if(rooftop > 150){
        setStruc("Modular system + filtration + recharge pit")
    }
  } 
  , [rooftop])
   return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <h1 className="calculator_top">Design</h1>
        {nextPageCalc ?
        <div className="calculator_body">
            <h3>You can build a {struc} for Rain water harvesting</h3>
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
