import nodemailer from 'nodemailer';
import { resolve } from 'path';
import exphbs from 'express-handlebars';
import nodemailerhbs from 'nodemailer-express-handlebars';
import mg from 'nodemailer-mailgun-transport';

import mailconfig from '../config/mail';

class Mail {
  constructor() {
    const { auth } = mailconfig;
    this.transport = nodemailer.createTransport(mg({ auth }));
    this.configTemplate();
  }

  configTemplate() {
    const viewPath = resolve(__dirname, '..', 'app', 'views', 'emails');

    this.transport.use(
      'compile',
      nodemailerhbs({
        viewEngine: exphbs.create({
          layoutsDir: resolve(viewPath, 'layouts'),
          partialsDir: resolve(viewPath, 'partials'),
          defaultLayout: 'default',
          extname: '.hbs',
        }),
        viewPath,
        extName: '.hbs',
      })
    );
  }

  sendMail(message) {
    return this.transport.sendMail({
      ...mailconfig.default,
      ...message,
    });
  }
}
export default new Mail();
