const nodemailer = require("nodemailer");
const User = require("./models/registration");
async function passwordChangingMail(email) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing

  const data = await User.find({ email: email })
  if(data){
    const userName  = data[0].firstname + " " + data[0].Lastname;;

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: "surbhigulhana3@gmail.com", // generated ethereal user
        pass: "wxcmkmpfmtdquyrn", // generated ethereal password
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: "surbhigulhana3@gmail.com", // sender address
      to: email, // list of receivers
      subject: "Reset Password", // Subject line
      // text: "You Praedico Verification Code is : "+ otp, // plain text body
      html: `
      <html>
      <head>
      
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <style>
      @media screen and (max-width: 720px) {
        body .c-v84rpm {
          width: 100% !important;
          max-width: 720px !important;
        }
        body .c-v84rpm .c-7bgiy1 .c-1c86scm {
          display: none !important;
        }
        body .c-v84rpm .c-7bgiy1 .c-f1bud4 .c-pekv9n .c-1qv5bbj,
        body .c-v84rpm .c-7bgiy1 .c-f1bud4 .c-1c9o9ex .c-1qv5bbj,
        body .c-v84rpm .c-7bgiy1 .c-f1bud4 .c-90qmnj .c-1qv5bbj {
          border-width: 1px 0 0 !important;
        }
        body .c-v84rpm .c-7bgiy1 .c-f1bud4 .c-183lp8j .c-1qv5bbj {
          border-width: 1px 0 !important;
        }
        body .c-v84rpm .c-7bgiy1 .c-f1bud4 .c-pekv9n .c-1qv5bbj {
          padding-left: 12px !important;
          padding-right: 12px !important;
        }
        body .c-v84rpm .c-7bgiy1 .c-f1bud4 .c-1c9o9ex .c-1qv5bbj,
        body .c-v84rpm .c-7bgiy1 .c-f1bud4 .c-90qmnj .c-1qv5bbj {
          padding-left: 8px !important;
          padding-right: 8px !important;
        }
        body .c-v84rpm .c-ry4gth .c-1dhsbqv {
          display: none !important;
        }
      }
      @media screen and (max-width: 720px) {
        body .c-v84rpm .c-ry4gth .c-1vld4cz {
          padding-bottom: 10px !important;
        }
      }
      </style>
      <title>Reset password</title>
      </head>
      
      <body style="margin: 0; padding: 0; font-family: &quot; HelveticaNeueLight&quot;,&quot;HelveticaNeue-Light&quot;,&quot;HelveticaNeueLight&quot;,&quot;HelveticaNeue&quot;,&quot;HelveticaNeue&quot;,Helvetica,Arial,&quot;LucidaGrande&quot;,sans-serif;font-weight: 300; font-stretch: normal; font-size: 14px; letter-spacing: .35px; background: #ecf0f3; color: #333333; border-bottom: 2px solid #bec6cc;">
      <table border="1" cellpadding="0" cellspacing="0" align="center" class="c-v84rpm" style="border: 0 none; border-collapse: separate; width: 720px;" width="720">
      <tbody>
        <tr class="c-1syf3pb" style="border: 0 none; border-collapse: separate; height: 250px; background-image: url(https://media.istockphoto.com/photos/digital-marketing-concept-online-advertisement-picture-id1284549946?k=20&m=1284549946&s=612x612&w=0&h=VVGNI_vARpvpqo2Md_xsfcSiotjVVjzisV75dF15T-0=);">
          <td style="border: 0 none; border-collapse: separate; vertical-align: middle;" valign="middle">
            <table align="center" border="1" cellpadding="0" cellspacing="0" class="c-f1bud4" style="border: 0 none; border-collapse: separate;">
        
          </td>
        </tr>
        <tr class="c-7bgiy1" style="border: 0 none; border-collapse: separate; -webkit-box-shadow: 0 3px 5px rgba(0,0,0,0.04); -moz-box-shadow: 0 3px 5px rgba(0,0,0,0.04); box-shadow: 0 3px 5px rgba(0,0,0,0.04);">
          <td style="border: 0 none; border-collapse: separate; vertical-align: middle;" valign="middle">
            <table align="center" border="1" cellpadding="0" cellspacing="0" class="c-f1bud4" style="border: 0 none; border-collapse: separate; width: 100%;" width="100%">
              <tbody>
                <tr class="c-pekv9n" style="border: 0 none; border-collapse: separate; text-align: center;" align="center">
                  <td style="border: 0 none; border-collapse: separate; vertical-align: middle;" valign="middle">
                    <table border="1" cellpadding="0" cellspacing="0" width="100%" class="c-1qv5bbj" style="border: 0 none; border-collapse: separate; border-color: #E3E3E3; border-style: solid; width: 100%; border-width: 1px 1px 0; background: #FBFCFC; padding: 15px 10px 30px;">
                      <tbody>
                        <tr style="border: 0 none; border-collapse: separate;">
                          <td class="c-1m9emfx c-zjwfhk" style="border: 0 none; border-collapse: separate; vertical-align: middle; font-family: &quot; HelveticaNeueLight&quot;,&quot;HelveticaNeue-Light&quot;,&quot;HelveticaNeueLight&quot;,&quot;HelveticaNeue&quot;,&quot;HelveticaNeue&quot;,Helvetica,Arial,&quot;LucidaGrande&quot;,sans-serif;font-weight: 300; color: #1D2531;"
                            valign="middle"><div style="line-height:10px;"><h2>Smile ${userName}</h2><h3>recover your password.</h3></div></td>
                        </tr>
                        <tr style="border: 0 none; border-collapse: separate;">
                          <td class="c-46vhq4 c-4w6eli" style="border: 0 none; border-collapse: separate; vertical-align: middle; font-family: &quot; HelveticaNeue&quot;,&quot;HelveticaNeue&quot;,&quot;HelveticaNeueRoman&quot;,&quot;HelveticaNeue-Roman&quot;,&quot;HelveticaNeueRoman&quot;,&quot;HelveticaNeue-Regular&quot;,&quot;HelveticaNeueRegular&quot;,Helvetica,Arial,&quot;LucidaGrande&quot;,sans-serif;font-weight: 400; color: #7F8FA4; font-size: 15.45455px; padding-top: 20px;"
                            valign="middle">Looks like you lost your password?</td>
                        </tr>
                        <tr style="border: 0 none; border-collapse: separate;">
                          <td class="c-eitm3s c-16v5f34" style="border: 0 none; border-collapse: separate; vertical-align: middle; font-family: &quot; HelveticaNeueMedium&quot;,&quot;HelveticaNeue-Medium&quot;,&quot;HelveticaNeueMedium&quot;,&quot;HelveticaNeue&quot;,&quot;HelveticaNeue&quot;,sans-serif;font-weight: 500; font-size: 13.63636px; padding-top: 12px;"
                            valign="middle">We’re here to help you. Click on the button below to reset your password.</td>
                        </tr>
                        <tr style="border: 0 none; border-collapse: separate;">
                          <td class="c-rdekwa" style="border: 0 none; border-collapse: separate; vertical-align: middle; padding-top: 38px;" valign="middle"><a href=http://localhost:3000/setpassword/${email}
                              class="c-1eb43lc c-1sypu9p c-16v5f34" style="color: #000000; -webkit-border-radius: 4px; font-family: &quot; HelveticaNeueMedium&quot;,&quot;HelveticaNeue-Medium&quot;,&quot;HelveticaNeueMedium&quot;,&quot;HelveticaNeue&quot;,&quot;HelveticaNeue&quot;,sans-serif;font-weight: 500; font-size: 13.63636px; line-height: 15px; display: inline-block; letter-spacing: .7px; text-decoration: none; -moz-border-radius: 4px; -ms-border-radius: 4px; -o-border-radius: 4px; border-radius: 4px; background-color: #288BD5; background-image: url(&quot;https://mail.crisp.chat/images/linear-gradient(-1deg,#137ECE2%,#288BD598%)&quot; );color: #ffffff; padding: 12px 24px;">Reset password</a></td>
                        </tr>
                        <tr style="border: 0 none; border-collapse: separate;">
                          <td class="c-ryskht c-zjwfhk" style="border: 0 none; border-collapse: separate; vertical-align: middle; font-family: &quot; HelveticaNeueLight&quot;,&quot;HelveticaNeue-Light&quot;,&quot;HelveticaNeueLight&quot;,&quot;HelveticaNeue&quot;,&quot;HelveticaNeue&quot;,Helvetica,Arial,&quot;LucidaGrande&quot;,sans-serif;font-weight: 300; font-size: 12.72727px; font-style: italic; padding-top: 52px;"
                            valign="middle">If you didn’t ask for password reset, please ignore this email.</td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                
              </tbody>
            </table>
      
          </td>
        </tr>
      </tbody>
      </table>
      </body>
          </html>
      `
      
      , // html body
    });

    console.log("info",info);
    return info;
  }else{
    return false;
  }
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}


module.exports = { passwordChangingMail};
