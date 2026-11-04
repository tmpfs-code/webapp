import { Box, Button, TextField, Typography } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { redeemPromoCode } from '../../promo';

function PromoCodeField({uploadOpts, disabled, onBusy, onRedeemed}) {
  const { t } = useTranslation();
  const [ expanded, setExpanded ] = React.useState(false);
  const [ code, setCode ] = React.useState('');
  const [ busy, setBusyFn ] = React.useState(false);
  const [ error, setError ] = React.useState(null);
  const setBusy = (val) => { setBusyFn(val); onBusy(val); };

  async function applyCode() {
    if (!code.trim() || busy) return;

    setBusy(true);
    setError(null);

    try {
      const resp = await redeemPromoCode({code, uploadPriceReq: uploadOpts});
      onRedeemed(resp.id);
    } catch (err) {
      console.error(err);
      setError(t('invalid_promo_code'));
      setBusy(false);
    }
  }

  if (!expanded) {
    return <Box mt={1}>
      <Typography
        variant="body2"
        color="textSecondary"
        style={{cursor: "pointer", textDecoration: "underline"}}
        onClick={() => setExpanded(true)}
      >
        {t('have_promo_code')}
      </Typography>
    </Box>;
  }

  return <Box mt={1} display="flex" alignItems="flex-start" justifyContent="center" flexWrap="wrap">
    <TextField
      size="small"
      autoFocus
      disabled={disabled || busy}
      placeholder={t('promo_code_placeholder')}
      value={code}
      error={!!error}
      helperText={error || ''}
      onChange={e => { setCode(e.target.value); setError(null); }}
      onKeyDown={e => { if (e.key === 'Enter') applyCode(); }}
      style={{marginRight: "0.5em"}}
    />
    <Button
      disabled={disabled || busy || !code.trim()}
      onClick={applyCode}
      color="primary"
    >
      {t('redeem')}
    </Button>
  </Box>;
}

export default PromoCodeField;
