const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_KEY);

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed');
    return;
  }

  const { email, name, registrationLink } = req.body;

  if (!email || !name || !registrationLink) {
    res.status(400).json({ error: 'Missing required fields' });
    return;
  }

  const msg = {
    to: email,
    from: 'YOUR_VERIFIED_SENDER@mvjce.edu.in', // Change this to your verified sender
    templateId: 'd-0830e1f6d430414c8b3488a572e5e8fc',
    dynamic_template_data: {
      student_name: name,
      registration_link: registrationLink,
    },
  };

  try {
    await sgMail.send(msg);
    res.status(200).json({ message: 'Invite sent' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
