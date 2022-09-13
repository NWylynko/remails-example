import React from "react";
import type { EmailTemplate, Subject } from "remails";

// a dead simple example with absolutely minimal
// only a subject and a component are required

export const subject: Subject = () => `Welcome to our amazing app`;

const WelcomeEmail: EmailTemplate = () => {
  return (
    <div>
      <h1>Welcome to our app</h1>
      <span>We are so excited to have you join us</span>
      <span>This is crazy</span>
    </div>
  );
};

export default WelcomeEmail;
