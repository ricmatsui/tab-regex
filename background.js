/*global chrome */

(function (chrome) {
  'use strict';

  chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status === 'complete') {
      var replacements = [
          ['(\\w+)\\s+\\/\\s+(\\w+)\\s+\\/\\s+source(.*)(Bitbucket)', 'src / $2 / $1$3$4'],
          ['(\\w+)\\s+\\/\\s+(\\w+)(.*)(Bitbucket)', '$2 / $1$3$4']
        ],
        originalTitle = tab.title,
        newTitle,
        replacement,
        i;
                                         
      for (i = 0; i < replacements.length; i += 1) {
        replacement = replacements[i];
        if ((newTitle = originalTitle.replace(new RegExp(
            replacement[0]
          ), replacement[1])) !== originalTitle) {
          break;
        }
      }
      
      chrome.tabs.sendMessage(tabId, {
        title: newTitle
      });
    }
  });
  
}(chrome));