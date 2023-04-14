import React, { useEffect, useState } from "react";
import Chart from "../component/chart/Chart";
import { getChartData } from "../service/chartData";

const HomePage = () => {
  const [alcohol, setAlcohol] = useState<Array<number>>([]);
  const [magnesium, setMagnesium] = useState<Array<number>>([]);
  const [flavanoids, setFlavanoids] = useState<Array<number>>([]);
  const [ash, setAsh] = useState<Array<number>>([]);
  let alcoholData: Array<number> = [];
  let magnesuimData: Array<number> = [];
  let flavanoidsData: Array<number> = [];
  let ashData: Array<number> = [];
  const minAlcoholMagnesium: Record<any, any>= {};

  const getAlcholoToMagnesiumData = (response: Array<object>) => {
    response.forEach((obj: Record<string, any>) => {
      if(minAlcoholMagnesium.hasOwnProperty(obj.Alcohol)) {
        if(obj.Magnesium < minAlcoholMagnesium[obj.Alcohol]) {
          minAlcoholMagnesium[obj.Alcohol] = obj.Magnesium;
        }
      } else {
        minAlcoholMagnesium[obj.Alcohol] = obj.Magnesium;
      }
    });
    return getDataInArray(minAlcoholMagnesium);
  };

  const getDataInArray = (data: object) => {
    Object.entries(data).forEach(([key, value]: Array<number>)=> {
      alcoholData.push(key)
      magnesuimData.push(value)
    })
  }

  const getFlavanoidsToAshData = (response: Array<object>) => {
    response.forEach((data: Record<string, any>) => {
      flavanoidsData.push(data.Flavanoids);
      ashData.push(data.Ash);
    });
  } 

  useEffect(() => {
    getChartData().then((response: Array<Record<string, any>>) => {
      getAlcholoToMagnesiumData(response);
      getFlavanoidsToAshData(response);
      setAlcohol(alcoholData);
      setMagnesium(magnesuimData);
      setFlavanoids(flavanoidsData);
      setAsh(ashData);
    });
  }, []);
  
  const alcoholMagnesiumChart = {
    title: {
      text: "Alcohol to Magnesium",
      x: "center",
    },
    xAxis: {
      type: "category",
      nameLocation: "center",
      nameTextStyle: {
        lineHeight: 35,
      },
      axisLabel: {
        formatter: "{value}",
        align: "center",
      },
      name: "Alcohol",
      data: alcohol,
    },
    yAxis: {
      type: "value",
      axisLabel: {
        formatter: "{value}",
        align: "right",
      },
      name: "Magnesium",
    },
    series: [
      {
        data: magnesium,
        type: "bar",
      },
    ],
  };

  const flavanoidsAshChart = {
    title: {
      text: "Flavanoids to Ash",
      x: "center",
    },
    xAxis: {
      name: "Flavanoids",
      nameLocation: "center",
      nameTextStyle: {
        lineHeight: 35,
      },
      type: "category",
      axisLabel: {
        formatter: "{value}",
        align: "center",
      },
      data: flavanoids,
    },
    yAxis: {
      name: "Ash",
      axisLabel: {
        formatter: "{value}",
        align: "right",
      },
      type: "value",
    },
    series: [
      {
        data: ash,
        type: "line",
      },
    ],
  };

  return (
    <div className="chart-container">
      <Chart data={alcoholMagnesiumChart} />
      <Chart data={flavanoidsAshChart} />
    </div>
  );
};

export default HomePage;
