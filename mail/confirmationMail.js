import nodemailer from "nodemailer"
import qr from "qrcode"

export const sendConfirmationEmail = async (id, email) => {
  try {
    const qrCodeDataURL = await qr.toDataURL(id)
    const qrCodeBuffer = Buffer.from(qrCodeDataURL.split(",")[1], "base64")

    const transporter = nodemailer.createTransport({
      service: "gmail",
      port: 465,
      secure: true,
      auth: {
        user: process.env.CONFIRMATION_EMAIL,
        pass: process.env.CONFIRMATION_PASS,
      },
    })

    const message = {
      from: process.env.CONFIRMATION_EMAIL,
      to: email,
      subject: "Registration Confirmed - ICIA 2026",
      html: `
        <h2>Thank you for registering for ICIA 2026</h2>
        <p>Please find your QR code below. A copy is also attached as a PNG file.</p>
        <img src="cid:qrcode" alt="QR Code" style="width:150px;" />
      `,
      attachments: [
        {
          filename: "qrcode.png",
          content: qrCodeBuffer,
          cid: "qrcode",
        },
        {
          filename: "qrcode-attachment.png",
          content: qrCodeBuffer,
        },
      ],
    }

    await transporter.sendMail(message)
    return { success: true }
  } catch (err) {
    console.error("Email failed:", err)
    return { success: false, error: err.message }
  }
}
