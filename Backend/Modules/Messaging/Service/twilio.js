import twilio from "twilio";
import dotenv from "dotenv";
import { TWILIO } from "../../../constants.js";

dotenv.config();

const client = twilio(
  TWILIO.TWILIO_ACCOUNT_SID,
  TWILIO.TWILIO_AUTH_TOKEN,
);

export const sendOTP = async (phone, otp) => {
  try {

    console.log("TWILIO FROM:", TWILIO.TWILIO_PHONE_NUMBER);
    console.log("OTP SENDING TO:", phone);

    const message = await client.messages.create({
      body: `Your HouseKeep OTP is ${otp}`,
      from: TWILIO.TWILIO_PHONE_NUMBER,
      to: phone
    });

    console.log("Twilio message SID:", message.sid);

  } catch (error) {

    console.error("Twilio Error:", error.message);
    throw new Error("Failed to send OTP");

  }
};