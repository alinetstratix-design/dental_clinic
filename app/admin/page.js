"use client";
import { useEffect, useState } from "react";
import base from "../../config/site.json";
const F = [["clinicName","Clinic ka naam"],["city","Sheher"],["tagline","Tagline"],["heroTitle","Hero headline"],["heroSub","Hero subtext"],["doctorName","Doctor ka naam"],["doctorDegree","Degree / speciality"],["experience","Anubhav (saal)"],["rating","Google rating"],["reviews","Reviews count"],["phone","Call number (10 digit)"],["whatsapp","WhatsApp (91XXXXXXXXXX)"],["address","Address"],["hours","Timings"],["mapUrl","Google Maps link"],["brandColor","Brand color (hex)"],["webhookUrl","Leads webhook URL (Apps Script)"]];
const toLines = (a, k1, k2) => a.map((x) => `${x[k1]} | ${x[k2]}`).join("\n");
const fromLines = (s, k1, k2) => s.split("\n").filter((l) => l.trim()).map((l) => { const [a, ...b] = l.split("|"); return { [k1]: a.trim(), [k2]: b.join("|").trim() }; });
export default function Admin() {
  const [c, setC] = useState(base);
  const [rows, setRows] = useState(null);
  useEffect(() => { try { const s = localStorage.getItem("cfg"); if (s) setC(JSON.parse(s)); } catch {} }, []);
  const upd = (n) => { setC(n); try { localStorage.setItem("cfg", JSON.stringify(n)); } catch {} };
  function logo(e) {
    const f = e.target.files[0]; if (!f) return;
    const img = new Image(); img.onload = () => {
      const k = Math.min(1, 320 / img.width), cv = document.createElement("canvas");
      cv.width = img.width * k; cv.height = img.height * k; cv.getContext("2d").drawImage(img, 0, 0, cv.width, cv.height);
      upd({ ...c, logo: cv.toDataURL("image/png") });
    }; img.src = URL.createObjectURL(f);
  }
  function download() {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([JSON.stringify(c, null, 2)], { type: "application/json" }));
    a.download = "site.json"; a.click();
  }
  function imp(e) { const f = e.target.files[0]; if (f) f.text().then((t) => upd(JSON.parse(t))); }
  async function loadLeads() { try { setRows((await (await fetch(c.webhookUrl)).json()).slice(1).reverse()); } catch { alert("Leads load nahi hui. Webhook URL aur 'Anyone' access check karo."); } }
  return (
    <div className="admin">
      <div className="row"><h1>Clinic Site Admin</h1><span className="brand">{c.logo ? <img src={c.logo} alt="" /> : <span className="badge" style={{ background: c.brandColor }}>{c.clinicName[0]}</span>}<b>{c.clinicName}</b></span></div>
      <p className="muted">Details bharo, "site.json download" dabao, file ko config/site.json se replace karke deploy karo.</p>
      <label>Logo (PNG/JPG upload)<input type="file" accept="image/*" onChange={logo} /></label>
      <div className="fgrid">{F.map(([k, l]) => (<label key={k}>{l}<input value={c[k] || ""} onChange={(e) => upd({ ...c, [k]: e.target.value })} /></label>))}</div>
      <label>Doctor bio<textarea value={c.doctorBio} onChange={(e) => upd({ ...c, doctorBio: e.target.value })} /></label>
      <label>Services (har line: Naam | Detail)<textarea value={toLines(c.services, "title", "desc")} onChange={(e) => upd({ ...c, services: fromLines(e.target.value, "title", "desc") })} /></label>
      <label>Reviews (har line: Naam | Review)<textarea value={toLines(c.testimonials, "name", "text")} onChange={(e) => upd({ ...c, testimonials: fromLines(e.target.value, "name", "text") })} /></label>
      <div className="row gap"><button className="btn" onClick={download}>site.json download</button><label className="btn ghost" style={{ margin: 0 }}>JSON import<input type="file" accept=".json" hidden onChange={imp} /></label><button className="btn ghost" onClick={() => upd(base)}>Reset</button></div>
      <h2 style={{ marginTop: 36 }}>Leads (CRM)</h2>
      <button className="btn" onClick={loadLeads} disabled={!c.webhookUrl}>Leads load karein</button>
      {rows && <table><thead><tr><th>Time</th><th>Naam</th><th>Phone</th><th>Takleef</th><th>Kab</th><th>Status</th></tr></thead><tbody>
        {rows.map((r, i) => (<tr key={i}><td>{String(r[0]).slice(0, 10)}</td><td>{r[1]}</td><td><a href={`tel:${r[2]}`}>{r[2]}</a> <a href={`https://wa.me/91${r[2]}`}>WA</a></td><td>{r[3]}</td><td>{r[4]}</td><td>{r[5]}</td></tr>))}</tbody></table>}
    </div>
  );
}
