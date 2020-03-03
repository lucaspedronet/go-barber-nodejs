// import nodemailer from 'nodemailer';
// import { resolve } from 'path';
// import exphbs from 'express-handlebars';
// import nodemailerhbs from 'nodemailer-express-handlebars';
// import mailConfig from '../config/mail';

// class Mail {
//   constructor() {
//     const { host, port, secure, auth } = mailConfig;
//     /**
//      * configurando o envio de email
//      */
//     this.transporter = nodemailer.createTransport({
//       host,
//       port,
//       secure,
//       auth: auth.user ? auth : null,
//       // Caso não haja nenhum usuário, auth irá receber null.
//     });

//     this.configureTempletes();
//   }

//   configureTempletes() {
//     /**
//      * criado path do caminhos default de layouts/email/partial
//      */
//     const viewPath = resolve(__dirname, '..', 'app', 'views', 'emails');

//     /**
//      * vamos add umas configurações para instância this.transporter
//      * use('compile'): É a forma como 'nodemailer-express-handlebars' age dentro do 'nodemailer' nos permite dizer como
//      * ele vai traduzier nossas mensagem/tamplete
//      */
//     this.transporter.use(
//       'compile',
//       nodemailerhbs({
//         viewEngine: exphbs.create({
//           layoutsDir: resolve(viewPath, 'layouts'),
//           partialsDir: resolve(viewPath, 'partials'),
//           defaultLayout: 'default',
//           extname: '.hbs',
//         }),
//         viewPath,
//         extName: '.hbs',
//       })
//     );
//   }

//   sendMail(message) {
//     /**
//      * this.transporter.sendMAil(): sendMail() é o método que p nodemailer utilizado para envio de emails
//      */
//     return this.transporter.sendMail({
//       ...mailConfig.default,
//       ...message,
//     });
//   }
// }

// export default new Mail();
