const STORAGE_KEY = "soullink_tracker_v1";
const DB_CACHE_KEY = "soullink_pokemon_db_v1";
const DB_CACHE_VERSION = 1;
const ANALYSIS_PANEL_STATE_KEY = "soullink_analysis_panel_state_v1";
const CLOUD_SETTINGS_KEY = "soullink_cloud_settings_v1";
const CLOUD_CLIENT_ID_KEY = "soullink_cloud_client_id_v1";
const CLOUD_TABLE_NAME = "soullink_rooms";
const CLOUD_SYNC_DEBOUNCE_MS = 350;
const POKEDEX_MAX_ID = 1025;
const POKEAPI_CSV_BASE = "https://cdn.jsdelivr.net/gh/PokeAPI/pokeapi@master/data/v2/csv";

const TYPE_NAME_BY_ID = {
  1: "Normal",
  2: "Kampf",
  3: "Flug",
  4: "Gift",
  5: "Boden",
  6: "Gestein",
  7: "Kaefer",
  8: "Geist",
  9: "Stahl",
  10: "Feuer",
  11: "Wasser",
  12: "Pflanze",
  13: "Elektro",
  14: "Psycho",
  15: "Eis",
  16: "Drache",
  17: "Unlicht",
  18: "Fee",
};

const TYPE_ORDER = [
  "Normal",
  "Feuer",
  "Wasser",
  "Pflanze",
  "Elektro",
  "Eis",
  "Kampf",
  "Gift",
  "Boden",
  "Flug",
  "Psycho",
  "Kaefer",
  "Gestein",
  "Geist",
  "Drache",
  "Unlicht",
  "Stahl",
  "Fee",
];

const TYPE_LABEL = {
  Kaefer: "Kaefer",
};

const TYPE_CHART = {
  Normal: { Gestein: 0.5, Geist: 0, Stahl: 0.5 },
  Feuer: { Feuer: 0.5, Wasser: 0.5, Pflanze: 2, Eis: 2, Kaefer: 2, Gestein: 0.5, Drache: 0.5, Stahl: 2 },
  Wasser: { Feuer: 2, Wasser: 0.5, Pflanze: 0.5, Boden: 2, Gestein: 2, Drache: 0.5 },
  Pflanze: { Feuer: 0.5, Wasser: 2, Pflanze: 0.5, Gift: 0.5, Boden: 2, Flug: 0.5, Kaefer: 0.5, Gestein: 2, Drache: 0.5, Stahl: 0.5 },
  Elektro: { Wasser: 2, Pflanze: 0.5, Elektro: 0.5, Boden: 0, Flug: 2, Drache: 0.5 },
  Eis: { Feuer: 0.5, Wasser: 0.5, Pflanze: 2, Boden: 2, Flug: 2, Drache: 2, Stahl: 0.5, Eis: 0.5 },
  Kampf: { Normal: 2, Eis: 2, Gift: 0.5, Flug: 0.5, Psycho: 0.5, Kaefer: 0.5, Gestein: 2, Geist: 0, Unlicht: 2, Stahl: 2, Fee: 0.5 },
  Gift: { Pflanze: 2, Gift: 0.5, Boden: 0.5, Gestein: 0.5, Geist: 0.5, Stahl: 0, Fee: 2 },
  Boden: { Feuer: 2, Elektro: 2, Pflanze: 0.5, Gift: 2, Flug: 0, Kaefer: 0.5, Gestein: 2, Stahl: 2 },
  Flug: { Elektro: 0.5, Pflanze: 2, Kampf: 2, Kaefer: 2, Gestein: 0.5, Stahl: 0.5 },
  Psycho: { Kampf: 2, Gift: 2, Psycho: 0.5, Unlicht: 0, Stahl: 0.5 },
  Kaefer: { Feuer: 0.5, Pflanze: 2, Kampf: 0.5, Gift: 0.5, Flug: 0.5, Psycho: 2, Geist: 0.5, Unlicht: 2, Stahl: 0.5, Fee: 0.5 },
  Gestein: { Feuer: 2, Eis: 2, Kampf: 0.5, Boden: 0.5, Flug: 2, Kaefer: 2, Stahl: 0.5 },
  Geist: { Normal: 0, Psycho: 2, Geist: 2, Unlicht: 0.5 },
  Drache: { Drache: 2, Stahl: 0.5, Fee: 0 },
  Unlicht: { Kampf: 0.5, Psycho: 2, Geist: 2, Unlicht: 0.5, Fee: 0.5 },
  Stahl: { Feuer: 0.5, Wasser: 0.5, Elektro: 0.5, Eis: 2, Gestein: 2, Stahl: 0.5, Fee: 2 },
  Fee: { Feuer: 0.5, Kampf: 2, Gift: 0.5, Drache: 2, Unlicht: 2, Stahl: 0.5 },
};

const setupView = document.getElementById("setupView");
const appView = document.getElementById("appView");
const nameInputs = document.getElementById("nameInputs");
const startChallengeBtn = document.getElementById("startChallengeBtn");

const runTitle = document.getElementById("runTitle");
const runHint = document.getElementById("runHint");
const nextRunBtn = document.getElementById("nextRunBtn");
const resetBtn = document.getElementById("resetBtn");
const runSelect = document.getElementById("runSelect");
const openRunBtn = document.getElementById("openRunBtn");
const backToCurrentBtn = document.getElementById("backToCurrentBtn");

const linkEntryInputs = document.getElementById("linkEntryInputs");
const addLinkBtn = document.getElementById("addLinkBtn");
const dbStatus = document.getElementById("dbStatus");
const inputHint = document.getElementById("inputHint");
const analysisInput = document.getElementById("analysisInput");
const analysisSuggestions = document.getElementById("analysisSuggestions");
const analysisHint = document.getElementById("analysisHint");
const analysisResult = document.getElementById("analysisResult");
const analysisPanel = document.getElementById("analysisPanel");
const analysisBody = document.getElementById("analysisBody");
const analysisToggleBtn = document.getElementById("analysisToggleBtn");
const foundPokemonList = document.getElementById("foundPokemonList");
const playerCounters = document.getElementById("playerCounters");
const cloudSyncCard = document.getElementById("cloudSyncCard");
const supabaseUrlInput = document.getElementById("supabaseUrlInput");
const supabaseAnonKeyInput = document.getElementById("supabaseAnonKeyInput");
const cloudRoomCodeInput = document.getElementById("cloudRoomCodeInput");
const connectCloudBtn = document.getElementById("connectCloudBtn");
const disconnectCloudBtn = document.getElementById("disconnectCloudBtn");
const cloudSyncStatus = document.getElementById("cloudSyncStatus");

let state = loadState() || createFreshState();

let pokemonDb = [];
let pokemonById = new Map();
let pokemonAliasLookup = new Map();
let activeAnalysisSuggestions = [];
let linkSuggestionsByInput = new Map();
const cloudSync = {
  client: null,
  channel: null,
  connected: false,
  connecting: false,
  roomCode: "",
  pushTimer: null,
  applyingRemoteState: false,
  settings: loadCloudSettings(),
  clientId: getOrCreateCloudClientId(),
};

init();

function init() {
  initializeCloudSyncUi();
  wireSetupEvents();
  wireAppEvents();
  initializeAnalysisPanel();
  renderNameInputs(state.configured ? state.playerCount : getSelectedPlayerCount());
  render();
  loadPokemonDatabase();

  if (cloudSync.settings.autoConnect) {
    connectCloudSync({ skipPersist: true }).catch((error) => {
      console.error("Cloud-Sync konnte nicht automatisch verbunden werden:", error);
    });
  }
}

function wireSetupEvents() {
  document.querySelectorAll("input[name='playerCount']").forEach((radio) => {
    radio.addEventListener("change", () => renderNameInputs(getSelectedPlayerCount()));
  });

  startChallengeBtn.addEventListener("click", startChallenge);

  if (connectCloudBtn) {
    connectCloudBtn.addEventListener("click", () => {
      connectCloudSync().catch((error) => {
        console.error("Cloud-Sync Verbindung fehlgeschlagen:", error);
      });
    });
  }

  if (disconnectCloudBtn) {
    disconnectCloudBtn.addEventListener("click", () => {
      disconnectCloudSync();
    });
  }

  if (cloudRoomCodeInput) {
    cloudRoomCodeInput.addEventListener("keydown", (event) => {
      if (event.key !== "Enter") {
        return;
      }

      event.preventDefault();
      connectCloudSync().catch((error) => {
        console.error("Cloud-Sync Verbindung fehlgeschlagen:", error);
      });
    });
  }
}

function wireAppEvents() {
  nextRunBtn.addEventListener("click", startNextRun);
  resetBtn.addEventListener("click", resetChallenge);

  addLinkBtn.addEventListener("click", addLinkToCurrentRun);
  linkEntryInputs.addEventListener("keydown", (event) => {
    const input = event.target.closest("input[data-link-input]");
    if (!input) {
      return;
    }

    if (event.key === "Escape") {
      hideLinkSuggestionsForInput(Number(input.dataset.linkInput));
      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();
      if (applyFirstLinkSuggestionIfAvailable(input)) {
        return;
      }
      addLinkToCurrentRun();
    }
  });
  linkEntryInputs.addEventListener("input", (event) => {
    const input = event.target.closest("input[data-link-input]");
    if (!input) {
      return;
    }

    clearInputHint();
    updateLinkSuggestionsForInput(input);
  });
  linkEntryInputs.addEventListener("focusin", (event) => {
    const input = event.target.closest("input[data-link-input]");
    if (!input) {
      return;
    }

    updateLinkSuggestionsForInput(input);
  });
  linkEntryInputs.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-link-suggest-id][data-link-suggest-input]");
    if (!button) {
      return;
    }

    const inputIndex = Number(button.dataset.linkSuggestInput);
    const pokemonId = Number(button.dataset.linkSuggestId);
    const input = getLinkInputByIndex(inputIndex);
    const entry = pokemonById.get(pokemonId);
    if (!input || !entry) {
      return;
    }

    input.value = entry.displayName;
    hideLinkSuggestionsForInput(inputIndex);
    input.focus();
  });

  analysisInput.addEventListener("input", () => {
    updateAnalysisSuggestions(analysisInput.value);
    renderTypeAnalysisFromQuery(analysisInput.value);
  });

  analysisInput.addEventListener("focus", () => {
    updateAnalysisSuggestions(analysisInput.value);
    renderTypeAnalysisFromQuery(analysisInput.value);
  });

  analysisInput.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      hideAnalysisSuggestions();
      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();
      if (isAnalysisSuggestionsVisible() && activeAnalysisSuggestions.length > 0) {
        analysisInput.value = activeAnalysisSuggestions[0].displayName;
      }
      hideAnalysisSuggestions();
      renderTypeAnalysisFromQuery(analysisInput.value);
    }
  });

  analysisSuggestions.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-id]");
    if (!button) {
      return;
    }

    const entry = pokemonById.get(Number(button.dataset.id));
    if (!entry) {
      return;
    }

    analysisInput.value = entry.displayName;
    hideAnalysisSuggestions();
    renderTypeAnalysisForPokemon(entry);
    analysisInput.focus();
  });

  document.addEventListener("click", (event) => {
    if (!event.target.closest("[data-analysis-search-wrap]")) {
      hideAnalysisSuggestions();
    }
    if (!event.target.closest("[data-link-search-wrap]")) {
      hideAllLinkSuggestions();
    }
  });

  foundPokemonList.addEventListener("click", (event) => {
    const deleteBtn = event.target.closest("button[data-delete-link]");
    if (deleteBtn && isViewingCurrentRun()) {
      deleteLinkFromCurrentRun(Number(deleteBtn.dataset.deleteLink));
      return;
    }

    const toggleBtn = event.target.closest("button[data-toggle-link]");
    if (!toggleBtn || !isViewingCurrentRun()) {
      return;
    }

    toggleLinkActiveInCurrentRun(Number(toggleBtn.dataset.toggleLink));
  });

  playerCounters.addEventListener("click", (event) => {
    const btn = event.target.closest("button[data-player][data-field][data-delta]");
    if (!btn) {
      return;
    }

    const player = state.players[Number(btn.dataset.player)];
    const field = btn.dataset.field;
    const delta = Number(btn.dataset.delta);

    if (!player || !(field in player)) {
      return;
    }

    player[field] = Math.max(0, Number(player[field] || 0) + delta);
    saveState();
    renderPlayerCounters();
  });

  openRunBtn.addEventListener("click", () => {
    const runId = Number(runSelect.value);
    if (!runId) {
      return;
    }

    state.viewingRunId = runId;
    saveState();
    render();
  });

  backToCurrentBtn.addEventListener("click", () => {
    state.viewingRunId = state.currentRunId;
    saveState();
    render();
  });
}

function initializeAnalysisPanel() {
  if (!analysisPanel || !analysisBody || !analysisToggleBtn) {
    return;
  }

  const storedState = localStorage.getItem(ANALYSIS_PANEL_STATE_KEY);
  setAnalysisPanelCollapsed(storedState === "collapsed", false);

  analysisToggleBtn.addEventListener("click", () => {
    const collapsed = !analysisPanel.classList.contains("collapsed");
    setAnalysisPanelCollapsed(collapsed, true);
  });
}

function setAnalysisPanelCollapsed(collapsed, persist) {
  if (!analysisPanel || !analysisBody || !analysisToggleBtn) {
    return;
  }

  analysisPanel.classList.toggle("collapsed", collapsed);
  analysisBody.classList.toggle("hidden", collapsed);
  analysisToggleBtn.textContent = collapsed ? "Erweitern" : "Minimieren";
  analysisToggleBtn.setAttribute("aria-expanded", String(!collapsed));

  if (collapsed) {
    hideAnalysisSuggestions();
  }

  if (persist) {
    localStorage.setItem(ANALYSIS_PANEL_STATE_KEY, collapsed ? "collapsed" : "expanded");
  }
}

function initializeCloudSyncUi() {
  if (!supabaseUrlInput || !supabaseAnonKeyInput || !cloudRoomCodeInput) {
    return;
  }

  supabaseUrlInput.value = cloudSync.settings.url;
  supabaseAnonKeyInput.value = cloudSync.settings.anonKey;
  cloudRoomCodeInput.value = cloudSync.settings.roomCode;

  updateCloudSyncUiState();
  setCloudStatus("Nicht verbunden.", false);
}

function updateCloudSyncUiState() {
  const isBusy = cloudSync.connecting;
  const isConnected = cloudSync.connected;
  const disableInputs = isBusy || isConnected;

  [supabaseUrlInput, supabaseAnonKeyInput, cloudRoomCodeInput].forEach((input) => {
    if (!input) {
      return;
    }

    input.disabled = disableInputs;
  });

  if (connectCloudBtn) {
    connectCloudBtn.disabled = isBusy || isConnected;
    connectCloudBtn.textContent = isBusy ? "Verbinde..." : isConnected ? "Verbunden" : "Verbinden";
  }

  if (disconnectCloudBtn) {
    disconnectCloudBtn.disabled = !isBusy && !isConnected;
  }

  if (cloudSyncCard) {
    cloudSyncCard.classList.toggle("cloud-connected", isConnected);
  }
}

function setCloudStatus(message, isError) {
  if (!cloudSyncStatus) {
    return;
  }

  cloudSyncStatus.textContent = message;
  cloudSyncStatus.classList.toggle("hint-error", Boolean(isError));
}

function getCloudFormValues() {
  return {
    url: String(supabaseUrlInput?.value || "").trim(),
    anonKey: String(supabaseAnonKeyInput?.value || "").trim(),
    roomCode: normalizeRoomCode(cloudRoomCodeInput?.value || ""),
  };
}

async function connectCloudSync(options = {}) {
  const skipPersist = Boolean(options.skipPersist);

  if (cloudSync.connecting) {
    return;
  }

  if (!window.supabase || typeof window.supabase.createClient !== "function") {
    setCloudStatus("Supabase Bibliothek wurde nicht geladen.", true);
    return;
  }

  const values = getCloudFormValues();
  if (cloudRoomCodeInput) {
    cloudRoomCodeInput.value = values.roomCode;
  }
  if (!values.url) {
    setCloudStatus("Bitte Supabase URL eintragen.", true);
    return;
  }

  if (!values.anonKey) {
    setCloudStatus("Bitte Supabase Anon Key eintragen.", true);
    return;
  }

  if (!values.roomCode) {
    setCloudStatus("Bitte einen gueltigen Raum-Code eintragen.", true);
    return;
  }

  try {
    // Validate URL format once so we can provide a clear error in the UI.
    new URL(values.url);
  } catch {
    setCloudStatus("Supabase URL ist ungueltig.", true);
    return;
  }

  cloudSync.connecting = true;
  updateCloudSyncUiState();
  setCloudStatus(`Verbinde mit Raum "${values.roomCode}"...`, false);

  if (cloudSync.client || cloudSync.channel || cloudSync.connected) {
    await disconnectCloudSync({ skipPersist: true, keepStatus: true });
  }

  try {
    cloudSync.client = window.supabase.createClient(values.url, values.anonKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
    });
    cloudSync.roomCode = values.roomCode;

    cloudSync.settings = {
      url: values.url,
      anonKey: values.anonKey,
      roomCode: values.roomCode,
      autoConnect: true,
    };

    if (!skipPersist) {
      saveCloudSettings(cloudSync.settings);
    }

    await loadOrCreateCloudRoom();
    await subscribeToCloudRoom();

    cloudSync.connected = true;
    cloudSync.connecting = false;
    updateCloudSyncUiState();
    setCloudStatus(`Verbunden mit Raum "${values.roomCode}".`, false);
  } catch (error) {
    console.error("Cloud-Sync Verbindung fehlgeschlagen:", error);
    await disconnectCloudSync({ skipPersist: true, keepStatus: true });
    cloudSync.connecting = false;
    cloudSync.settings = { ...cloudSync.settings, autoConnect: false };
    saveCloudSettings(cloudSync.settings);
    updateCloudSyncUiState();
    setCloudStatus(`Verbindung fehlgeschlagen: ${String(error?.message || error)}`, true);
  }
}

async function disconnectCloudSync(options = {}) {
  const skipPersist = Boolean(options.skipPersist);
  const keepStatus = Boolean(options.keepStatus);

  if (cloudSync.pushTimer) {
    clearTimeout(cloudSync.pushTimer);
    cloudSync.pushTimer = null;
  }

  if (cloudSync.client && cloudSync.channel) {
    try {
      await cloudSync.client.removeChannel(cloudSync.channel);
    } catch (error) {
      console.warn("Cloud-Sync Kanal konnte nicht sauber getrennt werden:", error);
    }
  }

  cloudSync.channel = null;
  cloudSync.client = null;
  cloudSync.connected = false;
  cloudSync.connecting = false;
  cloudSync.roomCode = "";
  cloudSync.applyingRemoteState = false;

  if (!skipPersist) {
    cloudSync.settings = { ...cloudSync.settings, autoConnect: false };
    saveCloudSettings(cloudSync.settings);
  }

  updateCloudSyncUiState();

  if (!keepStatus) {
    setCloudStatus("Nicht verbunden.", false);
  }
}

async function loadOrCreateCloudRoom() {
  if (!cloudSync.client || !cloudSync.roomCode) {
    return;
  }

  const { data, error } = await cloudSync.client
    .from(CLOUD_TABLE_NAME)
    .select("room_code,state_json,updated_by")
    .eq("room_code", cloudSync.roomCode)
    .maybeSingle();

  if (error) {
    throw error;
  }

  if (data && data.state_json) {
    applyRemoteState(data.state_json);
    return;
  }

  const { error: upsertError } = await cloudSync.client.from(CLOUD_TABLE_NAME).upsert(
    {
      room_code: cloudSync.roomCode,
      state_json: state,
      updated_by: cloudSync.clientId,
    },
    { onConflict: "room_code" },
  );

  if (upsertError) {
    throw upsertError;
  }
}

async function subscribeToCloudRoom() {
  if (!cloudSync.client || !cloudSync.roomCode) {
    return;
  }

  const filter = `room_code=eq.${cloudSync.roomCode}`;
  const channelName = `soullink-room-${cloudSync.roomCode}-${cloudSync.clientId.slice(0, 8)}`;

  cloudSync.channel = cloudSync.client
    .channel(channelName)
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: CLOUD_TABLE_NAME, filter },
      handleCloudPayload,
    )
    .on(
      "postgres_changes",
      { event: "UPDATE", schema: "public", table: CLOUD_TABLE_NAME, filter },
      handleCloudPayload,
    )
    .subscribe((status) => {
      if (status === "CHANNEL_ERROR") {
        setCloudStatus("Realtime Kanalfehler. Bitte neu verbinden.", true);
      }
    });
}

function handleCloudPayload(payload) {
  const row = payload?.new;
  if (!row) {
    return;
  }

  if (row.updated_by && row.updated_by === cloudSync.clientId) {
    return;
  }

  applyRemoteState(row.state_json);
  setCloudStatus(`Live-Sync empfangen (${new Date().toLocaleTimeString("de-DE")}).`, false);
}

function applyRemoteState(remoteState) {
  const sanitized = sanitizeState(remoteState);
  if (!sanitized) {
    return;
  }

  cloudSync.applyingRemoteState = true;
  try {
    state = sanitized;
    saveState({ skipCloud: true });
    renderNameInputs(state.configured ? state.playerCount : getSelectedPlayerCount());
    render();
  } finally {
    cloudSync.applyingRemoteState = false;
  }
}

function scheduleCloudPush() {
  if (!cloudSync.connected || !cloudSync.client || cloudSync.applyingRemoteState) {
    return;
  }

  if (cloudSync.pushTimer) {
    clearTimeout(cloudSync.pushTimer);
  }

  cloudSync.pushTimer = setTimeout(() => {
    pushStateToCloud().catch((error) => {
      console.error("Cloud-Sync speichern fehlgeschlagen:", error);
      setCloudStatus(`Cloud-Sync Fehler: ${String(error?.message || error)}`, true);
    });
  }, CLOUD_SYNC_DEBOUNCE_MS);
}

async function pushStateToCloud() {
  if (!cloudSync.connected || !cloudSync.client || cloudSync.applyingRemoteState) {
    return;
  }

  const { error } = await cloudSync.client.from(CLOUD_TABLE_NAME).upsert(
    {
      room_code: cloudSync.settings.roomCode,
      state_json: state,
      updated_by: cloudSync.clientId,
    },
    { onConflict: "room_code" },
  );

  if (error) {
    throw error;
  }

  setCloudStatus(`Verbunden. Letzter Sync: ${new Date().toLocaleTimeString("de-DE")}.`, false);
}

function createFreshState() {
  return {
    configured: false,
    playerCount: 2,
    players: [],
    runs: [],
    currentRunId: null,
    viewingRunId: null,
  };
}

function getSelectedPlayerCount() {
  const checked = document.querySelector("input[name='playerCount']:checked");
  return checked ? Number(checked.value) : 2;
}

function renderNameInputs(count) {
  nameInputs.innerHTML = "";

  for (let i = 0; i < count; i += 1) {
    const label = document.createElement("label");
    label.innerHTML = `
      Spieler ${i + 1} Name
      <input type="text" data-player-name="${i}" placeholder="Spieler ${i + 1}" />
    `;
    nameInputs.appendChild(label);
  }

  if (state.configured && state.players.length === count) {
    nameInputs.querySelectorAll("input[data-player-name]").forEach((input, index) => {
      input.value = state.players[index].name;
    });
  }
}

function startChallenge() {
  const playerCount = getSelectedPlayerCount();
  const names = [...nameInputs.querySelectorAll("input[data-player-name]")].map((input, index) => {
    return input.value.trim() || `Spieler ${index + 1}`;
  });

  state = {
    configured: true,
    playerCount,
    players: names.map((name) => ({ name, kills: 0, lostRuns: 0 })),
    runs: [createRun(1, playerCount)],
    currentRunId: 1,
    viewingRunId: 1,
  };

  saveState();
  render();
}

function createRun(id, playerCount) {
  return {
    id,
    capturedLinks: [],
    nextLinkId: 1,
  };
}

function startNextRun() {
  if (!state.configured) {
    return;
  }

  const nextId = state.runs.reduce((max, run) => Math.max(max, run.id), 0) + 1;
  state.runs.push(createRun(nextId, state.playerCount));
  state.currentRunId = nextId;
  state.viewingRunId = nextId;

  saveState();
  render();
}

function resetChallenge() {
  if (!window.confirm("Willst du wirklich die komplette Challenge zuruecksetzen?")) {
    return;
  }

  state = createFreshState();
  saveState();

  const twoPlayerRadio = document.querySelector("input[name='playerCount'][value='2']");
  if (twoPlayerRadio) {
    twoPlayerRadio.checked = true;
  }

  renderNameInputs(2);
  render();
}

function addLinkToCurrentRun() {
  if (!isViewingCurrentRun()) {
    return;
  }

  const run = getCurrentRun();
  if (!run) {
    return;
  }

  const linkInputs = getLinkInputs();
  if (linkInputs.length !== state.playerCount) {
    return;
  }

  const members = [];
  for (let i = 0; i < linkInputs.length; i += 1) {
    const rawName = linkInputs[i].value.trim();
    if (!rawName) {
      setInputHint(`Bitte fuer ${state.players[i].name} ein Pokemon eingeben.`, true);
      return;
    }

    const resolved = resolvePokemonNameStrict(rawName);
    if (!resolved.ok) {
      setInputHint(`${state.players[i].name}: ${resolved.error}`, true);
      return;
    }

    members.push(resolved.name);
  }

  const linkKey = members.map((name) => normalizePokemonName(name)).join("|");
  const alreadyExists = run.capturedLinks.some(
    (link) => link.members.map((name) => normalizePokemonName(name)).join("|") === linkKey,
  );
  if (alreadyExists) {
    setInputHint("Dieser Link ist in diesem Run schon vorhanden.", true);
    return;
  }

  const nextId = Number(run.nextLinkId || 1);
  run.capturedLinks.push({
    id: nextId,
    order: nextId,
    members,
    active: false,
  });
  run.nextLinkId = nextId + 1;

  clearLinkInputs();
  clearInputHint();

  saveState();
  renderRunControls();
  renderFoundPokemon();
}

function toggleLinkActiveInCurrentRun(linkId) {
  const run = getCurrentRun();
  if (!run) {
    return;
  }

  const link = run.capturedLinks.find((entry) => Number(entry.id) === Number(linkId));
  if (!link) {
    return;
  }

  if (!link.active) {
    const activeCount = run.capturedLinks.filter((entry) => entry.active).length;
    if (activeCount >= 6) {
      setInputHint("Es koennen maximal 6 Links gleichzeitig aktiv sein.", true);
      return;
    }
  }

  link.active = !link.active;
  clearInputHint();
  saveState();
  renderFoundPokemon();
}

function deleteLinkFromCurrentRun(linkId) {
  const run = getCurrentRun();
  if (!run || !Array.isArray(run.capturedLinks)) {
    return;
  }

  const link = run.capturedLinks.find((entry) => Number(entry.id) === Number(linkId));
  if (!link) {
    return;
  }

  const linkLabel = Number(link.order || link.id);
  const confirmed = window.confirm(`Willst du Link #${linkLabel} wirklich loeschen?`);
  if (!confirmed) {
    return;
  }

  run.capturedLinks = run.capturedLinks.filter((entry) => Number(entry.id) !== Number(linkId));
  clearInputHint();
  saveState();
  renderFoundPokemon();
}

function getRunById(id) {
  return state.runs.find((run) => run.id === id) || null;
}

function getCurrentRun() {
  return getRunById(state.currentRunId);
}

function getViewingRun() {
  return getRunById(state.viewingRunId);
}

function isViewingCurrentRun() {
  return state.viewingRunId === state.currentRunId;
}

function render() {
  if (!state.configured) {
    setupView.classList.remove("hidden");
    appView.classList.add("hidden");
    return;
  }

  setupView.classList.add("hidden");
  appView.classList.remove("hidden");

  renderLinkEntryInputs();
  renderRunControls();
  renderFoundPokemon();
  renderPlayerCounters();
  renderTypeAnalysisFromQuery(analysisInput.value);
}

function renderRunControls() {
  const viewingCurrent = isViewingCurrentRun();
  runTitle.textContent = `Aktueller Run: #${state.currentRunId}`;

  if (viewingCurrent) {
    runHint.textContent = "Du bearbeitest den aktuellen Run.";
    runHint.classList.remove("note");
  } else {
    runHint.textContent = `Du siehst Run #${state.viewingRunId}. Dieser Run ist nur zur Ansicht.`;
    runHint.classList.add("note");
  }

  runSelect.innerHTML = "";
  state.runs
    .slice()
    .sort((a, b) => a.id - b.id)
    .forEach((run) => {
      const option = document.createElement("option");
      const suffix = run.id === state.currentRunId ? " (aktuell)" : "";
      option.value = String(run.id);
      option.textContent = `Run #${run.id}${suffix} - ${run.capturedLinks.length} Links`;
      option.selected = run.id === state.viewingRunId;
      runSelect.appendChild(option);
    });

  addLinkBtn.disabled = !viewingCurrent;
  getLinkInputs().forEach((input) => {
    input.disabled = !viewingCurrent;
  });

  if (!viewingCurrent) {
    hideAllLinkSuggestions();
  }
}

function renderFoundPokemon() {
  const run = getViewingRun();
  if (!run) {
    foundPokemonList.innerHTML = "";
    return;
  }

  const links = Array.isArray(run.capturedLinks) ? run.capturedLinks : [];
  if (links.length === 0) {
    foundPokemonList.innerHTML = "<li>Noch keine Links fuer diesen Run eingetragen.</li>";
    return;
  }

  const viewingCurrent = isViewingCurrentRun();
  const sortedLinks = links
    .slice()
    .sort((a, b) => {
      if (a.active !== b.active) {
        return a.active ? -1 : 1;
      }
      return Number(a.order || 0) - Number(b.order || 0);
    });

  foundPokemonList.innerHTML = sortedLinks
    .map((link) => {
      const disabled = viewingCurrent ? "" : "disabled";
      const statusLabel = link.active ? "Aktiv" : "Inaktiv";

      return `
        <li class="${link.active ? "active-link" : ""}">
          <div class="pokemon-main">
            <div class="link-head-row">
              <span class="suggestion-name">Link #${Number(link.order || link.id)}</span>
              <span class="link-chip">${statusLabel}</span>
            </div>
            ${renderLinkMembers(link.members)}
          </div>
          <div class="link-controls">
            <button class="toggle-active-btn ${link.active ? "is-on" : "is-off"}" data-toggle-link="${Number(link.id)}" ${disabled}>
              ${link.active ? "Deaktivieren" : "Aktivieren"}
            </button>
            <button class="delete-link-btn" data-delete-link="${Number(link.id)}" ${disabled}>
              Loeschen
            </button>
          </div>
        </li>
      `;
    })
    .join("");
}

function renderLinkEntryInputs() {
  if (!state.configured) {
    linkEntryInputs.innerHTML = "";
    hideAllLinkSuggestions();
    return;
  }

  const viewingCurrent = isViewingCurrentRun();
  linkEntryInputs.innerHTML = state.players
    .map((player, index) => {
      return `
        <label>
          ${escapeHtml(player.name)}
          <div class="search-wrap" data-link-search-wrap="1">
            <input
              type="text"
              data-link-input="${index}"
              placeholder="${escapeHtml(player.name)} Pokemon"
              autocomplete="off"
              ${viewingCurrent ? "" : "disabled"}
            />
            <div class="suggestion-list hidden" data-link-suggestions="${index}"></div>
          </div>
        </label>
      `;
    })
    .join("");

  hideAllLinkSuggestions();
}

function getLinkInputs() {
  return [...linkEntryInputs.querySelectorAll("input[data-link-input]")];
}

function clearLinkInputs() {
  getLinkInputs().forEach((input) => {
    input.value = "";
  });
  hideAllLinkSuggestions();
}

function getLinkInputByIndex(index) {
  return linkEntryInputs.querySelector(`input[data-link-input="${Number(index)}"]`);
}

function getLinkSuggestionBox(index) {
  return linkEntryInputs.querySelector(`[data-link-suggestions="${Number(index)}"]`);
}

function updateLinkSuggestionsForInput(input) {
  const inputIndex = Number(input.dataset.linkInput);
  const query = String(input.value || "").trim();
  const suggestionBox = getLinkSuggestionBox(inputIndex);
  if (!suggestionBox) {
    return;
  }

  if (!query || pokemonDb.length === 0 || input.disabled) {
    hideLinkSuggestionsForInput(inputIndex);
    return;
  }

  const matches = searchPokemon(query, 8);
  if (matches.length === 0) {
    hideLinkSuggestionsForInput(inputIndex);
    return;
  }

  linkSuggestionsByInput.set(inputIndex, matches);
  suggestionBox.innerHTML = matches
    .map((entry) => {
      return `
        <button
          type="button"
          class="suggestion-item"
          data-link-suggest-id="${entry.id}"
          data-link-suggest-input="${inputIndex}"
        >
          <span class="suggestion-name">${escapeHtml(entry.displayName)}</span>
          <span class="type-row">${renderTypeBadges(entry.types)}</span>
        </button>
      `;
    })
    .join("");

  suggestionBox.classList.remove("hidden");
}

function hideLinkSuggestionsForInput(inputIndex) {
  linkSuggestionsByInput.delete(Number(inputIndex));
  const suggestionBox = getLinkSuggestionBox(inputIndex);
  if (!suggestionBox) {
    return;
  }

  suggestionBox.innerHTML = "";
  suggestionBox.classList.add("hidden");
}

function hideAllLinkSuggestions() {
  linkSuggestionsByInput.clear();
  linkEntryInputs.querySelectorAll("[data-link-suggestions]").forEach((box) => {
    box.innerHTML = "";
    box.classList.add("hidden");
  });
}

function applyFirstLinkSuggestionIfAvailable(input) {
  const inputIndex = Number(input.dataset.linkInput);
  const suggestions = linkSuggestionsByInput.get(inputIndex);
  if (!suggestions || suggestions.length === 0) {
    return false;
  }

  input.value = suggestions[0].displayName;
  hideLinkSuggestionsForInput(inputIndex);
  return true;
}

function resolvePokemonNameStrict(rawName) {
  const exact = resolvePokemonEntry(rawName);
  if (exact) {
    return { ok: true, name: exact.displayName };
  }

  if (pokemonDb.length === 0) {
    return { ok: true, name: rawName };
  }

  const suggestions = searchPokemon(rawName, 6);
  if (suggestions.length === 1) {
    return { ok: true, name: suggestions[0].displayName };
  }

  return {
    ok: false,
    error: "Kein exakter Treffer in der Datenbank (bitte Namen genauer eingeben).",
  };
}

function renderLinkMembers(members) {
  if (!Array.isArray(members) || members.length === 0) {
    return '<span class="muted">Kein Inhalt</span>';
  }

  const membersHtml = members
    .map((name, index) => {
      const displayName = String(name || "").trim() || `Spieler ${index + 1}`;
      const types = getTypesByStoredName(displayName);
      const owner = state.players[index]?.name || `Spieler ${index + 1}`;

      return `
        <article class="link-member-card">
          <span class="link-member-inline-name">
            <span class="link-owner-name">${escapeHtml(owner)}:</span>
            <span class="link-pokemon-name">${escapeHtml(getDisplayNameByStoredName(displayName))}</span>
          </span>
          <div class="type-row type-row-compact">${renderTypeBadges(types)}</div>
        </article>
      `;
    })
    .join("");

  return `<div class="link-members-row">${membersHtml}</div>`;
}

function renderPlayerCounters() {
  playerCounters.innerHTML = state.players
    .map((player, index) => {
      return `
        <article class="counter-card">
          <h4>${escapeHtml(player.name)}</h4>

          <div class="counter-row">
            <span>Getoetete Pokemon</span>
            <div class="counter-controls">
              <button data-player="${index}" data-field="kills" data-delta="-1">-</button>
              <span class="counter-value">${Number(player.kills || 0)}</span>
              <button data-player="${index}" data-field="kills" data-delta="1">+</button>
            </div>
          </div>

          <div class="counter-row">
            <span>Verlorene Runs</span>
            <div class="counter-controls">
              <button data-player="${index}" data-field="lostRuns" data-delta="-1">-</button>
              <span class="counter-value">${Number(player.lostRuns || 0)}</span>
              <button data-player="${index}" data-field="lostRuns" data-delta="1">+</button>
            </div>
          </div>
        </article>
      `;
    })
    .join("");
}

function updateAnalysisSuggestions(query) {
  const trimmed = String(query || "").trim();

  if (!trimmed || pokemonDb.length === 0) {
    hideAnalysisSuggestions();
    return;
  }

  activeAnalysisSuggestions = searchPokemon(trimmed, 8);
  if (activeAnalysisSuggestions.length === 0) {
    hideAnalysisSuggestions();
    return;
  }

  analysisSuggestions.innerHTML = activeAnalysisSuggestions
    .map((entry) => {
      return `
        <button type="button" class="suggestion-item" data-id="${entry.id}">
          <span class="suggestion-name">${escapeHtml(entry.displayName)}</span>
          <span class="type-row">${renderTypeBadges(entry.types)}</span>
        </button>
      `;
    })
    .join("");

  analysisSuggestions.classList.remove("hidden");
}

function hideAnalysisSuggestions() {
  activeAnalysisSuggestions = [];
  analysisSuggestions.innerHTML = "";
  analysisSuggestions.classList.add("hidden");
}

function isAnalysisSuggestionsVisible() {
  return !analysisSuggestions.classList.contains("hidden");
}

function setInputHint(message, isError) {
  inputHint.textContent = message;
  inputHint.classList.toggle("hint-error", Boolean(isError));
}

function clearInputHint() {
  setInputHint("", false);
}

function renderTypeAnalysisFromQuery(query) {
  const trimmed = String(query || "").trim();

  if (!trimmed) {
    analysisHint.textContent = "";
    analysisHint.classList.remove("hint-error");
    analysisResult.className = "analysis-empty";
    analysisResult.textContent = "Noch kein Pokemon ausgewaehlt.";
    return;
  }

  const entry = resolvePokemonEntry(trimmed);
  if (entry) {
    renderTypeAnalysisForPokemon(entry);
    return;
  }

  if (pokemonDb.length === 0) {
    analysisHint.textContent = "Datenbank wird noch geladen...";
    analysisHint.classList.remove("hint-error");
    analysisResult.className = "analysis-empty";
    analysisResult.textContent = "Noch kein Pokemon ausgewaehlt.";
    return;
  }

  const matches = searchPokemon(trimmed, 8);
  if (matches.length === 0) {
    analysisHint.textContent = "Kein Pokemon gefunden.";
    analysisHint.classList.add("hint-error");
    analysisResult.className = "analysis-empty";
    analysisResult.textContent = "Bitte einen gueltigen Pokemon-Namen eingeben.";
    return;
  }

  analysisHint.textContent = `Meintest du ${matches[0].displayName}?`;
  analysisHint.classList.remove("hint-error");
  renderTypeAnalysisForPokemon(matches[0]);
}

function renderTypeAnalysisForPokemon(entry) {
  const defensive = calculateDefensiveProfile(entry.types);
  const offensive = calculateOffensiveProfile(entry.types);

  analysisHint.textContent = "";
  analysisHint.classList.remove("hint-error");
  analysisResult.className = "analysis-card";
  analysisResult.innerHTML = `
    <div class="analysis-title">
      <strong>${escapeHtml(entry.displayName)}</strong>
      <div class="type-row">${renderTypeBadges(entry.types)}</div>
    </div>
    <div class="analysis-grid">
      <article class="analysis-column">
        <h4>Defensiv</h4>
        ${renderAnalysisGroup("4x Schwaechen", defensive.veryWeak)}
        ${renderAnalysisGroup("2x Schwaechen", defensive.weak)}
        ${renderAnalysisGroup("0.5x Resistenzen", defensive.resist)}
        ${renderAnalysisGroup("0.25x Resistenzen", defensive.strongResist)}
        ${renderAnalysisGroup("Immunitaeten", defensive.immune)}
      </article>
      <article class="analysis-column">
        <h4>Offensiv (mit STAB-Typen)</h4>
        ${renderAnalysisGroup("Sehr effektiv", offensive.strong)}
        ${renderAnalysisGroup("Nicht sehr effektiv", offensive.weak)}
        ${renderAnalysisGroup("Keine Wirkung", offensive.noEffect)}
      </article>
    </div>
  `;
}

function renderAnalysisGroup(label, types) {
  const badges =
    types.length > 0
      ? renderTypeBadges(types.map((type) => getTypeLabel(type)))
      : '<span class="type-badge type-unbekannt">Keine</span>';

  return `
    <div class="analysis-group">
      <p class="analysis-label">${escapeHtml(label)}</p>
      <div class="type-row">${badges}</div>
    </div>
  `;
}

function calculateDefensiveProfile(defendingTypes) {
  const profile = {
    veryWeak: [],
    weak: [],
    resist: [],
    strongResist: [],
    immune: [],
  };

  TYPE_ORDER.forEach((attackingType) => {
    const multiplier = getTypeMultiplier(attackingType, defendingTypes);

    if (multiplier === 0) {
      profile.immune.push(attackingType);
      return;
    }

    if (multiplier >= 4) {
      profile.veryWeak.push(attackingType);
      return;
    }

    if (multiplier >= 2) {
      profile.weak.push(attackingType);
      return;
    }

    if (multiplier <= 0.25) {
      profile.strongResist.push(attackingType);
      return;
    }

    if (multiplier <= 0.5) {
      profile.resist.push(attackingType);
    }
  });

  return profile;
}

function calculateOffensiveProfile(attackingTypes) {
  const profile = {
    strong: [],
    weak: [],
    noEffect: [],
  };

  TYPE_ORDER.forEach((defendingType) => {
    const bestMultiplier = attackingTypes.reduce((best, attackingType) => {
      const multiplier = getTypeMultiplier(attackingType, [defendingType]);
      return Math.max(best, multiplier);
    }, 0);

    if (bestMultiplier === 0) {
      profile.noEffect.push(defendingType);
      return;
    }

    if (bestMultiplier >= 2) {
      profile.strong.push(defendingType);
      return;
    }

    if (bestMultiplier <= 0.5) {
      profile.weak.push(defendingType);
    }
  });

  return profile;
}

function getTypeMultiplier(attackingType, defendingTypes) {
  return defendingTypes.reduce((multiplier, defendingType) => {
    const attackMap = TYPE_CHART[attackingType] || {};
    const current = attackMap[defendingType];
    return multiplier * (typeof current === "number" ? current : 1);
  }, 1);
}

function getTypeLabel(type) {
  return TYPE_LABEL[type] || type;
}

function saveState(options = {}) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));

  if (!options.skipCloud) {
    scheduleCloudPush();
  }
}

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw);
    return sanitizeState(parsed);
  } catch {
    return null;
  }
}

function sanitizeState(parsed) {
  if (!parsed || typeof parsed !== "object") {
    return null;
  }

  if (!parsed.configured) {
    return createFreshState();
  }

  const playerCount = Number(parsed.playerCount);
  if (![2, 3].includes(playerCount)) {
    return null;
  }

  if (!Array.isArray(parsed.players) || parsed.players.length !== playerCount) {
    return null;
  }

  if (!Array.isArray(parsed.runs) || parsed.runs.length === 0) {
    return null;
  }

  const runs = parsed.runs.map((run, index) => sanitizeRun(run, index + 1, playerCount)).filter(Boolean);
  if (runs.length === 0) {
    return null;
  }

  const currentRunId = Number(parsed.currentRunId) || runs[runs.length - 1].id;
  const viewingRunId = Number(parsed.viewingRunId) || currentRunId;
  const currentExists = runs.some((run) => run.id === currentRunId);
  const viewingExists = runs.some((run) => run.id === viewingRunId);

  return {
    configured: true,
    playerCount,
    players: parsed.players.map((player, index) => ({
      name: String(player.name || `Spieler ${index + 1}`),
      kills: Math.max(0, Number(player.kills || 0)),
      lostRuns: Math.max(0, Number(player.lostRuns || 0)),
    })),
    runs,
    currentRunId: currentExists ? currentRunId : runs[runs.length - 1].id,
    viewingRunId: viewingExists ? viewingRunId : currentExists ? currentRunId : runs[runs.length - 1].id,
  };
}

function loadCloudSettings() {
  const fallback = {
    url: "",
    anonKey: "",
    roomCode: "",
    autoConnect: false,
  };

  const raw = localStorage.getItem(CLOUD_SETTINGS_KEY);
  if (!raw) {
    return fallback;
  }

  try {
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") {
      return fallback;
    }

    return {
      url: String(parsed.url || "").trim(),
      anonKey: String(parsed.anonKey || "").trim(),
      roomCode: normalizeRoomCode(parsed.roomCode),
      autoConnect: Boolean(parsed.autoConnect),
    };
  } catch {
    return fallback;
  }
}

function saveCloudSettings(settings) {
  try {
    localStorage.setItem(
      CLOUD_SETTINGS_KEY,
      JSON.stringify({
        url: String(settings?.url || "").trim(),
        anonKey: String(settings?.anonKey || "").trim(),
        roomCode: normalizeRoomCode(settings?.roomCode || ""),
        autoConnect: Boolean(settings?.autoConnect),
      }),
    );
  } catch {
    // ignore
  }
}

function getOrCreateCloudClientId() {
  const existing = String(localStorage.getItem(CLOUD_CLIENT_ID_KEY) || "").trim();
  if (existing) {
    return existing;
  }

  const generated =
    typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
      ? crypto.randomUUID()
      : `client-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;

  localStorage.setItem(CLOUD_CLIENT_ID_KEY, generated);
  return generated;
}

function normalizeRoomCode(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, "-")
    .replace(/-{2,}/g, "-")
    .replace(/^[-_]+/, "")
    .replace(/[-_]+$/, "");
}

function sanitizeRun(run, fallbackId, playerCount) {
  if (!run || typeof run !== "object") {
    return null;
  }

  const id = Number(run.id) || fallbackId;
  let capturedLinks = [];

  if (Array.isArray(run.capturedLinks)) {
    capturedLinks = run.capturedLinks
      .map((entry, index) => sanitizeCapturedLink(entry, index + 1, playerCount))
      .filter(Boolean);
  } else if (Array.isArray(run.links)) {
    capturedLinks = run.links
      .map((row, index) => {
        const members = Array.isArray(row)
          ? row.map((name) => String(name || "").trim()).slice(0, playerCount)
          : [];
        const hasAny = members.some(Boolean);
        if (!hasAny) {
          return null;
        }

        while (members.length < playerCount) {
          members.push("");
        }

        return {
          id: index + 1,
          order: index + 1,
          members,
          active: members.every(Boolean),
        };
      })
      .filter(Boolean);
  }

  if (capturedLinks.length === 0 && Array.isArray(run.foundPokemon)) {
    capturedLinks = run.foundPokemon
      .map((entry, index) => {
        const name = getStoredPokemonName(entry);
        if (!String(name || "").trim()) {
          return null;
        }

        const members = [String(name).trim()];
        while (members.length < playerCount) {
          members.push("");
        }

        return {
          id: index + 1,
          order: index + 1,
          members,
          active: false,
        };
      })
      .filter(Boolean);
  }

  const maxId = capturedLinks.reduce((max, link) => Math.max(max, Number(link.id) || 0), 0);
  const nextLinkId = Math.max(Number(run.nextLinkId) || 1, maxId + 1);

  return { id, capturedLinks, nextLinkId };
}

function sanitizeCapturedLink(link, fallbackId, playerCount) {
  if (!link || typeof link !== "object") {
    return null;
  }

  const id = Number(link.id) || fallbackId;
  const order = Number(link.order) || id;

  const members = Array.isArray(link.members)
    ? link.members.map((name) => String(name || "").trim()).slice(0, playerCount)
    : [];

  while (members.length < playerCount) {
    members.push("");
  }

  if (!members.some(Boolean)) {
    return null;
  }

  return {
    id,
    order,
    members,
    active: Boolean(link.active),
  };
}
async function loadPokemonDatabase() {
  setDbStatus("Pokemon-Datenbank wird geladen...", false);

  const cached = loadPokemonDbCache();
  if (cached.length > 0) {
    applyPokemonDatabase(cached);
    setDbStatus(`Pokemon-Datenbank aktiv (${pokemonDb.length} Pokemon).`, false);
    renderFoundPokemon();
    renderTypeAnalysisFromQuery(analysisInput.value);
    return;
  }

  try {
    const fetched = await fetchPokemonDatabase();
    applyPokemonDatabase(fetched);
    savePokemonDbCache(fetched);

    setDbStatus(`Pokemon-Datenbank aktiv (${pokemonDb.length} Pokemon).`, false);
    renderFoundPokemon();
    renderTypeAnalysisFromQuery(analysisInput.value);
  } catch (error) {
    console.error("Pokemon-Datenbank konnte nicht geladen werden:", error);
    setDbStatus("Pokemon-Datenbank konnte nicht geladen werden. Du kannst weiter manuell eintragen.", true);
  }
}

function setDbStatus(message, isError) {
  dbStatus.textContent = message;
  dbStatus.classList.toggle("hint-error", Boolean(isError));
}

function loadPokemonDbCache() {
  const raw = localStorage.getItem(DB_CACHE_KEY);
  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw);
    if (!parsed || parsed.version !== DB_CACHE_VERSION || !Array.isArray(parsed.data)) {
      return [];
    }

    return parsed.data;
  } catch {
    return [];
  }
}

function savePokemonDbCache(entries) {
  try {
    localStorage.setItem(
      DB_CACHE_KEY,
      JSON.stringify({
        version: DB_CACHE_VERSION,
        createdAt: Date.now(),
        data: entries,
      }),
    );
  } catch {
    // ignore
  }
}

function applyPokemonDatabase(entries) {
  pokemonDb = entries
    .map((entry) => normalizePokemonEntry(entry))
    .filter(Boolean)
    .sort((a, b) => a.id - b.id);

  pokemonById = new Map();
  pokemonAliasLookup = new Map();

  pokemonDb.forEach((entry) => {
    pokemonById.set(entry.id, entry);

    entry.searchKeys.forEach((key) => {
      const current = pokemonAliasLookup.get(key);
      if (!current || entry.id < current.id) {
        pokemonAliasLookup.set(key, entry);
      }
    });
  });
}

function normalizePokemonEntry(entry) {
  if (!entry || typeof entry !== "object") {
    return null;
  }

  const id = Number(entry.id);
  if (!Number.isFinite(id) || id <= 0 || id > POKEDEX_MAX_ID) {
    return null;
  }

  const displayName = String(entry.displayName || entry.name || "").trim();
  if (!displayName) {
    return null;
  }

  const englishName = String(entry.englishName || "").trim();
  const types = Array.isArray(entry.types)
    ? entry.types.map((type) => String(type || "").trim()).filter(Boolean)
    : [];

  const aliases = Array.isArray(entry.aliases)
    ? entry.aliases.map((alias) => String(alias || "").trim()).filter(Boolean)
    : [];

  const searchNames = uniqueNames([
    displayName,
    englishName,
    ...aliases,
    displayName.replaceAll("♀", "F"),
    displayName.replaceAll("♂", "M"),
  ]);

  return {
    id,
    displayName,
    englishName,
    types,
    searchKeys: uniqueNames(searchNames.map((name) => normalizePokemonName(name))).filter(Boolean),
  };
}

function searchPokemon(query, limit = 8) {
  const normalizedQuery = normalizePokemonName(query);
  if (!normalizedQuery) {
    return [];
  }

  const matches = [];

  pokemonDb.forEach((entry) => {
    let score = Number.POSITIVE_INFINITY;

    for (const key of entry.searchKeys) {
      if (key === normalizedQuery) {
        score = 0;
        break;
      }

      if (key.startsWith(normalizedQuery)) {
        score = Math.min(score, 1);
        continue;
      }

      if (key.includes(normalizedQuery)) {
        score = Math.min(score, 2);
      }
    }

    if (Number.isFinite(score)) {
      matches.push({ entry, score });
    }
  });

  return matches
    .sort((a, b) => (a.score !== b.score ? a.score - b.score : a.entry.id - b.entry.id))
    .slice(0, limit)
    .map((item) => item.entry);
}

function resolvePokemonEntry(query) {
  const normalizedQuery = normalizePokemonName(query);
  if (!normalizedQuery || pokemonAliasLookup.size === 0) {
    return null;
  }

  return pokemonAliasLookup.get(normalizedQuery) || null;
}

function getPokemonEntryByAnyName(name) {
  const normalized = normalizePokemonName(name);
  if (!normalized || pokemonAliasLookup.size === 0) {
    return null;
  }

  return pokemonAliasLookup.get(normalized) || null;
}

function getDisplayNameByStoredName(name) {
  const info = getPokemonEntryByAnyName(name);
  return info ? info.displayName : name;
}

function getTypesByStoredName(name) {
  const info = getPokemonEntryByAnyName(name);
  return info ? info.types : [];
}

async function fetchPokemonDatabase() {
  const [languagesCsv, speciesCsv, speciesNamesCsv, pokemonCsv, pokemonTypesCsv] = await Promise.all([
    fetchCsv(`${POKEAPI_CSV_BASE}/languages.csv`),
    fetchCsv(`${POKEAPI_CSV_BASE}/pokemon_species.csv`),
    fetchCsv(`${POKEAPI_CSV_BASE}/pokemon_species_names.csv`),
    fetchCsv(`${POKEAPI_CSV_BASE}/pokemon.csv`),
    fetchCsv(`${POKEAPI_CSV_BASE}/pokemon_types.csv`),
  ]);

  const languageRows = parseCsvToObjects(languagesCsv);
  const speciesRows = parseCsvToObjects(speciesCsv);
  const speciesNameRows = parseCsvToObjects(speciesNamesCsv);
  const pokemonRows = parseCsvToObjects(pokemonCsv);
  const pokemonTypeRows = parseCsvToObjects(pokemonTypesCsv);

  const germanLanguageId = findLanguageId(languageRows, "de") || 6;
  const englishLanguageId = findLanguageId(languageRows, "en") || 9;

  const germanNamesBySpecies = new Map();
  const englishNamesBySpecies = new Map();

  speciesNameRows.forEach((row) => {
    const speciesId = Number(row.pokemon_species_id);
    if (!Number.isFinite(speciesId) || speciesId < 1 || speciesId > POKEDEX_MAX_ID) {
      return;
    }

    const languageId = Number(row.local_language_id);
    const localizedName = String(row.name || "").trim();
    if (!localizedName) {
      return;
    }

    if (languageId === germanLanguageId) {
      germanNamesBySpecies.set(speciesId, localizedName);
      return;
    }

    if (languageId === englishLanguageId) {
      englishNamesBySpecies.set(speciesId, localizedName);
    }
  });

  const defaultPokemonBySpecies = new Map();
  pokemonRows.forEach((row) => {
    if (Number(row.is_default) !== 1) {
      return;
    }

    const speciesId = Number(row.species_id);
    const pokemonId = Number(row.id);

    if (!Number.isFinite(speciesId) || speciesId < 1 || speciesId > POKEDEX_MAX_ID || !Number.isFinite(pokemonId)) {
      return;
    }

    if (!defaultPokemonBySpecies.has(speciesId)) {
      defaultPokemonBySpecies.set(speciesId, pokemonId);
    }
  });

  const typesByPokemonId = new Map();
  pokemonTypeRows.forEach((row) => {
    const pokemonId = Number(row.pokemon_id);
    const typeId = Number(row.type_id);
    const slot = Number(row.slot);

    if (!Number.isFinite(pokemonId) || !Number.isFinite(typeId)) {
      return;
    }

    const list = typesByPokemonId.get(pokemonId) || [];
    list.push({ typeId, slot: Number.isFinite(slot) ? slot : 99 });
    typesByPokemonId.set(pokemonId, list);
  });

  const baseSpeciesRows = speciesRows
    .map((row) => ({ id: Number(row.id), identifier: String(row.identifier || "").trim() }))
    .filter((row) => Number.isFinite(row.id) && row.id >= 1 && row.id <= POKEDEX_MAX_ID)
    .sort((a, b) => a.id - b.id);

  return baseSpeciesRows.map((species) => {
    const pokemonId = defaultPokemonBySpecies.get(species.id) || species.id;
    const typeList = (typesByPokemonId.get(pokemonId) || [])
      .slice()
      .sort((a, b) => a.slot - b.slot)
      .map((typeEntry) => TYPE_NAME_BY_ID[typeEntry.typeId])
      .filter(Boolean);

    const germanName = germanNamesBySpecies.get(species.id) || toDisplayIdentifier(species.identifier);
    const englishName = englishNamesBySpecies.get(species.id) || toDisplayIdentifier(species.identifier);

    return {
      id: species.id,
      displayName: germanName,
      englishName,
      types: typeList.length ? typeList : ["Unbekannt"],
      aliases: buildAliases(germanName, englishName, species.identifier),
    };
  });
}

async function fetchCsv(url) {
  const response = await fetch(url, { cache: "force-cache" });
  if (!response.ok) {
    throw new Error(`CSV konnte nicht geladen werden: ${url}`);
  }

  return response.text();
}

function findLanguageId(languageRows, identifier) {
  const row = languageRows.find((entry) => String(entry.identifier || "").trim() === identifier);
  return row ? Number(row.id) : null;
}

function buildAliases(germanName, englishName, identifier) {
  return uniqueNames([
    germanName,
    englishName,
    identifier,
    String(identifier || "").replaceAll("-", " "),
    String(identifier || "").replaceAll("-", ""),
    String(germanName || "").replaceAll("♀", "F"),
    String(germanName || "").replaceAll("♂", "M"),
  ]);
}
function uniqueNames(values) {
  const output = [];
  const seen = new Set();

  values.forEach((value) => {
    const text = String(value || "").trim();
    if (!text) {
      return;
    }

    const key = normalizePokemonName(text);
    if (!key || seen.has(key)) {
      return;
    }

    seen.add(key);
    output.push(text);
  });

  return output;
}

function toDisplayIdentifier(identifier) {
  return String(identifier || "")
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ")
    .trim();
}

function normalizePokemonName(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replaceAll("♀", "f")
    .replaceAll("♂", "m")
    .replaceAll("'", "")
    .replaceAll(".", "")
    .replaceAll(":", "")
    .replace(/[^a-z0-9]+/g, "")
    .trim();
}

function comparePokemonNames(a, b) {
  const nameA = getStoredPokemonName(a);
  const nameB = getStoredPokemonName(b);

  const infoA = getPokemonEntryByAnyName(nameA);
  const infoB = getPokemonEntryByAnyName(nameB);

  if (infoA && infoB && infoA.id !== infoB.id) {
    return infoA.id - infoB.id;
  }

  if (infoA && !infoB) {
    return -1;
  }

  if (!infoA && infoB) {
    return 1;
  }

  return String(nameA).localeCompare(String(nameB), "de");
}

function renderTypeBadges(types) {
  if (!Array.isArray(types) || types.length === 0) {
    return '<span class="type-badge type-unbekannt">Unbekannt</span>';
  }

  return types
    .map((type) => `<span class="type-badge type-${normalizeTypeKey(type)}">${escapeHtml(type)}</span>`)
    .join("");
}

function normalizeTypeKey(type) {
  const key = String(type || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "")
    .trim();

  if (key === "kafer") {
    return "kaefer";
  }

  return key || "unbekannt";
}

function getStoredPokemonName(value) {
  if (typeof value === "string") {
    return value;
  }

  if (value && typeof value === "object") {
    return String(value.name || value.displayName || "").trim();
  }

  return "";
}

function parseCsvToObjects(csvText) {
  const rows = parseCsvRows(csvText);
  if (rows.length === 0) {
    return [];
  }

  const headers = rows[0].map((header, index) => {
    return index === 0 ? String(header || "").replace(/^\uFEFF/, "") : String(header || "");
  });

  return rows.slice(1).map((row) => {
    const obj = {};

    headers.forEach((header, index) => {
      obj[header] = row[index] ?? "";
    });

    return obj;
  });
}

function parseCsvRows(csvText) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;

  const text = String(csvText || "");

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];

    if (char === '"') {
      const next = text[i + 1];
      if (inQuotes && next === '"') {
        field += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === "," && !inQuotes) {
      row.push(field);
      field = "";
      continue;
    }

    if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && text[i + 1] === "\n") {
        i += 1;
      }

      row.push(field);
      rows.push(row);
      row = [];
      field = "";
      continue;
    }

    field += char;
  }

  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }

  return rows;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function escapeHtmlAttr(value) {
  return escapeHtml(value).replaceAll("`", "&#96;");
}
