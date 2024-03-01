import { prisma } from './db.js';
import {runSimulation} from './runSimulation.js';

interface SimulationParametersInput {
    numberOfChargePoints: number,
    arrivalProbabilityMultiplier: number,
    consumption: number,
    chargingPower: number,
}

interface updateSimulationParameters {
    id: number,
    numberOfChargePoints: number,
    arrivalProbabilityMultiplier: number,
    consumption: number,
    chargingPower: number,
}

interface simulationSessionParams {
    simulationParameters: SimulationParametersInput, 
    totalEnergyConsumed: number,
    theoreticalMaxPowerDemand: number,
    actualMaxPowerDemand: number,
    concurrencyFactor: number,
}



  


export const resolvers = {
    Query: {
        //READ 
        getSimulationParameter: async (_: any, args: { id: string }) => {
            return await prisma.simulationParameters.findUnique({
                where: {
                    id: parseInt(args.id, 10), // make sure 'id' matches your schema and database
                },
            });

    },
    //READ
    getAllSimulationSessions: async () => {
        return await prisma.simulationSession.findMany({
            include: {
                simulationParameters: true, // Include the simulation parameters in the response
            },
        });
    }        
    },
    Mutation: {
        //CREATE
        createSimulationParameters: async (_:any, args: SimulationParametersInput) => {
            const simulationParameters = await prisma.simulationParameters.create({
                data: {
                    numberOfChargePoints: args.numberOfChargePoints,
                    arrivalProbabilityMultiplier: args.arrivalProbabilityMultiplier,
                    consumption: args.consumption,
                    chargingPower: args.chargingPower,
                },
            });
            return simulationParameters;
        },
        //UPDATE
        updateSimulationParameters: async (_:any, args: updateSimulationParameters) => {
            const simulationParameters = await prisma.simulationParameters.update({
                where: {
                    id: args.id,
                },
                data: {
                    numberOfChargePoints: args.numberOfChargePoints,
                    arrivalProbabilityMultiplier: args.arrivalProbabilityMultiplier,
                    consumption: args.consumption,
                    chargingPower: args.chargingPower,
                },
            });
            return simulationParameters;
        },
        //DELETE
        deleteSimulationParameters: async (_:any, args: { id: string }) => {
            await prisma.simulationParameters.delete({
                where: {
                    id: parseInt(args.id, 10)
                },
            });
            return 'Simulation parameters deleted successfully';
        },

        

        //populates the database with the results of the simulation at the same time as it populates the paramters
        //this ensures that the results are linked to the parameters

        runOurSimulation: async (_: any, { simulationParameters }: { simulationParameters: SimulationParametersInput }) => {
            // First, persist the simulation parameters to get their ID.
            // This ID will be used to link the parameters to the results.
            //Creates a new simulation parameters record in the database
            const persistedParameters = await prisma.simulationParameters.create({
                data: {
                    numberOfChargePoints: simulationParameters.numberOfChargePoints,
                    arrivalProbabilityMultiplier: simulationParameters.arrivalProbabilityMultiplier,
                    consumption: simulationParameters.consumption,
                    chargingPower: simulationParameters.chargingPower,
                },
            });
        
            //simulation runs here
            console.log(simulationParameters); 
            const simulationResults = await runSimulation(simulationParameters);
            
            // Transform granular_data, safely handling undefined or null chargepoint_energy
            const granularDataTransformed = simulationResults.granular_data.map(tick => ({
                ...tick,
                chargepoint_energy: tick.chargepoint_energy ? Object.entries(tick.chargepoint_energy).map(([chargePointId, energy]) => ({
                    chargePointId: parseInt(chargePointId, 10),
                    energy
                })) : []
            }));
        
            //Creates a new simulation session record in the database
            //the id of the simulation parameters is used to link the results to the parameters
            const simulationSession = await prisma.simulationSession.create({
                data: {
                    simulationParametersId: persistedParameters.id, // Link to the persisted parameters
                    totalEnergyConsumed: simulationResults.overall_results.total_energy_consumed,
                    theoreticalMaxPowerDemand: simulationResults.overall_results.theoretical_max_power_demand,
                    actualMaxPowerDemand: simulationResults.overall_results.actual_max_power_demand,
                    concurrencyFactor: simulationResults.overall_results.concurrency_factor,
                },
            });
        
            // Return the results of the simulation 
            return {
                total_energy_consumed: simulationResults.overall_results.total_energy_consumed,
                theoretical_max_power_demand: simulationResults.overall_results.theoretical_max_power_demand,
                actual_max_power_demand: simulationResults.overall_results.actual_max_power_demand,
                concurrency_factor: simulationResults.overall_results.concurrency_factor,          
                granular_data: granularDataTransformed
            };
        },
        
                
            },
};