import  { useState } from 'react';
import './App.css';
import ChargingForm from './componenets/ChargingForm';
import ChargingOutput from './componenets/ChargingOutput';
import ChargingEvents from './componenets/ChargingEvents';
import EnergyUsage from './componenets/EnergyUsage';
import Bonus from './componenets/Bonus';



function App() {
  const [showBonus, setShowBonus] = useState(false);
  const [simulationRan, setSimulationRan] = useState(false);

  let instruction_text = "If you build 20 charging stations with a maximum charging speed of 11kW each, the theoretical maximum of total power demand is 220kW (a very high number that would be expensive to satisfy, e.g. requiring a new, more powerful grid connection). You know this is only a theoretical figure, because its statistically unlikely for all 20 charging stations to be charging at full power at the same time. By simulating how electric chargers are actually used we can simulate how high the total energy consumption (kWh) is, what peak power loads (kW) occur, and how these figures behave change with the number of chargepoints installed.";
  

  return (
    <>
      <div className = "Overall"> 

      <button className = "BonusButton" onClick={() => setShowBonus(!showBonus)}>
        {showBonus ? 'Show Main Components' : 'Show Bonus Component'}
      </button>
      {!showBonus && (
        <div className="Parent">
          <div className="Container">
            <ChargingForm setSimulationRan={setSimulationRan} />
            <ChargingOutput />
          </div>
          <div className="ChargingEvents">
            {simulationRan ? (
              <>
                <ChargingEvents />
                <br></br>
                <EnergyUsage />
              </>
            ) : (
              <div className = "Instructions">
                <h2>Please run the simulation to see results here. </h2>
                <p>{instruction_text}</p>
              
              </div>
            )}
          </div>
        </div>
      )}

      {showBonus && (
        <div className="BonusComponent">
          <Bonus />
        </div>
      )}
      </div>
    </>
  );
}

export default App;
