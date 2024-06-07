
import axios from 'axios';
import Cookies from 'universal-cookie';

const apiUrl = "https://app.ecwid.com/api/v3/58958138";

export const makeHttpRequest = async (
  method,
  url,
  data = null,
  token = null,
  ContentType = null,
  type = null
) => {
  const cookies = new Cookies();
  const config = {
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
  } catch (error) {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          cookies.remove('token');
          break;
        default:
          throw new Error('Unhandled error status');
      }
    } else {
      throw new Error('An error occurred while making the request');
    }
  }
};