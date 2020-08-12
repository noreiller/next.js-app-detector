function updateIcon(status, tabId) {
  browser.browserAction.setIcon({
    path: status
      ? {
          48: "icon.svg",
        }
      : {
          48: "icon-not-detected.svg",
        },
    tabId: tabId,
  });
  browser.browserAction.setTitle({
    title: status ? "Next.js detected" : "No Next.js on this page",
    tabId: tabId,
  });
}

browser.runtime.onMessage.addListener((request, sender) => {
  if (sender.tab) {
    updateIcon(request.status, sender.tab.id);
  }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tab.active && changeInfo.status === "loading") {
    updateIcon(false, tabId);
  }
});
