import { OrderByTimePipe } from './order-by-time.pipe';

describe('OrderByTimePipe', () => {
  it('create an instance', () => {
    const pipe = new OrderByTimePipe();
    expect(pipe).toBeTruthy();
  });
});
