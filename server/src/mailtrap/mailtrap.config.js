import { MailtrapClient } from "mailtrap"; // Ensure this is the correct import
import dotenv from "dotenv";

dotenv.config({
    path: "./.env"
});

const TOKEN = process.env.MAILTRAP_TOKEN;
const ENDPOINT = process.env.MAILTRAP_ENDPOINT

export const mailTrapClient = new MailtrapClient({
  token: TOKEN,
  endpoint: ENDPOINT
});

export const sender = {
  email: "mailtrap@demomailtrap.com",
  name: "Kapil",
};

