import React from "react";

import classes from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={classes.container}>
      <div className={classes.footer}>
        <table>
          <tbody>
            <tr>
              <td>FAQ</td>
              <td>Help Center</td>
              <td>Account</td>
              <td>Media Center</td>
            </tr>
            <tr>
              <td>Investor Relations</td>
              <td>Jobs</td>
              <td>Ways to Watch</td>
              <td>Terms of Use</td>
            </tr>
            <tr>
              <td>Privacy</td>
              <td>Cookie Preferences</td>
              <td>Corporate Information</td>
              <td>Contact Us</td>
            </tr>
            <tr>
              <td>Speed Test</td>
              <td>Legal Notices</td>
              <td>Only on Dingga</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Footer;
