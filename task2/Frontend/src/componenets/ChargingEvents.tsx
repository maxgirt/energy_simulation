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
  

//charigng events per year/month/week/day
//tick = 35040 
//day = 365
//week = 52
//month = 12

//im assuming that a charging event = active chargepoints in a tick

//I have commented out the code for charging events in a day, week and year
//I would like to have display all of them if I had more time.


const ChargingEvents = () => {
    // const [dayChargingEvents, setDayChargingEvents] = useState<number[]>([]);
    // const [weekChargingEvents, setWeekChargingEvents] = useState<number[]>([]);
    const [monthChargingEvents, setMonthChargingEvents] = useState<number[]>([]);
    // const [yearChargingEvents, setYearChargingEvents] = useState<number[]>([]);
    const { simulationData } = useSimulationData();


    useEffect(() => {
        if (simulationData && simulationData.granular_data) {
            console.log("Starting to calculate charging events");
            const granularData = simulationData.granular_data;
            // setDayChargingEvents(aggregateByDay(granularData));
            // setWeekChargingEvents(aggregateByWeek(granularData));
            setMonthChargingEvents(aggregateByMonth(granularData));
            // setYearChargingEvents(aggregateByYear(granularData));
        }
    }, [simulationData]);
        
    // useEffect(() => {
    //     console.log("TEST: ",  dayChargingEvents, weekChargingEvents, monthChargingEvents, yearChargingEvents);
    //   }, [dayChargingEvents, weekChargingEvents, monthChargingEvents, yearChargingEvents]);

    // function aggregateByDay(granularData: any) {
    //     let dailyAggregates = [];
    //     let dailySum = 0;
    //     for (let i = 0; i < granularData.length; i++) { 
    //       dailySum += granularData[i].active_chargepoints;
    //       if ((i + 1) % 96 === 0) { // 96 ticks per day
    //         dailyAggregates.push(dailySum);
    //         dailySum = 0; // Reset for the next day
    //       }
    //     }
    //     return dailyAggregates;
    //   }
    
    //   function aggregateByWeek(granularData: any) {
    //     let weeklyAggregates = [];
    //     let weeklySum = 0;
    //     for (let i = 0; i < granularData.length; i++) { 
    //       weeklySum += granularData[i].active_chargepoints;
    //       if ((i + 1) % 672 === 0) { // 672 ticks per week
    //         weeklyAggregates.push(weeklySum);
    //         weeklySum = 0; // Reset for the next week
    //       }
    //     }
    //     return weeklyAggregates;
    //   }

      function aggregateByMonth(granularData: any) {
        let monthlyAggregates = [];
        let monthlySum = 0;
        for (let i = 0; i < granularData.length; i++) { 
          monthlySum += granularData[i].active_chargepoints;
          if ((i + 1) % 2880 === 0) { // 2880 ticks per month
            monthlyAggregates.push(monthlySum);
            monthlySum = 0; // Reset for the next month
          }
        }
        return monthlyAggregates;
      }

      // function aggregateByYear(granularData: any) {
      //   let yearlyAggregates = [];
      //   let yearlySum = 0;
      //   for (let i = 0; i < granularData.length; i++) {
      //     yearlySum += granularData[i].active_chargepoints;
      //     if ((i + 1) % 35040 === 0) { // 35040 ticks per year
      //       yearlyAggregates.push(yearlySum);
      //       yearlySum = 0; // Reset for the next year
      //     }
      //   }
      //   return yearlyAggregates;
      // }
    
    //   const day_data = {
    //     labels: Array.from({length: 365}, (_, i) => i + 1).map((day, index) => index % 30 === 0 ? `Day ${day}` : ''),
    //     datasets: [
    //       {
    //         label: "Daily Charging Events",
    //         data: dayChargingEvents,
    //         fill: false,
    //         backgroundColor: "rgba(75,192,192,0.2)",
    //         borderColor: "rgba(75,192,192,1)",
    //         pointRadius: 0,
    //       },
    //     ],
    // };

    //create the data for the chart
      const month_data = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],

        datasets: [
            {
                label: "Charging Events",
                data: monthChargingEvents,
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
              text: "Charging Events",
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
            text: "Charging Events per Month",
            color: "#666"
          }
        }
      };
            
      return (
        monthChargingEvents.length > 0 ? <Bar data={month_data} options={options} /> : null
      )    
}

export default ChargingEvents