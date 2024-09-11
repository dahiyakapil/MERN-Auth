import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplate.js";
import { mailTrapClient, sender } from "./mailtrap.config.js";

export const sendVerificationEmail = async (email, verificationToken) => {
	const recipient = [{ email }];

	try {
		const response = await mailTrapClient.send({
			from: sender,
			to: recipient,
			subject: "Verify your email",
			html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
			category: "Email Verification",
		});

		console.log("Email sent successfully", response);
	} catch (error) {
		console.error(`Error sending verification`, error);

		throw new Error(`Error sending verification email: ${error}`);
	}
};

export const sendWelcomeMail = async (email, name) => {
  const recipient = [{ email }];

  try {
    const response = mailTrapClient.send({
      from: sender,
      to: recipient,
      template_uuid: "10964718-9bb6-4553-9ad4-ce944416b7d5",
      template_variables: {
        company_info_name: "AuthSecure",
        name: name,
      },
    });
    console.log("Welcome email sent successfully", response);
  } catch (error) {
    console.log("Error in sending welcome email", error);
    throw new Error(`Error in sending welcome email: ${error}`);
  }
};
