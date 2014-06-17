/*global chrome, RegExp */

(function (chrome, RegExp) {
  'use strict';
  
  var replacements,
    updateReplacements = function (complete) {
      chrome.storage.sync.get({
        replacements: ''
      }, function (items) {
        var serializedReplacements = items.replacements.split('\n'),
          serializedReplacement,
          i;
        
        replacements = [];
        for (i = 0; i < serializedReplacements.length; i += 1) {
          serializedReplacement = serializedReplacements[i].split('-->');
          replacements.push([
            new RegExp(serializedReplacement[0]),
            serializedReplacement[1]
          ]);
        }
        
        if (complete !== undefined) {
          complete();
        }
      });
    },
    registerTabListener = function () {
      chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
        if (changeInfo.status === 'complete') {
          var originalTitle = tab.title,
            newTitle,
            replacement,
            replaced = false,
            i;

          for (i = 0; i < replacements.length; i += 1) {
            replacement = replacements[i];
            if ((newTitle = originalTitle.replace(replacement[0],
                replacement[1])) !== originalTitle) {
              replaced = true;
              break;
            }
          }

          if (replaced) {
            chrome.tabs.sendMessage(tabId, {
              title: newTitle
            });
          }
          chrome.runtime.sendMessage({
            replaced: {
              originalTitle: originalTitle,
              title: newTitle,
              rule: (replaced ? [
                replacement[0].source,
                replacement[1]
              ] : null)
            }
          });
        }
      });
    };
  
  updateReplacements(registerTabListener);
  
  chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.updated === 'replacements') {
      updateReplacements();
    }
  });
  
}(chrome, RegExp));