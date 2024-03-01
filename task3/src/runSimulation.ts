import { spawn } from 'child_process';

// Define the types of the arguments and the result of the runSimulation function
interface SimulationParameters {
  numberOfChargePoints: number;
  arrivalProbabilityMultiplier: number;
  consumption: number;
  chargingPower: number;
}

interface ChargePointEnergy {
  [chargePointId: number]: number;
}

interface TickData {
  tick: number;
  active_chargepoints: number;
  tick_energy_consumed: number;
  chargepoint_energy: ChargePointEnergy;
}

interface OverallResults {
  total_energy_consumed: number;
  theoretical_max_power_demand: number;
  actual_max_power_demand: number;
  concurrency_factor: number;
}

interface SimulationResult {
  overall_results: OverallResults;
  granular_data: TickData[];
}

//returns a promise that resolves to a SimulationResult
export const runSimulation = (args: SimulationParameters): Promise<SimulationResult> => {
  // Convert args object to an array of command-line arguments
  const argsArray = [
    '--numberOfChargePoints', args.numberOfChargePoints.toString(),
    '--arrivalProbabilityMultiplier', args.arrivalProbabilityMultiplier.toString(),
    '--consumption', args.consumption.toString(),
    '--chargingPower', args.chargingPower.toString(),
  ];

  return new Promise((resolve, reject) => {
    // Run the simulation script as a child process
    const process = spawn('python3', ['./simulation.py', ...argsArray]);

    let result = '';

    process.stdout.on('data', (data: any) => {
      result += data.toString();
    });

    process.stderr.on('data', (data: any) => {
      console.error(`stderr: ${data}`);
    });

    process.on('close', (code: any) => {
      if (code !== 0) {
        return reject(new Error(`Simulation script exited with code ${code}`));
      }
      try {
        const parsedResult = JSON.parse(result);
        resolve(parsedResult);
      } catch (error: any) {
        reject(new Error('Failed to parse simulation results: ' + error.message));
      }
    });
  });
};

