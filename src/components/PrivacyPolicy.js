
import { Box, Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import React from 'react';
import { SERVER_NAME } from "../constants";

function ParagraphTitle(props) {
  const theme = useTheme();

  return <Typography variant="h5" gutterBottom style={{marginTop: "2em", color: theme.palette.primary.main}}>
    {props.children}
  </Typography>
}

function PrivacyPolicy(props) {

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  return <Box>
    <Typography variant="h4" gutterBottom>
      Privacy Policy
    </Typography>
    <Typography variant="body2">
      Last update: 1 Nov 2020.
    </Typography>

    <ParagraphTitle>
      Consent
    </ParagraphTitle>

    <Typography>
      By using this website, you hereby consent to our Privacy Policy and agree to its terms.
    </Typography>

    <ParagraphTitle>
      What data is collected?
    </ParagraphTitle>
    
    <Typography>
      When you share a file using {SERVER_NAME} we receive and store (until the expiration policy you have selected kicks in) the following CLEAR data:
      <ul>
        <li>A randomly choosen ID that uniquely identifies the file (for e.g. "123e4567-e89b-12d3-a456-426652340000")</li>
        <li>The expiration policy you have selected (for e.g. to keep the file for 2 hours or 1 download)</li>
      </ul>
     
      and the following ENCRYPTED data:
      <ul>
        <li>The content of the file</li>
        <li>The exact size of the file</li>
        <li>The name of the file</li>
      </ul>

      We are not able to decrypt the content (or the name) of any file you share using {SERVER_NAME}.
      <br/>
      When the expiration policy kicks in, files are deleted forever.
    </Typography>
    
    <ParagraphTitle>
      Log files
    </ParagraphTitle>

    <Typography>
      {SERVER_NAME} follows a standard procedure of using log files.
      These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics.
      The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP),
      date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable.
      The purpose of the information is for analyzing trends, administering the site.
    </Typography>


    <ParagraphTitle>
      How do we use collected information?
    </ParagraphTitle>

    <Typography>
      We use the information we collect in various ways, including to:

      <ul>
        <li>Provide, operate, and maintain our webste</li>
        <li>Improve, personalize, and expand our webste</li>
        <li>Understand and analyze how you use our webste</li>
        <li>Develop new products, services, features, and functionality</li>
        <li>Find and prevent abuses</li>
      </ul>
    </Typography>

    <ParagraphTitle>
      Third Party Services
    </ParagraphTitle>

    <Typography>
      <ul>
        <li>We use linode.com</li>
        <li>We may use third-party JavaScript libraries or fonts (e.g. fonts.google.com)</li>
      </ul>
      
      All this third-party services automatically receive your IP address.

      <br/>
      Note that {SERVER_NAME} has no access to or control over third-party JavaScript libraries (or fonts).
    </Typography>


    <ParagraphTitle>
      Third Party Privacy Policies
    </ParagraphTitle>

    <Typography>
      {SERVER_NAME}'s Privacy Policy does not apply to other advertisers or websites.
      Thus, we are advising you to consult the respective Privacy Policies of these third-party servers for more detailed information.
      It may include their practices and instructions about how to opt-out of certain options.
    </Typography>


    <ParagraphTitle>
      CCPA Privacy Rights (Do Not Sell My Personal Information)
    </ParagraphTitle>

    <Typography>Under the CCPA, among other rights, California consumers have the right to:</Typography>
    <Typography>Request that a business that collects a consumer's personal data disclose the categories and specific pieces of personal data that a business has collected about consumers.</Typography>
    <Typography>Request that a business delete any personal data about the consumer that a business has collected.</Typography>
    <Typography>Request that a business that sells a consumer's personal data, not sell the consumer's personal data.</Typography>
    <Typography>If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.</Typography>

    <ParagraphTitle>
      GDPR Data Protection Rights
    </ParagraphTitle>

    <Typography>We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:</Typography>
    <Typography>The right to access – You have the right to request copies of your personal data. We may charge you a small fee for this service.</Typography>
    <Typography>The right to rectification – You have the right to request that we correct any information you believe is inaccurate. You also have the right to request that we complete the information you believe is incomplete.</Typography>
    <Typography>The right to erasure – You have the right to request that we erase your personal data, under certain conditions.</Typography>
    <Typography>The right to restrict processing – You have the right to request that we restrict the processing of your personal data, under certain conditions.</Typography>
    <Typography>The right to object to processing – You have the right to object to our processing of your personal data, under certain conditions.</Typography>
    <Typography>The right to data portability – You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.</Typography>
    <Typography>If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.</Typography>
  </Box>
}

export default PrivacyPolicy;
