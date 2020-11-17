import { createConnection } from 'typeorm';

// chamando a função o createConnection ela vai procurar nas pastas do projeto
// o arquivo chamado ormconfig.json e vai fazer a conexão com o banco
createConnection();
