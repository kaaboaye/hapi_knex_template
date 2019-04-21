import 'reflect-metadata';
import { start as webStart } from './web';

(async () => {
  await webStart();
})();
