import React from 'react';
import './App.css';
import mockData from "./mockData/mockData.json"
import Chart from './component/chart/Chart';
import HomePage from './pages/HomePage';

function App() {
  let xAxisData = [mockData[0].Alcohol];
  let yAxisData: Array<any> = [];
  let xAxisDataTwo: Array<any> = [];
  let yAxisDataTwo: Array<any> = [];
  let uniqueAlchol = mockData[0].Alcohol;
  mockData.forEach((data)=>{
    if(data.Flavanoids < '1')console.log('Flavanoids==',data.Flavanoids, 'Ash==', data.Ash);
    xAxisDataTwo.push(data.Flavanoids)
    yAxisDataTwo.push(data.Ash)
    yAxisData.push(data.Magnesium);
    uniqueAlchol !== data.Alcohol &&
      xAxisData.push(data.Alcohol)
      uniqueAlchol = data.Alcohol
  })
  
  return (
    <>
      <HomePage />
    </>
  );
}

export default App;
