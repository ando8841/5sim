import React, { useEffect, useState } from 'react';
import {
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import { useCountries, useServices } from '../hooks';
import PriceList from './PriceList';

const getCountryNames = countries =>
  countries?.reduce((acc, item) => {
    acc[item.value] = item.label;
    return acc;
  }, {});

const Diagram = () => {
  const [service, setService] = useState('whatsapp');
  const [country, setCountry] = useState('');
  const [price, setPrice] = useState('');
  const [countriesNames, setCountriesNames] = useState('');

  const { data: countries } = useCountries();
  const { data: services, isFetching } = useServices();

  useEffect(() => {
    if (!countriesNames && countries) {
      const names = getCountryNames(countries);
      setCountriesNames(names);
    }
  }, [countries, countriesNames]);

  useEffect(() => {
    setPrice('');
  }, [country, service]);

  return (
    <Stack m={2} p={2} border={'1px dashed gray'} borderRadius={2}>
      <Typography variant="h5" gutterBottom>
        Диаграмма
      </Typography>

      {isFetching ? (
        <CircularProgress size={30} />
      ) : (
        <Stack gap={1} direction="row" pb={2} flexWrap="wrap">
          <FormControl sx={{ minWidth: 270 }}>
            <InputLabel>Сервис</InputLabel>
            <Select
              value={service}
              label="Сервис"
              onChange={e => setService(e.target.value)}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 400,
                  },
                },
              }}
            >
              {services?.map(service => (
                <MenuItem key={service} value={service}>
                  {service}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 270 }}>
            <InputLabel>Страна</InputLabel>
            <Select
              value={country}
              onChange={e => setCountry(e.target.value)}
              label="Страна"
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 400,
                  },
                },
              }}
            >
              {countries?.map(({ label, value }) => (
                <MenuItem key={value} value={value}>
                  {label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Цена</InputLabel>
            <Select
              label="Цена"
              value={price || ''}
              onChange={e => setPrice(e.target.value)}
            >
              <MenuItem value="10">&lt;10</MenuItem>
              <MenuItem value="20">&lt;30</MenuItem>
              <MenuItem value="50">&lt;50</MenuItem>
              <MenuItem value="100">&lt;100</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      )}

      {countriesNames && (
        <PriceList
          country={country}
          service={service}
          countriesNames={countriesNames}
          priceFilter={price}
        />
      )}
    </Stack>
  );
};

export default Diagram;
