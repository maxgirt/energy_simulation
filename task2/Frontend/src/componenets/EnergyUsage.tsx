import { useEffect, useState } from 'react';
import { useSimulationData } from '../context';
import {  Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  
  // Register Chart.js components
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const EnergyUsage= () => {
    // const [dayEnergyUsage, setDayEnergyUsage] = useState<number[]>([]);
    // const [weekEnergyUsage, setWeekEnergyUsage] = useState<number[]>([]);
    const [monthEnergyUsage, setMonthEnergyUsage] = useState<number[]>([]);
    // const [yearEnergyUsage, setYearEnergyUsage] = useState<number[]>([]);
    const { simulationData } = useSimulationData();

    useEffect(() => {
        if (simulationData && simulationData.granular_data) {
            console.log("Starting to calculate energy usage");
            const granularData = simulationData.granular_data;
            // setDayEnergyUsage(aggregateByDay(granularData));
            // setWeekEnergyUsage(aggregateByWeek(granularData));
            setMonthEnergyUsage(aggregateByMonth(granularData));
            // setYearEnergyUsage(aggregateByYear(granularData));
        }
    }, [simulationData]);



    // function aggregateByDay(granularData: any) {
    //     let dailyAggregates = [];
    //     let dailySum = 0;
    //     for (let i = 0; i < granularData.length; i++) { // Each element is a tick
    //         // Use tick_energy_consumed instead of active_chargepoints
    //         dailySum += granularData[i].tick_energy_consumed;
    //         if ((i + 1) % 96 === 0) { // 96 ticks per day, assuming uniform distribution
    //             dailyAggregates.push(dailySum);
    //             dailySum = 0; // Reset for the next day
    //         }
    //     }
    //     // Handle the case where the last day does not have a full set of 96 ticks
    //     if (granularData.length % 96 !== 0) {
    //         dailyAggregates.push(dailySum); // Add the sum for the last, possibly incomplete, day
    //     }
    //     return dailyAggregates;
    // }

    // function aggregateByWeek(granularData: any) {
    //     let weeklyAggregates = [];
    //     let weeklySum = 0;
    //     for (let i = 0; i < granularData.length; i++) {
    //         weeklySum += granularData[i].tick_energy_consumed;
    //         if ((i + 1) % 672 === 0) { // 672 ticks per week, assuming uniform distribution
    //             weeklyAggregates.push(weeklySum);
    //             weeklySum = 0; // Reset for the next week
    //         }
    //     }
    //     // Handle the case where the last week does not have a full set of 672 ticks
    //     if (granularData.length % 672 !== 0) {
    //         weeklyAggregates.push(weeklySum); // Add the sum for the last, possibly incomplete, week
    //     }
    //     return weeklyAggregates;
    // }

    function aggregateByMonth(granularData: any) {
        let monthlyAggregates = [];
        let monthlySum = 0;
        for (let i = 0; i < granularData.length; i++) {
            monthlySum += granularData[i].tick_energy_consumed;
            if ((i + 1) % 2880 === 0) { 
                monthlyAggregates.push(monthlySum);
                monthlySum = 0; 
            }
        }
        // Handle the case where the last month does not have a full set of 2880 ticks
        if (granularData.length % 2880 !== 0) {
            monthlyAggregates.push(monthlySum); 
        }
        return monthlyAggregates;
    }

    // function aggregateByYear(granularData: any) {
    //     let yearlyAggregates = [];
    //     let yearlySum = 0;
    //     for (let i = 0; i < granularData.length; i++) {
    //         yearlySum += granularData[i].tick_energy_consumed;
    //         if ((i + 1) % 35040 === 0) { // 35040 ticks per year
    //             yearlyAggregates.push(yearlySum);
    //             yearlySum = 0; // Reset for the next year
    //         }
    //     }
    //     // Handle the case where the last year does not have a full set of 35040 ticks
    //     if (granularData.length % 35040 !== 0) {
    //         yearlyAggregates.push(yearlySum); 
    //     }
    //     return yearlyAggregates;
    // }
    
    //show energy usage over a monthly period via a bar chart

    const month_data = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May",  "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],

        datasets: [
            {
                label: "Energy Usage",
                data: monthEnergyUsage,
                fill: false,
                backgroundColor: "rgba(75,192,192,0.2)",
                borderColor: "rgba(75,192,192,1)",
            },
            ],
      }

      const options = {
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Energy Usage (kW)", 
              color: "#666"
            }
          },
          x: {
            title: { 
              display: true,
              text: "Month", 
              color: "#666", 
            }
          },
        },
        plugins: {
          legend: {
            display: false 
          },
          title: {
            display: true, 
            text: "Energy Usage per Month",
            color: "#666"
          }
        }
      };
            



    return (
        monthEnergyUsage.length > 0 ? <Bar data={month_data} options={options} /> : null

    )


  }

export default EnergyUsage