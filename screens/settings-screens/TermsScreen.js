import React from "react";
import { StyleSheet, Text, View, ScrollView, Linking, TouchableOpacity } from "react-native";

//Websites
const weblink1 = "https://www.nus.edu.sg/ormc/personal-data-protection-at-nus/nus-privacy-notice";
const weblink2 = "https://nusit.nus.edu.sg/its/policies/nus-acceptable-use-policy-aup/"; 
const weblink3 = "https://nusit.nus.edu.sg/its/policies/nus-it-security-policy/";
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
      <Text style={styles.headerText}>Terms of Use for GO Zero Waste Mobile App</Text>
      <Text>Last updated: 18 December 2021{"\n"}</Text>
      <Text>Welcome to GO Zero Waste! Please note that by using GO Zero Waste, you 
        agree that you are bound by these Terms of Use laid down by the Office of 
        Estate Development (“OED”). These terms are intended to prescribe the 
        appropriate behaviour and use of this app and its contents by students, 
        faculty, staff, alumni and authorised users in an effective, ethical and 
        lawful manner. 
        {"\n"}
      </Text>

      {/*Updates to Term of Use*/}
      <Text style={styles.headerText}>1. Updates to Terms of Use</Text>
      <Text style={styles.text}>
        OED reserves the right to modify these Terms of Use from time to time to reflect changes 
        in our fast-changing environment. Although OED will inform Users of changes to these terms of 
        use, please also review these terms regularly to ensure that you are updated as to any changes. 
        By continuing to access or use the Service after any revisions become effective, you agree to be 
        bound by the revised terms. Queries relating to these Terms of Use may be directed to 
        gozerowastenus@gmail.com 
        {"\n"}
      </Text>

      {/*Relevant Policies and Guidelines*/}
      <Text style={styles.headerText}>2. Relevant Policies and Guidelines</Text>
      <Text style={styles.text}>
        You are advised to refer to these relevant policies and guidelines which fall outside of these 
        Terms of Use. 
      </Text>
      <Text style={styles.text}>
        {"\n"}{'\u2022'} NUS Privacy Notice
        {"\n"}{'\u2022'} Acceptable Use Policy for IT Resources 
        {"\n"}{'\u2022'} IT Security Policy 
        {"\n"}{'\u2022'} NUS Student Code of Conduct
        {"\n"}{'\u2022'} Data Management Policy (Staff Only) 
        {"\n"}{'\u2022'} Public Communications and Publications Policy (Staff Only) 
        {"\n"}{'\u2022'} NUS Staff Code of Conduct (Staff Only) 
        {"\n"}
      </Text>

      {/*Definition of Users*/}
      <Text style={styles.headerText}>3. Definition of Users</Text>
      <Text style={styles.text}>
        All Users who have been granted access to GO Zero Waste and related systems, 
        including but not limited to students, faculty, staff and alumni of the 
        University, are to comply with these Terms. Contractors, consultants, vendors and 
        contract workers (including their employees, agents and other authorised representatives) 
        (‘Contingent Workers’) hired by a staff or faculty of the University (‘Hiring Manager’) are 
        also to comply with this Policy. Where Users are granted extended access to GO Zero Waste 
        beyond their terms of employment, for limited purposes connected to the University (‘Extended 
        Account Users’), all provisions of these Terms shall continue to apply with the same force and effect.
        {"\n"}
      </Text>

      {/*OED Access*/}
      <Text style={styles.headerText}>4. OED's Access</Text>
      <Text style={styles.boldText}>{'\u2022'} Conditions of Access</Text>
        <Text style={styles.text}>
          OED respects privacy and recognises its critical importance in an academic setting. As such, 
          OED does not, in general, intend or wish to access Users’ data except in the following limited 
          circumstances:
        </Text>
          <Text style={styles.smallerText}>
          {"\n"}{'\u2022'} For identification or diagnosis of systems or security vulnerability and problems 
                            in order to preserve the integrity of IT resources.{"\n"}
          {"\n"}{'\u2022'} Where there are reasonable grounds to believe that a violation of law or a breach 
                            of the University’s policies may have taken place, and such access, inspection or 
                            monitoring may produce evidence of such violation or breach; or{"\n"}
          {"\n"}{'\u2022'} Where specifically allowed or required under the laws of Singapore.{"\n"}
          {"\n"}{'\u2022'} For manual updating of data in the case that there is system failure and Users’ 
                            data is not the most updated version.
          {"\n"}
          </Text>

        <Text style={styles.text}>
          In the above situations, OED or its representatives may access all aspects of the IT resources, 
          without User consent. Where required, Users agree to provide all necessary assistance to OED or 
          its representatives in relation to the activities stated above in Section 4 Conditions of Access. 
          {"\n"}
        </Text>

        <Text style={styles.text}>
          Consistent with privacy interests of the Users, OED access without the consent of the User will 
          occur only with the approval of President, Provost, or Deputy President or their authorised delegates.
          {"\n"}
        </Text>
      
      <Text style={styles.boldText}>{'\u2022'} Analytics Data in GO Zero Waste</Text>
        <Text style={styles.text}>
          The purpose of analytics data, including aggregated personal data, collected by GO Zero Waste 
          is to improve the services and features in GO Zero Waste. All collection, use, and disclosure 
          of analytics and personal data of the users by the OED shall adhere to Section 13 of the Personal 
          Data Protection Act (“PDPA”), and the NUS Personal Data Notice for Students and Staff. Any personal 
          data collected will be used for purposes related to GO Zero Waste.
          {"\n"}
        </Text>
      
      <Text style={styles.boldText}>{'\u2022'} Authentication</Text>
        <Text style={styles.text}>
          All users must authenticate their access to GO Zero Waste using their own NUS emails issued 
          to them by the National University of Singapore.
          {"\n"}
        </Text>
      
      <Text style={styles.boldText}>{'\u2022'} Termination of Access </Text>
        <Text style={styles.text}>
          OED reserves the right to terminate or suspend access to GO Zero Waste immediately, without 
          prior notice or liability, under the OED’s sole discretion, for any reason whatsoever and without 
          limitation (including, but not limited to, a breach of Terms).
          {"\n"}
        </Text>

      {/*Prohibited Use*/}
      <Text style={styles.headerText}>5. Prohibited Use</Text>
      <Text style={styles.text}>
        Any commercial use or exploitation of the whole or any part of, this app, the information or data 
        on the apps (including, but not limited to, statistics, maps), and/or/any other information on the 
        app, its content and/or source code is strictly prohibited. 
        {"\n"}
      </Text>

      {/*User-generated content*/}
      <Text style={styles.headerText}>6. User-generated content</Text>
      <Text style={styles.text}>
        Users are solely responsible for all the User Content that they post and the OED may monitor and 
        review or edit User Content. In all cases, the OED reserves the right to remove or disable access 
        to User Content which violates the Terms of Use. The OED may take these actions without prior notice 
        to the User or any third party. Removal or disability of access to User Content shall be at the OED‘s 
        sole discretion, and the OED do not promise to remove or disable access to any specific User Content. 
        {"\n"}
      </Text>

      {/*Indemnity*/}
      <Text style={styles.headerText}>7. Indemnity</Text>
      <Text style={styles.text}>
        Failure by Users to observe these Terms of Use may result, whether directly or indirectly, in the 
        OED being involved in claims and/or suffering damages, losses and expenses. The User shall indemnify 
        the OED and its officers from any such claims, damages, losses and expenses resulting from the User’s 
        failure to observe any of the provisions of these Terms of Use. 
        {"\n"}
      </Text>

      {/*Limitation of Liability*/}
      <Text style={styles.headerText}>8. Limitation of Liability</Text>
      <Text style={styles.boldText}>{'\u2022'} Information in GO Zero Waste</Text>
        <Text style={styles.text}>
          The User acknowledges and agrees that all information in this app is provided “as is.” The OED 
          has made reasonable endeavours to ensure that the information and materials posted in GO Zero Waste 
          are correct at the time of posting. However, the OED gives no warranty and accepts no responsibility 
          or liability for the accuracy or the completeness of the information and materials provided here for 
          any purpose whatsoever. No reliance should be made by any user on the information or material so 
          posted; instead, the user should independently verify the accuracy and completeness of the information 
          and/or materials with the originating or authorising faculty, department or other body. 
          {"\n"}
          {"\n"}
          The User acknowledges and agrees that the OED shall not be held responsible or liable in any way 
          for any and/or all consequences (including, without limitation, damages for loss of profits, 
          business interruption, or loss of information) that may be incurred by the User as a direct or 
          indirect result of using, or the inability to use, any materials or contents on this Web-site, 
          even if the OED has been advised of the possibility of such damages in advance; and no right of 
          action will arise as a result of personal injury or property damage, howsoever arising, sustained 
          as a result of reference to, or reliance upon, any information contained in, or omitted from, this 
          Web-site, whether through neglect or otherwise. 
          {"\n"}
          {"\n"}
          The OED reserves the right at any time, from time to time, to make changes to the whole or any part 
          of these terms and/or the services offered in GO Zero Waste as it deems appropriate. 
          {"\n"}
          {"\n"}
          GO Zero Waste may contain links to other World Wide Web sites or resources operated by parties 
          other than the OED. Such links are provided as a service for the convenience of the users of GO 
          Zero Waste. As the OED has no control over such sites and resources, the User acknowledges and 
          agrees that the OED is not responsible nor liable for any content or material on or available 
          from such sites or resources. In providing such links, the OED does not in any way, expressly or 
          implicitly, endorse the linked sites or resources or the respective contents thereof. The User 
          further acknowledges and agrees that the OED shall not be responsible or liable, whether directly 
          or indirectly, for any damage or loss caused or sustained by or alleged to be caused or sustained 
          by the user, in connection with the use or reliance on any information or material available on such 
          linked sites or resources. 
          {"\n"}
        </Text>

      <Text style={styles.boldText}>{'\u2022'} Availability of Service</Text>
        <Text style={styles.text}>
          OED reserves the right to modify and/or remove any Content on the Service at any time and/or for 
          any reason, at its sole discretion without notice. The OED also reserves the right to modify or 
          discontinue all or part of the Service without notice at any time. OED will not be liable to Users 
          or any third party for any modification, suspension, or discontinuance of GO Zero Waste. The OED 
          cannot guarantee GO Zero Waste will be available at all times as the app may experience hardware, 
          software, other problems or need to perform maintenance related to GO Zero Waste, resulting in 
          interruptions, delays, or errors. OED reserves the right to change, revise, update, suspend, 
          discontinue, or otherwise modify GO Zero Waste at any time or for any reason without notice to 
          Users. Users agree that OED has no liability whatsoever for any loss, damage, or inconvenience 
          caused by Users’ inability to access or use GO Zero Waste features during any downtime or 
          discontinuance of GO Zero Waste. Nothing in these Terms shall be construed to oblige the OED to 
          maintain and support the GO Zero Waste or to supply any corrections, updates, or releases in 
          connection therewith.
          {"\n"}
        </Text>

      {/*Copyright*/}
      <Text style={styles.headerText}>9. Copyright</Text>
      <Text style={styles.text}> 
        GO Zero Waste and its contents are subject to copyright protection under 
        the laws of Singapore and, through international treaties, other countries. 
        The copyright in the contents and materials available as a whole is owned 
        by OED. However, the copyright in some contents and materials incorporated 
        within GO Zero Waste may be owned by third parties where so indicated. 
        {"\n"}{"\n"}
        No part of the contents or materials available on GO Zero Waste may be 
        reproduced, licensed, sold, published, transmitted, modified, adapted, 
        publicly displayed, broadcast (including storage in any medium by electronic 
        means whether or not transiently for any purpose save as permitted herein) 
        without the prior written permission of OED. Users may access GO Zero Waste 
        and view its contents using their mobile device, save an electronic copy or 
        print a copy solely for their own information, research or study, provided 
        they (a) do not modify the copy from how it appears in this app; and (b) 
        include the copyright notice “© The National University of Singapore” on such 
        copy. 
        {"\n"}{"\n"}
        The University’s crests and logos should never be removed from pages on 
        which they originally appear. Content from within GO Zero Waste should 
        always appear exactly as posted without variation, unless the prior 
        written approval of OED is obtained. 
        {"\n"}{"\n"}
        End-users may not otherwise exercise the copyright in the whole or any 
        part of the contents and materials in GO Zero Waste for any other purpose 
        except as expressly permitted by any applicable law or with OED’s prior 
        written consent.
        {"\n"}
      </Text>

      {/*Trademarks*/}
      <Text style={styles.headerText}>10. Trademarks</Text>
      <Text style={styles.text}>
        Users shall not use our trademarks in connection with any product or 
        service without the prior written consent of the University or OED.
        {"\n"}
      </Text>

      {/*Governing Law*/}
      <Text style={styles.headerText}>11. Governing Law</Text>
      <Text style={styles.text}>
        These Terms shall be governed by and construed in accordance with the 
        laws of the Republic of Singapore. The Parties hereto hereby agree to 
        resolve all and any issues through third-party mediation. OED’s forbearance 
        in enforcing any right or provision of these Terms shall not be considered a waiver of those rights.  
        {"\n"}
      </Text>

      {/*Contact Information*/}
      <Text style={styles.headerText}>12. Contact Information</Text>
      <Text style={styles.text}>
        Queries and feedback relating to GO Zero Waste and these Terms of Use 
        may be directed to gozerowastenus@gmail.com 
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
