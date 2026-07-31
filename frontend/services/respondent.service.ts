import api from "./api";
import {
  RespondentPagination,
  CreateRespondentRequest,
} from "@/types/respondent";

export async function getRespondents(
  page = 1,
  limit = 10,
  search = ""
): Promise<RespondentPagination> {
  const { data } = await api.get(
    `/respondents?page=${page}&limit=${limit}&search=${search}`
  );

  return data;
}

export async function createRespondent(
  payload: CreateRespondentRequest
) {
  const { data } = await api.post(
    "/respondents",
    payload
  );

  return data;
}

export async function updateRespondent(
  id: number,
  payload: CreateRespondentRequest
) {
  const { data } = await api.put(
    `/respondents/${id}`,
    payload
  );

  return data;
}