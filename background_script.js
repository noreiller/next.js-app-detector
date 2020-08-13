/* global chrome */

"use strict";

function updateIcon(status, tabId) {
  chrome.browserAction.setIcon({
    path: status
      ? {
          "16": "icon-16.png",
          "128": "icon-128.png",
        }
      : {
          "16": "icon-16-not-detected.png",
          "128": "icon-128-not-detected.png",
        },
    tabId: tabId,
  });
  chrome.browserAction.setTitle({
    title: status ? "Next.js detected" : "No Next.js on this page",
    tabId: tabId,
  });
}

chrome.runtime.onMessage.addListener((request, sender) => {
  if (sender.tab) {
    updateIcon(request.status, sender.tab.id);
  }
});

if (navigator.userAgent.indexOf("Firefox") >= 0) {
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tab.active && changeInfo.status === "loading") {
      updateIcon(false, tabId);
    }
  });
}
