// ==UserScript==
// @name        Despagador de Artículos Académicos Plus
// @namespace   https://github.com/Chicharr0n/despagador/
// @version     4.0
// @description Accede a artículos académicos sin pagar con múltiples fuentes y funciones avanzadas
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
// @match       *://arxiv.org/abs/*
// @match       *://arxiv.org/pdf/*
// @match       *://papers.ssrn.com/sol3/*
// @match       *://www.researchsquare.com/article/*
// @exclude     *://annas-archive.org/*
// @grant       GM.xmlHttpRequest
// @grant       GM.registerMenuCommand
// @grant       GM.notification
// @grant       GM.setValue
// @grant       GM.getValue
// @grant       GM.openInTab
// @grant       GM.addStyle
// @grant       GM.setClipboard
// @grant       GM.download
// @grant       GM.getResourceText
// @grant       GM.getResourceUrl
// @run-at      document-end
// @resource    scihubIcon data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyczQuNDggMTAgMTAgMTAgMTAtNC40OCAxMC0xMFMxNy41MiAyIDEyIDJ6bTAgMThjLTQuNDEgMC04LTMuNTktOC04czMuNTktOCA4LTggOCAzLjU5IDggOC0zLjU5IDgtOCA4em0tMS0xM2gydjZoLTJ6bTAgOGgydjJoLTJ6Ii8+PC9zdmc+
// @resource    unpaywallIcon data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyczQuNDggMTAgMTAgMTAgMTAtNC40OCAxMC0xMFMxNy41MiAyIDEyIDJ6bTAgMThjLTQuNDEgMC04LTMuNTktOC04czMuNTktOCA4LTggOCAzLjU5IDggOC0zLjU5IDgtOCA4em0tMi0xMWg0djJoLTJ2NmgydjJoLTZ2LTJoMnYtNmgtdjJ6Ii8+PC9zdmc+
// @resource    coreIcon data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyczQuNDggMTAgMTAgMTAgMTAtNC40OCAxMC0xMFMxNy41MiAyIDEyIDJ6bTAgMThjLTQuNDEgMC04LTMuNTktOC04czMuNTktOCA4LTggOCAzLjU5IDggOC0zLjU5IDgtOCA4em0tLjcxLTguMjljLS4xOS0uMTktLjI5LS40My0uMjktLjcxIDAtLjI4LjEtLjUyLjI5LS43MS4xOS0uMTkuNDMtLjI5LjcxLS4yOS4yOCAwIC41Mi4xLjcxLjI5LjE5LjE5LjI5LjQzLjI5LjcxIDAgLjI4LS4xLjUyLS4yOS43MS0uMTkuMTktLjQzLjI5LS43MS4yOS0uMjggMC0uNTItLjEtLjcxLS4yOXoiLz48L3N2Zz4=
// @resource    scholarIcon data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyczQuNDggMTAgMTAgMTAgMTAtNC40OCAxMC0xMFMxNy41MiAyIDEyIDJ6bTAgMThjLTQuNDEgMC04LTMuNTktOC04czMuNTktOCA4LTggOCAzLjU5IDggOC0zLjU5IDgtOCA4em0tMS0xM2gydjZoLTJ6bTAgOGgydjJoLTJ6Ii8+PC9zdmc+
// @resource    libgenIcon data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyczQuNDggMTAgMTAgMTAgMTAtNC40OCAxMC0xMFMxNy41MiAyIDEyIDJ6bTAgMThjLTQuNDEgMC04LTMuNTktOC04czMuNTktOCA4LTggOCAzLjU5IDggOC0zLjU5IDgtOCA4em0tMS0xM2gydjZoLTJ6bTAgOGgydjJoLTJ6Ii8+PC9zdmc+
// @resource    semanticIcon data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyczQuNDggMTAgMTAgMTAgMTAtNC40OCAxMC0xMFMxNy41MiAyIDEyIDJ6bTAgMThjLTQuNDEgMC04LTMuNTktOC04czMuNTktOCA4LTggOCAzLjU5IDggOC0zLjU5IDgtOCA4em0tMS0xM2gydjZoLTJ6bTAgOGgydjJoLTJ6Ii8+PC9zdmc+
// @resource    connectedIcon data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyczQuNDggMTAgMTAgMTAgMTAtNC40OCAxMC0xMFMxNy41MiAyIDEyIDJ6bTAgMThjLTQuNDEgMC04LTMuNTktOC04czMuNTktOCA4LTggOCAzLjU5IDggOC0zLjU5IDgtOCA4em0tMS0xM2gydjZoLTJ6bTAgOGgydjJoLTJ6Ii8+PC9zdmc+
// @resource    pdfIcon data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTE5IDNINWMtMS4xMSAwLTIgLjktMiAydjE0YzAgMS4xLjg5IDIgMiAyaDE0YzEuMSAwIDItLjkgMi0yVjVjMC0xLjEtLjktMi0yLTJ6bS04LjUgMTJoLTEuNXYtNC41aDEuNVYxNXptMy41IDBoLTF2LTQuNWgtMS41VjE1aC0xdi01aDMuNXY1em0zLjUtNWgtMXYxLjVoMS41VjE1aC0xdi00LjVoMS41di0xLjVoLTIuNXYxLjV6Ii8+PC9zdmc+
// @resource    settingsIcon data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTE5LjQzIDEyLjk4Yy4wNC0uMzIuMDctLjY0LjA3LS45OHMtLjAzLS42Ni0uMDctLjk4bDIuMTEtMS42NWMuMTktLjE1LjI0LS40Mi4xMi0uNjRsLTIuMDMtMy40NmMtLjEyLS4yMi0uMzktLjMtLjYxLS4yMmwtMi40OSAxYy0uNTItLjQtMS4wOC0uNzMtMS42OS0uOThsLS4zOC0yLjY1QzE0LjQ2IDIuMTggMTQuMjUgMiAxNCAyaC00Yy0uMjUgMC0uNDYuMTgtLjQ5LjQybC0uMzggMi42NWMtLjYxLjI1LTEuMTcuNTktMS42OS45OGwtMi40OS0xYy0uMjMtLjA5LS40OSAwLS42MS4yMmwtMi4wMyAzLjQ2Yy0uMTMuMjItLjA3LjQ5LjEyLjY0bDIuMTEgMS42NWMtLjA0LjMyLS4wNy42NS0uMDcuOThzLjAzLjY2LjA3Ljk4bC0yLjExIDEuNjVjLS4xOS4xNS0uMjQuNDItLjEyLjY0bDIuMDMgMy40NmMuMTIuMjIuMzkuMy42MS4yMmwyLjQ5LTFjLjUyLjQgMS4wOC43MyAxLjY5Ljk4bC4zOCAyLjY1Yy4wMy4yNC4yNC40Mi40OS40Mmg0Yy4yNSAwIC40Ni0uMTguNDktLjQybC4zOC0yLjY1Yy42MS0uMjUgMS4xNy0uNTkgMS42OS0uOThsMi40OSAxYy4yMy4wOS40OSAwIC42MS0uMjJsMi4wMy0zLjQ2Yy4xMi0uMjIuMDctLjQ5LS4xMi0uNjRsLTIuMTEtMS42NXptLTcuNDMgMi41N2MtMS42MSAwLTIuOTItMS4zMS0yLjkyLTIuOTJzMS4zMS0yLjkyIDIuOTItMi45MiAyLjkyIDEuMzEgMi45MiAyLjkyLTEuMzEgMi45Mi0yLjkyIDIuOTJ6Ii8+PC9zdmc+
// @resource    loadingIcon data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MCA1MCI+PGNpcmNsZSBjeD0iMjUiIGN5PSIyNSIgcj0iMjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2Utd2lkdGg9IjQiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWRhc2hhcnJheT0iODAgNjAiPjxhbmltZVRyYW5zZm9ybSBhdHRyaWJ1dGVOYW1lPSJ0cmFuc2Zvcm0iIHR5cGU9InJvdGF0ZSIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIGR1cj0iMXMiIHZhbHVlcz0iMCAyNSA1MDszNjAgMjUgNTAiLz48L2NpcmNsZT48L3N2Zz4=
// @resource    copyIcon data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTE2IDFINGMtMS4xIDAtMiAuOS0yIDJ2MTRoMlYzaDEydi0yem0zIDRIN2MtMS4xIDAtMiAuOS0yIDJ2MTRjMCAxLjEuOSAyIDIgMmgxMmMxLjEgMCAyLS45IDItMlY3YzAtMS4xLS45LTItMi0yem0wIDE2SDdWN2gxMnYxNHoiLz48L3N2Zz4=
// @resource    translateIcon data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTEyLjg3IDE1LjA3bC0yLjg3LTIuOTFsLS4wMS0uMDFjLS40LS40LS40LTEuMDMgMC0xLjQzbDIuODctMi44N2MuMzktLjM5IDEuMDItLjM5IDEuNDEgMCAuMzkuMzkuMzkgMS4wMiAwIDEuNDFsLTEuNjQgMS42NGMtLjEuMS0uMS4yNiAwIC4zNmwxLjY0IDEuNjRjLjM5LjM5LjM5IDEuMDIgMCAxLjQxLS4zOS4zOS0xLjAyLjM5LTEuNDEgMHptLTEuODktNi4zM2MtLjM5LS4zOS0xLjAyLS4zOS0xLjQxIDBsLTIuODcgMi44N2MtLjQuNC0uNCAxLjAzIDAgMS40M2wuMDEuMDEgMi44NyAyLjg3Yy4zOS4zOSAxLjAyLjM5IDEuNDEgMCAuMzktLjM5LjM5LTEuMDIgMC0xLjQxbC0xLjY0LTEuNjRjLS4xLS4xLS4xLS4yNiAwLS4zNmwxLjY0LTEuNjRjLjM5LS4zOS4zOS0xLjAyIDAtMS40MXptLjIgMTIuNjZjLS4zOS0uMzktMS4wMi0uMzktMS40MSAwbC0yLjg3IDIuODdjLS40LjQtLjQgMS4wMyAwIDEuNDNsMi44NyAyLjg3Yy4zOS4zOSAxLjAyLjM5IDEuNDEgMCAuMzktLjM5LjM5LTEuMDIgMC0xLjQxbC0xLjY0LTEuNjRjLS4xLS4xLS4xLS4yNiAwLS4zNmwxLjY0LTEuNjRjLjM5LS4zOS4zOS0xLjAyIDAtMS40MXoiLz48L3N2Zz4=
// @resource    graphIcon data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTEyIDRjLTQuNDEgMC04IDMuNTktOCA4czMuNTkgOCA4IDggOC0zLjU5IDgtOC0zLjU5LTgtOC04em0tMSAxM2gydi0yaC0ydjJ6bTAtNGgydi0yaC0ydjJ6bTAtNGgydjJoLTJ2LTJ6Ii8+PC9zdmc+
// @resource    arxivIcon data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyczQuNDggMTAgMTAgMTAgMTAtNC40OCAxMC0xMFMxNy41MiAyIDEyIDJ6bTAgMThjLTQuNDEgMC04LTMuNTktOC04czMuNTktOCA4LTggOCAzLjU5IDggOC0zLjU5IDgtOCA4em0tMS0xM2gydjZoLTJ6bTAgOGgydjJoLTJ6Ii8+PC9zdmc+
// @resource    ssrnIcon data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyczQuNDggMTAgMTAgMTAgMTAtNC40OCAxMC0xMFMxNy41MiAyIDEyIDJ6bTAgMThjLTQuNDEgMC04LTMuNTktOC04czMuNTktOCA4LTggOCAzLjU5IDggOC0zLjU5IDgtOCA4em0tMS0xM2gydjZoLTJ6bTAgOGgydjJoLTJ6Ii8+PC9zdmc+
// @resource    pubmedIcon data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyczQuNDggMTAgMTAgMTAgMTAtNC40OCAxMC0xMFMxNy41MiAyIDEyIDJ6bTAgMThjLTQuNDEgMC04LTMuNTktOC04czMuNTktOCA4LTggOCAzLjU5IDggOC0zLjU5IDgtOCA4em0tMS0xM2gydjZoLTJ6bTAgOGgydjJoLTJ6Ii8+PC9zdmc+
// @resource    researchsquareIcon data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyczQuNDggMTAgMTAgMTAgMTAtNC40OCAxMC0xMFMxNy41MiAyIDEyIDJ6bTAgMThjLTQuNDEgMC04LTMuNTktOC04czMuNTktOCA4LTggOCAzLjU5IDggOC0zLjU5IDgtOCA4em0tMS0xM2gydjZoLTJ6bTAgOGgydjJoLTJ6Ii8+PC9zdmc+
// @resource    communityIcon data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyczQuNDggMTAgMTAgMTAgMTAtNC40OCAxMC0xMFMxNy41MiAyIDEyIDJ6bTAgMThjLTQuNDEgMC04LTMuNTktOC04czMuNTktOCA4LTggOCAzLjU5IDggOC0zLjU5IDgtOCA4em0tMS0xM2gydjZoLTJ6bTAgOGgydjJoLTJ6Ii8+PC9zdmc+
// @connect     sci-hub.*
// @connect     libgen.*
// @connect     arxiv.org
// @connect     ssrn.com
// @connect     researchsquare.com
// @connect     core.ac.uk
// @connect     scholar.google.com
// @connect     semanticscholar.org
// @connect     connectedpapers.com
// @connect     api.unpaywall.org
// @connect     api.anthropic.com
// @connect     api-free.deepl.com
// @connect     api.deepl.com
// @connect     despagador-api.example.com
// ==/UserScript==

(function() {
    "use strict";

    // ==================== CONFIGURACIÓN AVANZADA ====================
    const DEFAULT_SETTINGS = {
        // Fuentes de acceso
        ENABLE_SCIHUB: true,
        ENABLE_UNPAYWALL: true,
        ENABLE_CORE: true,
        ENABLE_GOOGLE_SCHOLAR: true,
        ENABLE_LIBGEN: true,
        ENABLE_SEMANTIC_SCHOLAR: true,
        ENABLE_CONNECTED_PAPERS: true,
        ENABLE_ARXIV: true,
        ENABLE_SSRN: true,
        ENABLE_RESEARCH_SQUARE: true,

        // Interfaz
        SHOW_NOTIFICATION: true,
        SHOW_FLOATING_LOCK: true,
        SHOW_PDF_ICON: true,
        PANEL_POSITION: 'bottom-right',
        PANEL_THEME: 'light',
        AUTO_COLLAPSE_PANEL: false,
        AUTO_OPEN_BEST_SOURCE: false,
        SHOW_COMMUNITY_ALERTS: true,

        // URLs
        SCIHUB_URLS: ["https://sci-hub.se/", "https://sci-hub.st/", "https://sci-hub.ru/", "https://sci-hub.wf/", "https://sci-hub.do/"],
        UNPAYWALL_URL: "https://api.unpaywall.org/v2/",
        CORE_URL: "https://core.ac.uk/search?q=",
        GOOGLE_SCHOLAR_URL: "https://scholar.google.com/scholar?q=",
        LIBGEN_URLS: ["https://libgen.rs/scimag/index.php?s=", "https://libgen.is/scimag/index.php?s="],
        SEMANTIC_SCHOLAR_URL: "https://www.semanticscholar.org/search?q=",
        CONNECTED_PAPERS_URL: "https://www.connectedpapers.com/search?q=",
        ARXIV_URL: "https://arxiv.org/abs/",
        SSRN_URL: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=",
        PUBMED_URL: "https://pubmed.ncbi.nlm.nih.gov/",
        RESEARCH_SQUARE_URL: "https://www.researchsquare.com/article/",
        COMMUNITY_API_URL: "https://despagador-api.example.com/v1/",

        // Avanzado
        UNPAYWALL_EMAIL: "despagador@example.com",
        DEBUG: false,
        CACHE_DURATION: 5, // minutos
        ENABLE_NINJA_MODE: false,
        ENABLE_AI_SUMMARY: false,
        ENABLE_LOCAL_CACHE: false,
        ENABLE_KEYWORD_SEARCH: true,
        ANTHROPIC_API_KEY: "",
        DEEPL_API_KEY: "",
        COMMUNITY_API_KEY: "",
        MAX_CACHE_SIZE: 50, // MB
        CACHE_EXPIRATION_DAYS: 30,
    };

    let settings = {};
    const state = {
        activeTab: null,
        isLoading: false,
        isSettingsModalOpen: false,
        communityMirrors: [],
        communityReports: [],
    };

    const cache = {
        doi: null,
        identifier: null,
        unpaywallData: null,
        lastFetch: 0,
        pdfBuffer: null,
        articleText: null,
        localArticles: {},
        lastCommunityUpdate: 0,
    };

    // ==================== ICONOS Y ASSETS ====================
    const ASSETS = {
        ICONS: {
            SCIHUB: GM_getResourceText('scihubIcon'),
            UNPAYWALL: GM_getResourceText('unpaywallIcon'),
            CORE: GM_getResourceText('coreIcon'),
            SCHOLAR: GM_getResourceText('scholarIcon'),
            LIBGEN: GM_getResourceText('libgenIcon'),
            SEMANTIC: GM_getResourceText('semanticIcon'),
            CONNECTED: GM_getResourceText('connectedIcon'),
            PDF: GM_getResourceText('pdfIcon'),
            SETTINGS: GM_getResourceText('settingsIcon'),
            LOADING: GM_getResourceText('loadingIcon'),
            COPY: GM_getResourceText('copyIcon'),
            TRANSLATE: GM_getResourceText('translateIcon'),
            GRAPH: GM_getResourceText('graphIcon'),
            ARXIV: GM_getResourceText('arxivIcon'),
            SSRN: GM_getResourceText('ssrnIcon'),
            PUBMED: GM_getResourceText('pubmedIcon'),
            RESEARCH_SQUARE: GM_getResourceText('researchSquareIcon'),
            COMMUNITY: GM_getResourceText('communityIcon'),
        },
        STYLES: {
            LIGHT: `:root {
                --bg-color: #ffffff;
                --text-color: #2d3748;
                --border-color: #e3e7ee;
                --hover-color: #f2f6fa;
                --shadow-color: rgba(60,72,90,0.13);
                --panel-bg: #fcfdfe;
                --accent-color: #4CAF50;
                --error-color: #F44336;
                --warning-color: #FF9800;
                --info-color: #2196F3;
            }`,
            DARK: `:root {
                --bg-color: #1a202c;
                --text-color: #f7fafc;
                --border-color: #2d3748;
                --hover-color: #2d3748;
                --shadow-color: rgba(0,0,0,0.3);
                --panel-bg: #2d3748;
                --accent-color: #81C784;
                --error-color: #EF9A9A;
                --warning-color: #FFB74D;
                --info-color: #64B5F6;
            }`
        }
    };

    // ==================== FUNCIONES UTILITARIAS ====================
    class Logger {
        static log(...args) {
            if (settings.DEBUG) console.log('[Despagador]', ...args);
        }

        static error(...args) {
            console.error('[Despagador]', ...args);
        }
    }

    class Storage {
        static async load() {
            if (typeof GM_getValue === 'undefined') return DEFAULT_SETTINGS;

            const saved = {};
            for (const key in DEFAULT_SETTINGS) {
                saved[key] = await GM_getValue(key, DEFAULT_SETTINGS[key]);
            }

            // Cargar artículos en caché local
            if (settings.ENABLE_LOCAL_CACHE) {
                saved.localArticles = await GM_getValue('localArticles', {});
            }

            return saved;
        }

        static async save(key, value) {
            if (typeof GM_setValue === 'undefined') return;
            await GM_setValue(key, value);
            Logger.log(`Config saved: ${key}=${value}`);
        }

        static async saveLocalArticle(doi, data) {
            if (!settings.ENABLE_LOCAL_CACHE) return;

            cache.localArticles[doi] = {
                data: data,
                timestamp: Date.now(),
                size: JSON.stringify(data).length
            };

            await this.cleanCache();
            await GM_setValue('localArticles', cache.localArticles);
        }

        static async cleanCache() {
            if (!settings.ENABLE_LOCAL_CACHE) return;

            // Calcular tamaño total
            let totalSize = 0;
            const now = Date.now();
            const expirationMs = settings.CACHE_EXPIRATION_DAYS * 24 * 60 * 60 * 1000;

            // Eliminar elementos expirados y calcular tamaño
            for (const doi in cache.localArticles) {
                const article = cache.localArticles[doi];

                // Eliminar si está expirado
                if (now - article.timestamp > expirationMs) {
                    delete cache.localArticles[doi];
                    continue;
                }

                totalSize += article.size;
            }

            // Convertir a MB
            totalSize = totalSize / (1024 * 1024);

            // Si excede el tamaño máximo, eliminar los más antiguos
            if (totalSize > settings.MAX_CACHE_SIZE) {
                const sorted = Object.entries(cache.localArticles)
                    .sort((a, b) => a[1].timestamp - b[1].timestamp);

                while (totalSize > settings.MAX_CACHE_SIZE && sorted.length > 0) {
                    const [doi, article] = sorted.shift();
                    delete cache.localArticles[doi];
                    totalSize -= article.size / (1024 * 1024);
                }
            }

            await GM_setValue('localArticles', cache.localArticles);
        }
    }

    class UI {
        static showNotification(title, message, options = {}) {
            if (settings.SHOW_NOTIFICATION && GM_notification) {
                GM_notification({
                    title,
                    text: message,
                    silent: true,
                    timeout: options.timeout || 3000,
                    highlight: options.highlight,
                    ...options
                });
            }
        }

        static createLoadingSpinner() {
            const spinner = document.createElement('div');
            spinner.className = 'despagador-spinner';
            spinner.innerHTML = ASSETS.ICONS.LOADING;
            spinner.title = 'Cargando...';
            return spinner;
        }

        static createButton(text, iconHtml, onClick, className = 'access-link', style = '') {
            const button = document.createElement('a');
            button.className = className;
            button.innerHTML = `${iconHtml ? `<span class="icon">${iconHtml}</span>` : ''}<span>${text}</span>`;
            if (style) {
                button.style = style;
            }
            button.addEventListener('click', (e) => {
                e.preventDefault();
                onClick();
            });
            return button;
        }

        static createLink(text, iconHtml, href, className = 'access-link', target = '_blank', rel = 'noopener noreferrer', style = '') {
            const link = document.createElement('a');
            link.className = className;
            link.href = href;
            link.target = target;
            link.rel = rel;
            link.innerHTML = `${iconHtml ? `<span class="icon">${iconHtml}</span>` : ''}<span>${text}</span>`;
            if (style) {
                link.style = style;
            }
            return link;
        }

        static renderModal(title, contentHtml, onSave = null, large = false) {
            if (state.isSettingsModalOpen) return;
            state.isSettingsModalOpen = true;

            const modalOverlay = document.createElement('div');
            modalOverlay.id = 'despagador-modal-overlay';
            modalOverlay.innerHTML = `
                <style>
                    #despagador-modal-overlay {
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background-color: rgba(0, 0, 0, 0.7);
                        z-index: 10000;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                    #despagador-modal {
                        background-color: var(--panel-bg);
                        border: 1px solid var(--border-color);
                        border-radius: 12px;
                        box-shadow: 0 4px 20px var(--shadow-color);
                        width: ${large ? '90%' : '90%'};
                        max-width: ${large ? '800px' : '500px'};
                        max-height: 80vh;
                        display: flex;
                        flex-direction: column;
                        overflow: hidden;
                        color: var(--text-color);
                        font-family: system-ui, sans-serif;
                    }
                    #despagador-modal-header {
                        padding: 16px;
                        font-size: 1.2em;
                        font-weight: bold;
                        border-bottom: 1px solid var(--border-color);
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                    }
                    #despagador-modal-close {
                        background: none;
                        border: none;
                        font-size: 1.5em;
                        cursor: pointer;
                        color: var(--text-color);
                    }
                    #despagador-modal-body {
                        padding: 16px;
                        overflow-y: auto;
                        flex-grow: 1;
                    }
                    #despagador-modal-body label {
                        display: block;
                        margin-bottom: 8px;
                        font-weight: 600;
                    }
                    #despagador-modal-body input[type="text"],
                    #despagador-modal-body input[type="email"],
                    #despagador-modal-body textarea,
                    #despagador-modal-body select {
                        width: calc(100% - 20px);
                        padding: 10px;
                        margin-bottom: 15px;
                        border: 1px solid var(--border-color);
                        border-radius: 6px;
                        background-color: var(--bg-color);
                        color: var(--text-color);
                    }
                    #despagador-modal-body input[type="checkbox"] {
                        margin-right: 8px;
                    }
                    #despagador-modal-footer {
                        padding: 16px;
                        border-top: 1px solid var(--border-color);
                        text-align: right;
                    }
                    #despagador-modal-footer button {
                        padding: 10px 15px;
                        border: none;
                        border-radius: 6px;
                        cursor: pointer;
                        font-weight: bold;
                        transition: background-color 0.2s;
                    }
                    #despagador-modal-footer button.cancel {
                        background-color: #ccc;
                        color: #333;
                        margin-right: 8px;
                    }
                    #despagador-modal-footer button.cancel:hover {
                        background-color: #bbb;
                    }
                    #despagador-modal-footer button.save {
                        background-color: var(--accent-color);
                        color: white;
                    }
                    #despagador-modal-footer button.save:hover {
                        background-color: color-mix(in srgb, var(--accent-color) 90%, black);
                    }
                    .setting-group {
                        margin-bottom: 20px;
                        padding: 10px;
                        border: 1px solid var(--border-color);
                        border-radius: 8px;
                    }
                    .setting-group h3 {
                        margin-top: 0;
                        margin-bottom: 10px;
                        color: var(--accent-color);
                    }
                    .setting-item {
                        display: flex;
                        align-items: center;
                        margin-bottom: 10px;
                    }
                    .setting-item.checkbox-item {
                        justify-content: space-between;
                    }
                    .setting-item.checkbox-item label {
                        margin-bottom: 0;
                    }
                    .tab-container {
                        display: flex;
                        border-bottom: 1px solid var(--border-color);
                        margin-bottom: 15px;
                    }
                    .tab {
                        padding: 10px 15px;
                        cursor: pointer;
                        border-bottom: 2px solid transparent;
                    }
                    .tab.active {
                        border-bottom-color: var(--accent-color);
                        font-weight: bold;
                    }
                    .tab-content {
                        display: none;
                    }
                    .tab-content.active {
                        display: block;
                    }
                    .community-report {
                        border: 1px solid var(--border-color);
                        border-radius: 8px;
                        padding: 10px;
                        margin-bottom: 10px;
                    }
                    .report-meta {
                        font-size: 0.8em;
                        color: #666;
                        margin-bottom: 5px;
                    }
                    .report-content {
                        margin-bottom: 5px;
                    }
                    .report-actions {
                        display: flex;
                        gap: 10px;
                    }
                    .report-action {
                        background: none;
                        border: none;
                        color: var(--accent-color);
                        cursor: pointer;
                        font-size: 0.8em;
                    }
                    .keyword-search-container {
                        margin-top: 15px;
                    }
                    .keyword-input {
                        width: calc(100% - 100px);
                        padding: 8px;
                        border: 1px solid var(--border-color);
                        border-radius: 4px;
                        margin-right: 10px;
                    }
                    .keyword-search-button {
                        padding: 8px 15px;
                        background-color: var(--accent-color);
                        color: white;
                        border: none;
                        border-radius: 4px;
                        cursor: pointer;
                    }
                    .keyword-results {
                        margin-top: 10px;
                        max-height: 200px;
                        overflow-y: auto;
                        border: 1px solid var(--border-color);
                        border-radius: 4px;
                        padding: 10px;
                    }
                    .keyword-result {
                        padding: 5px;
                        cursor: pointer;
                        border-bottom: 1px solid var(--border-color);
                    }
                    .keyword-result:hover {
                        background-color: var(--hover-color);
                    }
                    .keyword-highlight {
                        background-color: yellow;
                        color: black;
                    }
                </style>
                <div id="despagador-modal">
                    <div id="despagador-modal-header">
                        <span>${title}</span>
                        <button id="despagador-modal-close">&times;</button>
                    </div>
                    <div id="despagador-modal-body">
                        ${contentHtml}
                    </div>
                    <div id="despagador-modal-footer">
                        <button class="cancel">Cancelar</button>
                        ${onSave ? '<button class="save">Guardar</button>' : ''}
                    </div>
                </div>
            `;
            document.body.appendChild(modalOverlay);

            const closeModal = () => {
                modalOverlay.remove();
                state.isSettingsModalOpen = false;
                ControlPanel.refresh();
                SettingsManager.init();
            };

            modalOverlay.querySelector('#despagador-modal-close').addEventListener('click', closeModal);
            modalOverlay.querySelector('.cancel').addEventListener('click', closeModal);

            if (onSave) {
                modalOverlay.querySelector('.save').addEventListener('click', async () => {
                    await onSave(modalOverlay);
                    closeModal();
                });
            }

            return modalOverlay;
        }

        static renderTabbedModal(title, tabs, activeTab = 0) {
            const tabHeaders = tabs.map((tab, i) =>
                `<div class="tab ${i === activeTab ? 'active' : ''}" data-tab="${i}">${tab.title}</div>`
            ).join('');

            const tabContents = tabs.map((tab, i) =>
                `<div class="tab-content ${i === activeTab ? 'active' : ''}">${tab.content}</div>`
            ).join('');

            const content = `
                <div class="tab-container">${tabHeaders}</div>
                ${tabContents}
            `;

            const modal = this.renderModal(title, content, tabs[activeTab].onSave, true);

            if (modal) {
                modal.querySelectorAll('.tab').forEach(tab => {
                    tab.addEventListener('click', () => {
                        const tabIndex = parseInt(tab.dataset.tab);
                        modal.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
                        modal.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
                        tab.classList.add('active');
                        modal.querySelector(`.tab-content:nth-child(${tabIndex + 2})`).classList.add('active');
                    });
                });
            }

            return modal;
        }
    }

    // ==================== FUNCIONES PRINCIPALES ====================
    class DOIFinder {
        static find() {
            if (cache.identifier && cache.identifier.type === 'doi') return cache.identifier.value;

            // Estrategias de búsqueda ordenadas por eficiencia
            const strategies = [
                this._findInURL,
                this._findInMetaTags,
                this._findInDataAttributes,
                this._findInCitationText,
                this._findInPDFLinks
            ];

            for (const strategy of strategies) {
                const doi = strategy();
                if (doi) {
                    cache.identifier = { type: 'doi', value: doi };
                    Logger.log(`DOI encontrado (${strategy.name}): ${doi}`);
                    return doi;
                }
            }

            // Si no se encuentra DOI, buscar otros identificadores
            const otherIdentifier = this.findOtherIdentifier();
            if (otherIdentifier) {
                cache.identifier = otherIdentifier;
                Logger.log(`Identificador alternativo encontrado (${otherIdentifier.type}): ${otherIdentifier.value}`);
            }

            return null;
        }

        static findOtherIdentifier() {
            const currentUrl = window.location.href;

            // PMID/PMCID
            let match = currentUrl.match(/(pubmed\.ncbi\.nlm\.nih\.gov\/|PMC)(\d+)/i);
            if (match && match[2]) return {
                type: match[1].toLowerCase().includes('pmc') ? 'pmcid' : 'pmid',
                value: match[2]
            };

            // arXiv
            match = currentUrl.match(/arxiv\.org\/(abs|pdf)\/(\d{4}\.\d{4,5}(v\d+)?)/i);
            if (match && match[2]) return {
                type: 'arxiv',
                value: match[2]
            };

            // SSRN
            match = currentUrl.match(/papers\.ssrn\.com\/sol3\/papers\.cfm\?abstract_id=(\d+)/i);
            if (match && match[1]) return {
                type: 'ssrn',
                value: match[1]
            };

            // ResearchSquare
            match = currentUrl.match(/researchsquare\.com\/article\/([a-z0-9-]+)/i);
            if (match && match[1]) return {
                type: 'researchsquare',
                value: match[1]
            };

            // Meta tags para identificadores alternativos
            const metaTags = document.querySelectorAll('meta[name], meta[property]');
            for (const meta of metaTags) {
                const name = (meta.name || meta.getAttribute('property') || '').toLowerCase();
                const content = meta.content.trim();

                if (name === 'citation_arxiv_id' && content.match(/\d{4}\.\d{4,5}(v\d+)?/)) {
                    return { type: 'arxiv', value: content };
                }
                if ((name === 'citation_pmid' || name === 'pubmed_id') && content.match(/^\d+$/)) {
                    return { type: 'pmid', value: content };
                }
                if (name === 'citation_ssrn_id' && content.match(/^\d+$/)) {
                    return { type: 'ssrn', value: content };
                }
                if (name === 'citation_technical_report_number' && content) {
                    return { type: 'techreport', value: content };
                }
                if (name === 'citation_isbn' && content) {
                    return { type: 'isbn', value: content };
                }
            }

            return null;
        }

        static _findInURL() {
            const patterns = [
                /\b(10\.\d{4,9}\/[-._;()/:A-Z0-9]+)\b/i,
                /doi[=/:](10\.\d{4,9}\/[-._;()/:A-Z0-9]+)/i
            ];

            for (const pattern of patterns) {
                const match = window.location.href.match(pattern);
                if (match?.[1]) return match[1];
            }
            return null;
        }

        static _findInMetaTags() {
            const metaTags = document.querySelectorAll('meta[name], meta[property]');
            const doiMetaNames = [
                'citation_doi', 'doi', 'dc.doi', 'dc.identifier',
                'prism.doi', 'og:doi', 'bepress_citation_doi'
            ];

            for (const meta of metaTags) {
                const name = (meta.name || meta.getAttribute('property') || '').toLowerCase();
                if (doiMetaNames.includes(name)) {
                    const content = meta.content.trim();
                    if (content.startsWith('10.')) return content;
                }
            }
            return null;
        }

        static _findInDataAttributes() {
            const elements = document.querySelectorAll('[data-doi], [data-article-doi]');
            for (const el of elements) {
                const doi = el.getAttribute('data-doi') || el.getAttribute('data-article-doi');
                if (doi?.trim().startsWith('10.')) return doi.trim();
            }
            return null;
        }

        static _findInCitationText() {
            const elements = document.querySelectorAll('[id*="citation"], [class*="citation"], body');
            for (const el of elements) {
                const match = el.textContent.match(/\b(10\.\d{4,9}\/[-._;()/:A-Z0-9]+)\b/i);
                if (match?.[0]) return match[0];
            }
            return null;
        }

        static _findInPDFLinks() {
            const links = document.querySelectorAll('a[href*=".pdf"]');
            for (const link of links) {
                const match = link.href.match(/\b(10\.\d{4,9}\/[-._;()/:A-Z0-9]+)\b/i);
                if (match?.[0]) return match[0];
            }
            return null;
        }

        static getArticleDetails() {
            const identifier = cache.identifier;
            if (!identifier) return null;

            const titleMeta = document.querySelector('meta[name="citation_title"]') ||
                              document.querySelector('meta[property="og:title"]');
            const title = titleMeta ? titleMeta.content.trim() : document.title.split('|')[0].trim();

            const authorsMeta = document.querySelectorAll('meta[name="citation_author"], meta[property="citation_author"]');
            const authors = Array.from(authorsMeta).map(m => m.content.trim()).join(', ');

            const yearMeta = document.querySelector('meta[name="citation_date"]') ||
                             document.querySelector('meta[name="citation_publication_date"]');
            const year = yearMeta ? yearMeta.content.trim().split('-')[0] : '';

            const journalMeta = document.querySelector('meta[name="citation_journal_title"]');
            const journal = journalMeta ? journalMeta.content.trim() : '';

            const abstractMeta = document.querySelector('meta[name="description"]') ||
                                 document.querySelector('meta[name="citation_abstract"]');
            const abstract = abstractMeta ? abstractMeta.content.trim() : '';

            return {
                type: identifier.type,
                value: identifier.value,
                title,
                authors,
                year,
                journal,
                abstract
            };
        }
    }

    class APIClient {
        static async fetchUnpaywall(doi) {
            const now = Date.now();
            if (cache.unpaywallData && now - cache.lastFetch < settings.CACHE_DURATION * 60 * 1000 && cache.doi === doi) {
                Logger.log('Usando datos cacheados de Unpaywall');
                return cache.unpaywallData;
            }

            try {
                const url = `${settings.UNPAYWALL_URL}${encodeURIComponent(doi)}?email=${encodeURIComponent(settings.UNPAYWALL_EMAIL)}`;
                const data = await this._makeRequest(url);

                cache.unpaywallData = data;
                cache.lastFetch = now;
                cache.doi = doi;
                return data;
            } catch (error) {
                Logger.error('Error en Unpaywall API:', error);
                throw error;
            }
        }

        static async tryMultipleUrls(urls, identifier, type = 'doi') {
            for (const urlBase of urls) {
                let url;
                if (type === 'doi' || type === 'scimag') {
                    url = `${urlBase}${encodeURIComponent(identifier)}`;
                } else {
                    url = `${urlBase}${identifier}`;
                }

                try {
                    const response = await this._makeRequest(url, 'HEAD');
                    if (response.status >= 200 && response.status < 300) {
                        Logger.log(`URL activa encontrada para ${urlBase}: ${url}`);
                        return url;
                    }
                } catch (e) {
                    Logger.log(`URL inactiva o error para ${urlBase}: ${e.message}`);
                }
            }
            return null;
        }

        static async fetchCommunityMirrors() {
            const now = Date.now();
            if (state.communityMirrors.length > 0 && now - cache.lastCommunityUpdate < 3600000) { // 1 hora de cache
                return state.communityMirrors;
            }

            if (!settings.COMMUNITY_API_URL || !settings.COMMUNITY_API_KEY) {
                return [];
            }

            try {
                const url = `${settings.COMMUNITY_API_URL}mirrors`;
                const data = await this._makeRequest(url, 'GET', null, {
                    'Authorization': `Bearer ${settings.COMMUNITY_API_KEY}`
                });

                if (data && data.mirrors) {
                    state.communityMirrors = data.mirrors;
                    cache.lastCommunityUpdate = now;
                    Logger.log('Espejos comunitarios actualizados:', state.communityMirrors);
                }

                return state.communityMirrors;
            } catch (error) {
                Logger.error('Error al obtener espejos comunitarios:', error);
                return [];
            }
        }

        static async fetchCommunityReports(doi) {
            if (!settings.COMMUNITY_API_URL || !settings.COMMUNITY_API_KEY) {
                return [];
            }

            try {
                const url = `${settings.COMMUNITY_API_URL}reports?doi=${encodeURIComponent(doi)}`;
                const data = await this._makeRequest(url, 'GET', null, {
                    'Authorization': `Bearer ${settings.COMMUNITY_API_KEY}`
                });

                if (data && data.reports) {
                    state.communityReports = data.reports;
                    Logger.log('Reportes comunitarios cargados:', state.communityReports);
                }

                return state.communityReports;
            } catch (error) {
                Logger.error('Error al obtener reportes comunitarios:', error);
                return [];
            }
        }

        static async submitCommunityReport(report) {
            if (!settings.COMMUNITY_API_URL || !settings.COMMUNITY_API_KEY) {
                throw new Error("API no configurada para reportes comunitarios");
            }

            try {
                const url = `${settings.COMMUNITY_API_URL}reports`;
                const response = await this._makeRequest(url, 'POST', report, {
                    'Authorization': `Bearer ${settings.COMMUNITY_API_KEY}`,
                    'Content-Type': 'application/json'
                });

                if (response && response.success) {
                    state.communityReports.unshift(report);
                    UI.showNotification('Despagador', 'Reporte enviado a la comunidad. ¡Gracias!');
                    return true;
                }

                return false;
            } catch (error) {
                Logger.error('Error al enviar reporte comunitario:', error);
                throw error;
            }
        }

        static async getSummary(text, targetLang = 'es') {
            if (!settings.ENABLE_AI_SUMMARY || !settings.ANTHROPIC_API_KEY) {
                throw new Error("Resumen con IA no habilitado o API Key no configurada.");
            }
            if (!text) throw new Error("No hay texto para resumir.");

            const prompt = `Por favor, resume el siguiente texto académico de manera concisa y objetiva. El resumen debe capturar los puntos clave, la metodología principal y las conclusiones más importantes. Si es posible, traduce el resumen a ${targetLang}. Texto:\n\n${text}\n\nResumen:`;

            try {
                const response = await this._makeRequest('https://api.anthropic.com/v1/messages', 'POST', {
                    model: "claude-3-opus-20240229",
                    max_tokens: 500,
                    messages: [{ role: "user", content: prompt }],
                }, {
                    'x-api-key': settings.ANTHROPIC_API_KEY,
                    'anthropic-version': '2023-06-01',
                    'Content-Type': 'application/json'
                });
                return response.content[0].text;
            } catch (error) {
                Logger.error('Error al generar resumen con IA:', error);
                throw new Error("No se pudo generar el resumen. Verifica tu API Key o los límites de uso.");
            }
        }

        static async translateText(text, targetLang = 'es') {
            if (!settings.DEEPL_API_KEY) {
                throw new Error("Traducción no habilitada o API Key de DeepL no configurada.");
            }
            if (!text) return "";

            try {
                const apiUrl = settings.DEEPL_API_KEY.endsWith(':fx')
                    ? 'https://api-free.deepl.com/v2/translate'
                    : 'https://api.deepl.com/v2/translate';

                const response = await this._makeRequest(apiUrl, 'POST', {
                    text: [text],
                    target_lang: targetLang.toUpperCase(),
                }, {
                    'Authorization': `DeepL-Auth-Key ${settings.DEEPL_API_KEY}`,
                    'Content-Type': 'application/json',
                });
                return response.translations[0].text;
            } catch (error) {
                Logger.error('Error al traducir con DeepL:', error);
                throw new Error("No se pudo traducir. Verifica tu API Key o los límites de uso de DeepL.");
            }
        }

        static async analyzePDFForKeywords(pdfUrl, keywords) {
            if (!settings.ENABLE_KEYWORD_SEARCH) {
                throw new Error("Búsqueda por keywords no habilitada.");
            }

            try {
                // Primero descargamos el PDF
                const response = await this._makeRequest(pdfUrl, 'GET');
                const blob = new Blob([response.response], { type: 'application/pdf' });

                // Convertimos a texto (simplificado - en un script real usaríamos una librería PDF.js)
                const text = await this._extractTextFromPDF(blob);

                // Buscamos keywords
                const results = {};
                keywords.forEach(keyword => {
                    const regex = new RegExp(keyword, 'gi');
                    const matches = text.match(regex);
                    results[keyword] = matches ? matches.length : 0;

                    // También encontramos contextos
                    const contextRegex = new RegExp(`.{0,30}${keyword}.{0,30}`, 'gi');
                    const contexts = text.match(contextRegex);
                    results[`${keyword}_contexts`] = contexts || [];
                });

                return {
                    text: text,
                    results: results
                };
            } catch (error) {
                Logger.error('Error al analizar PDF:', error);
                throw error;
            }
        }

        static async _extractTextFromPDF(blob) {
            // Esta es una implementación simplificada. En producción, usar PDF.js
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => {
                    // Simulamos extracción de texto (en realidad esto solo funciona para PDFs con texto)
                    const text = reader.result
                        .replace(/[^\x00-\x7F]/g, "") // ASCII only
                        .replace(/\n/g, " ")
                        .replace(/\s+/g, " ");
                    resolve(text);
                };
                reader.onerror = reject;
                reader.readAsText(blob);
            });
        }

        static async _makeRequest(url, method = 'GET', data = null, headers = {}) {
            return new Promise((resolve, reject) => {
                const options = {
                    method: method,
                    url: url,
                    headers: headers,
                    onload: (r) => {
                        if (r.status >= 200 && r.status < 300) {
                            try {
                                resolve(JSON.parse(r.responseText));
                            } catch (e) {
                                resolve(r); // Resolve with raw response if not JSON
                            }
                        } else {
                            reject(new Error(`HTTP error ${r.status}: ${r.statusText || r.responseText}`));
                        }
                    },
                    onerror: reject,
                    ontimeout: () => reject(new Error('Request timed out')),
                };

                if (data) {
                    options.data = JSON.stringify(data);
                    options.headers['Content-Type'] = options.headers['Content-Type'] || 'application/json';
                }

                if (method === 'GET' && url.endsWith('.pdf')) {
                    options.responseType = 'arraybuffer';
                }

                if (typeof GM_xmlhttpRequest !== 'undefined') {
                    GM_xmlhttpRequest(options);
                } else {
                    fetch(url, { method, headers, body: data ? JSON.stringify(data) : null })
                        .then(r => r.ok ? (r.headers.get('content-type')?.includes('application/json') ? r.json() : r.text().then(() => r)) : Promise.reject(new Error(`HTTP error ${r.status}`)))
                        .then(resolve)
                        .catch(reject);
                }
            });
        }
    }

    // ==================== INTERFAZ DE USUARIO ====================
    class FloatingLock {
        static init() {
            if (!settings.SHOW_FLOATING_LOCK) return;
            if (document.getElementById('despagador-floating-lock')) return;

            const lock = document.createElement('div');
            lock.id = 'despagador-floating-lock';
            lock.innerHTML = '🔓';
            lock.title = 'Abrir con Despagador';

            Object.assign(lock.style, {
                position: 'fixed',
                bottom: '20px',
                right: '20px',
                fontSize: '24px',
                cursor: 'pointer',
                zIndex: '9998',
                background: 'var(--bg-color)',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 10px var(--shadow-color)',
                transition: 'transform 0.2s',
                border: '1px solid var(--border-color)',
                color: 'var(--text-color)'
            });

            lock.addEventListener('click', async () => {
                const identifier = DOIFinder.find() || DOIFinder.findOtherIdentifier();
                if (identifier) {
                    // Intentar primero con Sci-Hub si es DOI
                    if (identifier.type === 'doi' && settings.ENABLE_SCIHUB) {
                        const url = await APIClient.tryMultipleUrls(settings.SCIHUB_URLS, identifier.value);
                        if (url) {
                            if (settings.ENABLE_NINJA_MODE) {
                                ControlPanel._downloadPdfNinjaMode(url, `${identifier.value}.pdf`);
                            } else {
                                GM_openInTab(url, { active: true });
                            }
                            return;
                        }
                    }

                    // Si no, abrir el panel de control
                    const container = document.getElementById('despagador-container');
                    if (container) {
                        const wrapper = container.shadowRoot.querySelector('.despagador-wrapper');
                        wrapper.classList.remove('collapsed');
                    }
                } else {
                    UI.showNotification('Despagador', 'No se encontró DOI o identificador para este artículo');
                }
            });

            lock.addEventListener('mouseenter', () => {
                lock.style.transform = 'scale(1.1)';
            });

            lock.addEventListener('mouseleave', () => {
                lock.style.transform = 'scale(1)';
            });

            document.body.appendChild(lock);
        }

        static destroy() {
            const lock = document.getElementById('despagador-floating-lock');
            if (lock) lock.remove();
        }
    }

    class ControlPanel {
        static init() {
            if (document.getElementById('despagador-container')) return;

            this._createContainer();
            this._applyTheme();
            this._addEventListeners();
            this.refresh();
        }

        static _createContainer() {
            const container = document.createElement('div');
            container.id = 'despagador-container';

            const shadow = container.attachShadow({ mode: 'open' });
            shadow.innerHTML = `
                <style>
                    ${this._getPanelStyles()}
                    ${settings.PANEL_THEME === 'auto' ? '@media (prefers-color-scheme: dark) { :host { ' + ASSETS.STYLES.DARK + ' } }' : ''}
                </style>
                <div class="despagador-wrapper ${settings.AUTO_COLLAPSE_PANEL ? 'collapsed' : ''} ${settings.PANEL_POSITION}">
                    <button class="toggle-button" title="Mostrar/ocultar panel">
                        <svg class="toggle-arrow" viewBox="0 0 24 24">
                            <polygon points="12,16 6,9 18,9" fill="currentColor"/>
                        </svg>
                    </button>
                    <div class="header">
                        <span class="title">Despagador Plus</span>
                    </div>
                    <div class="button-group">
                        <div class="loading-message">
                            <span>Cargando opciones...</span>
                            ${UI.createLoadingSpinner().outerHTML}
                        </div>
                    </div>
                    <div class="footer">
                        <button class="settings-button" title="Ajustes">
                            ${ASSETS.ICONS.SETTINGS}
                        </button>
                    </div>
                </div>
            `;

            document.body.appendChild(container);
        }

        static _getPanelStyles() {
            const themeStyle = settings.PANEL_THEME === 'dark' ? ASSETS.STYLES.DARK : ASSETS.STYLES.LIGHT;
            return `
                :host {
                    ${themeStyle}
                    position: fixed;
                    ${settings.PANEL_POSITION.includes('right') ? 'right: 16px;' : 'left: 16px;'}
                    ${settings.PANEL_POSITION.includes('top') ? 'top: 16px;' : 'bottom: 16px;'}
                    z-index: 9999;
                    font-family: system-ui, sans-serif;
                }

                .despagador-wrapper {
                    background: var(--panel-bg);
                    border: 1.5px solid var(--border-color);
                    border-radius: 18px;
                    box-shadow: 0 0 16px var(--shadow-color);
                    max-width: 340px;
                    display: flex;
                    flex-direction: column;
                    transition: all 0.3s cubic-bezier(.4,1.4,.6,1);
                    overflow: hidden;
                    color: var(--text-color);
                }

                .despagador-wrapper.collapsed {
                    max-height: 40px;
                }

                .despagador-wrapper.top-left .toggle-button,
                .despagador-wrapper.top-right .toggle-button {
                    border-bottom: 1px solid var(--border-color);
                }

                .despagador-wrapper.bottom-left .toggle-button,
                .despagador-wrapper.bottom-right .toggle-button {
                    border-top: 1px solid var(--border-color);
                }

                .toggle-button {
                    background: var(--panel-bg);
                    border: none;
                    cursor: pointer;
                    padding: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 100%;
                    transition: background 0.15s;
                    color: var(--text-color);
                }

                .toggle-button:hover {
                    background: var(--hover-color);
                }

                .toggle-arrow {
                    width: 24px;
                    height: 24px;
                    transition: transform 0.2s;
                }

                .despagador-wrapper.collapsed .toggle-arrow {
                    transform: rotate(180deg);
                }

                .despagador-wrapper.top-left .toggle-arrow,
                .despagador-wrapper.top-right .toggle-arrow {
                    transform: rotate(0deg);
                }

                .despagador-wrapper.top-left.collapsed .toggle-arrow,
                .despagador-wrapper.top-right.collapsed .toggle-arrow {
                    transform: rotate(180deg);
                }

                .header {
                    padding: 8px 16px;
                    font-size: 1.1em;
                    font-weight: bold;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .despagador-wrapper.collapsed .header {
                    display: none;
                }

                .button-group {
                    display: flex;
                    flex-direction: column;
                    padding: 8px 0;
                    max-height: 500px;
                    overflow-y: auto;
                    scrollbar-width: thin;
                }

                .despagador-wrapper.collapsed .button-group {
                    display: none;
                }

                .access-link {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 12px 18px;
                    margin: 0 10px 6px;
                    text-decoration: none;
                    font-size: 16px;
                    font-weight: 600;
                    color: var(--text-color);
                    border-radius: 8px;
                    transition: all 0.15s;
                }

                .access-link .icon {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 24px;
                    height: 24px;
                    flex-shrink: 0;
                }
                .access-link .icon svg {
                    width: 100%;
                    height: 100%;
                    fill: currentColor;
                }

                .access-link:hover {
                    background: var(--hover-color);
                    transform: translateX(2px);
                }

                .footer {
                    display: flex;
                    justify-content: flex-end;
                    padding: 8px;
                    border-top: 1px solid var(--border-color);
                }

                .despagador-wrapper.collapsed .footer {
                    display: none;
                }

                .settings-button {
                    background: none;
                    border: none;
                    cursor: pointer;
                    padding: 4px;
                    border-radius: 4px;
                    color: var(--text-color);
                }

                .settings-button:hover {
                    background: var(--hover-color);
                }

                .settings-button svg {
                    width: 20px;
                    height: 20px;
                    fill: currentColor;
                }

                .loading-message, .no-access, .error-message {
                    padding: 12px 18px;
                    text-align: center;
                    color: var(--text-color);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                }
                .error-message {
                    color: var(--error-color);
                }
            `;
        }

        static _applyTheme() {
            if (settings.PANEL_THEME === 'auto') {
                const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
                const update = (e) => this._updateTheme(e.matches ? 'dark' : 'light');
                darkModeMediaQuery.addListener(update);
                update(darkModeMediaQuery);
            } else {
                this._updateTheme(settings.PANEL_THEME);
            }
        }

        static _updateTheme(theme) {
            const container = document.getElementById('despagador-container');
            if (container) {
                const shadowRoot = container.shadowRoot;
                const styleElement = shadowRoot.querySelector('style');
                styleElement.textContent = this._getPanelStyles();
            }
        }

        static _addEventListeners() {
            const container = document.getElementById('despagador-container');
            if (!container) return;

            const shadow = container.shadowRoot;
            const toggleButton = shadow.querySelector('.toggle-button');
            const settingsButton = shadow.querySelector('.settings-button');

            toggleButton.addEventListener('click', () => {
                shadow.querySelector('.despagador-wrapper').classList.toggle('collapsed');
            });

            settingsButton.addEventListener('click', () => {
                this._showSettingsModal();
            });
        }

        static _showSettingsModal() {
            const content = `
                <div class="setting-group">
                    <h3>Fuentes de Acceso</h3>
                    <div class="setting-item checkbox-item">
                        <label for="enableSciHub">Sci-Hub</label>
                        <input type="checkbox" id="enableSciHub" ${settings.ENABLE_SCIHUB ? 'checked' : ''}>
                    </div>
                    <div class="setting-item checkbox-item">
                        <label for="enableUnpaywall">Unpaywall</label>
                        <input type="checkbox" id="enableUnpaywall" ${settings.ENABLE_UNPAYWALL ? 'checked' : ''}>
                    </div>
                    <div class="setting-item checkbox-item">
                        <label for="enableCore">CORE</label>
                        <input type="checkbox" id="enableCore" ${settings.ENABLE_CORE ? 'checked' : ''}>
                    </div>
                    <div class="setting-item checkbox-item">
                        <label for="enableGoogleScholar">Google Scholar</label>
                        <input type="checkbox" id="enableGoogleScholar" ${settings.ENABLE_GOOGLE_SCHOLAR ? 'checked' : ''}>
                    </div>
                    <div class="setting-item checkbox-item">
                        <label for="enableLibGen">LibGen</label>
                        <input type="checkbox" id="enableLibGen" ${settings.ENABLE_LIBGEN ? 'checked' : ''}>
                    </div>
                    <div class="setting-item checkbox-item">
                        <label for="enableSemanticScholar">Semantic Scholar</label>
                        <input type="checkbox" id="enableSemanticScholar" ${settings.ENABLE_SEMANTIC_SCHOLAR ? 'checked' : ''}>
                    </div>
                    <div class="setting-item checkbox-item">
                        <label for="enableConnectedPapers">Connected Papers</label>
                        <input type="checkbox" id="enableConnectedPapers" ${settings.ENABLE_CONNECTED_PAPERS ? 'checked' : ''}>
                    </div>
                    <div class="setting-item checkbox-item">
                        <label for="enableArxiv">arXiv</label>
                        <input type="checkbox" id="enableArxiv" ${settings.ENABLE_ARXIV ? 'checked' : ''}>
                    </div>
                    <div class="setting-item checkbox-item">
                        <label for="enableSSRN">SSRN</label>
                        <input type="checkbox" id="enableSSRN" ${settings.ENABLE_SSRN ? 'checked' : ''}>
                    </div>
                    <div class="setting-item checkbox-item">
                        <label for="enableResearchSquare">Research Square</label>
                        <input type="checkbox" id="enableResearchSquare" ${settings.ENABLE_RESEARCH_SQUARE ? 'checked' : ''}>
                    </div>
                </div>

                <div class="setting-group">
                    <h3>Interfaz</h3>
                    <div class="setting-item checkbox-item">
                        <label for="showNotification">Mostrar Notificaciones</label>
                        <input type="checkbox" id="showNotification" ${settings.SHOW_NOTIFICATION ? 'checked' : ''}>
                    </div>
                    <div class="setting-item checkbox-item">
                        <label for="showFloatingLock">Mostrar Candado Flotante</label>
                        <input type="checkbox" id="showFloatingLock" ${settings.SHOW_FLOATING_LOCK ? 'checked' : ''}>
                    </div>
                    <div class="setting-item checkbox-item">
                        <label for="autoCollapsePanel">Colapsar Panel Automáticamente</label>
                        <input type="checkbox" id="autoCollapsePanel" ${settings.AUTO_COLLAPSE_PANEL ? 'checked' : ''}>
                    </div>
                    <div class="setting-item checkbox-item">
                        <label for="autoOpenBestSource">Abrir Mejor Fuente Automáticamente</label>
                        <input type="checkbox" id="autoOpenBestSource" ${settings.AUTO_OPEN_BEST_SOURCE ? 'checked' : ''}>
                    </div>
                    <div class="setting-item checkbox-item">
                        <label for="showCommunityAlerts">Alertas Comunitarias</label>
                        <input type="checkbox" id="showCommunityAlerts" ${settings.SHOW_COMMUNITY_ALERTS ? 'checked' : ''}>
                    </div>
                    <label for="panelPosition">Posición del Panel:</label>
                    <select id="panelPosition">
                        <option value="bottom-right" ${settings.PANEL_POSITION === 'bottom-right' ? 'selected' : ''}>Abajo a la Derecha</option>
                        <option value="top-right" ${settings.PANEL_POSITION === 'top-right' ? 'selected' : ''}>Arriba a la Derecha</option>
                        <option value="bottom-left" ${settings.PANEL_POSITION === 'bottom-left' ? 'selected' : ''}>Abajo a la Izquierda</option>
                        <option value="top-left" ${settings.PANEL_POSITION === 'top-left' ? 'selected' : ''}>Arriba a la Izquierda</option>
                    </select>
                    <label for="panelTheme">Tema del Panel:</label>
                    <select id="panelTheme">
                        <option value="light" ${settings.PANEL_THEME === 'light' ? 'selected' : ''}>Claro</option>
                        <option value="dark" ${settings.PANEL_THEME === 'dark' ? 'selected' : ''}>Oscuro</option>
                        <option value="auto" ${settings.PANEL_THEME === 'auto' ? 'selected' : ''}>Automático</option>
                    </select>
                </div>

                <div class="setting-group">
                    <h3>Avanzado</h3>
                    <div class="setting-item">
                        <label for="unpaywallEmail">Email para Unpaywall (requerido por Unpaywall API):</label>
                        <input type="email" id="unpaywallEmail" value="${settings.UNPAYWALL_EMAIL}">
                    </div>
                    <div class="setting-item checkbox-item">
                        <label for="debugMode">Modo Depuración (mostrar logs en consola)</label>
                        <input type="checkbox" id="debugMode" ${settings.DEBUG ? 'checked' : ''}>
                    </div>
                    <div class="setting-item checkbox-item">
                        <label for="enableNinjaMode">Modo Ninja (descarga silenciosa)</label>
                        <input type="checkbox" id="enableNinjaMode" ${settings.ENABLE_NINJA_MODE ? 'checked' : ''}>
                    </div>
                    <div class="setting-item checkbox-item">
                        <label for="enableLocalCache">Caché Local de Artículos</label>
                        <input type="checkbox" id="enableLocalCache" ${settings.ENABLE_LOCAL_CACHE ? 'checked' : ''}>
                    </div>
                    <div class="setting-item checkbox-item">
                        <label for="enableKeywordSearch">Búsqueda por Keywords</label>
                        <input type="checkbox" id="enableKeywordSearch" ${settings.ENABLE_KEYWORD_SEARCH ? 'checked' : ''}>
                    </div>
                    <div class="setting-item checkbox-item">
                        <label for="enableAiSummary">Habilitar Resumen con IA (Requiere Anthropic API Key)</label>
                        <input type="checkbox" id="enableAiSummary" ${settings.ENABLE_AI_SUMMARY ? 'checked' : ''}>
                    </div>
                    <div class="setting-item">
                        <label for="anthropicApiKey">Anthropic API Key:</label>
                        <input type="text" id="anthropicApiKey" value="${settings.ANTHROPIC_API_KEY}" placeholder="sk-...">
                    </div>
                    <div class="setting-item">
                        <label for="deeplApiKey">DeepL API Key (para traducción):</label>
                        <input type="text" id="deeplApiKey" value="${settings.DEEPL_API_KEY}" placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx:fx">
                    </div>
                    <div class="setting-item">
                        <label for="communityApiKey">Community API Key (opcional):</label>
                        <input type="text" id="communityApiKey" value="${settings.COMMUNITY_API_KEY}" placeholder="Token de acceso a la API comunitaria">
                    </div>
                    <div class="setting-item">
                        <label for="maxCacheSize">Tamaño máximo de caché (MB):</label>
                        <input type="number" id="maxCacheSize" value="${settings.MAX_CACHE_SIZE}" min="10" max="1000">
                    </div>
                    <div class="setting-item">
                        <label for="cacheExpirationDays">Días para expiración de caché:</label>
                        <input type="number" id="cacheExpirationDays" value="${settings.CACHE_EXPIRATION_DAYS}" min="1" max="365">
                    </div>
                </div>
            `;

            UI.renderModal('Ajustes Despagador Plus', content, async (modalOverlay) => {
                const newSettings = {};
                newSettings.ENABLE_SCIHUB = modalOverlay.querySelector('#enableSciHub').checked;
                newSettings.ENABLE_UNPAYWALL = modalOverlay.querySelector('#enableUnpaywall').checked;
                newSettings.ENABLE_CORE = modalOverlay.querySelector('#enableCore').checked;
                newSettings.ENABLE_GOOGLE_SCHOLAR = modalOverlay.querySelector('#enableGoogleScholar').checked;
                newSettings.ENABLE_LIBGEN = modalOverlay.querySelector('#enableLibGen').checked;
                newSettings.ENABLE_SEMANTIC_SCHOLAR = modalOverlay.querySelector('#enableSemanticScholar').checked;
                newSettings.ENABLE_CONNECTED_PAPERS = modalOverlay.querySelector('#enableConnectedPapers').checked;
                newSettings.ENABLE_ARXIV = modalOverlay.querySelector('#enableArxiv').checked;
                newSettings.ENABLE_SSRN = modalOverlay.querySelector('#enableSSRN').checked;
                newSettings.ENABLE_RESEARCH_SQUARE = modalOverlay.querySelector('#enableResearchSquare').checked;
                newSettings.SHOW_NOTIFICATION = modalOverlay.querySelector('#showNotification').checked;
                newSettings.SHOW_FLOATING_LOCK = modalOverlay.querySelector('#showFloatingLock').checked;
                newSettings.AUTO_COLLAPSE_PANEL = modalOverlay.querySelector('#autoCollapsePanel').checked;
                newSettings.AUTO_OPEN_BEST_SOURCE = modalOverlay.querySelector('#autoOpenBestSource').checked;
                newSettings.SHOW_COMMUNITY_ALERTS = modalOverlay.querySelector('#showCommunityAlerts').checked;
                newSettings.PANEL_POSITION = modalOverlay.querySelector('#panelPosition').value;
                newSettings.PANEL_THEME = modalOverlay.querySelector('#panelTheme').value;
                newSettings.UNPAYWALL_EMAIL = modalOverlay.querySelector('#unpaywallEmail').value;
                newSettings.DEBUG = modalOverlay.querySelector('#debugMode').checked;
                newSettings.ENABLE_NINJA_MODE = modalOverlay.querySelector('#enableNinjaMode').checked;
                newSettings.ENABLE_LOCAL_CACHE = modalOverlay.querySelector('#enableLocalCache').checked;
                newSettings.ENABLE_KEYWORD_SEARCH = modalOverlay.querySelector('#enableKeywordSearch').checked;
                newSettings.ENABLE_AI_SUMMARY = modalOverlay.querySelector('#enableAiSummary').checked;
                newSettings.ANTHROPIC_API_KEY = modalOverlay.querySelector('#anthropicApiKey').value;
                newSettings.DEEPL_API_KEY = modalOverlay.querySelector('#deeplApiKey').value;
                newSettings.COMMUNITY_API_KEY = modalOverlay.querySelector('#communityApiKey').value;
                newSettings.MAX_CACHE_SIZE = parseInt(modalOverlay.querySelector('#maxCacheSize').value) || 50;
                newSettings.CACHE_EXPIRATION_DAYS = parseInt(modalOverlay.querySelector('#cacheExpirationDays').value) || 30;

                for (const key in newSettings) {
                    if (settings[key] !== newSettings[key]) {
                        await Storage.save(key, newSettings[key]);
                    }
                }
                settings = await Storage.load();
                UI.showNotification('Despagador', 'Ajustes guardados correctamente.');

                FloatingLock.destroy();
                if (settings.SHOW_FLOATING_LOCK) FloatingLock.init();
                ControlPanel._updateTheme(settings.PANEL_THEME);
                const wrapper = document.getElementById('despagador-container')?.shadowRoot?.querySelector('.despagador-wrapper');
                if (wrapper) {
                    wrapper.classList.toggle('collapsed', settings.AUTO_COLLAPSE_PANEL);
                    wrapper.className = `despagador-wrapper ${settings.AUTO_COLLAPSE_PANEL ? 'collapsed' : ''} ${settings.PANEL_POSITION}`;
                }
            });
        }

        static async refresh() {
            const container = document.getElementById('despagador-container');
            if (!container) return;

            const shadow = container.shadowRoot;
            const buttonGroup = shadow.querySelector('.button-group');
            buttonGroup.innerHTML = '';
            buttonGroup.appendChild(UI.createLoadingSpinner());

            const articleDetails = DOIFinder.getArticleDetails();
            const currentIdentifier = cache.identifier;

            if (!currentIdentifier) {
                buttonGroup.innerHTML = '<div class="no-access">No se encontró DOI o identificador en esta página</div>';
                return;
            }

            try {
                const sources = await this._getAvailableSources(currentIdentifier, articleDetails);
                this._renderSources(buttonGroup, sources);

                if (settings.AUTO_OPEN_BEST_SOURCE && sources.length > 0) {
                    const bestSource = sources[0];
                    if (bestSource.type === 'pdf_direct' || bestSource.type === 'scihub_pdf') {
                        if (settings.ENABLE_NINJA_MODE) {
                            this._downloadPdfNinjaMode(bestSource.url, articleDetails?.title || 'document').then(() => {
                                UI.showNotification('Despagador', `Descargado "${articleDetails?.title || 'document'}.pdf" en segundo plano.`);
                            }).catch(e => {
                                UI.showNotification('Despagador', `Error al descargar en modo ninja: ${e.message}`, { title: 'Error' });
                                GM_openInTab(bestSource.url, { active: true });
                            });
                        } else {
                            GM_openInTab(bestSource.url, { active: true });
                        }
                    } else {
                        GM_openInTab(bestSource.url, { active: true });
                    }
                }

                // Add productivity buttons
                if (articleDetails) {
                    const productivityGroup = document.createElement('div');
                    productivityGroup.className = 'button-group';

                    const copyCitationButton = UI.createButton(
                        'Cita Rápida',
                        ASSETS.ICONS.COPY,
                        () => this._showCitationModal(articleDetails)
                    );
                    productivityGroup.appendChild(copyCitationButton);

                    if (settings.ENABLE_AI_SUMMARY && settings.ANTHROPIC_API_KEY && articleDetails.abstract) {
                        const translateAbstractButton = UI.createButton(
                            'Traducir Abstract',
                            ASSETS.ICONS.TRANSLATE,
                            () => this._translateAbstract(articleDetails.abstract)
                        );
                        productivityGroup.appendChild(translateAbstractButton);

                        const summarizeAbstractButton = UI.createButton(
                            'Resumir Abstract (IA)',
                            ASSETS.ICONS.TRANSLATE,
                            () => this._summarizeAbstract(articleDetails.abstract)
                        );
                        productivityGroup.appendChild(summarizeAbstractButton);
                    }

                    if (settings.ENABLE_CONNECTED_PAPERS && articleDetails.doi) {
                        const connectedPapersLink = UI.createLink(
                            'Ver Relaciones (Connected Papers)',
                            ASSETS.ICONS.GRAPH,
                            `${settings.CONNECTED_PAPERS_URL}${encodeURIComponent(articleDetails.doi)}`
                        );
                        productivityGroup.appendChild(connectedPapersLink);
                    }

                    if (settings.ENABLE_KEYWORD_SEARCH) {
                        const keywordSearchButton = UI.createButton(
                            'Buscar Keywords en PDF',
                            ASSETS.ICONS.COPY,
                            () => this._showKeywordSearchModal(sources)
                        );
                        productivityGroup.appendChild(keywordSearchButton);
                    }

                    if (settings.SHOW_COMMUNITY_ALERTS && articleDetails.doi) {
                        const communityButton = UI.createButton(
                            'Comunidad Despagador',
                            ASSETS.ICONS.COMMUNITY,
                            () => this._showCommunityModal(articleDetails.doi)
                        );
                        productivityGroup.appendChild(communityButton);
                    }

                    shadow.querySelector('.despagador-wrapper').insertBefore(productivityGroup, buttonGroup.nextSibling);
                }

            } catch (error) {
                Logger.error('Error al cargar fuentes:', error);
                buttonGroup.innerHTML = `<div class="error-message">Error al cargar opciones: ${error.message || 'Desconocido'}</div>`;
            }
        }

        static async _getAvailableSources(identifier, articleDetails) {
            const sources = [];
            const doi = identifier.type === 'doi' ? identifier.value : null;

            // 1. Unpaywall (prioridad alta si tiene PDF)
            if (settings.ENABLE_UNPAYWALL && doi) {
                try {
                    const data = await APIClient.fetchUnpaywall(doi);
                    if (data && data.best_oa_location) {
                        sources.push({
                            id: 'unpaywall-pdf',
                            name: 'Unpaywall (PDF)',
                            icon: ASSETS.ICONS.UNPAYWALL,
                            url: data.best_oa_location.url,
                            type: 'pdf_direct',
                            color: '#2CBB4C',
                            isPDF: true
                        });
                    }
                    if (data && data.oa_locations && data.oa_locations.length > 0) {
                        data.oa_locations.forEach(loc => {
                            if (loc.url !== data.best_oa_location?.url) {
                                sources.push({
                                    id: `unpaywall-oa-${loc.evidence}`,
                                    name: `Unpaywall (OA: ${loc.source})`,
                                    icon: ASSETS.ICONS.UNPAYWALL,
                                    url: loc.url,
                                    type: loc.url.endsWith('.pdf') ? 'pdf_link' : 'html_open_access',
                                    color: '#5cb85c',
                                    isPDF: loc.url.endsWith('.pdf')
                                });
                            }
                        });
                    }
                } catch (error) {
                    Logger.error('Error con Unpaywall:', error);
                }
            }

            // 2. Sci-Hub (PDF/HTML, siempre intento si hay DOI)
            if (settings.ENABLE_SCIHUB && doi) {
                // Primero intentamos con espejos configurados
                let scihubUrl = await APIClient.tryMultipleUrls(settings.SCIHUB_URLS, doi);

                // Si no funciona, probamos con espejos de la comunidad
                if (!scihubUrl && settings.SHOW_COMMUNITY_ALERTS && settings.COMMUNITY_API_KEY) {
                    const communityMirrors = await APIClient.fetchCommunityMirrors();
                    if (communityMirrors.length > 0) {
                        scihubUrl = await APIClient.tryMultipleUrls(communityMirrors, doi);
                    }
                }

                if (scihubUrl) {
                    sources.push({
                        id: 'scihub',
                        name: 'Sci-Hub',
                        icon: ASSETS.ICONS.SCIHUB,
                        url: scihubUrl,
                        type: 'scihub_link',
                        color: '#c00',
                        isPDF: scihubUrl.endsWith('.pdf') || scihubUrl.includes('/pdf/')
                    });
                }
            }

            // 3. LibGen (si hay DOI)
            if (settings.ENABLE_LIBGEN && doi) {
                const libgenUrl = await APIClient.tryMultipleUrls(settings.LIBGEN_URLS, doi, 'scimag');
                if (libgenUrl) {
                    sources.push({
                        id: 'libgen',
                        name: 'LibGen Sci-Mag',
                        icon: ASSETS.ICONS.LIBGEN,
                        url: libgenUrl,
                        type: 'libgen_link',
                        color: '#007bff',
                        isPDF: true // LibGen generalmente devuelve PDFs
                    });
                }
            }

            // 4. Preprints / Otros Identificadores
            if (identifier.type === 'arxiv' && settings.ENABLE_ARXIV) {
                sources.push({
                    id: 'arxiv',
                    name: 'arXiv (Preprint)',
                    icon: ASSETS.ICONS.ARXIV,
                    url: `${settings.ARXIV_URL}${identifier.value}`,
                    type: 'preprint',
                    color: '#B31B1B',
                    isPDF: false
                });

                // Añadir también enlace directo al PDF de arXiv
                sources.push({
                    id: 'arxiv-pdf',
                    name: 'arXiv (PDF Directo)',
                    icon: ASSETS.ICONS.PDF,
                    url: `https://arxiv.org/pdf/${identifier.value}.pdf`,
                    type: 'pdf_direct',
                    color: '#B31B1B',
                    isPDF: true
                });
            }

            if (identifier.type === 'ssrn' && settings.ENABLE_SSRN) {
                sources.push({
                    id: 'ssrn',
                    name: 'SSRN (Preprint)',
                    icon: ASSETS.ICONS.SSRN,
                    url: `${settings.SSRN_URL}${identifier.value}`,
                    type: 'preprint',
                    color: '#286090',
                    isPDF: false
                });
            }

            if (identifier.type === 'researchsquare' && settings.ENABLE_RESEARCH_SQUARE) {
                sources.push({
                    id: 'researchsquare',
                    name: 'Research Square',
                    icon: ASSETS.ICONS.RESEARCH_SQUARE,
                    url: `${settings.RESEARCH_SQUARE_URL}${identifier.value}`,
                    type: 'preprint',
                    color: '#5bc0de',
                    isPDF: false
                });
            }

            if ((identifier.type === 'pmid' || identifier.type === 'pmcid') && settings.ENABLE_GOOGLE_SCHOLAR) {
                sources.push({
                    id: 'pubmed',
                    name: `PubMed (${identifier.type.toUpperCase()})`,
                    icon: ASSETS.ICONS.PUBMED,
                    url: `${settings.PUBMED_URL}${identifier.value}`,
                    type: 'metadata_page',
                    color: '#204C6C',
                    isPDF: false
                });
            }

            // 5. Otros servicios (Google Scholar, CORE, Semantic Scholar)
            const query = articleDetails ? `${articleDetails.title} ${articleDetails.authors}` : identifier.value;

            if (settings.ENABLE_GOOGLE_SCHOLAR) {
                sources.push({
                    id: 'google-scholar',
                    name: 'Google Scholar',
                    icon: ASSETS.ICONS.SCHOLAR,
                    url: `${settings.GOOGLE_SCHOLAR_URL}${encodeURIComponent(query)}`,
                    type: 'search_engine',
                    color: '#4285F4',
                    isPDF: false
                });
            }
            if (settings.ENABLE_CORE) {
                sources.push({
                    id: 'core',
                    name: 'CORE',
                    icon: ASSETS.ICONS.CORE,
                    url: `${settings.CORE_URL}${encodeURIComponent(query)}`,
                    type: 'search_engine',
                    color: '#673AB7',
                    isPDF: false
                });
            }
            if (settings.ENABLE_SEMANTIC_SCHOLAR) {
                sources.push({
                    id: 'semantic-scholar',
                    name: 'Semantic Scholar',
                    icon: ASSETS.ICONS.SEMANTIC,
                    url: `${settings.SEMANTIC_SCHOLAR_URL}${encodeURIComponent(query)}`,
                    type: 'search_engine',
                    color: '#2196F3',
                    isPDF: false
                });
            }

            // Priorización de fuentes
            sources.sort((a, b) => {
                const typeOrder = {
                    'pdf_direct': 1,
                    'scihub_link': 2,
                    'libgen_link': 3,
                    'html_open_access': 4,
                    'pdf_link': 5,
                    'preprint': 6,
                    'metadata_page': 7,
                    'search_engine': 8,
                };
                return typeOrder[a.type] - typeOrder[b.type];
            });

            return sources;
        }

        static _renderSources(container, sources) {
            container.innerHTML = '';

            if (sources.length === 0) {
                container.innerHTML = '<div class="no-access">No hay opciones de acceso directo disponibles. Intenta con las búsquedas.</div>';
                return;
            }

            sources.forEach(source => {
                const link = UI.createLink(
                    source.name,
                    source.icon,
                    source.url,
                    'access-link',
                    '_blank',
                    'noopener noreferrer',
                    `color: ${source.color}`
                );

                if ((source.type.includes('pdf') || source.isPDF) && settings.ENABLE_NINJA_MODE) {
                    link.addEventListener('click', async (e) => {
                        e.preventDefault();
                        UI.showNotification('Despagador', `Iniciando descarga silenciosa de "${source.name}"...`);
                        try {
                            const fileName = `${DOIFinder.getArticleDetails()?.title || DOIFinder.find() || 'document'}.pdf`;
                            await this._downloadPdfNinjaMode(source.url, fileName);
                            UI.showNotification('Despagador', `Descargado "${fileName}" en segundo plano.`);
                        } catch (error) {
                            UI.showNotification('Despagador', `Error en modo ninja: ${error.message}. Abriendo en nueva pestaña.`, { title: 'Error' });
                            GM_openInTab(source.url, { active: true });
                        }
                    });
                }
                container.appendChild(link);
            });
        }

        static async _downloadPdfNinjaMode(url, fileName) {
            try {
                // Usamos GM_download si está disponible (más eficiente)
                if (typeof GM_download !== 'undefined') {
                    GM_download({
                        url: url,
                        name: fileName,
                        onload: () => Logger.log('Descarga completada'),
                        onerror: (e) => {
                            Logger.error('Error en GM_download:', e);
                            throw new Error(e.error);
                        }
                    });
                } else {
                    // Fallback para navegadores sin GM_download
                    const response = await APIClient._makeRequest(url, 'GET');
                    const blob = new Blob([response.response], { type: 'application/pdf' });
                    const urlObject = URL.createObjectURL(blob);

                    const a = document.createElement('a');
                    a.href = urlObject;
                    a.download = fileName;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(urlObject);
                }
            } catch (error) {
                Logger.error('Error al descargar PDF en modo ninja:', error);
                throw error;
            }
        }

        static _showCitationModal(articleDetails) {
            const { title, authors, year, journal, doi } = articleDetails;

            const getAuthorsString = (format) => {
                const names = authors.split(', ').filter(name => name.trim() !== '');
                if (names.length === 0) return '';

                switch (format) {
                    case 'APA':
                        return names.map(name => {
                            const parts = name.split(' ');
                            const lastName = parts.pop();
                            const initials = parts.map(p => p.charAt(0) + '.').join('');
                            return `${lastName}, ${initials}`;
                        }).join(', ');
                    case 'MLA':
                        return names.map(name => {
                            const parts = name.split(' ');
                            const lastName = parts.pop();
                            const firstName = parts.join(' ');
                            return `${lastName}, ${firstName}`;
                        }).join(', ');
                    case 'Vancouver':
                        return names.map(name => {
                            const parts = name.split(' ');
                            const lastName = parts.pop();
                            const initials = parts.map(p => p.charAt(0)).join('');
                            return `${initials}${lastName}`;
                        }).join(', ');
                    default: return authors;
                }
            };

            const citations = {
                APA: `${getAuthorsString('APA')} (${year}). ${title}. *${journal || 'Journal'}*, *${'Vol'}(${'No'}), pp-pp. DOI: ${doi}`,
                MLA: `${getAuthorsString('MLA')}. "${title}." *${journal || 'Journal'}*, ${year}, pp-pp. DOI: ${doi}.`,
                Vancouver: `${getAuthorsString('Vancouver')}. ${title}. ${journal || 'Journal'}. ${year}. DOI: ${doi}.`
            };

            const content = `
                <div style="margin-bottom: 15px;">Selecciona el formato de cita y copia al portapapeles:</div>
                <div style="display: flex; flex-direction: column; gap: 10px;">
                    ${Object.entries(citations).map(([format, citationText]) => `
                        <div style="border: 1px solid var(--border-color); padding: 10px; border-radius: 8px; background: var(--bg-color); position: relative;">
                            <strong>${format}:</strong>
                            <textarea id="citation-${format}" style="width: calc(100% - 20px); min-height: 60px; resize: vertical; border: none; background: none; color: var(--text-color); margin-top: 5px;" readonly>${citationText}</textarea>
                            <button class="copy-button" data-format="${format}" style="position: absolute; bottom: 8px; right: 8px; background: var(--accent-color); color: white; border: none; padding: 6px 10px; border-radius: 4px; cursor: pointer;">
                                ${ASSETS.ICONS.COPY} Copiar
                            </button>
                        </div>
                    `).join('')}
                </div>
            `;

            UI.renderModal('Cita Rápida', content, null);

            const modalOverlay = document.getElementById('despagador-modal-overlay');
            if (modalOverlay) {
                modalOverlay.querySelectorAll('.copy-button').forEach(button => {
                    button.addEventListener('click', (e) => {
                        const format = e.currentTarget.dataset.format;
                        const textarea = modalOverlay.querySelector(`#citation-${format}`);
                        if (GM_setClipboard) {
                            GM_setClipboard(textarea.value);
                            UI.showNotification('Despagador', `Cita ${format} copiada al portapapeles.`);
                        } else {
                            textarea.select();
                            document.execCommand('copy');
                            UI.showNotification('Despagador', `Cita ${format} copiada (ctrl+C o cmd+C).`);
                        }
                    });
                });
            }
        }

        static async _translateAbstract(abstract) {
            UI.showNotification('Despagador', 'Traduciendo abstract...');
            try {
                const translatedAbstract = await APIClient.translateText(abstract, 'es');
                const content = `
                    <h3>Abstract Original:</h3>
                    <p>${abstract}</p>
                    <h3>Abstract Traducido:</h3>
                    <p>${translatedAbstract}</p>
                `;
                UI.renderModal('Traducción de Abstract', content, null);
            } catch (error) {
                UI.showNotification('Despagador', `Error al traducir: ${error.message}`, { title: 'Error' });
            }
        }

        static async _summarizeAbstract(abstract) {
            UI.showNotification('Despagador', 'Generando resumen con IA...');
            try {
                const summary = await APIClient.getSummary(abstract, 'es');
                const content = `
                    <h3>Abstract Original:</h3>
                    <p>${abstract}</p>
                    <h3>Resumen Generado por IA:</h3>
                    <p>${summary}</p>
                `;
                UI.renderModal('Resumen con IA', content, null);
            } catch (error) {
                UI.showNotification('Despagador', `Error al resumir: ${error.message}`, { title: 'Error' });
            }
        }

        static _showKeywordSearchModal(sources) {
            const pdfSources = sources.filter(s => s.isPDF);

            if (pdfSources.length === 0) {
                UI.showNotification('Despagador', 'No hay fuentes PDF disponibles para buscar.', { title: 'Error' });
                return;
            }

            const content = `
                <div>
                    <p>Busca palabras clave en el PDF del artículo:</p>
                    <div class="keyword-search-container">
                        <input type="text" class="keyword-input" placeholder="Ingresa palabras clave separadas por comas">
                        <button class="keyword-search-button">Buscar</button>
                    </div>
                    <div class="keyword-results" style="display: none;"></div>
                </div>
                ${pdfSources.length > 1 ? `
                <div style="margin-top: 15px;">
                    <p>Seleccionar fuente PDF:</p>
                    <select id="pdf-source-select">
                        ${pdfSources.map(source => `<option value="${source.url}">${source.name}</option>`).join('')}
                    </select>
                </div>
                ` : ''}
            `;

            const modal = UI.renderModal('Búsqueda por Keywords', content, null);

            if (modal) {
                const searchButton = modal.querySelector('.keyword-search-button');
                const keywordInput = modal.querySelector('.keyword-input');
                const resultsContainer = modal.querySelector('.keyword-results');
                const pdfSourceSelect = modal.querySelector('#pdf-source-select') || { value: pdfSources[0].url };

                searchButton.addEventListener('click', async () => {
                    const keywords = keywordInput.value.split(',').map(k => k.trim()).filter(k => k);
                    if (keywords.length === 0) return;

                    searchButton.disabled = true;
                    searchButton.textContent = 'Buscando...';
                    resultsContainer.style.display = 'none';
                    resultsContainer.innerHTML = '';

                    try {
                        const pdfUrl = pdfSourceSelect.value;
                        const { text, results } = await APIClient.analyzePDFForKeywords(pdfUrl, keywords);

                        resultsContainer.innerHTML = '';

                        keywords.forEach(keyword => {
                            const count = results[keyword] || 0;
                            const contexts = results[`${keyword}_contexts`] || [];

                            const resultElement = document.createElement('div');
                            resultElement.className = 'keyword-result';
                            resultElement.innerHTML = `
                                <strong>${keyword}</strong>: encontrado ${count} veces
                                ${contexts.length > 0 ? `
                                <div style="margin-top: 5px; font-size: 0.9em;">
                                    ${contexts.slice(0, 3).map(c => `
                                        <div style="margin-bottom: 3px;">...${c.replace(new RegExp(keyword, 'gi'), '<span class="keyword-highlight">$&</span>')}...</div>
                                    `).join('')}
                                    ${contexts.length > 3 ? `<div>...y ${contexts.length - 3} más...</div>` : ''}
                                </div>
                                ` : ''}
                            `;

                            resultElement.addEventListener('click', () => {
                                // Esto es un placeholder - en una implementación real usaríamos PDF.js para saltar a la posición
                                UI.showNotification('Despagador', `Mostrando ocurrencias de "${keyword}" en el PDF.`);
                                GM_openInTab(pdfUrl, { active: true });
                            });

                            resultsContainer.appendChild(resultElement);
                        });

                        resultsContainer.style.display = 'block';
                    } catch (error) {
                        resultsContainer.innerHTML = `<div class="error-message">Error al buscar: ${error.message}</div>`;
                        resultsContainer.style.display = 'block';
                    } finally {
                        searchButton.disabled = false;
                        searchButton.textContent = 'Buscar';
                    }
                });
            }
        }

        static async _showCommunityModal(doi) {
            if (!settings.COMMUNITY_API_KEY) {
                UI.showNotification('Despagador', 'La API comunitaria no está configurada. Configúrala en los ajustes.', { title: 'Error' });
                return;
            }

            // Cargar reportes existentes
            UI.showNotification('Despagador', 'Cargando reportes comunitarios...');
            const reports = await APIClient.fetchCommunityReports(doi);

            const reportsContent = reports.length > 0
                ? reports.map(report => `
                    <div class="community-report">
                        <div class="report-meta">
                            <strong>${report.type}</strong> - ${new Date(report.timestamp).toLocaleString()} por ${report.user || 'Anónimo'}
                        </div>
                        <div class="report-content">${report.content}</div>
                        <div class="report-actions">
                            <button class="report-action" data-id="${report.id}" data-action="upvote">👍 ${report.upvotes || 0}</button>
                            <button class="report-action" data-id="${report.id}" data-action="downvote">👎 ${report.downvotes || 0}</button>
                        </div>
                    </div>
                `).join('')
                : '<p>No hay reportes comunitarios para este artículo aún.</p>';

            const tabs = [
                {
                    title: 'Reportes',
                    content: `
                        <h3>Reportes Comunitarios</h3>
                        <div id="community-reports">
                            ${reportsContent}
                        </div>
                    `,
                    onSave: null
                },
                {
                    title: 'Nuevo Reporte',
                    content: `
                        <h3>Enviar Reporte a la Comunidad</h3>
                        <div style="margin-bottom: 15px;">
                            <label for="report-type">Tipo de Reporte:</label>
                            <select id="report-type">
                                <option value="mirror">Espejo Funcional</option>
                                <option value="alternative">Fuente Alternativa</option>
                                <option value="problem">Problema Reportado</option>
                                <option value="info">Información Adicional</option>
                            </select>
                        </div>
                        <div style="margin-bottom: 15px;">
                            <label for="report-content">Contenido:</label>
                            <textarea id="report-content" style="width: 100%; min-height: 100px;" placeholder="Describe tu reporte..."></textarea>
                        </div>
                        <div style="margin-bottom: 15px;">
                            <label for="report-anonymous">
                                <input type="checkbox" id="report-anonymous"> Enviar como anónimo
                            </label>
                        </div>
                    `,
                    onSave: async (modal) => {
                        const type = modal.querySelector('#report-type').value;
                        const content = modal.querySelector('#report-content').value;
                        const anonymous = modal.querySelector('#report-anonymous').checked;

                        if (!content.trim()) {
                            UI.showNotification('Despagador', 'Por favor ingresa un contenido para el reporte.', { title: 'Error' });
                            return false;
                        }

                        try {
                            await APIClient.submitCommunityReport({
                                doi: doi,
                                type: type,
                                content: content,
                                anonymous: anonymous
                            });
                            return true;
                        } catch (error) {
                            UI.showNotification('Despagador', `Error al enviar reporte: ${error.message}`, { title: 'Error' });
                            return false;
                        }
                    }
                }
            ];

            UI.renderTabbedModal('Comunidad Despagador', tabs);
        }
    }

    // ==================== MENÚ Y CONFIGURACIÓN ====================
    class SettingsManager {
        static async init() {
            await this._registerMenuCommands();
        }

        static async _registerMenuCommands() {
            if (typeof GM_registerMenuCommand === 'undefined') return;

            // Clear previous commands to avoid duplicates on refresh
            // (GM_registerMenuCommand doesn't have an unregister, so this is a common workaround by re-initializing)

            // Commands to toggle sources
            this._addToggleCommand('ENABLE_SCIHUB', 's', 'Sci-Hub');
            this._addToggleCommand('ENABLE_UNPAYWALL', 'u', 'Unpaywall');
            this._addToggleCommand('ENABLE_CORE', 'c', 'CORE');
            this._addToggleCommand('ENABLE_GOOGLE_SCHOLAR', 'g', 'Google Scholar');
            this._addToggleCommand('ENABLE_LIBGEN', 'l', 'LibGen');
            this._addToggleCommand('ENABLE_ARXIV', 'a', 'arXiv');
            this._addToggleCommand('ENABLE_SSRN', 'r', 'SSRN');
            this._addToggleCommand('ENABLE_RESEARCH_SQUARE', 'q', 'Research Square');

            // Commands for UI configuration
            GM_registerMenuCommand(
                `Mostrar notificaciones: ${settings.SHOW_NOTIFICATION ? 'ON' : 'OFF'}`,
                () => this._toggleSetting('SHOW_NOTIFICATION', 'Notificaciones'),
                'n'
            );

            GM_registerMenuCommand(
                `Candado flotante: ${settings.SHOW_FLOATING_LOCK ? 'ON' : 'OFF'}`,
                () => this._toggleSetting('SHOW_FLOATING_LOCK', 'Candado flotante'),
                'f'
            );

            GM_registerMenuCommand(
                `Auto-colapsar panel: ${settings.AUTO_COLLAPSE_PANEL ? 'ON' : 'OFF'}`,
                () => this._toggleSetting('AUTO_COLLAPSE_PANEL', 'Auto-colapsar panel'),
                'p'
            );

            GM_registerMenuCommand(
                `Abrir mejor fuente automáticamente: ${settings.AUTO_OPEN_BEST_SOURCE ? 'ON' : 'OFF'}`,
                () => this._toggleSetting('AUTO_OPEN_BEST_SOURCE', 'Auto-abrir mejor fuente'),
                'b'
            );

            GM_registerMenuCommand(
                `Modo Ninja (descarga silenciosa): ${settings.ENABLE_NINJA_MODE ? 'ON' : 'OFF'}`,
                () => this._toggleSetting('ENABLE_NINJA_MODE', 'Modo Ninja'),
                'j'
            );

            GM_registerMenuCommand(
                `Resumen con IA: ${settings.ENABLE_AI_SUMMARY ? 'ON' : 'OFF'}`,
                () => this._toggleSetting('ENABLE_AI_SUMMARY', 'Resumen con IA'),
                'i'
            );

            GM_registerMenuCommand(
                `Caché Local: ${settings.ENABLE_LOCAL_CACHE ? 'ON' : 'OFF'}`,
                () => this._toggleSetting('ENABLE_LOCAL_CACHE', 'Caché Local'),
                'k'
            );

            GM_registerMenuCommand(
                `Búsqueda por Keywords: ${settings.ENABLE_KEYWORD_SEARCH ? 'ON' : 'OFF'}`,
                () => this._toggleSetting('ENABLE_KEYWORD_SEARCH', 'Búsqueda por Keywords'),
                'w'
            );

            GM_registerMenuCommand(
                `Alertas Comunitarias: ${settings.SHOW_COMMUNITY_ALERTS ? 'ON' : 'OFF'}`,
                () => this._toggleSetting('SHOW_COMMUNITY_ALERTS', 'Alertas Comunitarias'),
                'm'
            );

            // Command to show full settings modal
            GM_registerMenuCommand('Abrir Ajustes Despagador Plus', () => {
                ControlPanel._showSettingsModal();
            }, 'o');

            // Command to reload
            GM_registerMenuCommand('Recargar Opciones Despagador', () => {
                ControlPanel.refresh();
                UI.showNotification('Despagador', 'Opciones recargadas');
            }, 'e');
        }

        static async _addToggleCommand(settingKey, shortcut, name) {
            GM_registerMenuCommand(
                `${name}: ${settings[settingKey] ? 'ON' : 'OFF'}`,
                () => this._toggleSetting(settingKey, name),
                shortcut
            );
        }

        static async _toggleSetting(key, name) {
            const newValue = !settings[key];
            settings[key] = newValue;
            await Storage.save(key, newValue);

            UI.showNotification('Despagador', `${name} ${newValue ? 'activado' : 'desactivado'}`);

            // Update UI based on changes
            if (key === 'SHOW_FLOATING_LOCK') {
                newValue ? FloatingLock.init() : FloatingLock.destroy();
            }
            if (key === 'AUTO_COLLAPSE_PANEL') {
                const wrapper = document.getElementById('despagador-container')?.shadowRoot?.querySelector('.despagador-wrapper');
                if (wrapper) wrapper.classList.toggle('collapsed', newValue);
            }
            ControlPanel.refresh();
            this.init();
        }
    }

    // ==================== INICIALIZACIÓN ====================
    async function init() {
        try {
            settings = await Storage.load();
            Logger.log('Settings loaded:', settings);

            // Cargar caché local si está habilitado
            if (settings.ENABLE_LOCAL_CACHE) {
                cache.localArticles = await GM_getValue('localArticles', {});
                Logger.log(`Caché local cargado: ${Object.keys(cache.localArticles).length} artículos`);
            }

            FloatingLock.init();
            ControlPanel.init();
            await SettingsManager.init();

            // Verificar si hay alertas comunitarias para este artículo
            if (settings.SHOW_COMMUNITY_ALERTS) {
                const identifier = DOIFinder.find() || DOIFinder.findOtherIdentifier();
                if (identifier && identifier.type === 'doi') {
                    const reports = await APIClient.fetchCommunityReports(identifier.value);
                    const importantReports = reports.filter(r => r.type === 'problem' || r.type === 'mirror');

                    if (importantReports.length > 0) {
                        UI.showNotification(
                            'Despagador Plus',
                            `Hay ${importantReports.length} reporte(s) comunitarios para este artículo.`,
                            { timeout: 5000, highlight: true }
                        );
                    }
                }
            }

            Logger.log('Despagador Plus inicializado correctamente');
        } catch (error) {
            Logger.error('Error durante la inicialización:', error);
            UI.showNotification('Despagador Plus', `Error al iniciar: ${error.message}. Consulta la consola para más detalles.`, { title: 'Error', timeout: 8000 });
        }
    }

    // Iniciar el script
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        init();
    } else {
        document.addEventListener('DOMContentLoaded', init);
    }
})();
