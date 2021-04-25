import { makeStyles, MenuItem, Select, Tooltip, Typography } from "@material-ui/core";
import React from 'react';
import { useTranslation } from 'react-i18next';
import { SUPPORTED_CURRENCIES } from '../../constants';

const useStyles = makeStyles(theme => ({
  currencySelect: {
    marginLeft: "0.5em",
    marginRight: "0.5em",
    paddingRight: "0.15em",
    color: theme.palette.text.secondary,
  },
}));

function formatUSD(value) {
  let s = parseFloat(parseFloat(value).toFixed(4));
  return `${s} USD`;
};

function CurrencySelect({disabled, price, onChange}) {
  const classes = useStyles();
  const { t } = useTranslation();
  const formatCurrSymbol = (s) => `${s}`.toUpperCase();

  return <React.Fragment>
    {price.isFetching 
      ?
      <Typography display="inline" color="textSecondary">
        {t('loading_price')}
      </Typography>      
      :
      <Tooltip title={<span>1 {formatCurrSymbol(price.s)} = {price.c} USD</span>} placement="left">
        <Typography display="inline" color="textPrimary" style={{userSelect: "text"}}>
          {t('pay')} {formatUSD(price.u)} = {price.n} 
        </Typography>
      </Tooltip>
    }
  
    {price.s 
      ?
      <Select value={price.s}
        disabled={disabled}
        className={classes.currencySelect}
        onChange={e => onChange(e.target.value)}>
        {SUPPORTED_CURRENCIES.map(curr =>
          <MenuItem value={curr} key={curr}>
            {formatCurrSymbol(curr)}
          </MenuItem>
        )}
      </Select>
      :
      <Select
        value="dots"
        disabled={true}
        className={classes.currencySelect}>
        <MenuItem value="dots">
          ...
        </MenuItem>
      </Select>
    }

  </React.Fragment>;
}

export default CurrencySelect;
