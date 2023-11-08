import fetchData from "@/utils/api/api";

export const getAllClocks = async () => {
  return await fetchData({url: 'clocks', method: 'GET' });
}

export const getClockById = async (id: string) => {
  return await fetchData({url: `clocks/${id}`, method: 'GET'});
}

export const verifyClockToken = async (params: {clockId: string, token: string}) => {
  return await fetchData({url: 'auth/verify-clock-token', method: "POST", body: params});
}

export const authenticate = async (params: {clockId: string, password: string}): Promise<{ token: string }> => {
  return await fetchData({url: `auth/clocks/${params.clockId}`, method: 'POST', body: {password: params.password}});
};

export const addTime = async (params: {clockId: string, token: string, addTime: number}) => {
  return await fetchData({url: `keyholder/clocks/${params.clockId}/add`, headers: {"Authorization": `Bearer ${params.token}`}, method: 'PUT', body: {addTime: params.addTime}});
};

export const subtractTime = async (params: {clockId: string, token: string, subtractTime: number}) => {
  return await fetchData({url: `keyholder/clocks/${params.clockId}/subtract`, headers: {"Authorization": `Bearer ${params.token}`}, method: 'PUT', body: {subtractTime: params.subtractTime}});
};

export const pauseClock = async (params: {clockId: string, token: string, paused: boolean}) => {
  return await fetchData({url: `keyholder/clocks/${params.clockId}/pause`, headers: {"Authorization": `Bearer ${params.token}`}, method: 'PUT', body: {pause: !params.paused}});
};

export const deleteClock = async (params: {clockId: string, token: string}) => {
  return await fetchData({url: `keyholder/clocks/${params.clockId}`, headers: {"Authorization": `Bearer ${params.token}`}, method: 'DELETE'});
};

export const createNewClock = async (params: { endTime: number, description: string, username: string, password: string })=> {
  return await fetchData({ url: 'clocks', method: 'POST', body: params });
}