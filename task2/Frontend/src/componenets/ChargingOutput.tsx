import { useSimulationData } from '../context'

const ChargingOutput = () => {
    const { simulationData } = useSimulationData();
    
    //this component is responsible for displaying the aggregated output of the simulation
    return (
        <div className = "ChargingOutput">
            <h3>Simulation Output</h3>
            <p>Total energy consumed: {simulationData?.total_energy_consumed?.toFixed(2)} kWh</p>
            <p>Theoretical max power demand: {simulationData?.theoretical_max_power_demand.toFixed(0)} kW</p>
            <p>Actual max power demand: {simulationData?.actual_max_power_demand.toFixed(0)} kW</p>
            <p>Concurrency factor: {simulationData?.concurrency_factor.toFixed(0)}%</p>
        </div>
    )
    }
export default ChargingOutput