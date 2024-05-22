import {useQuery} from 'react-query';
import {getCountries} from "../api";


export const useCountries = () =>
    useQuery('countries', () => getCountries(), {
        keepPreviousData: true,
        select: (countries) => Object.entries(countries)
            .map(([key, value]) => ({value: key, label: value.text_ru}))
    });




