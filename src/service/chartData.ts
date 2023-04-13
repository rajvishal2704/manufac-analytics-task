import { AlcoholInfo } from "../interface/serviceInterface";
import mockData from "../mockData/mockData.json";

export const getChartData = async (): Promise<AlcoholInfo[]> => {
    return Array.from(mockData).map(e => e as AlcoholInfo);
}

