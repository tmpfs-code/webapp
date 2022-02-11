import i18n from "i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from "react-i18next";
 
// the translations
const resources = {
  en: {
    translation: {
      download: "download",
      download_plural: "downloads",
      copy: "copy",
      qrcode: "qrcode",
      privacy_policy: "Privacy",
      terms: "Terms",
      close: "Close",
      contact: "Contact",
      contact_title: "Support & Feedback",
      contact_msg: "Please contact us using this email address: ",
      by_using_this: "By using this service you agree to the<br/><0>Terms of Service</0> and the <1>Privacy Policy</1>",
      pay: "Pay",
      loading_price: "Loading price",
      web3_connecting: "Connecting to web3 provider",
      web3_authorizing: "Pending authorization",
      wait_signature: "Waiting for signature",
      prepare_payment: "Initiate payment",
      wait_payment: "Waiting for payment",
      payment_confimed: "Payment confirmed",
      payment_verify: "Verify payment",
      wait_payment_quit_warn: "You must wait for the payment to be completed and the upload to start",
      no_provider: "You need a wallet like Metamask to continue. Visit https://metamask.io/ for more info.",
      end_to_end_text: "Share files with end-to-end encryption and a link that automatically expires.<br/>Keep what you share private and make sure your stuff doesn't stay online forever.",
      end_to_end: "End-to-end Encryption",
      no_tracking_text: "No cookies and no third-party libraries that can track you against your will, like webfonts, javascript or css files hosted somewhere else.",
      no_tracking: "No Cookies",
      pay_cryto_text: "No third-party payment provider. This service is free for smaller files kept for a short period of time otherwise you pay with magical internet money.",
      pay_cryto: "Pay With Crypto",
      select_file: "Select a file to upload",
      up_to_size: "Free for files smaller than {{freeSize}}.",
      review_source_code: "Review source code",
      expiration_policy: "Expiration policy",
      start_upload: "Start the upload",
      expire_after: "Expires after",
      or: "or",
      encrypt_and_upload: "Encrypting and uploading",
      ask_interrupt_upload: "Interrupt the upload?",
      file_ready: "Your file is encrypted and ready to send",
      loading_file: "Loading your file.",
      download_hint: "This file was shared with end-to-end encryption and a link that automatically expires.<br/>Click on the button below to start the download.",
      downloading: "Downloading and decrypting.",
      download_completed: "Download completed.",
      start_download: "Start the download",
      ask_interrupt_download: "Interrupt the download?",
      link_expired: "This link has expired",
      link_expired_hint: "The link was set to expire after a certain amount of time (or number of downloads).<br>Please contact the person who shared this link with you.",
      paid_options: "Paid options",      
      expire_details: "This link will expire in {{timeLeft}} or after {{dwnLeft}} {{download}}.",
      price_expired: "Negotiated price has expired.",
      payment_not_verified: "Unable to verify payment. Contact support by providing the transaction hash.",
      errors: {
        invalid_file: "Invalid file",
        empty_file: "You have selected an empty file",
        upload_failed: "Upload failed",
        upload_error: "An error occurred while uploading your file. If this error persists, please contact the site administrator.",
        bot_title: "Stop there",
        bot_msg: "It seems you are behaving like a BOT and not a proper human being. Maybe you are just trying to upload too many files too fast.<br/><br/>Retry in a minute or so.",
        invalid_key: "Invalid key",
        invalid_key_hint: "The provided decryption key is not correct.<br/>In this URL the key is the last sequence of characters, right after the \"#\" symbol.<br/>Make sure it is correct.",
        download_failed: "Download failed",
        download_failed_hint: "The download stopped unexpectedly or failed.<br/>Possible reasons include: server failure, expired link or invalid key.",
        file_too_large: "File too large. Maximum allowed size is {{size}}.",
        generic_error: "An error occurred. If this error persists, please contact the site administrator.",
      },
    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector)
  .init({
    resources,
    lng: "en",
    transSupportBasicHtmlNodes: true,
  });

  export default i18n;
