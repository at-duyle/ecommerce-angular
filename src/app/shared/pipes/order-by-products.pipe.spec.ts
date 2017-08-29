import { OrderByProductsPipe } from './order-by-products.pipe';

describe('OrderByProductsPipe', () => {
  it('create an instance', () => {
    const pipe = new OrderByProductsPipe();
    expect(pipe).toBeTruthy();
  });
});
