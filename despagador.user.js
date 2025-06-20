// ==UserScript==
// @name        Despagador de Artículos Académicos
// @namespace   https://github.com/Chicharr0n/despagador/
// @version     1.2
// @description Accede a artículos académicos sin pagar (Sci-Hub, Unpaywall, CORE, etc.)
// @author      Chicharrón
// @license     MIT
// @homepage    https://github.com/Chicharr0n/despagador/
// @match       *://*/doi/*
// @match       *://*/doiLanding*
// @match       *://*/*?doi=*
// @match       *://*.nlm.nih.gov/*
// @match       *://www.nature.com/articles/*
// @match       *://zenodo.org/record/*
// @match       *://www.sciencedirect.com/science/article/*
// @match       *://ieeexplore.ieee.org/document/*
// @match       *://www.epistemonikos.org/*/documents/*
// @match       *://psycnet.apa.org/record/*
// @match       *://www.cdc.gov/mmwr/volumes/*
// @match       *://iastatedigitalpress.com/jlsc/*
// @match       *://www.researchgate.net/publication/*
// @match       *://www.thelancet.com/journals/*
// @match       *://www.nber.org/papers/*
// @match       *://www.cell.com/*/fulltext/*
// @match       *://pubs.rsc.org/*/articlelanding/*
// @match       *://*.biomedcentral.com/articles/*
// @match       *://nowpublishers.com/article/*
// @match       *://jamanetwork.com/*
// @match       *://www.bmj.com/content/*
// @match       *://*.aspetjournals.org/content/*
// @match       *://philpapers.org/rec/*
// @match       *://www.jci.org/articles/*
// @match       *://www.computer.org/csdl/*
// @match       *://muse.jhu.edu/pub/*
// @match       *://muse.jhu.edu/article/*
// @match       *://www.deepdyve.com/lp/*
// @match       *://www.degruyter.com/document/doi/*
// @match       *://www.nli.org.il/en/articles/*
// @match       *://link.springer.com/*
// @match       *://www.jstor.org/stable/*
// @match       *://www.frontiersin.org/journals/*
// @match       *://www.cambridge.org/core/journals/*
// @match       *://annalsofglobalhealth.org/*
// @exclude     *://annas-archive.org/*
// @grant       GM.xmlHttpRequest
// @grant       GM.registerMenuCommand
// @grant       GM.notification
// @run-at      document-end
// ==/UserScript==

const CONFIG = {
  ENABLE_SCIHUB: true,
  ENABLE_UNPAYWALL: true,
  ENABLE_CORE: true,
  ENABLE_GOOGLE_SCHOLAR: true,
  ENABLE_LIBGEN: true,
  SHOW_NOTIFICATION: true,
  SHOW_FLOATING_LOCK: true,
  SCIHUB_URL: "https://sci-hub.ru/",
  UNPAYWALL_URL: "https://api.unpaywall.org/v2/",
  CORE_URL: "https://core.ac.uk/search?q=",
  GOOGLE_SCHOLAR_URL: "https://scholar.google.com/scholar?q=",
  LIBGEN_URL: "https://libgen.rs/search.php?req=",
  NOTIFICATIONS: true,
  DEBUG: false
};

(function() {
  "use strict";

  // ==================== CACHE ====================
  const cache = {
    doi: null,
    unpaywallData: null,
    lastFetch: 0
  };

  // ==================== ICONOS (Base64) ====================
  const ICONS = {
    SCIHUB: "data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiAgd2lkdGg9IjQ1IiAgaGVpZ2h0PSI0NSIgIHZpZXdCb3g9IjAgMCAyNCAyNCIgIGZpbGw9Im5vbmUiICBzdHJva2U9IiNDQzAwMDAiICBzdHJva2Utd2lkdGg9IjIuMiIgIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIHN0cm9rZT0ibm9uZSIgZD0iTTAgMGgyNHYyNEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik01IDExbTAgMmEyIDIgMCAwIDEgMiAtMmgxMGEyIDIgMCAwIDEgMiAydjZhMiAyIDAgMCAxIC0yIDJoLTEwYTIgMiAwIDAgMSAtMiAtMnoiIC8+PHBhdGggZD0iTTEyIDE2bS0xIDBhMSAxIDAgMSAwIDIwMGExIDEgMCAxIDAgLTIgMCIgLz48cGF0aCBkPSJNOCAxMXYtNWE0IDQgMCAwIDEgOCAwIiAvPjwvc3ZnPg==",
    UNPAYWALL: "data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiAgd2lkdGg9IjQ1IiAgaGVpZ2h0PSI0NSIgIHZpZXdCb3g9IjAgMCAyNCAyNCIgIGZpbGw9Im5vbmUiICBzdHJva2U9IiMyQ0JCNEMiICBzdHJva2Utd2lkdGg9IjIuMiIgIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIHN0cm9rZT0ibm9uZSIgZD0iTTAgMGgyNHYyNEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik01IDExbTAgMmEyIDIgMCAwIDEgMiAtMmgxMGEyIDIgMCAwIDEgMiAydjZhMiAyIDAgMCAxIC0yIDJoLTEwYTIgMiAwIDAgMSAtMiAtMnoiIC8+PHBhdGggZD0iTTEyIDE2bS0xIDBhMSAxIDAgMSAwIDIwMGExIDEgMCAxIDAgLTIgMCIgLz48cGF0aCBkPSJNOCAxMXYtNWE0IDQgMCAxIDEgOCAwIiAvPjwvc3ZnPg==",
    CORE: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDA2RkZGIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBhdGggZD0iTTEyIDIyYzUuNTIzIDAgMTAtNC40NzcgMTAtMTBTMTcuNTIzIDIgMTIgMnMtMTAgNC40NzctMTAgMTAgNC40NzcgMTAgMTAgMTB6Ii8+PHBhdGggZD0iTTggMTJoOCIvPjxwYXRoIGQ9Ik0xMiAxNnYtOCIvPjwvc3ZnPg==",
    SCHOLAR: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNDI4NUY0IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBhdGggZD0iTTEyIDEwYzIgMi4yIDIgNS40IDIgOS0yLjIgMi0xMiAyLTEyIDAgMC0zLjYgMC02LjggMi05em0wIDBjLTIgMi4yLTIgNS40LTIgOSAyLjIgMiAxMiAyIDEyIDAgMC0zLjYgMC02LjgtMi05eiIvPjwvc3ZnPg==",
    LIBGEN: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjRkZDNzBBIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBhdGggZD0iTTMgMTlsOS03LTktN3YxNHoiLz48cGF0aCBkPSJNMTIgMTlsOS03LTktN3YxNHoiLz48L3N2Zz4="
  };

  // ==================== FUNCIONES PRINCIPALES ====================

  // 🔍 Buscar DOI en la página
  function findDoi() {
    if (cache.doi) return cache.doi;

    // Buscar en meta tags
    const metaTags = document.querySelectorAll("meta");
    for (const meta of metaTags) {
      if (!meta.name) continue;
      const metaName = meta.name.toLowerCase();
      const doiMetaNames = ["citation_doi", "doi", "dc.doi", "dc.identifier", "prism.doi"];
      if (doiMetaNames.includes(metaName)) {
        const content = meta.content.trim();
        if (content.startsWith("10.")) {
          cache.doi = content;
          debugLog("DOI encontrado en meta tag:", content);
          return content;
        }
      }
    }

    // Buscar en atributos data
    const dataDoiElements = document.querySelectorAll("[data-doi], [data-article-doi]");
    for (const el of dataDoiElements) {
      const doi = el.getAttribute("data-doi") || el.getAttribute("data-article-doi");
      if (doi && doi.trim().startsWith("10.")) {
        cache.doi = doi.trim();
        debugLog("DOI encontrado en atributo data:", doi);
        return cache.doi;
      }
    }

    // Buscar en la URL
    const urlPatterns = [
      /\b(10\.\d{4,9}\/[-._;()/:A-Z0-9]+)\b/i,
      /doi[=/:](10\.\d{4,9}\/[-._;()/:A-Z0-9]+)/i
    ];
    for (const pattern of urlPatterns) {
      const match = window.location.href.match(pattern);
      if (match && match[1]) {
        cache.doi = match[1];
        debugLog("DOI encontrado en URL:", match[1]);
        return cache.doi;
      }
    }

    debugLog("No se encontró DOI en la página");
    return null;
  }

  // 🔔 Mostrar notificación
  function showNotification(title, message) {
    if (CONFIG.NOTIFICATIONS && typeof GM_notification !== "undefined") {
      GM_notification({
        title: title,
        text: message,
        silent: true,
        timeout: 3000
      });
    }
  }

  // 🔓 Crear candado flotante
  function createFloatingLock() {
    if (!CONFIG.SHOW_FLOATING_LOCK) return;

    const lock = document.createElement('div');
    lock.innerHTML = '🔓';
    lock.style = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      font-size: 24px;
      cursor: pointer;
      z-index: 9999;
      background: white;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    `;
    lock.title = "Abrir con Despagador";

    lock.addEventListener('click', () => {
      const doi = findDoi();
      if (doi) window.open(`${CONFIG.SCIHUB_URL}${doi}`);
    });

    document.body.appendChild(lock);
  }

  // 🌐 Fetch Unpaywall data
  async function fetchUnpaywallData(doi) {
    if (cache.unpaywallData && Date.now() - cache.lastFetch < 300000) {
      debugLog("Usando datos cacheados de Unpaywall");
      return cache.unpaywallData;
    }

    try {
      const email = "unpaywall@example.com"; // Cambia a tu email
      const url = `${CONFIG.UNPAYWALL_URL}${encodeURIComponent(doi)}?email=${email}`;
      
      debugLog("Buscando datos en Unpaywall para DOI:", doi);
      
      let response;
      if (typeof GM_xmlhttpRequest !== "undefined") {
        response = await new Promise((resolve, reject) => {
          GM_xmlhttpRequest({
            method: "GET",
            url: url,
            onload: (r) => resolve({ ok: r.status >= 200 && r.status < 300, json: () => JSON.parse(r.responseText) }),
            onerror: reject
          });
        });
      } else {
        response = await fetch(url);
      }

      if (!response.ok) {
        debugLog("Error en API Unpaywall:", response.status);
        return {};
      }

      const data = await response.json();
      cache.unpaywallData = data;
      cache.lastFetch = Date.now();
      debugLog("Datos de Unpaywall recibidos:", data);
      return data;
    } catch (error) {
      debugLog("Error al obtener datos de Unpaywall:", error);
      showNotification("Despagador", "Error al conectar con Unpaywall");
      return {};
    }
  }

  // 🏗 Crear contenedor de botones
  function createButtonContainer() {
    const existingContainer = document.getElementById("despagador-container");
    if (existingContainer) return existingContainer.shadowRoot.querySelector(".button-group");

    const container = document.createElement("div");
    container.id = "despagador-container";
    const shadow = container.attachShadow({ mode: "closed" });

    const style = document.createElement("style");
    style.textContent = `
      :host {
        position: fixed;
        right: 0;
        bottom: 0;
        z-index: 9999;
        font-family: system-ui, sans-serif;
      }
      .despagador-wrapper {
        background: #fcfdfe;
        border: 1.5px solid #e3e7ee;
        border-radius: 18px 18px 0 0;
        box-shadow: 0 0 16px 0 rgba(60,72,90,0.13);
        min-width: 2px;
        max-width: 320px;
        margin: 0 12px 12px 0;
        display: flex;
        flex-direction: column;
        align-items: stretch;
        transition: transform 0.3s cubic-bezier(.4,1.4,.6,1), box-shadow 0.2s;
        transform: translateY(0);
      }
      .despagador-wrapper.collapsed {
        box-shadow: none;
        background: transparent;
        border: none;
        min-width: 0;
        max-width: none;
        margin: 0 16px 8px 0;
        transform: translateY(calc(100% - 30px));
        pointer-events: auto;
      }
      .toggle-button {
        background: none;
        border: none;
        cursor: pointer;
        padding: 8px 0;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        transition: background 0.15s;
        z-index: 2;
        position: relative;
      }
      .toggle-arrow {
        width: 40px;
        height: 40px;
        transition: transform 0.2s;
        display: block;
        margin: 0 auto;
      }
      .despagador-wrapper.collapsed .toggle-arrow {
        transform: rotate(180deg);
      }
      .button-group {
        display: flex;
        flex-direction: column;
        padding: 8px 0 14px 0;
        transition: max-height 0.3s, opacity 0.2s;
        max-height: 800px;
        opacity: 1;
        overflow: hidden;
      }
      .despagador-wrapper.collapsed .button-group {
        max-height: 0;
        opacity: 0;
        pointer-events: none;
        padding: 0;
      }
      .access-link {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px 18px;
        margin: 0 10px 6px 10px;
        text-decoration: none;
        font-size: 18px;
        font-weight: 600;
        color: #2d3748;
        border-radius: 10px;
        transition: background 0.13s, text-decoration 0.13s;
      }
      .access-link:hover {
        background: #f2f6fa;
        text-decoration: underline;
      }
      .access-link img {
        width: 45px;
        height: 45px;
        flex-shrink: 0;
      }
      .scihub-link span { color: #c00; }
      .unpaywall-link span { color: #2CBB4C; }
      .core-link span { color: #006FFF; }
      .scholar-link span { color: #4285F4; }
      .libgen-link span { color: #FFC70A; }
      .no-access {
        padding: 12px 18px;
        margin: 0 10px 6px 10px;
        font-size: 16px;
        color: #6b7280;
        text-align: center;
      }
    `;

    const wrapper = document.createElement("div");
    wrapper.className = "despagador-wrapper";

    const toggle = document.createElement("button");
    toggle.className = "toggle-button";
    toggle.title = "Mostrar/ocultar Despagador";
    toggle.innerHTML = `
      <svg class="toggle-arrow" viewBox="0 0 24 24">
        <polygon points="12,16 6,9 18,9" fill="#6c757d"/>
      </svg>`;

    const group = document.createElement("div");
    group.className = "button-group";

    wrapper.append(toggle, group);
    shadow.append(style, wrapper);
    document.body.append(container);

    toggle.addEventListener("click", () => {
      wrapper.classList.toggle("collapsed");
    });

    return group;
  }

  // 🔗 Crear botón de acceso
  function createLink(container, icon, label, className, url) {
    if (!url) return;

    const a = document.createElement("a");
    a.className = `access-link ${className}`;
    a.href = url;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.innerHTML = `<img src="${icon}" alt=""><span>${label}</span>`;
    container.appendChild(a);
  }

  // 🛠 Actualizar botones
  async function refreshButtons() {
    const buttonGroup = createButtonContainer();
    buttonGroup.innerHTML = "";

    const doi = findDoi();
    if (!doi) {
      const noAccess = document.createElement("div");
      noAccess.className = "no-access";
      noAccess.textContent = "No se encontró DOI en esta página";
      buttonGroup.appendChild(noAccess);
      return;
    }

    if (CONFIG.ENABLE_SCIHUB) {
      createLink(buttonGroup, ICONS.SCIHUB, "Sci-Hub", "scihub-link", `${CONFIG.SCIHUB_URL}${doi}`);
    }

    if (CONFIG.ENABLE_UNPAYWALL) {
      const unpaywallData = await fetchUnpaywallData(doi);
      if (unpaywallData.best_oa_location?.url) {
        createLink(buttonGroup, ICONS.UNPAYWALL, "Unpaywall", "unpaywall-link", unpaywallData.best_oa_location.url);
      }
    }

    if (CONFIG.ENABLE_CORE) {
      createLink(buttonGroup, ICONS.CORE, "CORE", "core-link", `${CONFIG.CORE_URL}${encodeURIComponent(doi)}`);
    }

    if (CONFIG.ENABLE_GOOGLE_SCHOLAR) {
      createLink(buttonGroup, ICONS.SCHOLAR, "Google Scholar", "scholar-link", `${CONFIG.GOOGLE_SCHOLAR_URL}${encodeURIComponent(doi)}`);
    }

    if (CONFIG.ENABLE_LIBGEN) {
      createLink(buttonGroup, ICONS.LIBGEN, "LibGen", "libgen-link", `${CONFIG.LIBGEN_URL}${encodeURIComponent(doi)}`);
    }

    if (buttonGroup.children.length === 0) {
      const noAccess = document.createElement("div");
      noAccess.className = "no-access";
      noAccess.textContent = "No hay opciones de acceso abierto para este artículo";
      buttonGroup.appendChild(noAccess);
    }
  }

  // 📝 Comandos del menú
  function addMenuCommands() {
    if (typeof GM_registerMenuCommand === "undefined") return;

    GM_registerMenuCommand("Alternar botón Sci-Hub", () => {
      CONFIG.ENABLE_SCIHUB = !CONFIG.ENABLE_SCIHUB;
      showNotification("Despagador", `Sci-Hub ${CONFIG.ENABLE_SCIHUB ? "activado" : "desactivado"}`);
      refreshButtons();
    });

    GM_registerMenuCommand("Alternar botón Unpaywall", () => {
      CONFIG.ENABLE_UNPAYWALL = !CONFIG.ENABLE_UNPAYWALL;
      showNotification("Despagador", `Unpaywall ${CONFIG.ENABLE_UNPAYWALL ? "activado" : "desactivado"}`);
      refreshButtons();
    });
  }

  // 🧠 Debug
  function debugLog(...messages) {
    if (CONFIG.DEBUG) console.log("[Despagador]", ...messages);
  }

  // ⚡ Iniciar
  function init() {
    const doi = findDoi();
    if (doi) {
      if (CONFIG.SHOW_NOTIFICATION) {
        showNotification("🔓 Despagador Activado", "¡Usa el candado flotante o el panel de botones para acceder al artículo!");
      }
      createFloatingLock();
    }
    addMenuCommands();
    refreshButtons();
  }

  init();
})();
