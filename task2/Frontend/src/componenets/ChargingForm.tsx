import React from 'react';
import { useState } from 'react'
import { useMutation, gql } from '@apollo/client';
import { useSimulationData } from '../context'

const RUN_OUR_SIMULATION = gql`
  mutation RunOurSimulation($simulationParameters: SimulationParametersInput) {
    runOurSimulation(simulationParameters: $simulationParameters) {
      actual_max_power_demand
      concurrency_factor
      theoretical_max_power_demand
      total_energy_consumed
      granular_data {
        active_chargepoints
        tick
        tick_energy_consumed
        chargepoint_energy {
          chargePointId
          energy
        }
      }
    }
  }
`;

//input form for the simulation parameters

const ChargingForm = ({setSimulationRan}: {setSimulationRan: React.Dispatch<React.SetStateAction<boolean>>}) => {
  const { setSimulationData } = useSimulationData();
    // State for the form with default values from the task description
    const [numberOfChargePoints, setChargingPoints] = useState<number>(20);
    const [arrivalProbabilityMultiplier, setArrivalProbabilityMultiplier] = useState<number>(1);
    const [consumption, setConsumption] = useState<number>(18);
    const [chargingPower, setChargingPower] = useState<number>(11);

    // useMutation hook
    const [runSimulation, { data, loading, error }] = useMutation(RUN_OUR_SIMULATION);

    // if (loading) return 'Submitting...';

    if (error) return `Submission error! ${error.message}`;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevents the default form submit action

      try {
        const response = await runSimulation({
          variables: { simulationParameters: { numberOfChargePoints, arrivalProbabilityMultiplier, consumption, chargingPower  } },
        });
        console.log(response.data);
        setSimulationRan(true);
        setSimulationData(response.data.runOurSimulation);
      }
      catch (error) {
        console.error(error);
      }
    
    };

    return (
        <form onSubmit={handleSubmit}>
          <h3>Simulation Input</h3>
          <div>
            <label htmlFor="chargingPoints">Number of Charging Points:</label>
            <input
              type="number"
              min = "1"
              max = "999" //simulation will be slow if this is too high
              id="chargingPoints"
              value={numberOfChargePoints}
              onChange={(e) => setChargingPoints(Number(e.target.value))}
            />
          </div>
          <div>
            <label htmlFor="arrivalProbabilityMultiplier">Arrival Probability Multiplier:</label>
            <input
              type="number"
              id="arrivalProbabilityMultiplier"
              min = "0.2"
              max = "2"
              step = "0.001"
              value={arrivalProbabilityMultiplier}
              onChange={(e) => setArrivalProbabilityMultiplier(parseFloat(e.target.value))}
            />
          </div>
          <div>
            <label htmlFor="consumption">Consumption (kWh):</label>
            <input
              type="number"
              min = "1"
              id="consumption"
              value={consumption}
              onChange={(e) => setConsumption(Number(e.target.value))}
            />
          </div>
          <div>
            <label htmlFor="chargingPower">Charging Power (kW):</label>
            <input
              type="number"
              min = "1"
              id="chargingPower"
              value={chargingPower}
              onChange={(e) => setChargingPower(Number(e.target.value))}
            />
          </div>
          <button type="submit">Simulate</button>
        </form>
      );
    };


    export default ChargingForm;
