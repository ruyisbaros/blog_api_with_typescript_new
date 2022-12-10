import { Twilio } from "twilio"
const ACcountSid = `${process.env.TWILIO_ACCOUNT_SID}`;
const authToken = `${process.env.TWILIO_AUTH_TOKEN}`;
const SENDER = `${process.env.TWILIO_NUMBER}`
const serviceID = `${process.env.TWILIO_SERVICE_ID}`

const client = new Twilio(ACcountSid, authToken)

export const sendSMS = (name: string, to: string, body: string, txt: string) => {
    try {
        client.messages
            .create({
                body: `Hello ${name.toUpperCase()}, MyBlogApp ${txt} - ${body}`,
                from: SENDER,
                to
            })
            .then(message => console.log(message.sid));
    } catch (error) {
        console.log(error)
    }
}

export const sendOTP = async (to: string, channel: string) => {
    try {
        const data = await client
            .verify
            .services(serviceID)
            .verifications
            .create({
                to,
                channel
            })
        return data
    } catch (error) {
        console.log(error)
    }
}
export const verifyOTP = async (to: string, code: string) => {
    try {
        const data = await client
            .verify
            .services(serviceID)
            .verificationChecks
            .create({
                to,
                code
            })
        return data
    } catch (error) {
        console.log(error)
    }
}
