/*global chrome, document, $ */

(function (chrome, document, $) {
  "use strict";
  
  var replacementsTextarea = document.getElementById('replacements-textarea'),
    recentReplacementsTable = $('#recent-replacements-table'),
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
    },
    titleReplaced = function (replaced) {
      console.log(replaced);
      var row = $('<tr></tr>');
      row.append($('<td></td>').text(replaced.originalTitle));
      row.append($('<td></td>').text(replaced.title));
      if (replaced.rule !== null) {
        row.append($('<td></td>').text(replaced.rule[0] + '-->' + replaced.rule[1]));
      } else {
        row.append($('<td></td>').text('None'));
      }
      recentReplacementsTable.prepend(row);
    };
  document.addEventListener('DOMContentLoaded', restoreOptions);
  document.getElementById('save').addEventListener('click', saveOptions);
  chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.replaced !== undefined) {
      titleReplaced(message.replaced);
    }
  });
}(chrome, document, $));