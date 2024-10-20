chrome.action.onClicked.addListener(() => {
  chrome.tabs.create({ url: chrome.runtime.getURL("slope.html") });
});

chrome.runtime.onInstalled.addListener((e) => {
  if (e.reason === "install") {
    chrome.tabs.create({ url: chrome.runtime.getURL("slope.html") });
  }
});
