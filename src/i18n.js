import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
 
// the translations
const resources = {
  en: {
    translation: {
      download: "download",
      download_plural: "downloads",

      hour: "hour",
      hour_plural: "hours",

      minute: "minute",
      minute_plural: "minutes",
      
      copy: "copy",
      qrcode: "qrcode",

      privacy_policy: "Privacy",
      terms: "Terms",
      close: "Close",
      
      contact: "Contact",
      contactTitle: "Support & Feedback",
      contactMsg: "Please contact us using this email address: ",

      by_using_this: "By using this service you agree to the<br/><0>Terms of Service</0> and the <1>Privacy Policy</1>",

      errors: {
        text0: "Invalid file",
        text1: "You have selected an empty file",
        
        text2: "Upload failed",
        text3: "An error occurred while uploading your file. If this error persists, please contact the site administrator.",
        text4: "Server not reachable, try later.",
        
        bot_title: "Stop there",
        bot_msg: "It seems you are behaving like a BOT and not a proper human being. Maybe you are just trying to upload too many files too fast.<br/><br/>Retry in a minute or so.",

        text5: "Invalid key",
        text6: "The provided decryption key is not correct.<br/>In this URL the key is the last sequence of characters, right after the \"#\" symbol.<br/>Make sure it is correct.",

        text7: "Download failed",
        text8: "The download stopped unexpectedly or failed.<br/>Possible reasons include: server failure, expired link or invalid key.",
        
        text9: "File too large. Maximum allowed size is {{size}}.",
      },

      home: {
        text1: "Share files with <i>end-to-end encryption</i> and a link that automatically <i>expires</i>.<br/>Keep what you share private and make sure your stuff doesn't stay online forever.",
      },

      upload_page: {
        text0: "Select a file to upload",
        text3: "Up to {{size}}.",
        
        text4: "Expiration policy",
        text5: "Start the upload",
        text6: "Expires after",
        text7: "or",

        text8: "Encrypting and uploading",
        text9: "Interrupt the upload?",

        text10: "Your file is encrypted and ready to send",
      },

      download_page: {
        text0: "Download",
        text1: "This file was shared with end-to-end encryption and a link that automatically expires.",
        text2: "Start the download",

        text3: "Downloading and decrypting",
        text4: "Interrupt the download?",
        
        text5: "Download completed",
        
        text6: "This link has expired",
        text7: "The link was set to expire after a certain amount of time (or number of downloads).<br>Please contact the person who shared this link with you.",
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
