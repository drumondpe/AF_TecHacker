function updateDomainList(domains, trackers) {
    const domainList = document.getElementById("domainList");
    domainList.innerHTML = ""; // Limpa a lista atual de domínios de terceiros
  
    domains.forEach((domain) => {
      const listItem = document.createElement("li");
      listItem.textContent = domain;
      domainList.appendChild(listItem);
    });
  
    const trackerList = document.getElementById("trackerList");
    trackerList.innerHTML = ""; // Limpa a lista atual de rastreadores bloqueados
  
    trackers.forEach((tracker) => {
      const listItem = document.createElement("li");
      listItem.textContent = tracker;
      trackerList.appendChild(listItem);
    });
  }
  
  // Carrega a lista de domínios e rastreadores ao abrir o popup
  document.addEventListener("DOMContentLoaded", () => {
    browser.storage.local.get(["thirdPartyDomains", "blockedTrackers"]).then((result) => {
      updateDomainList(result.thirdPartyDomains || [], result.blockedTrackers || []);
    });
  
    // Configura o botão "Limpar Histórico"
    document.getElementById("clearButton").addEventListener("click", () => {
      browser.runtime.sendMessage("clearHistory"); // Envia a mensagem para o background.js
      updateDomainList([], []); // Limpa as listas exibidas no popup
    });
  });
  
  // Escuta alterações no armazenamento e atualiza as listas automaticamente
  browser.storage.onChanged.addListener((changes, area) => {
    if (area === "local") {
      const domains = changes.thirdPartyDomains ? changes.thirdPartyDomains.newValue : [];
      const trackers = changes.blockedTrackers ? changes.blockedTrackers.newValue : [];
      updateDomainList(domains, trackers);
    }
  });
  