import api from "./api";

export async function getUsers(
    page = 1,
    limit = 10,
    search = ""
) {
    console.log("CALL GET USERS");

    const { data } = await api.get(
        `/users?page=${page}&limit=${limit}&search=${search}`
    );

    return data;
}

export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
  role: "ADMIN" | "OPERATOR";
}

export async function createUser(
  payload: CreateUserRequest
) {
  const { data } = await api.post("/users", payload);

  return data;
}

export interface UpdateUserRequest {
  name: string;
  email: string;
  role: "ADMIN" | "OPERATOR";
  status: boolean;
}

export async function updateUser(
  id: number,
  payload: UpdateUserRequest
) {
  const { data } = await api.put(
    `/users/${id}`,
    payload
  );

  return data;
}

export async function deleteUser(id: number) {
  const { data } = await api.delete(`/users/${id}`);

  return data;
}