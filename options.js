/*global chrome, document */

(function (chrome, document) {
  "use strict";
  
  var replacementsTextarea = document.getElementById('replacements-textarea'),
    saveOptions = function () {
      var replacements = replacementsTextarea.value;
      chrome.storage.sync.set({
        replacements: replacements
      }, function () {
        chrome.runtime.sendMessage({
          updated: 'replacements'
        });
      });
    },
    restoreOptions = function () {
      chrome.storage.sync.get({
        replacements: ''
      }, function (items) {
        replacementsTextarea.value = items.replacements;
      });
    };
  document.addEventListener('DOMContentLoaded', restoreOptions);
  document.getElementById('save').addEventListener('click', saveOptions);
}(chrome, document));