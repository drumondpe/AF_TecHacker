// Limpa o histórico ao iniciar a extensão
browser.storage.local.set({ thirdPartyDomains: [] });

let thirdPartyDomains = new Set();

function isThirdParty(requestUrl, tabUrl) {
  try {
    const requestDomain = new URL(requestUrl).hostname;
    const tabDomain = new URL(tabUrl).hostname;
    return requestDomain !== tabDomain;
  } catch (error) {
    console.error("Erro ao comparar domínios:", error);
    return false;
  }
}

browser.webRequest.onCompleted.addListener(
  (details) => {
    if (details.tabId !== -1) {
      browser.tabs.get(details.tabId).then((tab) => {
        if (isThirdParty(details.url, tab.url)) {
          thirdPartyDomains.add(new URL(details.url).hostname);
          browser.storage.local.set({ thirdPartyDomains: Array.from(thirdPartyDomains) });
        }
      });
    }
  },
  { urls: ["<all_urls>"] }
);

// Escuta o evento de mensagem para limpar o histórico
browser.runtime.onMessage.addListener((message) => {
  if (message === "clearHistory") {
    thirdPartyDomains.clear(); // Limpa a memória ativa
    browser.storage.local.set({ thirdPartyDomains: [] }); // Limpa o armazenamento local
  }
});
