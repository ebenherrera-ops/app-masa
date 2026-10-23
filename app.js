const $=s=>document.querySelector(s),hoy=()=>new Date().toLocaleDateString('sv');
const DEF={perfil:{peso:70,altura:175,edad:30,sexo:'h',act:1.55,sup:400,pk:1.8},comidas:[],pesos:[],series:[],rutinas:RUTINAS};
let D=JSON.parse(localStorage.getItem('masa')||'null')||structuredClone(DEF);if(!D.rutinas)D.rutinas=structuredClone(RUTINAS);
const diaSel=()=>$('#dia').value||hoy();$('#dia').value=hoy();$('#dia').onchange=render;
const rut=()=>D.rutinas[$('#selR').value]||[],ej=n=>rut().find(e=>e.n===n)||{series:3,min:8,max:12,inc:2.5};
function fillR(sel){const ks=Object.keys(D.rutinas);$('#selR').innerHTML=ks.map(r=>`<option ${r===sel?'selected':''}>${r}</option>`).join('')}
const save=()=>{localStorage.setItem('masa',JSON.stringify(D));render()};
function metas(){const p=D.perfil,b=10*p.peso+6.25*p.altura-5*p.edad+(p.sexo==='h'?5:-161),m=Math.round(b*p.act);return{bmr:Math.round(b),mant:m,kcal:m+ +p.sup,prot:Math.round(p.peso*p.pk)}}
document.querySelectorAll('nav button').forEach(b=>b.onclick=()=>{document.querySelectorAll('nav button').forEach(x=>x.classList.toggle('on',x===b));document.querySelectorAll('section').forEach(s=>s.hidden=s.id!==b.dataset.t);render()});
$('#selAl').innerHTML=ALIMENTOS.map((a,i)=>`<option value="${i}">${a[0]} · ${a[1]} kcal · ${a[2]} g</option>`).join('');
$('#addAl').onclick=()=>{const a=ALIMENTOS[$('#selAl').value],n=+$('#porc').value||1;D.comidas.push({f:diaSel(),n:(n!=1?n+'× ':'')+a[0],k:Math.round(a[1]*n),p:+(a[2]*n).toFixed(1)});save()};
$('#addC').onclick=()=>{if(!$('#cn').value)return;D.comidas.push({f:diaSel(),n:$('#cn').value,k:+$('#ck').value||0,p:+$('#cp').value||0});save()};
$('#addP').onclick=()=>{const v=+$('#pv').value;if(!v)return;D.pesos=D.pesos.filter(x=>x.f!==hoy());D.pesos.push({f:hoy(),v});D.pesos.sort((a,b)=>a.f<b.f?-1:1);D.perfil.peso=v;save()};
const del=(k,i)=>{D[k].splice(i,1);save()};
fillR();$('#selR').onchange=render;$('#selE').onchange=render;
$('#addS').onclick=()=>{const w=+$('#sw').value,r=+$('#sr').value;if(!r)return;D.series.push({f:hoy(),e:$('#selE').value,w,r});save()};
function sugerencia(e){const OBJ=ej(e);const dias=[...new Set(D.series.filter(s=>s.e===e).map(s=>s.f))];if(!dias.length)return`Objetivo: ${OBJ.series}×${OBJ.min}-${OBJ.max} reps.`;
const u=dias.at(-1),ss=D.series.filter(s=>s.e===e&&s.f===u),w=Math.max(...ss.map(s=>s.w)),top=ss.filter(s=>s.w===w);
return top.length>=OBJ.series&&top.every(s=>s.r>=OBJ.max)?`✅ Completaste ${OBJ.series}×${OBJ.max} con ${w} kg: sube a ${w+OBJ.inc} kg y vuelve a ${OBJ.min} reps.`:`Mantén ${w} kg hasta lograr ${OBJ.series}×${OBJ.max} reps (doble progresión).`}
function chart(c,pts,u){const x=c.getContext('2d'),W=c.width,H=c.height;x.clearRect(0,0,W,H);x.fillStyle='#888';x.font='14px sans-serif';
if(pts.length<2){x.fillText('Registra al menos 2 días para ver la gráfica',20,H/2);return}
const v=pts.map(p=>p.v),mn=Math.min(...v)-1,mx=Math.max(...v)+1,X=i=>40+i*(W-60)/(pts.length-1),Y=y=>H-30-(y-mn)/(mx-mn)*(H-50);
x.fillText(mx.toFixed(1)+u,2,18);x.fillText(mn.toFixed(1)+u,2,H-30);x.fillText(pts[0].f,40,H-8);x.fillText(pts.at(-1).f,W-100,H-8);
x.strokeStyle='#7ee787';x.lineWidth=2;x.beginPath();pts.forEach((p,i)=>i?x.lineTo(X(i),Y(p.v)):x.moveTo(X(i),Y(p.v)));x.stroke();
x.fillStyle='#7ee787';pts.forEach((p,i)=>{x.beginPath();x.arc(X(i),Y(p.v),3,0,7);x.fill()})}
function render(){const m=metas(),c=D.comidas.map((x,i)=>({...x,i})).filter(x=>x.f===diaSel()),k=c.reduce((a,x)=>a+x.k,0),p=c.reduce((a,x)=>a+x.p,0);
$('#fecha').textContent=hoy();$('#bk').style.width=Math.min(100,k/m.kcal*100)+'%';$('#bp').style.width=Math.min(100,p/m.prot*100)+'%';
$('#tk').textContent=`${k} / ${m.kcal} kcal`;$('#tp').textContent=`${p.toFixed(1)} / ${m.prot} g`;
$('#lhoy').innerHTML=c.map(x=>`<li>${x.n}<span>${x.k} kcal · ${x.p} g <b onclick="del('comidas',${x.i})">✕</b></span></li>`).join('')||'<li>Sin registros</li>';
const P=D.perfil;$('#fp').value=P.peso;$('#fa').value=P.altura;$('#fe').value=P.edad;$('#fs').value=P.sexo;$('#fact').value=P.act;$('#fsu').value=P.sup;$('#fpk').value=P.pk;
$('#res').innerHTML=`TMB: ${m.bmr} kcal · Mantenimiento: ${m.mant} kcal<br><b style="color:#7ee787">Meta: ${m.kcal} kcal · ${m.prot} g proteína</b>`;
chart($('#gp'),D.pesos,'');$('#lp').innerHTML=D.pesos.map((x,i)=>`<li>${x.f}<span>${x.v} kg <b onclick="del('pesos',${i})">✕</b></span></li>`).reverse().join('');
const ejs=rut().map(e=>e.n),sel=ejs.includes($('#selE').value)?$('#selE').value:ejs[0];
$('#ejs').innerHTML=`<ul>${rut().map((e,i)=>`<li onclick="editE(${i})">${e.n}<span>${e.series}×${e.min}-${e.max} · +${e.inc} kg <b onclick="event.stopPropagation();delE(${i})">✕</b></span></li>`).join('')||'<li>Sin ejercicios</li>'}</ul>`;
$('#selE').innerHTML=ejs.map(e=>`<option ${e===sel?'selected':''}>${e}</option>`).join('');$('#sug').textContent=sel?sugerencia(sel):'Agrega ejercicios a la rutina.';
const S=D.series.map((s,i)=>({...s,i})).filter(s=>s.e===sel),dias=[...new Set(S.map(s=>s.f))];
chart($('#ge'),dias.map(f=>({f,v:Math.max(...S.filter(s=>s.f===f).map(s=>s.w))})),' kg');
$('#ls').innerHTML=S.slice(-15).reverse().map(s=>`<li>${s.f}<span>${s.w} kg × ${s.r} <b onclick="del('series',${s.i})">✕</b></span></li>`).join('')}
$('#guardaP').onclick=()=>{D.perfil={peso:+$('#fp').value,altura:+$('#fa').value,edad:+$('#fe').value,sexo:$('#fs').value,act:+$('#fact').value,sup:+$('#fsu').value,pk:+$('#fpk').value};save()};
$('#exp').onclick=()=>{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify(D,null,1)],{type:'application/json'}));a.download=`masa-${hoy()}.json`;a.click()};
$('#imp').onchange=e=>{const r=new FileReader();r.onload=()=>{try{const d=JSON.parse(r.result);if(!d.perfil)throw 0;D={...structuredClone(DEF),...d};fillR();save();alert('Importado')}catch{alert('Archivo inválido')}};r.readAsText(e.target.files[0])};
function editE(i){const e=rut()[i];$('#en').value=e.n;$('#es').value=e.series;$('#emin').value=e.min;$('#emax').value=e.max;$('#einc').value=e.inc;$('#selE').value=e.n;$('#sug').textContent=sugerencia(e.n)}
function delE(i){if(confirm('¿Borrar ejercicio?')){rut().splice(i,1);save()}}
$('#eSave').onclick=()=>{const n=$('#en').value.trim();if(!n||!D.rutinas[$('#selR').value])return;const o={n,series:+$('#es').value||3,min:+$('#emin').value||8,max:Math.max(+$('#emax').value||12,+$('#emin').value||8),inc:+$('#einc').value||2.5},r=rut(),i=r.findIndex(e=>e.n===n);i<0?r.push(o):r[i]=o;save()};
$('#rNew').onclick=()=>{const n=$('#rn').value.trim();if(!n||D.rutinas[n])return;D.rutinas[n]=[];fillR(n);save()};
$('#rRen').onclick=()=>{const n=$('#rn').value.trim(),o=$('#selR').value;if(!n||D.rutinas[n])return;D.rutinas[n]=D.rutinas[o];delete D.rutinas[o];fillR(n);save()};
$('#rDel').onclick=()=>{if(confirm('¿Borrar rutina?')){delete D.rutinas[$('#selR').value];fillR();save()}};
if('serviceWorker'in navigator)navigator.serviceWorker.register('sw.js');
render();
