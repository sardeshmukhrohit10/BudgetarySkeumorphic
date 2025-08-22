import { useEffect, useState } from "react";
import { startTask, completeTask, buildOtherUiUrl, SURVEY_URL, VARIANT } from "../studylogger";

export default function TaskPanel() {
  const [elapsed, setElapsed] = useState(0);
  const [checks, setChecks] = useState({ add:false, edit:false, del:false });

  useEffect(() => {
    startTask();
    const id = setInterval(() => setElapsed((e)=>e+200), 200);

    const onAddOK   = () => setChecks(s => ({...s, add:true}));
    const onEditOK  = () => setChecks(s => ({...s, edit:true}));
    const onDelOK   = () => setChecks(s => ({...s, del:true}));

    window.addEventListener("study:add_ok", onAddOK);
    window.addEventListener("study:edit_ok", onEditOK);
    window.addEventListener("study:delete_ok", onDelOK);

    return () => {
      clearInterval(id);
      window.removeEventListener("study:add_ok", onAddOK);
      window.removeEventListener("study:edit_ok", onEditOK);
      window.removeEventListener("study:delete_ok", onDelOK);
    };
  }, []);

  const allDone = checks.add && checks.edit && checks.del;

  const finish = () => {
    completeTask();
    window.open(SURVEY_URL, "_blank", "noopener");
  };

  const openOther = () => {
    window.open(buildOtherUiUrl(), "_blank", "noopener");
  };

  return (
    <div style={{
      position:"fixed", right:16, bottom:16, zIndex:9999,
      background:"#fff", padding:"12px 16px", borderRadius:12,
      boxShadow:"0 8px 24px rgba(0,0,0,.15)", fontSize:"0.95rem"
    }}>
      <div style={{fontWeight:700, marginBottom:8}}>{VARIANT.toUpperCase()} — Tasks</div>
      <ol style={{margin:"0 0 8px 16px"}}>
        <li>{checks.add ? "✅" : "⬜"} Add 1 transactions</li>
        <li>{checks.edit ? "✅" : "⬜"} Edit 1 transaction</li>
        <li>{checks.del ? "✅" : "⬜"} Delete 1 transaction</li>
      </ol>
      <div style={{margin:"6px 0 10px"}}>Time: {(elapsed/1000).toFixed(1)}s</div>
      <div style={{display:"flex", gap:8, alignItems:"center", flexWrap:"wrap"}}>
        <button
          onClick={finish}
          disabled={!allDone}
          style={{
            opacity: allDone?1:0.6, cursor: allDone?"pointer":"not-allowed",
            background:"#635bff", color:"#fff", border:"none", padding:"8px 12px",
            fontWeight:700, borderRadius:10
          }}
        >
          Done → Open Survey
        </button>
        <button
          onClick={openOther}
          style={{background:"#f3f4f6", border:"1px solid #e5e7eb", padding:"8px 12px", borderRadius:10, fontWeight:600}}
          title="Go to the other UI (keeps your code)"
        >
          Other UI
        </button>
      </div>
    </div>
  );
}
