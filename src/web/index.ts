import { Server } from 'hapi';
import Container from 'typedi';
import { WebRoutes } from './routes';

const routes = Container.get(WebRoutes).routes;

export async function start(): Promise<void> {
  const server = new Server({ port: 4000, debug: { request: ['error'] } });

  await server.register({ plugin: require('blipp'), options: { showAuth: true } });

  server.route(routes);

  await server.start();
}
