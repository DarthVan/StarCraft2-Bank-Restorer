import { dateID, n2t, r, t2n } from "./utils";

describe('time convertor validate', (): void => {

	test('time to number 1', (): void => {
		expect(t2n('00:01:30')).toBe(90);
	});

	test('time to number 2', (): void => {
		expect(t2n('00:12:45')).toBe(765);
	});

	test('time to number 3', (): void => {
		expect(t2n('01:25:30')).toBe(5130);
	});

	test('number to time 1', (): void => {
		expect(n2t(50)).toBe('00:00:50');
	});

	test('number to time 2', (): void => {
		expect(n2t(350)).toBe('00:05:50');
	});

	test('number to time 3', (): void => {
		expect(n2t(5240)).toBe('01:27:20');
	});

});

describe('random generator validate', (): void => {

	test('random 1', (): void => {
		expect(r(0, 1)).toBeGreaterThanOrEqual(0);
	});

	test('random 2', (): void => {
		expect(r(0, 1)).toBeLessThanOrEqual(1);
	});

	test('random 3', (): void => {
		expect(r(4, 5)).toBeGreaterThanOrEqual(4);
	});

	test('random 4', (): void => {
		expect(r(4, 5)).toBeLessThanOrEqual(5);
	});

});

describe('ID generator validate', (): void => {

	test('ID test 1: string', (): void => {
		expect(typeof dateID(2) == 'string').toBe(true);
	});

	test('ID test 2: min length', (): void => {
		expect(dateID(2).length).toBeGreaterThanOrEqual(9);
	});

	test('ID test 3: max length', (): void => {
		expect(dateID(2).length).toBeLessThanOrEqual(10);
	});

});