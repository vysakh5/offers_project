import Cookie from 'js-cookie';

import CONFIG from './config';

const axios = require('axios').default;

const getToken = () => {
  const token = Cookie.get(CONFIG.COOKIETOKEN)
    ? Cookie.get(CONFIG.COOKIETOKEN)
    : null;

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  if (token === null) return null;
  else return config;
};

export const verifyToken = async () => {
  let token = getToken();
  if (token === null) {
    return {
      auth: false,
      msg: 'No Token Found',
    };
  }
  let response = await axios
    .get(`${CONFIG.BASE_URL}/auth/verify`, token)
    .catch(function (error) {
      console.log(error);
    });

  try {
    if (response) {
      if (response.data.verified && !response.data.error) {
        return {
          auth: true,
          role: response.data.role,
        };
      }
    } else {
      return {
        auth: false,
        role: null,
      };
    }
  } catch (error) {
    return {
      auth: false,
      role: null,
    };
  }
};

export const Login = async (userCreadential) => {
  let response = await axios
    .post(`${CONFIG.BASE_URL}/auth/signin`, userCreadential)
    .catch(function (error) {
      console.log(error);
      return error;
    });
  try {
    if (response.data.statusCode === 200 && response.data.auth) {
      Cookie.set(CONFIG.COOKIETOKEN, response.data.token);
      Cookie.set(CONFIG.USERDATA, response.data.data);

      console.log('-- Authenticated! --');
      return response.data;
    } else if (response.data.statusCode === 404) {
      return response.data;
    } else {
      return {
        msg: 'Something went wrong !',
        error: true,
      };
    }
  } catch (error) {
    return {
      msg: '404 Not Found!',
      error: true,
    };
  }
};

export const getRequest = async (url) => {
  let response = await axios
    .get(`${CONFIG.BASE_URL}/${url}`)
    .catch(function (error) {
      console.log(error);
      return {
        error: true,
        data: error,
      };
    });

  try {
    if (response) {
      return {
        error: false,
        data: response.data,
      };
    } else {
      return {
        error: true,
        data: null,
      };
    }
  } catch (error) {
    return {
      error: true,
      data: null,
    };
  }
};

export const postRequest = async ({ data, url }) => {
  let token = getToken();

  if (token === null) {
    return {
      auth: false,
      msg: 'No Token Found',
      error: true,
    };
  }

  const formdata = new FormData();
  formdata.append('title', data.title);
  formdata.append('url', data.url);
  formdata.append('fromDate', data.fromDate);
  formdata.append('toDate', data.toDate);
  formdata.append('position', data.position);
  formdata.append('desktopImg', data.desktopImg);
  formdata.append('mobImg', data.mobImg);
  // formdatadata.append("image", e.target.files[0]);
  let response = await axios
    .post(`${CONFIG.BASE_URL}/${url}`, formdata, token)
    .catch(function (error) {
      console.log(error);
      return {
        error: true,
        data: error,
      };
    });
  console.log(response, '❌💥❤');
  // return response;
  try {
    if (response) {
      if (response.data && !response.data.error) {
        return {
          error: false,
          data: response.data,
        };
      } else {
        return {
          error: true,
          data: response.data,
        };
      }
    } else {
      return {
        error: true,
        data: null,
      };
    }
  } catch (error) {
    return {
      error: true,
      data: null,
    };
  }
};

export const patchRequest = async ({ data, url }) => {
  let token = getToken();

  if (token === null) {
    return {
      auth: false,
      msg: 'No Token Found',
      error: true,
    };
  }
  let response = await axios
    .patch(`${CONFIG.BASE_URL}/${url}`, data, token)
    .catch(function (error) {
      console.log(error);
      return {
        error: true,
        data: error,
      };
    });

  console.log(response, '❌💥❤');
  // return response;
  try {
    if (response) {
      if (response.data && !response.data.error) {
        return {
          error: false,
          data: response.data,
        };
      } else {
        return {
          error: true,
          data: response.data,
        };
      }
    } else {
      return {
        error: true,
        data: null,
      };
    }
  } catch (error) {
    return {
      error: true,
      data: null,
    };
  }
};

export const deleteRequest = async (url) => {
  let token = getToken();

  if (token === null) {
    return {
      auth: false,
      msg: 'No Token Found',
      error: true,
    };
  }
  let response = await axios
    .delete(`${CONFIG.BASE_URL}/${url}`, token)
    .catch(function (error) {
      console.log(error);
      return {
        error: true,
        data: error,
      };
    });

  try {
    if (response) {
      return {
        error: false,
        data: response.data,
      };
    } else {
      return {
        error: true,
        data: null,
      };
    }
  } catch (error) {
    return {
      error: true,
      data: null,
    };
  }
  if (response) {
    if (response.data.verified && !response.data.error) {
      return {
        auth: true,
        role: response.data.role,
      };
    }
  }

  //console.log(response);
};
