import { Doughnut, Pie } from "react-chartjs-2";
import "chart.js/auto";

const TeethObject = ({topTeeth, bottomTeeth, leftTeeth, rightTeeth, middleTeeth, small, ...rest}) => {
  const data = {
    labels: [],
    datasets: [
      {
        data: [25, 25, 25, 25], 
        backgroundColor: [rightTeeth, bottomTeeth, leftTeeth, topTeeth], 
      },
    ],
  };

  const data2 = {
    labels: [],
    datasets: [
      {
        data: [100], 
        backgroundColor: [middleTeeth], 
        borderWidth: 0,
      },
    ],
  };

  const options = {
    rotation: 45,
    plugins: {
      legend: {
        display: false,
      },

      tooltip: {
        enabled: false,
      },
    },

    hover: {
      mode: null,
    },
  }; // small = 48, large = 80 small ? " " : " "

  return (
    <div className="relative ml-12 hover:cursor-pointer" {...rest}>
      <div className={`absolute z-3`}> 
        <Pie data={data2} options={options} style={{width: small ? "48px" : "80px", height: small ? "48px" : "80px"}} />
      </div>
      <div className={`absolute z-1`} style={{width: small ? "48px" : "80px", height: small ? "48px" : "80px"}}>
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

export default TeethObject;
