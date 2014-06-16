/*global chrome, document */

(function (chrome, document) {
  "use strict";
  
  chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    document.title = message.title;
  });
  
}(chrome, document));