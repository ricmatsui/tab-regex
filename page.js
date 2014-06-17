/*global chrome, document */

(function (chrome, document) {
  "use strict";
  
  chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.title !== undefined) {
      document.title = message.title;
    }
  });
  
}(chrome, document));