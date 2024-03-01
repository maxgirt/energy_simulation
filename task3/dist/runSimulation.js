import { spawn } from 'child_process';
//returns a promise that resolves to a SimulationResult
export const runSimulation = (args) => {
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
        process.stdout.on('data', (data) => {
            result += data.toString();
        });
        process.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`);
        });
        process.on('close', (code) => {
            if (code !== 0) {
                return reject(new Error(`Simulation script exited with code ${code}`));
            }
            try {
                const parsedResult = JSON.parse(result);
                resolve(parsedResult);
            }
            catch (error) {
                reject(new Error('Failed to parse simulation results: ' + error.message));
            }
        });
    });
};
