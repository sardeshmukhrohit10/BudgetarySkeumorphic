export const VARIANT = "Skeu";
export const SURVEY_URL = "https://forms.cloud.microsoft/r/6Dm8565Rzs";
export const OTHER_UI_BASE = "https://budgetary-neumorphic.vercel.app/dashboard";
const GS_ENDPOINT = "https://script.google.com/macros/s/AKfycbxNueYDhS4OXA4yak-nSQbJ85hs64_rHtPit-kc-1UoFqGMwQzigFD56hohrVrJu_Yx/exec";

function uuid() {
  if (crypto?.randomUUID) return crypto.randomUUID();
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
function nowIso() { return new Date().toISOString(); }

function detectDevice() {
  const uaData = navigator.userAgentData;
  if (uaData && typeof uaData.mobile === "boolean") {
    if (uaData.mobile) return "phone";
    const w = Math.min(window.innerWidth, window.innerHeight);
    if (w < 600) return "phone";
    if (w <= 1280) return "tablet";
    return "desktop";
  }
  const ua = navigator.userAgent;
  const isAndroid = /\bAndroid\b/i.test(ua);
  const isMobileToken = /\bMobi\b/i.test(ua) || /\bMobile\b/i.test(ua);
  if (isAndroid) return isMobileToken ? "phone" : "tablet";
  if (/iPhone|iPod|iPad/i.test(ua)) return "phone";
  const w = Math.min(window.innerWidth, window.innerHeight);
  if (w < 600) return "phone";
  if (w <= 1280) return "tablet";
  return "desktop";
}
function getDevice() { return detectDevice(); }

const PID_KEY = "ui_study_pid";
const RUN_KEY = "ui_study_run";

export function getPid() {
  const params = new URLSearchParams(window.location.search);
  let pid = params.get("pid");
  if (!pid) pid = localStorage.getItem(PID_KEY);
  if (!pid) { pid = uuid(); localStorage.setItem(PID_KEY, pid); }
  return pid;
}

export function getRunId() {
  const params = new URLSearchParams(window.location.search);
  let rid = params.get("rid");
  if (!rid) rid = localStorage.getItem(RUN_KEY);
  if (!rid) { rid = uuid(); localStorage.setItem(RUN_KEY, rid); }
  return rid;
}

const state = {
  run_id: null,
  pid: null,
  session: null,
  variant: null,
  ui_order: null,
  device: null,

  startHR: 0,
  start_ts: "",
  end_ts: "",
  duration_ms: 0,

  add_ok: 0, add_err: 0,
  edit_ok: 0, edit_err: 0,
  delete_ok: 0, delete_err: 0,

  total_errors: 0,
  notes: ""
};

function attachGlobalErrorHandlers() {
  window.addEventListener("error", () => { state.total_errors += 1; });
  window.addEventListener("unhandledrejection", () => { state.total_errors += 1; });
}

export function initStudy() {
  state.run_id  = getRunId();
  state.pid     = getPid();
  state.session = uuid();
  state.variant = VARIANT;
  const params = new URLSearchParams(window.location.search);
  state.ui_order = params.get("order") || "manual";
  state.device = getDevice();
  attachGlobalErrorHandlers();
}

export function startTask() {
  state.startHR = performance.now();
  state.start_ts = nowIso();
  state.end_ts = ""; state.duration_ms = 0;

  state.add_ok = state.add_err = 0;
  state.edit_ok = state.edit_err = 0;
  state.delete_ok = state.delete_err = 0;

  state.total_errors = 0; state.notes = "";
}

export function markEvent(type, note) {
  switch (type) {
    case "add_ok":    state.add_ok++; break;
    case "add_err":   state.add_err++; break;
    case "edit_ok":   state.edit_ok++; break;
    case "edit_err":  state.edit_err++; break;
    case "delete_ok": state.delete_ok++; break;
    case "delete_err":state.delete_err++; break;
    default: break;
  }
  if (note) state.notes = state.notes ? `${state.notes} | ${note}` : note;
}

export async function completeTask() {
  state.end_ts = nowIso();
  state.duration_ms = Math.round(performance.now() - state.startHR);

  const payload = {
    run_id: state.run_id,
    pid: state.pid, session: state.session, variant: state.variant,
    ui_order: state.ui_order, device: state.device,
    start_ts: state.start_ts, end_ts: state.end_ts, duration_ms: state.duration_ms,
    add_ok: state.add_ok, add_err: state.add_err,
    edit_ok: state.edit_ok, edit_err: state.edit_err,
    delete_ok: state.delete_ok, delete_err: state.delete_err,
    total_errors: state.total_errors,
    notes: state.notes,
    ua: navigator.userAgent,
    final: true
  };

  try {
    const body = JSON.stringify(payload);
    const blob = new Blob([body], { type: "text/plain;charset=UTF-8" });
    const sent = navigator.sendBeacon ? navigator.sendBeacon(GS_ENDPOINT, blob) : false;
    if (!sent) {
      await fetch(GS_ENDPOINT + "?t=" + Date.now(), {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=UTF-8" },
        body,
        mode: "no-cors",
        keepalive: true,
        cache: "no-store"
      });
    }
  } catch (e) {
    console.error("[study] completeTask failed", e);
  }
  return payload;
}

export async function checkpoint(tag = "switch") {
  const snap_end = nowIso();
  const snap_ms  = Math.round(performance.now() - state.startHR);

  const payload = {
    run_id: state.run_id,
    pid: state.pid, session: state.session, variant: state.variant,
    ui_order: state.ui_order, device: state.device,
    start_ts: state.start_ts, end_ts: snap_end, duration_ms: snap_ms,
    add_ok: state.add_ok, add_err: state.add_err,
    edit_ok: state.edit_ok, edit_err: state.edit_err,
    delete_ok: state.delete_ok, delete_err: state.delete_err,
    total_errors: state.total_errors,
    notes: state.notes,
    ua: navigator.userAgent,
    final: false,
    checkpoint: tag
  };

  try {
    const body = JSON.stringify(payload);
    const blob = new Blob([body], { type: "text/plain;charset=UTF-8" });
    const sent = navigator.sendBeacon ? navigator.sendBeacon(GS_ENDPOINT, blob) : false;
    if (!sent) {
      await fetch(GS_ENDPOINT + "?t=" + Date.now(), {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=UTF-8" },
        body,
        mode: "no-cors",
        keepalive: true,
        cache: "no-store"
      });
    }
  } catch (e) {
    console.error("[study] checkpoint failed", e);
  }
  return payload;
}

export function buildOtherUiUrl() {
  const params = new URLSearchParams(window.location.search);
  params.set("pid", state.pid || getPid());
  params.set("rid", state.run_id || getRunId());
  if (!params.get("order")) params.set("order", state.variant === "neo" ? "neo-first" : "skeuo-first");
  return `${OTHER_UI_BASE}?${params.toString()}`;
}

export function installCustomEventBridges() {
  window.addEventListener("study:add_ok",    () => markEvent("add_ok"));
  window.addEventListener("study:add_err",   () => markEvent("add_err"));
  window.addEventListener("study:edit_ok",   () => markEvent("edit_ok"));
  window.addEventListener("study:edit_err",  () => markEvent("edit_err"));
  window.addEventListener("study:delete_ok", () => markEvent("delete_ok"));
  window.addEventListener("study:delete_err",() => markEvent("delete_err"));
}