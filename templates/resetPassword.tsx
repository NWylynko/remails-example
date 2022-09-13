import axios from "axios";
import React from "react";
import type { Subject, EmailTemplate, FetchDetails } from "remails";
import { useDetails } from "remails";

// here we define the subject of the email
// this needs to be a function that returns a string
// you get the to and from (not entirely sure what you would use it for)
// and you get the data from the fetch function below if you want anything from it
export const subject: Subject<Fetch> = ({ to, from }, { data }) => `Reset your account for ${data.name} from ${from}`;

// heres the main body of the email, use native html elements
// or import and use custom components
// the main thing to note is you can't use state
// I know, throwing away half of the benefits of react
// but until you can run javascript in emails then :/

// currently the only prop passed through is `data` it is whatever
// is returned from the fetch (and devFetch) functions bellow
const ResetPassword: EmailTemplate<Fetch> = ({ data }) => {
  // a context provider wraps this component with the to, from and subject
  // use those details however you feel
  const email = useDetails();

  return (
    <div>
      <h2>Reset your password</h2>
      <span>Someone requested for your accounts password to be reset</span>
      <span>If that is you then please click this link to continue</span>
      <span>Your Email is {email.to}</span>
      <span>The Subject of the email is {email.subject}</span>
      <span>This email was sent from {email.from}</span>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

// the main component needs to be default exported
export default ResetPassword;

// think of fetching data server side
// here I am using axios but you can do anything you want
// calculate pi for all I care
// id suggest sending the from email address to your server to get info
// about the user, like there name or anything you need for the email
// this function runs on every email you generate with `renderEmail`
// you may want to use a cache idk
export const fetch = async ({ to, from }: FetchDetails) => {
  interface Github {
    name: string;
  }

  const { data } = await axios.get<Github>(`https://api.github.com/users/nwylynko`);

  return data;
};

// here just getting the typeof fetch so we can pass it through to `EmailTemplate` and `Subject` so they can infer the return of the fetch function
type Fetch = typeof fetch;

// use a dev fetch to mock data to prevent hitting real servers
// this will only run when running in dev mode
export const devFetch = async ({ to, from }: FetchDetails) => {
  return {
    name: "Test User",
  };
};
