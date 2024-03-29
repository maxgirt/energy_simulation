import { Line } from 'react-chartjs-2';
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

  // This component is responsible for displaying the concurency bonus task 
  // I hardcoded the data for the chart based on the bonus_simulation.py output 
  // I use the regular simulation_py for the other data

const Bonus = () => {

    const chartData = {
        labels: Array.from({length: 100}, (_, i) => i + 1), // Creates an array of charge points from 1 to 100
        datasets: [{
            label: 'Concurrency',
            data: [
                100.0, 100.0, 100.0, 75.0, 80.0, 50.0, 57.14285714285714, 50.0, 55.55555555555556, 40.0,
                45.45454545454545, 41.66666666666667, 38.46153846153847, 42.857142857142854, 40.0, 37.5,
                35.294117647058826, 33.33333333333333, 36.84210526315789, 40.0, 28.57142857142857, 36.36363636363637,
                30.434782608695656, 29.166666666666668, 28.000000000000004, 34.61538461538461, 29.629629629629626,
                28.57142857142857, 31.03448275862069, 30.0, 32.25806451612903, 34.375, 24.242424242424242,
                26.47058823529412, 25.71428571428571, 25.0, 27.027027027027028, 26.31578947368421, 25.64102564102564,
                22.5, 31.70731707317073, 23.809523809523807, 23.25581395348837, 27.27272727272727, 22.22222222222222,
                26.08695652173913, 23.404255319148938, 22.916666666666664, 20.408163265306122, 24.0, 21.568627450980394,
                21.153846153846153, 18.867924528301888, 22.22222222222222, 20.0, 19.642857142857142, 21.052631578947366,
                20.689655172413794, 22.033898305084744, 21.666666666666668, 19.672131147540984, 19.35483870967742,
                20.634920634920633, 20.3125, 20.0, 18.181818181818183, 19.402985074626866, 20.588235294117645,
                18.84057971014493, 20.0, 19.718309859154928, 19.444444444444446, 17.80821917808219, 18.91891891891892,
                20.0, 19.736842105263158, 16.883116883116884, 17.94871794871795, 17.72151898734177, 18.75,
                17.28395061728395, 20.73170731707317, 16.867469879518072, 17.857142857142858, 17.647058823529413,
                18.6046511627907, 18.39080459770115, 18.181818181818183, 17.97752808988764, 18.88888888888889,
                17.582417582417584, 18.478260869565215, 17.20430107526882, 17.02127659574468, 16.842105263157894,
                17.708333333333336, 18.556701030927837, 19.387755102040817, 17.17171717171717, 18.0
            ],
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
        }]
    };

    const options = {
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Number of Charge Points'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Concurrency'
                }
            }
        }
    };
    


    return (
        <div>
           <Line data={chartData} options={options} />
        </div>
    )
}
export default Bonus;