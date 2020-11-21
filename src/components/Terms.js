
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

function Terms(props) {

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  return <Box>
    <Typography variant="h4" gutterBottom>
    Terms of Service
    </Typography>
    <Typography variant="body2">
      Last update: 1 Nov 2020.
    </Typography>

    <br/>
    <br/>
    <Typography>These terms and conditions outline the rules and regulations for the use of {SERVER_NAME}'s Website, located at {SERVER_NAME}.</Typography>

    <Typography>By accessing this website we assume you accept these terms and conditions. Do not continue to use {SERVER_NAME} if you do not agree to take all of the terms and conditions stated on this page.</Typography>

    <Typography>The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and all Agreements: "Client", 
      "You" and "Your" refers to you, the person log on this website and compliant to the Company’s terms and conditions. 
      "The Company", "Ourselves", "We", "Our" and "Us", refers to our Company. "Party", "Parties", or "Us", refers to both the Client and ourselves. 
      All terms refer to the offer, acceptance and consideration of payment necessary to undertake the process of our assistance to the Client
       in the most appropriate manner for the express purpose of meeting the Client’s needs in respect of provision of the Company’s stated services,
        in accordance with and subject to, prevailing law of Netherlands. Any use of the above terminology or other words in the singular, 
        plural, capitalization and/or he/she or they, are taken as interchangeable and therefore as referring to same.</Typography>

    <ParagraphTitle>Cookies</ParagraphTitle>

    <Typography>
        We may employ the use of cookies. 
        By accessing {SERVER_NAME}, you agreed to use cookies in agreement with the {SERVER_NAME}'s Privacy Policy.</Typography>

    <Typography>Most interactive websites use cookies to let us retrieve the user’s details for each visit. 
      Cookies are used by our website to enable the functionality of certain areas to make it easier for people visiting our website.
       Some of our affiliate/advertising partners may also use cookies.</Typography>

    <ParagraphTitle>License</ParagraphTitle>

    <Typography>Unless otherwise stated, {SERVER_NAME} and/or its licensors own the intellectual property rights for all material on {SERVER_NAME}.
     All intellectual property rights are reserved. You may access this from {SERVER_NAME} for your own personal use subjected to restrictions 
     set in these terms and conditions.</Typography>

    <br/>
    You must not:
    <br/>

    <ul>
      {/* <li>Republish material from {SERVER_NAME}</li>
      <li>Sell, rent or sub-license material from {SERVER_NAME}</li>
      <li>Reproduce, duplicate or copy material from {SERVER_NAME}</li>
      <li>Redistribute content from {SERVER_NAME}</li> */}

      <li>
      do anything that would damage, disrupt or place an unreasonable burden on our website or service or anyone else's use of our website, 
      our mobile apps or a service including but not limited to denial of service attacks or similar;
      </li>

      <li>
      infringe anyone else's intellectual property (including but not limited to copyright) or other rights in any data;
      </li>

      <li>
      resell or otherwise supply our services to anyone else without our prior written consent;
      </li>

      <li>
      use our website, mobile apps, API, or any service, including, without limitation, any communication tools available through the website, 
      our mobile apps, or our API, or any forum, chat facility or message centre that we provide:

        <ul>
          <li>
          to store, use, download, upload, share, access, transmit, or otherwise make available, data in violation of any law in any country (including to breach copyright or other intellectual property rights held by us or anyone else);
          </li>

          <li>
          to send unwelcome communications of any kind (including but not limited to unlawful unsolicited commercial communications) to anyone (e.g. spam or chain letters);
          </li>

          <li>
          to abuse, defame, threaten, stalk or harass anyone, or to harm them;
          </li>

          <li>
          to store, use, download, upload, share, access, transmit, or otherwise make available, unsuitable, offensive, obscene or discriminatory information of any kind;
          </li>

          <li>
          to run any network scanning software, spiders, spyware, robots, open relay software or similar software;
          </li>

          <li>
          to upload anything or otherwise introduce any spyware, viruses, worms, trojan horses, time bombs or bots or any other damaging items which could interfere with our, or anyone else's, network, device or computer system;
          </li>

          <li>
          to use any software or device which may hinder the services (like mail bombs, war dialing, automated multiple pinging etc.);  
          </li>

          <li>
          to attempt to gain unauthorised access to any services other than those to which you have been given express permission to access; or
          </li>

          <li>
          to impersonate anyone or to try to trick or defraud anyone for any reason (e.g. by claiming to be someone you are not).
          </li>
        </ul>
      </li>
    </ul>

    <Typography>This Agreement shall begin on the date hereof.</Typography>

    <ParagraphTitle>iFrames</ParagraphTitle>

    <Typography>Without prior approval and written permission, you may not create frames around our Webpages that alter in any way the visual presentation or appearance of our Website.</Typography>

    
    <ParagraphTitle>Content Liability</ParagraphTitle>

    <Typography>We shall not be hold responsible for any content that appears on your Website. 
      You agree to protect and defend us against all claims that is rising on your Website. No link(s) 
      should appear on any Website that may be interpreted as libelous, obscene or criminal, or which 
      infringes, otherwise violates, or advocates the infringement or other violation of, any third party rights.</Typography>

    
    <ParagraphTitle>Reservation of Rights</ParagraphTitle>

    <Typography>We reserve the right to request that you remove all links or any particular link to our Website. 
      You approve to immediately remove all links to our Website upon request. We also reserve the right to amen
       these terms and conditions and it’s linking policy at any time. By continuously linking to our Website, you
        agree to be bound to and follow these linking terms and conditions.</Typography>

    
    <ParagraphTitle>Removal of links from our website</ParagraphTitle>

    <Typography>
      If you find any link on our Website that is offensive for any reason, you are free to contact and
       inform us any moment. We will consider requests to remove links but we are not obligated to or so or to respond to you directly.
    </Typography>

    <Typography>
      We do not ensure that the information on this website is correct, we do not warrant 
      its completeness or accuracy; nor do we promise to ensure that the website remains 
      available or that the material on the website is kept up to date.
    </Typography>


    <ParagraphTitle>Disclaimer</ParagraphTitle>

    <Typography>
      WE DON'T GIVE YOU ANY WARRANTY OR UNDERTAKING ABOUT THE SERVICES OR THE WEBSITE WHICH ARE PROVIDED "AS IS". 
      TO AVOID DOUBT, ALL IMPLIED CONDITIONS OR WARRANTIES ARE EXCLUDED AS MUCH AS IS PERMITTED BY LAW, INCLUDING (WITHOUT LIMITATION) WARRANTIES OF MERCHANTABILITY, 
      FITNESS FOR PURPOSE, SAFETY, RELIABILITY, DURABILITY, TITLE AND NON-INFRINGEMENT.
    </Typography>

    <Typography>
      We will try to give you access to our website and our mobile apps all the time, but we do not make any promises or provide you with a warranty 
      that our website or the services will be without any faults, bugs or interruptions.
    </Typography>
    
    <Typography>
      Whilst we intend that the services should be available 24 hours a day, seven days a week, 
      it is possible that on occasions the website or services may be unavailable to permit maintenance or other development activity 
      to take place or be periodically interrupted for reasons outside our control.
    </Typography>
    
    <Typography>
    Information on our website will change regularly. We will try to keep our website up to date and correct, 
    but again, we do not make any promises or guarantees about the accuracy of the information on our website.
    </Typography>

    <Typography>
      We do not warrant that the services will meet your requirements or that they will be suitable for any particular purpose.
    </Typography>

    <Typography>
      We also aren't legally responsible for:
    </Typography>

    <ul>
      <li>
        <Typography>
          any corruption or loss of data or other content which you or anyone else may experience after using 
          our website or our mobile apps, or any problems you may have when you view or navigate our website or use any of our mobile apps;
        </Typography>
      </li>

      <li>
        <Typography>
          devices or equipment that we do not own or have not given you;
        </Typography>
      </li>

      <li>
        <Typography>
          any loss or damage if you do not follow our reasonable instructions, these terms, our Privacy & Data Policy;
        </Typography>
      </li>

      <li>
        <Typography>
          any actions or non-actions of other people which disrupt access to our website, our mobile apps, or our API, including the
        </Typography>

        <ul>
          <li>
            <Typography>
              content and nature of any data that you upload, access or share;
            </Typography>
          </li>

          <li>
            <Typography>
              content of ads appearing on our website or our mobile apps (including links to advertisers' own websites) 
              as the advertisers are responsible for the ads and we don't endorse the advertisers' products;
            </Typography>
          </li>

          <li>
            <Typography>
              content of other people's websites even if a link to their website is included on our website or our mobile apps.
            </Typography>
          </li>
        </ul>
      </li>

    </ul>
  </Box>
}
export default Terms;
