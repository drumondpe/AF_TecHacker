const trackerDomains = [
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
  
  // Limpa o histórico ao iniciar a extensão
  browser.storage.local.set({ thirdPartyDomains: [], blockedTrackers: [] });
  
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
  
  function isTracker(requestUrl) {
    try {
      const requestDomain = new URL(requestUrl).hostname;
      return trackerDomains.some((tracker) => requestDomain.includes(tracker));
    } catch (error) {
      console.error("Erro ao verificar rastreador:", error);
      return false;
    }
  }
  
  browser.webRequest.onBeforeRequest.addListener(
    (details) => {
      // Se a URL for um rastreador, adiciona à lista e cancela a requisição
      if (isTracker(details.url)) {
        blockedTrackers.add(new URL(details.url).hostname);
        console.log("Rastreador bloqueado:", details.url); // Log para diagnóstico
        browser.storage.local.set({ blockedTrackers: Array.from(blockedTrackers) });
        return { cancel: true };
      }
  
      // Se a URL for um domínio de terceiro, adiciona ao armazenamento local
      if (details.tabId !== -1) {
        browser.tabs.get(details.tabId).then((tab) => {
          if (isThirdParty(details.url, tab.url)) {
            thirdPartyDomains.add(new URL(details.url).hostname);
            console.log("Domínio de terceiro detectado:", details.url); // Log para diagnóstico
            browser.storage.local.set({ thirdPartyDomains: Array.from(thirdPartyDomains) });
          }
        });
      }
    },
    { urls: ["<all_urls>"] },
    ["blocking"]
  );
  
  // Responde ao popup com a lista de rastreadores bloqueados e limpa as listas quando solicitado
  browser.runtime.onMessage.addListener((message) => {
    if (message === "clearHistory") {
      console.log("Histórico limpo."); // Log para diagnóstico
      thirdPartyDomains.clear(); // Limpa o Set de domínios de terceiros
      blockedTrackers.clear(); // Limpa o Set de rastreadores bloqueados
      browser.storage.local.set({ thirdPartyDomains: [], blockedTrackers: [] }); // Atualiza o armazenamento
    }
  });
  