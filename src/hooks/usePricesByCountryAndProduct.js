import { useQuery } from 'react-query';
import { getPricesByCountryAndProduct } from '../api';

export const usePricesByCountryAndProduct = (
  country = 'any',
  product = 'any'
) =>
  useQuery(
    ['pricesByCountryAndProduct', country, product],
    () => getPricesByCountryAndProduct(country, product),
    {
      keepPreviousData: true,
      select: data => {
        if (!data) {
          return [];
        }
        const result = [];
        for (const countryValue of Object.values(data)) {
          for (const [country, operators] of Object.entries(countryValue)) {
            for (const [name, operatorData] of Object.entries(operators)) {
              result.push({
                country,
                name,
                key: `${country}${name}${operatorData.count}`,
                ...operatorData,
              });
            }
          }
        }
        return result;
      },
    }
  );
