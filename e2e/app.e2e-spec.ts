import { EcommerceAngularPage } from './app.po';

describe('ecommerce-angular App', () => {
  let page: EcommerceAngularPage;

  beforeEach(() => {
    page = new EcommerceAngularPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
