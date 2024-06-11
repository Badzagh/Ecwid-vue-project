
import axios from 'axios';
import Cookies from 'universal-cookie';

const apiUrl = "https://app.ecwid.com/api/v3/58958138";

type ConfigT = {
  method: "GET" | "POST" | "PUT" | "DELETE";
  url: string;
  data?: any;
  token?: string;
  headers: {
    'Accept-Language': string,
    Authorization?: string,
    'Content-Type'?: string
  };
};

export const makeHttpRequest = async (
  method: "GET" | "POST" | "PUT" | "DELETE",
  url: string,
  data?: any | null,
  token?: string | null,
  ContentType?: string | null,
  type?: string | null
) => {
  const cookies = new Cookies();
  const config: ConfigT = {
    method,
    url: `${apiUrl}${url}`,
    data,
    headers: {
      'Accept-Language': 'en'
    }
  };

  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`
    };
  }

  if (ContentType) {
    config.headers = {
      ...config.headers,
      'Content-Type': ContentType
    };
  }

  try {
    const response = await axios(config);
    if (response.data.data) {
      return response.data.data;
    } else {
      return response.data;
    }
  } catch (error: any) {
    throw new Error('An error occurred while making the request');
  }
};