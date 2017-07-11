import { WcubedSpaPage } from './app.po';

describe('wcubed-spa App', () => {
  let page: WcubedSpaPage;

  beforeEach(() => {
    page = new WcubedSpaPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
