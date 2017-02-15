import { browser, element, by } from 'protractor';

export class GraphhopperNgPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root .navbar-brand span')).getText();
  }

  addMarker() {
    element(by.id('add-marker')).click();
  }

  removeMarker() {
    element(by.id('remove-marker')).click();
  }

  clickOnMap(x, y) {
    browser.actions().mouseMove(element(by.id('map')).getWebElement(), {x: x, y: y}).click().perform();
    browser.sleep(1000);
  }

  countMarkers() {
    return element.all(by.css('app-root .leaflet-marker-pane img')).count();
  }

  search(location) {
    let input = element(by.id('place-input'));
    browser.executeScript("arguments[0].value = 'london';arguments[0].dispatchEvent(new Event('input'))", input);
//    element(by.id('place-input')).sendKeys("london");
    element(by.id('goto')).click();
    // browser.sleep(1000);
  }

  getLocation() {
    return element(by.id('place-input')).getAttribute('value');
  }
}
