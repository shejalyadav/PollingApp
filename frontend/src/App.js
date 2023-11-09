import { useEffect, useState } from "react";
import "./App.css";
import PieChart from "./components/PieChart";

function App() {
  const [loading, setLoading] = useState(true);
  let [question, setQuestion] = useState({});
  const [options, setOptions] = useState([]);
  const [myData, setMyData] = useState({})
  const request1 = fetch('http://localhost:1234/api/6533c7f51abc2cb921aed63d/showQuestion').then(response => response.json());
  const request2 = fetch('http://localhost:1234/api/6533c7f51abc2cb921aed63d/showOptions').then(response => response.json());
  useEffect(() => {
    Promise.all([request1, request2])
      .then(([data1, data2]) => {
        setQuestion(data1);
        setOptions(data2);
        setLoading(false);


      })
      .catch(error => {
        console.error(error);
      });


      
    setMyData({
      labels: options?.map((o) => (o.title)),
      datasets: [
        {
          label: 'Votes',
          data: options?.map((o) => (o.votes)),
          backgroundColor: [
            'rgba(255, 26, 104, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(153, 102, 255, 0.5)',
            'rgba(255, 159, 64, 0.5)',
            'rgba(0, 0, 0, 0.5)'
          ],
          borderColor: [
            'rgba(255, 26, 104, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(0, 0, 0, 1)'
          ],
          borderWidth: 1
        },
      ]

    })


    console.log(options?.map((o) => (o.title)))
  }, []);





  // QUESTION


  // useEffect(() => {
  //   fetch("http://localhost:1234/api/6533c4490e9c16c7171df789/showQuestion")
  //     .then(response => response.json())
  //     .then(data => {
  //       setQuestion(data);
  // setLoading(false);
  //     }

  //     )
  // }, []);



  // //OPTIONS


  // useEffect(() => {
  //   fetch("http://localhost:1234/api/6533c4490e9c16c7171df789/showOptions")
  //     .then(response => response.json())
  //     .then(data => {
  //       setOptions(data);
  //       setLoading(false);
  //     })
  // }, []);





  if (loading) {
    return (
      <div>Loading...</div>
    )
  }

  return (
    <div className="App">
      <div className="Chart-heading">{question.title}</div>
      {/* <div>{console.log(Array.isArray(options?.map((o) => (o.title)))) }</div> */}
      {console.log(options?.map((o) => (o.title)))}
      


      
      <div className="chart" style={{ width: 600 }}>
        <PieChart chartData={myData} />
      </div>
    </div>
  );
}

export default App;
