'use strict';

describe('Tips E2E Tests:', function () {
  describe('Test Tips page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/tips');
      expect(element.all(by.repeater('tip in tips')).count()).toEqual(0);
    });
  });
});
