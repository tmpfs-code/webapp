import PaymentIcon from '@material-ui/icons/Payment';
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import { InjectedConnector, NoEthereumProviderError, UserRejectedRequestError } from '@web3-react/injected-connector';
import React from 'react';
import { Beforeunload } from 'react-beforeunload';
import { useTranslation } from 'react-i18next';
import Web3 from "web3";
import { SUPPORTED_CHAIN_IDS } from '../../constants';
import { buildPaymentRequest, doPayment, paymentNotVerifiedError, sendPaymentRequest, verifyPayment } from '../../payments';
import ErrorDialog from "../ErrorDialog";
import RoundBtn from '../shared/RoundBtn';

const web3NotActiveError = "web3 not active";
const web3AccountChangedError = "account changed";

function connect(web3react) {
  const web3 = new Web3(web3react.library.provider);

  return {
    web3: web3,
    account: web3react.account,
  }
};

function parseError(err) {
  if (err === web3NotActiveError || err === web3AccountChangedError) {
    return false;
  }
  if (err instanceof UserRejectedRequestError) {
    return false;
  }
  if (err instanceof Object === true && err.code === 4001) {
    // action denied by the user
    return false;
  }
  if (err === 'price expired') {
    return {textKey: "price_expired"};
  }
  if (err instanceof NoEthereumProviderError) {
    return {textKey: "no_provider"};
  }
  if (err instanceof UnsupportedChainIdError) {
    return {textKey: "err_unsupported_chain"};
  }
  if (err === paymentNotVerifiedError) {
    return {textKey: "payment_not_verified"};
  }
  if (err instanceof Object === true && err.message) {
    return {text: err.message};
  }
  return err;
}

function PayButton({price, uploadOpts, disabled, onBusy, onPaymentConfirmed}) {
  const { t } = useTranslation();
  const injected = new InjectedConnector({ supportedChainIds: SUPPORTED_CHAIN_IDS });
  const web3react = useWeb3React();
  const [ busy, setBusyFn ] = React.useState(false);
  const [ text, setText ] = React.useState(null);
  const [ beforeUnloadText, setBeforeUnloadText ] = React.useState(undefined);
  const [ errorDialogProps, setErrorDialogProps ] = React.useState({});
  const setBusy = (val) => {setBusyFn(val); onBusy(val)};

  const handleError = (err) => {
    console.log(`handleError:`);
    console.log(err);
    
    setBeforeUnloadText(undefined);
    setText(null);
    setBusy(false);
    
    const parsedErr = parseError(err);

    if (parsedErr) {
      setErrorDialogProps({
        open: true,
        onClose: () => setErrorDialogProps({open: false}),
        message: parsedErr.textKey ? t(parsedErr.textKey) : parsedErr.text,
      });
    }
  };

  React.useEffect(() => {
    injected.isAuthorized().then(isAuth => {
      if (isAuth) {
        web3react.activate(injected);
      }
    })
  }, []);

  React.useEffect(() => {
    if (web3react.error) {
      handleError(web3react.error);
    }
  }, [web3react]);

  return <Beforeunload onBeforeunload={() => beforeUnloadText}>

    <ErrorDialog  {...errorDialogProps} />
    
    <RoundBtn
      disabled={disabled || price.isFetching || busy }
      icon={<PaymentIcon />}
      loading={!!text}
      text={text}
      tooltip={busy ? "" : t('pay')}
      onClick={async () => {
        setBusy(true);

        try {
          let isAuth = await injected.isAuthorized();
          
          if (!isAuth && !web3react.active) {
            setText(t('web3_authorizing'));
          }
          
          await web3react.activate(injected);

          if (web3react.error instanceof NoEthereumProviderError) {
            throw web3react.error;
          }
          
          if (web3react.error) {
            throw web3react.error;
          }
          
          if (!web3react.active) {
            throw web3NotActiveError;
          }

          setText(t('web3_connecting'));
          const { web3, account } = connect(web3react);
      
          setText(t('wait_signature'));
          const paymentReq = await buildPaymentRequest({web3, account, uploadPriceReq: uploadOpts, uploadPriceResp: price});
          
          setText(t('prepare_payment'));
          const paymentInfo = await sendPaymentRequest({body: paymentReq});

          if (account !== paymentReq.a) {
            throw web3AccountChangedError;
          }

          setText(t('wait_payment'));
          setBeforeUnloadText(t('wait_payment_quit_warn'));
          const txReceipt = await doPayment({web3, account, amount: price.b, paymentId: paymentInfo.pid});
          
          setText(t('payment_verify'));

          const verifyResp = await verifyPayment({txHash: txReceipt.transactionHash, timeout: 3600000});
          if (!verifyResp.valid) {
            throw paymentNotVerifiedError;
          }
          
          setText(t('payment_confimed'));
          onPaymentConfirmed({...paymentInfo});

        } catch(err) {
          handleError(err);
        };
      }}
    >
    </RoundBtn>
  </Beforeunload>;
}

export default PayButton;
