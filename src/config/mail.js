export default {
  host: 'smtp.mailgun.org',
  port: 587,
  secure: true,
  auth: {
    api_key: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN,
  },
  default: {
    from: 'Equipe GoBarber <noreply@gobarber.com>',
  },
};
