import type { JestConfigWithTsJest } from 'ts-jest';

const jestConfig: JestConfigWithTsJest = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	//cacheDirectory: 'A:/Temp/jest'
}

export default jestConfig;