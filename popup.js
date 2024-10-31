function updateDomainList(domains) {
    const domainList = document.getElementById("domainList");
    domainList.innerHTML = ""; // Limpa a lista atual
  
    domains.forEach((domain) => {
      const listItem = document.createElement("li");
      listItem.textContent = domain;
      domainList.appendChild(listItem);
    });
  }
  
  // Carrega a lista de domínios ao abrir o popup
  document.addEventListener("DOMContentLoaded", () => {
    browser.storage.local.get("thirdPartyDomains").then((result) => {
      updateDomainList(result.thirdPartyDomains || []);
    });
  
    // Configura o botão "Limpar Histórico"
    document.getElementById("clearButton").addEventListener("click", () => {
      browser.runtime.sendMessage("clearHistory"); // Envia a mensagem para o background.js
      updateDomainList([]); // Limpa a lista exibida no popup
    });
  });
  
  // Escuta alterações no armazenamento e atualiza a lista automaticamente
  browser.storage.onChanged.addListener((changes, area) => {
    if (area === "local" && changes.thirdPartyDomains) {
      updateDomainList(changes.thirdPartyDomains.newValue || []);
    }
  });
  