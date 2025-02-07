import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import {
  TCityItem,
  TDistrictItem,
  TDistrictPayload,
  UseQueryOptions,
} from '@/types';
import { AxiosResponse } from 'axios';

const getCities = async (): Promise<TCityItem[]> => {
  const response: AxiosResponse<string> = await axios.get(
    'https://api.nlsc.gov.tw/other/ListCounty'
  );
  const xmlString = response.data;
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
  const countyItems = xmlDoc.getElementsByTagName('countyItem');
  // 將每個 countyItem 元素轉換為物件，並存儲到陣列中
  const countyList = Array.from(countyItems, (countyItem) => ({
    countyName: countyItem.querySelector('countyname')?.textContent,
    countyCode: countyItem.querySelector('countycode01')?.textContent,
  })) as TCityItem[];
  return countyList;
};

export const useCitiesQueries = () => {
  return useQuery({
    queryKey: ['cityList'],
    queryFn: getCities,
  });
};

const getDistricts = async (
  params: TDistrictPayload
): Promise<TDistrictItem[]> => {
  const { countyCode } = params;
  const response: AxiosResponse<TDistrictItem[]> = await axios.get(
    `https://api.nlsc.gov.tw/other/ListTown1/${countyCode}`
  );
  return response.data;
};

export const useDistrictsQuery = ({
  params,
  reactQuery = {},
}: {
  params: TDistrictPayload;
  reactQuery?: UseQueryOptions<TDistrictItem[]>;
}) => {
  return useQuery({
    queryKey: ['districtList', params],
    queryFn: () => getDistricts(params),
    ...reactQuery,
  });
};
