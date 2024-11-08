let trackerDomains = [
  "doubleclick.net",
  "google-analytics.com",
  "ads.yahoo.com",
  "adservice.google.com",
  "facebook.com",
  "scorecardresearch.com",
  "fonts.googleapis.com",
  "fonts.gstatic.com",
  "accounts.google.com",
  "www.google.com",
  "www.google.com.br",
  "play.google.com"
];

let thirdPartyDomains = new Set();
let blockedTrackers = new Set();
let customTrackerDomains = new Set();
let isBlockingEnabled = true;

browser.storage.local.get(["customTrackerDomains", "isBlockingEnabled"]).then((result) => {
  customTrackerDomains = new Set(result.customTrackerDomains || []);
  isBlockingEnabled = result.isBlockingEnabled !== false;
});

function isTracker(requestUrl) {
  try {
    const requestDomain = new URL(requestUrl).hostname;
    return trackerDomains.some((tracker) => requestDomain.includes(tracker)) ||
           customTrackerDomains.has(requestDomain);
  } catch (error) {
    console.error("Erro ao verificar rastreador:", error);
    return false;
  }
}

browser.storage.onChanged.addListener((changes) => {
  if (changes.customTrackerDomains) {
    customTrackerDomains = new Set(changes.customTrackerDomains.newValue);
  }
  if (changes.isBlockingEnabled) {
    isBlockingEnabled = changes.isBlockingEnabled.newValue;
  }
});

browser.webRequest.onBeforeRequest.addListener(
  (details) => {
    if (!isBlockingEnabled) return; // Bloqueio desativado, não cancela a requisição

    if (isTracker(details.url)) {
      blockedTrackers.add(new URL(details.url).hostname);
      console.log("Rastreador bloqueado:", details.url);
      browser.storage.local.set({ blockedTrackers: Array.from(blockedTrackers) });
      return { cancel: true };
    }

    if (details.tabId !== -1) {
      browser.tabs.get(details.tabId).then((tab) => {
        if (isThirdParty(details.url, tab.url)) {
          thirdPartyDomains.add(new URL(details.url).hostname);
          browser.storage.local.set({ thirdPartyDomains: Array.from(thirdPartyDomains) });
        }
      });
    }
  },
  { urls: ["<all_urls>"] },
  ["blocking"]
);
