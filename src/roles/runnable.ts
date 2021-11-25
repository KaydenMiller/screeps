export type Runner = (creep: Creep) => void;
export interface Runnable {
  run(): Runner;
}
