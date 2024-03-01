import random
import argparse
import json


#parse the argument
parser = argparse.ArgumentParser(description='Run simulation with custom parameters.')
parser.add_argument('--numberOfChargePoints', type=int, required=True)
parser.add_argument('--arrivalProbabilityMultiplier', type=float, required=True)
parser.add_argument('--consumption', type=float, required=True)
parser.add_argument('--chargingPower', type=float, required=True)
args = parser.parse_args()



#constants
CHARGEPOINTS = 20 #default 20
POWER = 11 #default 11kW
TICKS = 35040
DAYS = 365

arrival_probabilities = {
    0: 0.94, 
    1: 0.94, 
    2: 0.94,
    3: 0.94,
    4: 0.94,
    5: 0.94,
    6: 0.94,
    7: 0.94,
    8: 2.83,
    9: 2.83,
    10: 5.66,
    11: 5.66,
    12: 5.66,
    13: 7.55,
    14: 7.55,
    15: 7.55,
    16: 10.38,
    17: 10.38,
    18: 10.38,
    19: 4.72,
    20: 4.72,
    21: 4.72,
    22: 0.94,
    23: 0.94,
}


#calculate time of day for each tick in the arrival window
def probability_of_arrival(tick, multiplier):
    intervals_per_hour = 4
    hours_per_day = 24
    intervals_per_day =  intervals_per_hour * hours_per_day

    if is_dst(tick):
        tick += 4

    #calculate the interval number for the tick
    interval_num = tick % intervals_per_day

    #calculate the hour
    hour = interval_num // intervals_per_hour

    #calculate the arrival prability 
    #O(1) time complexity
    base_probability = arrival_probabilities[hour]
    adjusted_probability = base_probability * multiplier

    return adjusted_probability

#use choices for weighted random choice
charging_demands_km = [0, 5, 10, 20, 30, 50, 100, 200, 300]  
probabilities = [34.31, 4.90, 9.80, 11.76, 8.82, 11.76, 10.78, 4.90, 2.94]

def charging_needs():
    return random.choices(charging_demands_km, weights=probabilities, k=1)[0]

#calculate the energy consumed 
#18kWh/100km
def energy_consumed(charging_needs, consumption):
    return charging_needs * (consumption/100) 


#DST Germany
'''
Lets assume the DST in Germany is as follows and use 2023 as the year since its not a leap year
Sun, Mar 26, 2023 – Sun, Oct 29, 2023

if time is in the range of DST, add 1 hour b/c clocks shift forward in the spring and back in the fall

'''
dst_start_tick = 8160 #85 * 96
dst_end_tick = 28992 #302 * 96
def is_dst(tick):
    if dst_start_tick <= tick <= dst_end_tick:
        return True
    return False
    


#simulate the charging process
def main(numberOfChargePoints, arrivalProbabilityMultiplier, consumption, chargingPower):
    CHARGEPOINTS = numberOfChargePoints
    POWER = chargingPower
    total_energy_consumed = 0
    theoretical_max_power_demand = CHARGEPOINTS * POWER  # 20 * 11 kW = 220 kW
    actual_max_power_demand = 0  # Initialize the actual max power demand
    granular_data = [] 
    # Initialize variables for calculating concurrency factor later

    for tick in range(TICKS):
        active_chargepoints = 0  # Track how many chargepoints are actively charging this interval
        tick_energy_consumed = 0  # Track how much energy is consumed this interval
        tick_data = {"tick": tick, "active_chargepoints": 0, "tick_energy_consumed": 0, "chargepoint_energy": {}}
        for chargepoint in range(CHARGEPOINTS):
            if random.uniform(0, 100) < probability_of_arrival(tick, arrivalProbabilityMultiplier):  # Simulate arrival based on probability
                demand_km = charging_needs()  # This should determine if a car arrives based on the arrival probability
                if demand_km > 0:  # A car has arrived and will charge
                    active_chargepoints += 1
                    energy_for_this_car = energy_consumed(demand_km, consumption)  # Calculate energy based on demand
                    tick_energy_consumed += energy_for_this_car
                    total_energy_consumed += energy_for_this_car

                    tick_data["chargepoint_energy"][chargepoint] = energy_for_this_car
                tick_data["active_chargepoints"] = active_chargepoints
                tick_data["tick_energy_consumed"] = tick_energy_consumed

        # Calculate power demand for this interval based on active chargepoints
        interval_power_demand = active_chargepoints * POWER
        actual_max_power_demand = max(actual_max_power_demand, interval_power_demand)
        granular_data.append(tick_data)

    # Calculate concurrency factor
    concurrency_factor = (actual_max_power_demand / theoretical_max_power_demand) * 100

    overall_results = {
        "total_energy_consumed": total_energy_consumed,
        "theoretical_max_power_demand": theoretical_max_power_demand,
        "actual_max_power_demand": actual_max_power_demand,
        "concurrency_factor": concurrency_factor,
    }

    return {
        "overall_results": overall_results,
        "granular_data": granular_data
    }

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Run simulation with custom parameters.')
    parser.add_argument('--numberOfChargePoints', type=int, required=True)
    parser.add_argument('--arrivalProbabilityMultiplier', type=float, required=True)
    parser.add_argument('--consumption', type=float, required=True)
    parser.add_argument('--chargingPower', type=float, required=True)
    args = parser.parse_args()

    results = main(args.numberOfChargePoints, args.arrivalProbabilityMultiplier, args.consumption, args.chargingPower)
    print(json.dumps(results, indent=4))