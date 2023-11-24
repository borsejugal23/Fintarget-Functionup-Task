import './App.css';
import { useState, useEffect, useRef } from 'react'
import ReactApexChart from 'react-apexcharts'
import Navbar from "./components/Navbar"



function App() {

  const [data, setdata] = useState({});
  const [minData, setMinData] = useState([]);

  const ref = useRef("Nifty")

  const options = {
    chart: {
        type: "candlestick",
    },
    title: {
        text: `${ref.current.instrument || "Nifty"} stock`,
        align: "left",
    },
    xaxis: {
        type: "datetime",
    },
    yaxis: {
        tooltip: {
            enabled: true,
        },
    },
};

  useEffect(() => {
    const socket = new WebSocket('wss://functionup.fintarget.in/ws?id=fintarget-functionup');

    socket.addEventListener('message', (event) => {
        const message = JSON.parse(event.data);
        if (typeof message === 'object') {
          setdata(message);
        }
    });

    socket.addEventListener('error', (event) => {
         console.error('WebSocket error:', event);
    });

    return () => {
       socket.close();
      };
    }, []);

   const timestamp = new Date().getTime();


   useEffect(()=> {
      let impValue = []
      impValue.push(data[ref.current.instrument])
      const id = setInterval(() => {
          oneMinFn(impValue)
        },1000)

        return () => {
          clearInterval(id)
        }
    },[timestamp])

   const oneMinFn = (impValue) => {
    let max = -Infinity
    let min = Infinity

   for(let i=0;i<4;i++){
       if(max<impValue[i]){
         max=impValue[i]
       }
       if(min>impValue[i]){
         min=impValue[i]
       }
   }
    let newdata = [impValue[0],max,min,impValue[impValue.length-1]]
    let obj = {
        "x":new Date(timestamp).getTime(),
        "y":newdata
     }
    setMinData([...minData,obj])
    impValue = []
   }

   const filterInst = (value) => {
     ref.current = value
   }
  return (
    <div className="App">
         <Navbar
            data={data}
            filterInst={filterInst}
          />
          <br></br>
          <br></br>
         <div
          style={{ width: "100vh", height: "100%", margin:"auto"}}>
              <ReactApexChart
                  options={options}
                  series={[{"data": minData}]}
                  type="candlestick"
              />
         </div>
    </div>
  );
}

export default App;
