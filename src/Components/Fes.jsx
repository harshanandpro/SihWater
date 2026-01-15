import "./Design.css";
import { useEffect, useState } from "react";

const Calculator = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  const [nextPageCalc , setnextPageCalc] = useState(false)
  const [rooftop , setRooftop] = useState(0)
  const [struc , setStruc] = useState("")
  const [price , setPrice] = useState(0)
  useEffect(() => {
    if(rooftop <= 50 ){
        setStruc("Single downpipe + barrel storage")
        setPrice(250)
    }
    else if(50 < rooftop < 150){
        setStruc("Multi downpipe + first-flush")
        setPrice(350)
    }
    else if(rooftop > 150){
        setStruc("Modular system + filtration + recharge pit")
        setPrice(500)
    }
  } 
  , [rooftop])
   return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <h1 className="calculator_top">Feasibility and ROI</h1>
        {nextPageCalc ?
        <div className="calculator_body">
            <h2>{struc}</h2>
            <h3>
                for the structure it will cost = Rs {price * rooftop} <br />
                water saved each year = {rooftop * 950} L <br/> 
                money saved on water = Rs {(rooftop * 950)/200} <br/>
                Cost of Structure Payed back in {(price * rooftop)/((rooftop * 950)/200)} years. 
            </h3>
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
