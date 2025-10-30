import { app } from './server.js'

const TCP_PORT = 8080;

try {

  app.listen(TCP_PORT, () => {
    console.log(`Running in http://localhost:${TCP_PORT}`);
  });

}
catch (error) { console.error(error); }