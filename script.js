// Turbo: Q+ Edition — Perfect Round Celebration (confetti + banner + shake)
// Keeps all previous functionality from your last version: global tokens (cap 7, commit-on-finish),
// unlock ramp 200→…→40, Try Again, TTS/voice, identical UI/brand.
//
// Drop-in replacement for script.js

(() => {
  const $  = sel => document.querySelector(sel);
  const $$ = sel => Array.from(document.querySelectorAll(sel));

  // ===================== CONFIG =====================
  const QUESTIONS_PER_ROUND = 10;
  const PENALTY_PER_WRONG   = 30;
  const BASE_THRESH = { 1:200, 2:180, 3:160, 4:140, 5:120, 6:100, 7:80, 8:60, 9:40 };

  // Global Spanish-read tokens (cap 7, commit-on-finish)
  const GLOBAL_CHEATS_MAX = 7;
  const GLOBAL_CHEATS_KEY = "tqplus:v3:globalCheats";

  // ===================== DATA (present-based for all tenses) =====================
 // GAME 3 — School & Education + Exam Stress (Radical-changing verbs + Connector: también)
// Direction: English -> Spanish
// Rules applied:
// - Only final ? is used in answers (no inverted ¿)
// - Accents required
// - Pronouns not required EXCEPT "usted" must appear when marked (formal)
// - Connector for Game 3 appears: "también"

const PRESENT = {
  1: [
    { en: "My school is big", es: "Mi colegio es grande" },
    { en: "My teacher is kind", es: "Mi profesor es amable" },
    { en: "I like maths", es: "Me gustan las matemáticas" },
    { en: "I like English", es: "Me gusta el inglés" },
    { en: "I study every day", es: "Estudio cada día" },
    { en: "I do my homework", es: "Hago los deberes" },
    { en: "The class is easy", es: "La clase es fácil" },
    { en: "The exam is important", es: "El examen es importante" },
    { en: "School starts at nine", es: "El colegio empieza a las nueve" },
    { en: "I have a good timetable", es: "Tengo un buen horario" }
  ],
  2: [
    { en: "I arrive on time", es: "Llego a tiempo" },
    { en: "I listen in class", es: "Escucho en clase" },
    { en: "I take notes", es: "Tomo apuntes" },
    { en: "My subjects are interesting", es: "Mis asignaturas son interesantes" },
    { en: "I do not cheat", es: "No copio" },
    { en: "Is the teacher strict?", es: "El profesor es estricto?" },
    { en: "Do you like science?", es: "Te gustan las ciencias?" },
    { en: "Do you study after school? (formal)", es: "Estudia usted después del colegio?" },
    { en: "The uniform is comfortable", es: "El uniforme es cómodo" },
    { en: "The canteen is good", es: "El comedor es bueno" }
  ],
  3: [
    { en: "I think the school is good", es: "Pienso que el colegio es bueno" },
    { en: "I prefer history", es: "Prefiero la historia" },
    { en: "I want better grades", es: "Quiero mejores notas" },
    { en: "I can study at home", es: "Puedo estudiar en casa" },
    { en: "I do not understand this exercise", es: "No entiendo este ejercicio" },
    { en: "Do you remember the homework?", es: "Recuerdas los deberes?" },
    { en: "Do you start at eight? (formal)", es: "Empieza usted a las ocho?" },
    { en: "The rules are fair", es: "Las normas son justas" },
    { en: "I am nervous before exams", es: "Estoy nervioso antes de los exámenes" },
    { en: "I also study languages", es: "También estudio idiomas" }
  ],
  4: [
    { en: "I eat in the canteen and then study", es: "Como en el comedor y luego estudio" },
    { en: "I sleep well before an exam", es: "Duermo bien antes de un examen" },
    { en: "I ask for help in class", es: "Pido ayuda en clase" },
    { en: "I repeat the new words", es: "Repito las palabras nuevas" },
    { en: "Sometimes I cannot focus", es: "A veces no puedo concentrarme" },
    { en: "Do you play sports after school?", es: "Juegas a deportes después del colegio?" },
    { en: "Do you serve on the student council? (formal)", es: "Sirve usted en el consejo estudiantil?" },
    { en: "The library is quiet", es: "La biblioteca es tranquila" },
    { en: "The labs are modern", es: "Los laboratorios son modernos" },
    { en: "I also help my classmates", es: "También ayudo a mis compañeros" }
  ],
  5: [
    { en: "I lose time on my phone", es: "Pierdo tiempo con el móvil" },
    { en: "I usually start at nine", es: "Suelo empezar a las nueve" },
    { en: "I find maths difficult", es: "Encuentro las matemáticas difíciles" },
    { en: "I try to improve", es: "Intento mejorar" },
    { en: "I do not sleep enough", es: "No duermo lo suficiente" },
    { en: "Do you prefer studying alone?", es: "Prefieres estudiar solo?" },
    { en: "Do you understand the topic? (formal)", es: "Entiende usted el tema?" },
    { en: "The teachers help us", es: "Los profesores nos ayudan" },
    { en: "The pressure is real", es: "La presión es real" },
    { en: "I also take breaks", es: "También hago descansos" }
  ],
  6: [
    { en: "I count the days until the holidays", es: "Cuento los días hasta las vacaciones" },
    { en: "I return home and study", es: "Vuelvo a casa y estudio" },
    { en: "I remember key formulas", es: "Recuerdo fórmulas clave" },
    { en: "I do not forget my books", es: "No olvido mis libros" },
    { en: "I can solve the problems now", es: "Puedo resolver los problemas ahora" },
    { en: "Do you think the exam is fair?", es: "Piensas que el examen es justo?" },
    { en: "Do you prefer morning exams? (formal)", es: "Prefiere usted exámenes por la mañana?" },
    { en: "The principal is strict but fair", es: "El director es estricto pero justo" },
    { en: "The gym is excellent", es: "El gimnasio es excelente" },
    { en: "I also revise past papers", es: "También repaso exámenes de años anteriores" }
  ],
  7: [
    { en: "I start to feel calm with a plan", es: "Empiezo a sentirme tranquilo con un plan" },
    { en: "I think and then decide", es: "Pienso y luego decido" },
    { en: "I prefer to study in the library", es: "Prefiero estudiar en la biblioteca" },
    { en: "I cannot study with noise", es: "No puedo estudiar con ruido" },
    { en: "I ask for more exercises", es: "Pido más ejercicios" },
    { en: "Do you sleep well before exams?", es: "Duermes bien antes de los exámenes?" },
    { en: "Do you repeat the grammar? (formal)", es: "Repite usted la gramática?" },
    { en: "The timetable works for me", es: "El horario me funciona" },
    { en: "The mock exams are useful", es: "Los exámenes de prueba son útiles" },
    { en: "I also practise speaking", es: "También practico la expresión oral" }
  ],
  8: [
    { en: "I usually remember key dates", es: "Suelo recordar fechas clave" },
    { en: "I want to achieve good results", es: "Quiero lograr buenos resultados" },
    { en: "I can explain the topic now", es: "Puedo explicar el tema ahora" },
    { en: "I do not waste time", es: "No pierdo el tiempo" },
    { en: "I find science interesting", es: "Encuentro las ciencias interesantes" },
    { en: "Do you start your revision early?", es: "Empiezas tu repaso temprano?" },
    { en: "Do you understand this chapter? (formal)", es: "Entiende usted este capítulo?" },
    { en: "The teachers are demanding", es: "Los profesores son exigentes" },
    { en: "The rules help us learn", es: "Las normas nos ayudan a aprender" },
    { en: "I also help at study club", es: "También ayudo en el club de estudio" }
  ],
  9: [
    { en: "I prefer a clear strategy", es: "Prefiero una estrategia clara" },
    { en: "I think the pressure motivates me", es: "Pienso que la presión me motiva" },
    { en: "I cannot sleep before big exams", es: "No puedo dormir antes de exámenes grandes" },
    { en: "I ask for feedback from teachers", es: "Pido comentarios a los profesores" },
    { en: "I repeat key points aloud", es: "Repito puntos clave en voz alta" },
    { en: "Do you remember the formula?", es: "Recuerdas la fórmula?" },
    { en: "Do you prefer group study? (formal)", es: "Prefiere usted el estudio en grupo?" },
    { en: "The facilities are excellent", es: "Las instalaciones son excelentes" },
    { en: "The stress is natural", es: "El estrés es natural" },
    { en: "I also rest to recover", es: "También descanso para recuperarme" }
  ],
  10: [
    { en: "I can manage stress with a plan", es: "Puedo gestionar el estrés con un plan" },
    { en: "I start early and avoid distractions", es: "Empiezo temprano y evito distracciones" },
    { en: "I prefer quality over quantity", es: "Prefiero calidad sobre cantidad" },
    { en: "I want to improve every week", es: "Quiero mejorar cada semana" },
    { en: "I do not give up under pressure", es: "No me rindo bajo presión" },
    { en: "Do you sleep eight hours?", es: "Duermes ocho horas?" },
    { en: "Do you also revise vocabulary? (formal)", es: "Revisa usted también el vocabulario?" },
    { en: "The results depend on effort", es: "Los resultados dependen del esfuerzo" },
    { en: "The teachers support us", es: "Los profesores nos apoyan" },
    { en: "I also believe in myself", es: "También creo en mí mismo" }
  ]
};

const deepCopy = obj => JSON.parse(JSON.stringify(obj));
const DATASETS = { Present: PRESENT, Past: deepCopy(PRESENT), Future: deepCopy(PRESENT) };

  // ===================== Global cheats =====================
  const clampCheats = n => Math.max(0, Math.min(GLOBAL_CHEATS_MAX, n|0));
  function getGlobalCheats(){
    const v = localStorage.getItem(GLOBAL_CHEATS_KEY);
    if (v == null) { localStorage.setItem(GLOBAL_CHEATS_KEY, String(GLOBAL_CHEATS_MAX)); return GLOBAL_CHEATS_MAX; }
    const n = parseInt(v,10);
    return Number.isFinite(n) ? clampCheats(n) : GLOBAL_CHEATS_MAX;
  }
  function setGlobalCheats(n){ localStorage.setItem(GLOBAL_CHEATS_KEY, String(clampCheats(n))); }

 // ===================== Compare =====================
const norm = s => (s || "").trim();
const endsWithQM = s => norm(s).endsWith("?");

// Accents REQUIRED; ñ ≡ n; CAPITALS IGNORED; ignore leading '¿' and a final '.' or '?'
function coreKeepAccents(s) {
  let t = norm(s);
  if (t.startsWith("¿")) t = t.slice(1);            // ignore opening ¿ if typed
  if (t.endsWith("?") || t.endsWith(".")) t = t.slice(0, -1); // ignore trailing ? or .
  t = t.replace(/ñ/gi, "n");                        // treat ñ as n
  t = t.toLowerCase();                              // ignore capitals
  return t.replace(/\s+/g, " ");                    // collapse spaces
}

// Require '?' ONLY if the EXPECTED Spanish is a question
function cmpAnswer(user, expected) {
  const expIsQ = endsWithQM(expected);
  if (expIsQ && !endsWithQM(user)) return false;    // enforce ? only for questions
  return coreKeepAccents(user) === coreKeepAccents(expected);
}

  // ===================== Best/unlocks (per tense) =====================
  const STORAGE_PREFIX = "tqplus:v3";
  const bestKey = (tense, lvl) => `${STORAGE_PREFIX}:best:${tense}:${lvl}`;
  function getBest(tense, lvl){ const v = localStorage.getItem(bestKey(tense,lvl)); const n = v==null?null:parseInt(v,10); return Number.isFinite(n)?n:null; }
  function saveBest(tense, lvl, score){ const prev = getBest(tense,lvl); if (prev==null || score<prev) localStorage.setItem(bestKey(tense,lvl), String(score)); }
  function isUnlocked(tense, lvl){ if (lvl===1) return true; const need = BASE_THRESH[lvl-1]; const prev = getBest(tense,lvl-1); return prev!=null && (need==null || prev<=need); }

  // ===================== Helpers =====================
  function shuffle(a){ a=a.slice(); for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]];} return a; }
  function speak(text, lang="es-ES"){ try{ if(!("speechSynthesis" in window)) return; const u=new SpeechSynthesisUtterance(text); u.lang=lang; window.speechSynthesis.cancel(); window.speechSynthesis.speak(u);}catch{} }
  let rec=null, recActive=false;
  function ensureRecognizer(){ const SR=window.SpeechRecognition||window.webkitSpeechRecognition; if(!SR) return null; if(!rec){ rec=new SR(); rec.lang="es-ES"; rec.interimResults=false; rec.maxAlternatives=1; } return rec; }
  function startDictationFor(input,onStatus){
    const r=ensureRecognizer(); if(!r){onStatus&&onStatus(false);return;}
    if(recActive){try{r.stop();}catch{} recActive=false; onStatus&&onStatus(false);}
    try{
      r.onresult=e=>{ const txt=(e.results[0]&&e.results[0][0]&&e.results[0][0].transcript)||""; const v=txt.trim(); input.value = v.endsWith("?")?v:(v+"?"); input.dispatchEvent(new Event("input",{bubbles:true})); };
      r.onend=()=>{recActive=false; onStatus&&onStatus(false);};
      recActive=true; onStatus&&onStatus(true); r.start();
    }catch{ onStatus&&onStatus(false); }
  }
  function miniBtn(text,title){ const b=document.createElement("button"); b.type="button"; b.textContent=text; b.title=title; b.setAttribute("aria-label",title);
    Object.assign(b.style,{fontSize:"0.85rem",lineHeight:"1",padding:"4px 8px",marginLeft:"6px",border:"1px solid #ddd",borderRadius:"8px",background:"#fff",cursor:"pointer",verticalAlign:"middle"}); return b; }

  // ===================== Celebration Styles & Helpers =====================
  function injectCelebrationCSS(){
    if (document.getElementById("tqplus-anim-style")) return;
    const css = `
    @keyframes tq-burst { 0%{transform:translateY(0) rotate(0)} 100%{transform:translateY(100vh) rotate(720deg); opacity:0} }
    @keyframes tq-pop { 0%{transform:scale(0.6); opacity:0} 25%{transform:scale(1.05); opacity:1} 60%{transform:scale(1)} 100%{opacity:0} }
    @keyframes tq-shake { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-6px)} 40%{transform:translateX(6px)} 60%{transform:translateX(-4px)} 80%{transform:translateX(4px)} }
    .tq-celebrate-overlay{ position:fixed; inset:0; z-index:9999; pointer-events:none; }
    .tq-confetti{ position:absolute; width:8px; height:14px; border-radius:2px; opacity:0.95; will-change:transform,opacity; animation:tq-burst 1600ms ease-out forwards; }
    .tq-perfect-banner{ position:fixed; left:50%; top:16%; transform:translateX(-50%); padding:10px 18px; border-radius:12px; font-weight:900; font-size:28px; letter-spacing:1px;
      color:#fff; background:linear-gradient(90deg,#ff2d55,#ff9f0a); box-shadow:0 10px 30px rgba(0,0,0,0.25); animation:tq-pop 1800ms ease-out forwards; text-shadow:0 1px 2px rgba(0,0,0,0.35); }
    .tq-shake{ animation:tq-shake 650ms ease-in-out; }
    `;
    const s=document.createElement("style"); s.id="tqplus-anim-style"; s.textContent=css; document.head.appendChild(s);
  }

  function showPerfectCelebration(){
    injectCelebrationCSS();
    // overlay
    const overlay = document.createElement("div");
    overlay.className = "tq-celebrate-overlay";
    document.body.appendChild(overlay);

    // make 120 confetti bits across width
    const COLORS = ["#ff2d55","#ff9f0a","#ffd60a","#34c759","#0a84ff","#bf5af2","#ff375f"];
    const W = window.innerWidth;
    for (let i=0; i<120; i++){
      const c = document.createElement("div");
      c.className = "tq-confetti";
      const size = 6 + Math.random()*8;
      c.style.width  = `${size}px`;
      c.style.height = `${size*1.4}px`;
      c.style.left   = `${Math.random()*W}px`;
      c.style.top    = `${-20 - Math.random()*120}px`;
      c.style.background = COLORS[i % COLORS.length];
      c.style.animationDelay = `${Math.random()*200}ms`;
      c.style.transform = `rotate(${Math.random()*360}deg)`;
      overlay.appendChild(c);
    }

    // banner
    const banner = document.createElement("div");
    banner.className = "tq-perfect-banner";
    banner.textContent = "PERFECT!";
    document.body.appendChild(banner);

    // cleanup after 2.2s
    setTimeout(()=>{ overlay.remove(); banner.remove(); }, 2200);
  }

  // ===================== UI flow =====================
  let CURRENT_TENSE = "Present";
  let quiz = [], currentLevel = null, t0=0, timerId=null, submitted=false;

  // attempt-local token tracking (commit on finish)
  let cheatsUsedThisRound = 0;
  let globalSnapshotAtStart = 0;
  const attemptRemaining = () => Math.max(0, globalSnapshotAtStart - cheatsUsedThisRound);

  function updateESButtonsState(container){
    const left = attemptRemaining();
    const esBtns = Array.from(container.querySelectorAll('button[data-role="es-tts"]'));
    esBtns.forEach(btn=>{
      const active = left>0;
      btn.disabled = !active;
      btn.style.opacity = active ? "1" : "0.5";
      btn.style.cursor  = active ? "pointer" : "not-allowed";
      btn.title = active ? `Read Spanish target (uses 1; attempt left: ${left})` : "No Spanish reads left for this attempt";
    });
  }

  function startTimer(){
    t0 = Date.now();
    clearInterval(timerId);
    timerId = setInterval(()=>{ const t=Math.floor((Date.now()-t0)/1000); const el=$("#timer"); if(el) el.textContent=`Time: ${t}s`; },200);
  }
  function stopTimer(){ clearInterval(timerId); timerId=null; return Math.floor((Date.now()-t0)/1000); }

  function renderLevels(){
    const host = $("#level-list"); if(!host) return;
    host.innerHTML = "";
    const ds = DATASETS[CURRENT_TENSE] || {};
    const available = Object.keys(ds).map(n=>parseInt(n,10)).filter(Number.isFinite).sort((a,b)=>a-b);
    available.forEach(i=>{
      const unlocked = isUnlocked(CURRENT_TENSE,i);
      const best = getBest(CURRENT_TENSE,i);
      const btn = document.createElement("button");
      btn.className="level-btn"; btn.disabled=!unlocked;
      btn.textContent = unlocked?`Level ${i}`:`🔒 Level ${i}`;
      if (unlocked && best!=null){
        const span=document.createElement("span"); span.className="best"; span.textContent=` (Best Score: ${best}s)`; btn.appendChild(span);
      }
      if (unlocked) btn.onclick=()=>startLevel(i);
      host.appendChild(btn);
    });
    host.style.display="flex"; const gm=$("#game"); if(gm) gm.style.display="none";
  }

  function startLevel(level){
    currentLevel = level; submitted=false; cheatsUsedThisRound=0; globalSnapshotAtStart=getGlobalCheats();
    const lv=$("#level-list"); if(lv) lv.style.display="none";
    const res=$("#results"); if(res) res.innerHTML="";
    const gm=$("#game"); if(gm) gm.style.display="block";

    const pool=(DATASETS[CURRENT_TENSE]?.[level])||[];
    const sample=Math.min(QUESTIONS_PER_ROUND,pool.length);
    quiz = shuffle(pool).slice(0,sample).map(it=>({prompt:it.en, answer:it.es, user:""}));

    renderQuiz(); startTimer();
  }

  function renderQuiz(){
    const qwrap=$("#questions"); if(!qwrap) return; qwrap.innerHTML="";
    quiz.forEach((q,i)=>{
      const row=document.createElement("div"); row.className="q";

      const p=document.createElement("div"); p.className="prompt"; p.textContent=`${i+1}. ${q.prompt}`;
      const controls=document.createElement("span");
      Object.assign(controls.style,{display:"inline-block",marginLeft:"6px",verticalAlign:"middle"});

      const enBtn=miniBtn("🔈 EN","Read English prompt"); enBtn.onclick=()=>speak(q.prompt,"en-GB");
      const esBtn=miniBtn("🔊 ES","Read Spanish target (uses 1 this attempt)"); esBtn.setAttribute("data-role","es-tts");
      esBtn.onclick=()=>{ if (attemptRemaining()<=0){ updateESButtonsState(qwrap); return; } speak(q.answer,"es-ES"); cheatsUsedThisRound+=1; updateESButtonsState(qwrap); };
      const micBtn=miniBtn("🎤","Dictate into this answer"); micBtn.onclick=()=>{ startDictationFor(input,(on)=>{ micBtn.style.borderColor=on?"#f39c12":"#ddd"; micBtn.style.boxShadow=on?"0 0 0 2px rgba(243,156,18,0.25)":"none"; }); };

      controls.appendChild(enBtn); controls.appendChild(esBtn); controls.appendChild(micBtn); p.appendChild(controls);

      const input=document.createElement("input"); input.type="text"; input.placeholder="Type the Spanish here (must end with ?)";
      input.oninput=e=>{ quiz[i].user=e.target.value; };
      input.addEventListener("keydown",(e)=>{ if(e.altKey && !e.shiftKey && !e.ctrlKey && !e.metaKey){ if(e.code==="KeyR"){e.preventDefault();enBtn.click();} else if(e.code==="KeyS"){e.preventDefault();esBtn.click();} else if(e.code==="KeyM"){e.preventDefault();micBtn.click();} }});

      row.appendChild(p); row.appendChild(input); qwrap.appendChild(row);
    });
    updateESButtonsState(qwrap);

    const submit=$("#submit"); if(submit){ submit.disabled=false; submit.textContent="Finish & Check"; submit.onclick=finishAndCheck; }
    const back=$("#back-button"); if(back){ back.style.display="inline-block"; back.onclick=backToLevels; }
  }

  function finishAndCheck(){
    if (submitted) return; submitted=true;

    const elapsed=stopTimer();
    const inputs=$$("#questions input"); inputs.forEach((inp,i)=>{ quiz[i].user=inp.value; });

    let correct=0, wrong=0;
    quiz.forEach((q,i)=>{ const ok=cmpAnswer(q.user,q.answer); if(ok) correct++; else wrong++; inputs[i].classList.remove("good","bad"); inputs[i].classList.add(ok?"good":"bad"); inputs[i].readOnly=true; inputs[i].disabled=true; });

    const penalties = wrong*PENALTY_PER_WRONG;
    const finalScore = elapsed + penalties;

    const submit=$("#submit"); if(submit){ submit.disabled=true; submit.textContent="Checked"; }

    // Unlock message
    let unlockMsg="";
    if (currentLevel<10){
      const need=BASE_THRESH[currentLevel];
      if (typeof need==="number"){
        if (finalScore<=need) unlockMsg=`🎉 Next level unlocked! (Needed ≤ ${need}s)`;
        else unlockMsg=`🔓 Need ${finalScore-need}s less to unlock Level ${currentLevel+1} (Target ≤ ${need}s).`;
      }
    } else unlockMsg="🏁 Final level — great work!";

    // ===== Commit global tokens now =====
    const before = getGlobalCheats();
    let after = clampCheats(globalSnapshotAtStart - cheatsUsedThisRound);
    const perfect = (correct===quiz.length);
    if (perfect && after<GLOBAL_CHEATS_MAX) after = clampCheats(after+1);
    setGlobalCheats(after);

    // Results UI
    const results=$("#results"); if(!results) return;
    const summary=document.createElement("div"); summary.className="result-summary";
    summary.innerHTML =
      `<div class="line" style="font-size:1.35rem; font-weight:800;">🏁 FINAL SCORE: ${finalScore}s</div>
       <div class="line">⏱️ Time: <strong>${elapsed}s</strong></div>
       <div class="line">➕ Penalties: <strong>${wrong} × ${PENALTY_PER_WRONG}s = ${penalties}s</strong></div>
       <div class="line">✅ Correct: <strong>${correct}/${quiz.length}</strong></div>
       <div class="line" style="margin-top:8px;"><strong>${unlockMsg}</strong></div>
       <div class="line" style="margin-top:8px;">🎧 Spanish reads used this round: <strong>${cheatsUsedThisRound}</strong> &nbsp;|&nbsp; Global after commit: <strong>${after}/${GLOBAL_CHEATS_MAX}</strong></div>`;

    // Celebrate on perfect
    if (perfect){
      showPerfectCelebration();
      // subtle shake on the summary box so it "feels" like a win
      summary.classList.add("tq-shake");
      const bonusNote = document.createElement("div");
      bonusNote.className = "line";
      bonusNote.style.marginTop = "6px";
      bonusNote.innerHTML = (after>before)
        ? `⭐ Perfect round! Spanish-read tokens: ${before} → ${after} (max ${GLOBAL_CHEATS_MAX}).`
        : `⭐ Perfect round! (Spanish-read tokens already at max ${GLOBAL_CHEATS_MAX}).`;
      summary.appendChild(bonusNote);
    }

    const ul=document.createElement("ul");
    quiz.forEach(q=>{
      const li=document.createElement("li"); const ok=cmpAnswer(q.user,q.answer);
      li.className=ok?"correct":"incorrect";
      li.innerHTML = `${q.prompt} — <strong>${q.answer}</strong>` + (ok?"":` &nbsp;❌&nbsp;(you: “${q.user||""}”)`);
      ul.appendChild(li);
    });

    const again=document.createElement("button");
    again.className="try-again"; again.textContent="Try Again"; again.onclick=()=>startLevel(currentLevel);

    results.innerHTML=""; results.appendChild(summary); results.appendChild(ul); results.appendChild(again);

    saveBest(CURRENT_TENSE,currentLevel,finalScore);
    summary.scrollIntoView({behavior:"smooth",block:"start"});
  }

  function backToLevels(){ stopTimer(); const gm=$("#game"); if(gm) gm.style.display="none"; renderLevels(); }

  // ===================== Init =====================
  document.addEventListener("DOMContentLoaded", ()=>{
    // init global cheats
    setGlobalCheats(getGlobalCheats());

    // tense switching (present-based datasets across all)
    $$("#tense-buttons .tense-button").forEach(btn=>{
      btn.addEventListener("click", e=>{
        e.preventDefault();
        const t = btn.dataset.tense || btn.textContent.trim();
        if (!DATASETS[t]) return;
        $$("#tense-buttons .tense-button").forEach(b=>b.classList.remove("active"));
        btn.classList.add("active");
        CURRENT_TENSE = t;
        backToLevels();
      });
    });

    // default active
    const presentBtn = $(`#tense-buttons .tense-button[data-tense="Present"]`) || $$("#tense-buttons .tense-button")[0];
    if (presentBtn) presentBtn.classList.add("active");

    renderLevels();
  });
})();
