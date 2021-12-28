import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Linking,
  TouchableOpacity,
} from "react-native";

//Websites
const weblink1 =
  "https://www.nus.edu.sg/ormc/personal-data-protection-at-nus/nus-privacy-notice";
const weblink2 =
  "https://nusit.nus.edu.sg/its/policies/nus-acceptable-use-policy-aup/";
const weblink3 =
  "https://nusit.nus.edu.sg/its/policies/nus-it-security-policy/";
const weblink4 = "https://www.nus.edu.sg/osa/resources/code-of-student-conduct";

function goToSite(link) {
  Linking.openURL(`${link}`);
}

export default function TermsScreen() {
  return (
    <View style={styles.container}>
      <ScrollView
        style={{ backgroundColor: "#ffffff", marginHorizontal: 10 }}
        showsVerticalScrollIndicator={false}
      >
        {/*header*/}
        <Text style={styles.headerText}>
          Terms of Use for GOZeroWaste Mobile App
        </Text>
        <Text>Last updated: 26 December 2021{"\n"}</Text>
        <Text>
          Welcome to GO Zero Waste! Please note that by using GO Zero Waste, you
          agree that you are bound by these Terms of Use laid down by the Go Zero 
          Waste Team ("Team").
          {"\n"}
        </Text>

        {/*Terms of Use*/}
        <Text style={styles.headerText}>1. Terms of Use</Text>
        <Text style={styles.text}>
          These terms are intended to prescribe the appropriate behaviour and use of this app 
          and its contents by students, faculty, staff, alumni and authorised users in an effective, 
          ethical and lawful manner.
          {"\n"}
        </Text>

        {/*Updates to Terms of Use*/}
        <Text style={styles.headerText}>2. Updates to Terms of Use</Text>
        <Text style={styles.text}>
          The Team reserves the right to modify these Terms of Use from time to time to reflect changes in 
          our fast-changing environment. Although the Team will inform Users of changes to these terms of use, 
          please also review these terms regularly to ensure that you are updated as to any changes. 
          By continuing to access or use the Service after any revisions become effective, you agree 
          to be bound by the revised terms. Queries relating to these Terms of Use may be directed to 
          gozerowastenus@gmail.com
          {"\n"}
        </Text>

        {/*Definition of Users*/}
        <Text style={styles.headerText}>3. Definition of Users</Text>
        <Text style={styles.text}>
          All Users who have been granted access to GO Zero Waste and related systems, including but not 
          limited to students, faculty, staff and alumni of the University, are to comply with these Terms. 
          Contractors, consultants, vendors and contract workers (including their employees, agents and 
          other authorised representatives) (‘Contingent Workers’) hired by a staff or faculty of the 
          University (‘Hiring Manager’) are also to comply with this Policy. Where Users are granted 
          extended access to GO Zero Waste beyond their terms of employment, for limited purposes 
          connected to the University (‘Extended Account Users’), all provisions of these Terms 
          shall continue to apply with the same force and effect. 
          {"\n"}
        </Text>

        {/*Our Service*/}
        <Text style={styles.headerText}>4. Our Service</Text>
        <Text style={styles.text}>
          GO Zero Waste provides reusable food containers and cups (‘Product’) to participating stalls 
          (‘Partners’) so that users may borrow the Products using our app (our ‘Service’). The 
          Service is provided to you subject to these terms.
          {"\n"}
        </Text>

        {/*Relevant Policies and Guidelines*/}
        <Text style={styles.headerText}>5. Relevant Policies and Guidelines</Text>
        <Text style={styles.text}>
          You are advised to refer to these relevant policies and guidelines
          which fall outside of these Terms of Use.
        </Text>
        <Text style={styles.text}>
          {"\n"}
          {"\u2022"} NUS Privacy Notice
          {"\n"}
          {"\u2022"} Acceptable Use Policy for IT Resources
          {"\n"}
          {"\u2022"} IT Security Policy
          {"\n"}
          {"\u2022"} NUS Student Code of Conduct
          {"\n"}
          {"\u2022"} Data Management Policy (Staff Only)
          {"\n"}
          {"\u2022"} Public Communications and Publications Policy (Staff Only)
          {"\n"}
          {"\u2022"} NUS Staff Code of Conduct (Staff Only)
          {"\n"}
        </Text>

        {/*Membership*/}
        <Text style={styles.headerText}>6. Membership</Text>
        <Text style={styles.text}>
          The use of this service is free. GO Zero Waste is also not a payment gateway and does 
          not collect any form of money from users. However, we reserve the right to revise and 
          update the applicable fees for memberships at any time. 
          {"\n"}
        </Text>

        {/*Using the App*/}
        <Text style={styles.headerText}>7. Using the App</Text>
        <Text style={styles.text}>
          You may opt to use a Product at any of our Partner locations as listed in the App. To 
          borrow the product, you are required to download the App and login using your own NUS emails.
          {"\n"}
        </Text>

        {/*Authentication*/}
        <Text style={styles.headerText}>8. Authentication</Text>
        <Text style={styles.text}>
          All users must authenticate their access to GO Zero Waste using their own NUS emails 
          issued to them by the National University of Singapore.
          {"\n"}
        </Text>

        {/*Borrowing of the Product*/}
        <Text style={styles.headerText}>9. Borrowing of the Product</Text>
        <Text style={styles.text}>
          A Product consists of a cup and a lid, or a food container and its lid. You must always borrow 
          a full Product. If you borrow an incomplete product (for example without the lid), and accordingly 
          return and incomplete product, we may deem that you have failed to return the Product.
          {"\n"}
        </Text>

        {/*Use of Product*/}
        <Text style={styles.headerText}>10. Use of Product</Text>
        <Text style={styles.text}>
          You agree that you will only use the Product for the transport of food or drink. You shall 
          not use the Product for any other purpose. You agree to keep the Product in good care and condition 
          and not in unsanitary conditions.
          {"\n"}
        </Text>

        {/*Returning the Product*/}
        <Text style={styles.headerText}>11. Returning the Product</Text>
        <Text style={styles.text}>
          You agree to return the Product within 7 days of borrowing and any of the return locations listed on 
          the App. You agree to follow all the instructions on the app to return the Product. Failure to 
          do so may result in our system not registering your return of the Product. In such a case, we 
          may deem that you have failed to return the Product (or any part of it) within the 7 day limit. 
          You may email us at gozerowastenus@gmail.com if you face any issues in returning the Product.
          {"\n"}
        </Text>

      {/*Damaged or missing parts of Product*/}
      <Text style={styles.headerText}>12. Damaged or missing parts of Product</Text>
      <Text style={styles.text}>
        You must not borrow a defective, damaged, or defaced Product. If you borrow such a Product, you 
        must notify us of such a condition by emailing us at gozerowastenus@gmail.com
        {"\n"}
      </Text>

      {/*Lost of stolen Product*/}
      <Text style={styles.headerText}>13. Lost of stolen Product</Text>
      <Text style={styles.text}>
        If the Product or any part of it is stolen, lost or damaged during the 7 day rental period, 
        you shall contact us immediately at gozerowastenus@gmail.com
        {"\n"}
      </Text>

      {/*Liability on Product cleanliness*/}
      <Text style={styles.headerText}>14. Liability on Product cleanliness</Text>
      <Text style={styles.text}>
        GO Zero Waste Is not responsible for the washing, cleanliness or hygiene of the Products. 
        Our Partners are responsible for cleaning the Products and making them available to users 
        in accordance with local laws applicable to them. You agree that you shall hold GO Zero Waste 
        Harmless in respect of issues with the hygiene of the Products.
        {"\n"}
      </Text>

      {/*Liability on food and drink service*/}
      <Text style={styles.headerText}>15. Liability on food and drink service</Text>
      <Text style={styles.text}>
        GO Zero Waste is also not responsible for any issues in relation to the food or drinks provided 
        by our Partners. You agree that you shall hold GO Zero Waste harmless in respect of such issues.
        {"\n"}
      </Text>

      {/*User-generated content*/}
      <Text style={styles.headerText}>16. User-generated content</Text>
      <Text style={styles.text}>
        Users are solely responsible for all the User Content that they post and the Team may monitor and 
        review or edit User Content. In all cases, the Team reserves the right to remove or disable access 
        to User Content which violates the Terms of Use. The Team may take these actions without prior notice 
        to the User or any third party. Removal or disability of access to User Content shall be at the Team‘s 
        sole discretion, and the Team do not promise to remove or disable access to any specific User Content. 
        {"\n"}
      </Text>

      {/*Indemnity*/}
      <Text style={styles.headerText}>17. Indemnity</Text>
      <Text style={styles.text}>
        Failure by Users to observe these Terms of Use may result, whether directly or indirectly, 
        in the Team being involved in claims and/or suffering damages, losses and expenses. The User shall 
        indemnify the Team from any such claims, damages, losses and expenses resulting from the User’s failure 
        to observe any of the provisions of these Terms of Use. 
        {"\n"}
      </Text>

      {/*Termination of Access*/}
      <Text style={styles.headerText}>18. Termination of Access</Text>
      <Text style={styles.text}>
        The Team reserves the right to terminate or suspend access to GO Zero Waste immediately, 
        without prior notice or liability, under the Team’s sole discretion, for any reason whatsoever 
        and without limitation (including, but not limited to, a breach of Terms)
        {"\n"}
      </Text>

      {/*App Account Details*/}
      <Text style={styles.headerText}>19. App Account Details</Text>
      <Text style={styles.text}>
        You are responsible for maintaining the confidentiality and the proper use of your personal 
        information, including the credentials for accessing restricted services, and are also 
        responsible for any damage or harm which might arise against us or third parties as a result 
        of your improper use, loss or removal of such information. 
        {"\n"}
      </Text>

      {/*Personal Data and Privacy*/}
      <Text style={styles.headerText}>20. Personal Data and Privacy</Text>
      <Text style={styles.text}>
        You consent that we may collect, use and disclose your personal data in accordance with our 
        Privacy Policy. The Privacy Policy explains for what purposes your personal information is 
        collected and used for. 
        {"\n"}
      </Text>

      {/*Prohibited Use*/}
      <Text style={styles.headerText}>21. Prohibited Use</Text>
      <Text style={styles.text}>
        Any commercial use or exploitation of the whole or any part of, this app, the information or 
        data on the apps (including, but not limited to, statistics, maps), and/or/any other information 
        on the app, its content and/or source code is strictly prohibited. 
        {"\n"}
      </Text>

      {/*Disclaimer of Content*/}
      <Text style={styles.headerText}>22. Disclaimer of Content</Text>
      <Text style={styles.text}>
        The User acknowledges and agrees that all information in this app is provided “as is.” 
        The Team has made reasonable endeavours to ensure that the information and materials posted 
        in GO Zero Waste are correct at the time of posting. However, the Team gives no warranty and 
        accepts no responsibility or liability for the accuracy or the completeness of the information 
        and materials provided here for any purpose whatsoever. No reliance should be made by any user 
        on the information or material so posted; instead, the user should independently verify the accuracy 
        and completeness of the information and/or materials with the originating or authorising faculty, 
        department or other body. 
        {"\n"}
      </Text>

      {/*Indemnity*/}
      <Text style={styles.headerText}>23. Indemnity</Text>
      <Text style={styles.text}>
        The User acknowledges and agrees that the Team shall not be held responsible or liable in any way 
        for any and/or all consequences (including, without limitation, damages for loss of profits, 
        business interruption, or loss of information) that may be incurred by the User as a direct 
        or indirect result of using, or the inability to use, any materials or contents on this Web-site, 
        even if the Team has been advised of the possibility of such damages in advance; and no right 
        of action will arise as a result of personal injury or property damage, howsoever arising, 
        sustained as a result of reference to, or reliance upon, any information contained in, or omitted 
        from, this Web-site, whether through neglect or otherwise. 
        {"\n"}
      </Text>

      {/*Links to other websites*/}
      <Text style={styles.headerText}>24. Links to other websites</Text>
      <Text style={styles.text}>
        GO Zero Waste may contain links to other World Wide Web sites or resources operated by parties 
        other than the Team. Such links are provided as a service for the convenience of the users of 
        GO Zero Waste. As the Team has no control over such sites and resources, the User acknowledges 
        and agrees that the Team is not responsible nor liable for any content or material on or available 
        from such sites or resources. In providing such links, the Team does not in any way, expressly or 
        implicitly, endorse the linked sites or resources or the respective contents thereof. The User 
        further acknowledges and agrees that the OED shall not be responsible or liable, whether directly 
        or indirectly, for any damage or loss caused or sustained by or alleged to be caused or sustained 
        by the user, in connection with the use or reliance on any information or material available on 
        such linked sites or resources. 
        {"\n"}
      </Text>

      {/*Availability of Service*/}
      <Text style={styles.headerText}>25. Availability of Service</Text>
      <Text style={styles.text}>
        The Team reserves the right to modify and/or remove any Content on the Service at any 
        time and/or for any reason, at its sole discretion without notice. The Team also reserves the 
        right to modify or discontinue all or part of the Service without notice at any time. The Team will 
        not be liable to Users or any third party for any modification, suspension, or discontinuance of 
        GO Zero Waste. The Team cannot guarantee GO Zero Waste will be available at all times as the app 
        may experience hardware, software, other problems or need to perform maintenance related to GO Zero 
        Waste, resulting in interruptions, delays, or errors. The Team reserves the right to change, 
        revise, update, suspend, discontinue, or otherwise modify GO Zero Waste at any time or for any 
        reason without notice to Users. Users agree that the Team has no liability whatsoever for any loss, 
        damage, or inconvenience caused by Users’ inability to access or use GO Zero Waste features during 
        any downtime or discontinuance of GO Zero Waste. Nothing in these Terms shall be construed to oblige 
        the Team to maintain and support the GO Zero Waste or to supply any corrections, updates, or 
        releases in connection therewith.
        {"\n"}
      </Text>

      {/*Copyright*/}
      <Text style={styles.headerText}>26. Copyright</Text>
      <Text style={styles.text}>
        GO Zero Waste and its contents are subject to copyright protection under the laws of Singapore 
        and, through international treaties, other countries. The copyright in the contents and materials 
        available as a whole is owned by the Team. However, the copyright in some contents and materials 
        incorporated within GO Zero Waste may be owned by third parties where so indicated. 
        {"\n"}{"\n"}
        No part of the contents or materials available on GO Zero Waste may be reproduced, licensed, sold, 
        published, transmitted, modified, adapted, publicly displayed, broadcast (including storage in any 
        medium by electronic means c. whether or not transiently for any purpose save as permitted herein) 
        without the prior written permission of the Team. Users may access GO Zero Waste and view its 
        contents using their mobile device, save an electronic copy or print a copy solely for their own 
        information, research or study, provided they (a) do not modify the copy from how it appears in this 
        app; and (b) include the copyright notice “© The National University of Singapore” on such copy. 
        {"\n"}{"\n"}
        The University’s crests and logos should never be removed from pages on which they originally appear. 
        Content from within GO Zero Waste should always appear exactly as posted without variation, unless 
        the prior written approval of the Team is obtained. 
        {"\n"}{"\n"}
        End-users may not otherwise exercise the copyright in the whole or any part of the contents and 
        materials in GO Zero Waste for any other purpose except as expressly permitted by any applicable 
        law or with the Team’s prior written consent.
        {"\n"}
      </Text>

      {/*Trademark*/}
      <Text style={styles.headerText}>27. Trademark</Text>
      <Text style={styles.text}>
        Users shall not use our trademarks in connection with any product or service without the prior 
        written consent of the Team.
        {"\n"}
      </Text>

      {/*Governing Law*/}
      <Text style={styles.headerText}>28. Governing Law</Text>
      <Text style={styles.text}>
        These Terms shall be governed by and construed in accordance with the laws of the Republic 
        of Singapore. The Parties hereto hereby agree to resolve all and any issues through third-party 
        mediation. The Team’s forbearance in enforcing any right or provision of these Terms shall not be 
        considered a waiver of those rights.  
        {"\n"}
      </Text>

      {/*Contact Information*/}
      <Text style={styles.headerText}>29. Contact Information</Text>
      <Text style={styles.text}>
        Queries and feedback relating to GO Zero Waste and these Terms of Use may be directed to 
        gozerowastenus@gmail.com
        {"\n"}
      </Text>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 17,
  },
  boldText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  text: {
    fontSize: 14,
    paddingHorizontal: 15,
  },
  smallerText: {
    fontSize: 13,
    paddingLeft: 30,
    paddingRight: 15,
  },
});
