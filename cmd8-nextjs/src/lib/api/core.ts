import axios, { AxiosInstance } from "axios";
import { useQuery, UseQueryResult } from "react-query";

import { IAiTool } from "../../interfaces/main";

const HOST = "http://127.0.0.1:8000";

const API: AxiosInstance = axios.create({
  baseURL: `${HOST}/core`,
});

export const getAllAITools = async (): Promise<IAiTool[]> => {
  const response = await API.get<IAiTool[]>("/aitool/all/");
  return response.data;
};

export const getAItool = async (id: string): Promise<IAiTool> => {
  const { data } = await API.get<IAiTool>(`/aitool/${id}/`);
  return data;
};

export const createAItool = async (tool: IAiTool): Promise<IAiTool> => {
  const { data } = await API.post<IAiTool>("/aitool/", tool);
  return data;
};

export function useAllAItools(): UseQueryResult<IAiTool[], Error> {
  // return useQuery("allAItools", getAllAItools, {
  //   staleTime: 1000 * 60, // 1분 동안 캐시된 데이터 사용
  //   cacheTime: 1000 * 60 * 10, // 10분 동안 데이터 캐싱
  // });
  return useQuery("allAItools", getAllAITools);
}

export function useAItool(id: string): UseQueryResult<IAiTool, Error> {
  return useQuery(["AItool", id], () => getAItool(id));
}
