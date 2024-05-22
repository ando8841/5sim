import axios from "axios";

const fetchData = async (url) => (await axios.get(url)).data;

export const getCountries = () => fetchData('https://5sim.biz/v1/guest/countries');

export const getPricesByCountryAndProduct = (country, product) => fetchData(`https://5sim.biz/v1/guest/prices?country=${country}&product=${product}`);

export const getServices = () => fetchData(`https://5sim.biz/v1/guest/products/any/any`);


