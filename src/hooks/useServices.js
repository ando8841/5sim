import {useQuery} from 'react-query';
import {getServices} from "../api";

export const useServices = () =>
    useQuery('services', () => getServices(), {
        keepPreviousData: true,
        select:(data) => Object.keys(data)
    });




