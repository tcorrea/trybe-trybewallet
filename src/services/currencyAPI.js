const getQuoteCurrencyFromAPI = async () => {
  const endpoint = 'https://economia.awesomeapi.com.br/json/all';
  const response = await fetch(endpoint);
  const json = await response.json();
  return json;
  // return response.ok ? Promise.resolve(json) : Promise.reject(json);
};
export default getQuoteCurrencyFromAPI;
