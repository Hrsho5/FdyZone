
const QRCode = require("qrcode");

const websiteURL = "http://192.168.1.5:5173";

QRCode.toFile(
  "./public/food-zone-qr.png",
  websiteURL,
  {
    width: 500,
    margin: 2,
    errorCorrectionLevel: "H",
  },
  (error) => {
    if (error) throw error;

    console.log("QR Code generated successfully!");
    console.log("Saved at: public/food-zone-qr.png");
  }
);
