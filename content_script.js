/* global chrome */

"use strict";

let lastDetectionResult;

window.addEventListener("message", function (evt) {
  if (evt.source !== window || !evt.data) {
    return;
  }

  if (evt.data.source === "next.js-app-detector") {
    lastDetectionResult = evt.data;
    chrome.runtime.sendMessage(lastDetectionResult);
  }
});

window.addEventListener("pageshow", function (evt) {
  if (!lastDetectionResult || evt.target !== window.document) {
    return;
  }

  chrome.runtime.sendMessage(lastDetectionResult);
});

function injectScript() {
  var s = document.createElement("script");
  s.setAttribute("type", "text/javascript");
  s.textContent =
    "window.postMessage({ source: 'next.js-app-detector', status: !!window.__NEXT_DATA__ });";
  document.body.appendChild(s);
}

injectScript();
