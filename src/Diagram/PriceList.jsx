import React, {useState} from 'react';
import {
    Chip, CircularProgress,
    IconButton,
    LinearProgress, List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    Stack,
    Typography
} from "@mui/material";
import {
    MailOutline as MailOutlineIcon,
    Refresh as RefreshIcon,
    ShoppingBasket as ShoppingBasketIcon
} from "@mui/icons-material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import PropTypes from "prop-types";
import {usePricesByCountryAndProduct} from "../hooks/index.js";

function filterPriceAndQuantity(arr, minQuantity , maxPrice = null) {
    return arr?.filter(item => {
        let quantityCondition = true;
        let priceCondition = true;

        if (minQuantity) {
            quantityCondition = item.count > 0;
        }

        if (maxPrice !== '') {
            priceCondition = +item.cost <= +maxPrice;
        }

        return quantityCondition && priceCondition;
    });
}

const PriceList = ({country, countriesNames, service, priceFilter}) => {
    const [checked, setChecked] = useState(false);
    const {data: prices, refetch, isFetching} = usePricesByCountryAndProduct(country, service);
    const filteredPrices = filterPriceAndQuantity(prices, checked, priceFilter);
    const handleClick = () => setChecked(!checked);
    return (
        <>
            <Stack gap={1} direction='row' pb={2} flexWrap='wrap' justifyContent={'space-between'}>
                <Stack direction='row' gap={1} flexWrap='wrap'>
                    <Chip icon={<MailOutlineIcon/>} label="Доставка СМС (%)" color="primary"/>
                    <Chip icon={<MailOutlineIcon/>} label="Цена номера (₽)" color="secondary"/>

                </Stack>

                <Stack direction='row' gap={1}>
                    {isFetching && <CircularProgress size={30} />}
                    <Chip
                        label="В наличии"
                        icon={checked ? <CheckCircleIcon/> : <RadioButtonUncheckedIcon/>}
                        onClick={handleClick}
                        color={checked ? "info" : "default"}
                    />
                    <IconButton size='small' sx={{
                        backgroundColor: '#daeeff',
                        '&:hover': {
                            backgroundColor: '#b8defa'
                        }
                    }} onClick={refetch}>
                        <RefreshIcon color="info"/>
                    </IconButton>
                </Stack>
            </Stack>
            <List>
                {filteredPrices?.length ?  filteredPrices.map(({key, country: priceCountry, count, rate, cost, name}) => (
                    <ListItem key={key} sx={{border: '1px solid #7b97a8', borderRadius: 2, margin: 1}}>
                        <ListItemText
                            primary={country ? countriesNames[country] : countriesNames[priceCountry]}
                            secondary={<>
                                {name}{' '}
                                <Typography
                                    component="span"
                                    variant="body2"
                                    color={count < 10 ? 'error' : 'textSecondary'}
                                >
                                    {count} шт
                                </Typography>
                            </>}
                        />
                        <ListItemSecondaryAction style={{width: '50%', display: 'flex', alignItems: 'center'}}>
                            <Stack p={'5px'} border={'1px solid #7b97a8'} borderRadius={2} direction="column"
                                   spacing={1}
                                   flexGrow={1} marginRight={1}>
                                <Stack direction="row" alignItems="center" spacing={1}>
                                    <LinearProgress variant="determinate" value={rate || 0} sx={{
                                        flexGrow: 1,
                                        height: 10,
                                        borderRadius: ' 0 10px 10px 0'
                                    }}/>
                                    <Typography variant="body2" color="textSecondary">
                                        {rate || 0}%
                                    </Typography>
                                </Stack>

                                <Stack direction="row" alignItems="center" spacing={1}>
                                    <LinearProgress color='secondary' variant="determinate" value={cost}
                                                    sx={{
                                                        flexGrow: 1,
                                                        height: 10,
                                                        borderRadius: ' 0 10px 10px 0'
                                                    }}/>
                                    <Typography variant="body2" color="textSecondary">
                                        {cost}₽
                                    </Typography>
                                </Stack>
                            </Stack>
                            <IconButton disabled={count === 0}>
                                <ShoppingBasketIcon/>
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                )) : <span>empty..</span>}
            </List>
        </>
    );
}

export default PriceList;

PriceList.propTypes = {
    country: PropTypes.string,
    service: PropTypes.string,
    priceFilter: PropTypes.string,
    countriesNames: PropTypes.objectOf(PropTypes.string)
};