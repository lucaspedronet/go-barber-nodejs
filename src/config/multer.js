import multer from 'multer';
import cryptor from 'crypto';
import { extname, resolve } from 'path';

export default {
  storage: multer.diskStorage({
    /**
     * @param destination: caminho para onde o arquivo de img ficará guardado
     * @param filename: Todas informações do arquivo (tipo, tamanho, data e etc)
     */
    destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    /**
     * @param res: require da requisição
     * @param file: arquivo de img
     * @param cb: Calbakc
     */
    filename: (req, file, cb) => {
      cryptor.randomBytes(16, (err, res) => {
        if (err) return cb(err);

        // cb (error, resposta caso de tudo certo)
        return cb(null, res.toString('hex') + extname(file.originalname));
      });
    },
  }),
};
