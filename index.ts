import "dotenv/config"
import { EmailProviders, SendGrid, renderEmail } from "remails"

// get the api key for the provider of choice
const apiKey = process.env.SENDGRID_API_KEY
if (!apiKey) {
  throw new Error(`the environment variable SENDGRID_API_KEY is not set`)
}

// email providers will go through each provider from top to bottom
// if the first one fails it goes to the next and so on
// this just provides some backup in-case some don't work for whatever reason
const emails = EmailProviders([
  SendGrid({ apiKey })
])

const main = async () => {

  const to = "nick@wylynko.com"
  const from = "nick1014375@gmail.com"
  const template = "resetPassword"

  // steps here include
  // - run fetch function
  // - run subject function
  // - get html from react-dom
  const email = await renderEmail({ template, to, from })

  // and send of the email, in this case using SendGrid
  await emails.send(email)

  console.log(email)
}

main()