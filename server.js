const express = require("express")
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const nodemailer = require("nodemailer")
dotenv.config({
    path:"./.env"
})
const port = process.env.PORT;
const app = express()
app.use(express.static(__dirname));
app.use(cors());
app.use(express.json());

app.get("/", (req, res)=>{
    res.sendFile(path.join(__dirname, "index.html"))
})

// Looking to send emails in production? Check out our Email API/SMTP product!
const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.USER,
      pass: process.env.PASSWORD
    }
  });
app.post("/sendmail", async(req, res)=>{
    const {name, email, message} = req.body;
    console.log("Name is: ", name ,email, message)
    if(!name || !email || !message){
        res.json({message: "Error Occur While Sending Email!Try again!", success: false}); 
    }

    try {
        await transport.sendMail({
            from: `"${name}" <${email}>`,
            to: process.env.EMAIL, // Your email
            subject: "New Portfolio Contact",
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
          });
    
        res.json({message: "Email Sent Successfully!", success: true});  
    } catch (error) {
        res.json({message: "Error Occur While Sending Email", success: false})
    }
})

app.listen(port, ()=>{
    console.log(`Server running at port: http://localhost:${port}`)
})




