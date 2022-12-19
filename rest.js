import axios from 'axios';


export const apiUrlPrefix = `https://my-json-server.typicode.com`;


const instance = axios.create({
  baseURL: apiUrlPrefix,
  headers: {
    // Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
});


// I commented out the console logs since it makes the terminal dirty on Jest

export const get = async (path, params, config = null) => {
//   instance.defaults.headers.common[
//     'Authorization'
//   ] = `Bearer ${localStorage.getItem('token')}`;

  return await instance
    .get(path, params)
    .then((response) => {
      // console.log('GET RESPONSE', response);
      return { ...response, error: null };
    })
    .catch((error) => {
      // console.log('GET ERROR', error.response);
      return { data: null, error: error.response };
    });
};

export const post = async (path, body, config) => {
//   instance.defaults.headers.common[
//     'Authorization'
//   ] = `Bearer ${localStorage.getItem('token')}`;

  return await instance
    .post(path, body || {}, config)
    .then((response) => {
      // console.log('POST RESPONSE', response);
      return { data: response, error: null };
    })
    .catch((error) => {
      // console.log('POST ERROR', error.response);
      return { data: null, error: error };
    });
};

export const put = async (path, body, config) => {
//   instance.defaults.headers.common[
//     'Authorization'
//   ] = `Bearer ${localStorage.getItem('token')}`;

  return await instance
    .put(path, body || {}, config)
    .then((response) => {
      // console.log('PUT RESPONSE', response);
      return { data: response, error: null };
    })
    .catch((error) => {
      // console.log('PUT ERROR', error.response);
      return { data: null, error: error };
    });
};

export const patch = async (path, body, config)=> {
//   instance.defaults.headers.common[
//     'Authorization'
//   ] = `Bearer ${localStorage.getItem('token')}`;

  return await instance
    .patch(path, body || {}, config)
    .then((response) => {
      // console.log('PUT RESPONSE', response);
      return { data: response, error: null };
    })
    .catch((error) => {
      // console.log('PUT ERROR', error.response);
      return { data: null, error: error };
    });
};

export const _delete = async (path, data) => {
//   instance.defaults.headers.common[
//     'Authorization'
//   ] = `Bearer ${localStorage.getItem('token')}`;

  instance.defaults.data = { data };

  return await instance
    .delete(path, { data })
    .then((response) => {
      // console.log('DELETE RESPONSE', response);
      return { data: response, error: null };
    })
    .catch((error) => {
      // console.log('DELETE ERROR', error.response);
      return { data: null, error: error };
    });
};

export const destroy = (path, config) => {
//   instance.defaults.headers.common[
//     'Authorization'
//   ] = `Bearer ${localStorage.getItem('token')}`;

  return instance.delete(path, config);
};
