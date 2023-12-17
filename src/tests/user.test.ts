import { add, multiply } from '../services/UserService.js';

describe('Math functions', () => {
  it('should multiply 5 by 3', () => {
    const result = multiply(5, 3);
    expect(result).toEqual(15);
  });

  it('should add 5 by 3', () => {
    const result = add(5, 3);
    expect(result).toEqual(8);
  });
});