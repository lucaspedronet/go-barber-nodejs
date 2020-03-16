/**
 * redis roda localmente ou seja no IP '127.0.0.1' entretanto como estamos utilizando docker no virtualbox
 * ele passa a rodar o IP '192.168.99.100' por isso nosso host recebe esse IP.
 */
export default {
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
};
