function updateDomainList(domains, trackers, customTrackers) {
  const isBlockingEnabled = document.getElementById("toggleBlocking").checked;
  
  const domainList = document.getElementById("domainList");
  const trackerList = document.getElementById("trackerList");
  const customTrackerList = document.getElementById("customTrackerList");

  // Limpa as listas existentes
  domainList.innerHTML = "";
  trackerList.innerHTML = "";
  customTrackerList.innerHTML = "";

  // Atualiza apenas se o bloqueio estiver ativado
  if (isBlockingEnabled) {
    domains.forEach((domain) => {
      const listItem = document.createElement("li");
      listItem.textContent = domain;
      domainList.appendChild(listItem);
    });

    trackers.forEach((tracker) => {
      const listItem = document.createElement("li");
      listItem.textContent = tracker;
      trackerList.appendChild(listItem);
    });
  }

  // Sempre atualiza a lista personalizada, independentemente do estado de bloqueio
  customTrackers.forEach((customTracker) => {
    const listItem = document.createElement("li");
    listItem.textContent = customTracker;
    customTrackerList.appendChild(listItem);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  browser.storage.local.get(["thirdPartyDomains", "blockedTrackers", "customTrackerDomains", "isBlockingEnabled"]).then((result) => {
    // Define o estado inicial do switch de bloqueio
    document.getElementById("toggleBlocking").checked = result.isBlockingEnabled !== false;
    
    updateDomainList(result.thirdPartyDomains || [], result.blockedTrackers || [], result.customTrackerDomains || []);
  });

  // Atualiza o estado de bloqueio
  document.getElementById("toggleBlocking").addEventListener("change", (event) => {
    const isBlockingEnabled = event.target.checked;
    browser.storage.local.set({ isBlockingEnabled });
    showStatusMessage(isBlockingEnabled ? "Bloqueio ativado." : "Bloqueio desativado.");

    // Atualiza as listas para refletir o novo estado de bloqueio
    browser.storage.local.get(["thirdPartyDomains", "blockedTrackers", "customTrackerDomains"]).then((result) => {
      updateDomainList(result.thirdPartyDomains || [], result.blockedTrackers || [], result.customTrackerDomains || []);
    });
  });

  document.getElementById("addCustomDomain").addEventListener("click", () => {
    const customDomain = document.getElementById("customDomain").value;
    if (customDomain) {
      browser.storage.local.get("customTrackerDomains").then((result) => {
        const customDomains = new Set(result.customTrackerDomains || []);
        customDomains.add(customDomain);
        browser.storage.local.set({ customTrackerDomains: Array.from(customDomains) });
        document.getElementById("customDomain").value = "";
        showStatusMessage("Domínio adicionado com sucesso.");
        updateDomainList([], [], Array.from(customDomains)); // Atualiza a lista de rastreadores personalizados
      });
    } else {
      showStatusMessage("Por favor, insira um domínio válido.", false);
    }
  });

  document.getElementById("removeCustomDomain").addEventListener("click", () => {
    const customDomain = document.getElementById("customDomain").value;
    if (customDomain) {
      browser.storage.local.get("customTrackerDomains").then((result) => {
        const customDomains = new Set(result.customTrackerDomains || []);
        if (customDomains.delete(customDomain)) {
          browser.storage.local.set({ customTrackerDomains: Array.from(customDomains) });
          showStatusMessage("Domínio removido com sucesso.");
          updateDomainList([], [], Array.from(customDomains)); // Atualiza a lista de rastreadores personalizados
        } else {
          showStatusMessage("Domínio não encontrado na lista.", false);
        }
        document.getElementById("customDomain").value = "";
      });
    } else {
      showStatusMessage("Por favor, insira um domínio válido.", false);
    }
  });

  browser.storage.onChanged.addListener((changes, area) => {
    if (area === "local") {
      const domains = changes.thirdPartyDomains ? changes.thirdPartyDomains.newValue : [];
      const trackers = changes.blockedTrackers ? changes.blockedTrackers.newValue : [];
      const customTrackers = changes.customTrackerDomains ? changes.customTrackerDomains.newValue : [];
      updateDomainList(domains, trackers, customTrackers);
    }
  });
});
