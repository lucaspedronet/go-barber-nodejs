import Bee from 'bee-queue';
import CancellationMail from '../app/jobs/CancellationMail';
import redisConfig from '../config/redis';

const jobs = [CancellationMail];

class Queue {
  constructor() {
    // para cada tipo de jobs iremos criar um Fila, o CancellationMail terá uma fila propria por exemplo
    this.queues = {};

    this.init();
  }

  /**
   * inicializando a Fila
   */
  init() {
    /**
     * criando um object com instância de Bee() que contém a chave do job representada por 'key' as
     * configuração de conexão do redis representadas por attributs redis (redisConfig) com 'host' e 'port', nos segundo
     * params passamos a function handle() esse método vai receber essas informações e processar nosso jobs
     */
    jobs.forEach(({ key, handle }) => {
      this.queues[key] = {
        bee: new Bee(key, {
          redis: redisConfig,
        }),
        handle,
      };
    });
  }

  /**
   * @function add: adiciona novos jobs na Fila (this.queue) para ser processados
   */
  add(queue, job) {
    /**
     * queue: Key da Fila
     * job: são os dados desse job
     * acessa o atributo 'bee' dentro da Fila (this.queue) chamando a function createJob() passando 'jos' comp params.
     * em seguida salvamos com save()
     */
    return this.queues[queue].bee.createJob(job).save();
  }

  processeQueu() {
    /**
     * percorremos o array de jobs buscando pela key de cada um deles
     * buscamos a fila do job dentro de this.queues[key] passando a key job
     * por ultimo pegamos o atributo bee e chamamos método process() que vai
     * processar o job dessa fila passando handle
     */
    jobs.forEach(job => {
      const { bee, handle } = this.queues[job.key];

      bee.on('failed', this.handleFailure).process(handle);
    });
  }

  handleFailure(job, err) {
    console.log(`Queue error ${job.queue.name}: FAILED`, err);
  }
}

export default new Queue();
