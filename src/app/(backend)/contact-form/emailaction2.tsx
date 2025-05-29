"use server";
import nodemailer from "nodemailer";

export default async function EmailAction2(state: any, formData: FormData) {
  try {
    const name = formData.get("name");
    const email:any = formData.get("email");
    const message = formData.get("message");



    const transporter = nodemailer.createTransport({
      host: process.env.NEXT_PUBLIC_HOST as string,
      port: 465,
      secure: true,
      auth: {
        user: "info@globalsalah.com", // your SMTP username
        pass: "amfh)+AWv$0C", // your SMTP password
      },
      debug: true, // Enable debugging
      logger: true,
    });

    // Mail options for the client
    const clientMailOptions = {
      from: `Global Salah® Alert - <${process.env.NEXT_PUBLIC_MAILFROM}>`,
      to: email,
      subject: `New Contact Form Entry | Global Salah`,
      html: `
<body>

  <div style="max-width: 600px; margin: 0 auto;">
<!-- Email Template HTML with inline CSS -->
<div>
 <div style="margin: 0; padding: 0; background-color: #f8f9fa; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
   <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f8f9fa; min-width: 100%; padding: 40px 20px;">
     <tr>
       <td align="center" valign="top">
         <!-- Main Container -->
         <table cellpadding="0" cellspacing="0" border="0" width="600" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 12px 24px rgba(0,0,0,0.08);">
           
           <tr>
             <td align="center" valign="top">
               <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: linear-gradient(135deg, #0d4b3a 0%, #1a7f64 100%); padding: 35px 0 30px 0; border-top-left-radius: 16px; border-top-right-radius: 16px;border-bottom-left-radius: 200px; border-bottom-right-radius: 196px;">
                 <tr>
                   <td align="center" valign="middle" style="padding-bottom: 20px;">
                     <table cellpadding="0" cellspacing="0" border="0">
                       <tr>
                         <td align="center" valign="middle" style="padding: 0 10px;">
                           <div style="width: 90px; height: 90px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto; ;">
                             <img src="https://muhammadumer.sirv.com/global-logo.png" alt="Global Salah Logo" style="width: 90px; height: 90px; border-radius: 10px; display: block; margin: 0 auto;">
                           </div>
                         </td>
                       </tr>
                     </table>
                   </td>
                 </tr>
                 <tr>
                   <td align="center" valign="middle">
                     <h1 style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #ffffff; font-size: 28px; font-weight: 600; margin: 0; text-shadow: 0 2px 4px rgba(0,0,0,0.1); letter-spacing: 0.5px;">Global Salah</h1>
                   </td>
                 </tr>
                 <tr>
          
                 </tr>
               </table>
             </td>
           </tr>
           
           <tr>
             <td align="center" valign="top">
               <div style="width: 100%; height: 30px; background-color: #ffffff; position: relative; margin-top: -1px;">
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" style="position: absolute; top: -40px; left: 0; width: 100%;">
                   <path fill="#ffffff" fillOpacity="1" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
                 </svg>
               </div>
             </td>
           </tr>
           
           <tr>
             <td align="center" valign="top" style="padding: 10px 50px 40px 50px;">
               <table cellpadding="0" cellspacing="0" border="0" width="100%">
                 <!-- Greeting -->
                 <tr>
                   <td align="center" valign="top" style="padding-bottom: 30px;">
                     <h2 style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #0d4b3a; font-size: 24px; font-weight: 600; margin: 0; line-height: 1.4;">We've Received Your Message</h2>
                   </td>
                 </tr>
                 
                 <tr>
                   <td align="center" valign="top" style="padding-bottom: 35px;">
                     <p style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #505050; font-size: 16px; line-height: 1.6; margin: 0; text-align: center;">
                       Thank you for reaching out to Global Salah support. We appreciate your patience as our dedicated team reviews your inquiry. We're committed to providing you with the assistance you need.
                     </p>
                   </td>
                 </tr>
                 
                 <tr>
                   <td align="center" valign="top" style="padding-bottom: 35px;">
                     <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: linear-gradient(to right, #f9fcfb, #edf7f4); border-radius: 12px; border-left: 5px solid #1a7f64; box-shadow: 0 4px 12px rgba(26,127,100,0.08);">
                       <tr>
                         <td style="padding: 25px 30px;">
                           <table cellpadding="0" cellspacing="0" border="0" width="100%">
                             <tr>
                               <td valign="middle" width="60">
                                 <div style="width: 50px; height: 50px; background-color: rgba(26,127,100,0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto;">
                                   <img src="https://muhammadumer.sirv.com/ticket-salah-icon.png" alt="Ticket" style="width: 24px; height: 24px; margin: auto;">
                                 </div>
                               </td>
                               <td valign="middle" style="padding-left: 15px;">
                                 <h3 style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #0d4b3a; font-size: 18px; font-weight: 600; margin: 0 0 5px 0;">Support Ticket Details</h3>

                                 <p style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #505050; font-size: 14px; margin: 0;">
                                   <strong>Expected Response:</strong> Within 24 hours
                                 </p>
                               </td>
                             </tr>
                           </table>
                         </td>
                       </tr>
                     </table>
                   </td>
                 </tr>
                 
                 <tr>
                   <td align="center" valign="top" style="padding-bottom: 35px;">
                     <h3 style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #0d4b3a; font-size: 20px; font-weight: 600; margin: 0 0 25px 0; text-align: center;">What Happens Next</h3>
                     
                     <table cellpadding="0" cellspacing="0" border="0" width="100%">
                       <tr>
                         <td valign="top" style="padding-bottom: 20px;">
                           <table cellpadding="0" cellspacing="0" border="0" width="100%">
                             <tr>
                               <td valign="top" width="60" align="center">
                                 <div style="width: 40px; height: 40px; background-color: #1a7f64; border-radius: 50%; color: #ffffff; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-size: 18px; font-weight: 600; line-height: 40px; text-align: center; margin: 0 auto;">1</div>
                               </td>
                               <td valign="middle" style="padding-left: 15px;">
                                 <h4 style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #0d4b3a; font-size: 16px; font-weight: 600; margin: 0 0 5px 0;">Review</h4>
                                 <p style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #505050; font-size: 14px; line-height: 1.5; margin: 0;">Our support team will carefully review your inquiry</p>
                               </td>
                             </tr>
                           </table>
                         </td>
                       </tr>
                       
                       <tr>
                         <td valign="top" style="padding-bottom: 20px;">
                           <table cellpadding="0" cellspacing="0" border="0" width="100%">
                             <tr>
                               <td valign="top" width="60" align="center">
                                 <div style="width: 40px; height: 40px; background-color: #1a7f64; border-radius: 50%; color: #ffffff; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-size: 18px; font-weight: 600; line-height: 40px; text-align: center; margin: 0 auto;">2</div>
                               </td>
                               <td valign="middle" style="padding-left: 15px;">
                                 <h4 style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #0d4b3a; font-size: 16px; font-weight: 600; margin: 0 0 5px 0;">Research</h4>
                                 <p style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #505050; font-size: 14px; line-height: 1.5; margin: 0;">We'll gather all necessary information to address your needs</p>
                               </td>
                             </tr>
                           </table>
                         </td>
                       </tr>
                       
                       <tr>
                         <td valign="top" style="padding-bottom: 20px;">
                           <table cellpadding="0" cellspacing="0" border="0" width="100%">
                             <tr>
                               <td valign="top" width="60" align="center">
                                 <div style="width: 40px; height: 40px; background-color: #1a7f64; border-radius: 50%; color: #ffffff; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-size: 18px; font-weight: 600; line-height: 40px; text-align: center; margin: 0 auto;">3</div>
                               </td>
                               <td valign="middle" style="padding-left: 15px;">
                                 <h4 style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #0d4b3a; font-size: 16px; font-weight: 600; margin: 0 0 5px 0;">Respond</h4>
                                 <p style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #505050; font-size: 14px; line-height: 1.5; margin: 0;">You'll receive a personalized response with detailed guidance</p>
                               </td>
                             </tr>
                           </table>
                         </td>
                       </tr>
                       
                       <tr>
                         <td valign="top">
                           <table cellpadding="0" cellspacing="0" border="0" width="100%">
                             <tr>
                               <td valign="top" width="60" align="center">
                                 <div style="width: 40px; height: 40px; background-color: #1a7f64; border-radius: 50%; color: #ffffff; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-size: 18px; font-weight: 600; line-height: 40px; text-align: center; margin: 0 auto;">4</div>
                               </td>
                               <td valign="middle" style="padding-left: 15px;">
                                 <h4 style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #0d4b3a; font-size: 16px; font-weight: 600; margin: 0 0 5px 0;">Follow-up</h4>
                                 <p style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #505050; font-size: 14px; line-height: 1.5; margin: 0;">We'll ensure your issue is fully resolved to your satisfaction</p>
                               </td>
                             </tr>
                           </table>
                         </td>
                       </tr>
                     </table>
                   </td>
                 </tr>
                 
                 <tr>
                   <td align="center" valign="top" style="padding-bottom: 35px;">
                     <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #fff8f0; border-radius: 12px; border-left: 5px solid #e67e22; box-shadow: 0 4px 12px rgba(230,126,34,0.08);">
                       <tr>
                         <td style="padding: 20px 25px;">
                           <table cellpadding="0" cellspacing="0" border="0" width="100%">
                             <tr>
                               <td valign="middle" width="40">
                                 <div style="width: 30px; height: 30px; background-color: rgba(230,126,34,0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto;">
                                   <img src="https://muhammadumer.sirv.com/high-priority-salah-icon.png" alt="Urgent" style="width: 16px; height: 16px; margin:auto;">
                                 </div>
                               </td>
                               <td valign="middle" style="padding-left: 15px;">
                                 <p style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #e67e22; font-size: 14px; font-weight: 600; margin: 0 0 3px 0;">Need Urgent Assistance?</p>
                                 <p style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #505050; font-size: 13px; margin: 0;">Reply to this email with "URGENT" in the subject line for priority handling.</p>
                               </td>
                             </tr>
                           </table>
                         </td>
                       </tr>
                     </table>
                   </td>
                 </tr>
                 
                 <tr>
                   <td align="center" valign="top" style="padding-bottom: 35px;">
                     <a href="mailto:support@globalsalah.com">
                     <table cellpadding="0" cellspacing="0" border="0" style="background: linear-gradient(135deg, #0d4b3a 0%, #1a7f64 100%); border-radius: 12px; box-shadow: 0 4px 12px rgba(26,127,100,0.15);">
                       <tr>
                         <td align="center" style="padding: 20px 40px;">
                           <table cellpadding="0" cellspacing="0" border="0">
                             <tr>
                               <td valign="middle" width="30">
                                 <img src="https://muhammadumer.sirv.com/clock-salah-icon.png" alt="Clock" style="width: 24px; height: 24px;">
                               </td>
                               <td valign="middle" style="padding-left: 15px;">
                                 <p style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #ffffff; font-size: 16px; font-weight: 600; margin: 0;">Our Support Team is Available 24/7</p>
                               </td>
                             </tr>
                           </table>
                         </td>
                       </tr>
                     </table>
                 </a>
                   </td>
                 </tr>
               </table>
             </td>
           </tr>
           
           <tr>
             <td align="center" valign="top" style="background-color: #f9fcfb; border-bottom-left-radius: 16px; border-bottom-right-radius: 16px; padding: 35px 50px;">
               <table cellpadding="0" cellspacing="0" border="0" width="100%">
                 <tr>
                   <td align="center" valign="top" style="padding-bottom: 25px;">
                     <h3 style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #0d4b3a; font-size: 20px; font-weight: 600; margin: 0; text-align: center;">Contact Information</h3>
                   </td>
                 </tr>
                 
                 <tr>
                   <td align="center" valign="top">
                     <table cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width: 400px;">
                       <!-- Email -->
                       <tr>
                         <td align="center" valign="top" style="padding-bottom: 15px;">
                           <table cellpadding="0" cellspacing="0" border="0">
                             <tr>
                               <td valign="middle" width="30">
                                 <img width="20" height="20" src="https://muhammadumer.sirv.com/mail-salah-icon.png" alt="new-post--v1" style="vertical-align: middle;"/>
                               </td>
                               <td valign="middle" >
                                 <p style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #505050; font-size: 15px; margin: 0;">
                                   <a href="mailto:support@globalsalah.com" style="color: #1a7f64; text-decoration: none; font-weight: 500;">support@globalsalah.com</a>
                                 </p>
                               </td>
                             </tr>
                           </table>
                         </td>
                       </tr>

          
                       <tr>
                         <td align="center" valign="top">
                           <table cellpadding="0" cellspacing="0" border="0">
                             <tr>
                               <td valign="middle" width="30">
                                 <img src="https://muhammadumer.sirv.com/globe-salah.png" alt="Website" style="width: 20px; height: 20px; vertical-align: middle;">
                               </td>
                               <td valign="middle" style=" vertical-align: middle;">
                                 <p style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #505050; font-size: 15px; margin: 0;">
                                   <a href="https://www.globalsalah.com" style="color: #1a7f64; text-decoration: none; font-weight: 500; ">www.globalsalah.com</a>
                                 </p>
                               </td>
                             </tr>
                           </table>
                         </td>
                       </tr>
                     </table>
                   </td>
                 </tr>
                 
                 <tr>
                   <td align="center" valign="top" style="padding: 30px 0 25px 0;">
                     <table cellpadding="0" cellspacing="0" border="0">
                       <tr>
                         <td align="center" valign="top" style="padding: 0 8px;">
                           <a href="https://www.facebook.com/globalsalahofficial/" style="display: inline-block; text-decoration: none;">
                             <div style="width: 36px; height: 36px; background-color: #1a7f64; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                               <img src="https://muhammadumer.sirv.com/social-link-salah-fb.png" alt="Facebook" style="width: 20px; height: 20px; vertical-align: middle; margin: auto;">
                             </div>
                           </a>
                         </td>
                         
                         <td align="center" valign="top" style="padding: 0 8px;">
                           <a href="https://x.com/globalsalah" style="display: inline-block; text-decoration: none;">
                             <div style="width: 36px; height: 36px; background-color: #1a7f64; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                              <img src="https://muhammadumer.sirv.com/social-link-salah-x.png" alt="Twitter" style="width: 20px; height: 20px; vertical-align: middle; margin: auto;">
                             </div>
                           </a>
                         </td>
                         
                         <td align="center" valign="top" style="padding: 0 8px;">
                           <a href="https://www.instagram.com/globalsalah" style="display: inline-block; text-decoration: none;">
                             <div style="width: 36px; height: 36px; background-color: #1a7f64; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                              <img src="https://muhammadumer.sirv.com/social-link-salah-insta.png" alt="Twitter" style="width: 20px; height: 20px; vertical-align: middle; margin: auto;">
                             </div>
                           </a>
                         </td>
             

                         <td align="center" valign="top" style="padding: 0 8px;">
                           <a href="https://www.pinterest.com/globalsalah/" style="display: inline-block; text-decoration: none;">
                             <div style="width: 36px; height: 36px; background-color: #1a7f64; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                              <img src="https://muhammadumer.sirv.com/social-link-salah-pintrest.png" alt="Twitter" style="width: 20px; height: 20px; vertical-align: middle; margin: auto;">
                             </div>
                           </a>
                         </td>
                         
              
                       </tr>
                     </table>
                   </td>
                 </tr>
                 
                 <tr>
                   <td align="center" valign="top" style="padding-top: 10px; border-top: 1px solid #e0e0e0;">
                     <p style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #707070; font-size: 13px; margin: 0 0 5px 0; text-align: center;">
                       Global Salah is a registered trademark. All rights reserved.
                     </p>
                     <p style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #909090; font-size: 12px; margin: 0; text-align: center;">
                       This email was sent in response to your inquiry. Please do not reply if received in error.
                     </p>
                   </td>
                 </tr>
               </table>
             </td>
           </tr>
           
         </table>
       </td>
     </tr>
   </table>
 </div>

</div>
</div>
</body>
`,};

    // Mail options for support
    const supportMailOptions = {
      from: `Global Salah® Alert - <info@globalsalah.com>`,
      to: "support@globalsalah.com", // Replace with your support email
      subject: `New Contact Form Submission from ${name}`,
      html: `
<body style="margin: 0; padding: 0; color: black;">
    <div style="width: 100%; max-width: 600px; margin: 0 auto; font-family: system-ui;">
        <h2 style="text-align: center;">New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong>${message} </p>
        
        <p style="text-align: center; color: gray; font-size: small;">This is an automated message. Please do not reply.</p>
    </div>
</body>
      `,
    };

    // Send both emails
   const clirnt =  await transporter.sendMail(clientMailOptions);
   
    await transporter.sendMail(supportMailOptions);

    return { success: "Form Submitted Successfully" };
  } catch (error) {
    console.error("Error sending email:", error);
    return { error: (error as Error).message };
  }
}
