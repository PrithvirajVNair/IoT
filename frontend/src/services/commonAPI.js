import axios from "axios";

const commonAPI = async (httpMethod, url, reqBody, reqHeader) => {
  const config = {
    method: httpMethod,
    url,
    data: reqBody,
    headers: reqHeader,
  };
  return await axios(config)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

export default commonAPI
