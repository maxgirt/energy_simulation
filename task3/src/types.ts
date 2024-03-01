import { gql } from 'graphql-tag';

// Define the GraphQL schema

export const typeDefs = gql`
type SimulationParameters {
  numberOfChargePoints: Int!
  arrivalProbabilityMultiplier: Float
  consumption: Float
  chargingPower: Float
}


# Define Input Type for simulation parameters
input SimulationParametersInput {
  numberOfChargePoints: Int!
  arrivalProbabilityMultiplier: Float
  consumption: Float
  chargingPower: Float
}

# A simulation session is a single run of the simulation with a given set of parameters
type SimulationSession {
  simulationParameters: SimulationParameters!
  totalEnergyConsumed: Float!
  theoreticalMaxPowerDemand: Float!
  actualMaxPowerDemand: Float!
  concurrencyFactor: Float!
}

type ChargePointEnergyKW {
  chargePointId: Int!
  energy: Float!
}

type TickData {
  tick: Int!
  active_chargepoints: Int!
  tick_energy_consumed: Float!
  chargepoint_energy: [ChargePointEnergyKW!]!
}

#aggregate results for all ticks
type OverallResults {
  total_energy_consumed: Float!
  theoretical_max_power_demand: Float!
  actual_max_power_demand: Float!
  concurrency_factor: Float!
}

type SimulationResult {
  total_energy_consumed: Float!
  theoretical_max_power_demand: Float!
  actual_max_power_demand: Float!
  concurrency_factor: Float!
  granular_data: [TickData!]!
}


type Query {
  getSimulationParameter(id: Int): SimulationParameters # returns a single set of simulation parameters
  getAllSimulationSessions: [SimulationSession!] # returns all simulation sessions
}

type Mutation {
  createSimulationParameters(
    numberOfChargePoints: Int!
    arrivalProbabilityMultiplier: Float
    consumption: Float
    chargingPower: Float
  ): SimulationParameters!

  updateSimulationParameters(
    id: Int
    numberOfChargePoints: Int
    arrivalProbabilityMultiplier: Float
    consumption: Float
    chargingPower: Float
  ): SimulationParameters!


  createSimulationSession(
    simulationParametersId: Int!,
    totalEnergyConsumed: Float!,
    theoreticalMaxPowerDemand: Float!,
    actualMaxPowerDemand: Float!,
    concurrencyFactor: Float!
  ): SimulationSession!


  deleteSimulationParameters(id: ID!): String

  # Run a simulation with the input parameters and return the results as a SimulationResult
  runOurSimulation(simulationParameters: SimulationParametersInput): SimulationResult!

}
`;
