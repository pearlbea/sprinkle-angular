import { AngularSprinklePage } from './app.po';

describe('angular-sprinkle App', () => {
  let page: AngularSprinklePage;

  beforeEach(() => {
    page = new AngularSprinklePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
