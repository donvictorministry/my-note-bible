(function(){'use strict';if(window.dvBlocked)return;
const DV_ICONS={menu:'M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z',more:'M12 8a2 2 0 100-4 2 2 0 000 4zm0 2a2 2 0 100 4 2 2 0 000-4zm0 6a2 2 0 100 4 2 2 0 000-4z',back:'M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z',home:'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z',folder:'M10 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V8a2 2 0 00-2-2h-8l-2-2z',add:'M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z',undo:'M12.5 8c-2.65 0-5.05 1-6.9 2.6L2 7v9h9l-3.6-3.6A8 8 0 0113 10.5c3.5 0 6.5 2.3 7.6 5.5l2.4-.8C21.1 11 17.2 8 12.5 8z',redo:'M18.4 10.6A10.5 10.5 0 0011.5 8C6.9 8 3 11 1.5 15.2L3.9 16a8 8 0 017.6-5.5c2 0 3.700.7 5.100 1.900L13 16h9V7l-3.600 3.600z',copy:'M16 1H4a2 2 0 00-2 2v14h2V3h12V1zm3 4H8a2 2 0 00-2 2v14a2 2 0 002 2h11a2 2 0 002-2V7a2 2 0 00-2-2zm0 16H8V7h11v14z',paste:'M19 2h-4.2A3 3 0 0012 0a3 3 0 00-2.800 2H5a2 2 0 00-2 2v16a2 2 0 002 2h14a2 2 0 002-2V4a2 2 0 00-2-2zm-7 0a1 1 0 110 2 1 1 0 010-2zm7 18H5V4h2v3h10V4h2v16z',delete:'M6 19a2 2 0 002 2h8a2 2 0 002-2V7H6v12zM19 4h-3.500l-1-1h-5l-1 1H5v2h14V4z',save:'M17 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V7l-4-4zm-5 16a3 3 0 110-6 3 3 0 010 6zm3-10H5V5h10v4z',sel:'M3 5h2V3a2 2 0 00-2 2zm0 8h2v-2H3v2zm4 8h2v-2H7v2zM3 9h2V7H3v2zm10-6h-2v2h2V3zm6 0v2h2a2 2 0 00-2-2zM5 21v-2H3a2 2 0 002 2zm-2-4h2v-2H3v2zM9 3H7v2h2V3zm2 18h2v-2h-2v2zm8-8h2v-2h-2v2zm0 8a2 2 0 002-2h-2v2zm0-12h2V7h-2v2zm0 8h2v-2h-2v2zm-4 4h2v-2h-2v2zm0-16h2V3h-2v2z',sun:'M20 8.700V4h-4.700L12 .7 8.700 4H4v4.700L.7 12 4 15.300V20h4.700l3.300 3.300 3.300-3.300H20v-4.700l3.300-3.300L20 8.700zM12 18a6 6 0 110-12 6 6 0 010 12zm0-10v8a4 4 0 000-8z',wrap:'M4 19h6v-2H4v2zM20 5H4v2h16V5zm-3 6H4v2h13.250a2 2 0 010 4H15v-2l-3 3 3 3v-2h2a4 4 0 000-8z',up:'M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z',down:'M5 20h14v-2H5v2zM19 9h-4V3H9v6H5l7 7 7-7z',gear:'M12 8a4 4 0 100 8 4 4 0 000-8zm8.500 5.500v-3l-2.200-.4a6.500 6.500 0 00-.8-1.900l1.300-1.800-2.100-2.100-1.800 1.300a6.500 6.500 0 00-1.900-.8L13.500 3.500h-3l-.4 2.200c-.7.2-1.300.5-1.900.8L6.400 5.200 4.300 7.300l1.300 1.800c-.4.600-.6 1.200-.8 1.900l-2.200.4v3l2.200.4c.2.700.5 1.300.8 1.900l-1.300 1.800 2.100 2.100 1.800-1.300c.6.400 1.200.6 1.900.8l.4 2.200h3l.4-2.200c.7-.2 1.300-.5 1.900-.8l1.800 1.300 2.100-2.100-1.300-1.800c.4-.6.600-1.200.8-1.900l2.200-.4z',share:'M18 16.100c-.8 0-1.400.3-2 .8l-7.100-4.200c.1-.2.1-.5.1-.7s0-.5-.1-.7L16 7.200c.5.5 1.200.8 2 .8a3 3 0 10-3-3c0 .2 0 .5.1.7L8 9.800A3 3 0 006 9a3 3 0 100 6c.8 0 1.500-.3 2-.8l7.100 4.200c-.1.200-.1.400-.1.600a2.900 2.900 0 102.900-2.900z',check:'M12 2a10 10 0 100 20 10 10 0 000-20zm-2 15l-5-5 1.400-1.400L10 14.200l7.600-7.600L19 8l-9 9z',info:'M12 2a10 10 0 100 20 10 10 0 000-20zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z',person:'M12 12a4 4 0 100-8 4 4 0 000 8zm0 2c-2.700 0-8 1.300-8 4v2h16v-2c0-2.700-5.300-4-8-4z',mail:'M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z',edit:'M3 17.250V21h3.750L17.800 9.940l-3.750-3.750L3 17.250zM20.700 7a1 1 0 000-1.400l-2.300-2.300a1 1 0 00-1.400 0l-1.800 1.800 3.700 3.700L20.700 7z',book:'M21 5c-1.110-.35-2.330-.5-3.500-.5-1.950 0-4.050.4-5.500 1.500-1.450-1.100-3.550-1.500-5.500-1.500S2.450 4.900 1 6v14.650c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.100 20.450 5.050 20 6.500 20c1.950 0 4.050.4 5.500 1.500 1.350-.85 3.800-1.500 5.500-1.500 1.650 0 3.350.3 4.750 1.050.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.250-.75-2-1zm0 13.500c-1.100-.35-2.300-.5-3.500-.5-1.700 0-4.150.65-5.500 1.500V8c1.350-.85 3.800-1.500 5.500-1.500 1.200 0 2.400.15 3.500.5v11.500z',note:'M14 2H6c-1.100 0-1.990.9-1.990 2L4 20c0 1.100.89 2 1.990 2H18c1.100 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.500L18.500 9H13z',grid:'M3 3v8h8V3H3zm0 10v8h8v-8H3zm10-10v8h8V3h-8zm0 10v8h8v-8h-8z',list:'M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z',lock:'M18 8h-1V6a5 5 0 00-10 0v2H6a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V10a2 2 0 00-2-2zm-6 9a2 2 0 110-4 2 2 0 010 4zM9 8V6a3 3 0 016 0v2H9z',search:'M15.500 14h-.8l-.3-.3A6.500 6.500 0 109.500 16c1.600 0 3.100-.6 4.200-1.600l.3.3v.8l5 5 1.500-1.500-5-5zm-6 0a4.500 4.500 0 110-9 4.500 4.500 0 010 9z',close:'M19 6.400L17.600 5 12 10.600 6.400 5 5 6.400 10.600 12 5 17.600 6.400 19 12 13.400 17.600 19 19 17.600 13.400 12z',help:'M12 2a10 10 0 100 20 10 10 0 000-20zm1 17h-2v-2h2v2zm2.100-7.800l-.9.900c-.7.700-1.200 1.300-1.200 2.900h-2v-.5c0-1.100.5-2.100 1.200-2.800l1.200-1.300c.4-.4.600-.9.600-1.400a2 2 0 00-4 0H8a4 4 0 118 0c0 .9-.4 1.700-.9 2.200z'};
const dvQ=s=>document.querySelector(s),dvQA=s=>[...document.querySelectorAll(s)];
const dvIco=n=>'<svg class="dvIco" viewBox="0 0 24 24"><path d="'+DV_ICONS[n]+'"/></svg>';
const dvEsc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
dvQA('[data-dvico]').forEach(el=>el.innerHTML=dvIco(el.dataset.dvico));
const dvBase=location.pathname.replace(/[^/]*$/,'');
const dvMainViews=['home','files','bible'],dvRoutes=[...dvMainViews,'about-app','about-dev','contact','settings','todo','guide'];
const dvTitles={home:'Note & Bible',files:'Files',bible:'Bible'};
let dvCur='home',dvInstallEv=null,dvRec=null,dvEdName='',dvBData=null,dvBList=[],dvBShown=0,dvBSrch=0;
const dvCode=dvQ('#dvCode');
/* Toast */
function dvToast(m){const t=dvQ('#dvToast');t.textContent=m;t.classList.add('dvShow');clearTimeout(dvToast.dvT);dvToast.dvT=setTimeout(()=>t.classList.remove('dvShow'),1800)}
/* Dialog */
function dvAsk(o){return new Promise(res=>{const m=dvQ('#dvModal');dvQ('#dvModalBox').innerHTML='<h2>'+o.title+'</h2>'+(o.msg?'<p>'+dvEsc(o.msg)+'</p>':'')+(o.input?'<input id="dvAskIn" class="dvInput" type="'+(o.type||'text')+'" inputmode="'+(o.mode||'text')+'" '+(o.max?'maxlength="'+o.max+'"':'')+' value="'+dvEsc(o.value||'')+'">':'')+'<div class="dvRow"><button class="dvBtn dvGhost" id="dvAskNo">Cancel</button><button class="dvBtn" id="dvAskOk">'+(o.ok||'OK')+'</button></div>';m.classList.add('dvOn');const i=dvQ('#dvAskIn');if(i)i.focus();const done=v=>{m.classList.remove('dvOn');res(v)};dvQ('#dvAskNo').onclick=()=>done(null);dvQ('#dvAskOk').onclick=()=>done(o.input?i.value:true)})}
/* Database */
const dvDB={db:null,open(){return new Promise((ok,no)=>{const q=indexedDB.open('dvNoteBibleDB',2);q.onupgradeneeded=()=>{const d=q.result;if(!d.objectStoreNames.contains('dvScripts'))d.createObjectStore('dvScripts',{keyPath:'id',autoIncrement:true});if(!d.objectStoreNames.contains('dvBible'))d.createObjectStore('dvBible')};q.onsuccess=()=>{this.db=q.result;ok()};q.onerror=()=>no(q.error)})},
run(mode,fn){return new Promise((ok,no)=>{const t=this.db.transaction('dvScripts',mode),q=fn(t.objectStore('dvScripts'));t.oncomplete=()=>ok(q.result);t.onerror=()=>no(t.error)})},
all(){return this.run('readonly',s=>s.getAll())},get(id){return this.run('readonly',s=>s.get(id))},put(o){return this.run('readwrite',s=>s.put(o))},del(id){return this.run('readwrite',s=>s.delete(id))},
getB(k){return new Promise((ok,no)=>{const q=this.db.transaction('dvBible','readonly').objectStore('dvBible').get(k);q.onsuccess=()=>ok(q.result);q.onerror=()=>no(q.error)})},
putB(k,v){return new Promise((ok,no)=>{const t=this.db.transaction('dvBible','readwrite');t.objectStore('dvBible').put(v,k);t.oncomplete=()=>ok();t.onerror=()=>no(t.error)})}};
const dvHash=async s=>[...new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode('dv'+s)))].map(b=>b.toString(16).padStart(2,'0')).join('');
/* Routing */
function dvShow(n){dvCur=n;dvQA('.dvView').forEach(v=>v.classList.toggle('dvOn',v.id==='dvV-'+n));document.body.classList.toggle('dvSub',!dvMainViews.includes(n));dvQA('#dvNav button').forEach(b=>b.classList.toggle('dvAct',b.dataset.dvgo===n));dvQ('#dvTitle').textContent=dvTitles[n]||'Note & Bible';
if(n==='files')dvFiles();else if(n==='bible')dvBibleOpen();else if(n==='settings')dvSettings.render(dvQ('#dvB-settings'));else if(n==='todo')dvTodo();else if(n==='about-app')dvQ('#dvB-about-app').innerHTML=dvAboutApp();else if(n==='about-dev')dvQ('#dvB-about-dev').innerHTML=dvAboutDev();else if(n==='contact'){dvQ('#dvB-contact').innerHTML=dvContactUs();dvContactBind(dvToast)}else if(n==='guide')dvGuide()}
function dvGo(n){if(!dvRoutes.includes(n))n='home';dvCloseDrawers();if(n===dvCur&&!dvQ('#dvEditor').classList.contains('dvOn'))return;dvQ('#dvEditor').classList.remove('dvOn');history.pushState({v:n},'',dvBase+'#'+n);dvShow(n)}
function dvBack(){history.length>1?history.back():dvGo('home')}
window.addEventListener('popstate',e=>{let h='';try{h=decodeURIComponent(location.hash.slice(1))}catch(x){}const v=(e.state&&e.state.v)||h||'home';if(v==='editor'){dvQ('#dvEditor').classList.add('dvOn');return}dvQ('#dvEditor').classList.remove('dvOn');dvCloseDrawers();if(dvRoutes.includes(v))dvShow(v);else if(v==='notepad')dvShow('home');else dvOpenSlug(v,true)});
function dvCloseDrawers(){dvQA('.dvDrawer').forEach(d=>d.classList.remove('dvOpen'))}
/* Popups */
function dvClosePop(){const p=dvQ('#dvPop');if(p)p.remove()}
function dvPop(btn,items,up){dvClosePop();const p=document.createElement('div');p.id='dvPop';p.className='dvPop';p.innerHTML=items.map((x,i)=>'<button class="dvItem" data-dvi="'+i+'">'+dvIco(x[1])+x[0]+'</button>').join('');document.body.appendChild(p);const r=btn.getBoundingClientRect();p.style.right=Math.max(8,innerWidth-r.right)+'px';if(up)p.style.bottom=(innerHeight-r.top+8)+'px';else p.style.top=Math.max(8,Math.min(r.bottom,innerHeight-p.offsetHeight-8))+'px';p.onclick=e=>{const b=e.target.closest('[data-dvi]');if(!b)return;dvClosePop();items[b.dataset.dvi][2]()}}
document.addEventListener('pointerdown',e=>{if(!e.target.closest('#dvPop,[data-dvmenu],#dvFab'))dvClosePop()});
/* Files */
async function dvFiles(){const q=dvQ('#dvSearch').value.trim().toLowerCase(),l=dvQ('#dvList'),a=(await dvDB.all()).filter(f=>f.name.toLowerCase().includes(q)).sort((x,y)=>y.updated-x.updated);l.className=localStorage.dvNbView==='grid'?'dvGridV':'';
l.innerHTML=a.map(f=>'<div class="dvCard"><div class="dvCardMain" data-dvmenu="'+f.id+'" data-dvopen="1">'+dvIco(f.pin?'lock':'note')+'<div><b>'+dvEsc(f.name)+'</b><small>'+dvEsc('#'+dvSlugOf(f))+'</small></div></div><button class="dvIconBtn" data-dvmenu="'+f.id+'" aria-label="Options">'+dvIco('more')+'</button></div>').join('')||'<div class="dvEmpty">No saved notes yet. Tap the plus button to start.</div>'}
async function dvGuard(f){if(!f.pin)return true;const p=await dvAsk({title:'Enter PIN',input:1,type:'password',mode:'numeric',max:4,ok:'Unlock'});if(p===null)return false;if(await dvHash(p)===f.pin){dvPinMem[dvSlugOf(f)]=p;return p}dvToast('Wrong PIN');return false}
async function dvFileMenu(id,btn){const f=await dvDB.get(+id);if(!f)return;
if(btn.dataset.dvopen)return dvEditFile(f);
dvPop(btn,[ ['Rename','edit',()=>dvRename(f)],['Edit','note',()=>dvEditFile(f)],['Delete','delete',()=>dvDelFile(f)],['Share','share',()=>dvShareFile(f)],['PIN','lock',()=>dvPin(f)],['Exit','close',()=>{}] ])}
async function dvEditFile(f){if(await dvGuard(f))dvOpenEd(f)}
async function dvRename(f){if(!await dvGuard(f))return;const n=await dvAsk({title:'Rename File',input:1,value:f.name,ok:'Rename'});if(n===null||!n.trim())return;f.name=dvName(n);await dvDB.put(f);dvFiles();dvToast('Renamed')}
async function dvDelFile(f){if(!await dvGuard(f))return;if(!await dvAsk({title:'Delete file?',msg:f.name,ok:'Delete'}))return;await dvDB.del(f.id);dvFiles();dvToast('Deleted')}
async function dvShareFile(f){const pin=await dvGuard(f);if(!pin)return;if(typeof CompressionStream==='undefined')return dvShareText(f.name,f.code);try{const l=await dvMakeLink(f,pin);if(navigator.share)await navigator.share({title:f.name,text:f.name,url:l});else{await navigator.clipboard.writeText(l);dvToast('Link copied')}}catch(e){if(e.name!=='AbortError')dvToast('Could not create the link')}}
async function dvShareText(t,c){try{const file=new File([c],t,{type:'text/plain'});if(navigator.canShare&&navigator.canShare({files:[file]}))return await navigator.share({files:[file],title:t});if(navigator.share)return await navigator.share({title:t,text:c});await navigator.clipboard.writeText(c);dvToast('Copied to clipboard')}catch(e){if(e.name!=='AbortError')dvToast('Share unavailable')}}
async function dvPin(f){if(!await dvGuard(f))return;const p=await dvAsk({title:f.pin?'Change PIN':'Set PIN',msg:'Use 4 digits'+(f.pin?'. Leave empty to remove.':''),input:1,type:'password',mode:'numeric',max:4,ok:'Save'});if(p===null)return;if(p===''&&f.pin)f.pin='';else if(/^\d{4}$/.test(p))f.pin=await dvHash(p);else return dvToast('PIN must be 4 digits');dvPinMem[dvSlugOf(f)]=p;await dvDB.put(f);dvFiles();dvToast(f.pin?'PIN saved':'PIN removed')}
const dvName=n=>{n=n.trim();return /\.txt$/i.test(n)?n:n+'.txt'};
/* Note links and sharing */
const dvPinMem={};
const dvSlugOf=f=>f.slug||('note-'+f.id);
const dvSlugBase=t=>t.replace(/\.txt$/i,'').replace(/[^\p{L}\p{N}_-]/gu,'')||'note';
async function dvUniqueSlug(t,id){const base=dvSlugBase(t),all=await dvDB.all(),used=new Set(all.filter(x=>x.id!==id).map(x=>dvSlugOf(x).toLowerCase()));[...dvRoutes,'notepad','new','editor'].forEach(x=>used.add(x));let s=base,n=2;while(used.has(s.toLowerCase())){s=base+'-'+n++}return s}
const dvB64=b=>{let s='';new Uint8Array(b).forEach(x=>{s+=String.fromCharCode(x)});return btoa(s)};
const dvB64u=b=>dvB64(b).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');
const dvUnb64u=s=>{s=s.replace(/-/g,'+').replace(/_/g,'/');while(s.length%4)s+='=';return Uint8Array.from(atob(s),c=>c.charCodeAt(0))};
async function dvZip(u8,pack){const cs=pack?new CompressionStream('deflate'):new DecompressionStream('deflate'),w=cs.writable.getWriter();w.write(u8);w.close();return new Uint8Array(await new Response(cs.readable).arrayBuffer())}
async function dvKey(pin,salt){const m=await crypto.subtle.importKey('raw',new TextEncoder().encode(pin),'PBKDF2',false,['deriveKey']);return crypto.subtle.deriveKey({name:'PBKDF2',salt:salt,iterations:100000,hash:'SHA-256'},m,{name:'AES-GCM',length:256},false,['encrypt','decrypt'])}
async function dvMakeLink(f,pin){let z=await dvZip(new TextEncoder().encode(JSON.stringify({n:f.name,t:f.code})),true),tag='p';
if(f.pin){const s=crypto.getRandomValues(new Uint8Array(16)),i=crypto.getRandomValues(new Uint8Array(12)),k=await dvKey(pin,s),c=new Uint8Array(await crypto.subtle.encrypt({name:'AES-GCM',iv:i},k,z)),all=new Uint8Array(28+c.length);all.set(s,0);all.set(i,16);all.set(c,28);z=all;tag='e'}
return location.origin+dvBase+'#'+encodeURIComponent(dvSlugOf(f))+'~'+tag+dvB64u(z)}
async function dvOpenShared(slug,pl,rp){try{let b=dvUnb64u(pl.slice(1));
if(pl[0]==='e'){for(;;){const pin=await dvAsk({title:'Enter PIN',msg:'This note is locked.',input:1,type:'password',mode:'numeric',max:4,ok:'Unlock'});if(pin===null){dvShow('home');return}
try{const k=await dvKey(pin,b.slice(0,16));b=new Uint8Array(await crypto.subtle.decrypt({name:'AES-GCM',iv:b.slice(16,28)},k,b.slice(28)));break}catch(e){dvToast('Wrong PIN')}}}
const o=JSON.parse(new TextDecoder().decode(await dvZip(b,false)));dvOpenEd(null,o.n,o.t,rp);history.replaceState({v:'editor'},'',dvBase+'#'+encodeURIComponent(slug)+'~'+pl)}catch(e){dvToast('This note link is not valid');dvShow('home')}}
async function dvOpenSlug(p,rp){const i=p.indexOf('~');if(i>0)return dvOpenShared(p.slice(0,i),p.slice(i+1),rp);const all=await dvDB.all(),f=all.find(x=>dvSlugOf(x).toLowerCase()===p.toLowerCase());
if(!f){dvToast('Note not found on this device. Ask for the full link.');dvShow('home');return}
if(!await dvGuard(f)){dvShow('home');return}dvOpenEd(f,'','',rp)}
/* Bible reader */
const dvKjvUrls=['https://raw.githubusercontent.com/thiagobodruk/bible/master/json/en_kjv.json','https://cdn.jsdelivr.net/gh/thiagobodruk/bible@master/json/en_kjv.json'];
function dvClean(v){return String(v).replace(/\{[HG]\d+\}/g,'').replace(/[{}]/g,'').replace(/<[^>]*>/g,'').replace(/\u00B6/g,'').replace(/\[/g,'').replace(/\]/g,'').replace(/\b[HG]\d{1,4}\b/g,'').replace(/\s+/g,' ').trim()}
async function dvBibleOpen(){if(!dvBData){try{dvBData=await dvDB.getB('kjv')}catch(e){}}const has=!!dvBData;dvQ('#dvBGet').hidden=has;dvQ('#dvBRead').hidden=!has;if(has&&!dvQ('#dvBBook').options.length){dvQ('#dvBBook').innerHTML=dvBData.map((b,i)=>'<option value="'+i+'">'+dvEsc(b.n)+'</option>').join('');dvBibleChapters(0,0)}}
function dvBibleChapters(bi,ci){dvQ('#dvBBook').value=bi;dvQ('#dvBCh').innerHTML=dvBData[bi].c.map((x,i)=>'<option value="'+i+'">Ch. '+(i+1)+'</option>').join('');dvQ('#dvBCh').value=ci;dvBibleShow()}
function dvBibleShow(){const bi=+dvQ('#dvBBook').value,ci=+dvQ('#dvBCh').value;dvBList=dvBData[bi].c[ci].map((t,i)=>({n:i+1,t:t}));dvBibleReset()}
function dvBibleReset(){dvBShown=0;const b=dvQ('#dvBText');b.innerHTML='';dvBibleMore();b.scrollTop=0}
function dvBibleMore(){const box=dvQ('#dvBText'),old=box.querySelector('.dvMore');if(old)old.remove();if(!dvBList.length){box.innerHTML='<div class="dvEmpty">No verses found.</div>';return}const end=Math.min(dvBShown+25,dvBList.length);let h='';for(let i=dvBShown;i<end;i++){const v=dvBList[i];h+='<p class="dvVs"'+(v.g?' data-dvg="'+v.g+'"':'')+'><b>'+(v.r?dvEsc(v.r):v.n)+'</b> '+dvEsc(v.t)+'</p>'}box.insertAdjacentHTML('beforeend',h);dvBShown=end;const rem=dvBList.length-end;if(rem>0)box.insertAdjacentHTML('beforeend','<button class="dvBtn dvGhost dvMore" data-dvact="bmore">Show more &mdash; '+rem+' verses remaining</button>')}
function dvBibleFind(q){q=q.trim().toLowerCase();if(q.length<3){dvBibleShow();return}const out=[];dvBData.forEach((b,bi)=>b.c.forEach((ch,ci)=>ch.forEach((t,vi)=>{if(t.toLowerCase().includes(q))out.push({r:b.n+' '+(ci+1)+':'+(vi+1),g:bi+':'+ci,t:t})})));dvBList=out;dvBibleReset()}
async function dvBibleGet(){const st=dvQ('#dvBMsg'),btn=dvQ('#dvBGo');btn.disabled=true;document.body.classList.add('dvBusy');st.textContent='Downloading the Bible...';let d=null;for(const u of dvKjvUrls){try{const r=await fetch(u);if(!r.ok)throw new Error('x');d=JSON.parse((await r.text()).replace(/^\uFEFF/,''));break}catch(e){}}
if(!d)st.textContent='The Bible could not be downloaded. Please check your internet connection and try again.';else{st.textContent='Preparing the Bible...';await new Promise(r=>setTimeout(r,30));dvBData=d.map(b=>({n:b.name,c:b.chapters.map(ch=>ch.map(dvClean))}));try{await dvDB.putB('kjv',dvBData)}catch(e){}st.textContent='';dvBibleOpen()}
btn.disabled=false;document.body.classList.remove('dvBusy')}
(function(){const z=Math.min(27,Math.max(23,+localStorage.dvNbFont||23));document.documentElement.style.setProperty('--dvBs',z+'px');dvQ('#dvBSize').value=z;
dvQ('#dvBSize').oninput=e=>{document.documentElement.style.setProperty('--dvBs',e.target.value+'px');localStorage.dvNbFont=e.target.value};
dvQ('#dvBBook').onchange=()=>dvBibleChapters(+dvQ('#dvBBook').value,0);dvQ('#dvBCh').onchange=dvBibleShow;
dvQ('#dvBFind').oninput=e=>{clearTimeout(dvBSrch);dvBSrch=setTimeout(()=>dvBibleFind(e.target.value),300)};
dvQ('#dvBDk').onchange=e=>dvSettings.set('theme',e.target.checked?'dark':'light');
dvQ('#dvBText').onclick=e=>{const p=e.target.closest('[data-dvg]');if(!p)return;const g=p.dataset.dvg.split(':');dvQ('#dvBFind').value='';dvBibleChapters(+g[0],+g[1])}})();
/* Editor */
const dvH={u:[''],r:[],t:0};
const dvTools=[ ['undo','undo','Undo'],['redo','redo','Redo'],['copy','copy','Copy'],['paste','paste','Paste'],['select','sel','Select'],['delete','delete','Clear'],['theme','sun','Theme'],['new','add','New'] ];
dvQ('#dvTools').innerHTML=dvTools.map(t=>'<button class="dvTB" data-dvt="'+t[0]+'" data-dvtb="'+t[0]+'">'+dvIco(t[1])+t[2]+'</button>').join('');
function dvPush(){const v=dvCode.value;if(v!==dvH.u[dvH.u.length-1]){dvH.u.push(v);if(dvH.u.length>200)dvH.u.shift();dvH.r=[]}}
function dvApplyCfg(){const c=dvSettings.get();document.documentElement.dataset.dvtheme=c.theme;dvQ('meta[name=theme-color]').content=c.theme==='dark'?'#0E1116':'#1877F2';dvCode.wrap='soft';dvCode.classList.add('dvWrap');dvQ('#dvBDk').checked=c.theme==='dark';dvQ('#dvRSw').checked=c.theme==='dark';const s=(k,v)=>{const b=dvQ('[data-dvtb='+k+']');if(b)b.classList.toggle('dvAct',v)};s('theme',c.theme==='dark')}
window.dvApplyCfg=dvApplyCfg;
function dvOpenEd(f,name,code,rp){dvRec=f||null;dvEdName=f?f.name:(name||'');dvCode.value=f?f.code:(code||'');dvH.u=[dvCode.value];dvH.r=[];dvQ('#dvEdName').textContent=dvEdName||'New Note';dvCloseDrawers();dvQ('#dvEditor').classList.add('dvOn');history[rp?'replaceState':'pushState']({v:'editor'},'',dvBase+'#'+(f?encodeURIComponent(dvSlugOf(f)):'notepad'))}
dvCode.addEventListener('input',()=>{clearTimeout(dvH.t);dvH.t=setTimeout(dvPush,400)});
dvCode.addEventListener('keydown',e=>{if(e.key==='Tab'){e.preventDefault();dvCode.setRangeText('  ',dvCode.selectionStart,dvCode.selectionEnd,'end');dvCode.dispatchEvent(new Event('input'))}});
function dvSet(v){dvCode.value=v}
async function dvTool(t){const c=dvSettings.get();switch(t){
case 'save':{const n=await dvAsk({title:'Save Note',msg:'File title',input:1,value:dvEdName,ok:'Save'});if(n===null)return;if(!n.trim())return dvToast('Enter a title');const r=Object.assign({pin:''},dvRec||{},{name:dvName(n),code:dvCode.value,updated:Date.now()});if(!r.slug)r.slug=await dvUniqueSlug(n,r.id);r.id=await dvDB.put(r);dvRec=r;dvEdName=r.name;history.replaceState({v:'editor'},'',dvBase+'#'+encodeURIComponent(r.slug));dvQ('#dvEdName').textContent=r.name;
dvToast('Saved');break}
case 'undo':dvPush();if(dvH.u.length>1){dvH.r.push(dvH.u.pop());dvSet(dvH.u[dvH.u.length-1])}break;
case 'redo':if(dvH.r.length){const v=dvH.r.pop();dvH.u.push(v);dvSet(v)}break;
case 'copy':try{await navigator.clipboard.writeText(dvCode.value.slice(dvCode.selectionStart,dvCode.selectionEnd)||dvCode.value);dvToast('Copied')}catch(e){dvToast('Clipboard unavailable')}break;
case 'paste':try{const x=await navigator.clipboard.readText();dvCode.setRangeText(x,dvCode.selectionStart,dvCode.selectionEnd,'end');dvPush();dvCode.dispatchEvent(new Event('input'))}catch(e){dvToast('Clipboard unavailable')}break;
case 'select':dvCode.focus();dvCode.select();break;
case 'delete':if(await dvAsk({title:'Delete text?',msg:'All text in the editor will be removed.',ok:'Delete'})){dvPush();dvSet('');dvPush();dvToast('Deleted')}break;
case 'theme':dvSettings.set('theme',c.theme==='dark'?'light':'dark');break;
case 'new':history.replaceState({v:'editor'},'',dvBase+'#notepad');dvRec=null;dvEdName='';dvSet('');dvH.u=[''];dvH.r=[];dvQ('#dvEdName').textContent='New Note';break}}
dvQ('#dvFile').onchange=async e=>{const f=e.target.files[0];e.target.value='';if(!f)return;const t=await f.text();dvOpenEd(null,f.name,t);dvToast('Imported')};
/* Actions */
async function dvAct(a,el){switch(a){
case 'openl':dvQ('#dvLeft').classList.add('dvOpen');break;
case 'openr':dvQ('#dvRight').classList.add('dvOpen');break;
case 'new':dvOpenEd();break;
case 'import':dvCloseDrawers();dvQ('#dvFile').click();break;
case 'grid':case 'list':localStorage.dvNbView=a;dvFiles();break;
case 'bget':dvBibleGet();break;
case 'bmore':dvBibleMore();break;
case 'fab':dvPop(el,[ ['How to use','help',()=>dvGo('guide')],['Notepad','note',()=>dvOpenEd()] ],true);break;
case 'share':dvCloseDrawers();try{if(navigator.share)await navigator.share({title:'DV Note & Bible',url:location.origin+dvBase});else{await navigator.clipboard.writeText(location.origin+dvBase);dvToast('Link copied')}}catch(e){}break;
case 'install':dvCloseDrawers();if(dvInstallEv){dvInstallEv.prompt();dvInstallEv=null}else dvToast('Use the browser menu: Add to Home screen');break}}
document.addEventListener('click',e=>{const t=e.target.closest('[data-dvgo],[data-dvact],[data-dvclose],[data-dvback],[data-dvmenu],[data-dvt]');if(!t)return;const d=t.dataset;if(d.dvgo)dvGo(d.dvgo);else if(d.dvact)dvAct(d.dvact,t);else if('dvclose' in d)dvCloseDrawers();else if('dvback' in d)dvBack();else if(d.dvmenu)dvFileMenu(d.dvmenu,t);else if(d.dvt)dvTool(d.dvt)});
dvQ('#dvRSw').onchange=e=>dvSettings.set('theme',e.target.checked?'dark':'light');
dvQ('#dvSearch').oninput=dvFiles;
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();dvInstallEv=e});
window.addEventListener('appinstalled',()=>{dvQ('#dvInstall').style.display='none'});
/* Todo */
function dvTodo(){const L=JSON.parse(localStorage.dvNbTodo||'[]'),b=dvQ('#dvB-todo');b.innerHTML='<div class="dvRow" style="margin:0 0 8px"><input id="dvTdIn" class="dvInput" placeholder="New task"><button class="dvBtn" id="dvTdAdd" style="flex:none">Add</button></div>'+L.map((t,i)=>'<div class="dvRowSw"><input class="dvChk" type="checkbox" data-dvi2="'+i+'" '+(t.d?'checked':'')+'><span class="'+(t.d?'dvDone':'')+'">'+dvEsc(t.t)+'</span><button class="dvIconBtn" data-dvdel="'+i+'" aria-label="Remove">'+dvIco('close')+'</button></div>').join('');
const sv=()=>{localStorage.dvNbTodo=JSON.stringify(L);dvTodo()};
dvQ('#dvTdAdd').onclick=()=>{const v=dvQ('#dvTdIn').value.trim();if(!v)return dvToast('Enter a task');L.unshift({t:v,d:0});sv()};
b.onclick=e=>{const x=e.target.closest('[data-dvdel]');if(x){L.splice(+x.dataset.dvdel,1);sv()}};b.onchange=e=>{const i=e.target.dataset.dvi2;if(i!==undefined){L[+i].d=e.target.checked?1:0;sv()}}}
function dvGuide(){dvQ('#dvB-guide').innerHTML='<div class="dvBox"><h3>Notes</h3><ol><li>Open Files, tap the plus button and choose Notepad.</li><li>Type your note, then tap Save and give it a title.</li><li>In Files, tap the three dots on a note to rename, edit, delete, share or lock it with a 4-digit PIN.</li></ol></div><div class="dvBox"><h3>King James Bible</h3><ol><li>Open Bible and tap Download Bible (internet is needed once).</li><li>Pick a book and chapter, or type a word in Search.</li><li>Use the slider to make the text bigger or smaller.</li></ol></div>'}
/* Init */
(async function(){dvApplyCfg();try{await dvDB.open()}catch(e){dvToast('Storage unavailable')}
let p=new URLSearchParams(location.search).get('dvr')||location.hash.slice(1)||'home';try{p=decodeURIComponent(p)}catch(e){}const n=dvRoutes.includes(p)?p:'home';
history.replaceState({v:n},'',dvBase+'#'+n);dvShow(n);if(!dvRoutes.includes(p)&&p!=='notepad')dvOpenSlug(p,false);
if('serviceWorker' in navigator)navigator.serviceWorker.register('sw.js').catch(()=>{})})();
})();
