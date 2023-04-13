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
  let uniqueAlchol: number;
  useEffect(() => {
    getChartData().then((response: Record<string, any>) => {
      alcoholData = [response[0].Alcohol];
      uniqueAlchol = response[0].Alcohol;
      response.forEach((data: Record<string, any>) => {
        flavanoidsData.push(data.Flavanoids);
        ashData.push(data.Ash);
        magnesuimData.push(data.Magnesium);
        uniqueAlchol !== data.Alcohol && alcoholData.push(data.Alcohol);
        uniqueAlchol = data.Alcohol;
      });

      setAlcohol(alcoholData);
      setMagnesium(magnesuimData);
      setFlavanoids(flavanoidsData);
      setAsh(ashData);
    });
  }, []);
  console.log(alcohol);

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
