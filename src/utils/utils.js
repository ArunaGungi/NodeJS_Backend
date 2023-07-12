const SUCCESS_MESSAGE = (code, message, response) => {
  const data = {
    Code: code,
    Message: message,
    status: "success",
    response: response,
  };
  return data;
};

const ERROR_MESSAGE = (code, message, response) => {
  const data = {
    Code: code,
    Message: message,
    status: "failure",
    response: response,
  };
  return data;
};

module.exports = { SUCCESS_MESSAGE, ERROR_MESSAGE };
