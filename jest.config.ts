import type {Config} from '@jest/types';

export default async (): Promise<Config.InitialOptions> => {
  return {
    verbose: true,
    moduleFileExtensions: ["js", "json", "node"],
    transform: {"\\.ts?$": "ts-jest"}
  };
};