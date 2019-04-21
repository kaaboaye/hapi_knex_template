import { v4 as uuidV4 } from 'uuid';

export type UUID = string;

export const uuidGenerate: () => UUID = uuidV4;
