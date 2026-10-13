
async function getSb(){if(window.__supabase)return window.__supabase;
for(let i=0;i<100&&!window.__supabase;i++)await new Promise(r=>setTimeout(r,50));
if(window.__supabase)return window.__supabase;
const{createClient}=await import("https://esm.sh/@supabase/supabase-js@2");
window.__supabase=createClient("https://vklnyrgmeyxuqjkeucfu.supabase.co","sb_publishable_DE-0uo-djg-fzymAqC8zRw_moUxh2lq");return window.__supabase}
let sb=await getSb(),ok=false;
function dev(){try{let d=localStorage.getItem("guoke_device");if(!d){d="d"+Math.random().toString(36).slice(2)+Date.now().toString(36);localStorage.setItem("guoke_device",d)}return d}catch(e){return "anon"}}
async function q(p){const c=new AbortController();const t=setTimeout(()=>c.abort(),10000);try{return await p.abortSignal(c.signal)}finally{clearTimeout(t)}}
for(let att=0;att<3&&!ok;att++){try{const r=await q(sb.from("comments").select("id").limit(1));ok=!r.error;if(!ok&&att<2)await new Promise(r=>setTimeout(r,2000))}catch(e){ok=false;if(att<2)await new Promise(r=>setTimeout(r,2000))}}
window.SB={ok};window._sbCm=[];window._sbKey="";
window.SBpull=async()=>{
if(!ok||!window._cur)return;const[i,ep]=window._cur;const a=A[i];if(!a)return;
const key=a.t+"|"+ep;if(window._sbKey===key||window._sbBusy)return;window._sbKey=key;window._sbBusy=true;
try{const r=await q(sb.from("comments").select("name,text").eq("title",a.t).eq("ep",String(ep)).order("created_at",{ascending:false}).limit(30));
if(!r.error&&window._sbKey===key){window._sbCm=r.data.map(x=>({n:x.name||"Anonim",t:x.text}));if(document.querySelector("#cmbox"))renderCm()}}catch(e){}
window._sbBusy=false};
window.SBpush=async(txt)=>{
if(!ok||!window._cur)return;const[i,ep]=window._cur;const a=A[i];if(!a)return;
try{await q(sb.from("comments").insert({title:a.t,ep:String(ep),name:(window._uname||"Kamu"),text:txt}))}catch(e){}
window._sbKey="";window.SBpull()};
async function bk(){try{const{data}=await sb.auth.getSession();const u=data.session&&data.session.user;if(u)return "u_"+u.id}catch(e){}return dev()}
window.SBbm=async(title,on)=>{
if(!ok||!title)return;const d=await bk();
try{if(on)await q(sb.from("bookmarks").upsert({device_id:d,title},{onConflict:"device_id,title"}));
else await q(sb.from("bookmarks").delete().eq("device_id",d).eq("title",title))}catch(e){}};
async function pullBm(){try{const d=await bk();
const r=await q(sb.from("bookmarks").select("title").eq("device_id",d).limit(500));
if(!r.error&&r.data.length){const s=ST.load();let ch=false;
r.data.forEach(x=>{const ix=A.findIndex(a=>a.t===x.title);if(ix>=0&&!s.bm.includes(ix)){s.bm.push(ix);ch=true}});
if(ch){ST.save(s);if(document.querySelector("#pustaka.on"))pustaka()}}}catch(e){}}
for(let i=0;i<100&&(typeof A==="undefined"||typeof ST==="undefined");i++)await new Promise(r=>setTimeout(r,100));
if(ok)pullBm();
window._user=null;window._uname="";
function setU(u){window._user=u;
window._uname=u?(((u.user_metadata||{}).display_name)||u.email.split("@")[0]):"";
try{if(document.querySelector("#akun.on"))akun()}catch(e){}
try{if(document.querySelector("#beranda.on"))home()}catch(e){}}
function auMsg(t){const e=document.querySelector("#au_msg");if(e)e.textContent=t}
function auErr(e){const m=String((e&&e.message)||e||"");
if(/already registered|already exists|User already/i.test(m))return "Email sudah terdaftar — silakan Masuk.";
if(/confirm/i.test(m))return "Email belum diverifikasi — cek kotak masuk email.";
if(/Invalid login|invalid.*credential/i.test(m))return "Email / kata sandi salah.";
if(/Password|short|6 char/i.test(m))return "Kata sandi minimal 6 karakter.";
if(/valid.*email|Email.*invalid/i.test(m))return "Format email tidak valid.";
if(/rate limit|too many/i.test(m))return "Terlalu banyak percobaan — tunggu beberapa menit.";
return "Gagal: "+m.slice(0,120)}
function isRate(m){return /rate limit|too many/i.test(String(m||""))}
function auLock(on){["au_b_in","au_b_up"].forEach(id=>{const b=document.querySelector("#"+id);if(b){b.disabled=on;b.style.opacity=on?.5:""}})}
function auCool(sec){auLock(true);window._auBusy=true;clearInterval(window._auT);let s=sec;
const tick=()=>{const e=document.querySelector("#au_msg");const mm=Math.floor(s/60)+":"+String(s%60).padStart(2,"0");
if(e)e.textContent="Terlalu banyak percobaan — coba lagi dalam "+mm;
if(s<=0){clearInterval(window._auT);window._auBusy=false;auLock(false);const e2=document.querySelector("#au_msg");if(e2)e2.textContent="Silakan coba lagi."}s--};tick();window._auT=setInterval(tick,1000)}
window.SBin=async()=>{const e=document.querySelector("#au_e"),p=document.querySelector("#au_p");if(!e||!p||!sb||window._auBusy)return;
if(!e.value.includes("@")){auMsg("Isi email yang valid.");return}
window._auBusy=true;auLock(true);auMsg("Memeriksa…");
try{const r=await sb.auth.signInWithPassword({email:e.value.trim(),password:p.value});
if(r.error){if(isRate(r.error.message)){auCool(90);return}auMsg(auErr(r.error))}
else{setU(r.data.user);auMsg("");pullBm()}}catch(er){if(isRate((er&&er.message)||er)){auCool(90);return}auMsg(auErr(er))}
window._auBusy=false;auLock(false)};
window.SBup=async()=>{const n=document.querySelector("#au_n"),e=document.querySelector("#au_e"),p=document.querySelector("#au_p");if(!e||!p||!sb||window._auBusy)return;
if(!e.value.includes("@")){auMsg("Isi email yang valid.");return}
if(p.value.length<6){auMsg("Kata sandi minimal 6 karakter.");return}
window._auBusy=true;auLock(true);auMsg("Mendaftarkan…");
try{const r=await sb.auth.signUp({email:e.value.trim(),password:p.value,options:{data:{display_name:(n&&n.value.trim())||e.value.trim().split("@")[0]}}});
if(r.error){if(isRate(r.error.message)){auCool(90);return}auMsg(auErr(r.error))}
else if(r.data.session){setU(r.data.user);auMsg("");pullBm()}
else auMsg("Pendaftaran OK — cek email untuk verifikasi, lalu Masuk.")}catch(er){if(isRate((er&&er.message)||er)){auCool(90);return}auMsg(auErr(er))}
window._auBusy=false;auLock(false)};
window.SBreset=async()=>{const e=document.querySelector("#au_e");if(!e||!sb||window._auBusy)return;
if(!e.value.includes("@")){auMsg("Isi email dulu untuk reset kata sandi.");return}
window._auBusy=true;auLock(true);auMsg("Mengirim link reset…");
try{const r=await sb.auth.resetPasswordForEmail(e.value.trim());
if(r.error){if(isRate(r.error.message)){auCool(90);return}auMsg(auErr(r.error))}
else auMsg("Link reset terkirim — cek email (kedaluwarsa ±1 jam).")}catch(er){if(isRate((er&&er.message)||er)){auCool(90);return}auMsg(auErr(er))}
window._auBusy=false;auLock(false)};
window.SBout=async()=>{try{if(sb)await sb.auth.signOut()}catch(e){}setU(null)};
(async()=>{try{if(!sb)return;const{data}=await sb.auth.getSession();setU(data.session&&data.session.user||null);
sb.auth.onAuthStateChange((ev,s)=>{setU(s&&s.user||null);if(s&&s.user)pullBm()})}catch(e){}})();
