import { $http, $httpcamera } from "@/http/ofetch";

export const loginApi = async (data: any) => {
  return $http('/api/login/', {
    method: 'POST',
    body: data,
  });
}
export const registerApi = async (data: any) => {
  return $http('/api/register/', {
    method: 'POST',
    body: data,
  });
}


export const updateActiveGPLX = async (userId: number) => {
  return $http(`/api/users/${userId}/`, {
    method: 'PUT',
    body: { 
      is_gplx: true,
     }
  });
  }
export const updateActiveBHYT = async (userId: number) => {
  return $http(`/api/users/${userId}/`, {
    method: 'PUT',
    body: { 
      is_bhyt: true,
     }
  });
  }

  export const updloadImages = async (data: any) => {
    return $httpcamera('/process-image', {
      method: 'POST',
      body: data,
    });
}