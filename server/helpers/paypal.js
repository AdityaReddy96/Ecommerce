import paypal from "paypal-rest-sdk";
import { config } from "dotenv";

config({ path: "./.env" });

paypal.configure({
  mode: "sandbox",
  client_id: process.env.PAYPAL_CLIENT_ID,
  client_secret: process.env.PAYPAL_SECRET_KEY,
});

export default paypal;
