/**
 * @function promisify Nos permite transformar um modelo function de `callbac/promisi` para `Async/Await`.
 */
import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../../config/auth';

export default async (req, res, next) => {
  // passando o token por headers.Authorization
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provider' });
  }

  /**
   * @example na linha 18 a const authHeader armazena duas string *"Bearer eyJhbGciOiJIUzI1..."* separadas por espaço
   * daí a necessidade de utilizar o `split(' ')` separar-las e pegar apenas o token.
   */
  const [, token] = authHeader.split(' ');

  try {
    /**
     * @constant decoded `promisify`(jwt.verify)(token, authConfug.secret) a function promisify transforma a function verify() de
     * callback (que usa o the()cath()) em uma function que permite a utilização do *async await*.
     * em seguida retorna em uma função assim podemos chamar esse função com a seguinte sintaxe promisify(jwt.verify)(token, authConfig.secret)
     * passando outros dois parâmetro `(token, authConfug.secret)`, neste momento o *jwt.verify*
     * esta realizando uma verificação/comparação entre *token* e *authConfug.secret*. Caso NÃO seja iguis
     * (token, authConfug.secret) irá cair diretamente para o cath.
     */
    const { id, profile, profileId } = await promisify(jwt.verify)(
      token,
      authConfig.secret
    );
    /**
     * @variation req.userId uma nova variável criada em tempo de execução, que vai
     * armazenar o id do usuário dentro de *req* = *req.userId*
     */
    req.userId = id;
    req.isProfile = profile;
    req.profileId = profileId;

    return next();
  } catch (error) {
    return res.status(401).json({ error: 'Token not Authorization.' });
  }
};
