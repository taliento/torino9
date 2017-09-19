import { Torino9appPage } from './app.po';

describe('torino9app App', () => {
  let page: Torino9appPage;

  beforeEach(() => {
    page = new Torino9appPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
