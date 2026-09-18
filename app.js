const subjects=[
["🌍","GK","General Knowledge"],["🗺️","Geography","Indian & World Geography"],["🏛️","Polity","Indian Polity & Constitution"],["📖","History","Indian & World History"],["⚗️","Science","Physics, Chemistry, Biology"],["🧮","Maths","Arithmetic & Advance"],["🧠","Reasoning","Logical & Analytical"],["अ","Hindi","Hindi Grammar & Literature"],["🇬🇧","English","Grammar & Vocabulary"],["💰","Economics","Indian Economy"],["🎨","Indian Art & Culture","Culture, Heritage & Art"]];

const questions={
GK:[
["भारत का राष्ट्रीय पशु कौन है?",["बाघ","सिंह","हाथी","मोर"],0,"भारत का राष्ट्रीय पशु बाघ है।"],
["भारत की राजधानी क्या है?",["मुंबई","नई दिल्ली","कोलकाता","चेन्नई"],1,"भारत की राजधानी नई दिल्ली है।"],
["भारतीय राष्ट्रीय ध्वज में कितने रंग हैं?",["2","3","4","5"],1,"राष्ट्रीय ध्वज में तीन मुख्य रंग हैं।"]
],
History:[
["भारतीय संविधान कब लागू हुआ?",["15 अगस्त 1947","26 जनवरी 1950","26 नवंबर 1949","2 अक्टूबर 1950"],1,"संविधान 26 जनवरी 1950 को लागू हुआ।"],
["भारत छोड़ो आंदोलन किस वर्ष शुरू हुआ?",["1930","1940","1942","1947"],2,"भारत छोड़ो आंदोलन अगस्त 1942 में शुरू हुआ।"]
],
Geography:[
["भारत का सबसे बड़ा राज्य क्षेत्रफल के आधार पर कौन सा है?",["मध्य प्रदेश","राजस्थान","उत्तर प्रदेश","महाराष्ट्र"],1,"क्षेत्रफल के आधार पर राजस्थान सबसे बड़ा राज्य है।"],
["गंगा नदी का उद्गम किस हिमनद से माना जाता है?",["सियाचिन","गंगोत्री","यमुनोत्री","पिंडारी"],1,"भागीरथी का उद्गम गंगोत्री हिमनद से माना जाता है।"]
],
Polity:[
["भारत का संविधान किस दिन अपनाया गया था?",["15 अगस्त 1947","26 जनवरी 1950","26 नवंबर 1949","2 अक्टूबर 1950"],2,"संविधान सभा ने 26 नवंबर 1949 को संविधान अपनाया।"],
["भारत में राष्ट्रपति का चुनाव कौन करता है?",["केवल लोकसभा","केवल राज्यसभा","निर्वाचक मंडल","सुप्रीम कोर्ट"],2,"राष्ट्रपति का चुनाव निर्वाचक मंडल करता है।"]
],
Science:[
["जल का रासायनिक सूत्र क्या है?",["CO₂","H₂O","O₂","NaCl"],1,"जल का रासायनिक सूत्र H₂O है।"],
["मानव शरीर में रक्त को पंप करने वाला अंग कौन है?",["फेफड़ा","हृदय","यकृत","गुर्दा"],1,"हृदय रक्त को पूरे शरीर में पंप करता है।"]
],
Maths:[
["25 का 20% कितना है?",["4","5","10","20"],1,"25 × 20/100 = 5."],
["यदि किसी संख्या का 10% = 15 है, तो संख्या क्या होगी?",["100","120","150","200"],2,"15 × 100/10 = 150."]
],
Reasoning:[
["श्रृंखला: 2, 4, 8, 16, ?",["20","24","32","36"],2,"हर संख्या को 2 से गुणा किया गया है।"],
["यदि CAT को DBU लिखा जाए, तो DOG को क्या लिखा जाएगा?",["EPH","EOH","FPH","DPG"],0,"हर अक्षर में 1 जोड़ा गया है: D→E, O→P, G→H."]
],
Hindi:[
["'सुंदर' का विलोम क्या है?",["अच्छा","कुरूप","सरल","मधुर"],1,"सुंदर का विलोम कुरूप है।"],
["'जल' का पर्यायवाची कौन सा है?",["अग्नि","नीर","वायु","धरती"],1,"जल का पर्यायवाची नीर है।"]
],
English:[
["Choose the correct spelling:",["Recieve","Receive","Receeve","Receve"],1,"The correct spelling is Receive."],
["Opposite of 'Ancient' is:",["Old","Historic","Modern","Past"],2,"The opposite of Ancient is Modern."]
],
Economics:[
["भारत की मुद्रा क्या है?",["डॉलर","रुपया","येन","पाउंड"],1,"भारत की आधिकारिक मुद्रा भारतीय रुपया है।"]
],
"Indian Art & Culture":[
["भरतनाट्यम किस राज्य की प्रमुख शास्त्रीय नृत्य शैली है?",["केरल","तमिलनाडु","असम","ओडिशा"],1,"भरतनाट्यम तमिलनाडु से संबंधित शास्त्रीय नृत्य शैली है।"]
]};

let stats=JSON.parse(localStorage.getItem("nlqStats")||'{"attempted":0,"correct":0,"subjects":{}}');
stats.subjects=stats.subjects||{};
let bookmarks=JSON.parse(localStorage.getItem("nlqBookmarks")||'[]');
let current=null, index=0, score=0, timer=null, seconds=30, selectedSubject=null, selectedQuiz=1;
let quizSets={};


const $=s=>document.querySelector(s);
function show(id){
 document.querySelectorAll(".screen").forEach(x=>x.classList.remove("active"));
 $("#"+id).classList.add("active");
 document.querySelectorAll(".nav").forEach(x=>x.classList.toggle("active",x.dataset.open===id));
 window.scrollTo(0,0);
 if(id==="progress") renderStats();
}
document.querySelectorAll("[data-open]").forEach(b=>b.addEventListener("click",()=>show(b.dataset.open)));
document.querySelectorAll(".back").forEach(b=>b.addEventListener("click",()=>show("home")));

$("#subjects").innerHTML=subjects.map(s=>`<button class="subject" data-sub="${s[1]}"><span class="ico">${s[0]}</span><span><b>${s[1]}</b><small>${s[2]}</small></span><span class="arrow">›</span></button>`).join("");
$("#quizSubjects").innerHTML=subjects.map(s=>`<button class="qsub" data-qsub="${s[1]}">${s[0]} ${s[1]}<small>${s[2]}</small></button>`).join("");

document.querySelectorAll("[data-sub]").forEach(b=>b.addEventListener("click",()=>{show("quiz");openQuizList(b.dataset.sub)}));
document.querySelectorAll("[data-qsub]").forEach(b=>b.addEventListener("click",()=>openQuizList(b.dataset.qsub)));

function renderStats(){
 $("#attempted").textContent=stats.attempted;
 $("#correct").textContent=stats.correct;
 $("#accuracy").textContent=stats.attempted?Math.round(stats.correct/stats.attempted*100)+"%":"0%";
 $("#progressText").textContent=stats.attempted?`आपने ${stats.attempted} questions attempt किए हैं और ${stats.correct} सही किए हैं।`:"अभी कोई quiz attempt नहीं किया गया है।";
 const box=$("#subjectProgress"); if(!box)return;
 box.innerHTML=subjects.map(s=>{const x=stats.subjects[s[1]]||{a:0,c:0}; const pct=x.a?Math.round(x.c/x.a*100):0; return `<div class="sp-row"><div class="sp-head"><span>${s[0]} ${s[1]}</span><span>${x.a?`${x.c}/${x.a} • ${pct}%`:'No attempts'}</span></div><div class="sp-bar"><div class="sp-fill" style="width:${pct}%"></div></div></div>`}).join('');
}

function openQuizList(subject){
 selectedSubject=subject;
 $("#quiz-select").hidden=true;
 $("#quiz-area").hidden=false;
 renderQuizList(subject);
}
function renderQuizList(subject){
 const sets=quizSets[subject]||{};
 const available=Object.keys(sets).map(Number);
 $("#quiz-area").innerHTML=`<div class="quiz-list-head"><button class="secondary" id="backSubjects">← Subjects</button><div><h3>${subject} Quiz</h3><p>20 अलग-अलग quizzes में practice करो।</p></div></div><div class="quiz-grid">${Array.from({length:20},(_,i)=>{const n=i+1, has=available.includes(n); return `<button class="quiz-card ${has?'ready':'locked'}" data-quiz="${n}" ${has?'':'disabled'}><span class="quiz-number">${n}</span><span><b>Quiz ${n}</b><small>${has?`${sets[n].length} Questions`:'Coming Soon'}</small></span><span class="quiz-arrow">${has?'›':'🔒'}</span></button>`}).join('')}</div>`;
 $("#backSubjects").onclick=()=>{ $("#quiz-area").hidden=true; $("#quiz-select").hidden=false; };
 document.querySelectorAll('[data-quiz]').forEach(b=>b.addEventListener('click',()=>startQuiz(selectedSubject,+b.dataset.quiz)));
}
function startQuiz(subject,quizNo=1){
 selectedSubject=subject; selectedQuiz=quizNo;
 current=(quizSets[subject]&&quizSets[subject][quizNo])||questions[subject]||questions.GK; index=0; score=0; clearInterval(timer);
 $("#quiz-select").hidden=true; $("#quiz-area").hidden=false; drawQuestion();
}
// ===== V8 Reliable Answer Sound Engine =====
let nlqAudioCtx = null;

function getQuizAudioContext(){
  try{
    if(!nlqAudioCtx){
      const AC = window.AudioContext || window.webkitAudioContext;
      if(!AC) return null;
      nlqAudioCtx = new AC();
    }
    if(nlqAudioCtx.state === "suspended"){
      nlqAudioCtx.resume().catch(()=>{});
    }
    return nlqAudioCtx;
  }catch(e){
    return null;
  }
}

function playTone(ctx, freq, start, duration, type="sine", volume=0.34){
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, start);
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(volume, start + 0.018);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(start);
  osc.stop(start + duration + 0.03);
}

function playAnswerSound(isCorrect){
  const ctx = getQuizAudioContext();
  if(!ctx) return;

  const now = ctx.currentTime + 0.01;

  try{
    if(isCorrect){
      // Bright, punchy "success" chime
      playTone(ctx, 523.25, now, 0.18, "sine", 0.48);
      playTone(ctx, 659.25, now + 0.10, 0.20, "sine", 0.50);
      playTone(ctx, 783.99, now + 0.20, 0.30, "sine", 0.46);
    }else{
      // Clearly audible short "wrong" buzzer
      playTone(ctx, 260, now, 0.22, "square", 0.42);
      playTone(ctx, 185, now + 0.13, 0.30, "sawtooth", 0.40);
    }
  }catch(e){}
}

// Unlock/resume audio after the first user interaction.
document.addEventListener("pointerdown", () => {
  const ctx = getQuizAudioContext();
  if(ctx && ctx.state === "suspended") ctx.resume().catch(()=>{});
}, {once:false, passive:true});

function shuffleOptions(q){
 const pairs=q[1].map((text,i)=>({text,index:i}));
 for(let i=pairs.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[pairs[i],pairs[j]]=[pairs[j],pairs[i]];}
 return {texts:pairs.map(x=>x.text), correct:pairs.findIndex(x=>x.index===q[2])};
}
function drawQuestion(){
 if(index>=current.length){finishQuiz();return}
 seconds=30; clearInterval(timer);
 const q=current[index];
 const shuffled=shuffleOptions(q);
 const displayedQ=[q[0],shuffled.texts,shuffled.correct,q[3]];
 window.displayedQuestion=displayedQ;
 const bmKey=`${selectedSubject}__${selectedQuiz}__${index}__${q[0]}`;
 const marked=bookmarks.some(b=>b.key===bmKey);
 $("#quiz-area").innerHTML=`<div class="quiz-top"><span>Question ${index+1} / ${current.length}</span><span class="timer">⏱️ <b id="time">30</b>s</span></div><div class="panel"><div class="quiz-question-head"><div class="question"><b>${q[0]}</b></div><button class="quiz-bookmark" id="bookmarkBtn" title="Bookmark">${marked?'🔖':'🔖'}</button></div>${shuffled.texts.map((o,i)=>`<button class="option" data-i="${i}">${String.fromCharCode(65+i)}. ${o}</button>`).join("")}<div id="exp"></div></div>`;
 $("#bookmarkBtn").onclick=()=>toggleBookmark(bmKey,q);
 document.querySelectorAll(".option").forEach(btn=>btn.addEventListener("click",()=>answer(+btn.dataset.i)));
 timer=setInterval(()=>{seconds--; $("#time").textContent=seconds;if(seconds<=0){clearInterval(timer);answer(-1)}},1000);
}
let nextQuestionTimer=null;
function goToNextQuestion(){
 clearTimeout(nextQuestionTimer);
 nextQuestionTimer=null;
 index++;
 drawQuestion();
}
function answer(chosen){
 clearInterval(timer);
 clearTimeout(nextQuestionTimer);
 nextQuestionTimer=null;
 const q=window.displayedQuestion||current[index], opts=document.querySelectorAll(".option");
 opts.forEach(b=>b.disabled=true);
 stats.attempted++;
 const isCorrect = chosen===q[2];
 const sub=selectedSubject||"GK"; stats.subjects[sub]=stats.subjects[sub]||{a:0,c:0}; stats.subjects[sub].a++;
 if(isCorrect){
   score++;stats.correct++; stats.subjects[sub].c++;
   if(chosen>=0)opts[chosen].classList.add("correct");
   playAnswerSound(true);
   // Correct answer: automatically move to the next question after 1.5 seconds.
   $("#exp").innerHTML=`<div class="explain">💡 ${q[3]}</div><div class="auto-next">अगला प्रश्न 1.5 सेकंड में…</div>`;
   nextQuestionTimer=setTimeout(goToNextQuestion,1500);
 }else{
   if(chosen>=0)opts[chosen].classList.add("wrong");
   if(q[2]>=0)opts[q[2]].classList.add("correct");
   playAnswerSound(false);
   // Wrong answer: show a larger Next button aligned to the right.
   $("#exp").innerHTML=`<div class="explain">💡 ${q[3]}</div><div class="next-row"><button class="primary next-big" id="next">Next →</button></div>`;
   $("#next").onclick=goToNextQuestion;
 }
 localStorage.setItem("nlqStats",JSON.stringify(stats));
}

function renderCurrentAffairsMonths(){
 const wrap=document.getElementById("currentMonths");
 if(!wrap || typeof currentAffairsMonths==='undefined') return;
 const keys=Object.keys(currentAffairsMonths);
 wrap.innerHTML=keys.map((m,i)=>`<button class="ca-month-card" data-ca-month="${m}"><span class="ca-folder">📁</span><span><b>${m}</b><small>${currentAffairsMonths[m].length} Questions • Mixed Topics</small></span><span class="ca-arrow">›</span></button>`).join("");
 wrap.querySelectorAll('[data-ca-month]').forEach(b=>b.onclick=()=>startCurrentAffairs(b.dataset.caMonth));
}
function startCurrentAffairs(month){
 selectedSubject=`Current Affairs • ${month}`;
 selectedQuiz=0;
 current=(currentAffairsMonths&&currentAffairsMonths[month])||[];
 index=0; score=0; clearInterval(timer);
 document.getElementById('current-area').innerHTML=`<div class="quiz-list-head"><button class="secondary" id="backCAMonths">← Months</button><div><h3>📰 ${month}</h3><p>100 exam-oriented current affairs questions</p></div></div><div id="caQuizArea"></div>`;
 const qa=document.getElementById('caQuizArea');
 const old=document.getElementById('quiz-area');
 // Reuse the existing quiz renderer while keeping the Current Affairs screen visible.
 old.hidden=false;
 old.innerHTML='';
 document.getElementById('backCAMonths').onclick=()=>{clearInterval(timer); document.getElementById('current-area').innerHTML=`<div class="panel center"><div class="big-icon">📰</div><h3>Monthly Current Affairs</h3><p>पिछले 12 महीनों को month-wise खोलकर 100-100 questions practice करो।</p></div><div id="currentMonths" class="ca-month-grid"></div>`; renderCurrentAffairsMonths();};
 document.getElementById('current').querySelector('#current-area').style.display='none';
 const qscreen=document.getElementById('quiz'); qscreen.classList.add('active');
 drawQuestion();
}
renderCurrentAffairsMonths();

function finishQuiz(){
 clearInterval(timer);
 const total=current.length;
 const percent=total?Math.round((score/total)*100):0;
 const wrong=total-score;
 let badge=percent>=90?'🏆 Excellent!':percent>=75?'🔥 Great Job!':percent>=50?'💪 Keep Practicing!':'📚 Practice More!';
 $("#quiz-area").innerHTML=`
 <div class="result-wrap">
   <div class="result-hero">
     <div class="result-glow"></div>
     <div class="result-icon">🎉</div>
     <div class="result-badge">${badge}</div>
     <h2>Quiz Complete!</h2>
     <p>आपने quiz पूरा कर लिया है। नीचे अपना performance देखें।</p>
     <div class="score-ring" style="--percent:${percent}%"><div><strong>${percent}%</strong><span>Accuracy</span></div></div>
   </div>
   <div class="result-stats">
     <div class="result-stat correct-stat"><span>✓</span><b>${score}</b><small>सही</small></div>
     <div class="result-stat wrong-stat"><span>×</span><b>${wrong}</b><small>गलत</small></div>
     <div class="result-stat total-stat"><span>📝</span><b>${total}</b><small>कुल प्रश्न</small></div>
   </div>
   <div class="result-message">${percent>=75?'बहुत बढ़िया! इसी consistency के साथ practice जारी रखो। 🚀':'कोई बात नहीं! गलत questions को दोबारा पढ़ो और फिर Try Again करो। 📖'}</div>
   <div class="result-actions"><button class="primary" id="again">🔄 Try Again</button><button class="secondary" id="subjectsAgain">📚 ${String(selectedSubject).startsWith('Current Affairs')?'Months':'Subjects'}</button></div>
 </div>`;
 $("#again").onclick=()=>{index=0;score=0;drawQuestion()};
 $("#subjectsAgain").onclick=()=>{clearInterval(timer);renderQuizList(selectedSubject)};
 renderStats();
}
renderStats();


/* ===== V3 competitive question bank override ===== */
const competitiveQuestionBank = {
  "GK": [
    {
      "q": "भारतीय संविधान को संविधान सभा ने कब अंगीकृत किया था?",
      "options": [
        "26 नवंबर 1949",
        "15 अगस्त 1947",
        "26 जनवरी 1950",
        "9 दिसंबर 1946"
      ],
      "answer": "A",
      "explanation": "26 नवंबर 1949 को संविधान सभा ने संविधान को अंगीकृत किया; 26 जनवरी 1950 को लागू हुआ।"
    },
    {
      "q": "भारत का राष्ट्रीय जलीय जीव कौन-सा है?",
      "options": [
        "गंगा डॉल्फिन",
        "मगरमच्छ",
        "नीली व्हेल",
        "ऑलिव रिडले कछुआ"
      ],
      "answer": "A",
      "explanation": "गंगा नदी की डॉल्फिन भारत का राष्ट्रीय जलीय जीव है।"
    },
    {
      "q": "भारतीय रिजर्व बैंक की स्थापना किस वर्ष हुई थी?",
      "options": [
        "1935",
        "1947",
        "1949",
        "1950"
      ],
      "answer": "A",
      "explanation": "RBI की स्थापना 1 अप्रैल 1935 को हुई थी।"
    },
    {
      "q": "हरित क्रांति में उच्च उपज वाली किस्मों का प्रमुख प्रभाव किन फसलों पर पड़ा?",
      "options": [
        "गेहूँ और चावल",
        "चाय और कॉफी",
        "कपास और जूट",
        "गन्ना और तंबाकू"
      ],
      "answer": "A",
      "explanation": "HYV बीजों का विशेष प्रभाव गेहूँ और चावल के उत्पादन पर पड़ा।"
    },
    {
      "q": "'सत्यमेव जयते' किस उपनिषद से लिया गया है?",
      "options": [
        "मुंडक उपनिषद",
        "ईश उपनिषद",
        "केन उपनिषद",
        "कठ उपनिषद"
      ],
      "answer": "A",
      "explanation": "'सत्यमेव जयते' मुंडक उपनिषद से लिया गया है।"
    },
    {
      "q": "भारत का सबसे बड़ा मरुस्थल कौन-सा है?",
      "options": [
        "थार",
        "सहारा",
        "गोबी",
        "कालाहारी"
      ],
      "answer": "A",
      "explanation": "थार मरुस्थल भारत का प्रमुख और सबसे बड़ा मरुस्थलीय क्षेत्र है।"
    },
    {
      "q": "भारतीय संसद के संयुक्त अधिवेशन की अध्यक्षता कौन करता है?",
      "options": [
        "लोकसभा अध्यक्ष",
        "राज्यसभा सभापति",
        "राष्ट्रपति",
        "प्रधानमंत्री"
      ],
      "answer": "A",
      "explanation": "संयुक्त बैठक की अध्यक्षता लोकसभा अध्यक्ष करते हैं।"
    },
    {
      "q": "विटामिन C की कमी से कौन-सा रोग होता है?",
      "options": [
        "स्कर्वी",
        "रिकेट्स",
        "बेरी-बेरी",
        "रातांधता"
      ],
      "answer": "A",
      "explanation": "विटामिन C की कमी से स्कर्वी होता है।"
    },
    {
      "q": "पृथ्वी के वायुमंडल में सर्वाधिक मात्रा में कौन-सी गैस है?",
      "options": [
        "नाइट्रोजन",
        "ऑक्सीजन",
        "आर्गन",
        "कार्बन डाइऑक्साइड"
      ],
      "answer": "A",
      "explanation": "शुष्क वायुमंडल में नाइट्रोजन लगभग 78% होती है।"
    },
    {
      "q": "'जय जवान, जय किसान' का नारा किसने दिया था?",
      "options": [
        "लाल बहादुर शास्त्री",
        "जवाहरलाल नेहरू",
        "इंदिरा गांधी",
        "मोरारजी देसाई"
      ],
      "answer": "A",
      "explanation": "लाल बहादुर शास्त्री ने यह प्रसिद्ध नारा दिया था।"
    }
  ],
  "History": [
    {
      "q": "प्लासी का युद्ध किस वर्ष हुआ था?",
      "options": [
        "1757",
        "1764",
        "1857",
        "1748"
      ],
      "answer": "A",
      "explanation": "प्लासी का युद्ध 23 जून 1757 को हुआ था।"
    },
    {
      "q": "स्थायी बंदोबस्त किसने लागू किया था?",
      "options": [
        "लॉर्ड कॉर्नवालिस",
        "लॉर्ड वेलेजली",
        "लॉर्ड डलहौजी",
        "वॉरेन हेस्टिंग्स"
      ],
      "answer": "A",
      "explanation": "1793 में लॉर्ड कॉर्नवालिस ने स्थायी बंदोबस्त लागू किया।"
    },
    {
      "q": "बंगाल में द्वैध शासन किसने शुरू किया था?",
      "options": [
        "रॉबर्ट क्लाइव",
        "वॉरेन हेस्टिंग्स",
        "कॉर्नवालिस",
        "डलहौजी"
      ],
      "answer": "A",
      "explanation": "1765 के बाद रॉबर्ट क्लाइव ने बंगाल में द्वैध शासन शुरू किया।"
    },
    {
      "q": "भारतीय राष्ट्रीय कांग्रेस की स्थापना किस वर्ष हुई?",
      "options": [
        "1885",
        "1887",
        "1905",
        "1911"
      ],
      "answer": "A",
      "explanation": "भारतीय राष्ट्रीय कांग्रेस की स्थापना 1885 में हुई।"
    },
    {
      "q": "चंपारण सत्याग्रह मुख्यतः किस फसल से जुड़े किसानों के प्रश्न से संबंधित था?",
      "options": [
        "नील",
        "कपास",
        "जूट",
        "चाय"
      ],
      "answer": "A",
      "explanation": "चंपारण में नील की खेती से जुड़े किसानों का प्रश्न प्रमुख था।"
    },
    {
      "q": "असहयोग आंदोलन किस घटना के बाद वापस लिया गया?",
      "options": [
        "चौरी-चौरा",
        "जलियांवाला बाग",
        "काकोरी",
        "साइमन कमीशन"
      ],
      "answer": "A",
      "explanation": "चौरी-चौरा की हिंसक घटना के बाद 1922 में आंदोलन वापस लिया गया।"
    },
    {
      "q": "भारत छोड़ो आंदोलन का प्रस्ताव किस वर्ष पारित हुआ?",
      "options": [
        "1942",
        "1939",
        "1940",
        "1946"
      ],
      "answer": "A",
      "explanation": "अगस्त 1942 में भारत छोड़ो आंदोलन का प्रस्ताव पारित हुआ।"
    },
    {
      "q": "सांची स्तूप का मूल निर्माण किस शासक के समय से जोड़ा जाता है?",
      "options": [
        "अशोक",
        "कनिष्क",
        "समुद्रगुप्त",
        "हर्षवर्धन"
      ],
      "answer": "A",
      "explanation": "सांची के महान स्तूप का मूल निर्माण अशोक के समय से जोड़ा जाता है।"
    },
    {
      "q": "'इंडिका' का लेखक कौन था?",
      "options": [
        "मेगस्थनीज",
        "फाह्यान",
        "ह्वेनसांग",
        "अल-बिरूनी"
      ],
      "answer": "A",
      "explanation": "मेगस्थनीज ने मौर्यकालीन भारत पर 'इंडिका' लिखी।"
    },
    {
      "q": "स्वदेशी आंदोलन का तात्कालिक प्रमुख कारण क्या था?",
      "options": [
        "बंगाल विभाजन",
        "रॉलेट एक्ट",
        "साइमन कमीशन",
        "दांडी मार्च"
      ],
      "answer": "A",
      "explanation": "1905 के बंगाल विभाजन के विरोध में स्वदेशी आंदोलन तेज हुआ।"
    }
  ],
  "Geography": [
    {
      "q": "दक्षिण-पश्चिम मानसून की दो मुख्य शाखाएँ कौन-सी हैं?",
      "options": [
        "अरब सागर और बंगाल की खाड़ी",
        "हिंद महासागर और अरब सागर",
        "बंगाल की खाड़ी और प्रशांत महासागर",
        "अरब सागर और लाल सागर"
      ],
      "answer": "A",
      "explanation": "मानसून की मुख्य शाखाएँ अरब सागर और बंगाल की खाड़ी की हैं।"
    },
    {
      "q": "काली मिट्टी किस फसल के लिए विशेष रूप से उपयुक्त मानी जाती है?",
      "options": [
        "कपास",
        "चाय",
        "जूट",
        "गेहूँ"
      ],
      "answer": "A",
      "explanation": "काली मिट्टी की नमी धारण क्षमता के कारण यह कपास के लिए उपयुक्त है।"
    },
    {
      "q": "नर्मदा नदी किस प्रकार की घाटी से होकर बहती है?",
      "options": [
        "भ्रंश घाटी",
        "हिमानी घाटी",
        "डेल्टा घाटी",
        "कार्स्ट घाटी"
      ],
      "answer": "A",
      "explanation": "नर्मदा एक भ्रंश घाटी (rift valley) में बहती है।"
    },
    {
      "q": "राज्यवार भारत का सबसे लंबा समुद्रतट किस राज्य के पास है?",
      "options": [
        "गुजरात",
        "महाराष्ट्र",
        "आंध्र प्रदेश",
        "तमिलनाडु"
      ],
      "answer": "A",
      "explanation": "राज्यवार समुद्रतट लंबाई के संदर्भ में गुजरात सबसे आगे है।"
    },
    {
      "q": "सुंदरबन डेल्टा मुख्यतः किन नदियों की प्रणाली से बनता है?",
      "options": [
        "गंगा-ब्रह्मपुत्र-मेघना",
        "नर्मदा-ताप्ती",
        "गोदावरी-कृष्णा",
        "महानदी-ब्राह्मणी"
      ],
      "answer": "A",
      "explanation": "गंगा-ब्रह्मपुत्र-मेघना नदी तंत्र सुंदरबन डेल्टा बनाता है।"
    },
    {
      "q": "भारत में अत्यधिक वर्षा मुख्यतः किस जलवायु व्यवस्था से जुड़ी है?",
      "options": [
        "मानसूनी",
        "भूमध्यसागरीय",
        "टुंड्रा",
        "मरुस्थलीय"
      ],
      "answer": "A",
      "explanation": "भारत की अत्यधिक वर्षा मुख्यतः मानसूनी पवनों से जुड़ी है।"
    },
    {
      "q": "दक्कन का पठार मुख्यतः किस प्रकार की चट्टानों से संबंधित है?",
      "options": [
        "आग्नेय एवं रूपांतरित",
        "केवल अवसादी",
        "केवल चूना-पत्थर",
        "केवल बलुआ पत्थर"
      ],
      "answer": "A",
      "explanation": "दक्कन का बड़ा भाग बेसाल्ट जैसी आग्नेय चट्टानों से बना है।"
    },
    {
      "q": "कर्क रेखा भारत के कितने राज्यों से होकर गुजरती है?",
      "options": [
        "8",
        "6",
        "7",
        "9"
      ],
      "answer": "A",
      "explanation": "कर्क रेखा भारत के 8 राज्यों से होकर गुजरती है।"
    },
    {
      "q": "भारत में चाय उत्पादन के लिए प्रसिद्ध राज्य कौन-सा है?",
      "options": [
        "असम",
        "राजस्थान",
        "हरियाणा",
        "पंजाब"
      ],
      "answer": "A",
      "explanation": "असम भारत के प्रमुख चाय उत्पादक क्षेत्रों में है।"
    },
    {
      "q": "गोदावरी नदी का उद्गम कहाँ के निकट है?",
      "options": [
        "त्र्यंबकेश्वर",
        "अमरकंटक",
        "महाबलेश्वर",
        "मानसरोवर"
      ],
      "answer": "A",
      "explanation": "गोदावरी का उद्गम महाराष्ट्र के नासिक जिले के त्र्यंबकेश्वर क्षेत्र में है।"
    }
  ],
  "Polity": [
    {
      "q": "मौलिक अधिकार संविधान के किस भाग में हैं?",
      "options": [
        "भाग III",
        "भाग II",
        "भाग IV",
        "भाग V"
      ],
      "answer": "A",
      "explanation": "मौलिक अधिकार भाग III में हैं।"
    },
    {
      "q": "राज्यसभा का पदेन सभापति कौन होता है?",
      "options": [
        "उपराष्ट्रपति",
        "राष्ट्रपति",
        "प्रधानमंत्री",
        "लोकसभा अध्यक्ष"
      ],
      "answer": "A",
      "explanation": "उपराष्ट्रपति राज्यसभा के पदेन सभापति होते हैं।"
    },
    {
      "q": "धन विधेयक को राज्यसभा अधिकतम कितने दिनों तक रोक सकती है?",
      "options": [
        "14 दिन",
        "30 दिन",
        "6 महीने",
        "7 दिन"
      ],
      "answer": "A",
      "explanation": "राज्यसभा धन विधेयक को अधिकतम 14 दिनों तक रख सकती है।"
    },
    {
      "q": "राष्ट्रपति के निर्वाचन में कौन भाग लेते हैं?",
      "options": [
        "निर्वाचित सांसद और राज्यों/संबंधित विधानसभाओं के निर्वाचित सदस्य",
        "सभी सांसद और सभी विधायक",
        "केवल लोकसभा सदस्य",
        "केवल राज्यसभा सदस्य"
      ],
      "answer": "A",
      "explanation": "राष्ट्रपति का चुनाव निर्वाचित सांसदों और संबंधित विधानसभाओं के निर्वाचित सदस्यों के निर्वाचक मंडल से होता है।"
    },
    {
      "q": "संविधान का संरक्षक किसे कहा जाता है?",
      "options": [
        "सर्वोच्च न्यायालय",
        "संसद",
        "राष्ट्रपति",
        "निर्वाचन आयोग"
      ],
      "answer": "A",
      "explanation": "सर्वोच्च न्यायालय को संविधान का संरक्षक/अंतिम व्याख्याकार कहा जाता है।"
    },
    {
      "q": "मौलिक कर्तव्यों को किस संशोधन द्वारा जोड़ा गया?",
      "options": [
        "42वाँ संशोधन",
        "44वाँ संशोधन",
        "73वाँ संशोधन",
        "86वाँ संशोधन"
      ],
      "answer": "A",
      "explanation": "42वें संविधान संशोधन, 1976 से मौलिक कर्तव्य जोड़े गए।"
    },
    {
      "q": "पंचायती राज संस्थाओं को संवैधानिक दर्जा किस संशोधन से मिला?",
      "options": [
        "73वाँ",
        "74वाँ",
        "42वाँ",
        "61वाँ"
      ],
      "answer": "A",
      "explanation": "73वें संविधान संशोधन से पंचायती राज को संवैधानिक आधार मिला।"
    },
    {
      "q": "नगरपालिकाओं से संबंधित प्रावधान किस संशोधन से जुड़े हैं?",
      "options": [
        "74वाँ",
        "73वाँ",
        "86वाँ",
        "91वाँ"
      ],
      "answer": "A",
      "explanation": "74वें संविधान संशोधन का संबंध नगरपालिकाओं से है।"
    },
    {
      "q": "निर्वाचन आयोग का प्रावधान किस अनुच्छेद में है?",
      "options": [
        "अनुच्छेद 324",
        "अनुच्छेद 280",
        "अनुच्छेद 356",
        "अनुच्छेद 370"
      ],
      "answer": "A",
      "explanation": "अनुच्छेद 324 निर्वाचन आयोग से संबंधित है।"
    },
    {
      "q": "प्रस्तावना में 'समाजवादी' और 'पंथनिरपेक्ष' शब्द किस संशोधन से जुड़े हैं?",
      "options": [
        "42वाँ",
        "44वाँ",
        "24वाँ",
        "52वाँ"
      ],
      "answer": "A",
      "explanation": "42वें संविधान संशोधन, 1976 से ये शब्द जोड़े गए।"
    }
  ],
  "Science": [
    {
      "q": "मानव शरीर में इंसुलिन का उत्पादन कहाँ होता है?",
      "options": [
        "अग्न्याशय",
        "यकृत",
        "थायरॉयड",
        "अधिवृक्क"
      ],
      "answer": "A",
      "explanation": "अग्न्याशय की बीटा कोशिकाएँ इंसुलिन बनाती हैं।"
    },
    {
      "q": "विद्युत धारा की SI इकाई क्या है?",
      "options": [
        "एम्पियर",
        "वोल्ट",
        "ओम",
        "कूलॉम"
      ],
      "answer": "A",
      "explanation": "विद्युत धारा की SI इकाई एम्पियर है।"
    },
    {
      "q": "ध्वनि निर्वात में क्यों नहीं चल सकती?",
      "options": [
        "माध्यम के कण आवश्यक होते हैं",
        "गुरुत्वाकर्षण नहीं होता",
        "प्रकाश नहीं होता",
        "तापमान शून्य होता है"
      ],
      "answer": "A",
      "explanation": "ध्वनि यांत्रिक तरंग है, इसलिए माध्यम आवश्यक है।"
    },
    {
      "q": "pH मान 7 से कम होने पर विलयन कैसा होता है?",
      "options": [
        "अम्लीय",
        "क्षारीय",
        "उदासीन",
        "लवणीय"
      ],
      "answer": "A",
      "explanation": "25°C पर pH 7 से कम अम्लीय विलयन दर्शाता है।"
    },
    {
      "q": "न्यूटन का प्रथम नियम किस अवधारणा से संबंधित है?",
      "options": [
        "जड़त्व",
        "ऊर्जा संरक्षण",
        "गुरुत्वाकर्षण",
        "दाब"
      ],
      "answer": "A",
      "explanation": "न्यूटन का प्रथम नियम जड़त्व को बताता है।"
    },
    {
      "q": "प्रकाश संश्लेषण में पौधे मुख्यतः किस गैस का उपयोग करते हैं?",
      "options": [
        "कार्बन डाइऑक्साइड",
        "ऑक्सीजन",
        "नाइट्रोजन",
        "हाइड्रोजन"
      ],
      "answer": "A",
      "explanation": "प्रकाश संश्लेषण में पौधे कार्बन डाइऑक्साइड का उपयोग करते हैं।"
    },
    {
      "q": "रक्त का लाल रंग मुख्यतः किसके कारण होता है?",
      "options": [
        "हीमोग्लोबिन",
        "प्लाज्मा",
        "प्लेटलेट",
        "इंसुलिन"
      ],
      "answer": "A",
      "explanation": "हीमोग्लोबिन लाल रक्त कोशिकाओं में रक्त को लाल रंग देता है।"
    },
    {
      "q": "ओम का नियम किस संबंध को व्यक्त करता है?",
      "options": [
        "V = IR",
        "P = VI",
        "F = ma",
        "E = mc²"
      ],
      "answer": "A",
      "explanation": "स्थिर परिस्थितियों में ओम का नियम V = IR है।"
    },
    {
      "q": "ओजोन परत मुख्यतः किस मंडल में पाई जाती है?",
      "options": [
        "समताप मंडल",
        "क्षोभ मंडल",
        "आयन मंडल",
        "बहिर्मंडल"
      ],
      "answer": "A",
      "explanation": "ओजोन की अधिकतम सांद्रता समताप मंडल में होती है।"
    },
    {
      "q": "DNA का पूर्ण रूप क्या है?",
      "options": [
        "Deoxyribonucleic Acid",
        "Dinucleic Acid",
        "Deoxyribose Nitrogen Acid",
        "Double Nucleic Acid"
      ],
      "answer": "A",
      "explanation": "DNA का पूर्ण रूप Deoxyribonucleic Acid है।"
    }
  ],
  "Maths": [
    {
      "q": "₹800 के अंकित मूल्य पर 15% छूट दी गई। विक्रय मूल्य क्या होगा?",
      "options": [
        "₹680",
        "₹700",
        "₹720",
        "₹760"
      ],
      "answer": "A",
      "explanation": "छूट ₹120; विक्रय मूल्य ₹680।"
    },
    {
      "q": "यदि 3 : 5 = x : 40, तो x क्या है?",
      "options": [
        "24",
        "20",
        "15",
        "30"
      ],
      "answer": "A",
      "explanation": "x/40 = 3/5, इसलिए x = 24।"
    },
    {
      "q": "एक संख्या का 25% = 45 है। संख्या क्या है?",
      "options": [
        "180",
        "160",
        "200",
        "225"
      ],
      "answer": "A",
      "explanation": "45×100/25 = 180।"
    },
    {
      "q": "₹5000 पर 8% वार्षिक साधारण ब्याज से 2 वर्ष का ब्याज?",
      "options": [
        "₹800",
        "₹600",
        "₹900",
        "₹1000"
      ],
      "answer": "A",
      "explanation": "SI = 5000×8×2/100 = ₹800।"
    },
    {
      "q": "60 km/h की गति से 2.5 घंटे में दूरी कितनी होगी?",
      "options": [
        "150 km",
        "120 km",
        "160 km",
        "180 km"
      ],
      "answer": "A",
      "explanation": "दूरी = 60×2.5 = 150 km।"
    },
    {
      "q": "20% वृद्धि के बाद किसी संख्या का मान 360 है। मूल संख्या?",
      "options": [
        "300",
        "288",
        "320",
        "340"
      ],
      "answer": "A",
      "explanation": "120% = 360, अतः 100% = 300।"
    },
    {
      "q": "दो संख्याओं का अनुपात 4 : 7 और योग 99 है। छोटी संख्या?",
      "options": [
        "36",
        "44",
        "63",
        "28"
      ],
      "answer": "A",
      "explanation": "कुल 11 भाग; एक भाग 9; छोटी संख्या 36।"
    },
    {
      "q": "₹600 की वस्तु 10% लाभ पर बेची गई। विक्रय मूल्य?",
      "options": [
        "₹660",
        "₹640",
        "₹670",
        "₹690"
      ],
      "answer": "A",
      "explanation": "10% लाभ = ₹60; SP = ₹660।"
    },
    {
      "q": "आयत की लंबाई 12 cm और चौड़ाई 8 cm है। क्षेत्रफल?",
      "options": [
        "96 cm²",
        "40 cm²",
        "192 cm²",
        "80 cm²"
      ],
      "answer": "A",
      "explanation": "12×8 = 96 cm²।"
    },
    {
      "q": "5 मजदूर किसी काम को 12 दिन में करते हैं। 10 मजदूर कितने दिन में करेंगे?",
      "options": [
        "6 दिन",
        "5 दिन",
        "8 दिन",
        "10 दिन"
      ],
      "answer": "A",
      "explanation": "5×12 = 10×d, इसलिए d = 6 दिन।"
    }
  ],
  "Reasoning": [
    {
      "q": "2, 6, 12, 20, 30, ? में अगली संख्या क्या होगी?",
      "options": [
        "42",
        "40",
        "44",
        "48"
      ],
      "answer": "A",
      "explanation": "अंतर 4,6,8,10; अगला 12, इसलिए 42।"
    },
    {
      "q": "यदि CAT को DBU लिखा जाता है, तो DOG कैसे लिखा जाएगा?",
      "options": [
        "EPH",
        "EOH",
        "EPG",
        "FPH"
      ],
      "answer": "A",
      "explanation": "हर अक्षर में 1 जोड़ने पर D→E, O→P, G→H।"
    },
    {
      "q": "10 m उत्तर और फिर 10 m दाएँ जाने पर प्रारंभिक बिंदु से दिशा?",
      "options": [
        "उत्तर-पूर्व",
        "उत्तर-पश्चिम",
        "दक्षिण-पूर्व",
        "दक्षिण-पश्चिम"
      ],
      "answer": "A",
      "explanation": "उत्तर के बाद दाएँ = पूर्व; स्थिति उत्तर-पूर्व।"
    },
    {
      "q": "राम की बहन सीता है। सीता की माँ गीता और गीता के पति मोहन हैं। मोहन का राम से संबंध?",
      "options": [
        "पिता",
        "मामा",
        "भाई",
        "चाचा"
      ],
      "answer": "A",
      "explanation": "मोहन राम के पिता हैं।"
    },
    {
      "q": "सभी गुलाब फूल हैं और कुछ फूल लाल हैं। निश्चित निष्कर्ष?",
      "options": [
        "सभी गुलाब फूल हैं",
        "सभी लाल वस्तुएँ गुलाब हैं",
        "कुछ गुलाब लाल हैं",
        "कोई फूल लाल नहीं है"
      ],
      "answer": "A",
      "explanation": "पहला कथन सीधे निष्कर्ष है; बाकी आवश्यक नहीं।"
    },
    {
      "q": "ऊपर से 12वाँ और नीचे से 18वाँ होने पर कुल विद्यार्थी?",
      "options": [
        "29",
        "30",
        "31",
        "28"
      ],
      "answer": "A",
      "explanation": "12+18−1 = 29।"
    },
    {
      "q": "A, C, F, J, O, ? में अगला अक्षर?",
      "options": [
        "U",
        "T",
        "V",
        "W"
      ],
      "answer": "A",
      "explanation": "अंतर +2,+3,+4,+5; अगला +6: O→U।"
    },
    {
      "q": "PEN = 35 (P=16,E=5,N=14) तो CAT का मान?",
      "options": [
        "24",
        "22",
        "26",
        "28"
      ],
      "answer": "A",
      "explanation": "C=3, A=1, T=20; योग 24।"
    },
    {
      "q": "3:00 बजे घंटे और मिनट की सुई के बीच कोण?",
      "options": [
        "90°",
        "60°",
        "120°",
        "180°"
      ],
      "answer": "A",
      "explanation": "3 और 12 के बीच कोण 90° है।"
    },
    {
      "q": "विषम चुनिए: 16, 25, 36, 49, 63",
      "options": [
        "63",
        "25",
        "36",
        "49"
      ],
      "answer": "A",
      "explanation": "16,25,36,49 पूर्ण वर्ग हैं; 63 नहीं।"
    }
  ],
  "Hindi": [
    {
      "q": "'अंधकार' का विलोम क्या है?",
      "options": [
        "प्रकाश",
        "छाया",
        "रात्रि",
        "तम"
      ],
      "answer": "A",
      "explanation": "अंधकार का विलोम प्रकाश है।"
    },
    {
      "q": "'निराशा' शब्द में कौन-सा उपसर्ग है?",
      "options": [
        "निर्",
        "प्र",
        "अनु",
        "सु"
      ],
      "answer": "A",
      "explanation": "'निर्' उपसर्ग से 'निराशा' शब्द बना है।"
    },
    {
      "q": "'राजपुत्र' में कौन-सा समास है?",
      "options": [
        "तत्पुरुष",
        "द्वंद्व",
        "बहुव्रीहि",
        "अव्ययीभाव"
      ],
      "answer": "A",
      "explanation": "राजा का पुत्र = राजपुत्र; तत्पुरुष समास।"
    },
    {
      "q": "'आँखों का तारा' मुहावरे का अर्थ?",
      "options": [
        "बहुत प्रिय होना",
        "बहुत क्रोधित होना",
        "बहुत दूर होना",
        "बहुत दुखी होना"
      ],
      "answer": "A",
      "explanation": "इसका अर्थ अत्यंत प्रिय होना है।"
    },
    {
      "q": "'जो कभी न मरे' के लिए एक शब्द?",
      "options": [
        "अमर",
        "अजर",
        "अनंत",
        "अटल"
      ],
      "answer": "A",
      "explanation": "जो कभी न मरे = अमर।"
    },
    {
      "q": "'विद्या' का सही पर्यायवाची?",
      "options": [
        "ज्ञान",
        "धन",
        "बल",
        "यश"
      ],
      "answer": "A",
      "explanation": "विद्या का प्रमुख पर्यायवाची ज्ञान है।"
    },
    {
      "q": "'राम ने फल खाया' में 'राम ने' कौन-सा कारक है?",
      "options": [
        "कर्ता",
        "कर्म",
        "करण",
        "अधिकरण"
      ],
      "answer": "A",
      "explanation": "'राम' कर्ता कारक है।"
    },
    {
      "q": "'जल्दी का काम शैतान का' क्या है?",
      "options": [
        "लोकोक्ति",
        "मुहावरा",
        "संधि",
        "समास"
      ],
      "answer": "A",
      "explanation": "यह एक प्रचलित लोकोक्ति है।"
    },
    {
      "q": "'विद्यालय' का सही संधि-विच्छेद?",
      "options": [
        "विद्या + आलय",
        "विद् + आलय",
        "विद्या + लय",
        "विद + यालय"
      ],
      "answer": "A",
      "explanation": "विद्यालय = विद्या + आलय।"
    },
    {
      "q": "'बालक' का स्त्रीलिंग?",
      "options": [
        "बालिका",
        "बालिन",
        "बालकी",
        "बालकनी"
      ],
      "answer": "A",
      "explanation": "बालक का स्त्रीलिंग बालिका है।"
    }
  ],
  "English": [
    {
      "q": "Choose the correct synonym of 'Rapid'.",
      "options": [
        "Fast",
        "Weak",
        "Late",
        "Quiet"
      ],
      "answer": "A",
      "explanation": "Rapid means fast or quick."
    },
    {
      "q": "Choose the correct antonym of 'Ancient'.",
      "options": [
        "Modern",
        "Old",
        "Historic",
        "Former"
      ],
      "answer": "A",
      "explanation": "Modern is the opposite of ancient."
    },
    {
      "q": "He ___ to school every day.",
      "options": [
        "goes",
        "go",
        "going",
        "gone"
      ],
      "answer": "A",
      "explanation": "With singular 'He' in simple present, 'goes' is correct."
    },
    {
      "q": "Choose the correct spelling.",
      "options": [
        "Necessary",
        "Necesary",
        "Neccessary",
        "Nessesary"
      ],
      "answer": "A",
      "explanation": "Necessary is the correct spelling."
    },
    {
      "q": "Identify the noun: 'Honesty is the best policy.'",
      "options": [
        "Honesty",
        "best",
        "is",
        "the"
      ],
      "answer": "A",
      "explanation": "Honesty names a quality, so it is a noun."
    },
    {
      "q": "Choose the correct passive: 'They play cricket.'",
      "options": [
        "Cricket is played by them.",
        "Cricket was played by them.",
        "Cricket has played by them.",
        "Cricket is playing by them."
      ],
      "answer": "A",
      "explanation": "Simple present passive uses is/am/are + past participle."
    },
    {
      "q": "He is ___ honest man.",
      "options": [
        "an",
        "a",
        "the",
        "no article"
      ],
      "answer": "A",
      "explanation": "'Honest' begins with a vowel sound, so 'an' is correct."
    },
    {
      "q": "She is good ___ mathematics.",
      "options": [
        "at",
        "in",
        "on",
        "for"
      ],
      "answer": "A",
      "explanation": "The standard phrase is 'good at'."
    },
    {
      "q": "He said, 'I am tired.'",
      "options": [
        "He said that he was tired.",
        "He says that I am tired.",
        "He said that I am tired.",
        "He told I was tired."
      ],
      "answer": "A",
      "explanation": "In reported speech, 'am' generally changes to 'was' after a past reporting verb."
    },
    {
      "q": "Choose the correct sentence.",
      "options": [
        "Neither Ram nor Shyam is present.",
        "Neither Ram nor Shyam are present.",
        "Neither Ram or Shyam is present.",
        "Neither Ram nor Shyam were present."
      ],
      "answer": "A",
      "explanation": "Both subjects are singular, so 'is' is used."
    }
  ],
  "Economics": [
    {
      "q": "भारत में राष्ट्रीय आय का अनुमान मुख्यतः कौन तैयार करता है?",
      "options": [
        "राष्ट्रीय सांख्यिकी कार्यालय (NSO)",
        "RBI",
        "SEBI",
        "NITI Aayog"
      ],
      "answer": "A",
      "explanation": "राष्ट्रीय सांख्यिकी कार्यालय राष्ट्रीय आय के प्रमुख अनुमान जारी करता है।"
    },
    {
      "q": "मुद्रास्फीति का सामान्य अर्थ क्या है?",
      "options": [
        "सामान्य मूल्य स्तर में लगातार वृद्धि",
        "बेरोजगारी में कमी",
        "उत्पादन में वृद्धि",
        "करों में कमी"
      ],
      "answer": "A",
      "explanation": "मुद्रास्फीति में सामान्य मूल्य स्तर में वृद्धि होती है।"
    },
    {
      "q": "भारत में मौद्रिक नीति का संचालन किस संस्था की केंद्रीय भूमिका है?",
      "options": [
        "RBI",
        "वित्त आयोग",
        "SEBI",
        "संसद"
      ],
      "answer": "A",
      "explanation": "RBI मौद्रिक नीति के संचालन में केंद्रीय भूमिका निभाता है।"
    },
    {
      "q": "राजकोषीय नीति मुख्यतः किससे संबंधित है?",
      "options": [
        "सरकारी आय और व्यय",
        "बैंक नोट छापने",
        "शेयर बाजार",
        "विदेशी मुद्रा विनिमय मात्र"
      ],
      "answer": "A",
      "explanation": "राजकोषीय नीति में कर, सरकारी व्यय और उधारी जैसे साधन आते हैं।"
    },
    {
      "q": "GDP का पूर्ण रूप?",
      "options": [
        "Gross Domestic Product",
        "General Domestic Price",
        "Gross Development Plan",
        "General Development Product"
      ],
      "answer": "A",
      "explanation": "GDP = Gross Domestic Product."
    },
    {
      "q": "प्राथमिक क्षेत्र का उदाहरण?",
      "options": [
        "कृषि",
        "बैंकिंग",
        "सॉफ्टवेयर सेवा",
        "बीमा"
      ],
      "answer": "A",
      "explanation": "कृषि प्राथमिक क्षेत्र की प्रमुख गतिविधि है।"
    },
    {
      "q": "प्रत्यक्ष कर का उदाहरण?",
      "options": [
        "आयकर",
        "GST",
        "सीमा शुल्क",
        "उत्पाद शुल्क"
      ],
      "answer": "A",
      "explanation": "आयकर सीधे आय/करदाता पर लगाया जाता है।"
    },
    {
      "q": "राजस्व व्यय का संबंध किससे है?",
      "options": [
        "सरकार के नियमित/चालू खर्चों से",
        "केवल नई मशीनें खरीदने से",
        "केवल शेयर खरीदने से",
        "केवल विदेशी व्यापार से"
      ],
      "answer": "A",
      "explanation": "राजस्व व्यय सरकार के नियमित और चालू खर्चों से जुड़ा है।"
    },
    {
      "q": "बैंक दर का संबंध किससे है?",
      "options": [
        "केंद्रीय बैंक की उधार/पुनर्वित्त दर से",
        "केवल शेयर बाजार सूचकांक से",
        "कृषि उत्पादन से",
        "जनसंख्या वृद्धि से"
      ],
      "answer": "A",
      "explanation": "बैंक दर केंद्रीय बैंक की प्रमुख ऋण/पुनर्वित्त दर है।"
    },
    {
      "q": "प्रति व्यक्ति आय का सरल सूत्र?",
      "options": [
        "राष्ट्रीय आय ÷ जनसंख्या",
        "जनसंख्या ÷ राष्ट्रीय आय",
        "GDP × जनसंख्या",
        "कर आय ÷ निर्यात"
      ],
      "answer": "A",
      "explanation": "प्रति व्यक्ति आय = राष्ट्रीय आय ÷ कुल जनसंख्या।"
    }
  ],
  "Indian Art & Culture": [
    {
      "q": "भरतनाट्यम किस राज्य की प्रमुख शास्त्रीय नृत्य परंपरा है?",
      "options": [
        "तमिलनाडु",
        "केरल",
        "ओडिशा",
        "असम"
      ],
      "answer": "A",
      "explanation": "भरतनाट्यम का प्रमुख ऐतिहासिक संबंध तमिलनाडु से है।"
    },
    {
      "q": "कथकली किस राज्य से संबंधित है?",
      "options": [
        "केरल",
        "मणिपुर",
        "गुजरात",
        "बिहार"
      ],
      "answer": "A",
      "explanation": "कथकली केरल की प्रसिद्ध नृत्य-नाट्य परंपरा है।"
    },
    {
      "q": "ओडिसी नृत्य का संबंध किस राज्य से है?",
      "options": [
        "ओडिशा",
        "पश्चिम बंगाल",
        "महाराष्ट्र",
        "पंजाब"
      ],
      "answer": "A",
      "explanation": "ओडिसी ओडिशा की शास्त्रीय नृत्य शैली है।"
    },
    {
      "q": "सत्रिया नृत्य किस राज्य से संबंधित है?",
      "options": [
        "असम",
        "बिहार",
        "राजस्थान",
        "उत्तराखंड"
      ],
      "answer": "A",
      "explanation": "सत्रिया असम की शास्त्रीय नृत्य परंपरा है।"
    },
    {
      "q": "मधुबनी चित्रकला का प्रमुख संबंध किस राज्य से है?",
      "options": [
        "बिहार",
        "झारखंड",
        "उत्तर प्रदेश",
        "छत्तीसगढ़"
      ],
      "answer": "A",
      "explanation": "मधुबनी/मिथिला चित्रकला का प्रमुख क्षेत्र बिहार का मिथिला क्षेत्र है।"
    },
    {
      "q": "अजंता की गुफाएँ मुख्यतः किसके लिए प्रसिद्ध हैं?",
      "options": [
        "भित्ति चित्र और बौद्ध कला",
        "मुगल स्थापत्य",
        "चोल कांस्य",
        "सिख चित्रकला"
      ],
      "answer": "A",
      "explanation": "अजंता प्राचीन बौद्ध भित्ति चित्रों और शैलकला के लिए प्रसिद्ध है।"
    },
    {
      "q": "कुचिपुड़ी किस राज्य की शास्त्रीय नृत्य शैली है?",
      "options": [
        "आंध्र प्रदेश",
        "मणिपुर",
        "ओडिशा",
        "पंजाब"
      ],
      "answer": "A",
      "explanation": "कुचिपुड़ी का संबंध आंध्र प्रदेश से है।"
    },
    {
      "q": "बिहू किस राज्य की प्रमुख सांस्कृतिक परंपरा है?",
      "options": [
        "असम",
        "बिहार",
        "गोवा",
        "केरल"
      ],
      "answer": "A",
      "explanation": "बिहू असम की प्रमुख सांस्कृतिक परंपरा है।"
    },
    {
      "q": "वारली चित्रकला मुख्यतः किस राज्य से संबंधित है?",
      "options": [
        "महाराष्ट्र",
        "बिहार",
        "असम",
        "राजस्थान"
      ],
      "answer": "A",
      "explanation": "वारली कला महाराष्ट्र के जनजातीय क्षेत्रों से संबंधित है।"
    },
    {
      "q": "नाट्यशास्त्र के रचयिता के रूप में किसे माना जाता है?",
      "options": [
        "भरतमुनि",
        "कालिदास",
        "बाणभट्ट",
        "पतंजलि"
      ],
      "answer": "A",
      "explanation": "नाट्यशास्त्र की रचना परंपरागत रूप से भरतमुनि को मानी जाती है।"
    }
  ]
};


/* ===== V5: additional practice questions ===== */
const extraQuestionBank = {
  "GK": [
    [
      "भारत का राष्ट्रीय खेल आधिकारिक रूप से कौन-सा घोषित है?",
      [
        "हॉकी",
        "क्रिकेट",
        "कबड्डी",
        "कोई आधिकारिक राष्ट्रीय खेल नहीं"
      ],
      3,
      "भारत सरकार ने किसी खेल को आधिकारिक राष्ट्रीय खेल घोषित नहीं किया है।"
    ],
    [
      "भारत का राष्ट्रीय फूल कौन-सा है?",
      [
        "कमल",
        "गुलाब",
        "गेंदा",
        "चंपा"
      ],
      0,
      "कमल भारत का राष्ट्रीय फूल है।"
    ],
    [
      "भारतीय अंतरिक्ष अनुसंधान संगठन का संक्षिप्त नाम क्या है?",
      [
        "DRDO",
        "ISRO",
        "CSIR",
        "BARC"
      ],
      1,
      "ISRO का पूरा नाम Indian Space Research Organisation है।"
    ],
    [
      "भारत का राष्ट्रीय वृक्ष कौन-सा है?",
      [
        "नीम",
        "बरगद",
        "पीपल",
        "आम"
      ],
      1,
      "बरगद भारत का राष्ट्रीय वृक्ष है।"
    ],
    [
      "भारतीय रुपये का प्रतीक ₹ किससे संबंधित है?",
      [
        "मुद्रा चिह्न",
        "डाक टिकट",
        "कर चिह्न",
        "बैंक कोड"
      ],
      0,
      "₹ भारतीय रुपये का मुद्रा चिह्न है।"
    ],
    [
      "भारत का राष्ट्रीय फल कौन-सा है?",
      [
        "केला",
        "सेब",
        "आम",
        "अमरूद"
      ],
      2,
      "आम भारत का राष्ट्रीय फल है।"
    ],
    [
      "भारत में कुल कितने राज्य हैं?",
      [
        "28",
        "29",
        "30",
        "27"
      ],
      0,
      "भारत में 28 राज्य हैं।"
    ],
    [
      "भारत में केंद्र शासित प्रदेशों की संख्या कितनी है?",
      [
        "6",
        "7",
        "8",
        "9"
      ],
      2,
      "भारत में 8 केंद्र शासित प्रदेश हैं।"
    ],
    [
      "संयुक्त राष्ट्र संगठन का मुख्यालय कहाँ है?",
      [
        "लंदन",
        "न्यूयॉर्क",
        "पेरिस",
        "जिनेवा"
      ],
      1,
      "संयुक्त राष्ट्र का मुख्यालय न्यूयॉर्क में है।"
    ],
    [
      "भारत का राष्ट्रीय पक्षी कौन है?",
      [
        "मोर",
        "तोता",
        "हंस",
        "गरुड़"
      ],
      0,
      "मोर भारत का राष्ट्रीय पक्षी है।"
    ]
  ],
  "History": [
    [
      "प्लासी का युद्ध किस वर्ष हुआ था?",
      [
        "1757",
        "1764",
        "1857",
        "1748"
      ],
      0,
      "प्लासी का युद्ध 1757 में हुआ था।"
    ],
    [
      "बक्सर का युद्ध किस वर्ष हुआ था?",
      [
        "1757",
        "1764",
        "1772",
        "1784"
      ],
      1,
      "बक्सर का युद्ध 1764 में हुआ था।"
    ],
    [
      "जलियांवाला बाग हत्याकांड किस वर्ष हुआ?",
      [
        "1905",
        "1911",
        "1919",
        "1922"
      ],
      2,
      "जलियांवाला बाग हत्याकांड 13 अप्रैल 1919 को हुआ था।"
    ],
    [
      "असहयोग आंदोलन किस वर्ष शुरू हुआ?",
      [
        "1919",
        "1920",
        "1922",
        "1930"
      ],
      1,
      "असहयोग आंदोलन 1920 में शुरू हुआ।"
    ],
    [
      "दांडी मार्च किस आंदोलन से संबंधित था?",
      [
        "असहयोग आंदोलन",
        "भारत छोड़ो आंदोलन",
        "सविनय अवज्ञा आंदोलन",
        "स्वदेशी आंदोलन"
      ],
      2,
      "दांडी मार्च 1930 के सविनय अवज्ञा आंदोलन से जुड़ा था।"
    ],
    [
      "मौर्य साम्राज्य के संस्थापक कौन थे?",
      [
        "अशोक",
        "चंद्रगुप्त मौर्य",
        "बिंदुसार",
        "समुद्रगुप्त"
      ],
      1,
      "चंद्रगुप्त मौर्य ने मौर्य साम्राज्य की स्थापना की।"
    ],
    [
      "गुप्त काल को प्रायः किस नाम से जाना जाता है?",
      [
        "स्वर्ण युग",
        "लौह युग",
        "वैदिक युग",
        "अंधकार युग"
      ],
      0,
      "गुप्त काल को भारतीय इतिहास का स्वर्ण युग कहा जाता है।"
    ],
    [
      "सांची स्तूप किस राज्य में स्थित है?",
      [
        "उत्तर प्रदेश",
        "बिहार",
        "मध्य प्रदेश",
        "राजस्थान"
      ],
      2,
      "सांची स्तूप मध्य प्रदेश में स्थित है।"
    ],
    [
      "हड़प्पा सभ्यता का प्रमुख नगर कौन था?",
      [
        "हड़प्पा",
        "पाटलिपुत्र",
        "कन्नौज",
        "उज्जैन"
      ],
      0,
      "हड़प्पा सिंधु घाटी सभ्यता का प्रमुख नगर था।"
    ],
    [
      "अकबर का शासनकाल किस मुगल वंश से संबंधित है?",
      [
        "मुगल",
        "लोदी",
        "सूर",
        "तुगलक"
      ],
      0,
      "अकबर मुगल वंश का प्रमुख शासक था।"
    ]
  ],
  "Geography": [
    [
      "भारत की सबसे लंबी नदी कौन-सी है?",
      [
        "गोदावरी",
        "गंगा",
        "यमुना",
        "नर्मदा"
      ],
      1,
      "भारत में गंगा को सबसे लंबी नदी माना जाता है।"
    ],
    [
      "भारत का सबसे ऊँचा पर्वत शिखर कौन-सा है?",
      [
        "नंदा देवी",
        "कंचनजंगा",
        "अनामुड़ी",
        "धौलागिरी"
      ],
      1,
      "भारत की सीमा के भीतर सबसे ऊँची चोटी कंचनजंगा है।"
    ],
    [
      "थार मरुस्थल मुख्यतः किस राज्य में है?",
      [
        "गुजरात",
        "राजस्थान",
        "हरियाणा",
        "पंजाब"
      ],
      1,
      "थार मरुस्थल का अधिकांश भाग राजस्थान में है।"
    ],
    [
      "नर्मदा नदी किस दिशा में बहती है?",
      [
        "पूर्व",
        "पश्चिम",
        "उत्तर",
        "दक्षिण"
      ],
      1,
      "नर्मदा पश्चिम की ओर बहकर अरब सागर में गिरती है।"
    ],
    [
      "भारत का सबसे बड़ा पठार कौन-सा है?",
      [
        "मालवा पठार",
        "दक्कन का पठार",
        "छोटानागपुर पठार",
        "मेघालय पठार"
      ],
      1,
      "दक्कन का पठार भारत का प्रमुख और विस्तृत पठार है।"
    ],
    [
      "सुंदरबन डेल्टा किन नदियों से बना है?",
      [
        "गंगा-ब्रह्मपुत्र",
        "नर्मदा-ताप्ती",
        "गोदावरी-कृष्णा",
        "सिंधु-झेलम"
      ],
      0,
      "सुंदरबन गंगा-ब्रह्मपुत्र नदी तंत्र के डेल्टा क्षेत्र में है।"
    ],
    [
      "कर्क रेखा भारत के कितने राज्यों से गुजरती है?",
      [
        "6",
        "7",
        "8",
        "9"
      ],
      2,
      "कर्क रेखा भारत के 8 राज्यों से गुजरती है।"
    ],
    [
      "भारत का दक्षिणतम बिंदु कौन-सा है?",
      [
        "कन्याकुमारी",
        "इंदिरा पॉइंट",
        "रामेश्वरम",
        "पोर्ट ब्लेयर"
      ],
      1,
      "भारत का दक्षिणतम बिंदु इंदिरा पॉइंट है।"
    ],
    [
      "चिल्का झील किस राज्य में है?",
      [
        "ओडिशा",
        "पश्चिम बंगाल",
        "आंध्र प्रदेश",
        "केरल"
      ],
      0,
      "चिल्का झील ओडिशा में स्थित है।"
    ],
    [
      "भारत में मानसून मुख्यतः किस दिशा से आता है?",
      [
        "दक्षिण-पश्चिम",
        "उत्तर-पूर्व",
        "उत्तर-पश्चिम",
        "दक्षिण-पूर्व"
      ],
      0,
      "भारत में मुख्य दक्षिण-पश्चिम मानसून आता है।"
    ]
  ],
  "Polity": [
    [
      "भारतीय संविधान का संरक्षक किसे माना जाता है?",
      [
        "राष्ट्रपति",
        "संसद",
        "सर्वोच्च न्यायालय",
        "प्रधानमंत्री"
      ],
      2,
      "सर्वोच्च न्यायालय संविधान की व्याख्या और संरक्षण में महत्वपूर्ण भूमिका निभाता है।"
    ],
    [
      "लोकसभा का सामान्य कार्यकाल कितना है?",
      [
        "4 वर्ष",
        "5 वर्ष",
        "6 वर्ष",
        "7 वर्ष"
      ],
      1,
      "लोकसभा का सामान्य कार्यकाल 5 वर्ष है।"
    ],
    [
      "राज्यसभा का सदस्य बनने की न्यूनतम आयु कितनी है?",
      [
        "21 वर्ष",
        "25 वर्ष",
        "30 वर्ष",
        "35 वर्ष"
      ],
      2,
      "राज्यसभा सदस्य के लिए न्यूनतम आयु 30 वर्ष है।"
    ],
    [
      "लोकसभा सदस्य बनने की न्यूनतम आयु कितनी है?",
      [
        "18 वर्ष",
        "21 वर्ष",
        "25 वर्ष",
        "30 वर्ष"
      ],
      2,
      "लोकसभा सदस्य बनने की न्यूनतम आयु 25 वर्ष है।"
    ],
    [
      "भारत का प्रथम नागरिक किसे कहा जाता है?",
      [
        "प्रधानमंत्री",
        "राष्ट्रपति",
        "मुख्य न्यायाधीश",
        "उपराष्ट्रपति"
      ],
      1,
      "राष्ट्रपति को भारत का प्रथम नागरिक कहा जाता है।"
    ],
    [
      "मौलिक अधिकार संविधान के किस भाग में हैं?",
      [
        "भाग I",
        "भाग II",
        "भाग III",
        "भाग IV"
      ],
      2,
      "मौलिक अधिकार संविधान के भाग III में हैं।"
    ],
    [
      "राज्य के नीति-निदेशक तत्व किस भाग में हैं?",
      [
        "भाग III",
        "भाग IV",
        "भाग V",
        "भाग VI"
      ],
      1,
      "नीति-निदेशक तत्व भाग IV में हैं।"
    ],
    [
      "भारत में मतदान की न्यूनतम आयु कितनी है?",
      [
        "16 वर्ष",
        "18 वर्ष",
        "21 वर्ष",
        "25 वर्ष"
      ],
      1,
      "भारत में मतदान की न्यूनतम आयु 18 वर्ष है।"
    ],
    [
      "पंचायती राज को संवैधानिक दर्जा किस संशोधन से मिला?",
      [
        "42वां",
        "44वां",
        "73वां",
        "74वां"
      ],
      2,
      "73वें संविधान संशोधन ने पंचायती राज संस्थाओं को संवैधानिक दर्जा दिया।"
    ],
    [
      "नगरपालिकाओं को संवैधानिक दर्जा किस संशोधन से मिला?",
      [
        "72वां",
        "73वां",
        "74वां",
        "75वां"
      ],
      2,
      "74वें संविधान संशोधन ने नगरपालिकाओं को संवैधानिक दर्जा दिया।"
    ]
  ],
  "Science": [
    [
      "पानी का क्वथनांक सामान्य वायुदाब पर कितना है?",
      [
        "50°C",
        "100°C",
        "150°C",
        "200°C"
      ],
      1,
      "सामान्य वायुदाब पर पानी 100°C पर उबलता है।"
    ],
    [
      "प्रकाश संश्लेषण में पौधे कौन-सी गैस लेते हैं?",
      [
        "ऑक्सीजन",
        "नाइट्रोजन",
        "कार्बन डाइऑक्साइड",
        "हाइड्रोजन"
      ],
      2,
      "पौधे प्रकाश संश्लेषण में कार्बन डाइऑक्साइड का उपयोग करते हैं।"
    ],
    [
      "विटामिन C की कमी से कौन-सा रोग होता है?",
      [
        "रिकेट्स",
        "स्कर्वी",
        "बेरी-बेरी",
        "रातांधता"
      ],
      1,
      "विटामिन C की कमी से स्कर्वी होता है।"
    ],
    [
      "विटामिन D की कमी से बच्चों में कौन-सा रोग हो सकता है?",
      [
        "रिकेट्स",
        "स्कर्वी",
        "एनीमिया",
        "घेंघा"
      ],
      0,
      "विटामिन D की कमी से रिकेट्स हो सकता है।"
    ],
    [
      "रक्त का लाल रंग किसके कारण होता है?",
      [
        "प्लाज्मा",
        "हीमोग्लोबिन",
        "इंसुलिन",
        "प्लेटलेट"
      ],
      1,
      "हीमोग्लोबिन रक्त को लाल रंग देता है।"
    ],
    [
      "मानव शरीर का सबसे बड़ा अंग कौन-सा है?",
      [
        "हृदय",
        "त्वचा",
        "यकृत",
        "फेफड़ा"
      ],
      1,
      "त्वचा मानव शरीर का सबसे बड़ा अंग है।"
    ],
    [
      "ध्वनि निर्वात में क्यों नहीं चलती?",
      [
        "वह बहुत धीमी है",
        "माध्यम नहीं होता",
        "प्रकाश रोकता है",
        "तापमान कम होता है"
      ],
      1,
      "ध्वनि के संचरण के लिए माध्यम आवश्यक होता है।"
    ],
    [
      "बल की SI इकाई क्या है?",
      [
        "जूल",
        "न्यूटन",
        "वाट",
        "पास्कल"
      ],
      1,
      "बल की SI इकाई न्यूटन है।"
    ],
    [
      "विद्युत धारा की SI इकाई क्या है?",
      [
        "वोल्ट",
        "ओम",
        "एम्पियर",
        "वाट"
      ],
      2,
      "विद्युत धारा की SI इकाई एम्पियर है।"
    ],
    [
      "pH 7 वाला विलयन सामान्यतः कैसा होता है?",
      [
        "अम्लीय",
        "क्षारीय",
        "उदासीन",
        "धात्विक"
      ],
      2,
      "pH 7 को सामान्यतः उदासीन माना जाता है।"
    ]
  ],
  "Maths": [
    [
      "200 का 15% कितना है?",
      [
        "20",
        "25",
        "30",
        "35"
      ],
      2,
      "200 × 15/100 = 30।"
    ],
    [
      "यदि 5 पेन की कीमत ₹50 है, तो 1 पेन की कीमत कितनी है?",
      [
        "₹5",
        "₹10",
        "₹15",
        "₹20"
      ],
      1,
      "₹50 ÷ 5 = ₹10।"
    ],
    [
      "12 और 18 का HCF क्या है?",
      [
        "3",
        "6",
        "9",
        "12"
      ],
      1,
      "12 और 18 का सबसे बड़ा समान भाजक 6 है।"
    ],
    [
      "8 और 12 का LCM क्या है?",
      [
        "16",
        "20",
        "24",
        "32"
      ],
      2,
      "8 और 12 का LCM 24 है।"
    ],
    [
      "3/4 को प्रतिशत में लिखें।",
      [
        "25%",
        "50%",
        "75%",
        "80%"
      ],
      2,
      "3/4 × 100 = 75%।"
    ],
    [
      "एक वस्तु ₹500 में खरीदी और ₹600 में बेची। लाभ कितना है?",
      [
        "₹50",
        "₹75",
        "₹100",
        "₹125"
      ],
      2,
      "लाभ = 600 − 500 = ₹100।"
    ],
    [
      "1000 का 10% घटाने पर कितना बचेगा?",
      [
        "800",
        "850",
        "900",
        "950"
      ],
      2,
      "1000 − 100 = 900।"
    ],
    [
      "एक संख्या का 25% = 40 है। संख्या क्या है?",
      [
        "120",
        "140",
        "160",
        "180"
      ],
      2,
      "संख्या = 40 × 100/25 = 160।"
    ],
    [
      "औसत: 10, 20, 30 का औसत क्या है?",
      [
        "15",
        "20",
        "25",
        "30"
      ],
      1,
      "औसत = (10+20+30)/3 = 20।"
    ],
    [
      "एक वर्ग की भुजा 5 cm है। उसका क्षेत्रफल कितना है?",
      [
        "10 cm²",
        "20 cm²",
        "25 cm²",
        "30 cm²"
      ],
      2,
      "क्षेत्रफल = 5 × 5 = 25 cm²।"
    ]
  ],
  "Reasoning": [
    [
      "श्रृंखला: 5, 10, 15, 20, ?",
      [
        "22",
        "25",
        "30",
        "35"
      ],
      1,
      "हर पद में 5 जोड़ा गया है।"
    ],
    [
      "यदि BOOK को CPPL लिखा जाए, तो PEN को क्या लिखा जाएगा?",
      [
        "QFO",
        "QEN",
        "PFN",
        "RFO"
      ],
      0,
      "हर अक्षर में 1 जोड़ा गया है।"
    ],
    [
      "विषम चुनें:",
      [
        "सेब",
        "आम",
        "केला",
        "आलू"
      ],
      3,
      "आलू सब्जी है, बाकी फल हैं।"
    ],
    [
      "यदि आज सोमवार है, तो 10 दिन बाद कौन-सा दिन होगा?",
      [
        "बुधवार",
        "गुरुवार",
        "शुक्रवार",
        "शनिवार"
      ],
      1,
      "10 दिन = 7+3 दिन; सोमवार के 3 दिन बाद गुरुवार।"
    ],
    [
      "एक पंक्ति में राम बाएँ से 7वें और दाएँ से 9वें स्थान पर है। कुल कितने व्यक्ति हैं?",
      [
        "15",
        "16",
        "17",
        "18"
      ],
      1,
      "कुल = 7 + 9 − 1 = 15।"
    ],
    [
      "A, B का भाई है और B, C की बहन है। A का C से क्या संबंध है?",
      [
        "भाई",
        "बहन",
        "पिता",
        "माता"
      ],
      0,
      "A पुरुष है और B तथा C के भाई-बहन संबंध से A, C का भाई है।"
    ],
    [
      "श्रृंखला: 1, 4, 9, 16, ?",
      [
        "20",
        "24",
        "25",
        "36"
      ],
      2,
      "ये क्रमशः 1², 2², 3², 4² हैं; अगला 5² = 25।"
    ],
    [
      "यदि SOUTH को TPVUI लिखा जाए, तो NORTH कैसे लिखा जाएगा?",
      [
        "OPSUI",
        "OPSUH",
        "NQSTI",
        "OPRUI"
      ],
      0,
      "हर अक्षर में 1 जोड़ा गया है।"
    ],
    [
      "दर्पण में 3:00 बजे की घड़ी कैसी दिखेगी?",
      [
        "9:00",
        "3:00",
        "6:00",
        "12:00"
      ],
      0,
      "दर्पण में 3:00 का प्रतिबिंब 9:00 के रूप में दिखता है।"
    ],
    [
      "श्रृंखला: 100, 90, 80, 70, ?",
      [
        "50",
        "55",
        "60",
        "65"
      ],
      2,
      "हर बार 10 घटाया गया है।"
    ]
  ],
  "Hindi": [
    [
      "'दिन' का विलोम क्या है?",
      [
        "रात",
        "सुबह",
        "प्रकाश",
        "सूर्य"
      ],
      0,
      "'दिन' का विलोम 'रात' है।"
    ],
    [
      "'आकाश' का पर्यायवाची कौन-सा है?",
      [
        "गगन",
        "पवन",
        "जल",
        "धरती"
      ],
      0,
      "'आकाश' का पर्यायवाची 'गगन' है।"
    ],
    [
      "'विद्यालय' शब्द में कौन-सा समास है?",
      [
        "द्वंद्व",
        "तत्पुरुष",
        "बहुव्रीहि",
        "अव्ययीभाव"
      ],
      1,
      "विद्यालय को विद्या का आलय माना जाता है, इसलिए यह तत्पुरुष समास है।"
    ],
    [
      "'जो पढ़ता है' के लिए एक शब्द क्या है?",
      [
        "पाठक",
        "लेखक",
        "गायक",
        "वक्ता"
      ],
      0,
      "जो पढ़ता है उसे पाठक कहा जाता है।"
    ],
    [
      "'राम ने पत्र लिखा' में कर्ता कौन है?",
      [
        "राम",
        "पत्र",
        "लिखा",
        "ने"
      ],
      0,
      "वाक्य में कार्य करने वाला कर्ता राम है।"
    ],
    [
      "'बहुत अधिक बोलने वाला' के लिए एक शब्द है?",
      [
        "मितभाषी",
        "वाचाल",
        "मौन",
        "गंभीर"
      ],
      1,
      "बहुत अधिक बोलने वाले व्यक्ति के लिए वाचाल शब्द प्रयुक्त होता है।"
    ],
    [
      "'नाक कटना' मुहावरे का अर्थ क्या है?",
      [
        "सम्मान मिलना",
        "अपमान होना",
        "बीमार होना",
        "क्रोधित होना"
      ],
      1,
      "नाक कटना का अर्थ अपमान होना है।"
    ],
    [
      "'अंधे की लाठी' मुहावरे का अर्थ क्या है?",
      [
        "कमजोरी",
        "एकमात्र सहारा",
        "अंधापन",
        "दंड"
      ],
      1,
      "अंधे की लाठी का अर्थ एकमात्र सहारा है।"
    ],
    [
      "'सुंदरता' में कौन-सा प्रत्यय है?",
      [
        "ता",
        "सु",
        "दर",
        "रता"
      ],
      0,
      "'सुंदरता' में 'ता' प्रत्यय है।"
    ],
    [
      "शुद्ध वर्तनी कौन-सी है?",
      [
        "आर्शीवाद",
        "आशीर्वाद",
        "आशिर्वाद",
        "आशीरवाद"
      ],
      1,
      "मानक वर्तनी आशीर्वाद है।"
    ]
  ],
  "English": [
    [
      "Choose the correct article: ___ apple a day keeps the doctor away.",
      [
        "A",
        "An",
        "The",
        "No article"
      ],
      1,
      "Apple begins with a vowel sound, so An is used."
    ],
    [
      "Choose the plural of Child.",
      [
        "Childs",
        "Children",
        "Childes",
        "Childrens"
      ],
      1,
      "The plural form of child is children."
    ],
    [
      "Choose the past tense of Go.",
      [
        "Goed",
        "Gone",
        "Went",
        "Going"
      ],
      2,
      "The simple past form of go is went."
    ],
    [
      "Choose the synonym of Happy.",
      [
        "Sad",
        "Joyful",
        "Angry",
        "Weak"
      ],
      1,
      "Joyful has a similar meaning to happy."
    ],
    [
      "Choose the antonym of Expand.",
      [
        "Increase",
        "Extend",
        "Contract",
        "Grow"
      ],
      2,
      "Contract is the opposite of expand."
    ],
    [
      "Fill in: She ___ to school every day.",
      [
        "go",
        "goes",
        "going",
        "gone"
      ],
      1,
      "With singular subject she in the simple present, goes is used."
    ],
    [
      "Choose the correctly spelled word.",
      [
        "Necessary",
        "Necesary",
        "Neccessary",
        "Nessesary"
      ],
      0,
      "The correct spelling is Necessary."
    ],
    [
      "Identify the noun: The boy runs fast.",
      [
        "boy",
        "runs",
        "fast",
        "the"
      ],
      0,
      "Boy is the naming word in the sentence."
    ],
    [
      "Choose the comparative form of Good.",
      [
        "Gooder",
        "Best",
        "Better",
        "More good"
      ],
      2,
      "The comparative form of good is better."
    ],
    [
      "Choose the correct preposition: He is good ___ mathematics.",
      [
        "in",
        "at",
        "on",
        "for"
      ],
      1,
      "The standard expression is good at mathematics."
    ]
  ],
  "Economics": [
    [
      "भारत में केंद्रीय बैंक कौन-सा है?",
      [
        "SBI",
        "RBI",
        "SEBI",
        "NABARD"
      ],
      1,
      "भारतीय रिजर्व बैंक भारत का केंद्रीय बैंक है।"
    ],
    [
      "मुद्रास्फीति का सामान्य अर्थ क्या है?",
      [
        "कीमतों में सामान्य वृद्धि",
        "बेरोजगारी में कमी",
        "उत्पादन में शून्य वृद्धि",
        "करों का समाप्त होना"
      ],
      0,
      "मुद्रास्फीति में वस्तुओं और सेवाओं के सामान्य मूल्य स्तर में वृद्धि होती है।"
    ],
    [
      "भारत में GST कब लागू हुआ?",
      [
        "2014",
        "2015",
        "2017",
        "2020"
      ],
      2,
      "भारत में GST 1 जुलाई 2017 से लागू हुआ।"
    ],
    [
      "SEBI का मुख्य संबंध किससे है?",
      [
        "बीमा बाजार",
        "प्रतिभूति बाजार",
        "कृषि उत्पादन",
        "डाक सेवा"
      ],
      1,
      "SEBI प्रतिभूति बाजार का नियामक है।"
    ],
    [
      "GDP का पूरा नाम क्या है?",
      [
        "Gross Domestic Product",
        "General Development Plan",
        "Gross Demand Price",
        "Global Domestic Production"
      ],
      0,
      "GDP का पूरा नाम Gross Domestic Product है।"
    ],
    [
      "बैंक में जमा धन पर मिलने वाली राशि को क्या कहते हैं?",
      [
        "किराया",
        "ब्याज",
        "लाभांश",
        "वेतन"
      ],
      1,
      "जमा धन पर बैंक द्वारा दिया गया प्रतिफल ब्याज कहलाता है।"
    ],
    [
      "बजट किससे संबंधित है?",
      [
        "आय-व्यय की योजना",
        "केवल जनगणना",
        "मौसम पूर्वानुमान",
        "खेल प्रतियोगिता"
      ],
      0,
      "बजट सरकार की अनुमानित आय और व्यय की वित्तीय योजना है।"
    ],
    [
      "भारत में सिक्के जारी करने का अधिकार किसके पास है?",
      [
        "RBI",
        "भारत सरकार",
        "SEBI",
        "SBI"
      ],
      1,
      "भारत सरकार सिक्के जारी करती है।"
    ],
    [
      "राष्ट्रीय आय का अध्ययन किस विषय से जुड़ा है?",
      [
        "अर्थशास्त्र",
        "जीवविज्ञान",
        "भूविज्ञान",
        "भाषाविज्ञान"
      ],
      0,
      "राष्ट्रीय आय अर्थशास्त्र का महत्वपूर्ण विषय है।"
    ],
    [
      "बेरोजगारी का अर्थ क्या है?",
      [
        "काम करने की इच्छा और क्षमता के बावजूद काम न मिलना",
        "काम करना पसंद न करना",
        "छुट्टी लेना",
        "पढ़ाई करना"
      ],
      0,
      "काम करने की इच्छा और क्षमता होने पर भी काम न मिलना बेरोजगारी कहलाता है।"
    ]
  ],
  "Indian Art & Culture": [
    [
      "कथकली किस राज्य की शास्त्रीय नृत्य-नाट्य शैली है?",
      [
        "केरल",
        "तमिलनाडु",
        "असम",
        "मणिपुर"
      ],
      0,
      "कथकली केरल की प्रसिद्ध शास्त्रीय नृत्य-नाट्य शैली है।"
    ],
    [
      "ओडिसी नृत्य किस राज्य से संबंधित है?",
      [
        "ओडिशा",
        "गुजरात",
        "पंजाब",
        "बिहार"
      ],
      0,
      "ओडिसी ओडिशा की शास्त्रीय नृत्य शैली है।"
    ],
    [
      "कुचिपुड़ी किस राज्य से संबंधित है?",
      [
        "आंध्र प्रदेश",
        "केरल",
        "राजस्थान",
        "असम"
      ],
      0,
      "कुचिपुड़ी आंध्र प्रदेश से संबंधित शास्त्रीय नृत्य शैली है।"
    ],
    [
      "सत्रिया नृत्य किस राज्य की शास्त्रीय शैली है?",
      [
        "असम",
        "मणिपुर",
        "ओडिशा",
        "केरल"
      ],
      0,
      "सत्रिया असम की शास्त्रीय नृत्य शैली है।"
    ],
    [
      "मधुबनी चित्रकला मुख्यतः किस राज्य से जुड़ी है?",
      [
        "बिहार",
        "गुजरात",
        "पंजाब",
        "गोवा"
      ],
      0,
      "मधुबनी चित्रकला बिहार के मिथिला क्षेत्र से जुड़ी है।"
    ],
    [
      "वारली चित्रकला किस राज्य की प्रसिद्ध लोक कला है?",
      [
        "महाराष्ट्र",
        "बिहार",
        "असम",
        "केरल"
      ],
      0,
      "वारली चित्रकला महाराष्ट्र की प्रसिद्ध आदिवासी लोक कला है।"
    ],
    [
      "पत्तचित्र कला मुख्यतः किस राज्य से जुड़ी है?",
      [
        "ओडिशा",
        "हरियाणा",
        "पंजाब",
        "सिक्किम"
      ],
      0,
      "पत्तचित्र ओडिशा की पारंपरिक चित्रकला है।"
    ],
    [
      "गरबा किस राज्य का प्रसिद्ध लोक नृत्य है?",
      [
        "गुजरात",
        "बिहार",
        "केरल",
        "असम"
      ],
      0,
      "गरबा गुजरात का प्रसिद्ध लोक नृत्य है।"
    ],
    [
      "भांगड़ा किस राज्य का प्रसिद्ध लोक नृत्य है?",
      [
        "पंजाब",
        "ओडिशा",
        "मणिपुर",
        "तमिलनाडु"
      ],
      0,
      "भांगड़ा पंजाब का प्रसिद्ध लोक नृत्य है।"
    ],
    [
      "मणिपुरी नृत्य किस राज्य से संबंधित है?",
      [
        "मणिपुर",
        "राजस्थान",
        "गुजरात",
        "बिहार"
      ],
      0,
      "मणिपुरी मणिपुर की शास्त्रीय नृत्य शैली है।"
    ]
  ]
};
Object.keys(extraQuestionBank).forEach(subject => {
  if (!competitiveQuestionBank[subject]) competitiveQuestionBank[subject]=[];
  competitiveQuestionBank[subject].push(...extraQuestionBank[subject].map(item => ({q:item[0],options:item[1],answer:String.fromCharCode(65+item[2]),explanation:item[3]})));
});

// Convert V3 competitive questions into the exact format used by this app.
Object.keys(competitiveQuestionBank).forEach(subject => {
  questions[subject] = competitiveQuestionBank[subject].map(item => [
    item.q,
    item.options,
    item.answer.charCodeAt(0) - 65,
    item.explanation
  ]);
});

// ===== 20 Quiz Sections per Subject =====
// Quiz 1 contains all questions already present in the app.
// Quiz 2-20 are reserved for future question sets.
Object.keys(questions).forEach(subject => {
  quizSets[subject] = {};
  quizSets[subject][1] = questions[subject];
});




// ===== Quiz 2: 20 fresh competitive-exam questions per subject =====
const quiz2Data = {"GK":[["भारत का राष्ट्रीय फूल कौन सा है?",["कमल","गुलाब","चमेली","गेंदा"],0,"भारत का राष्ट्रीय फूल कमल है।"],["भारत का राष्ट्रीय पक्षी कौन है?",["तोता","मोर","गरुड़","हंस"],1,"भारत का राष्ट्रीय पक्षी भारतीय मोर है।"],["भारत का राष्ट्रीय वृक्ष कौन सा है?",["नीम","बरगद","पीपल","आम"],1,"बरगद भारत का राष्ट्रीय वृक्ष है।"],["भारत का राष्ट्रीय फल कौन सा है?",["सेब","केला","आम","अमरूद"],2,"आम भारत का राष्ट्रीय फल माना जाता है।"],["भारतीय राष्ट्रीय गीत का नाम क्या है?",["जन गण मन","वंदे मातरम्","सारे जहाँ से अच्छा","ऐ मेरे वतन"],1,"वंदे मातरम् भारत का राष्ट्रीय गीत है।"],["भारतीय राष्ट्रीय गान के रचयिता कौन हैं?",["बंकिमचंद्र चट्टोपाध्याय","रवींद्रनाथ टैगोर","महादेवी वर्मा","सरोजिनी नायडू"],1,"जन गण मन के रचयिता रवींद्रनाथ टैगोर हैं।"],["भारत का राष्ट्रीय चिन्ह किससे लिया गया है?",["सांची स्तूप","सारनाथ का सिंह स्तंभ","कुतुब मीनार","कोणार्क मंदिर"],1,"राष्ट्रीय चिन्ह सारनाथ के अशोक सिंह स्तंभ के शीर्ष से लिया गया है।"],["भारत में कुल कितने राज्य हैं?",["26","27","28","29"],2,"भारत में 28 राज्य हैं।"],["भारत में कितने केंद्र शासित प्रदेश हैं?",["6","7","8","9"],2,"भारत में 8 केंद्र शासित प्रदेश हैं।"],["भारत का सबसे बड़ा नागरिक सम्मान कौन सा है?",["पद्म श्री","पद्म भूषण","भारत रत्न","पद्म विभूषण"],2,"भारत रत्न भारत का सर्वोच्च नागरिक सम्मान है।"],["भारत का सर्वोच्च युद्धकालीन वीरता पुरस्कार कौन सा है?",["अशोक चक्र","परमवीर चक्र","महावीर चक्र","वीर चक्र"],1,"परमवीर चक्र सर्वोच्च युद्धकालीन वीरता पुरस्कार है।"],["भारत का सर्वोच्च शांतिकालीन वीरता पुरस्कार कौन सा है?",["अशोक चक्र","कीर्ति चक्र","शौर्य चक्र","परमवीर चक्र"],0,"अशोक चक्र सर्वोच्च शांतिकालीन वीरता पुरस्कार है।"],["भारत की संसद के कितने सदन हैं?",["एक","दो","तीन","चार"],1,"भारतीय संसद के दो सदन हैं—लोकसभा और राज्यसभा।"],["लोकसभा को किस नाम से भी जाना जाता है?",["उच्च सदन","निचला सदन","राज्य परिषद","संघ परिषद"],1,"लोकसभा संसद का निचला सदन है।"],["राज्यसभा को किस नाम से भी जाना जाता है?",["निचला सदन","लोक परिषद","उच्च सदन","जनसभा"],2,"राज्यसभा संसद का उच्च सदन है।"],["भारत का राष्ट्रीय जलीय जीव कौन है?",["गंगा डॉल्फिन","मगरमच्छ","कछुआ","व्हेल"],0,"गंगा नदी की डॉल्फिन भारत का राष्ट्रीय जलीय जीव है।"],["भारतीय अंतरिक्ष अनुसंधान संगठन का संक्षिप्त नाम क्या है?",["DRDO","ISRO","CSIR","BARC"],1,"Indian Space Research Organisation का संक्षिप्त नाम ISRO है।"],["DRDO का पूरा नाम क्या है?",["Defence Research and Development Organisation","Department of Rail Development Office","Defence Railway Development Organisation","Digital Research and Data Organisation"],0,"DRDO का पूरा नाम Defence Research and Development Organisation है।"],["भारत का पहला उपग्रह कौन सा था?",["आर्यभट्ट","भास्कर","रोहिणी","इनसैट-1A"],0,"आर्यभट्ट भारत का पहला उपग्रह था।"],["भारत का राष्ट्रीय कैलेंडर किस संवत पर आधारित है?",["विक्रम संवत","शक संवत","हिजरी संवत","बौद्ध संवत"],1,"भारत का राष्ट्रीय कैलेंडर शक संवत पर आधारित है।"]],"Geography":[["भारत की सबसे लंबी नदी कौन सी है?",["यमुना","गंगा","गोदावरी","नर्मदा"],1,"भारत में बहने वाली सबसे लंबी नदी गंगा है।"],["भारत का दक्षिणतम बिंदु कौन सा है?",["कन्याकुमारी","इंदिरा प्वाइंट","रामेश्वरम","पोर्ट ब्लेयर"],1,"भारत का दक्षिणतम बिंदु इंदिरा प्वाइंट है।"],["भारत की सबसे बड़ी मीठे पानी की झील कौन सी है?",["वूलर झील","चिल्का झील","सांभर झील","लोकटक झील"],0,"वूलर झील भारत की प्रमुख और सबसे बड़ी मीठे पानी की झीलों में है।"],["चिल्का झील किस राज्य में स्थित है?",["पश्चिम बंगाल","ओडिशा","आंध्र प्रदेश","केरल"],1,"चिल्का झील ओडिशा में स्थित है।"],["सांभर झील किस राज्य में है?",["गुजरात","राजस्थान","मध्य प्रदेश","हरियाणा"],1,"सांभर झील राजस्थान में स्थित है।"],["लोकटक झील किस राज्य में है?",["मणिपुर","मेघालय","मिजोरम","त्रिपुरा"],0,"लोकटक झील मणिपुर में स्थित है।"],["नर्मदा नदी किस सागर में गिरती है?",["बंगाल की खाड़ी","अरब सागर","हिंद महासागर","लाल सागर"],1,"नर्मदा नदी अरब सागर में गिरती है।"],["ताप्ती नदी किस सागर में गिरती है?",["अरब सागर","बंगाल की खाड़ी","कैस्पियन सागर","हिंद महासागर"],0,"ताप्ती नदी अरब सागर में गिरती है।"],["भारत में कर्क रेखा कितने राज्यों से गुजरती है?",["6","7","8","9"],2,"कर्क रेखा भारत के 8 राज्यों से गुजरती है।"],["भारत का सबसे ऊँचा पर्वत शिखर जो पूरी तरह भारत में स्थित है, कौन सा है?",["नंदा देवी","कंचनजंघा","कामेत","अनामुडी"],0,"नंदा देवी भारत में स्थित सबसे ऊँची पर्वत चोटियों में प्रमुख है।"],["सुंदरबन डेल्टा मुख्यतः किन नदियों से बना है?",["गंगा-ब्रह्मपुत्र-मेघना","नर्मदा-ताप्ती","गोदावरी-कृष्णा","सिंधु-झेलम"],0,"सुंदरबन डेल्टा गंगा, ब्रह्मपुत्र और मेघना नदी तंत्र से बनता है।"],["दक्कन का पठार मुख्यतः किस प्रकार की चट्टानों से संबंधित है?",["बेसाल्ट","चूना पत्थर","बलुआ पत्थर","संगमरमर"],0,"दक्कन ट्रैप का आधार मुख्यतः बेसाल्टिक लावा से बना है।"],["भारत में सबसे अधिक वर्षा वाला स्थान कौन सा माना जाता है?",["जैसलमेर","मौसिनराम","दिल्ली","लेह"],1,"मेघालय का मौसिनराम अत्यधिक वार्षिक वर्षा के लिए प्रसिद्ध है।"],["थार मरुस्थल मुख्यतः किस राज्य में है?",["राजस्थान","बिहार","असम","ओडिशा"],0,"थार मरुस्थल का अधिकांश भाग राजस्थान में है।"],["नीलगिरि पहाड़ियाँ किन राज्यों के संगम क्षेत्र में हैं?",["तमिलनाडु-कर्नाटक-केरल","बिहार-झारखंड-ओडिशा","गुजरात-महाराष्ट्र-गोवा","पंजाब-हरियाणा-राजस्थान"],0,"नीलगिरि पहाड़ियाँ तमिलनाडु, कर्नाटक और केरल के संगम क्षेत्र में हैं।"],["भारत का सबसे लंबा समुद्र तट किस राज्य के पास है?",["गुजरात","तमिलनाडु","आंध्र प्रदेश","ओडिशा"],0,"भारत के राज्यों में सबसे लंबी तटरेखा गुजरात की है।"],["पश्चिमी घाट का दूसरा नाम क्या है?",["सह्याद्रि","अरावली","शिवालिक","काराकोरम"],0,"पश्चिमी घाट को सह्याद्रि भी कहा जाता है।"],["अरावली पर्वतमाला की दिशा सामान्यतः कैसी है?",["उत्तर-पूर्व से दक्षिण-पश्चिम","उत्तर-पश्चिम से दक्षिण-पूर्व","पूर्व से पश्चिम","उत्तर से दक्षिण"],0,"अरावली पर्वतमाला की सामान्य दिशा उत्तर-पूर्व से दक्षिण-पश्चिम है।"],["ब्रह्मपुत्र भारत में मुख्यतः किस राज्य से होकर बहती है?",["असम","बिहार","गुजरात","पंजाब"],0,"ब्रह्मपुत्र असम में प्रमुख नदी के रूप में बहती है।"],["कावेरी नदी का उद्गम किस राज्य में है?",["कर्नाटक","तमिलनाडु","केरल","आंध्र प्रदेश"],0,"कावेरी का उद्गम कर्नाटक के ब्रह्मगिरि क्षेत्र में है।"]],"Polity":[["भारतीय संविधान की प्रस्तावना में भारत को किस रूप में वर्णित किया गया है?",["संघीय राजतंत्र","सम्प्रभु समाजवादी पंथनिरपेक्ष लोकतांत्रिक गणराज्य","एकात्मक राजतंत्र","सैन्य गणराज्य"],1,"प्रस्तावना भारत को सम्प्रभु, समाजवादी, पंथनिरपेक्ष, लोकतांत्रिक गणराज्य बताती है।"],["मौलिक अधिकार संविधान के किस भाग में हैं?",["भाग II","भाग III","भाग IV","भाग V"],1,"मौलिक अधिकार संविधान के भाग III में हैं।"],["राज्य के नीति निदेशक तत्व किस भाग में हैं?",["भाग III","भाग IV","भाग V","भाग VI"],1,"नीति निदेशक तत्व भाग IV में हैं।"],["मौलिक कर्तव्य किस अनुच्छेद में हैं?",["अनुच्छेद 32","अनुच्छेद 51A","अनुच्छेद 21","अनुच्छेद 368"],1,"मौलिक कर्तव्य अनुच्छेद 51A में हैं।"],["संविधान संशोधन की प्रक्रिया मुख्यतः किस अनुच्छेद में है?",["अनुच्छेद 123","अनुच्छेद 280","अनुच्छेद 368","अनुच्छेद 356"],2,"संविधान संशोधन की प्रक्रिया अनुच्छेद 368 में है।"],["भारत के राष्ट्रपति का कार्यकाल कितने वर्ष का होता है?",["4","5","6","7"],1,"राष्ट्रपति का कार्यकाल 5 वर्ष है।"],["लोकसभा का सामान्य कार्यकाल कितने वर्ष का है?",["4","5","6","7"],1,"लोकसभा का सामान्य कार्यकाल 5 वर्ष है।"],["राज्यसभा के एक सदस्य का सामान्य कार्यकाल कितने वर्ष का है?",["4","5","6","7"],2,"राज्यसभा सदस्य का कार्यकाल 6 वर्ष होता है।"],["राज्यसभा के कितने सदस्य हर दो वर्ष में सेवानिवृत्त होते हैं?",["एक-चौथाई","एक-तिहाई","आधे","दो-तिहाई"],1,"राज्यसभा के लगभग एक-तिहाई सदस्य हर दो वर्ष में सेवानिवृत्त होते हैं।"],["भारत के उपराष्ट्रपति राज्यसभा में किस पद पर होते हैं?",["नेता सदन","सभापति","उपसभापति","महासचिव"],1,"उपराष्ट्रपति राज्यसभा के पदेन सभापति होते हैं।"],["लोकसभा का अध्यक्ष किस सदन द्वारा चुना जाता है?",["राष्ट्रपति","लोकसभा","राज्यसभा","सुप्रीम कोर्ट"],1,"लोकसभा अपने अध्यक्ष का चुनाव स्वयं करती है।"],["भारत में सर्वोच्च न्यायालय की स्थापना कब हुई?",["1947","1950","1952","1956"],1,"सर्वोच्च न्यायालय ने 1950 में कार्य करना शुरू किया।"],["संविधान का अनुच्छेद 32 किस अधिकार से संबंधित है?",["समानता","संवैधानिक उपचार","धर्म की स्वतंत्रता","शिक्षा"],1,"अनुच्छेद 32 संवैधानिक उपचार के अधिकार से संबंधित है।"],["भारत में मतदान की न्यूनतम आयु कितनी है?",["16 वर्ष","18 वर्ष","21 वर्ष","25 वर्ष"],1,"भारत में मतदान की न्यूनतम आयु 18 वर्ष है।"],["मतदान की आयु 21 से 18 वर्ष किस संशोधन से हुई?",["42वाँ","44वाँ","61वाँ","73वाँ"],2,"61वें संविधान संशोधन अधिनियम ने मतदान आयु 18 वर्ष की।"],["पंचायती राज से संबंधित संशोधन कौन सा है?",["61वाँ","73वाँ","74वाँ","86वाँ"],1,"73वाँ संशोधन पंचायती राज से संबंधित है।"],["नगरपालिकाओं से संबंधित संविधान संशोधन कौन सा है?",["72वाँ","73वाँ","74वाँ","75वाँ"],2,"74वाँ संशोधन नगरपालिकाओं से संबंधित है।"],["भारत का नियंत्रक एवं महालेखा परीक्षक किस अनुच्छेद में है?",["148","280","324","360"],0,"CAG का प्रावधान अनुच्छेद 148 में है।"],["निर्वाचन आयोग का प्रावधान किस अनुच्छेद में है?",["280","324","356","368"],1,"निर्वाचन आयोग का प्रावधान अनुच्छेद 324 में है।"],["वित्त आयोग का प्रावधान किस अनुच्छेद में है?",["148","280","324","315"],1,"वित्त आयोग का प्रावधान अनुच्छेद 280 में है।"]],"History":[["सिंधु घाटी सभ्यता का प्रसिद्ध बंदरगाह कौन सा था?",["हड़प्पा","लोथल","कालीबंगा","मोहनजोदड़ो"],1,"लोथल एक प्रमुख प्राचीन बंदरगाह स्थल था।"],["मोहनजोदड़ो वर्तमान में किस देश में है?",["भारत","पाकिस्तान","नेपाल","अफगानिस्तान"],1,"मोहनजोदड़ो वर्तमान पाकिस्तान में स्थित है।"],["हड़प्पा स्थल किस नदी के तट पर था?",["रावी","गंगा","यमुना","नर्मदा"],0,"हड़प्पा रावी नदी के निकट स्थित था।"],["बौद्ध धर्म के संस्थापक कौन माने जाते हैं?",["महावीर","गौतम बुद्ध","अशोक","नागार्जुन"],1,"बौद्ध धर्म के संस्थापक गौतम बुद्ध माने जाते हैं।"],["जैन धर्म के 24वें तीर्थंकर कौन थे?",["पार्श्वनाथ","महावीर","ऋषभदेव","नेमिनाथ"],1,"महावीर जैन धर्म के 24वें तीर्थंकर थे।"],["मौर्य साम्राज्य के संस्थापक कौन थे?",["अशोक","चंद्रगुप्त मौर्य","बिंदुसार","कनिष्क"],1,"चंद्रगुप्त मौर्य ने मौर्य साम्राज्य की स्थापना की।"],["अशोक ने कलिंग युद्ध के बाद किस धर्म को अपनाया?",["जैन धर्म","बौद्ध धर्म","सिख धर्म","इस्लाम"],1,"कलिंग युद्ध के बाद अशोक बौद्ध धर्म से प्रभावित हुए।"],["गुप्त काल को प्रायः किस नाम से जाना जाता है?",["लौह युग","स्वर्ण युग","पाषाण युग","औद्योगिक युग"],1,"गुप्त काल को भारतीय इतिहास का स्वर्ण युग कहा जाता है।"],["कुतुब मीनार का निर्माण किसने शुरू कराया?",["अलाउद्दीन खिलजी","कुतुबुद्दीन ऐबक","इल्तुतमिश","बलबन"],1,"कुतुबुद्दीन ऐबक ने कुतुब मीनार का निर्माण शुरू कराया।"],["मुगल साम्राज्य का संस्थापक कौन था?",["अकबर","बाबर","हुमायूँ","शाहजहाँ"],1,"बाबर ने 1526 में मुगल साम्राज्य की स्थापना की।"],["पानीपत का प्रथम युद्ध कब हुआ?",["1526","1556","1761","1757"],0,"प्रथम पानीपत का युद्ध 1526 में हुआ।"],["प्लासी का युद्ध कब हुआ?",["1757","1764","1857","1740"],0,"प्लासी का युद्ध 1757 में हुआ।"],["बक्सर का युद्ध कब हुआ?",["1757","1764","1772","1857"],1,"बक्सर का युद्ध 1764 में हुआ।"],["1857 का विद्रोह सबसे पहले कहाँ से शुरू हुआ?",["दिल्ली","मेरठ","कानपुर","झाँसी"],1,"1857 का विद्रोह 10 मई को मेरठ से शुरू हुआ।"],["भारतीय राष्ट्रीय कांग्रेस की स्थापना कब हुई?",["1885","1905","1919","1942"],0,"भारतीय राष्ट्रीय कांग्रेस की स्थापना 1885 में हुई।"],["भारतीय राष्ट्रीय कांग्रेस के प्रथम अध्यक्ष कौन थे?",["दादाभाई नौरोजी","डब्ल्यू. सी. बनर्जी","ए. ओ. ह्यूम","गोपाल कृष्ण गोखले"],1,"1885 में कांग्रेस के प्रथम अध्यक्ष डब्ल्यू. सी. बनर्जी थे।"],["बंगाल विभाजन किस वर्ष हुआ?",["1905","1911","1919","1920"],0,"बंगाल विभाजन 1905 में हुआ।"],["जलियांवाला बाग हत्याकांड किस वर्ष हुआ?",["1905","1919","1922","1930"],1,"जलियांवाला बाग हत्याकांड 1919 में हुआ।"],["दांडी मार्च किस आंदोलन से जुड़ा था?",["भारत छोड़ो आंदोलन","सविनय अवज्ञा आंदोलन","असहयोग आंदोलन","स्वदेशी आंदोलन"],1,"दांडी मार्च 1930 के सविनय अवज्ञा आंदोलन से जुड़ा था।"],["साइमन कमीशन भारत कब आया?",["1919","1927","1928","1935"],2,"साइमन कमीशन 1928 में भारत आया।"]],"Science":[["प्रकाश की चाल निर्वात में लगभग कितनी है?",["3×10⁶ m/s","3×10⁸ m/s","3×10¹⁰ m/s","3×10⁴ m/s"],1,"निर्वात में प्रकाश की चाल लगभग 3×10⁸ m/s है।"],["बल की SI इकाई क्या है?",["जूल","न्यूटन","वाट","पास्कल"],1,"बल की SI इकाई न्यूटन है।"],["कार्य की SI इकाई क्या है?",["न्यूटन","जूल","वाट","एम्पियर"],1,"कार्य की SI इकाई जूल है।"],["शक्ति की SI इकाई क्या है?",["वाट","जूल","न्यूटन","वोल्ट"],0,"शक्ति की SI इकाई वाट है।"],["विद्युत धारा की SI इकाई क्या है?",["वोल्ट","ओम","एम्पियर","कूलॉम"],2,"विद्युत धारा की SI इकाई एम्पियर है।"],["प्रतिरोध की SI इकाई क्या है?",["ओम","वोल्ट","वाट","फैरड"],0,"प्रतिरोध की SI इकाई ओम है।"],["आवृत्ति की SI इकाई क्या है?",["हर्ट्ज","न्यूटन","जूल","पास्कल"],0,"आवृत्ति की SI इकाई हर्ट्ज है।"],["अम्ल का pH सामान्यतः कितना होता है?",["7 से कम","7 के बराबर","7 से अधिक","14 से अधिक"],0,"अम्लीय विलयन का pH 7 से कम होता है।"],["क्षार का pH सामान्यतः कितना होता है?",["7 से कम","7 के बराबर","7 से अधिक","0"],2,"क्षारीय विलयन का pH 7 से अधिक होता है।"],["साधारण नमक का रासायनिक सूत्र क्या है?",["NaCl","KCl","NaOH","HCl"],0,"साधारण नमक का सूत्र NaCl है।"],["कार्बन डाइऑक्साइड का सूत्र क्या है?",["CO","CO₂","C₂O","CaCO₃"],1,"कार्बन डाइऑक्साइड का रासायनिक सूत्र CO₂ है।"],["ऑक्सीजन का रासायनिक सूत्र क्या है?",["O","O₂","O₃","OH"],1,"सामान्य ऑक्सीजन अणु O₂ होता है।"],["मानव शरीर का सबसे बड़ा अंग कौन सा है?",["हृदय","त्वचा","यकृत","फेफड़ा"],1,"त्वचा मानव शरीर का सबसे बड़ा अंग है।"],["मानव शरीर में इंसुलिन किस अंग द्वारा बनता है?",["यकृत","अग्न्याशय","गुर्दा","हृदय"],1,"इंसुलिन अग्न्याशय की बीटा कोशिकाओं द्वारा बनता है।"],["रक्त में ऑक्सीजन का परिवहन मुख्यतः किसके द्वारा होता है?",["प्लाज्मा","हीमोग्लोबिन","प्लेटलेट्स","श्वेत रक्त कोशिकाएँ"],1,"हीमोग्लोबिन ऑक्सीजन के परिवहन में मुख्य भूमिका निभाता है।"],["विटामिन C की कमी से कौन सा रोग होता है?",["रिकेट्स","स्कर्वी","रातांधता","बेरी-बेरी"],1,"विटामिन C की कमी से स्कर्वी होता है।"],["विटामिन D की कमी से कौन सा रोग होता है?",["स्कर्वी","रिकेट्स","एनीमिया","घेंघा"],1,"विटामिन D की कमी से बच्चों में रिकेट्स हो सकता है।"],["मानव शरीर में रक्त का शुद्धीकरण मुख्यतः किस अंग द्वारा होता है?",["गुर्दे","हृदय","त्वचा","अग्न्याशय"],0,"गुर्दे रक्त से अपशिष्ट पदार्थों को छानने में मुख्य भूमिका निभाते हैं।"],["पौधों में प्रकाश संश्लेषण मुख्यतः किस अंगक में होता है?",["माइटोकॉन्ड्रिया","क्लोरोप्लास्ट","राइबोसोम","नाभिक"],1,"प्रकाश संश्लेषण क्लोरोप्लास्ट में होता है।"],["ध्वनि निर्वात में क्यों नहीं चलती?",["प्रकाश नहीं होता","माध्यम नहीं होता","गुरुत्व नहीं होता","तापमान कम होता है"],1,"ध्वनि के प्रसार के लिए भौतिक माध्यम आवश्यक होता है।"]],"Maths":[["480 का 25% कितना है?",["100","120","140","160"],1,"480 × 25/100 = 120."],["250 का 12% कितना है?",["25","30","35","40"],1,"250 × 12/100 = 30."],["एक वस्तु का अंकित मूल्य 800 रुपये है और 10% छूट है। विक्रय मूल्य क्या होगा?",["700","720","740","760"],1,"800 का 10% = 80, इसलिए विक्रय मूल्य 720 रुपये है।"],["यदि 5 पेन की कीमत 60 रुपये है, तो 8 पेन की कीमत कितनी होगी?",["84","90","96","100"],2,"एक पेन 12 रुपये का है; 8 पेन = 96 रुपये।"],["अनुपात 3:5 में कुल 64 बाँटे जाएँ, तो पहला भाग कितना होगा?",["20","24","28","32"],1,"कुल 8 भाग हैं; 64×3/8 = 24."],["15, 20 और 25 का औसत क्या है?",["18","20","22","25"],1,"(15+20+25)/3 = 20."],["12 और 18 का LCM क्या है?",["24","30","36","48"],2,"12 और 18 का LCM 36 है।"],["24 और 36 का HCF क्या है?",["6","8","12","18"],2,"24 और 36 का HCF 12 है।"],["एक संख्या 200 से 15% बढ़ती है। नई संख्या क्या होगी?",["215","225","230","240"],2,"200 का 15% = 30, इसलिए नई संख्या 230 है।"],["एक संख्या 500 से 20% घटती है। नई संख्या क्या होगी?",["380","400","420","450"],1,"500 का 20% = 100, इसलिए नई संख्या 400 है।"],["एक आयत की लंबाई 12 cm और चौड़ाई 5 cm है। क्षेत्रफल क्या है?",["17 cm²","34 cm²","60 cm²","120 cm²"],2,"क्षेत्रफल = 12×5 = 60 cm²."],["वर्ग की भुजा 9 cm है। उसका क्षेत्रफल क्या होगा?",["18 cm²","36 cm²","72 cm²","81 cm²"],3,"वर्ग का क्षेत्रफल 9×9 = 81 cm²."],["वर्ग की भुजा 7 cm है। उसका परिमाप क्या होगा?",["14 cm","21 cm","28 cm","49 cm"],2,"परिमाप = 4×7 = 28 cm."],["एक ट्रेन 60 km/h की गति से 2 घंटे चले तो दूरी कितनी होगी?",["100 km","120 km","140 km","160 km"],1,"दूरी = गति×समय = 60×2 = 120 km."],["यदि किसी संख्या का 40% = 80 है, तो संख्या क्या है?",["160","180","200","240"],2,"संख्या = 80×100/40 = 200."],["500 रुपये पर 10% वार्षिक साधारण ब्याज 2 वर्षों का कितना होगा?",["50","75","100","125"],2,"SI = 500×10×2/100 = 100 रुपये।"],["1000 रुपये पर 5% वार्षिक साधारण ब्याज 3 वर्षों का मिश्रधन क्या होगा?",["1050","1100","1150","1200"],2,"ब्याज 150 रुपये है; मिश्रधन 1150 रुपये।"],["एक संख्या का 3/5 = 24 है। संख्या क्या है?",["30","36","40","45"],2,"संख्या = 24×5/3 = 40."],["2 घंटे 30 मिनट में कुल कितने मिनट होते हैं?",["120","130","150","180"],2,"2 घंटे = 120 मिनट; 120+30 = 150 मिनट।"],["0.75 को भिन्न में बदलें।",["1/2","2/3","3/4","4/5"],2,"0.75 = 75/100 = 3/4."]],"Reasoning":[["श्रृंखला: 3, 6, 12, 24, ?",["36","42","48","54"],2,"हर पद पिछले पद का 2 गुना है।"],["श्रृंखला: 5, 10, 15, 20, ?",["22","25","30","35"],1,"हर बार 5 जोड़ा गया है।"],["श्रृंखला: 1, 4, 9, 16, ?",["20","25","36","49"],1,"ये क्रमशः 1², 2², 3², 4² हैं; अगला 5² = 25."],["श्रृंखला: 2, 5, 10, 17, ?",["24","26","28","30"],1,"अंतर 3,5,7 है; अगला अंतर 9, इसलिए 26."],["यदि BOOK को CPPL लिखा जाए, तो PEN को क्या लिखा जाएगा?",["QFO","QEN","PFN","RGP"],0,"हर अक्षर में 1 जोड़ा गया है।"],["यदि MANGO को NBOHP लिखा जाए, तो APPLE को क्या लिखा जाएगा?",["BQQMF","BPPMF","BQQLF","CQPMF"],0,"हर अक्षर को एक स्थान आगे किया गया है।"],["एक व्यक्ति उत्तर की ओर 10 m चलता है, फिर दाएँ मुड़कर 5 m चलता है। वह प्रारंभिक स्थान से किस दिशा में है?",["उत्तर-पश्चिम","उत्तर-पूर्व","दक्षिण-पूर्व","दक्षिण-पश्चिम"],1,"उत्तर के बाद दाएँ मुड़ने पर पूर्व दिशा आती है; स्थिति उत्तर-पूर्व है।"],["राम, श्याम से लंबा है और श्याम, मोहन से लंबा है। सबसे छोटा कौन है?",["राम","श्याम","मोहन","निश्चित नहीं"],2,"राम > श्याम > मोहन, इसलिए मोहन सबसे छोटा है।"],["एक कक्षा में रवि ऊपर से 7वाँ और नीचे से 14वाँ है। कुल विद्यार्थी कितने हैं?",["19","20","21","22"],1,"कुल = 7+14−1 = 20."],["यदि आज सोमवार है, तो 10 दिन बाद कौन सा दिन होगा?",["बुधवार","गुरुवार","शुक्रवार","शनिवार"],1,"10 mod 7 = 3; सोमवार से 3 दिन बाद गुरुवार।"],["यदि सभी गुलाब फूल हैं और कुछ फूल लाल हैं, तो कौन सा निष्कर्ष निश्चित है?",["सभी गुलाब लाल हैं","कुछ गुलाब लाल हैं","सभी गुलाब फूल हैं","कोई फूल लाल नहीं है"],2,"पहला कथन सीधे बताता है कि सभी गुलाब फूल हैं।"],["विषम चुनें: 2, 4, 8, 16, 18",["2","8","16","18"],3,"2,4,8,16 क्रम में 2 की घातें हैं; 18 अलग है।"],["विषम चुनें: सेब, आम, केला, गाजर",["सेब","आम","केला","गाजर"],3,"गाजर सब्जी है, बाकी फल हैं।"],["A, B का भाई है और B, C की बहन है। A का C से क्या संबंध निश्चित है?",["भाई","बहन","पिता","निश्चित नहीं"],3,"B का लिंग और A का लिंग दिए हैं, पर C का लिंग नहीं; इसलिए संबंध निश्चित नहीं।"],["यदि SOUTH को TPVUI लिखा जाए, तो NORTH को क्या लिखा जाएगा?",["OPSUI","OPSTI","NPSUI","OQSVI"],0,"हर अक्षर को एक स्थान आगे किया गया है।"],["घड़ी में 3 बजे घंटे और मिनट की सुई के बीच कोण कितना होता है?",["60°","90°","120°","180°"],1,"3 बजे मिनट की सुई 12 पर और घंटे की 3 पर होती है; कोण 90° है।"],["यदि 1 जनवरी सोमवार है, तो 8 जनवरी कौन सा दिन होगा?",["रविवार","सोमवार","मंगलवार","बुधवार"],1,"7 दिन बाद वही दिन आता है, इसलिए सोमवार।"],["श्रृंखला: 100, 90, 80, 70, ?",["50","55","60","65"],2,"हर बार 10 घटाया गया है।"],["श्रृंखला: 2, 3, 5, 8, 13, ?",["18","20","21","22"],2,"हर पद पिछले दो पदों का योग है; 8+13 = 21."],["यदि सभी A, B हैं और सभी B, C हैं, तो निश्चित निष्कर्ष क्या है?",["सभी C, A हैं","सभी A, C हैं","कुछ C, A नहीं हैं","कोई A, C नहीं है"],1,"A के सभी सदस्य B और B के सभी सदस्य C हैं, इसलिए सभी A, C हैं।"]],"Hindi":[["‘अग्नि’ का पर्यायवाची कौन सा है?",["अनल","अंबर","अमृत","अचल"],0,"अग्नि का पर्यायवाची अनल है।"],["‘आकाश’ का पर्यायवाची कौन सा है?",["पवन","नभ","नीर","अनल"],1,"आकाश का पर्यायवाची नभ है।"],["‘दिन’ का विलोम क्या है?",["संध्या","रात","प्रभात","दोपहर"],1,"दिन का विलोम रात है।"],["‘लाभ’ का विलोम क्या है?",["हानि","उन्नति","वृद्धि","जीत"],0,"लाभ का विलोम हानि है।"],["‘नदी’ शब्द का लिंग क्या है?",["पुल्लिंग","स्त्रीलिंग","उभयलिंग","नपुंसकलिंग"],1,"‘नदी’ स्त्रीलिंग शब्द है।"],["‘लड़का’ का बहुवचन क्या है?",["लड़की","लड़के","लड़कियाँ","लड़कों"],1,"‘लड़का’ का सामान्य बहुवचन ‘लड़के’ है।"],["‘मैं स्कूल जाता हूँ।’ वाक्य में सर्वनाम कौन सा है?",["स्कूल","जाता","मैं","हूँ"],2,"‘मैं’ सर्वनाम है।"],["‘राम ने फल खाया।’ में कर्ता कौन है?",["फल","खाया","राम","ने"],2,"कार्य करने वाला कर्ता राम है।"],["‘सुंदर’ किस प्रकार का विशेषण है?",["गुणवाचक","संख्यावाचक","परिमाणवाचक","सार्वनामिक"],0,"‘सुंदर’ गुण बताता है, इसलिए गुणवाचक विशेषण है।"],["‘तीन लड़के’ में ‘तीन’ कौन सा विशेषण है?",["गुणवाचक","संख्यावाचक","परिमाणवाचक","संबंधवाचक"],1,"‘तीन’ निश्चित संख्या बताता है।"],["‘धीरे-धीरे’ किस प्रकार का क्रियाविशेषण है?",["कालवाचक","स्थानवाचक","रीतिवाचक","परिमाणवाचक"],2,"‘धीरे-धीरे’ कार्य की रीति बताता है।"],["‘कल मैं बाजार गया।’ में ‘कल’ क्या है?",["संज्ञा","क्रियाविशेषण","सर्वनाम","विशेषण"],1,"‘कल’ समय बताने वाला क्रियाविशेषण है।"],["‘जो मेहनत करता है, वह सफल होता है।’ यह कौन सा वाक्य है?",["सरल","संयुक्त","मिश्र","विस्मयादिबोधक"],2,"इसमें एक प्रधान और एक आश्रित उपवाक्य है, इसलिए मिश्र वाक्य है।"],["‘राम आया और श्याम चला गया।’ कौन सा वाक्य है?",["सरल","संयुक्त","मिश्र","प्रश्नवाचक"],1,"दो स्वतंत्र उपवाक्य ‘और’ से जुड़े हैं, इसलिए संयुक्त वाक्य है।"],["‘आँखों का तारा’ मुहावरे का अर्थ क्या है?",["बहुत प्रिय","बहुत दूर","बहुत क्रोधित","बहुत गरीब"],0,"‘आँखों का तारा’ का अर्थ बहुत प्रिय व्यक्ति है।"],["‘नाक कटना’ मुहावरे का अर्थ क्या है?",["सम्मान मिलना","अपमान होना","बीमार होना","तेज दौड़ना"],1,"‘नाक कटना’ का अर्थ अपमान होना है।"],["‘अधजल गगरी छलकत जाए’ का भाव क्या है?",["कम ज्ञान वाला अधिक दिखावा करता है","मेहनत का फल मिलता है","समय अमूल्य है","एकता में बल है"],0,"मुहावरे का आशय है कि कम ज्ञान वाला व्यक्ति अधिक दिखावा करता है।"],["‘दूध का दूध, पानी का पानी’ का अर्थ क्या है?",["न्यायपूर्ण निर्णय","बहुत मेहनत","धोखा देना","जल्दी करना"],0,"इसका अर्थ सत्य और असत्य को स्पष्ट कर देना है।"],["‘विद्या + आलय’ का संधि रूप क्या है?",["विद्यालय","विद्यलय","विद्याआलय","विदालय"],0,"विद्या + आलय से विद्यालय बनता है।"],["‘राजा का पुत्र’ का समास रूप क्या है?",["राजपुत्र","राजमहल","राजमार्ग","राजर्षि"],0,"राजा का पुत्र = राजपुत्र, यह तत्पुरुष समास है।"]],"English":[["Choose the correct plural of “Child”.",["Childs","Children","Childes","Childrens"],1,"The standard plural of child is children."],["Choose the correct past tense of “Go”.",["Goed","Gone","Went","Going"],2,"The simple past of go is went."],["Choose the correct article: “___ apple a day keeps the doctor away.”",["A","An","The","No article"],1,"“Apple” begins with a vowel sound, so “an” is used."],["Choose the synonym of “Brave”.",["Coward","Courageous","Weak","Lazy"],1,"Courageous means brave."],["Choose the antonym of “Expand”.",["Increase","Extend","Contract","Enlarge"],2,"Contract means become smaller or reduce in size."],["Choose the correct spelling.",["Separate","Seperate","Seprate","Seperete"],0,"The correct spelling is Separate."],["Identify the noun: “Honesty is the best policy.”",["best","is","Honesty","the"],2,"Honesty is a noun naming a quality."],["Identify the adjective: “She wore a beautiful dress.”",["She","wore","beautiful","dress"],2,"Beautiful describes the noun dress, so it is an adjective."],["Identify the adverb: “He runs quickly.”",["He","runs","quickly","none"],2,"Quickly modifies the verb runs, so it is an adverb."],["Choose the correct form: “They ___ playing cricket.”",["is","am","are","was"],2,"The plural subject they takes are."],["Choose the correct form: “He ___ to school every day.”",["go","goes","going","gone"],1,"With third-person singular he, the simple present uses goes."],["Choose the correct preposition: “The book is ___ the table.”",["in","on","at","by"],1,"On is used for something resting on a surface."],["Choose the correct conjunction: “I was tired ___ I continued working.”",["but","because","or","so"],0,"But connects two contrasting ideas."],["What is the comparative form of “Good”?",["Gooder","Best","Better","More good"],2,"The comparative form of good is better."],["What is the superlative form of “Bad”?",["Badder","Worst","Worse","Most bad"],1,"The superlative form of bad is worst."],["Choose the passive voice: “Ram wrote a letter.”",["A letter was written by Ram.","Ram was written by a letter.","A letter writes Ram.","Ram is writing a letter."],0,"The passive form is A letter was written by Ram."],["Choose the correct question tag: “You are coming, ___?”",["are you","aren’t you","isn’t it","don’t you"],1,"A positive statement with are takes the negative tag aren’t you."],["Choose the correct indirect speech: He said, “I am tired.”",["He said that he was tired.","He said that I am tired.","He says he tired.","He said that he is tired always."],0,"In standard reported speech, am changes to was with the past reporting verb."],["Choose the correct synonym of “Rapid”.",["Slow","Fast","Late","Weak"],1,"Rapid means fast."],["Choose the antonym of “Ancient”.",["Old","Modern","Historic","Past"],1,"Modern is the opposite of ancient."]],"Economics":[["भारत में मौद्रिक नीति मुख्यतः कौन बनाता है?",["RBI","SEBI","NITI Aayog","वित्त आयोग"],0,"भारत में मौद्रिक नीति का संचालन RBI करता है।"],["RBI का मुख्यालय कहाँ है?",["नई दिल्ली","मुंबई","कोलकाता","चेन्नई"],1,"RBI का केंद्रीय कार्यालय मुंबई में है।"],["भारत में केंद्रीय बैंक कौन सा है?",["SBI","RBI","PNB","NABARD"],1,"Reserve Bank of India भारत का केंद्रीय बैंक है।"],["GDP का पूरा नाम क्या है?",["Gross Domestic Product","General Domestic Price","Gross Development Plan","General Development Product"],0,"GDP का पूरा नाम Gross Domestic Product है।"],["मुद्रास्फीति का सामान्य अर्थ क्या है?",["कीमतों के सामान्य स्तर में वृद्धि","बेरोजगारी में कमी","उत्पादन का शून्य होना","करों का समाप्त होना"],0,"मुद्रास्फीति में वस्तुओं और सेवाओं के सामान्य मूल्य स्तर में वृद्धि होती है।"],["भारत में GST कब लागू हुआ?",["2014","2016","2017","2019"],2,"GST भारत में 1 जुलाई 2017 को लागू हुआ।"],["GST का पूरा नाम क्या है?",["Goods and Services Tax","General Sales Tax","Goods Supply Tariff","Government Service Tax"],0,"GST का पूरा नाम Goods and Services Tax है।"],["प्रत्यक्ष कर का उदाहरण कौन सा है?",["GST","आयकर","सीमा शुल्क","उत्पाद शुल्क"],1,"आयकर प्रत्यक्ष कर है।"],["अप्रत्यक्ष कर का उदाहरण कौन सा है?",["आयकर","कॉर्पोरेट कर","GST","संपत्ति कर"],2,"GST एक अप्रत्यक्ष कर है।"],["SEBI मुख्यतः किस क्षेत्र को नियंत्रित करता है?",["बैंकिंग","प्रतिभूति बाजार","कृषि","रेलवे"],1,"SEBI प्रतिभूति बाजार का नियमन करता है।"],["NABARD मुख्यतः किस क्षेत्र से संबंधित है?",["कृषि और ग्रामीण विकास","अंतरिक्ष","रक्षा","रेलवे"],0,"NABARD कृषि और ग्रामीण विकास से संबंधित प्रमुख संस्था है।"],["भारत में नोट जारी करने का प्रमुख अधिकार किसके पास है?",["RBI","SEBI","SBI","वित्त आयोग"],0,"RBI अधिकांश बैंक नोट जारी करता है; एक रुपये का नोट भारत सरकार जारी करती है।"],["बेरोजगारी का अर्थ क्या है?",["काम करने की इच्छा और क्षमता होने पर काम न मिलना","काम न करना क्योंकि इच्छा नहीं है","केवल पढ़ाई करना","सेवानिवृत्ति"],0,"बेरोजगारी में व्यक्ति काम करने की इच्छा और क्षमता रखते हुए रोजगार नहीं पा रहा होता है।"],["प्रति व्यक्ति आय कैसे प्राप्त की जाती है?",["राष्ट्रीय आय ÷ जनसंख्या","जनसंख्या ÷ राष्ट्रीय आय","GDP × जनसंख्या","कर ÷ जनसंख्या"],0,"प्रति व्यक्ति आय = राष्ट्रीय आय ÷ जनसंख्या।"],["भारत में बजट सामान्यतः कौन प्रस्तुत करता है?",["प्रधान न्यायाधीश","केंद्रीय वित्त मंत्री","RBI गवर्नर","लोकसभा अध्यक्ष"],1,"केंद्रीय बजट केंद्रीय वित्त मंत्री संसद में प्रस्तुत करते हैं।"],["राजकोषीय नीति मुख्यतः किससे संबंधित है?",["सरकारी कर और व्यय","मौद्रिक आपूर्ति केवल","न्यायपालिका","विदेश नीति"],0,"राजकोषीय नीति सरकारी राजस्व, कर और व्यय से संबंधित होती है।"],["मौद्रिक नीति में रेपो रेट किससे संबंधित है?",["RBI द्वारा बैंकों को अल्पकालिक ऋण की दर","किसानों की MSP","आयकर दर","GST दर"],0,"रेपो रेट वह दर है जिस पर RBI बैंकों को अल्पकालिक धन उधार देता है।"],["गरीबी रेखा का उपयोग मुख्यतः किसके आकलन में किया जाता है?",["गरीबी की स्थिति","जनसंख्या घनत्व","साक्षरता","निर्यात"],0,"गरीबी रेखा गरीबी की स्थिति के आकलन के लिए उपयोग की जाती है।"],["भारत में राष्ट्रीय आय के आधिकारिक अनुमान से संबंधित प्रमुख संस्था कौन सी है?",["NSO","SEBI","RBI केवल","UPSC"],0,"राष्ट्रीय सांख्यिकी कार्यालय (NSO) राष्ट्रीय आय के आंकड़ों से संबंधित प्रमुख संस्था है।"],["बैंक में जमा धन पर मिलने वाली राशि को क्या कहते हैं?",["ब्याज","मूलधन","कर","लाभांश"],0,"जमा पर बैंक द्वारा दी जाने वाली अतिरिक्त राशि ब्याज कहलाती है।"]],"Indian Art & Culture":[["कथकली किस राज्य की शास्त्रीय नृत्य-नाट्य शैली है?",["केरल","तमिलनाडु","असम","मणिपुर"],0,"कथकली केरल की प्रसिद्ध शास्त्रीय नृत्य-नाट्य शैली है।"],["कुचिपुड़ी किस राज्य से संबंधित शास्त्रीय नृत्य है?",["ओडिशा","आंध्र प्रदेश","केरल","गुजरात"],1,"कुचिपुड़ी आंध्र प्रदेश से संबंधित है।"],["ओडिसी किस राज्य का शास्त्रीय नृत्य है?",["ओडिशा","बिहार","राजस्थान","पंजाब"],0,"ओडिसी ओडिशा का शास्त्रीय नृत्य है।"],["मणिपुरी नृत्य किस राज्य से संबंधित है?",["मणिपुर","असम","त्रिपुरा","मेघालय"],0,"मणिपुरी नृत्य मणिपुर से संबंधित है।"],["मोहिनीअट्टम किस राज्य का शास्त्रीय नृत्य है?",["केरल","कर्नाटक","तमिलनाडु","महाराष्ट्र"],0,"मोहिनीअट्टम केरल से संबंधित है।"],["सत्रिया नृत्य किस राज्य से संबंधित है?",["असम","ओडिशा","बिहार","पश्चिम बंगाल"],0,"सत्रिया असम का शास्त्रीय नृत्य है।"],["गरबा मुख्यतः किस राज्य की लोक नृत्य परंपरा है?",["गुजरात","राजस्थान","पंजाब","हरियाणा"],0,"गरबा गुजरात की प्रसिद्ध लोक नृत्य परंपरा है।"],["भांगड़ा किस राज्य की लोक नृत्य शैली है?",["पंजाब","बिहार","असम","केरल"],0,"भांगड़ा पंजाब की प्रसिद्ध लोक नृत्य शैली है।"],["घूमर किस राज्य का प्रसिद्ध लोक नृत्य है?",["राजस्थान","गुजरात","मध्य प्रदेश","उत्तर प्रदेश"],0,"घूमर राजस्थान का प्रसिद्ध लोक नृत्य है।"],["बिहू नृत्य किस राज्य से संबंधित है?",["असम","बिहार","झारखंड","ओडिशा"],0,"बिहू असम की प्रमुख लोक परंपरा है।"],["मधुबनी चित्रकला किस क्षेत्र से संबंधित है?",["मिथिला","मालवा","मेवाड़","कोंकण"],0,"मधुबनी चित्रकला मिथिला क्षेत्र की प्रसिद्ध कला है।"],["वारली चित्रकला मुख्यतः किस राज्य से जुड़ी है?",["महाराष्ट्र","गुजरात","बिहार","ओडिशा"],0,"वारली चित्रकला महाराष्ट्र की जनजातीय कला परंपरा है।"],["पट्टचित्र कला मुख्यतः किस राज्य से जुड़ी है?",["ओडिशा","पंजाब","हरियाणा","सिक्किम"],0,"पट्टचित्र ओडिशा की प्रसिद्ध चित्रकला परंपरा है।"],["कलमकारी कला मुख्यतः किस क्षेत्र से जुड़ी है?",["आंध्र प्रदेश और तेलंगाना","पंजाब","बिहार","हिमाचल प्रदेश"],0,"कलमकारी आंध्र प्रदेश और तेलंगाना क्षेत्र की प्रसिद्ध वस्त्र-कला है।"],["तंजौर चित्रकला किस राज्य से संबंधित है?",["तमिलनाडु","केरल","असम","मणिपुर"],0,"तंजौर चित्रकला तमिलनाडु की प्रसिद्ध कला परंपरा है।"],["सांची स्तूप किस राज्य में स्थित है?",["मध्य प्रदेश","बिहार","उत्तर प्रदेश","राजस्थान"],0,"सांची स्तूप मध्य प्रदेश में स्थित है।"],["कोणार्क सूर्य मंदिर किस राज्य में है?",["ओडिशा","गुजरात","महाराष्ट्र","बिहार"],0,"कोणार्क सूर्य मंदिर ओडिशा में स्थित है।"],["अजंता की गुफाएँ किस राज्य में हैं?",["महाराष्ट्र","मध्य प्रदेश","बिहार","राजस्थान"],0,"अजंता की गुफाएँ महाराष्ट्र में हैं।"],["एलोरा की गुफाएँ किस राज्य में हैं?",["महाराष्ट्र","गुजरात","ओडिशा","कर्नाटक"],0,"एलोरा की गुफाएँ महाराष्ट्र में स्थित हैं।"],["नाट्यशास्त्र के रचयिता किसे माना जाता है?",["भरतमुनि","कालिदास","तुलसीदास","बाणभट्ट"],0,"नाट्यशास्त्र के रचयिता परंपरागत रूप से भरतमुनि माने जाते हैं।"]]};
Object.keys(quiz2Data).forEach(subject => { quizSets[subject][2] = quiz2Data[subject]; });

// ===== Quiz 3: 20-question Revision Challenge per subject =====
const quiz3Data = {"GK":[["भारत का राष्ट्रीय पक्षी कौन है?",["तोता","मोर","गरुड़","हंस"],1,"भारत का राष्ट्रीय पक्षी भारतीय मोर है।"],["भारत का राष्ट्रीय वृक्ष कौन सा है?",["नीम","बरगद","पीपल","आम"],1,"बरगद भारत का राष्ट्रीय वृक्ष है।"],["भारत का राष्ट्रीय फल कौन सा है?",["सेब","केला","आम","अमरूद"],2,"आम भारत का राष्ट्रीय फल माना जाता है।"],["भारतीय राष्ट्रीय गीत का नाम क्या है?",["जन गण मन","वंदे मातरम्","सारे जहाँ से अच्छा","ऐ मेरे वतन"],1,"वंदे मातरम् भारत का राष्ट्रीय गीत है।"],["भारतीय राष्ट्रीय गान के रचयिता कौन हैं?",["बंकिमचंद्र चट्टोपाध्याय","रवींद्रनाथ टैगोर","महादेवी वर्मा","सरोजिनी नायडू"],1,"जन गण मन के रचयिता रवींद्रनाथ टैगोर हैं।"],["भारत का राष्ट्रीय चिन्ह किससे लिया गया है?",["सांची स्तूप","सारनाथ का सिंह स्तंभ","कुतुब मीनार","कोणार्क मंदिर"],1,"राष्ट्रीय चिन्ह सारनाथ के अशोक सिंह स्तंभ के शीर्ष से लिया गया है।"],["भारत में कुल कितने राज्य हैं?",["26","27","28","29"],2,"भारत में 28 राज्य हैं।"],["भारत में कितने केंद्र शासित प्रदेश हैं?",["6","7","8","9"],2,"भारत में 8 केंद्र शासित प्रदेश हैं।"],["भारत का सबसे बड़ा नागरिक सम्मान कौन सा है?",["पद्म श्री","पद्म भूषण","भारत रत्न","पद्म विभूषण"],2,"भारत रत्न भारत का सर्वोच्च नागरिक सम्मान है।"],["भारत का सर्वोच्च युद्धकालीन वीरता पुरस्कार कौन सा है?",["अशोक चक्र","परमवीर चक्र","महावीर चक्र","वीर चक्र"],1,"परमवीर चक्र सर्वोच्च युद्धकालीन वीरता पुरस्कार है।"],["भारत का सर्वोच्च शांतिकालीन वीरता पुरस्कार कौन सा है?",["अशोक चक्र","कीर्ति चक्र","शौर्य चक्र","परमवीर चक्र"],0,"अशोक चक्र सर्वोच्च शांतिकालीन वीरता पुरस्कार है।"],["भारत की संसद के कितने सदन हैं?",["एक","दो","तीन","चार"],1,"भारतीय संसद के दो सदन हैं—लोकसभा और राज्यसभा।"],["लोकसभा को किस नाम से भी जाना जाता है?",["उच्च सदन","निचला सदन","राज्य परिषद","संघ परिषद"],1,"लोकसभा संसद का निचला सदन है।"],["राज्यसभा को किस नाम से भी जाना जाता है?",["निचला सदन","लोक परिषद","उच्च सदन","जनसभा"],2,"राज्यसभा संसद का उच्च सदन है।"],["भारत का राष्ट्रीय जलीय जीव कौन है?",["गंगा डॉल्फिन","मगरमच्छ","कछुआ","व्हेल"],0,"गंगा नदी की डॉल्फिन भारत का राष्ट्रीय जलीय जीव है।"],["भारतीय अंतरिक्ष अनुसंधान संगठन का संक्षिप्त नाम क्या है?",["DRDO","ISRO","CSIR","BARC"],1,"Indian Space Research Organisation का संक्षिप्त नाम ISRO है।"],["DRDO का पूरा नाम क्या है?",["Defence Research and Development Organisation","Department of Rail Development Office","Defence Railway Development Organisation","Digital Research and Data Organisation"],0,"DRDO का पूरा नाम Defence Research and Development Organisation है।"],["भारत का पहला उपग्रह कौन सा था?",["आर्यभट्ट","भास्कर","रोहिणी","इनसैट-1A"],0,"आर्यभट्ट भारत का पहला उपग्रह था।"],["भारत का राष्ट्रीय कैलेंडर किस संवत पर आधारित है?",["विक्रम संवत","शक संवत","हिजरी संवत","बौद्ध संवत"],1,"भारत का राष्ट्रीय कैलेंडर शक संवत पर आधारित है।"],["भारत का राष्ट्रीय फूल कौन सा है?",["कमल","गुलाब","चमेली","गेंदा"],0,"भारत का राष्ट्रीय फूल कमल है।"]],"Geography":[["सांभर झील किस राज्य में है?",["गुजरात","राजस्थान","मध्य प्रदेश","हरियाणा"],1,"सांभर झील राजस्थान में स्थित है।"],["लोकटक झील किस राज्य में है?",["मणिपुर","मेघालय","मिजोरम","त्रिपुरा"],0,"लोकटक झील मणिपुर में स्थित है।"],["नर्मदा नदी किस सागर में गिरती है?",["बंगाल की खाड़ी","अरब सागर","हिंद महासागर","लाल सागर"],1,"नर्मदा नदी अरब सागर में गिरती है।"],["ताप्ती नदी किस सागर में गिरती है?",["अरब सागर","बंगाल की खाड़ी","कैस्पियन सागर","हिंद महासागर"],0,"ताप्ती नदी अरब सागर में गिरती है।"],["भारत में कर्क रेखा कितने राज्यों से गुजरती है?",["6","7","8","9"],2,"कर्क रेखा भारत के 8 राज्यों से गुजरती है।"],["भारत का सबसे ऊँचा पर्वत शिखर जो पूरी तरह भारत में स्थित है, कौन सा है?",["नंदा देवी","कंचनजंघा","कामेत","अनामुडी"],0,"नंदा देवी भारत में स्थित सबसे ऊँची पर्वत चोटियों में प्रमुख है।"],["सुंदरबन डेल्टा मुख्यतः किन नदियों से बना है?",["गंगा-ब्रह्मपुत्र-मेघना","नर्मदा-ताप्ती","गोदावरी-कृष्णा","सिंधु-झेलम"],0,"सुंदरबन डेल्टा गंगा, ब्रह्मपुत्र और मेघना नदी तंत्र से बनता है।"],["दक्कन का पठार मुख्यतः किस प्रकार की चट्टानों से संबंधित है?",["बेसाल्ट","चूना पत्थर","बलुआ पत्थर","संगमरमर"],0,"दक्कन ट्रैप का आधार मुख्यतः बेसाल्टिक लावा से बना है।"],["भारत में सबसे अधिक वर्षा वाला स्थान कौन सा माना जाता है?",["जैसलमेर","मौसिनराम","दिल्ली","लेह"],1,"मेघालय का मौसिनराम अत्यधिक वार्षिक वर्षा के लिए प्रसिद्ध है।"],["थार मरुस्थल मुख्यतः किस राज्य में है?",["राजस्थान","बिहार","असम","ओडिशा"],0,"थार मरुस्थल का अधिकांश भाग राजस्थान में है।"],["नीलगिरि पहाड़ियाँ किन राज्यों के संगम क्षेत्र में हैं?",["तमिलनाडु-कर्नाटक-केरल","बिहार-झारखंड-ओडिशा","गुजरात-महाराष्ट्र-गोवा","पंजाब-हरियाणा-राजस्थान"],0,"नीलगिरि पहाड़ियाँ तमिलनाडु, कर्नाटक और केरल के संगम क्षेत्र में हैं।"],["भारत का सबसे लंबा समुद्र तट किस राज्य के पास है?",["गुजरात","तमिलनाडु","आंध्र प्रदेश","ओडिशा"],0,"भारत के राज्यों में सबसे लंबी तटरेखा गुजरात की है।"],["पश्चिमी घाट का दूसरा नाम क्या है?",["सह्याद्रि","अरावली","शिवालिक","काराकोरम"],0,"पश्चिमी घाट को सह्याद्रि भी कहा जाता है।"],["अरावली पर्वतमाला की दिशा सामान्यतः कैसी है?",["उत्तर-पूर्व से दक्षिण-पश्चिम","उत्तर-पश्चिम से दक्षिण-पूर्व","पूर्व से पश्चिम","उत्तर से दक्षिण"],0,"अरावली पर्वतमाला की सामान्य दिशा उत्तर-पूर्व से दक्षिण-पश्चिम है।"],["ब्रह्मपुत्र भारत में मुख्यतः किस राज्य से होकर बहती है?",["असम","बिहार","गुजरात","पंजाब"],0,"ब्रह्मपुत्र असम में प्रमुख नदी के रूप में बहती है।"],["कावेरी नदी का उद्गम किस राज्य में है?",["कर्नाटक","तमिलनाडु","केरल","आंध्र प्रदेश"],0,"कावेरी का उद्गम कर्नाटक के ब्रह्मगिरि क्षेत्र में है।"],["भारत की सबसे लंबी नदी कौन सी है?",["यमुना","गंगा","गोदावरी","नर्मदा"],1,"भारत में बहने वाली सबसे लंबी नदी गंगा है।"],["भारत का दक्षिणतम बिंदु कौन सा है?",["कन्याकुमारी","इंदिरा प्वाइंट","रामेश्वरम","पोर्ट ब्लेयर"],1,"भारत का दक्षिणतम बिंदु इंदिरा प्वाइंट है।"],["भारत की सबसे बड़ी मीठे पानी की झील कौन सी है?",["वूलर झील","चिल्का झील","सांभर झील","लोकटक झील"],0,"वूलर झील भारत की प्रमुख और सबसे बड़ी मीठे पानी की झीलों में है।"],["चिल्का झील किस राज्य में स्थित है?",["पश्चिम बंगाल","ओडिशा","आंध्र प्रदेश","केरल"],1,"चिल्का झील ओडिशा में स्थित है।"]],"Polity":[["राज्यसभा के एक सदस्य का सामान्य कार्यकाल कितने वर्ष का है?",["4","5","6","7"],2,"राज्यसभा सदस्य का कार्यकाल 6 वर्ष होता है।"],["राज्यसभा के कितने सदस्य हर दो वर्ष में सेवानिवृत्त होते हैं?",["एक-चौथाई","एक-तिहाई","आधे","दो-तिहाई"],1,"राज्यसभा के लगभग एक-तिहाई सदस्य हर दो वर्ष में सेवानिवृत्त होते हैं।"],["भारत के उपराष्ट्रपति राज्यसभा में किस पद पर होते हैं?",["नेता सदन","सभापति","उपसभापति","महासचिव"],1,"उपराष्ट्रपति राज्यसभा के पदेन सभापति होते हैं।"],["लोकसभा का अध्यक्ष किस सदन द्वारा चुना जाता है?",["राष्ट्रपति","लोकसभा","राज्यसभा","सुप्रीम कोर्ट"],1,"लोकसभा अपने अध्यक्ष का चुनाव स्वयं करती है।"],["भारत में सर्वोच्च न्यायालय की स्थापना कब हुई?",["1947","1950","1952","1956"],1,"सर्वोच्च न्यायालय ने 1950 में कार्य करना शुरू किया।"],["संविधान का अनुच्छेद 32 किस अधिकार से संबंधित है?",["समानता","संवैधानिक उपचार","धर्म की स्वतंत्रता","शिक्षा"],1,"अनुच्छेद 32 संवैधानिक उपचार के अधिकार से संबंधित है।"],["भारत में मतदान की न्यूनतम आयु कितनी है?",["16 वर्ष","18 वर्ष","21 वर्ष","25 वर्ष"],1,"भारत में मतदान की न्यूनतम आयु 18 वर्ष है।"],["मतदान की आयु 21 से 18 वर्ष किस संशोधन से हुई?",["42वाँ","44वाँ","61वाँ","73वाँ"],2,"61वें संविधान संशोधन अधिनियम ने मतदान आयु 18 वर्ष की।"],["पंचायती राज से संबंधित संशोधन कौन सा है?",["61वाँ","73वाँ","74वाँ","86वाँ"],1,"73वाँ संशोधन पंचायती राज से संबंधित है।"],["नगरपालिकाओं से संबंधित संविधान संशोधन कौन सा है?",["72वाँ","73वाँ","74वाँ","75वाँ"],2,"74वाँ संशोधन नगरपालिकाओं से संबंधित है।"],["भारत का नियंत्रक एवं महालेखा परीक्षक किस अनुच्छेद में है?",["148","280","324","360"],0,"CAG का प्रावधान अनुच्छेद 148 में है।"],["निर्वाचन आयोग का प्रावधान किस अनुच्छेद में है?",["280","324","356","368"],1,"निर्वाचन आयोग का प्रावधान अनुच्छेद 324 में है।"],["वित्त आयोग का प्रावधान किस अनुच्छेद में है?",["148","280","324","315"],1,"वित्त आयोग का प्रावधान अनुच्छेद 280 में है।"],["भारतीय संविधान की प्रस्तावना में भारत को किस रूप में वर्णित किया गया है?",["संघीय राजतंत्र","सम्प्रभु समाजवादी पंथनिरपेक्ष लोकतांत्रिक गणराज्य","एकात्मक राजतंत्र","सैन्य गणराज्य"],1,"प्रस्तावना भारत को सम्प्रभु, समाजवादी, पंथनिरपेक्ष, लोकतांत्रिक गणराज्य बताती है।"],["मौलिक अधिकार संविधान के किस भाग में हैं?",["भाग II","भाग III","भाग IV","भाग V"],1,"मौलिक अधिकार संविधान के भाग III में हैं।"],["राज्य के नीति निदेशक तत्व किस भाग में हैं?",["भाग III","भाग IV","भाग V","भाग VI"],1,"नीति निदेशक तत्व भाग IV में हैं।"],["मौलिक कर्तव्य किस अनुच्छेद में हैं?",["अनुच्छेद 32","अनुच्छेद 51A","अनुच्छेद 21","अनुच्छेद 368"],1,"मौलिक कर्तव्य अनुच्छेद 51A में हैं।"],["संविधान संशोधन की प्रक्रिया मुख्यतः किस अनुच्छेद में है?",["अनुच्छेद 123","अनुच्छेद 280","अनुच्छेद 368","अनुच्छेद 356"],2,"संविधान संशोधन की प्रक्रिया अनुच्छेद 368 में है।"],["भारत के राष्ट्रपति का कार्यकाल कितने वर्ष का होता है?",["4","5","6","7"],1,"राष्ट्रपति का कार्यकाल 5 वर्ष है।"],["लोकसभा का सामान्य कार्यकाल कितने वर्ष का है?",["4","5","6","7"],1,"लोकसभा का सामान्य कार्यकाल 5 वर्ष है।"]],"History":[["पानीपत का प्रथम युद्ध कब हुआ?",["1526","1556","1761","1757"],0,"प्रथम पानीपत का युद्ध 1526 में हुआ।"],["प्लासी का युद्ध कब हुआ?",["1757","1764","1857","1740"],0,"प्लासी का युद्ध 1757 में हुआ।"],["बक्सर का युद्ध कब हुआ?",["1757","1764","1772","1857"],1,"बक्सर का युद्ध 1764 में हुआ।"],["1857 का विद्रोह सबसे पहले कहाँ से शुरू हुआ?",["दिल्ली","मेरठ","कानपुर","झाँसी"],1,"1857 का विद्रोह 10 मई को मेरठ से शुरू हुआ।"],["भारतीय राष्ट्रीय कांग्रेस की स्थापना कब हुई?",["1885","1905","1919","1942"],0,"भारतीय राष्ट्रीय कांग्रेस की स्थापना 1885 में हुई।"],["भारतीय राष्ट्रीय कांग्रेस के प्रथम अध्यक्ष कौन थे?",["दादाभाई नौरोजी","डब्ल्यू. सी. बनर्जी","ए. ओ. ह्यूम","गोपाल कृष्ण गोखले"],1,"1885 में कांग्रेस के प्रथम अध्यक्ष डब्ल्यू. सी. बनर्जी थे।"],["बंगाल विभाजन किस वर्ष हुआ?",["1905","1911","1919","1920"],0,"बंगाल विभाजन 1905 में हुआ।"],["जलियांवाला बाग हत्याकांड किस वर्ष हुआ?",["1905","1919","1922","1930"],1,"जलियांवाला बाग हत्याकांड 1919 में हुआ।"],["दांडी मार्च किस आंदोलन से जुड़ा था?",["भारत छोड़ो आंदोलन","सविनय अवज्ञा आंदोलन","असहयोग आंदोलन","स्वदेशी आंदोलन"],1,"दांडी मार्च 1930 के सविनय अवज्ञा आंदोलन से जुड़ा था।"],["साइमन कमीशन भारत कब आया?",["1919","1927","1928","1935"],2,"साइमन कमीशन 1928 में भारत आया।"],["सिंधु घाटी सभ्यता का प्रसिद्ध बंदरगाह कौन सा था?",["हड़प्पा","लोथल","कालीबंगा","मोहनजोदड़ो"],1,"लोथल एक प्रमुख प्राचीन बंदरगाह स्थल था।"],["मोहनजोदड़ो वर्तमान में किस देश में है?",["भारत","पाकिस्तान","नेपाल","अफगानिस्तान"],1,"मोहनजोदड़ो वर्तमान पाकिस्तान में स्थित है।"],["हड़प्पा स्थल किस नदी के तट पर था?",["रावी","गंगा","यमुना","नर्मदा"],0,"हड़प्पा रावी नदी के निकट स्थित था।"],["बौद्ध धर्म के संस्थापक कौन माने जाते हैं?",["महावीर","गौतम बुद्ध","अशोक","नागार्जुन"],1,"बौद्ध धर्म के संस्थापक गौतम बुद्ध माने जाते हैं।"],["जैन धर्म के 24वें तीर्थंकर कौन थे?",["पार्श्वनाथ","महावीर","ऋषभदेव","नेमिनाथ"],1,"महावीर जैन धर्म के 24वें तीर्थंकर थे।"],["मौर्य साम्राज्य के संस्थापक कौन थे?",["अशोक","चंद्रगुप्त मौर्य","बिंदुसार","कनिष्क"],1,"चंद्रगुप्त मौर्य ने मौर्य साम्राज्य की स्थापना की।"],["अशोक ने कलिंग युद्ध के बाद किस धर्म को अपनाया?",["जैन धर्म","बौद्ध धर्म","सिख धर्म","इस्लाम"],1,"कलिंग युद्ध के बाद अशोक बौद्ध धर्म से प्रभावित हुए।"],["गुप्त काल को प्रायः किस नाम से जाना जाता है?",["लौह युग","स्वर्ण युग","पाषाण युग","औद्योगिक युग"],1,"गुप्त काल को भारतीय इतिहास का स्वर्ण युग कहा जाता है।"],["कुतुब मीनार का निर्माण किसने शुरू कराया?",["अलाउद्दीन खिलजी","कुतुबुद्दीन ऐबक","इल्तुतमिश","बलबन"],1,"कुतुबुद्दीन ऐबक ने कुतुब मीनार का निर्माण शुरू कराया।"],["मुगल साम्राज्य का संस्थापक कौन था?",["अकबर","बाबर","हुमायूँ","शाहजहाँ"],1,"बाबर ने 1526 में मुगल साम्राज्य की स्थापना की।"]],"Science":[["मानव शरीर में इंसुलिन किस अंग द्वारा बनता है?",["यकृत","अग्न्याशय","गुर्दा","हृदय"],1,"इंसुलिन अग्न्याशय की बीटा कोशिकाओं द्वारा बनता है।"],["रक्त में ऑक्सीजन का परिवहन मुख्यतः किसके द्वारा होता है?",["प्लाज्मा","हीमोग्लोबिन","प्लेटलेट्स","श्वेत रक्त कोशिकाएँ"],1,"हीमोग्लोबिन ऑक्सीजन के परिवहन में मुख्य भूमिका निभाता है।"],["विटामिन C की कमी से कौन सा रोग होता है?",["रिकेट्स","स्कर्वी","रातांधता","बेरी-बेरी"],1,"विटामिन C की कमी से स्कर्वी होता है।"],["विटामिन D की कमी से कौन सा रोग होता है?",["स्कर्वी","रिकेट्स","एनीमिया","घेंघा"],1,"विटामिन D की कमी से बच्चों में रिकेट्स हो सकता है।"],["मानव शरीर में रक्त का शुद्धीकरण मुख्यतः किस अंग द्वारा होता है?",["गुर्दे","हृदय","त्वचा","अग्न्याशय"],0,"गुर्दे रक्त से अपशिष्ट पदार्थों को छानने में मुख्य भूमिका निभाते हैं।"],["पौधों में प्रकाश संश्लेषण मुख्यतः किस अंगक में होता है?",["माइटोकॉन्ड्रिया","क्लोरोप्लास्ट","राइबोसोम","नाभिक"],1,"प्रकाश संश्लेषण क्लोरोप्लास्ट में होता है।"],["ध्वनि निर्वात में क्यों नहीं चलती?",["प्रकाश नहीं होता","माध्यम नहीं होता","गुरुत्व नहीं होता","तापमान कम होता है"],1,"ध्वनि के प्रसार के लिए भौतिक माध्यम आवश्यक होता है।"],["प्रकाश की चाल निर्वात में लगभग कितनी है?",["3×10⁶ m/s","3×10⁸ m/s","3×10¹⁰ m/s","3×10⁴ m/s"],1,"निर्वात में प्रकाश की चाल लगभग 3×10⁸ m/s है।"],["बल की SI इकाई क्या है?",["जूल","न्यूटन","वाट","पास्कल"],1,"बल की SI इकाई न्यूटन है।"],["कार्य की SI इकाई क्या है?",["न्यूटन","जूल","वाट","एम्पियर"],1,"कार्य की SI इकाई जूल है।"],["शक्ति की SI इकाई क्या है?",["वाट","जूल","न्यूटन","वोल्ट"],0,"शक्ति की SI इकाई वाट है।"],["विद्युत धारा की SI इकाई क्या है?",["वोल्ट","ओम","एम्पियर","कूलॉम"],2,"विद्युत धारा की SI इकाई एम्पियर है।"],["प्रतिरोध की SI इकाई क्या है?",["ओम","वोल्ट","वाट","फैरड"],0,"प्रतिरोध की SI इकाई ओम है।"],["आवृत्ति की SI इकाई क्या है?",["हर्ट्ज","न्यूटन","जूल","पास्कल"],0,"आवृत्ति की SI इकाई हर्ट्ज है।"],["अम्ल का pH सामान्यतः कितना होता है?",["7 से कम","7 के बराबर","7 से अधिक","14 से अधिक"],0,"अम्लीय विलयन का pH 7 से कम होता है।"],["क्षार का pH सामान्यतः कितना होता है?",["7 से कम","7 के बराबर","7 से अधिक","0"],2,"क्षारीय विलयन का pH 7 से अधिक होता है।"],["साधारण नमक का रासायनिक सूत्र क्या है?",["NaCl","KCl","NaOH","HCl"],0,"साधारण नमक का सूत्र NaCl है।"],["कार्बन डाइऑक्साइड का सूत्र क्या है?",["CO","CO₂","C₂O","CaCO₃"],1,"कार्बन डाइऑक्साइड का रासायनिक सूत्र CO₂ है।"],["ऑक्सीजन का रासायनिक सूत्र क्या है?",["O","O₂","O₃","OH"],1,"सामान्य ऑक्सीजन अणु O₂ होता है।"],["मानव शरीर का सबसे बड़ा अंग कौन सा है?",["हृदय","त्वचा","यकृत","फेफड़ा"],1,"त्वचा मानव शरीर का सबसे बड़ा अंग है।"]],"Maths":[["1000 रुपये पर 5% वार्षिक साधारण ब्याज 3 वर्षों का मिश्रधन क्या होगा?",["1050","1100","1150","1200"],2,"ब्याज 150 रुपये है; मिश्रधन 1150 रुपये।"],["एक संख्या का 3/5 = 24 है। संख्या क्या है?",["30","36","40","45"],2,"संख्या = 24×5/3 = 40."],["2 घंटे 30 मिनट में कुल कितने मिनट होते हैं?",["120","130","150","180"],2,"2 घंटे = 120 मिनट; 120+30 = 150 मिनट।"],["0.75 को भिन्न में बदलें।",["1/2","2/3","3/4","4/5"],2,"0.75 = 75/100 = 3/4."],["480 का 25% कितना है?",["100","120","140","160"],1,"480 × 25/100 = 120."],["250 का 12% कितना है?",["25","30","35","40"],1,"250 × 12/100 = 30."],["एक वस्तु का अंकित मूल्य 800 रुपये है और 10% छूट है। विक्रय मूल्य क्या होगा?",["700","720","740","760"],1,"800 का 10% = 80, इसलिए विक्रय मूल्य 720 रुपये है।"],["यदि 5 पेन की कीमत 60 रुपये है, तो 8 पेन की कीमत कितनी होगी?",["84","90","96","100"],2,"एक पेन 12 रुपये का है; 8 पेन = 96 रुपये।"],["अनुपात 3:5 में कुल 64 बाँटे जाएँ, तो पहला भाग कितना होगा?",["20","24","28","32"],1,"कुल 8 भाग हैं; 64×3/8 = 24."],["15, 20 और 25 का औसत क्या है?",["18","20","22","25"],1,"(15+20+25)/3 = 20."],["12 और 18 का LCM क्या है?",["24","30","36","48"],2,"12 और 18 का LCM 36 है।"],["24 और 36 का HCF क्या है?",["6","8","12","18"],2,"24 और 36 का HCF 12 है।"],["एक संख्या 200 से 15% बढ़ती है। नई संख्या क्या होगी?",["215","225","230","240"],2,"200 का 15% = 30, इसलिए नई संख्या 230 है।"],["एक संख्या 500 से 20% घटती है। नई संख्या क्या होगी?",["380","400","420","450"],1,"500 का 20% = 100, इसलिए नई संख्या 400 है।"],["एक आयत की लंबाई 12 cm और चौड़ाई 5 cm है। क्षेत्रफल क्या है?",["17 cm²","34 cm²","60 cm²","120 cm²"],2,"क्षेत्रफल = 12×5 = 60 cm²."],["वर्ग की भुजा 9 cm है। उसका क्षेत्रफल क्या होगा?",["18 cm²","36 cm²","72 cm²","81 cm²"],3,"वर्ग का क्षेत्रफल 9×9 = 81 cm²."],["वर्ग की भुजा 7 cm है। उसका परिमाप क्या होगा?",["14 cm","21 cm","28 cm","49 cm"],2,"परिमाप = 4×7 = 28 cm."],["एक ट्रेन 60 km/h की गति से 2 घंटे चले तो दूरी कितनी होगी?",["100 km","120 km","140 km","160 km"],1,"दूरी = गति×समय = 60×2 = 120 km."],["यदि किसी संख्या का 40% = 80 है, तो संख्या क्या है?",["160","180","200","240"],2,"संख्या = 80×100/40 = 200."],["500 रुपये पर 10% वार्षिक साधारण ब्याज 2 वर्षों का कितना होगा?",["50","75","100","125"],2,"SI = 500×10×2/100 = 100 रुपये।"]],"Reasoning":[["यदि सभी A, B हैं और सभी B, C हैं, तो निश्चित निष्कर्ष क्या है?",["सभी C, A हैं","सभी A, C हैं","कुछ C, A नहीं हैं","कोई A, C नहीं है"],1,"A के सभी सदस्य B और B के सभी सदस्य C हैं, इसलिए सभी A, C हैं।"],["श्रृंखला: 3, 6, 12, 24, ?",["36","42","48","54"],2,"हर पद पिछले पद का 2 गुना है।"],["श्रृंखला: 5, 10, 15, 20, ?",["22","25","30","35"],1,"हर बार 5 जोड़ा गया है।"],["श्रृंखला: 1, 4, 9, 16, ?",["20","25","36","49"],1,"ये क्रमशः 1², 2², 3², 4² हैं; अगला 5² = 25."],["श्रृंखला: 2, 5, 10, 17, ?",["24","26","28","30"],1,"अंतर 3,5,7 है; अगला अंतर 9, इसलिए 26."],["यदि BOOK को CPPL लिखा जाए, तो PEN को क्या लिखा जाएगा?",["QFO","QEN","PFN","RGP"],0,"हर अक्षर में 1 जोड़ा गया है।"],["यदि MANGO को NBOHP लिखा जाए, तो APPLE को क्या लिखा जाएगा?",["BQQMF","BPPMF","BQQLF","CQPMF"],0,"हर अक्षर को एक स्थान आगे किया गया है।"],["एक व्यक्ति उत्तर की ओर 10 m चलता है, फिर दाएँ मुड़कर 5 m चलता है। वह प्रारंभिक स्थान से किस दिशा में है?",["उत्तर-पश्चिम","उत्तर-पूर्व","दक्षिण-पूर्व","दक्षिण-पश्चिम"],1,"उत्तर के बाद दाएँ मुड़ने पर पूर्व दिशा आती है; स्थिति उत्तर-पूर्व है।"],["राम, श्याम से लंबा है और श्याम, मोहन से लंबा है। सबसे छोटा कौन है?",["राम","श्याम","मोहन","निश्चित नहीं"],2,"राम > श्याम > मोहन, इसलिए मोहन सबसे छोटा है।"],["एक कक्षा में रवि ऊपर से 7वाँ और नीचे से 14वाँ है। कुल विद्यार्थी कितने हैं?",["19","20","21","22"],1,"कुल = 7+14−1 = 20."],["यदि आज सोमवार है, तो 10 दिन बाद कौन सा दिन होगा?",["बुधवार","गुरुवार","शुक्रवार","शनिवार"],1,"10 mod 7 = 3; सोमवार से 3 दिन बाद गुरुवार।"],["यदि सभी गुलाब फूल हैं और कुछ फूल लाल हैं, तो कौन सा निष्कर्ष निश्चित है?",["सभी गुलाब लाल हैं","कुछ गुलाब लाल हैं","सभी गुलाब फूल हैं","कोई फूल लाल नहीं है"],2,"पहला कथन सीधे बताता है कि सभी गुलाब फूल हैं।"],["विषम चुनें: 2, 4, 8, 16, 18",["2","8","16","18"],3,"2,4,8,16 क्रम में 2 की घातें हैं; 18 अलग है।"],["विषम चुनें: सेब, आम, केला, गाजर",["सेब","आम","केला","गाजर"],3,"गाजर सब्जी है, बाकी फल हैं।"],["A, B का भाई है और B, C की बहन है। A का C से क्या संबंध निश्चित है?",["भाई","बहन","पिता","निश्चित नहीं"],3,"B का लिंग और A का लिंग दिए हैं, पर C का लिंग नहीं; इसलिए संबंध निश्चित नहीं।"],["यदि SOUTH को TPVUI लिखा जाए, तो NORTH को क्या लिखा जाएगा?",["OPSUI","OPSTI","NPSUI","OQSVI"],0,"हर अक्षर को एक स्थान आगे किया गया है।"],["घड़ी में 3 बजे घंटे और मिनट की सुई के बीच कोण कितना होता है?",["60°","90°","120°","180°"],1,"3 बजे मिनट की सुई 12 पर और घंटे की 3 पर होती है; कोण 90° है।"],["यदि 1 जनवरी सोमवार है, तो 8 जनवरी कौन सा दिन होगा?",["रविवार","सोमवार","मंगलवार","बुधवार"],1,"7 दिन बाद वही दिन आता है, इसलिए सोमवार।"],["श्रृंखला: 100, 90, 80, 70, ?",["50","55","60","65"],2,"हर बार 10 घटाया गया है।"],["श्रृंखला: 2, 3, 5, 8, 13, ?",["18","20","21","22"],2,"हर पद पिछले दो पदों का योग है; 8+13 = 21."]],"Hindi":[["‘दिन’ का विलोम क्या है?",["संध्या","रात","प्रभात","दोपहर"],1,"दिन का विलोम रात है।"],["‘लाभ’ का विलोम क्या है?",["हानि","उन्नति","वृद्धि","जीत"],0,"लाभ का विलोम हानि है।"],["‘नदी’ शब्द का लिंग क्या है?",["पुल्लिंग","स्त्रीलिंग","उभयलिंग","नपुंसकलिंग"],1,"‘नदी’ स्त्रीलिंग शब्द है।"],["‘लड़का’ का बहुवचन क्या है?",["लड़की","लड़के","लड़कियाँ","लड़कों"],1,"‘लड़का’ का सामान्य बहुवचन ‘लड़के’ है।"],["‘मैं स्कूल जाता हूँ।’ वाक्य में सर्वनाम कौन सा है?",["स्कूल","जाता","मैं","हूँ"],2,"‘मैं’ सर्वनाम है।"],["‘राम ने फल खाया।’ में कर्ता कौन है?",["फल","खाया","राम","ने"],2,"कार्य करने वाला कर्ता राम है।"],["‘सुंदर’ किस प्रकार का विशेषण है?",["गुणवाचक","संख्यावाचक","परिमाणवाचक","सार्वनामिक"],0,"‘सुंदर’ गुण बताता है, इसलिए गुणवाचक विशेषण है।"],["‘तीन लड़के’ में ‘तीन’ कौन सा विशेषण है?",["गुणवाचक","संख्यावाचक","परिमाणवाचक","संबंधवाचक"],1,"‘तीन’ निश्चित संख्या बताता है।"],["‘धीरे-धीरे’ किस प्रकार का क्रियाविशेषण है?",["कालवाचक","स्थानवाचक","रीतिवाचक","परिमाणवाचक"],2,"‘धीरे-धीरे’ कार्य की रीति बताता है।"],["‘कल मैं बाजार गया।’ में ‘कल’ क्या है?",["संज्ञा","क्रियाविशेषण","सर्वनाम","विशेषण"],1,"‘कल’ समय बताने वाला क्रियाविशेषण है।"],["‘जो मेहनत करता है, वह सफल होता है।’ यह कौन सा वाक्य है?",["सरल","संयुक्त","मिश्र","विस्मयादिबोधक"],2,"इसमें एक प्रधान और एक आश्रित उपवाक्य है, इसलिए मिश्र वाक्य है।"],["‘राम आया और श्याम चला गया।’ कौन सा वाक्य है?",["सरल","संयुक्त","मिश्र","प्रश्नवाचक"],1,"दो स्वतंत्र उपवाक्य ‘और’ से जुड़े हैं, इसलिए संयुक्त वाक्य है।"],["‘आँखों का तारा’ मुहावरे का अर्थ क्या है?",["बहुत प्रिय","बहुत दूर","बहुत क्रोधित","बहुत गरीब"],0,"‘आँखों का तारा’ का अर्थ बहुत प्रिय व्यक्ति है।"],["‘नाक कटना’ मुहावरे का अर्थ क्या है?",["सम्मान मिलना","अपमान होना","बीमार होना","तेज दौड़ना"],1,"‘नाक कटना’ का अर्थ अपमान होना है।"],["‘अधजल गगरी छलकत जाए’ का भाव क्या है?",["कम ज्ञान वाला अधिक दिखावा करता है","मेहनत का फल मिलता है","समय अमूल्य है","एकता में बल है"],0,"मुहावरे का आशय है कि कम ज्ञान वाला व्यक्ति अधिक दिखावा करता है।"],["‘दूध का दूध, पानी का पानी’ का अर्थ क्या है?",["न्यायपूर्ण निर्णय","बहुत मेहनत","धोखा देना","जल्दी करना"],0,"इसका अर्थ सत्य और असत्य को स्पष्ट कर देना है।"],["‘विद्या + आलय’ का संधि रूप क्या है?",["विद्यालय","विद्यलय","विद्याआलय","विदालय"],0,"विद्या + आलय से विद्यालय बनता है।"],["‘राजा का पुत्र’ का समास रूप क्या है?",["राजपुत्र","राजमहल","राजमार्ग","राजर्षि"],0,"राजा का पुत्र = राजपुत्र, यह तत्पुरुष समास है।"],["‘अग्नि’ का पर्यायवाची कौन सा है?",["अनल","अंबर","अमृत","अचल"],0,"अग्नि का पर्यायवाची अनल है।"],["‘आकाश’ का पर्यायवाची कौन सा है?",["पवन","नभ","नीर","अनल"],1,"आकाश का पर्यायवाची नभ है।"]],"English":[["Choose the correct spelling.",["Separate","Seperate","Seprate","Seperete"],0,"The correct spelling is Separate."],["Identify the noun: “Honesty is the best policy.”",["best","is","Honesty","the"],2,"Honesty is a noun naming a quality."],["Identify the adjective: “She wore a beautiful dress.”",["She","wore","beautiful","dress"],2,"Beautiful describes the noun dress, so it is an adjective."],["Identify the adverb: “He runs quickly.”",["He","runs","quickly","none"],2,"Quickly modifies the verb runs, so it is an adverb."],["Choose the correct form: “They ___ playing cricket.”",["is","am","are","was"],2,"The plural subject they takes are."],["Choose the correct form: “He ___ to school every day.”",["go","goes","going","gone"],1,"With third-person singular he, the simple present uses goes."],["Choose the correct preposition: “The book is ___ the table.”",["in","on","at","by"],1,"On is used for something resting on a surface."],["Choose the correct conjunction: “I was tired ___ I continued working.”",["but","because","or","so"],0,"But connects two contrasting ideas."],["What is the comparative form of “Good”?",["Gooder","Best","Better","More good"],2,"The comparative form of good is better."],["What is the superlative form of “Bad”?",["Badder","Worst","Worse","Most bad"],1,"The superlative form of bad is worst."],["Choose the passive voice: “Ram wrote a letter.”",["A letter was written by Ram.","Ram was written by a letter.","A letter writes Ram.","Ram is writing a letter."],0,"The passive form is A letter was written by Ram."],["Choose the correct question tag: “You are coming, ___?”",["are you","aren’t you","isn’t it","don’t you"],1,"A positive statement with are takes the negative tag aren’t you."],["Choose the correct indirect speech: He said, “I am tired.”",["He said that he was tired.","He said that I am tired.","He says he tired.","He said that he is tired always."],0,"In standard reported speech, am changes to was with the past reporting verb."],["Choose the correct synonym of “Rapid”.",["Slow","Fast","Late","Weak"],1,"Rapid means fast."],["Choose the antonym of “Ancient”.",["Old","Modern","Historic","Past"],1,"Modern is the opposite of ancient."],["Choose the correct plural of “Child”.",["Childs","Children","Childes","Childrens"],1,"The standard plural of child is children."],["Choose the correct past tense of “Go”.",["Goed","Gone","Went","Going"],2,"The simple past of go is went."],["Choose the correct article: “___ apple a day keeps the doctor away.”",["A","An","The","No article"],1,"“Apple” begins with a vowel sound, so “an” is used."],["Choose the synonym of “Brave”.",["Coward","Courageous","Weak","Lazy"],1,"Courageous means brave."],["Choose the antonym of “Expand”.",["Increase","Extend","Contract","Enlarge"],2,"Contract means become smaller or reduce in size."]],"Economics":[["अप्रत्यक्ष कर का उदाहरण कौन सा है?",["आयकर","कॉर्पोरेट कर","GST","संपत्ति कर"],2,"GST एक अप्रत्यक्ष कर है।"],["SEBI मुख्यतः किस क्षेत्र को नियंत्रित करता है?",["बैंकिंग","प्रतिभूति बाजार","कृषि","रेलवे"],1,"SEBI प्रतिभूति बाजार का नियमन करता है।"],["NABARD मुख्यतः किस क्षेत्र से संबंधित है?",["कृषि और ग्रामीण विकास","अंतरिक्ष","रक्षा","रेलवे"],0,"NABARD कृषि और ग्रामीण विकास से संबंधित प्रमुख संस्था है।"],["भारत में नोट जारी करने का प्रमुख अधिकार किसके पास है?",["RBI","SEBI","SBI","वित्त आयोग"],0,"RBI अधिकांश बैंक नोट जारी करता है; एक रुपये का नोट भारत सरकार जारी करती है।"],["बेरोजगारी का अर्थ क्या है?",["काम करने की इच्छा और क्षमता होने पर काम न मिलना","काम न करना क्योंकि इच्छा नहीं है","केवल पढ़ाई करना","सेवानिवृत्ति"],0,"बेरोजगारी में व्यक्ति काम करने की इच्छा और क्षमता रखते हुए रोजगार नहीं पा रहा होता है।"],["प्रति व्यक्ति आय कैसे प्राप्त की जाती है?",["राष्ट्रीय आय ÷ जनसंख्या","जनसंख्या ÷ राष्ट्रीय आय","GDP × जनसंख्या","कर ÷ जनसंख्या"],0,"प्रति व्यक्ति आय = राष्ट्रीय आय ÷ जनसंख्या।"],["भारत में बजट सामान्यतः कौन प्रस्तुत करता है?",["प्रधान न्यायाधीश","केंद्रीय वित्त मंत्री","RBI गवर्नर","लोकसभा अध्यक्ष"],1,"केंद्रीय बजट केंद्रीय वित्त मंत्री संसद में प्रस्तुत करते हैं।"],["राजकोषीय नीति मुख्यतः किससे संबंधित है?",["सरकारी कर और व्यय","मौद्रिक आपूर्ति केवल","न्यायपालिका","विदेश नीति"],0,"राजकोषीय नीति सरकारी राजस्व, कर और व्यय से संबंधित होती है।"],["मौद्रिक नीति में रेपो रेट किससे संबंधित है?",["RBI द्वारा बैंकों को अल्पकालिक ऋण की दर","किसानों की MSP","आयकर दर","GST दर"],0,"रेपो रेट वह दर है जिस पर RBI बैंकों को अल्पकालिक धन उधार देता है।"],["गरीबी रेखा का उपयोग मुख्यतः किसके आकलन में किया जाता है?",["गरीबी की स्थिति","जनसंख्या घनत्व","साक्षरता","निर्यात"],0,"गरीबी रेखा गरीबी की स्थिति के आकलन के लिए उपयोग की जाती है।"],["भारत में राष्ट्रीय आय के आधिकारिक अनुमान से संबंधित प्रमुख संस्था कौन सी है?",["NSO","SEBI","RBI केवल","UPSC"],0,"राष्ट्रीय सांख्यिकी कार्यालय (NSO) राष्ट्रीय आय के आंकड़ों से संबंधित प्रमुख संस्था है।"],["बैंक में जमा धन पर मिलने वाली राशि को क्या कहते हैं?",["ब्याज","मूलधन","कर","लाभांश"],0,"जमा पर बैंक द्वारा दी जाने वाली अतिरिक्त राशि ब्याज कहलाती है।"],["भारत में मौद्रिक नीति मुख्यतः कौन बनाता है?",["RBI","SEBI","NITI Aayog","वित्त आयोग"],0,"भारत में मौद्रिक नीति का संचालन RBI करता है।"],["RBI का मुख्यालय कहाँ है?",["नई दिल्ली","मुंबई","कोलकाता","चेन्नई"],1,"RBI का केंद्रीय कार्यालय मुंबई में है।"],["भारत में केंद्रीय बैंक कौन सा है?",["SBI","RBI","PNB","NABARD"],1,"Reserve Bank of India भारत का केंद्रीय बैंक है।"],["GDP का पूरा नाम क्या है?",["Gross Domestic Product","General Domestic Price","Gross Development Plan","General Development Product"],0,"GDP का पूरा नाम Gross Domestic Product है।"],["मुद्रास्फीति का सामान्य अर्थ क्या है?",["कीमतों के सामान्य स्तर में वृद्धि","बेरोजगारी में कमी","उत्पादन का शून्य होना","करों का समाप्त होना"],0,"मुद्रास्फीति में वस्तुओं और सेवाओं के सामान्य मूल्य स्तर में वृद्धि होती है।"],["भारत में GST कब लागू हुआ?",["2014","2016","2017","2019"],2,"GST भारत में 1 जुलाई 2017 को लागू हुआ।"],["GST का पूरा नाम क्या है?",["Goods and Services Tax","General Sales Tax","Goods Supply Tariff","Government Service Tax"],0,"GST का पूरा नाम Goods and Services Tax है।"],["प्रत्यक्ष कर का उदाहरण कौन सा है?",["GST","आयकर","सीमा शुल्क","उत्पाद शुल्क"],1,"आयकर प्रत्यक्ष कर है।"]],"Indian Art & Culture":[["वारली चित्रकला मुख्यतः किस राज्य से जुड़ी है?",["महाराष्ट्र","गुजरात","बिहार","ओडिशा"],0,"वारली चित्रकला महाराष्ट्र की जनजातीय कला परंपरा है।"],["पट्टचित्र कला मुख्यतः किस राज्य से जुड़ी है?",["ओडिशा","पंजाब","हरियाणा","सिक्किम"],0,"पट्टचित्र ओडिशा की प्रसिद्ध चित्रकला परंपरा है।"],["कलमकारी कला मुख्यतः किस क्षेत्र से जुड़ी है?",["आंध्र प्रदेश और तेलंगाना","पंजाब","बिहार","हिमाचल प्रदेश"],0,"कलमकारी आंध्र प्रदेश और तेलंगाना क्षेत्र की प्रसिद्ध वस्त्र-कला है।"],["तंजौर चित्रकला किस राज्य से संबंधित है?",["तमिलनाडु","केरल","असम","मणिपुर"],0,"तंजौर चित्रकला तमिलनाडु की प्रसिद्ध कला परंपरा है।"],["सांची स्तूप किस राज्य में स्थित है?",["मध्य प्रदेश","बिहार","उत्तर प्रदेश","राजस्थान"],0,"सांची स्तूप मध्य प्रदेश में स्थित है।"],["कोणार्क सूर्य मंदिर किस राज्य में है?",["ओडिशा","गुजरात","महाराष्ट्र","बिहार"],0,"कोणार्क सूर्य मंदिर ओडिशा में स्थित है।"],["अजंता की गुफाएँ किस राज्य में हैं?",["महाराष्ट्र","मध्य प्रदेश","बिहार","राजस्थान"],0,"अजंता की गुफाएँ महाराष्ट्र में हैं।"],["एलोरा की गुफाएँ किस राज्य में हैं?",["महाराष्ट्र","गुजरात","ओडिशा","कर्नाटक"],0,"एलोरा की गुफाएँ महाराष्ट्र में स्थित हैं।"],["नाट्यशास्त्र के रचयिता किसे माना जाता है?",["भरतमुनि","कालिदास","तुलसीदास","बाणभट्ट"],0,"नाट्यशास्त्र के रचयिता परंपरागत रूप से भरतमुनि माने जाते हैं।"],["कथकली किस राज्य की शास्त्रीय नृत्य-नाट्य शैली है?",["केरल","तमिलनाडु","असम","मणिपुर"],0,"कथकली केरल की प्रसिद्ध शास्त्रीय नृत्य-नाट्य शैली है।"],["कुचिपुड़ी किस राज्य से संबंधित शास्त्रीय नृत्य है?",["ओडिशा","आंध्र प्रदेश","केरल","गुजरात"],1,"कुचिपुड़ी आंध्र प्रदेश से संबंधित है।"],["ओडिसी किस राज्य का शास्त्रीय नृत्य है?",["ओडिशा","बिहार","राजस्थान","पंजाब"],0,"ओडिसी ओडिशा का शास्त्रीय नृत्य है।"],["मणिपुरी नृत्य किस राज्य से संबंधित है?",["मणिपुर","असम","त्रिपुरा","मेघालय"],0,"मणिपुरी नृत्य मणिपुर से संबंधित है।"],["मोहिनीअट्टम किस राज्य का शास्त्रीय नृत्य है?",["केरल","कर्नाटक","तमिलनाडु","महाराष्ट्र"],0,"मोहिनीअट्टम केरल से संबंधित है।"],["सत्रिया नृत्य किस राज्य से संबंधित है?",["असम","ओडिशा","बिहार","पश्चिम बंगाल"],0,"सत्रिया असम का शास्त्रीय नृत्य है।"],["गरबा मुख्यतः किस राज्य की लोक नृत्य परंपरा है?",["गुजरात","राजस्थान","पंजाब","हरियाणा"],0,"गरबा गुजरात की प्रसिद्ध लोक नृत्य परंपरा है।"],["भांगड़ा किस राज्य की लोक नृत्य शैली है?",["पंजाब","बिहार","असम","केरल"],0,"भांगड़ा पंजाब की प्रसिद्ध लोक नृत्य शैली है।"],["घूमर किस राज्य का प्रसिद्ध लोक नृत्य है?",["राजस्थान","गुजरात","मध्य प्रदेश","उत्तर प्रदेश"],0,"घूमर राजस्थान का प्रसिद्ध लोक नृत्य है।"],["बिहू नृत्य किस राज्य से संबंधित है?",["असम","बिहार","झारखंड","ओडिशा"],0,"बिहू असम की प्रमुख लोक परंपरा है।"],["मधुबनी चित्रकला किस क्षेत्र से संबंधित है?",["मिथिला","मालवा","मेवाड़","कोंकण"],0,"मधुबनी चित्रकला मिथिला क्षेत्र की प्रसिद्ध कला है।"]]};
Object.keys(quiz3Data).forEach(subject => { quizSets[subject][3] = quiz3Data[subject]; });
// ===== V12: Quiz 1-5 completed with refreshed harder selection =====
const quiz1V12={"GK":[["भारतीय अंतरिक्ष अनुसंधान संगठन का संक्षिप्त नाम क्या है?",["DRDO","ISRO","CSIR","BARC"],1,"Indian Space Research Organisation का संक्षिप्त नाम ISRO है।"],["भारत का सर्वोच्च शांतिकालीन वीरता पुरस्कार कौन सा है?",["शौर्य चक्र","अशोक चक्र","कीर्ति चक्र","परमवीर चक्र"],1,"अशोक चक्र सर्वोच्च शांतिकालीन वीरता पुरस्कार है।"],["भारत का सर्वोच्च युद्धकालीन वीरता पुरस्कार कौन सा है?",["अशोक चक्र","परमवीर चक्र","महावीर चक्र","वीर चक्र"],1,"परमवीर चक्र सर्वोच्च युद्धकालीन वीरता पुरस्कार है।"],["भारत का राष्ट्रीय कैलेंडर किस संवत पर आधारित है?",["बौद्ध संवत","हिजरी संवत","विक्रम संवत","शक संवत"],3,"भारत का राष्ट्रीय कैलेंडर शक संवत पर आधारित है।"],["भारत का राष्ट्रीय चिन्ह किससे लिया गया है?",["कुतुब मीनार","सारनाथ का सिंह स्तंभ","कोणार्क मंदिर","सांची स्तूप"],1,"राष्ट्रीय चिन्ह सारनाथ के अशोक सिंह स्तंभ के शीर्ष से लिया गया है।"],["भारत का सबसे बड़ा नागरिक सम्मान कौन सा है?",["पद्म विभूषण","पद्म भूषण","भारत रत्न","पद्म श्री"],2,"भारत रत्न भारत का सर्वोच्च नागरिक सम्मान है।"],["भारतीय राष्ट्रीय ध्वज में कितने रंग हैं?",["3","2","5","4"],0,"राष्ट्रीय ध्वज में तीन मुख्य रंग हैं।"],["भारतीय राष्ट्रीय गान के रचयिता कौन हैं?",["सरोजिनी नायडू","बंकिमचंद्र चट्टोपाध्याय","महादेवी वर्मा","रवींद्रनाथ टैगोर"],3,"जन गण मन के रचयिता रवींद्रनाथ टैगोर हैं।"],["राज्यसभा को किस नाम से भी जाना जाता है?",["उच्च सदन","जनसभा","लोक परिषद","निचला सदन"],0,"राज्यसभा संसद का उच्च सदन है।"],["भारत में कितने केंद्र शासित प्रदेश हैं?",["8","7","6","9"],0,"भारत में 8 केंद्र शासित प्रदेश हैं।"],["लोकसभा को किस नाम से भी जाना जाता है?",["निचला सदन","संघ परिषद","राज्य परिषद","उच्च सदन"],0,"लोकसभा संसद का निचला सदन है।"],["भारतीय राष्ट्रीय गीत का नाम क्या है?",["सारे जहाँ से अच्छा","जन गण मन","ऐ मेरे वतन","वंदे मातरम्"],3,"वंदे मातरम् भारत का राष्ट्रीय गीत है।"],["भारत का राष्ट्रीय जलीय जीव कौन है?",["गंगा डॉल्फिन","मगरमच्छ","कछुआ","व्हेल"],0,"गंगा नदी की डॉल्फिन भारत का राष्ट्रीय जलीय जीव है।"],["भारत का राष्ट्रीय वृक्ष कौन सा है?",["पीपल","बरगद","आम","नीम"],1,"बरगद भारत का राष्ट्रीय वृक्ष है।"],["भारत का राष्ट्रीय फूल कौन सा है?",["कमल","चमेली","गुलाब","गेंदा"],0,"भारत का राष्ट्रीय फूल कमल है।"],["भारत का राष्ट्रीय पक्षी कौन है?",["गरुड़","मोर","तोता","हंस"],1,"भारत का राष्ट्रीय पक्षी भारतीय मोर है।"],["भारत का राष्ट्रीय फल कौन सा है?",["अमरूद","केला","आम","सेब"],2,"आम भारत का राष्ट्रीय फल माना जाता है।"],["भारत का पहला उपग्रह कौन सा था?",["इनसैट-1A","आर्यभट्ट","भास्कर","रोहिणी"],1,"आर्यभट्ट भारत का पहला उपग्रह था।"],["भारत की संसद के कितने सदन हैं?",["एक","चार","दो","तीन"],2,"भारतीय संसद के दो सदन हैं—लोकसभा और राज्यसभा।"],["भारत का राष्ट्रीय पशु कौन है?",["बाघ","हाथी","सिंह","मोर"],0,"भारत का राष्ट्रीय पशु बाघ है।"]],"History":[["भारतीय राष्ट्रीय कांग्रेस के प्रथम अध्यक्ष कौन थे?",["दादाभाई नौरोजी","ए. ओ. ह्यूम","गोपाल कृष्ण गोखले","डब्ल्यू. सी. बनर्जी"],3,"1885 में कांग्रेस के प्रथम अध्यक्ष डब्ल्यू. सी. बनर्जी थे।"],["सिंधु घाटी सभ्यता का प्रसिद्ध बंदरगाह कौन सा था?",["कालीबंगा","लोथल","मोहनजोदड़ो","हड़प्पा"],1,"लोथल एक प्रमुख प्राचीन बंदरगाह स्थल था।"],["अशोक ने कलिंग युद्ध के बाद किस धर्म को अपनाया?",["सिख धर्म","जैन धर्म","इस्लाम","बौद्ध धर्म"],3,"कलिंग युद्ध के बाद अशोक बौद्ध धर्म से प्रभावित हुए।"],["गुप्त काल को प्रायः किस नाम से जाना जाता है?",["पाषाण युग","स्वर्ण युग","औद्योगिक युग","लौह युग"],1,"गुप्त काल को भारतीय इतिहास का स्वर्ण युग कहा जाता है।"],["भारतीय राष्ट्रीय कांग्रेस की स्थापना कब हुई?",["1885","1905","1942","1919"],0,"भारतीय राष्ट्रीय कांग्रेस की स्थापना 1885 में हुई।"],["1857 का विद्रोह सबसे पहले कहाँ से शुरू हुआ?",["कानपुर","दिल्ली","झाँसी","मेरठ"],3,"1857 का विद्रोह 10 मई को मेरठ से शुरू हुआ।"],["बौद्ध धर्म के संस्थापक कौन माने जाते हैं?",["अशोक","गौतम बुद्ध","नागार्जुन","महावीर"],1,"बौद्ध धर्म के संस्थापक गौतम बुद्ध माने जाते हैं।"],["कुतुब मीनार का निर्माण किसने शुरू कराया?",["कुतुबुद्दीन ऐबक","इल्तुतमिश","बलबन","अलाउद्दीन खिलजी"],0,"कुतुबुद्दीन ऐबक ने कुतुब मीनार का निर्माण शुरू कराया।"],["मोहनजोदड़ो वर्तमान में किस देश में है?",["पाकिस्तान","नेपाल","अफगानिस्तान","भारत"],0,"मोहनजोदड़ो वर्तमान पाकिस्तान में स्थित है।"],["जलियांवाला बाग हत्याकांड किस वर्ष हुआ?",["1922","1930","1905","1919"],3,"जलियांवाला बाग हत्याकांड 1919 में हुआ।"],["भारत छोड़ो आंदोलन किस वर्ष शुरू हुआ?",["1942","1930","1940","1947"],0,"भारत छोड़ो आंदोलन अगस्त 1942 में शुरू हुआ।"],["दांडी मार्च किस आंदोलन से जुड़ा था?",["सविनय अवज्ञा आंदोलन","स्वदेशी आंदोलन","असहयोग आंदोलन","भारत छोड़ो आंदोलन"],0,"दांडी मार्च 1930 के सविनय अवज्ञा आंदोलन से जुड़ा था।"],["मौर्य साम्राज्य के संस्थापक कौन थे?",["चंद्रगुप्त मौर्य","बिंदुसार","अशोक","कनिष्क"],0,"चंद्रगुप्त मौर्य ने मौर्य साम्राज्य की स्थापना की।"],["जैन धर्म के 24वें तीर्थंकर कौन थे?",["नेमिनाथ","पार्श्वनाथ","महावीर","ऋषभदेव"],2,"महावीर जैन धर्म के 24वें तीर्थंकर थे।"],["मुगल साम्राज्य का संस्थापक कौन था?",["अकबर","शाहजहाँ","हुमायूँ","बाबर"],3,"बाबर ने 1526 में मुगल साम्राज्य की स्थापना की।"],["हड़प्पा स्थल किस नदी के तट पर था?",["यमुना","गंगा","रावी","नर्मदा"],2,"हड़प्पा रावी नदी के निकट स्थित था।"],["पानीपत का प्रथम युद्ध कब हुआ?",["1761","1556","1526","1757"],2,"प्रथम पानीपत का युद्ध 1526 में हुआ।"],["भारतीय संविधान कब लागू हुआ?",["2 अक्टूबर 1950","26 जनवरी 1950","26 नवंबर 1949","15 अगस्त 1947"],1,"संविधान 26 जनवरी 1950 को लागू हुआ।"],["बंगाल विभाजन किस वर्ष हुआ?",["1919","1905","1920","1911"],1,"बंगाल विभाजन 1905 में हुआ।"],["साइमन कमीशन भारत कब आया?",["1935","1927","1919","1928"],3,"साइमन कमीशन 1928 में भारत आया।"]],"Geography":[["भारत का सबसे ऊँचा पर्वत शिखर जो पूरी तरह भारत में स्थित है, कौन सा है?",["कामेत","अनामुडी","कंचनजंघा","नंदा देवी"],3,"नंदा देवी भारत में स्थित सबसे ऊँची पर्वत चोटियों में प्रमुख है।"],["दक्कन का पठार मुख्यतः किस प्रकार की चट्टानों से संबंधित है?",["चूना पत्थर","बलुआ पत्थर","बेसाल्ट","संगमरमर"],2,"दक्कन ट्रैप का आधार मुख्यतः बेसाल्टिक लावा से बना है।"],["भारत में सबसे अधिक वर्षा वाला स्थान कौन सा माना जाता है?",["दिल्ली","जैसलमेर","मौसिनराम","लेह"],2,"मेघालय का मौसिनराम अत्यधिक वार्षिक वर्षा के लिए प्रसिद्ध है।"],["भारत का सबसे बड़ा राज्य क्षेत्रफल के आधार पर कौन सा है?",["महाराष्ट्र","उत्तर प्रदेश","मध्य प्रदेश","राजस्थान"],3,"क्षेत्रफल के आधार पर राजस्थान सबसे बड़ा राज्य है।"],["ब्रह्मपुत्र भारत में मुख्यतः किस राज्य से होकर बहती है?",["बिहार","पंजाब","गुजरात","असम"],3,"ब्रह्मपुत्र असम में प्रमुख नदी के रूप में बहती है।"],["नीलगिरि पहाड़ियाँ किन राज्यों के संगम क्षेत्र में हैं?",["तमिलनाडु-कर्नाटक-केरल","बिहार-झारखंड-ओडिशा","गुजरात-महाराष्ट्र-गोवा","पंजाब-हरियाणा-राजस्थान"],0,"नीलगिरि पहाड़ियाँ तमिलनाडु, कर्नाटक और केरल के संगम क्षेत्र में हैं।"],["भारत का सबसे लंबा समुद्र तट किस राज्य के पास है?",["आंध्र प्रदेश","ओडिशा","तमिलनाडु","गुजरात"],3,"भारत के राज्यों में सबसे लंबी तटरेखा गुजरात की है।"],["भारत में कर्क रेखा कितने राज्यों से गुजरती है?",["6","8","9","7"],1,"कर्क रेखा भारत के 8 राज्यों से गुजरती है।"],["भारत की सबसे बड़ी मीठे पानी की झील कौन सी है?",["वूलर झील","चिल्का झील","लोकटक झील","सांभर झील"],0,"वूलर झील भारत की प्रमुख और सबसे बड़ी मीठे पानी की झीलों में है।"],["सुंदरबन डेल्टा मुख्यतः किन नदियों से बना है?",["गोदावरी-कृष्णा","नर्मदा-ताप्ती","सिंधु-झेलम","गंगा-ब्रह्मपुत्र-मेघना"],3,"सुंदरबन डेल्टा गंगा, ब्रह्मपुत्र और मेघना नदी तंत्र से बनता है।"],["गंगा नदी का उद्गम किस हिमनद से माना जाता है?",["सियाचिन","यमुनोत्री","गंगोत्री","पिंडारी"],2,"भागीरथी का उद्गम गंगोत्री हिमनद से माना जाता है।"],["अरावली पर्वतमाला की दिशा सामान्यतः कैसी है?",["उत्तर से दक्षिण","उत्तर-पश्चिम से दक्षिण-पूर्व","उत्तर-पूर्व से दक्षिण-पश्चिम","पूर्व से पश्चिम"],2,"अरावली पर्वतमाला की सामान्य दिशा उत्तर-पूर्व से दक्षिण-पश्चिम है।"],["कावेरी नदी का उद्गम किस राज्य में है?",["तमिलनाडु","आंध्र प्रदेश","कर्नाटक","केरल"],2,"कावेरी का उद्गम कर्नाटक के ब्रह्मगिरि क्षेत्र में है।"],["थार मरुस्थल मुख्यतः किस राज्य में है?",["ओडिशा","असम","बिहार","राजस्थान"],3,"थार मरुस्थल का अधिकांश भाग राजस्थान में है।"],["चिल्का झील किस राज्य में स्थित है?",["ओडिशा","पश्चिम बंगाल","केरल","आंध्र प्रदेश"],0,"चिल्का झील ओडिशा में स्थित है।"],["ताप्ती नदी किस सागर में गिरती है?",["कैस्पियन सागर","हिंद महासागर","अरब सागर","बंगाल की खाड़ी"],2,"ताप्ती नदी अरब सागर में गिरती है।"],["भारत का दक्षिणतम बिंदु कौन सा है?",["कन्याकुमारी","रामेश्वरम","पोर्ट ब्लेयर","इंदिरा प्वाइंट"],3,"भारत का दक्षिणतम बिंदु इंदिरा प्वाइंट है।"],["नर्मदा नदी किस सागर में गिरती है?",["अरब सागर","हिंद महासागर","लाल सागर","बंगाल की खाड़ी"],0,"नर्मदा नदी अरब सागर में गिरती है।"],["पश्चिमी घाट का दूसरा नाम क्या है?",["अरावली","काराकोरम","शिवालिक","सह्याद्रि"],3,"पश्चिमी घाट को सह्याद्रि भी कहा जाता है।"],["भारत की सबसे लंबी नदी कौन सी है?",["गोदावरी","गंगा","यमुना","नर्मदा"],1,"भारत में बहने वाली सबसे लंबी नदी गंगा है।"]],"Polity":[["भारतीय संविधान की प्रस्तावना में भारत को किस रूप में वर्णित किया गया है?",["सैन्य गणराज्य","संघीय राजतंत्र","एकात्मक राजतंत्र","सम्प्रभु समाजवादी पंथनिरपेक्ष लोकतांत्रिक गणराज्य"],3,"प्रस्तावना भारत को सम्प्रभु, समाजवादी, पंथनिरपेक्ष, लोकतांत्रिक गणराज्य बताती है।"],["राज्यसभा के कितने सदस्य हर दो वर्ष में सेवानिवृत्त होते हैं?",["दो-तिहाई","आधे","एक-चौथाई","एक-तिहाई"],3,"राज्यसभा के लगभग एक-तिहाई सदस्य हर दो वर्ष में सेवानिवृत्त होते हैं।"],["राज्यसभा के एक सदस्य का सामान्य कार्यकाल कितने वर्ष का है?",["6","5","7","4"],0,"राज्यसभा सदस्य का कार्यकाल 6 वर्ष होता है।"],["भारत का नियंत्रक एवं महालेखा परीक्षक किस अनुच्छेद में है?",["324","148","280","360"],1,"CAG का प्रावधान अनुच्छेद 148 में है।"],["संविधान संशोधन की प्रक्रिया मुख्यतः किस अनुच्छेद में है?",["अनुच्छेद 356","अनुच्छेद 280","अनुच्छेद 123","अनुच्छेद 368"],3,"संविधान संशोधन की प्रक्रिया अनुच्छेद 368 में है।"],["भारत के उपराष्ट्रपति राज्यसभा में किस पद पर होते हैं?",["सभापति","नेता सदन","महासचिव","उपसभापति"],0,"उपराष्ट्रपति राज्यसभा के पदेन सभापति होते हैं।"],["भारत के राष्ट्रपति का कार्यकाल कितने वर्ष का होता है?",["4","7","6","5"],3,"राष्ट्रपति का कार्यकाल 5 वर्ष है।"],["संविधान का अनुच्छेद 32 किस अधिकार से संबंधित है?",["धर्म की स्वतंत्रता","शिक्षा","संवैधानिक उपचार","समानता"],2,"अनुच्छेद 32 संवैधानिक उपचार के अधिकार से संबंधित है।"],["नगरपालिकाओं से संबंधित संविधान संशोधन कौन सा है?",["75वाँ","73वाँ","74वाँ","72वाँ"],2,"74वाँ संशोधन नगरपालिकाओं से संबंधित है।"],["लोकसभा का अध्यक्ष किस सदन द्वारा चुना जाता है?",["सुप्रीम कोर्ट","लोकसभा","राष्ट्रपति","राज्यसभा"],1,"लोकसभा अपने अध्यक्ष का चुनाव स्वयं करती है।"],["निर्वाचन आयोग का प्रावधान किस अनुच्छेद में है?",["324","356","368","280"],0,"निर्वाचन आयोग का प्रावधान अनुच्छेद 324 में है।"],["मतदान की आयु 21 से 18 वर्ष किस संशोधन से हुई?",["44वाँ","61वाँ","73वाँ","42वाँ"],1,"61वें संविधान संशोधन अधिनियम ने मतदान आयु 18 वर्ष की।"],["भारत में सर्वोच्च न्यायालय की स्थापना कब हुई?",["1952","1950","1956","1947"],1,"सर्वोच्च न्यायालय ने 1950 में कार्य करना शुरू किया।"],["लोकसभा का सामान्य कार्यकाल कितने वर्ष का है?",["7","5","6","4"],1,"लोकसभा का सामान्य कार्यकाल 5 वर्ष है।"],["वित्त आयोग का प्रावधान किस अनुच्छेद में है?",["148","280","315","324"],1,"वित्त आयोग का प्रावधान अनुच्छेद 280 में है।"],["राज्य के नीति निदेशक तत्व किस भाग में हैं?",["भाग V","भाग III","भाग IV","भाग VI"],2,"नीति निदेशक तत्व भाग IV में हैं।"],["भारत में राष्ट्रपति का चुनाव कौन करता है?",["केवल राज्यसभा","केवल लोकसभा","सुप्रीम कोर्ट","निर्वाचक मंडल"],3,"राष्ट्रपति का चुनाव निर्वाचक मंडल करता है।"],["मौलिक अधिकार संविधान के किस भाग में हैं?",["भाग IV","भाग II","भाग V","भाग III"],3,"मौलिक अधिकार संविधान के भाग III में हैं।"],["पंचायती राज से संबंधित संशोधन कौन सा है?",["74वाँ","61वाँ","86वाँ","73वाँ"],3,"73वाँ संशोधन पंचायती राज से संबंधित है।"],["भारत में मतदान की न्यूनतम आयु कितनी है?",["18 वर्ष","21 वर्ष","16 वर्ष","25 वर्ष"],0,"भारत में मतदान की न्यूनतम आयु 18 वर्ष है।"]],"Science":[["मानव शरीर में रक्त का शुद्धीकरण मुख्यतः किस अंग द्वारा होता है?",["अग्न्याशय","त्वचा","गुर्दे","हृदय"],2,"गुर्दे रक्त से अपशिष्ट पदार्थों को छानने में मुख्य भूमिका निभाते हैं।"],["रक्त में ऑक्सीजन का परिवहन मुख्यतः किसके द्वारा होता है?",["हीमोग्लोबिन","प्लेटलेट्स","प्लाज्मा","श्वेत रक्त कोशिकाएँ"],0,"हीमोग्लोबिन ऑक्सीजन के परिवहन में मुख्य भूमिका निभाता है।"],["पौधों में प्रकाश संश्लेषण मुख्यतः किस अंगक में होता है?",["राइबोसोम","नाभिक","माइटोकॉन्ड्रिया","क्लोरोप्लास्ट"],3,"प्रकाश संश्लेषण क्लोरोप्लास्ट में होता है।"],["मानव शरीर में रक्त को पंप करने वाला अंग कौन है?",["गुर्दा","फेफड़ा","हृदय","यकृत"],2,"हृदय रक्त को पूरे शरीर में पंप करता है।"],["मानव शरीर में इंसुलिन किस अंग द्वारा बनता है?",["यकृत","अग्न्याशय","हृदय","गुर्दा"],1,"इंसुलिन अग्न्याशय की बीटा कोशिकाओं द्वारा बनता है।"],["प्रकाश की चाल निर्वात में लगभग कितनी है?",["3×10⁸ m/s","3×10¹⁰ m/s","3×10⁴ m/s","3×10⁶ m/s"],0,"निर्वात में प्रकाश की चाल लगभग 3×10⁸ m/s है।"],["विटामिन C की कमी से कौन सा रोग होता है?",["स्कर्वी","रिकेट्स","बेरी-बेरी","रातांधता"],0,"विटामिन C की कमी से स्कर्वी होता है।"],["विटामिन D की कमी से कौन सा रोग होता है?",["घेंघा","रिकेट्स","एनीमिया","स्कर्वी"],1,"विटामिन D की कमी से बच्चों में रिकेट्स हो सकता है।"],["मानव शरीर का सबसे बड़ा अंग कौन सा है?",["त्वचा","यकृत","फेफड़ा","हृदय"],0,"त्वचा मानव शरीर का सबसे बड़ा अंग है।"],["साधारण नमक का रासायनिक सूत्र क्या है?",["NaOH","HCl","KCl","NaCl"],3,"साधारण नमक का सूत्र NaCl है।"],["क्षार का pH सामान्यतः कितना होता है?",["0","7 से अधिक","7 के बराबर","7 से कम"],1,"क्षारीय विलयन का pH 7 से अधिक होता है।"],["अम्ल का pH सामान्यतः कितना होता है?",["7 के बराबर","14 से अधिक","7 से कम","7 से अधिक"],2,"अम्लीय विलयन का pH 7 से कम होता है।"],["कार्बन डाइऑक्साइड का सूत्र क्या है?",["CO₂","CaCO₃","CO","C₂O"],0,"कार्बन डाइऑक्साइड का रासायनिक सूत्र CO₂ है।"],["ध्वनि निर्वात में क्यों नहीं चलती?",["गुरुत्व नहीं होता","माध्यम नहीं होता","प्रकाश नहीं होता","तापमान कम होता है"],1,"ध्वनि के प्रसार के लिए भौतिक माध्यम आवश्यक होता है।"],["ऑक्सीजन का रासायनिक सूत्र क्या है?",["O₃","O","OH","O₂"],3,"सामान्य ऑक्सीजन अणु O₂ होता है।"],["विद्युत धारा की SI इकाई क्या है?",["वोल्ट","एम्पियर","ओम","कूलॉम"],1,"विद्युत धारा की SI इकाई एम्पियर है।"],["जल का रासायनिक सूत्र क्या है?",["NaCl","CO₂","H₂O","O₂"],2,"जल का रासायनिक सूत्र H₂O है।"],["प्रतिरोध की SI इकाई क्या है?",["वाट","वोल्ट","फैरड","ओम"],3,"प्रतिरोध की SI इकाई ओम है।"],["आवृत्ति की SI इकाई क्या है?",["हर्ट्ज","पास्कल","न्यूटन","जूल"],0,"आवृत्ति की SI इकाई हर्ट्ज है।"],["कार्य की SI इकाई क्या है?",["जूल","न्यूटन","वाट","एम्पियर"],0,"कार्य की SI इकाई जूल है।"]],"Maths":[["एक वस्तु का अंकित मूल्य 800 रुपये है और 10% छूट है। विक्रय मूल्य क्या होगा?",["720","740","700","760"],0,"800 का 10% = 80, इसलिए विक्रय मूल्य 720 रुपये है।"],["1000 रुपये पर 5% वार्षिक साधारण ब्याज 3 वर्षों का मिश्रधन क्या होगा?",["1050","1100","1150","1200"],2,"ब्याज 150 रुपये है; मिश्रधन 1150 रुपये।"],["500 रुपये पर 10% वार्षिक साधारण ब्याज 2 वर्षों का कितना होगा?",["75","100","50","125"],1,"SI = 500×10×2/100 = 100 रुपये।"],["एक आयत की लंबाई 12 cm और चौड़ाई 5 cm है। क्षेत्रफल क्या है?",["120 cm²","34 cm²","17 cm²","60 cm²"],3,"क्षेत्रफल = 12×5 = 60 cm²."],["यदि 5 पेन की कीमत 60 रुपये है, तो 8 पेन की कीमत कितनी होगी?",["96","90","100","84"],0,"एक पेन 12 रुपये का है; 8 पेन = 96 रुपये।"],["एक ट्रेन 60 km/h की गति से 2 घंटे चले तो दूरी कितनी होगी?",["100 km","160 km","140 km","120 km"],3,"दूरी = गति×समय = 60×2 = 120 km."],["अनुपात 3:5 में कुल 64 बाँटे जाएँ, तो पहला भाग कितना होगा?",["32","24","20","28"],1,"कुल 8 भाग हैं; 64×3/8 = 24."],["यदि किसी संख्या का 10% = 15 है, तो संख्या क्या होगी?",["150","100","120","200"],0,"15 × 100/10 = 150."],["एक संख्या 200 से 15% बढ़ती है। नई संख्या क्या होगी?",["240","225","230","215"],2,"200 का 15% = 30, इसलिए नई संख्या 230 है।"],["एक संख्या 500 से 20% घटती है। नई संख्या क्या होगी?",["420","450","380","400"],3,"500 का 20% = 100, इसलिए नई संख्या 400 है।"],["यदि किसी संख्या का 40% = 80 है, तो संख्या क्या है?",["240","160","180","200"],3,"संख्या = 80×100/40 = 200."],["वर्ग की भुजा 9 cm है। उसका क्षेत्रफल क्या होगा?",["81 cm²","18 cm²","72 cm²","36 cm²"],0,"वर्ग का क्षेत्रफल 9×9 = 81 cm²."],["वर्ग की भुजा 7 cm है। उसका परिमाप क्या होगा?",["49 cm","21 cm","14 cm","28 cm"],3,"परिमाप = 4×7 = 28 cm."],["2 घंटे 30 मिनट में कुल कितने मिनट होते हैं?",["130","120","180","150"],3,"2 घंटे = 120 मिनट; 120+30 = 150 मिनट।"],["एक संख्या का 3/5 = 24 है। संख्या क्या है?",["36","45","30","40"],3,"संख्या = 24×5/3 = 40."],["15, 20 और 25 का औसत क्या है?",["18","20","22","25"],1,"(15+20+25)/3 = 20."],["0.75 को भिन्न में बदलें।",["2/3","3/4","4/5","1/2"],1,"0.75 = 75/100 = 3/4."],["12 और 18 का LCM क्या है?",["30","24","36","48"],2,"12 और 18 का LCM 36 है।"],["24 और 36 का HCF क्या है?",["8","18","6","12"],3,"24 और 36 का HCF 12 है।"],["480 का 25% कितना है?",["160","100","120","140"],2,"480 × 25/100 = 120."]],"Reasoning":[["एक व्यक्ति उत्तर की ओर 10 m चलता है, फिर दाएँ मुड़कर 5 m चलता है। वह प्रारंभिक स्थान से किस दिशा में है?",["उत्तर-पूर्व","उत्तर-पश्चिम","दक्षिण-पूर्व","दक्षिण-पश्चिम"],0,"उत्तर के बाद दाएँ मुड़ने पर पूर्व दिशा आती है; स्थिति उत्तर-पूर्व है।"],["एक कक्षा में रवि ऊपर से 7वाँ और नीचे से 14वाँ है। कुल विद्यार्थी कितने हैं?",["20","22","21","19"],0,"कुल = 7+14−1 = 20."],["यदि सभी गुलाब फूल हैं और कुछ फूल लाल हैं, तो कौन सा निष्कर्ष निश्चित है?",["सभी गुलाब लाल हैं","कोई फूल लाल नहीं है","सभी गुलाब फूल हैं","कुछ गुलाब लाल हैं"],2,"पहला कथन सीधे बताता है कि सभी गुलाब फूल हैं।"],["राम, श्याम से लंबा है और श्याम, मोहन से लंबा है। सबसे छोटा कौन है?",["श्याम","राम","मोहन","निश्चित नहीं"],2,"राम > श्याम > मोहन, इसलिए मोहन सबसे छोटा है।"],["A, B का भाई है और B, C की बहन है। A का C से क्या संबंध निश्चित है?",["भाई","पिता","निश्चित नहीं","बहन"],2,"B का लिंग और A का लिंग दिए हैं, पर C का लिंग नहीं; इसलिए संबंध निश्चित नहीं।"],["यदि सभी A, B हैं और सभी B, C हैं, तो निश्चित निष्कर्ष क्या है?",["कोई A, C नहीं है","सभी C, A हैं","सभी A, C हैं","कुछ C, A नहीं हैं"],2,"A के सभी सदस्य B और B के सभी सदस्य C हैं, इसलिए सभी A, C हैं।"],["घड़ी में 3 बजे घंटे और मिनट की सुई के बीच कोण कितना होता है?",["180°","60°","120°","90°"],3,"3 बजे मिनट की सुई 12 पर और घंटे की 3 पर होती है; कोण 90° है।"],["यदि MANGO को NBOHP लिखा जाए, तो APPLE को क्या लिखा जाएगा?",["BQQMF","BQQLF","BPPMF","CQPMF"],0,"हर अक्षर को एक स्थान आगे किया गया है।"],["यदि SOUTH को TPVUI लिखा जाए, तो NORTH को क्या लिखा जाएगा?",["NPSUI","OPSTI","OQSVI","OPSUI"],3,"हर अक्षर को एक स्थान आगे किया गया है।"],["यदि BOOK को CPPL लिखा जाए, तो PEN को क्या लिखा जाएगा?",["QFO","QEN","RGP","PFN"],0,"हर अक्षर में 1 जोड़ा गया है।"],["यदि CAT को DBU लिखा जाए, तो DOG को क्या लिखा जाएगा?",["DPG","EOH","FPH","EPH"],3,"हर अक्षर में 1 जोड़ा गया है: D→E, O→P, G→H."],["यदि 1 जनवरी सोमवार है, तो 8 जनवरी कौन सा दिन होगा?",["सोमवार","मंगलवार","बुधवार","रविवार"],0,"7 दिन बाद वही दिन आता है, इसलिए सोमवार।"],["यदि आज सोमवार है, तो 10 दिन बाद कौन सा दिन होगा?",["शुक्रवार","बुधवार","गुरुवार","शनिवार"],2,"10 mod 7 = 3; सोमवार से 3 दिन बाद गुरुवार।"],["विषम चुनें: सेब, आम, केला, गाजर",["केला","आम","गाजर","सेब"],2,"गाजर सब्जी है, बाकी फल हैं।"],["श्रृंखला: 100, 90, 80, 70, ?",["50","55","65","60"],3,"हर बार 10 घटाया गया है।"],["श्रृंखला: 2, 3, 5, 8, 13, ?",["21","22","20","18"],0,"हर पद पिछले दो पदों का योग है; 8+13 = 21."],["विषम चुनें: 2, 4, 8, 16, 18",["2","18","8","16"],1,"2,4,8,16 क्रम में 2 की घातें हैं; 18 अलग है।"],["श्रृंखला: 5, 10, 15, 20, ?",["22","35","30","25"],3,"हर बार 5 जोड़ा गया है।"],["श्रृंखला: 3, 6, 12, 24, ?",["48","54","42","36"],0,"हर पद पिछले पद का 2 गुना है।"],["श्रृंखला: 2, 5, 10, 17, ?",["30","28","24","26"],3,"अंतर 3,5,7 है; अगला अंतर 9, इसलिए 26."]],"Hindi":[["‘जो मेहनत करता है, वह सफल होता है।’ यह कौन सा वाक्य है?",["सरल","मिश्र","विस्मयादिबोधक","संयुक्त"],1,"इसमें एक प्रधान और एक आश्रित उपवाक्य है, इसलिए मिश्र वाक्य है।"],["‘मैं स्कूल जाता हूँ।’ वाक्य में सर्वनाम कौन सा है?",["स्कूल","जाता","मैं","हूँ"],2,"‘मैं’ सर्वनाम है।"],["‘राम आया और श्याम चला गया।’ कौन सा वाक्य है?",["प्रश्नवाचक","सरल","मिश्र","संयुक्त"],3,"दो स्वतंत्र उपवाक्य ‘और’ से जुड़े हैं, इसलिए संयुक्त वाक्य है।"],["‘दूध का दूध, पानी का पानी’ का अर्थ क्या है?",["बहुत मेहनत","जल्दी करना","धोखा देना","न्यायपूर्ण निर्णय"],3,"इसका अर्थ सत्य और असत्य को स्पष्ट कर देना है।"],["‘धीरे-धीरे’ किस प्रकार का क्रियाविशेषण है?",["कालवाचक","रीतिवाचक","स्थानवाचक","परिमाणवाचक"],1,"‘धीरे-धीरे’ कार्य की रीति बताता है।"],["‘आँखों का तारा’ मुहावरे का अर्थ क्या है?",["बहुत गरीब","बहुत दूर","बहुत प्रिय","बहुत क्रोधित"],2,"‘आँखों का तारा’ का अर्थ बहुत प्रिय व्यक्ति है।"],["‘तीन लड़के’ में ‘तीन’ कौन सा विशेषण है?",["गुणवाचक","संख्यावाचक","परिमाणवाचक","संबंधवाचक"],1,"‘तीन’ निश्चित संख्या बताता है।"],["‘कल मैं बाजार गया।’ में ‘कल’ क्या है?",["क्रियाविशेषण","सर्वनाम","संज्ञा","विशेषण"],0,"‘कल’ समय बताने वाला क्रियाविशेषण है।"],["‘अधजल गगरी छलकत जाए’ का भाव क्या है?",["मेहनत का फल मिलता है","एकता में बल है","समय अमूल्य है","कम ज्ञान वाला अधिक दिखावा करता है"],3,"मुहावरे का आशय है कि कम ज्ञान वाला व्यक्ति अधिक दिखावा करता है।"],["‘राजा का पुत्र’ का समास रूप क्या है?",["राजमार्ग","राजमहल","राजर्षि","राजपुत्र"],3,"राजा का पुत्र = राजपुत्र, यह तत्पुरुष समास है।"],["‘नाक कटना’ मुहावरे का अर्थ क्या है?",["अपमान होना","बीमार होना","सम्मान मिलना","तेज दौड़ना"],0,"‘नाक कटना’ का अर्थ अपमान होना है।"],["‘विद्या + आलय’ का संधि रूप क्या है?",["विद्यालय","विदालय","विद्यलय","विद्याआलय"],0,"विद्या + आलय से विद्यालय बनता है।"],["‘राम ने फल खाया।’ में कर्ता कौन है?",["खाया","राम","फल","ने"],1,"कार्य करने वाला कर्ता राम है।"],["‘सुंदर’ किस प्रकार का विशेषण है?",["गुणवाचक","परिमाणवाचक","संख्यावाचक","सार्वनामिक"],0,"‘सुंदर’ गुण बताता है, इसलिए गुणवाचक विशेषण है।"],["‘अग्नि’ का पर्यायवाची कौन सा है?",["अनल","अंबर","अचल","अमृत"],0,"अग्नि का पर्यायवाची अनल है।"],["‘आकाश’ का पर्यायवाची कौन सा है?",["नभ","अनल","नीर","पवन"],0,"आकाश का पर्यायवाची नभ है।"],["'जल' का पर्यायवाची कौन सा है?",["धरती","वायु","अग्नि","नीर"],3,"जल का पर्यायवाची नीर है।"],["‘नदी’ शब्द का लिंग क्या है?",["नपुंसकलिंग","पुल्लिंग","स्त्रीलिंग","उभयलिंग"],2,"‘नदी’ स्त्रीलिंग शब्द है।"],["‘लड़का’ का बहुवचन क्या है?",["लड़के","लड़कियाँ","लड़की","लड़कों"],0,"‘लड़का’ का सामान्य बहुवचन ‘लड़के’ है।"],["'सुंदर' का विलोम क्या है?",["कुरूप","सरल","मधुर","अच्छा"],0,"सुंदर का विलोम कुरूप है।"]],"English":[["Choose the correct conjunction: “I was tired ___ I continued working.”",["but","because","or","so"],0,"But connects two contrasting ideas."],["Choose the correct article: “___ apple a day keeps the doctor away.”",["No article","The","An","A"],2,"“Apple” begins with a vowel sound, so “an” is used."],["Choose the correct preposition: “The book is ___ the table.”",["by","on","in","at"],1,"On is used for something resting on a surface."],["Choose the correct indirect speech: He said, “I am tired.”",["He said that he is tired always.","He said that he was tired.","He says he tired.","He said that I am tired."],1,"In standard reported speech, am changes to was with the past reporting verb."],["Choose the correct question tag: “You are coming, ___?”",["aren’t you","isn’t it","don’t you","are you"],0,"A positive statement with are takes the negative tag aren’t you."],["Choose the correct form: “He ___ to school every day.”",["gone","go","goes","going"],2,"With third-person singular he, the simple present uses goes."],["Identify the adjective: “She wore a beautiful dress.”",["beautiful","dress","wore","She"],0,"Beautiful describes the noun dress, so it is an adjective."],["Choose the correct form: “They ___ playing cricket.”",["was","am","are","is"],2,"The plural subject they takes are."],["Identify the noun: “Honesty is the best policy.”",["is","the","Honesty","best"],2,"Honesty is a noun naming a quality."],["Choose the passive voice: “Ram wrote a letter.”",["Ram is writing a letter.","A letter was written by Ram.","A letter writes Ram.","Ram was written by a letter."],1,"The passive form is A letter was written by Ram."],["What is the comparative form of “Good”?",["Gooder","More good","Better","Best"],2,"The comparative form of good is better."],["Identify the adverb: “He runs quickly.”",["He","none","quickly","runs"],2,"Quickly modifies the verb runs, so it is an adverb."],["What is the superlative form of “Bad”?",["Most bad","Worst","Worse","Badder"],1,"The superlative form of bad is worst."],["Choose the correct past tense of “Go”.",["Went","Going","Gone","Goed"],0,"The simple past of go is went."],["Choose the correct synonym of “Rapid”.",["Fast","Late","Slow","Weak"],0,"Rapid means fast."],["Choose the correct plural of “Child”.",["Childrens","Childes","Childs","Children"],3,"The standard plural of child is children."],["Choose the antonym of “Ancient”.",["Past","Modern","Historic","Old"],1,"Modern is the opposite of ancient."],["Choose the antonym of “Expand”.",["Contract","Extend","Increase","Enlarge"],0,"Contract means become smaller or reduce in size."],["Choose the synonym of “Brave”.",["Lazy","Courageous","Weak","Coward"],1,"Courageous means brave."],["Choose the correct spelling.",["Seperate","Seprate","Separate","Seperete"],2,"The correct spelling is Separate."]],"Economics":[["भारत में राष्ट्रीय आय के आधिकारिक अनुमान से संबंधित प्रमुख संस्था कौन सी है?",["UPSC","RBI केवल","NSO","SEBI"],2,"राष्ट्रीय सांख्यिकी कार्यालय (NSO) राष्ट्रीय आय के आंकड़ों से संबंधित प्रमुख संस्था है।"],["गरीबी रेखा का उपयोग मुख्यतः किसके आकलन में किया जाता है?",["साक्षरता","जनसंख्या घनत्व","गरीबी की स्थिति","निर्यात"],2,"गरीबी रेखा गरीबी की स्थिति के आकलन के लिए उपयोग की जाती है।"],["भारत में नोट जारी करने का प्रमुख अधिकार किसके पास है?",["SBI","RBI","वित्त आयोग","SEBI"],1,"RBI अधिकांश बैंक नोट जारी करता है; एक रुपये का नोट भारत सरकार जारी करती है।"],["बैंक में जमा धन पर मिलने वाली राशि को क्या कहते हैं?",["ब्याज","कर","मूलधन","लाभांश"],0,"जमा पर बैंक द्वारा दी जाने वाली अतिरिक्त राशि ब्याज कहलाती है।"],["SEBI मुख्यतः किस क्षेत्र को नियंत्रित करता है?",["बैंकिंग","रेलवे","कृषि","प्रतिभूति बाजार"],3,"SEBI प्रतिभूति बाजार का नियमन करता है।"],["भारत में बजट सामान्यतः कौन प्रस्तुत करता है?",["प्रधान न्यायाधीश","लोकसभा अध्यक्ष","RBI गवर्नर","केंद्रीय वित्त मंत्री"],3,"केंद्रीय बजट केंद्रीय वित्त मंत्री संसद में प्रस्तुत करते हैं।"],["मौद्रिक नीति में रेपो रेट किससे संबंधित है?",["RBI द्वारा बैंकों को अल्पकालिक ऋण की दर","किसानों की MSP","आयकर दर","GST दर"],0,"रेपो रेट वह दर है जिस पर RBI बैंकों को अल्पकालिक धन उधार देता है।"],["भारत में मौद्रिक नीति मुख्यतः कौन बनाता है?",["RBI","वित्त आयोग","NITI Aayog","SEBI"],0,"भारत में मौद्रिक नीति का संचालन RBI करता है।"],["प्रति व्यक्ति आय कैसे प्राप्त की जाती है?",["राष्ट्रीय आय ÷ जनसंख्या","GDP × जनसंख्या","कर ÷ जनसंख्या","जनसंख्या ÷ राष्ट्रीय आय"],0,"प्रति व्यक्ति आय = राष्ट्रीय आय ÷ जनसंख्या।"],["NABARD मुख्यतः किस क्षेत्र से संबंधित है?",["अंतरिक्ष","रेलवे","कृषि और ग्रामीण विकास","रक्षा"],2,"NABARD कृषि और ग्रामीण विकास से संबंधित प्रमुख संस्था है।"],["राजकोषीय नीति मुख्यतः किससे संबंधित है?",["मौद्रिक आपूर्ति केवल","न्यायपालिका","विदेश नीति","सरकारी कर और व्यय"],3,"राजकोषीय नीति सरकारी राजस्व, कर और व्यय से संबंधित होती है।"],["मुद्रास्फीति का सामान्य अर्थ क्या है?",["कीमतों के सामान्य स्तर में वृद्धि","उत्पादन का शून्य होना","बेरोजगारी में कमी","करों का समाप्त होना"],0,"मुद्रास्फीति में वस्तुओं और सेवाओं के सामान्य मूल्य स्तर में वृद्धि होती है।"],["अप्रत्यक्ष कर का उदाहरण कौन सा है?",["GST","कॉर्पोरेट कर","संपत्ति कर","आयकर"],0,"GST एक अप्रत्यक्ष कर है।"],["प्रत्यक्ष कर का उदाहरण कौन सा है?",["आयकर","GST","उत्पाद शुल्क","सीमा शुल्क"],0,"आयकर प्रत्यक्ष कर है।"],["भारत में केंद्रीय बैंक कौन सा है?",["NABARD","PNB","RBI","SBI"],2,"Reserve Bank of India भारत का केंद्रीय बैंक है।"],["बेरोजगारी का अर्थ क्या है?",["काम करने की इच्छा और क्षमता होने पर काम न मिलना","सेवानिवृत्ति","केवल पढ़ाई करना","काम न करना क्योंकि इच्छा नहीं है"],0,"बेरोजगारी में व्यक्ति काम करने की इच्छा और क्षमता रखते हुए रोजगार नहीं पा रहा होता है।"],["भारत में GST कब लागू हुआ?",["2019","2017","2016","2014"],1,"GST भारत में 1 जुलाई 2017 को लागू हुआ।"],["GDP का पूरा नाम क्या है?",["General Development Product","Gross Development Plan","Gross Domestic Product","General Domestic Price"],2,"GDP का पूरा नाम Gross Domestic Product है।"],["GST का पूरा नाम क्या है?",["General Sales Tax","Government Service Tax","Goods and Services Tax","Goods Supply Tariff"],2,"GST का पूरा नाम Goods and Services Tax है।"],["RBI का मुख्यालय कहाँ है?",["चेन्नई","कोलकाता","मुंबई","नई दिल्ली"],2,"RBI का केंद्रीय कार्यालय मुंबई में है।"]],"Indian Art & Culture":[["भरतनाट्यम किस राज्य की प्रमुख शास्त्रीय नृत्य शैली है?",["ओडिशा","केरल","असम","तमिलनाडु"],3,"भरतनाट्यम तमिलनाडु से संबंधित शास्त्रीय नृत्य शैली है।"],["कुचिपुड़ी किस राज्य से संबंधित शास्त्रीय नृत्य है?",["ओडिशा","केरल","गुजरात","आंध्र प्रदेश"],3,"कुचिपुड़ी आंध्र प्रदेश से संबंधित है।"],["कथकली किस राज्य की शास्त्रीय नृत्य-नाट्य शैली है?",["मणिपुर","केरल","असम","तमिलनाडु"],1,"कथकली केरल की प्रसिद्ध शास्त्रीय नृत्य-नाट्य शैली है।"],["गरबा मुख्यतः किस राज्य की लोक नृत्य परंपरा है?",["पंजाब","हरियाणा","राजस्थान","गुजरात"],3,"गरबा गुजरात की प्रसिद्ध लोक नृत्य परंपरा है।"],["वारली चित्रकला मुख्यतः किस राज्य से जुड़ी है?",["गुजरात","महाराष्ट्र","बिहार","ओडिशा"],1,"वारली चित्रकला महाराष्ट्र की जनजातीय कला परंपरा है।"],["कलमकारी कला मुख्यतः किस क्षेत्र से जुड़ी है?",["बिहार","आंध्र प्रदेश और तेलंगाना","पंजाब","हिमाचल प्रदेश"],1,"कलमकारी आंध्र प्रदेश और तेलंगाना क्षेत्र की प्रसिद्ध वस्त्र-कला है।"],["मोहिनीअट्टम किस राज्य का शास्त्रीय नृत्य है?",["कर्नाटक","तमिलनाडु","केरल","महाराष्ट्र"],2,"मोहिनीअट्टम केरल से संबंधित है।"],["पट्टचित्र कला मुख्यतः किस राज्य से जुड़ी है?",["ओडिशा","हरियाणा","पंजाब","सिक्किम"],0,"पट्टचित्र ओडिशा की प्रसिद्ध चित्रकला परंपरा है।"],["मधुबनी चित्रकला किस क्षेत्र से संबंधित है?",["मिथिला","कोंकण","मालवा","मेवाड़"],0,"मधुबनी चित्रकला मिथिला क्षेत्र की प्रसिद्ध कला है।"],["नाट्यशास्त्र के रचयिता किसे माना जाता है?",["तुलसीदास","भरतमुनि","कालिदास","बाणभट्ट"],1,"नाट्यशास्त्र के रचयिता परंपरागत रूप से भरतमुनि माने जाते हैं।"],["घूमर किस राज्य का प्रसिद्ध लोक नृत्य है?",["उत्तर प्रदेश","मध्य प्रदेश","राजस्थान","गुजरात"],2,"घूमर राजस्थान का प्रसिद्ध लोक नृत्य है।"],["तंजौर चित्रकला किस राज्य से संबंधित है?",["तमिलनाडु","असम","मणिपुर","केरल"],0,"तंजौर चित्रकला तमिलनाडु की प्रसिद्ध कला परंपरा है।"],["भांगड़ा किस राज्य की लोक नृत्य शैली है?",["पंजाब","असम","बिहार","केरल"],0,"भांगड़ा पंजाब की प्रसिद्ध लोक नृत्य शैली है।"],["सत्रिया नृत्य किस राज्य से संबंधित है?",["बिहार","ओडिशा","पश्चिम बंगाल","असम"],3,"सत्रिया असम का शास्त्रीय नृत्य है।"],["ओडिसी किस राज्य का शास्त्रीय नृत्य है?",["ओडिशा","राजस्थान","पंजाब","बिहार"],0,"ओडिसी ओडिशा का शास्त्रीय नृत्य है।"],["मणिपुरी नृत्य किस राज्य से संबंधित है?",["मेघालय","असम","मणिपुर","त्रिपुरा"],2,"मणिपुरी नृत्य मणिपुर से संबंधित है।"],["कोणार्क सूर्य मंदिर किस राज्य में है?",["बिहार","ओडिशा","महाराष्ट्र","गुजरात"],1,"कोणार्क सूर्य मंदिर ओडिशा में स्थित है।"],["सांची स्तूप किस राज्य में स्थित है?",["उत्तर प्रदेश","मध्य प्रदेश","राजस्थान","बिहार"],1,"सांची स्तूप मध्य प्रदेश में स्थित है।"],["बिहू नृत्य किस राज्य से संबंधित है?",["झारखंड","असम","ओडिशा","बिहार"],1,"बिहू असम की प्रमुख लोक परंपरा है।"],["अजंता की गुफाएँ किस राज्य में हैं?",["महाराष्ट्र","राजस्थान","बिहार","मध्य प्रदेश"],0,"अजंता की गुफाएँ महाराष्ट्र में हैं।"]]};
Object.keys(quiz1V12).forEach(subject => { quizSets[subject][1] = quiz1V12[subject]; });
const quiz2V12={"GK":[["भारत में कुल कितने राज्य हैं?",["27","26","28","29"],2,"भारत में 28 राज्य हैं।"],["DRDO का पूरा नाम क्या है?",["Digital Research and Data Organisation","Defence Research and Development Organisation","Department of Rail Development Office","Defence Railway Development Organisation"],1,"DRDO का पूरा नाम Defence Research and Development Organisation है।"],["भारत की राजधानी क्या है?",["चेन्नई","कोलकाता","मुंबई","नई दिल्ली"],3,"भारत की राजधानी नई दिल्ली है।"],["भारतीय अंतरिक्ष अनुसंधान संगठन का संक्षिप्त नाम क्या है?",["CSIR","ISRO","DRDO","BARC"],1,"Indian Space Research Organisation का संक्षिप्त नाम ISRO है।"],["भारतीय अंतरिक्ष अनुसंधान संगठन का संक्षिप्त नाम क्या है?",["ISRO","CSIR","BARC","DRDO"],0,"Indian Space Research Organisation का संक्षिप्त नाम ISRO है।"],["भारतीय अंतरिक्ष अनुसंधान संगठन का संक्षिप्त नाम क्या है?",["DRDO","CSIR","BARC","ISRO"],3,"Indian Space Research Organisation का संक्षिप्त नाम ISRO है।"],["भारतीय अंतरिक्ष अनुसंधान संगठन का संक्षिप्त नाम क्या है?",["DRDO","ISRO","CSIR","BARC"],1,"Indian Space Research Organisation का संक्षिप्त नाम ISRO है।"],["भारतीय अंतरिक्ष अनुसंधान संगठन का संक्षिप्त नाम क्या है?",["DRDO","BARC","ISRO","CSIR"],2,"Indian Space Research Organisation का संक्षिप्त नाम ISRO है।"],["भारतीय अंतरिक्ष अनुसंधान संगठन का संक्षिप्त नाम क्या है?",["BARC","DRDO","CSIR","ISRO"],3,"Indian Space Research Organisation का संक्षिप्त नाम ISRO है।"],["भारतीय अंतरिक्ष अनुसंधान संगठन का संक्षिप्त नाम क्या है?",["DRDO","BARC","ISRO","CSIR"],2,"Indian Space Research Organisation का संक्षिप्त नाम ISRO है।"],["भारतीय अंतरिक्ष अनुसंधान संगठन का संक्षिप्त नाम क्या है?",["ISRO","DRDO","CSIR","BARC"],0,"Indian Space Research Organisation का संक्षिप्त नाम ISRO है।"],["भारतीय अंतरिक्ष अनुसंधान संगठन का संक्षिप्त नाम क्या है?",["CSIR","DRDO","BARC","ISRO"],3,"Indian Space Research Organisation का संक्षिप्त नाम ISRO है।"],["भारतीय अंतरिक्ष अनुसंधान संगठन का संक्षिप्त नाम क्या है?",["BARC","CSIR","ISRO","DRDO"],2,"Indian Space Research Organisation का संक्षिप्त नाम ISRO है।"],["भारतीय अंतरिक्ष अनुसंधान संगठन का संक्षिप्त नाम क्या है?",["BARC","DRDO","ISRO","CSIR"],2,"Indian Space Research Organisation का संक्षिप्त नाम ISRO है।"],["भारतीय अंतरिक्ष अनुसंधान संगठन का संक्षिप्त नाम क्या है?",["ISRO","CSIR","DRDO","BARC"],0,"Indian Space Research Organisation का संक्षिप्त नाम ISRO है।"],["भारतीय अंतरिक्ष अनुसंधान संगठन का संक्षिप्त नाम क्या है?",["ISRO","DRDO","CSIR","BARC"],0,"Indian Space Research Organisation का संक्षिप्त नाम ISRO है।"],["भारतीय अंतरिक्ष अनुसंधान संगठन का संक्षिप्त नाम क्या है?",["ISRO","CSIR","DRDO","BARC"],0,"Indian Space Research Organisation का संक्षिप्त नाम ISRO है।"],["भारतीय अंतरिक्ष अनुसंधान संगठन का संक्षिप्त नाम क्या है?",["BARC","CSIR","ISRO","DRDO"],2,"Indian Space Research Organisation का संक्षिप्त नाम ISRO है।"],["भारतीय अंतरिक्ष अनुसंधान संगठन का संक्षिप्त नाम क्या है?",["BARC","ISRO","CSIR","DRDO"],1,"Indian Space Research Organisation का संक्षिप्त नाम ISRO है।"],["भारतीय अंतरिक्ष अनुसंधान संगठन का संक्षिप्त नाम क्या है?",["CSIR","BARC","DRDO","ISRO"],3,"Indian Space Research Organisation का संक्षिप्त नाम ISRO है।"]],"History":[["प्लासी का युद्ध कब हुआ?",["1764","1857","1740","1757"],3,"प्लासी का युद्ध 1757 में हुआ।"],["बक्सर का युद्ध कब हुआ?",["1757","1857","1764","1772"],2,"बक्सर का युद्ध 1764 में हुआ।"],["भारतीय राष्ट्रीय कांग्रेस के प्रथम अध्यक्ष कौन थे?",["गोपाल कृष्ण गोखले","दादाभाई नौरोजी","डब्ल्यू. सी. बनर्जी","ए. ओ. ह्यूम"],2,"1885 में कांग्रेस के प्रथम अध्यक्ष डब्ल्यू. सी. बनर्जी थे।"],["भारतीय राष्ट्रीय कांग्रेस के प्रथम अध्यक्ष कौन थे?",["डब्ल्यू. सी. बनर्जी","गोपाल कृष्ण गोखले","ए. ओ. ह्यूम","दादाभाई नौरोजी"],0,"1885 में कांग्रेस के प्रथम अध्यक्ष डब्ल्यू. सी. बनर्जी थे।"],["भारतीय राष्ट्रीय कांग्रेस के प्रथम अध्यक्ष कौन थे?",["गोपाल कृष्ण गोखले","ए. ओ. ह्यूम","डब्ल्यू. सी. बनर्जी","दादाभाई नौरोजी"],2,"1885 में कांग्रेस के प्रथम अध्यक्ष डब्ल्यू. सी. बनर्जी थे।"],["भारतीय राष्ट्रीय कांग्रेस के प्रथम अध्यक्ष कौन थे?",["डब्ल्यू. सी. बनर्जी","गोपाल कृष्ण गोखले","दादाभाई नौरोजी","ए. ओ. ह्यूम"],0,"1885 में कांग्रेस के प्रथम अध्यक्ष डब्ल्यू. सी. बनर्जी थे।"],["भारतीय राष्ट्रीय कांग्रेस के प्रथम अध्यक्ष कौन थे?",["दादाभाई नौरोजी","ए. ओ. ह्यूम","गोपाल कृष्ण गोखले","डब्ल्यू. सी. बनर्जी"],3,"1885 में कांग्रेस के प्रथम अध्यक्ष डब्ल्यू. सी. बनर्जी थे।"],["भारतीय राष्ट्रीय कांग्रेस के प्रथम अध्यक्ष कौन थे?",["गोपाल कृष्ण गोखले","ए. ओ. ह्यूम","दादाभाई नौरोजी","डब्ल्यू. सी. बनर्जी"],3,"1885 में कांग्रेस के प्रथम अध्यक्ष डब्ल्यू. सी. बनर्जी थे।"],["भारतीय राष्ट्रीय कांग्रेस के प्रथम अध्यक्ष कौन थे?",["दादाभाई नौरोजी","ए. ओ. ह्यूम","गोपाल कृष्ण गोखले","डब्ल्यू. सी. बनर्जी"],3,"1885 में कांग्रेस के प्रथम अध्यक्ष डब्ल्यू. सी. बनर्जी थे।"],["भारतीय राष्ट्रीय कांग्रेस के प्रथम अध्यक्ष कौन थे?",["डब्ल्यू. सी. बनर्जी","गोपाल कृष्ण गोखले","दादाभाई नौरोजी","ए. ओ. ह्यूम"],0,"1885 में कांग्रेस के प्रथम अध्यक्ष डब्ल्यू. सी. बनर्जी थे।"],["भारतीय राष्ट्रीय कांग्रेस के प्रथम अध्यक्ष कौन थे?",["डब्ल्यू. सी. बनर्जी","गोपाल कृष्ण गोखले","दादाभाई नौरोजी","ए. ओ. ह्यूम"],0,"1885 में कांग्रेस के प्रथम अध्यक्ष डब्ल्यू. सी. बनर्जी थे।"],["भारतीय राष्ट्रीय कांग्रेस के प्रथम अध्यक्ष कौन थे?",["ए. ओ. ह्यूम","दादाभाई नौरोजी","डब्ल्यू. सी. बनर्जी","गोपाल कृष्ण गोखले"],2,"1885 में कांग्रेस के प्रथम अध्यक्ष डब्ल्यू. सी. बनर्जी थे।"],["भारतीय राष्ट्रीय कांग्रेस के प्रथम अध्यक्ष कौन थे?",["गोपाल कृष्ण गोखले","ए. ओ. ह्यूम","डब्ल्यू. सी. बनर्जी","दादाभाई नौरोजी"],2,"1885 में कांग्रेस के प्रथम अध्यक्ष डब्ल्यू. सी. बनर्जी थे।"],["भारतीय राष्ट्रीय कांग्रेस के प्रथम अध्यक्ष कौन थे?",["गोपाल कृष्ण गोखले","डब्ल्यू. सी. बनर्जी","ए. ओ. ह्यूम","दादाभाई नौरोजी"],1,"1885 में कांग्रेस के प्रथम अध्यक्ष डब्ल्यू. सी. बनर्जी थे।"],["भारतीय राष्ट्रीय कांग्रेस के प्रथम अध्यक्ष कौन थे?",["डब्ल्यू. सी. बनर्जी","दादाभाई नौरोजी","ए. ओ. ह्यूम","गोपाल कृष्ण गोखले"],0,"1885 में कांग्रेस के प्रथम अध्यक्ष डब्ल्यू. सी. बनर्जी थे।"],["भारतीय राष्ट्रीय कांग्रेस के प्रथम अध्यक्ष कौन थे?",["गोपाल कृष्ण गोखले","ए. ओ. ह्यूम","डब्ल्यू. सी. बनर्जी","दादाभाई नौरोजी"],2,"1885 में कांग्रेस के प्रथम अध्यक्ष डब्ल्यू. सी. बनर्जी थे।"],["भारतीय राष्ट्रीय कांग्रेस के प्रथम अध्यक्ष कौन थे?",["ए. ओ. ह्यूम","डब्ल्यू. सी. बनर्जी","दादाभाई नौरोजी","गोपाल कृष्ण गोखले"],1,"1885 में कांग्रेस के प्रथम अध्यक्ष डब्ल्यू. सी. बनर्जी थे।"],["भारतीय राष्ट्रीय कांग्रेस के प्रथम अध्यक्ष कौन थे?",["डब्ल्यू. सी. बनर्जी","गोपाल कृष्ण गोखले","दादाभाई नौरोजी","ए. ओ. ह्यूम"],0,"1885 में कांग्रेस के प्रथम अध्यक्ष डब्ल्यू. सी. बनर्जी थे।"],["भारतीय राष्ट्रीय कांग्रेस के प्रथम अध्यक्ष कौन थे?",["गोपाल कृष्ण गोखले","डब्ल्यू. सी. बनर्जी","ए. ओ. ह्यूम","दादाभाई नौरोजी"],1,"1885 में कांग्रेस के प्रथम अध्यक्ष डब्ल्यू. सी. बनर्जी थे।"],["भारतीय राष्ट्रीय कांग्रेस के प्रथम अध्यक्ष कौन थे?",["ए. ओ. ह्यूम","दादाभाई नौरोजी","गोपाल कृष्ण गोखले","डब्ल्यू. सी. बनर्जी"],3,"1885 में कांग्रेस के प्रथम अध्यक्ष डब्ल्यू. सी. बनर्जी थे।"]],"Geography":[["सांभर झील किस राज्य में है?",["हरियाणा","राजस्थान","मध्य प्रदेश","गुजरात"],1,"सांभर झील राजस्थान में स्थित है।"],["लोकटक झील किस राज्य में है?",["मिजोरम","त्रिपुरा","मेघालय","मणिपुर"],3,"लोकटक झील मणिपुर में स्थित है।"],["भारत का सबसे ऊँचा पर्वत शिखर जो पूरी तरह भारत में स्थित है, कौन सा है?",["कामेत","नंदा देवी","कंचनजंघा","अनामुडी"],1,"नंदा देवी भारत में स्थित सबसे ऊँची पर्वत चोटियों में प्रमुख है।"],["भारत का सबसे ऊँचा पर्वत शिखर जो पूरी तरह भारत में स्थित है, कौन सा है?",["अनामुडी","कामेत","कंचनजंघा","नंदा देवी"],3,"नंदा देवी भारत में स्थित सबसे ऊँची पर्वत चोटियों में प्रमुख है।"],["भारत का सबसे ऊँचा पर्वत शिखर जो पूरी तरह भारत में स्थित है, कौन सा है?",["कामेत","कंचनजंघा","नंदा देवी","अनामुडी"],2,"नंदा देवी भारत में स्थित सबसे ऊँची पर्वत चोटियों में प्रमुख है।"],["भारत का सबसे ऊँचा पर्वत शिखर जो पूरी तरह भारत में स्थित है, कौन सा है?",["कंचनजंघा","अनामुडी","कामेत","नंदा देवी"],3,"नंदा देवी भारत में स्थित सबसे ऊँची पर्वत चोटियों में प्रमुख है।"],["भारत का सबसे ऊँचा पर्वत शिखर जो पूरी तरह भारत में स्थित है, कौन सा है?",["कामेत","अनामुडी","नंदा देवी","कंचनजंघा"],2,"नंदा देवी भारत में स्थित सबसे ऊँची पर्वत चोटियों में प्रमुख है।"],["भारत का सबसे ऊँचा पर्वत शिखर जो पूरी तरह भारत में स्थित है, कौन सा है?",["कंचनजंघा","अनामुडी","नंदा देवी","कामेत"],2,"नंदा देवी भारत में स्थित सबसे ऊँची पर्वत चोटियों में प्रमुख है।"],["भारत का सबसे ऊँचा पर्वत शिखर जो पूरी तरह भारत में स्थित है, कौन सा है?",["नंदा देवी","कामेत","कंचनजंघा","अनामुडी"],0,"नंदा देवी भारत में स्थित सबसे ऊँची पर्वत चोटियों में प्रमुख है।"],["भारत का सबसे ऊँचा पर्वत शिखर जो पूरी तरह भारत में स्थित है, कौन सा है?",["कामेत","अनामुडी","कंचनजंघा","नंदा देवी"],3,"नंदा देवी भारत में स्थित सबसे ऊँची पर्वत चोटियों में प्रमुख है।"],["भारत का सबसे ऊँचा पर्वत शिखर जो पूरी तरह भारत में स्थित है, कौन सा है?",["कामेत","अनामुडी","नंदा देवी","कंचनजंघा"],2,"नंदा देवी भारत में स्थित सबसे ऊँची पर्वत चोटियों में प्रमुख है।"],["भारत का सबसे ऊँचा पर्वत शिखर जो पूरी तरह भारत में स्थित है, कौन सा है?",["कंचनजंघा","कामेत","अनामुडी","नंदा देवी"],3,"नंदा देवी भारत में स्थित सबसे ऊँची पर्वत चोटियों में प्रमुख है।"],["भारत का सबसे ऊँचा पर्वत शिखर जो पूरी तरह भारत में स्थित है, कौन सा है?",["कंचनजंघा","अनामुडी","नंदा देवी","कामेत"],2,"नंदा देवी भारत में स्थित सबसे ऊँची पर्वत चोटियों में प्रमुख है।"],["भारत का सबसे ऊँचा पर्वत शिखर जो पूरी तरह भारत में स्थित है, कौन सा है?",["कामेत","नंदा देवी","कंचनजंघा","अनामुडी"],1,"नंदा देवी भारत में स्थित सबसे ऊँची पर्वत चोटियों में प्रमुख है।"],["भारत का सबसे ऊँचा पर्वत शिखर जो पूरी तरह भारत में स्थित है, कौन सा है?",["कामेत","नंदा देवी","कंचनजंघा","अनामुडी"],1,"नंदा देवी भारत में स्थित सबसे ऊँची पर्वत चोटियों में प्रमुख है।"],["भारत का सबसे ऊँचा पर्वत शिखर जो पूरी तरह भारत में स्थित है, कौन सा है?",["कंचनजंघा","कामेत","नंदा देवी","अनामुडी"],2,"नंदा देवी भारत में स्थित सबसे ऊँची पर्वत चोटियों में प्रमुख है।"],["भारत का सबसे ऊँचा पर्वत शिखर जो पूरी तरह भारत में स्थित है, कौन सा है?",["नंदा देवी","कंचनजंघा","अनामुडी","कामेत"],0,"नंदा देवी भारत में स्थित सबसे ऊँची पर्वत चोटियों में प्रमुख है।"],["भारत का सबसे ऊँचा पर्वत शिखर जो पूरी तरह भारत में स्थित है, कौन सा है?",["नंदा देवी","कामेत","अनामुडी","कंचनजंघा"],0,"नंदा देवी भारत में स्थित सबसे ऊँची पर्वत चोटियों में प्रमुख है।"],["भारत का सबसे ऊँचा पर्वत शिखर जो पूरी तरह भारत में स्थित है, कौन सा है?",["अनामुडी","कामेत","नंदा देवी","कंचनजंघा"],2,"नंदा देवी भारत में स्थित सबसे ऊँची पर्वत चोटियों में प्रमुख है।"],["भारत का सबसे ऊँचा पर्वत शिखर जो पूरी तरह भारत में स्थित है, कौन सा है?",["कंचनजंघा","अनामुडी","कामेत","नंदा देवी"],3,"नंदा देवी भारत में स्थित सबसे ऊँची पर्वत चोटियों में प्रमुख है।"]],"Polity":[["भारत का संविधान किस दिन अपनाया गया था?",["26 नवंबर 1949","2 अक्टूबर 1950","15 अगस्त 1947","26 जनवरी 1950"],0,"संविधान सभा ने 26 नवंबर 1949 को संविधान अपनाया।"],["मौलिक कर्तव्य किस अनुच्छेद में हैं?",["अनुच्छेद 368","अनुच्छेद 51A","अनुच्छेद 21","अनुच्छेद 32"],1,"मौलिक कर्तव्य अनुच्छेद 51A में हैं।"],["भारतीय संविधान की प्रस्तावना में भारत को किस रूप में वर्णित किया गया है?",["संघीय राजतंत्र","सैन्य गणराज्य","सम्प्रभु समाजवादी पंथनिरपेक्ष लोकतांत्रिक गणराज्य","एकात्मक राजतंत्र"],2,"प्रस्तावना भारत को सम्प्रभु, समाजवादी, पंथनिरपेक्ष, लोकतांत्रिक गणराज्य बताती है।"],["भारतीय संविधान की प्रस्तावना में भारत को किस रूप में वर्णित किया गया है?",["संघीय राजतंत्र","एकात्मक राजतंत्र","सम्प्रभु समाजवादी पंथनिरपेक्ष लोकतांत्रिक गणराज्य","सैन्य गणराज्य"],2,"प्रस्तावना भारत को सम्प्रभु, समाजवादी, पंथनिरपेक्ष, लोकतांत्रिक गणराज्य बताती है।"],["भारतीय संविधान की प्रस्तावना में भारत को किस रूप में वर्णित किया गया है?",["संघीय राजतंत्र","सम्प्रभु समाजवादी पंथनिरपेक्ष लोकतांत्रिक गणराज्य","सैन्य गणराज्य","एकात्मक राजतंत्र"],1,"प्रस्तावना भारत को सम्प्रभु, समाजवादी, पंथनिरपेक्ष, लोकतांत्रिक गणराज्य बताती है।"],["भारतीय संविधान की प्रस्तावना में भारत को किस रूप में वर्णित किया गया है?",["सैन्य गणराज्य","सम्प्रभु समाजवादी पंथनिरपेक्ष लोकतांत्रिक गणराज्य","एकात्मक राजतंत्र","संघीय राजतंत्र"],1,"प्रस्तावना भारत को सम्प्रभु, समाजवादी, पंथनिरपेक्ष, लोकतांत्रिक गणराज्य बताती है।"],["भारतीय संविधान की प्रस्तावना में भारत को किस रूप में वर्णित किया गया है?",["सम्प्रभु समाजवादी पंथनिरपेक्ष लोकतांत्रिक गणराज्य","एकात्मक राजतंत्र","सैन्य गणराज्य","संघीय राजतंत्र"],0,"प्रस्तावना भारत को सम्प्रभु, समाजवादी, पंथनिरपेक्ष, लोकतांत्रिक गणराज्य बताती है।"],["भारतीय संविधान की प्रस्तावना में भारत को किस रूप में वर्णित किया गया है?",["एकात्मक राजतंत्र","सम्प्रभु समाजवादी पंथनिरपेक्ष लोकतांत्रिक गणराज्य","सैन्य गणराज्य","संघीय राजतंत्र"],1,"प्रस्तावना भारत को सम्प्रभु, समाजवादी, पंथनिरपेक्ष, लोकतांत्रिक गणराज्य बताती है।"],["भारतीय संविधान की प्रस्तावना में भारत को किस रूप में वर्णित किया गया है?",["संघीय राजतंत्र","सम्प्रभु समाजवादी पंथनिरपेक्ष लोकतांत्रिक गणराज्य","सैन्य गणराज्य","एकात्मक राजतंत्र"],1,"प्रस्तावना भारत को सम्प्रभु, समाजवादी, पंथनिरपेक्ष, लोकतांत्रिक गणराज्य बताती है।"],["भारतीय संविधान की प्रस्तावना में भारत को किस रूप में वर्णित किया गया है?",["संघीय राजतंत्र","सम्प्रभु समाजवादी पंथनिरपेक्ष लोकतांत्रिक गणराज्य","एकात्मक राजतंत्र","सैन्य गणराज्य"],1,"प्रस्तावना भारत को सम्प्रभु, समाजवादी, पंथनिरपेक्ष, लोकतांत्रिक गणराज्य बताती है।"],["भारतीय संविधान की प्रस्तावना में भारत को किस रूप में वर्णित किया गया है?",["संघीय राजतंत्र","सम्प्रभु समाजवादी पंथनिरपेक्ष लोकतांत्रिक गणराज्य","एकात्मक राजतंत्र","सैन्य गणराज्य"],1,"प्रस्तावना भारत को सम्प्रभु, समाजवादी, पंथनिरपेक्ष, लोकतांत्रिक गणराज्य बताती है।"],["भारतीय संविधान की प्रस्तावना में भारत को किस रूप में वर्णित किया गया है?",["एकात्मक राजतंत्र","सम्प्रभु समाजवादी पंथनिरपेक्ष लोकतांत्रिक गणराज्य","संघीय राजतंत्र","सैन्य गणराज्य"],1,"प्रस्तावना भारत को सम्प्रभु, समाजवादी, पंथनिरपेक्ष, लोकतांत्रिक गणराज्य बताती है।"],["भारतीय संविधान की प्रस्तावना में भारत को किस रूप में वर्णित किया गया है?",["संघीय राजतंत्र","एकात्मक राजतंत्र","सैन्य गणराज्य","सम्प्रभु समाजवादी पंथनिरपेक्ष लोकतांत्रिक गणराज्य"],3,"प्रस्तावना भारत को सम्प्रभु, समाजवादी, पंथनिरपेक्ष, लोकतांत्रिक गणराज्य बताती है।"],["भारतीय संविधान की प्रस्तावना में भारत को किस रूप में वर्णित किया गया है?",["सैन्य गणराज्य","सम्प्रभु समाजवादी पंथनिरपेक्ष लोकतांत्रिक गणराज्य","संघीय राजतंत्र","एकात्मक राजतंत्र"],1,"प्रस्तावना भारत को सम्प्रभु, समाजवादी, पंथनिरपेक्ष, लोकतांत्रिक गणराज्य बताती है।"],["भारतीय संविधान की प्रस्तावना में भारत को किस रूप में वर्णित किया गया है?",["सैन्य गणराज्य","संघीय राजतंत्र","सम्प्रभु समाजवादी पंथनिरपेक्ष लोकतांत्रिक गणराज्य","एकात्मक राजतंत्र"],2,"प्रस्तावना भारत को सम्प्रभु, समाजवादी, पंथनिरपेक्ष, लोकतांत्रिक गणराज्य बताती है।"],["भारतीय संविधान की प्रस्तावना में भारत को किस रूप में वर्णित किया गया है?",["सम्प्रभु समाजवादी पंथनिरपेक्ष लोकतांत्रिक गणराज्य","एकात्मक राजतंत्र","संघीय राजतंत्र","सैन्य गणराज्य"],0,"प्रस्तावना भारत को सम्प्रभु, समाजवादी, पंथनिरपेक्ष, लोकतांत्रिक गणराज्य बताती है।"],["भारतीय संविधान की प्रस्तावना में भारत को किस रूप में वर्णित किया गया है?",["सम्प्रभु समाजवादी पंथनिरपेक्ष लोकतांत्रिक गणराज्य","सैन्य गणराज्य","संघीय राजतंत्र","एकात्मक राजतंत्र"],0,"प्रस्तावना भारत को सम्प्रभु, समाजवादी, पंथनिरपेक्ष, लोकतांत्रिक गणराज्य बताती है।"],["भारतीय संविधान की प्रस्तावना में भारत को किस रूप में वर्णित किया गया है?",["एकात्मक राजतंत्र","सैन्य गणराज्य","संघीय राजतंत्र","सम्प्रभु समाजवादी पंथनिरपेक्ष लोकतांत्रिक गणराज्य"],3,"प्रस्तावना भारत को सम्प्रभु, समाजवादी, पंथनिरपेक्ष, लोकतांत्रिक गणराज्य बताती है।"],["भारतीय संविधान की प्रस्तावना में भारत को किस रूप में वर्णित किया गया है?",["संघीय राजतंत्र","एकात्मक राजतंत्र","सैन्य गणराज्य","सम्प्रभु समाजवादी पंथनिरपेक्ष लोकतांत्रिक गणराज्य"],3,"प्रस्तावना भारत को सम्प्रभु, समाजवादी, पंथनिरपेक्ष, लोकतांत्रिक गणराज्य बताती है।"],["भारतीय संविधान की प्रस्तावना में भारत को किस रूप में वर्णित किया गया है?",["संघीय राजतंत्र","सैन्य गणराज्य","एकात्मक राजतंत्र","सम्प्रभु समाजवादी पंथनिरपेक्ष लोकतांत्रिक गणराज्य"],3,"प्रस्तावना भारत को सम्प्रभु, समाजवादी, पंथनिरपेक्ष, लोकतांत्रिक गणराज्य बताती है।"]],"Science":[["शक्ति की SI इकाई क्या है?",["न्यूटन","वोल्ट","वाट","जूल"],2,"शक्ति की SI इकाई वाट है।"],["बल की SI इकाई क्या है?",["पास्कल","न्यूटन","वाट","जूल"],1,"बल की SI इकाई न्यूटन है।"],["मानव शरीर में रक्त का शुद्धीकरण मुख्यतः किस अंग द्वारा होता है?",["अग्न्याशय","हृदय","त्वचा","गुर्दे"],3,"गुर्दे रक्त से अपशिष्ट पदार्थों को छानने में मुख्य भूमिका निभाते हैं।"],["मानव शरीर में रक्त का शुद्धीकरण मुख्यतः किस अंग द्वारा होता है?",["अग्न्याशय","त्वचा","हृदय","गुर्दे"],3,"गुर्दे रक्त से अपशिष्ट पदार्थों को छानने में मुख्य भूमिका निभाते हैं।"],["मानव शरीर में रक्त का शुद्धीकरण मुख्यतः किस अंग द्वारा होता है?",["अग्न्याशय","हृदय","त्वचा","गुर्दे"],3,"गुर्दे रक्त से अपशिष्ट पदार्थों को छानने में मुख्य भूमिका निभाते हैं।"],["मानव शरीर में रक्त का शुद्धीकरण मुख्यतः किस अंग द्वारा होता है?",["गुर्दे","अग्न्याशय","हृदय","त्वचा"],0,"गुर्दे रक्त से अपशिष्ट पदार्थों को छानने में मुख्य भूमिका निभाते हैं।"],["मानव शरीर में रक्त का शुद्धीकरण मुख्यतः किस अंग द्वारा होता है?",["त्वचा","गुर्दे","हृदय","अग्न्याशय"],1,"गुर्दे रक्त से अपशिष्ट पदार्थों को छानने में मुख्य भूमिका निभाते हैं।"],["मानव शरीर में रक्त का शुद्धीकरण मुख्यतः किस अंग द्वारा होता है?",["गुर्दे","अग्न्याशय","हृदय","त्वचा"],0,"गुर्दे रक्त से अपशिष्ट पदार्थों को छानने में मुख्य भूमिका निभाते हैं।"],["मानव शरीर में रक्त का शुद्धीकरण मुख्यतः किस अंग द्वारा होता है?",["अग्न्याशय","गुर्दे","त्वचा","हृदय"],1,"गुर्दे रक्त से अपशिष्ट पदार्थों को छानने में मुख्य भूमिका निभाते हैं।"],["मानव शरीर में रक्त का शुद्धीकरण मुख्यतः किस अंग द्वारा होता है?",["गुर्दे","त्वचा","अग्न्याशय","हृदय"],0,"गुर्दे रक्त से अपशिष्ट पदार्थों को छानने में मुख्य भूमिका निभाते हैं।"],["मानव शरीर में रक्त का शुद्धीकरण मुख्यतः किस अंग द्वारा होता है?",["अग्न्याशय","त्वचा","गुर्दे","हृदय"],2,"गुर्दे रक्त से अपशिष्ट पदार्थों को छानने में मुख्य भूमिका निभाते हैं।"],["मानव शरीर में रक्त का शुद्धीकरण मुख्यतः किस अंग द्वारा होता है?",["हृदय","अग्न्याशय","गुर्दे","त्वचा"],2,"गुर्दे रक्त से अपशिष्ट पदार्थों को छानने में मुख्य भूमिका निभाते हैं।"],["मानव शरीर में रक्त का शुद्धीकरण मुख्यतः किस अंग द्वारा होता है?",["अग्न्याशय","हृदय","त्वचा","गुर्दे"],3,"गुर्दे रक्त से अपशिष्ट पदार्थों को छानने में मुख्य भूमिका निभाते हैं।"],["मानव शरीर में रक्त का शुद्धीकरण मुख्यतः किस अंग द्वारा होता है?",["हृदय","गुर्दे","त्वचा","अग्न्याशय"],1,"गुर्दे रक्त से अपशिष्ट पदार्थों को छानने में मुख्य भूमिका निभाते हैं।"],["मानव शरीर में रक्त का शुद्धीकरण मुख्यतः किस अंग द्वारा होता है?",["गुर्दे","हृदय","अग्न्याशय","त्वचा"],0,"गुर्दे रक्त से अपशिष्ट पदार्थों को छानने में मुख्य भूमिका निभाते हैं।"],["मानव शरीर में रक्त का शुद्धीकरण मुख्यतः किस अंग द्वारा होता है?",["अग्न्याशय","गुर्दे","हृदय","त्वचा"],1,"गुर्दे रक्त से अपशिष्ट पदार्थों को छानने में मुख्य भूमिका निभाते हैं।"],["मानव शरीर में रक्त का शुद्धीकरण मुख्यतः किस अंग द्वारा होता है?",["गुर्दे","त्वचा","अग्न्याशय","हृदय"],0,"गुर्दे रक्त से अपशिष्ट पदार्थों को छानने में मुख्य भूमिका निभाते हैं।"],["मानव शरीर में रक्त का शुद्धीकरण मुख्यतः किस अंग द्वारा होता है?",["अग्न्याशय","गुर्दे","हृदय","त्वचा"],1,"गुर्दे रक्त से अपशिष्ट पदार्थों को छानने में मुख्य भूमिका निभाते हैं।"],["मानव शरीर में रक्त का शुद्धीकरण मुख्यतः किस अंग द्वारा होता है?",["अग्न्याशय","गुर्दे","हृदय","त्वचा"],1,"गुर्दे रक्त से अपशिष्ट पदार्थों को छानने में मुख्य भूमिका निभाते हैं।"],["मानव शरीर में रक्त का शुद्धीकरण मुख्यतः किस अंग द्वारा होता है?",["हृदय","गुर्दे","त्वचा","अग्न्याशय"],1,"गुर्दे रक्त से अपशिष्ट पदार्थों को छानने में मुख्य भूमिका निभाते हैं।"]],"Maths":[["250 का 12% कितना है?",["40","30","25","35"],1,"250 × 12/100 = 30."],["25 का 20% कितना है?",["4","5","20","10"],1,"25 × 20/100 = 5."],["एक वस्तु का अंकित मूल्य 800 रुपये है और 10% छूट है। विक्रय मूल्य क्या होगा?",["760","700","740","720"],3,"800 का 10% = 80, इसलिए विक्रय मूल्य 720 रुपये है।"],["एक वस्तु का अंकित मूल्य 800 रुपये है और 10% छूट है। विक्रय मूल्य क्या होगा?",["760","740","700","720"],3,"800 का 10% = 80, इसलिए विक्रय मूल्य 720 रुपये है।"],["एक वस्तु का अंकित मूल्य 800 रुपये है और 10% छूट है। विक्रय मूल्य क्या होगा?",["720","760","700","740"],0,"800 का 10% = 80, इसलिए विक्रय मूल्य 720 रुपये है।"],["एक वस्तु का अंकित मूल्य 800 रुपये है और 10% छूट है। विक्रय मूल्य क्या होगा?",["700","740","760","720"],3,"800 का 10% = 80, इसलिए विक्रय मूल्य 720 रुपये है।"],["एक वस्तु का अंकित मूल्य 800 रुपये है और 10% छूट है। विक्रय मूल्य क्या होगा?",["740","720","700","760"],1,"800 का 10% = 80, इसलिए विक्रय मूल्य 720 रुपये है।"],["एक वस्तु का अंकित मूल्य 800 रुपये है और 10% छूट है। विक्रय मूल्य क्या होगा?",["740","720","760","700"],1,"800 का 10% = 80, इसलिए विक्रय मूल्य 720 रुपये है।"],["एक वस्तु का अंकित मूल्य 800 रुपये है और 10% छूट है। विक्रय मूल्य क्या होगा?",["700","720","760","740"],1,"800 का 10% = 80, इसलिए विक्रय मूल्य 720 रुपये है।"],["एक वस्तु का अंकित मूल्य 800 रुपये है और 10% छूट है। विक्रय मूल्य क्या होगा?",["760","700","740","720"],3,"800 का 10% = 80, इसलिए विक्रय मूल्य 720 रुपये है।"],["एक वस्तु का अंकित मूल्य 800 रुपये है और 10% छूट है। विक्रय मूल्य क्या होगा?",["720","760","740","700"],0,"800 का 10% = 80, इसलिए विक्रय मूल्य 720 रुपये है।"],["एक वस्तु का अंकित मूल्य 800 रुपये है और 10% छूट है। विक्रय मूल्य क्या होगा?",["720","700","740","760"],0,"800 का 10% = 80, इसलिए विक्रय मूल्य 720 रुपये है।"],["एक वस्तु का अंकित मूल्य 800 रुपये है और 10% छूट है। विक्रय मूल्य क्या होगा?",["720","700","760","740"],0,"800 का 10% = 80, इसलिए विक्रय मूल्य 720 रुपये है।"],["एक वस्तु का अंकित मूल्य 800 रुपये है और 10% छूट है। विक्रय मूल्य क्या होगा?",["740","700","760","720"],3,"800 का 10% = 80, इसलिए विक्रय मूल्य 720 रुपये है।"],["एक वस्तु का अंकित मूल्य 800 रुपये है और 10% छूट है। विक्रय मूल्य क्या होगा?",["760","720","740","700"],1,"800 का 10% = 80, इसलिए विक्रय मूल्य 720 रुपये है।"],["एक वस्तु का अंकित मूल्य 800 रुपये है और 10% छूट है। विक्रय मूल्य क्या होगा?",["740","720","760","700"],1,"800 का 10% = 80, इसलिए विक्रय मूल्य 720 रुपये है।"],["एक वस्तु का अंकित मूल्य 800 रुपये है और 10% छूट है। विक्रय मूल्य क्या होगा?",["700","740","720","760"],2,"800 का 10% = 80, इसलिए विक्रय मूल्य 720 रुपये है।"],["एक वस्तु का अंकित मूल्य 800 रुपये है और 10% छूट है। विक्रय मूल्य क्या होगा?",["700","720","760","740"],1,"800 का 10% = 80, इसलिए विक्रय मूल्य 720 रुपये है।"],["एक वस्तु का अंकित मूल्य 800 रुपये है और 10% छूट है। विक्रय मूल्य क्या होगा?",["740","760","720","700"],2,"800 का 10% = 80, इसलिए विक्रय मूल्य 720 रुपये है।"],["एक वस्तु का अंकित मूल्य 800 रुपये है और 10% छूट है। विक्रय मूल्य क्या होगा?",["740","720","760","700"],1,"800 का 10% = 80, इसलिए विक्रय मूल्य 720 रुपये है।"]],"Reasoning":[["श्रृंखला: 2, 4, 8, 16, ?",["32","24","20","36"],0,"हर संख्या को 2 से गुणा किया गया है।"],["श्रृंखला: 1, 4, 9, 16, ?",["25","36","49","20"],0,"ये क्रमशः 1², 2², 3², 4² हैं; अगला 5² = 25."],["एक व्यक्ति उत्तर की ओर 10 m चलता है, फिर दाएँ मुड़कर 5 m चलता है। वह प्रारंभिक स्थान से किस दिशा में है?",["उत्तर-पश्चिम","दक्षिण-पश्चिम","उत्तर-पूर्व","दक्षिण-पूर्व"],2,"उत्तर के बाद दाएँ मुड़ने पर पूर्व दिशा आती है; स्थिति उत्तर-पूर्व है।"],["एक व्यक्ति उत्तर की ओर 10 m चलता है, फिर दाएँ मुड़कर 5 m चलता है। वह प्रारंभिक स्थान से किस दिशा में है?",["दक्षिण-पश्चिम","उत्तर-पश्चिम","उत्तर-पूर्व","दक्षिण-पूर्व"],2,"उत्तर के बाद दाएँ मुड़ने पर पूर्व दिशा आती है; स्थिति उत्तर-पूर्व है।"],["एक व्यक्ति उत्तर की ओर 10 m चलता है, फिर दाएँ मुड़कर 5 m चलता है। वह प्रारंभिक स्थान से किस दिशा में है?",["दक्षिण-पश्चिम","दक्षिण-पूर्व","उत्तर-पश्चिम","उत्तर-पूर्व"],3,"उत्तर के बाद दाएँ मुड़ने पर पूर्व दिशा आती है; स्थिति उत्तर-पूर्व है।"],["एक व्यक्ति उत्तर की ओर 10 m चलता है, फिर दाएँ मुड़कर 5 m चलता है। वह प्रारंभिक स्थान से किस दिशा में है?",["दक्षिण-पश्चिम","उत्तर-पूर्व","उत्तर-पश्चिम","दक्षिण-पूर्व"],1,"उत्तर के बाद दाएँ मुड़ने पर पूर्व दिशा आती है; स्थिति उत्तर-पूर्व है।"],["एक व्यक्ति उत्तर की ओर 10 m चलता है, फिर दाएँ मुड़कर 5 m चलता है। वह प्रारंभिक स्थान से किस दिशा में है?",["उत्तर-पश्चिम","दक्षिण-पूर्व","उत्तर-पूर्व","दक्षिण-पश्चिम"],2,"उत्तर के बाद दाएँ मुड़ने पर पूर्व दिशा आती है; स्थिति उत्तर-पूर्व है।"],["एक व्यक्ति उत्तर की ओर 10 m चलता है, फिर दाएँ मुड़कर 5 m चलता है। वह प्रारंभिक स्थान से किस दिशा में है?",["उत्तर-पश्चिम","दक्षिण-पूर्व","दक्षिण-पश्चिम","उत्तर-पूर्व"],3,"उत्तर के बाद दाएँ मुड़ने पर पूर्व दिशा आती है; स्थिति उत्तर-पूर्व है।"],["एक व्यक्ति उत्तर की ओर 10 m चलता है, फिर दाएँ मुड़कर 5 m चलता है। वह प्रारंभिक स्थान से किस दिशा में है?",["दक्षिण-पूर्व","दक्षिण-पश्चिम","उत्तर-पूर्व","उत्तर-पश्चिम"],2,"उत्तर के बाद दाएँ मुड़ने पर पूर्व दिशा आती है; स्थिति उत्तर-पूर्व है।"],["एक व्यक्ति उत्तर की ओर 10 m चलता है, फिर दाएँ मुड़कर 5 m चलता है। वह प्रारंभिक स्थान से किस दिशा में है?",["उत्तर-पूर्व","दक्षिण-पश्चिम","उत्तर-पश्चिम","दक्षिण-पूर्व"],0,"उत्तर के बाद दाएँ मुड़ने पर पूर्व दिशा आती है; स्थिति उत्तर-पूर्व है।"],["एक व्यक्ति उत्तर की ओर 10 m चलता है, फिर दाएँ मुड़कर 5 m चलता है। वह प्रारंभिक स्थान से किस दिशा में है?",["दक्षिण-पूर्व","उत्तर-पश्चिम","उत्तर-पूर्व","दक्षिण-पश्चिम"],2,"उत्तर के बाद दाएँ मुड़ने पर पूर्व दिशा आती है; स्थिति उत्तर-पूर्व है।"],["एक व्यक्ति उत्तर की ओर 10 m चलता है, फिर दाएँ मुड़कर 5 m चलता है। वह प्रारंभिक स्थान से किस दिशा में है?",["दक्षिण-पूर्व","उत्तर-पश्चिम","दक्षिण-पश्चिम","उत्तर-पूर्व"],3,"उत्तर के बाद दाएँ मुड़ने पर पूर्व दिशा आती है; स्थिति उत्तर-पूर्व है।"],["एक व्यक्ति उत्तर की ओर 10 m चलता है, फिर दाएँ मुड़कर 5 m चलता है। वह प्रारंभिक स्थान से किस दिशा में है?",["दक्षिण-पश्चिम","दक्षिण-पूर्व","उत्तर-पश्चिम","उत्तर-पूर्व"],3,"उत्तर के बाद दाएँ मुड़ने पर पूर्व दिशा आती है; स्थिति उत्तर-पूर्व है।"],["एक व्यक्ति उत्तर की ओर 10 m चलता है, फिर दाएँ मुड़कर 5 m चलता है। वह प्रारंभिक स्थान से किस दिशा में है?",["उत्तर-पूर्व","दक्षिण-पश्चिम","दक्षिण-पूर्व","उत्तर-पश्चिम"],0,"उत्तर के बाद दाएँ मुड़ने पर पूर्व दिशा आती है; स्थिति उत्तर-पूर्व है।"],["एक व्यक्ति उत्तर की ओर 10 m चलता है, फिर दाएँ मुड़कर 5 m चलता है। वह प्रारंभिक स्थान से किस दिशा में है?",["दक्षिण-पश्चिम","उत्तर-पश्चिम","दक्षिण-पूर्व","उत्तर-पूर्व"],3,"उत्तर के बाद दाएँ मुड़ने पर पूर्व दिशा आती है; स्थिति उत्तर-पूर्व है।"],["एक व्यक्ति उत्तर की ओर 10 m चलता है, फिर दाएँ मुड़कर 5 m चलता है। वह प्रारंभिक स्थान से किस दिशा में है?",["दक्षिण-पूर्व","उत्तर-पूर्व","उत्तर-पश्चिम","दक्षिण-पश्चिम"],1,"उत्तर के बाद दाएँ मुड़ने पर पूर्व दिशा आती है; स्थिति उत्तर-पूर्व है।"],["एक व्यक्ति उत्तर की ओर 10 m चलता है, फिर दाएँ मुड़कर 5 m चलता है। वह प्रारंभिक स्थान से किस दिशा में है?",["उत्तर-पूर्व","दक्षिण-पूर्व","दक्षिण-पश्चिम","उत्तर-पश्चिम"],0,"उत्तर के बाद दाएँ मुड़ने पर पूर्व दिशा आती है; स्थिति उत्तर-पूर्व है।"],["एक व्यक्ति उत्तर की ओर 10 m चलता है, फिर दाएँ मुड़कर 5 m चलता है। वह प्रारंभिक स्थान से किस दिशा में है?",["उत्तर-पश्चिम","दक्षिण-पश्चिम","उत्तर-पूर्व","दक्षिण-पूर्व"],2,"उत्तर के बाद दाएँ मुड़ने पर पूर्व दिशा आती है; स्थिति उत्तर-पूर्व है।"],["एक व्यक्ति उत्तर की ओर 10 m चलता है, फिर दाएँ मुड़कर 5 m चलता है। वह प्रारंभिक स्थान से किस दिशा में है?",["दक्षिण-पूर्व","दक्षिण-पश्चिम","उत्तर-पूर्व","उत्तर-पश्चिम"],2,"उत्तर के बाद दाएँ मुड़ने पर पूर्व दिशा आती है; स्थिति उत्तर-पूर्व है।"],["एक व्यक्ति उत्तर की ओर 10 m चलता है, फिर दाएँ मुड़कर 5 m चलता है। वह प्रारंभिक स्थान से किस दिशा में है?",["दक्षिण-पूर्व","उत्तर-पश्चिम","उत्तर-पूर्व","दक्षिण-पश्चिम"],2,"उत्तर के बाद दाएँ मुड़ने पर पूर्व दिशा आती है; स्थिति उत्तर-पूर्व है।"]],"Hindi":[["‘दिन’ का विलोम क्या है?",["प्रभात","संध्या","रात","दोपहर"],2,"दिन का विलोम रात है।"],["‘लाभ’ का विलोम क्या है?",["वृद्धि","उन्नति","हानि","जीत"],2,"लाभ का विलोम हानि है।"],["‘जो मेहनत करता है, वह सफल होता है।’ यह कौन सा वाक्य है?",["संयुक्त","सरल","मिश्र","विस्मयादिबोधक"],2,"इसमें एक प्रधान और एक आश्रित उपवाक्य है, इसलिए मिश्र वाक्य है।"],["‘जो मेहनत करता है, वह सफल होता है।’ यह कौन सा वाक्य है?",["संयुक्त","सरल","मिश्र","विस्मयादिबोधक"],2,"इसमें एक प्रधान और एक आश्रित उपवाक्य है, इसलिए मिश्र वाक्य है।"],["‘जो मेहनत करता है, वह सफल होता है।’ यह कौन सा वाक्य है?",["मिश्र","संयुक्त","सरल","विस्मयादिबोधक"],0,"इसमें एक प्रधान और एक आश्रित उपवाक्य है, इसलिए मिश्र वाक्य है।"],["‘जो मेहनत करता है, वह सफल होता है।’ यह कौन सा वाक्य है?",["मिश्र","विस्मयादिबोधक","संयुक्त","सरल"],0,"इसमें एक प्रधान और एक आश्रित उपवाक्य है, इसलिए मिश्र वाक्य है।"],["‘जो मेहनत करता है, वह सफल होता है।’ यह कौन सा वाक्य है?",["संयुक्त","सरल","विस्मयादिबोधक","मिश्र"],3,"इसमें एक प्रधान और एक आश्रित उपवाक्य है, इसलिए मिश्र वाक्य है।"],["‘जो मेहनत करता है, वह सफल होता है।’ यह कौन सा वाक्य है?",["सरल","विस्मयादिबोधक","मिश्र","संयुक्त"],2,"इसमें एक प्रधान और एक आश्रित उपवाक्य है, इसलिए मिश्र वाक्य है।"],["‘जो मेहनत करता है, वह सफल होता है।’ यह कौन सा वाक्य है?",["मिश्र","विस्मयादिबोधक","संयुक्त","सरल"],0,"इसमें एक प्रधान और एक आश्रित उपवाक्य है, इसलिए मिश्र वाक्य है।"],["‘जो मेहनत करता है, वह सफल होता है।’ यह कौन सा वाक्य है?",["संयुक्त","विस्मयादिबोधक","मिश्र","सरल"],2,"इसमें एक प्रधान और एक आश्रित उपवाक्य है, इसलिए मिश्र वाक्य है।"],["‘जो मेहनत करता है, वह सफल होता है।’ यह कौन सा वाक्य है?",["मिश्र","संयुक्त","सरल","विस्मयादिबोधक"],0,"इसमें एक प्रधान और एक आश्रित उपवाक्य है, इसलिए मिश्र वाक्य है।"],["‘जो मेहनत करता है, वह सफल होता है।’ यह कौन सा वाक्य है?",["विस्मयादिबोधक","सरल","संयुक्त","मिश्र"],3,"इसमें एक प्रधान और एक आश्रित उपवाक्य है, इसलिए मिश्र वाक्य है।"],["‘जो मेहनत करता है, वह सफल होता है।’ यह कौन सा वाक्य है?",["मिश्र","संयुक्त","सरल","विस्मयादिबोधक"],0,"इसमें एक प्रधान और एक आश्रित उपवाक्य है, इसलिए मिश्र वाक्य है।"],["‘जो मेहनत करता है, वह सफल होता है।’ यह कौन सा वाक्य है?",["मिश्र","सरल","विस्मयादिबोधक","संयुक्त"],0,"इसमें एक प्रधान और एक आश्रित उपवाक्य है, इसलिए मिश्र वाक्य है।"],["‘जो मेहनत करता है, वह सफल होता है।’ यह कौन सा वाक्य है?",["संयुक्त","मिश्र","विस्मयादिबोधक","सरल"],1,"इसमें एक प्रधान और एक आश्रित उपवाक्य है, इसलिए मिश्र वाक्य है।"],["‘जो मेहनत करता है, वह सफल होता है।’ यह कौन सा वाक्य है?",["विस्मयादिबोधक","सरल","मिश्र","संयुक्त"],2,"इसमें एक प्रधान और एक आश्रित उपवाक्य है, इसलिए मिश्र वाक्य है।"],["‘जो मेहनत करता है, वह सफल होता है।’ यह कौन सा वाक्य है?",["विस्मयादिबोधक","संयुक्त","सरल","मिश्र"],3,"इसमें एक प्रधान और एक आश्रित उपवाक्य है, इसलिए मिश्र वाक्य है।"],["‘जो मेहनत करता है, वह सफल होता है।’ यह कौन सा वाक्य है?",["संयुक्त","विस्मयादिबोधक","सरल","मिश्र"],3,"इसमें एक प्रधान और एक आश्रित उपवाक्य है, इसलिए मिश्र वाक्य है।"],["‘जो मेहनत करता है, वह सफल होता है।’ यह कौन सा वाक्य है?",["मिश्र","संयुक्त","विस्मयादिबोधक","सरल"],0,"इसमें एक प्रधान और एक आश्रित उपवाक्य है, इसलिए मिश्र वाक्य है।"],["‘जो मेहनत करता है, वह सफल होता है।’ यह कौन सा वाक्य है?",["संयुक्त","विस्मयादिबोधक","मिश्र","सरल"],2,"इसमें एक प्रधान और एक आश्रित उपवाक्य है, इसलिए मिश्र वाक्य है।"]],"English":[["Choose the correct spelling:",["Receve","Receeve","Receive","Recieve"],2,"The correct spelling is Receive."],["Opposite of 'Ancient' is:",["Historic","Old","Past","Modern"],3,"The opposite of Ancient is Modern."],["Choose the correct conjunction: “I was tired ___ I continued working.”",["or","but","so","because"],1,"But connects two contrasting ideas."],["Choose the correct conjunction: “I was tired ___ I continued working.”",["but","so","because","or"],0,"But connects two contrasting ideas."],["Choose the correct conjunction: “I was tired ___ I continued working.”",["because","but","so","or"],1,"But connects two contrasting ideas."],["Choose the correct conjunction: “I was tired ___ I continued working.”",["but","so","because","or"],0,"But connects two contrasting ideas."],["Choose the correct conjunction: “I was tired ___ I continued working.”",["so","because","or","but"],3,"But connects two contrasting ideas."],["Choose the correct conjunction: “I was tired ___ I continued working.”",["but","because","so","or"],0,"But connects two contrasting ideas."],["Choose the correct conjunction: “I was tired ___ I continued working.”",["because","so","or","but"],3,"But connects two contrasting ideas."],["Choose the correct conjunction: “I was tired ___ I continued working.”",["because","but","or","so"],1,"But connects two contrasting ideas."],["Choose the correct conjunction: “I was tired ___ I continued working.”",["because","or","but","so"],2,"But connects two contrasting ideas."],["Choose the correct conjunction: “I was tired ___ I continued working.”",["but","so","or","because"],0,"But connects two contrasting ideas."],["Choose the correct conjunction: “I was tired ___ I continued working.”",["because","but","so","or"],1,"But connects two contrasting ideas."],["Choose the correct conjunction: “I was tired ___ I continued working.”",["but","so","because","or"],0,"But connects two contrasting ideas."],["Choose the correct conjunction: “I was tired ___ I continued working.”",["but","so","or","because"],0,"But connects two contrasting ideas."],["Choose the correct conjunction: “I was tired ___ I continued working.”",["so","or","but","because"],2,"But connects two contrasting ideas."],["Choose the correct conjunction: “I was tired ___ I continued working.”",["because","or","but","so"],2,"But connects two contrasting ideas."],["Choose the correct conjunction: “I was tired ___ I continued working.”",["so","because","or","but"],3,"But connects two contrasting ideas."],["Choose the correct conjunction: “I was tired ___ I continued working.”",["but","because","so","or"],0,"But connects two contrasting ideas."],["Choose the correct conjunction: “I was tired ___ I continued working.”",["or","but","because","so"],1,"But connects two contrasting ideas."]],"Economics":[["भारत की मुद्रा क्या है?",["येन","पाउंड","डॉलर","रुपया"],3,"भारत की आधिकारिक मुद्रा भारतीय रुपया है।"],["भारत में राष्ट्रीय आय के आधिकारिक अनुमान से संबंधित प्रमुख संस्था कौन सी है?",["UPSC","SEBI","NSO","RBI केवल"],2,"राष्ट्रीय सांख्यिकी कार्यालय (NSO) राष्ट्रीय आय के आंकड़ों से संबंधित प्रमुख संस्था है।"],["भारत में राष्ट्रीय आय के आधिकारिक अनुमान से संबंधित प्रमुख संस्था कौन सी है?",["RBI केवल","NSO","SEBI","UPSC"],1,"राष्ट्रीय सांख्यिकी कार्यालय (NSO) राष्ट्रीय आय के आंकड़ों से संबंधित प्रमुख संस्था है।"],["भारत में राष्ट्रीय आय के आधिकारिक अनुमान से संबंधित प्रमुख संस्था कौन सी है?",["NSO","UPSC","SEBI","RBI केवल"],0,"राष्ट्रीय सांख्यिकी कार्यालय (NSO) राष्ट्रीय आय के आंकड़ों से संबंधित प्रमुख संस्था है।"],["भारत में राष्ट्रीय आय के आधिकारिक अनुमान से संबंधित प्रमुख संस्था कौन सी है?",["SEBI","NSO","RBI केवल","UPSC"],1,"राष्ट्रीय सांख्यिकी कार्यालय (NSO) राष्ट्रीय आय के आंकड़ों से संबंधित प्रमुख संस्था है।"],["भारत में राष्ट्रीय आय के आधिकारिक अनुमान से संबंधित प्रमुख संस्था कौन सी है?",["NSO","SEBI","RBI केवल","UPSC"],0,"राष्ट्रीय सांख्यिकी कार्यालय (NSO) राष्ट्रीय आय के आंकड़ों से संबंधित प्रमुख संस्था है।"],["भारत में राष्ट्रीय आय के आधिकारिक अनुमान से संबंधित प्रमुख संस्था कौन सी है?",["RBI केवल","UPSC","SEBI","NSO"],3,"राष्ट्रीय सांख्यिकी कार्यालय (NSO) राष्ट्रीय आय के आंकड़ों से संबंधित प्रमुख संस्था है।"],["भारत में राष्ट्रीय आय के आधिकारिक अनुमान से संबंधित प्रमुख संस्था कौन सी है?",["UPSC","RBI केवल","SEBI","NSO"],3,"राष्ट्रीय सांख्यिकी कार्यालय (NSO) राष्ट्रीय आय के आंकड़ों से संबंधित प्रमुख संस्था है।"],["भारत में राष्ट्रीय आय के आधिकारिक अनुमान से संबंधित प्रमुख संस्था कौन सी है?",["NSO","RBI केवल","SEBI","UPSC"],0,"राष्ट्रीय सांख्यिकी कार्यालय (NSO) राष्ट्रीय आय के आंकड़ों से संबंधित प्रमुख संस्था है।"],["भारत में राष्ट्रीय आय के आधिकारिक अनुमान से संबंधित प्रमुख संस्था कौन सी है?",["RBI केवल","SEBI","NSO","UPSC"],2,"राष्ट्रीय सांख्यिकी कार्यालय (NSO) राष्ट्रीय आय के आंकड़ों से संबंधित प्रमुख संस्था है।"],["भारत में राष्ट्रीय आय के आधिकारिक अनुमान से संबंधित प्रमुख संस्था कौन सी है?",["SEBI","UPSC","NSO","RBI केवल"],2,"राष्ट्रीय सांख्यिकी कार्यालय (NSO) राष्ट्रीय आय के आंकड़ों से संबंधित प्रमुख संस्था है।"],["भारत में राष्ट्रीय आय के आधिकारिक अनुमान से संबंधित प्रमुख संस्था कौन सी है?",["RBI केवल","NSO","UPSC","SEBI"],1,"राष्ट्रीय सांख्यिकी कार्यालय (NSO) राष्ट्रीय आय के आंकड़ों से संबंधित प्रमुख संस्था है।"],["भारत में राष्ट्रीय आय के आधिकारिक अनुमान से संबंधित प्रमुख संस्था कौन सी है?",["RBI केवल","NSO","SEBI","UPSC"],1,"राष्ट्रीय सांख्यिकी कार्यालय (NSO) राष्ट्रीय आय के आंकड़ों से संबंधित प्रमुख संस्था है।"],["भारत में राष्ट्रीय आय के आधिकारिक अनुमान से संबंधित प्रमुख संस्था कौन सी है?",["NSO","SEBI","UPSC","RBI केवल"],0,"राष्ट्रीय सांख्यिकी कार्यालय (NSO) राष्ट्रीय आय के आंकड़ों से संबंधित प्रमुख संस्था है।"],["भारत में राष्ट्रीय आय के आधिकारिक अनुमान से संबंधित प्रमुख संस्था कौन सी है?",["UPSC","NSO","SEBI","RBI केवल"],1,"राष्ट्रीय सांख्यिकी कार्यालय (NSO) राष्ट्रीय आय के आंकड़ों से संबंधित प्रमुख संस्था है।"],["भारत में राष्ट्रीय आय के आधिकारिक अनुमान से संबंधित प्रमुख संस्था कौन सी है?",["UPSC","SEBI","NSO","RBI केवल"],2,"राष्ट्रीय सांख्यिकी कार्यालय (NSO) राष्ट्रीय आय के आंकड़ों से संबंधित प्रमुख संस्था है।"],["भारत में राष्ट्रीय आय के आधिकारिक अनुमान से संबंधित प्रमुख संस्था कौन सी है?",["UPSC","RBI केवल","NSO","SEBI"],2,"राष्ट्रीय सांख्यिकी कार्यालय (NSO) राष्ट्रीय आय के आंकड़ों से संबंधित प्रमुख संस्था है।"],["भारत में राष्ट्रीय आय के आधिकारिक अनुमान से संबंधित प्रमुख संस्था कौन सी है?",["RBI केवल","NSO","SEBI","UPSC"],1,"राष्ट्रीय सांख्यिकी कार्यालय (NSO) राष्ट्रीय आय के आंकड़ों से संबंधित प्रमुख संस्था है।"],["भारत में राष्ट्रीय आय के आधिकारिक अनुमान से संबंधित प्रमुख संस्था कौन सी है?",["RBI केवल","NSO","UPSC","SEBI"],1,"राष्ट्रीय सांख्यिकी कार्यालय (NSO) राष्ट्रीय आय के आंकड़ों से संबंधित प्रमुख संस्था है।"],["भारत में राष्ट्रीय आय के आधिकारिक अनुमान से संबंधित प्रमुख संस्था कौन सी है?",["NSO","SEBI","UPSC","RBI केवल"],0,"राष्ट्रीय सांख्यिकी कार्यालय (NSO) राष्ट्रीय आय के आंकड़ों से संबंधित प्रमुख संस्था है।"]],"Indian Art & Culture":[["एलोरा की गुफाएँ किस राज्य में हैं?",["गुजरात","ओडिशा","कर्नाटक","महाराष्ट्र"],3,"एलोरा की गुफाएँ महाराष्ट्र में स्थित हैं।"],["भरतनाट्यम किस राज्य की प्रमुख शास्त्रीय नृत्य शैली है?",["असम","ओडिशा","तमिलनाडु","केरल"],2,"भरतनाट्यम तमिलनाडु से संबंधित शास्त्रीय नृत्य शैली है।"],["भरतनाट्यम किस राज्य की प्रमुख शास्त्रीय नृत्य शैली है?",["तमिलनाडु","केरल","असम","ओडिशा"],0,"भरतनाट्यम तमिलनाडु से संबंधित शास्त्रीय नृत्य शैली है।"],["भरतनाट्यम किस राज्य की प्रमुख शास्त्रीय नृत्य शैली है?",["तमिलनाडु","केरल","असम","ओडिशा"],0,"भरतनाट्यम तमिलनाडु से संबंधित शास्त्रीय नृत्य शैली है।"],["भरतनाट्यम किस राज्य की प्रमुख शास्त्रीय नृत्य शैली है?",["असम","केरल","तमिलनाडु","ओडिशा"],2,"भरतनाट्यम तमिलनाडु से संबंधित शास्त्रीय नृत्य शैली है।"],["भरतनाट्यम किस राज्य की प्रमुख शास्त्रीय नृत्य शैली है?",["तमिलनाडु","असम","केरल","ओडिशा"],0,"भरतनाट्यम तमिलनाडु से संबंधित शास्त्रीय नृत्य शैली है।"],["भरतनाट्यम किस राज्य की प्रमुख शास्त्रीय नृत्य शैली है?",["तमिलनाडु","असम","ओडिशा","केरल"],0,"भरतनाट्यम तमिलनाडु से संबंधित शास्त्रीय नृत्य शैली है।"],["भरतनाट्यम किस राज्य की प्रमुख शास्त्रीय नृत्य शैली है?",["केरल","ओडिशा","असम","तमिलनाडु"],3,"भरतनाट्यम तमिलनाडु से संबंधित शास्त्रीय नृत्य शैली है।"],["भरतनाट्यम किस राज्य की प्रमुख शास्त्रीय नृत्य शैली है?",["तमिलनाडु","केरल","ओडिशा","असम"],0,"भरतनाट्यम तमिलनाडु से संबंधित शास्त्रीय नृत्य शैली है।"],["भरतनाट्यम किस राज्य की प्रमुख शास्त्रीय नृत्य शैली है?",["केरल","ओडिशा","असम","तमिलनाडु"],3,"भरतनाट्यम तमिलनाडु से संबंधित शास्त्रीय नृत्य शैली है।"],["भरतनाट्यम किस राज्य की प्रमुख शास्त्रीय नृत्य शैली है?",["केरल","ओडिशा","तमिलनाडु","असम"],2,"भरतनाट्यम तमिलनाडु से संबंधित शास्त्रीय नृत्य शैली है।"],["भरतनाट्यम किस राज्य की प्रमुख शास्त्रीय नृत्य शैली है?",["तमिलनाडु","केरल","असम","ओडिशा"],0,"भरतनाट्यम तमिलनाडु से संबंधित शास्त्रीय नृत्य शैली है।"],["भरतनाट्यम किस राज्य की प्रमुख शास्त्रीय नृत्य शैली है?",["तमिलनाडु","ओडिशा","केरल","असम"],0,"भरतनाट्यम तमिलनाडु से संबंधित शास्त्रीय नृत्य शैली है।"],["भरतनाट्यम किस राज्य की प्रमुख शास्त्रीय नृत्य शैली है?",["असम","ओडिशा","तमिलनाडु","केरल"],2,"भरतनाट्यम तमिलनाडु से संबंधित शास्त्रीय नृत्य शैली है।"],["भरतनाट्यम किस राज्य की प्रमुख शास्त्रीय नृत्य शैली है?",["केरल","तमिलनाडु","असम","ओडिशा"],1,"भरतनाट्यम तमिलनाडु से संबंधित शास्त्रीय नृत्य शैली है।"],["भरतनाट्यम किस राज्य की प्रमुख शास्त्रीय नृत्य शैली है?",["ओडिशा","असम","केरल","तमिलनाडु"],3,"भरतनाट्यम तमिलनाडु से संबंधित शास्त्रीय नृत्य शैली है।"],["भरतनाट्यम किस राज्य की प्रमुख शास्त्रीय नृत्य शैली है?",["असम","ओडिशा","केरल","तमिलनाडु"],3,"भरतनाट्यम तमिलनाडु से संबंधित शास्त्रीय नृत्य शैली है।"],["भरतनाट्यम किस राज्य की प्रमुख शास्त्रीय नृत्य शैली है?",["ओडिशा","तमिलनाडु","केरल","असम"],1,"भरतनाट्यम तमिलनाडु से संबंधित शास्त्रीय नृत्य शैली है।"],["भरतनाट्यम किस राज्य की प्रमुख शास्त्रीय नृत्य शैली है?",["तमिलनाडु","केरल","असम","ओडिशा"],0,"भरतनाट्यम तमिलनाडु से संबंधित शास्त्रीय नृत्य शैली है।"],["भरतनाट्यम किस राज्य की प्रमुख शास्त्रीय नृत्य शैली है?",["असम","ओडिशा","तमिलनाडु","केरल"],2,"भरतनाट्यम तमिलनाडु से संबंधित शास्त्रीय नृत्य शैली है।"]]};
Object.keys(quiz2V12).forEach(subject => { quizSets[subject][2] = quiz2V12[subject]; });
const quiz3V12={"GK":[["भारतीय अंतरिक्ष अनुसंधान संगठन का संक्षिप्त नाम क्या है?",["CSIR","DRDO","BARC","ISRO"],3,"Indian Space Research Organisation का संक्षिप्त नाम ISRO है।"],["भारतीय अंतरिक्ष अनुसंधान संगठन का संक्षिप्त नाम क्या है?",["CSIR","DRDO","BARC","ISRO"],3,"Indian Space Research Organisation का संक्षिप्त नाम ISRO है।"],["भारतीय अंतरिक्ष अनुसंधान संगठन का संक्षिप्त नाम क्या है?",["BARC","ISRO","CSIR","DRDO"],1,"Indian Space Research Organisation का संक्षिप्त नाम ISRO है।"],["भारतीय अंतरिक्ष अनुसंधान संगठन का संक्षिप्त नाम क्या है?",["CSIR","DRDO","ISRO","BARC"],2,"Indian Space Research Organisation का संक्षिप्त नाम ISRO है।"],["भारतीय अंतरिक्ष अनुसंधान संगठन का संक्षिप्त नाम क्या है?",["BARC","DRDO","ISRO","CSIR"],2,"Indian Space Research Organisation का संक्षिप्त नाम ISRO है।"],["भारतीय अंतरिक्ष अनुसंधान संगठन का संक्षिप्त नाम क्या है?",["BARC","DRDO","ISRO","CSIR"],2,"Indian Space Research Organisation का संक्षिप्त नाम ISRO है।"],["भारतीय अंतरिक्ष अनुसंधान संगठन का संक्षिप्त नाम क्या है?",["CSIR","BARC","DRDO","ISRO"],3,"Indian Space Research Organisation का संक्षिप्त नाम ISRO है।"],["भारतीय अंतरिक्ष अनुसंधान संगठन का संक्षिप्त नाम क्या है?",["ISRO","DRDO","BARC","CSIR"],0,"Indian Space Research Organisation का संक्षिप्त नाम ISRO है।"],["भारतीय अंतरिक्ष अनुसंधान संगठन का संक्षिप्त नाम क्या है?",["DRDO","ISRO","BARC","CSIR"],1,"Indian Space Research Organisation का संक्षिप्त नाम ISRO है।"],["भारतीय अंतरिक्ष अनुसंधान संगठन का संक्षिप्त नाम क्या है?",["DRDO","CSIR","ISRO","BARC"],2,"Indian Space Research Organisation का संक्षिप्त नाम ISRO है।"],["भारतीय अंतरिक्ष अनुसंधान संगठन का संक्षिप्त नाम क्या है?",["ISRO","BARC","DRDO","CSIR"],0,"Indian Space Research Organisation का संक्षिप्त नाम ISRO है।"],["भारतीय अंतरिक्ष अनुसंधान संगठन का संक्षिप्त नाम क्या है?",["CSIR","DRDO","ISRO","BARC"],2,"Indian Space Research Organisation का संक्षिप्त नाम ISRO है।"],["भारतीय अंतरिक्ष अनुसंधान संगठन का संक्षिप्त नाम क्या है?",["ISRO","CSIR","DRDO","BARC"],0,"Indian Space Research Organisation का संक्षिप्त नाम ISRO है।"],["भारतीय अंतरिक्ष अनुसंधान संगठन का संक्षिप्त नाम क्या है?",["DRDO","CSIR","ISRO","BARC"],2,"Indian Space Research Organisation का संक्षिप्त नाम ISRO है।"],["भारतीय अंतरिक्ष अनुसंधान संगठन का संक्षिप्त नाम क्या है?",["ISRO","DRDO","CSIR","BARC"],0,"Indian Space Research Organisation का संक्षिप्त नाम ISRO है।"],["भारतीय अंतरिक्ष अनुसंधान संगठन का संक्षिप्त नाम क्या है?",["DRDO","ISRO","CSIR","BARC"],1,"Indian Space Research Organisation का संक्षिप्त नाम ISRO है।"],["भारतीय अंतरिक्ष अनुसंधान संगठन का संक्षिप्त नाम क्या है?",["ISRO","DRDO","CSIR","BARC"],0,"Indian Space Research Organisation का संक्षिप्त नाम ISRO है।"],["भारतीय अंतरिक्ष अनुसंधान संगठन का संक्षिप्त नाम क्या है?",["ISRO","CSIR","BARC","DRDO"],0,"Indian Space Research Organisation का संक्षिप्त नाम ISRO है।"],["भारतीय अंतरिक्ष अनुसंधान संगठन का संक्षिप्त नाम क्या है?",["BARC","ISRO","DRDO","CSIR"],1,"Indian Space Research Organisation का संक्षिप्त नाम ISRO है।"],["भारतीय अंतरिक्ष अनुसंधान संगठन का संक्षिप्त नाम क्या है?",["ISRO","CSIR","DRDO","BARC"],0,"Indian Space Research Organisation का संक्षिप्त नाम ISRO है।"]],"History":[["भारतीय राष्ट्रीय कांग्रेस के प्रथम अध्यक्ष कौन थे?",["डब्ल्यू. सी. बनर्जी","गोपाल कृष्ण गोखले","दादाभाई नौरोजी","ए. ओ. ह्यूम"],0,"1885 में कांग्रेस के प्रथम अध्यक्ष डब्ल्यू. सी. बनर्जी थे।"],["भारतीय राष्ट्रीय कांग्रेस के प्रथम अध्यक्ष कौन थे?",["दादाभाई नौरोजी","ए. ओ. ह्यूम","डब्ल्यू. सी. बनर्जी","गोपाल कृष्ण गोखले"],2,"1885 में कांग्रेस के प्रथम अध्यक्ष डब्ल्यू. सी. बनर्जी थे।"],["भारतीय राष्ट्रीय कांग्रेस के प्रथम अध्यक्ष कौन थे?",["ए. ओ. ह्यूम","डब्ल्यू. सी. बनर्जी","दादाभाई नौरोजी","गोपाल कृष्ण गोखले"],1,"1885 में कांग्रेस के प्रथम अध्यक्ष डब्ल्यू. सी. बनर्जी थे।"],["भारतीय राष्ट्रीय कांग्रेस के प्रथम अध्यक्ष कौन थे?",["गोपाल कृष्ण गोखले","डब्ल्यू. सी. बनर्जी","ए. ओ. ह्यूम","दादाभाई नौरोजी"],1,"1885 में कांग्रेस के प्रथम अध्यक्ष डब्ल्यू. सी. बनर्जी थे।"],["भारतीय राष्ट्रीय कांग्रेस के प्रथम अध्यक्ष कौन थे?",["डब्ल्यू. सी. बनर्जी","गोपाल कृष्ण गोखले","दादाभाई नौरोजी","ए. ओ. ह्यूम"],0,"1885 में कांग्रेस के प्रथम अध्यक्ष डब्ल्यू. सी. बनर्जी थे।"],["भारतीय राष्ट्रीय कांग्रेस के प्रथम अध्यक्ष कौन थे?",["गोपाल कृष्ण गोखले","डब्ल्यू. सी. बनर्जी","दादाभाई नौरोजी","ए. ओ. ह्यूम"],1,"1885 में कांग्रेस के प्रथम अध्यक्ष डब्ल्यू. सी. बनर्जी थे।"],["भारतीय राष्ट्रीय कांग्रेस के प्रथम अध्यक्ष कौन थे?",["ए. ओ. ह्यूम","दादाभाई नौरोजी","डब्ल्यू. सी. बनर्जी","गोपाल कृष्ण गोखले"],2,"1885 में कांग्रेस के प्रथम अध्यक्ष डब्ल्यू. सी. बनर्जी थे।"],["भारतीय राष्ट्रीय कांग्रेस के प्रथम अध्यक्ष कौन थे?",["गोपाल कृष्ण गोखले","दादाभाई नौरोजी","ए. ओ. ह्यूम","डब्ल्यू. सी. बनर्जी"],3,"1885 में कांग्रेस के प्रथम अध्यक्ष डब्ल्यू. सी. बनर्जी थे।"],["भारतीय राष्ट्रीय कांग्रेस के प्रथम अध्यक्ष कौन थे?",["दादाभाई नौरोजी","डब्ल्यू. सी. बनर्जी","गोपाल कृष्ण गोखले","ए. ओ. ह्यूम"],1,"1885 में कांग्रेस के प्रथम अध्यक्ष डब्ल्यू. सी. बनर्जी थे।"],["भारतीय राष्ट्रीय कांग्रेस के प्रथम अध्यक्ष कौन थे?",["डब्ल्यू. सी. बनर्जी","दादाभाई नौरोजी","ए. ओ. ह्यूम","गोपाल कृष्ण गोखले"],0,"1885 में कांग्रेस के प्रथम अध्यक्ष डब्ल्यू. सी. बनर्जी थे।"],["भारतीय राष्ट्रीय कांग्रेस के प्रथम अध्यक्ष कौन थे?",["ए. ओ. ह्यूम","डब्ल्यू. सी. बनर्जी","दादाभाई नौरोजी","गोपाल कृष्ण गोखले"],1,"1885 में कांग्रेस के प्रथम अध्यक्ष डब्ल्यू. सी. बनर्जी थे।"],["भारतीय राष्ट्रीय कांग्रेस के प्रथम अध्यक्ष कौन थे?",["दादाभाई नौरोजी","गोपाल कृष्ण गोखले","ए. ओ. ह्यूम","डब्ल्यू. सी. बनर्जी"],3,"1885 में कांग्रेस के प्रथम अध्यक्ष डब्ल्यू. सी. बनर्जी थे।"],["भारतीय राष्ट्रीय कांग्रेस के प्रथम अध्यक्ष कौन थे?",["दादाभाई नौरोजी","गोपाल कृष्ण गोखले","ए. ओ. ह्यूम","डब्ल्यू. सी. बनर्जी"],3,"1885 में कांग्रेस के प्रथम अध्यक्ष डब्ल्यू. सी. बनर्जी थे।"],["भारतीय राष्ट्रीय कांग्रेस के प्रथम अध्यक्ष कौन थे?",["ए. ओ. ह्यूम","डब्ल्यू. सी. बनर्जी","दादाभाई नौरोजी","गोपाल कृष्ण गोखले"],1,"1885 में कांग्रेस के प्रथम अध्यक्ष डब्ल्यू. सी. बनर्जी थे।"],["भारतीय राष्ट्रीय कांग्रेस के प्रथम अध्यक्ष कौन थे?",["ए. ओ. ह्यूम","दादाभाई नौरोजी","डब्ल्यू. सी. बनर्जी","गोपाल कृष्ण गोखले"],2,"1885 में कांग्रेस के प्रथम अध्यक्ष डब्ल्यू. सी. बनर्जी थे।"],["भारतीय राष्ट्रीय कांग्रेस के प्रथम अध्यक्ष कौन थे?",["गोपाल कृष्ण गोखले","डब्ल्यू. सी. बनर्जी","दादाभाई नौरोजी","ए. ओ. ह्यूम"],1,"1885 में कांग्रेस के प्रथम अध्यक्ष डब्ल्यू. सी. बनर्जी थे।"],["भारतीय राष्ट्रीय कांग्रेस के प्रथम अध्यक्ष कौन थे?",["दादाभाई नौरोजी","डब्ल्यू. सी. बनर्जी","गोपाल कृष्ण गोखले","ए. ओ. ह्यूम"],1,"1885 में कांग्रेस के प्रथम अध्यक्ष डब्ल्यू. सी. बनर्जी थे।"],["भारतीय राष्ट्रीय कांग्रेस के प्रथम अध्यक्ष कौन थे?",["डब्ल्यू. सी. बनर्जी","गोपाल कृष्ण गोखले","ए. ओ. ह्यूम","दादाभाई नौरोजी"],0,"1885 में कांग्रेस के प्रथम अध्यक्ष डब्ल्यू. सी. बनर्जी थे।"],["भारतीय राष्ट्रीय कांग्रेस के प्रथम अध्यक्ष कौन थे?",["ए. ओ. ह्यूम","गोपाल कृष्ण गोखले","दादाभाई नौरोजी","डब्ल्यू. सी. बनर्जी"],3,"1885 में कांग्रेस के प्रथम अध्यक्ष डब्ल्यू. सी. बनर्जी थे।"],["भारतीय राष्ट्रीय कांग्रेस के प्रथम अध्यक्ष कौन थे?",["दादाभाई नौरोजी","गोपाल कृष्ण गोखले","ए. ओ. ह्यूम","डब्ल्यू. सी. बनर्जी"],3,"1885 में कांग्रेस के प्रथम अध्यक्ष डब्ल्यू. सी. बनर्जी थे।"]],"Geography":[["भारत का सबसे ऊँचा पर्वत शिखर जो पूरी तरह भारत में स्थित है, कौन सा है?",["नंदा देवी","अनामुडी","कामेत","कंचनजंघा"],0,"नंदा देवी भारत में स्थित सबसे ऊँची पर्वत चोटियों में प्रमुख है।"],["भारत का सबसे ऊँचा पर्वत शिखर जो पूरी तरह भारत में स्थित है, कौन सा है?",["नंदा देवी","अनामुडी","कंचनजंघा","कामेत"],0,"नंदा देवी भारत में स्थित सबसे ऊँची पर्वत चोटियों में प्रमुख है।"],["भारत का सबसे ऊँचा पर्वत शिखर जो पूरी तरह भारत में स्थित है, कौन सा है?",["कामेत","नंदा देवी","अनामुडी","कंचनजंघा"],1,"नंदा देवी भारत में स्थित सबसे ऊँची पर्वत चोटियों में प्रमुख है।"],["भारत का सबसे ऊँचा पर्वत शिखर जो पूरी तरह भारत में स्थित है, कौन सा है?",["अनामुडी","नंदा देवी","कंचनजंघा","कामेत"],1,"नंदा देवी भारत में स्थित सबसे ऊँची पर्वत चोटियों में प्रमुख है।"],["भारत का सबसे ऊँचा पर्वत शिखर जो पूरी तरह भारत में स्थित है, कौन सा है?",["कंचनजंघा","नंदा देवी","कामेत","अनामुडी"],1,"नंदा देवी भारत में स्थित सबसे ऊँची पर्वत चोटियों में प्रमुख है।"],["भारत का सबसे ऊँचा पर्वत शिखर जो पूरी तरह भारत में स्थित है, कौन सा है?",["कंचनजंघा","कामेत","अनामुडी","नंदा देवी"],3,"नंदा देवी भारत में स्थित सबसे ऊँची पर्वत चोटियों में प्रमुख है।"],["भारत का सबसे ऊँचा पर्वत शिखर जो पूरी तरह भारत में स्थित है, कौन सा है?",["कंचनजंघा","नंदा देवी","कामेत","अनामुडी"],1,"नंदा देवी भारत में स्थित सबसे ऊँची पर्वत चोटियों में प्रमुख है।"],["भारत का सबसे ऊँचा पर्वत शिखर जो पूरी तरह भारत में स्थित है, कौन सा है?",["अनामुडी","कामेत","नंदा देवी","कंचनजंघा"],2,"नंदा देवी भारत में स्थित सबसे ऊँची पर्वत चोटियों में प्रमुख है।"],["भारत का सबसे ऊँचा पर्वत शिखर जो पूरी तरह भारत में स्थित है, कौन सा है?",["अनामुडी","कंचनजंघा","नंदा देवी","कामेत"],2,"नंदा देवी भारत में स्थित सबसे ऊँची पर्वत चोटियों में प्रमुख है।"],["भारत का सबसे ऊँचा पर्वत शिखर जो पूरी तरह भारत में स्थित है, कौन सा है?",["कंचनजंघा","नंदा देवी","कामेत","अनामुडी"],1,"नंदा देवी भारत में स्थित सबसे ऊँची पर्वत चोटियों में प्रमुख है।"],["भारत का सबसे ऊँचा पर्वत शिखर जो पूरी तरह भारत में स्थित है, कौन सा है?",["नंदा देवी","कामेत","अनामुडी","कंचनजंघा"],0,"नंदा देवी भारत में स्थित सबसे ऊँची पर्वत चोटियों में प्रमुख है।"],["भारत का सबसे ऊँचा पर्वत शिखर जो पूरी तरह भारत में स्थित है, कौन सा है?",["कामेत","नंदा देवी","कंचनजंघा","अनामुडी"],1,"नंदा देवी भारत में स्थित सबसे ऊँची पर्वत चोटियों में प्रमुख है।"],["भारत का सबसे ऊँचा पर्वत शिखर जो पूरी तरह भारत में स्थित है, कौन सा है?",["अनामुडी","नंदा देवी","कामेत","कंचनजंघा"],1,"नंदा देवी भारत में स्थित सबसे ऊँची पर्वत चोटियों में प्रमुख है।"],["भारत का सबसे ऊँचा पर्वत शिखर जो पूरी तरह भारत में स्थित है, कौन सा है?",["कामेत","कंचनजंघा","अनामुडी","नंदा देवी"],3,"नंदा देवी भारत में स्थित सबसे ऊँची पर्वत चोटियों में प्रमुख है।"],["भारत का सबसे ऊँचा पर्वत शिखर जो पूरी तरह भारत में स्थित है, कौन सा है?",["नंदा देवी","अनामुडी","कंचनजंघा","कामेत"],0,"नंदा देवी भारत में स्थित सबसे ऊँची पर्वत चोटियों में प्रमुख है।"],["भारत का सबसे ऊँचा पर्वत शिखर जो पूरी तरह भारत में स्थित है, कौन सा है?",["कामेत","नंदा देवी","अनामुडी","कंचनजंघा"],1,"नंदा देवी भारत में स्थित सबसे ऊँची पर्वत चोटियों में प्रमुख है।"],["भारत का सबसे ऊँचा पर्वत शिखर जो पूरी तरह भारत में स्थित है, कौन सा है?",["कामेत","कंचनजंघा","अनामुडी","नंदा देवी"],3,"नंदा देवी भारत में स्थित सबसे ऊँची पर्वत चोटियों में प्रमुख है।"],["भारत का सबसे ऊँचा पर्वत शिखर जो पूरी तरह भारत में स्थित है, कौन सा है?",["कंचनजंघा","कामेत","अनामुडी","नंदा देवी"],3,"नंदा देवी भारत में स्थित सबसे ऊँची पर्वत चोटियों में प्रमुख है।"],["भारत का सबसे ऊँचा पर्वत शिखर जो पूरी तरह भारत में स्थित है, कौन सा है?",["अनामुडी","नंदा देवी","कंचनजंघा","कामेत"],1,"नंदा देवी भारत में स्थित सबसे ऊँची पर्वत चोटियों में प्रमुख है।"],["भारत का सबसे ऊँचा पर्वत शिखर जो पूरी तरह भारत में स्थित है, कौन सा है?",["नंदा देवी","कामेत","अनामुडी","कंचनजंघा"],0,"नंदा देवी भारत में स्थित सबसे ऊँची पर्वत चोटियों में प्रमुख है।"]],"Polity":[["भारतीय संविधान की प्रस्तावना में भारत को किस रूप में वर्णित किया गया है?",["एकात्मक राजतंत्र","संघीय राजतंत्र","सैन्य गणराज्य","सम्प्रभु समाजवादी पंथनिरपेक्ष लोकतांत्रिक गणराज्य"],3,"प्रस्तावना भारत को सम्प्रभु, समाजवादी, पंथनिरपेक्ष, लोकतांत्रिक गणराज्य बताती है।"],["भारतीय संविधान की प्रस्तावना में भारत को किस रूप में वर्णित किया गया है?",["सैन्य गणराज्य","सम्प्रभु समाजवादी पंथनिरपेक्ष लोकतांत्रिक गणराज्य","संघीय राजतंत्र","एकात्मक राजतंत्र"],1,"प्रस्तावना भारत को सम्प्रभु, समाजवादी, पंथनिरपेक्ष, लोकतांत्रिक गणराज्य बताती है।"],["भारतीय संविधान की प्रस्तावना में भारत को किस रूप में वर्णित किया गया है?",["संघीय राजतंत्र","सैन्य गणराज्य","सम्प्रभु समाजवादी पंथनिरपेक्ष लोकतांत्रिक गणराज्य","एकात्मक राजतंत्र"],2,"प्रस्तावना भारत को सम्प्रभु, समाजवादी, पंथनिरपेक्ष, लोकतांत्रिक गणराज्य बताती है।"],["भारतीय संविधान की प्रस्तावना में भारत को किस रूप में वर्णित किया गया है?",["सैन्य गणराज्य","सम्प्रभु समाजवादी पंथनिरपेक्ष लोकतांत्रिक गणराज्य","संघीय राजतंत्र","एकात्मक राजतंत्र"],1,"प्रस्तावना भारत को सम्प्रभु, समाजवादी, पंथनिरपेक्ष, लोकतांत्रिक गणराज्य बताती है।"],["भारतीय संविधान की प्रस्तावना में भारत को किस रूप में वर्णित किया गया है?",["सैन्य गणराज्य","संघीय राजतंत्र","एकात्मक राजतंत्र","सम्प्रभु समाजवादी पंथनिरपेक्ष लोकतांत्रिक गणराज्य"],3,"प्रस्तावना भारत को सम्प्रभु, समाजवादी, पंथनिरपेक्ष, लोकतांत्रिक गणराज्य बताती है।"],["भारतीय संविधान की प्रस्तावना में भारत को किस रूप में वर्णित किया गया है?",["सम्प्रभु समाजवादी पंथनिरपेक्ष लोकतांत्रिक गणराज्य","एकात्मक राजतंत्र","सैन्य गणराज्य","संघीय राजतंत्र"],0,"प्रस्तावना भारत को सम्प्रभु, समाजवादी, पंथनिरपेक्ष, लोकतांत्रिक गणराज्य बताती है।"],["भारतीय संविधान की प्रस्तावना में भारत को किस रूप में वर्णित किया गया है?",["एकात्मक राजतंत्र","सैन्य गणराज्य","सम्प्रभु समाजवादी पंथनिरपेक्ष लोकतांत्रिक गणराज्य","संघीय राजतंत्र"],2,"प्रस्तावना भारत को सम्प्रभु, समाजवादी, पंथनिरपेक्ष, लोकतांत्रिक गणराज्य बताती है।"],["भारतीय संविधान की प्रस्तावना में भारत को किस रूप में वर्णित किया गया है?",["सैन्य गणराज्य","सम्प्रभु समाजवादी पंथनिरपेक्ष लोकतांत्रिक गणराज्य","एकात्मक राजतंत्र","संघीय राजतंत्र"],1,"प्रस्तावना भारत को सम्प्रभु, समाजवादी, पंथनिरपेक्ष, लोकतांत्रिक गणराज्य बताती है।"],["भारतीय संविधान की प्रस्तावना में भारत को किस रूप में वर्णित किया गया है?",["सैन्य गणराज्य","सम्प्रभु समाजवादी पंथनिरपेक्ष लोकतांत्रिक गणराज्य","संघीय राजतंत्र","एकात्मक राजतंत्र"],1,"प्रस्तावना भारत को सम्प्रभु, समाजवादी, पंथनिरपेक्ष, लोकतांत्रिक गणराज्य बताती है।"],["भारतीय संविधान की प्रस्तावना में भारत को किस रूप में वर्णित किया गया है?",["सैन्य गणराज्य","एकात्मक राजतंत्र","संघीय राजतंत्र","सम्प्रभु समाजवादी पंथनिरपेक्ष लोकतांत्रिक गणराज्य"],3,"प्रस्तावना भारत को सम्प्रभु, समाजवादी, पंथनिरपेक्ष, लोकतांत्रिक गणराज्य बताती है।"],["भारतीय संविधान की प्रस्तावना में भारत को किस रूप में वर्णित किया गया है?",["सैन्य गणराज्य","सम्प्रभु समाजवादी पंथनिरपेक्ष लोकतांत्रिक गणराज्य","एकात्मक राजतंत्र","संघीय राजतंत्र"],1,"प्रस्तावना भारत को सम्प्रभु, समाजवादी, पंथनिरपेक्ष, लोकतांत्रिक गणराज्य बताती है।"],["भारतीय संविधान की प्रस्तावना में भारत को किस रूप में वर्णित किया गया है?",["सैन्य गणराज्य","सम्प्रभु समाजवादी पंथनिरपेक्ष लोकतांत्रिक गणराज्य","एकात्मक राजतंत्र","संघीय राजतंत्र"],1,"प्रस्तावना भारत को सम्प्रभु, समाजवादी, पंथनिरपेक्ष, लोकतांत्रिक गणराज्य बताती है।"],["भारतीय संविधान की प्रस्तावना में भारत को किस रूप में वर्णित किया गया है?",["संघीय राजतंत्र","सैन्य गणराज्य","सम्प्रभु समाजवादी पंथनिरपेक्ष लोकतांत्रिक गणराज्य","एकात्मक राजतंत्र"],2,"प्रस्तावना भारत को सम्प्रभु, समाजवादी, पंथनिरपेक्ष, लोकतांत्रिक गणराज्य बताती है।"],["भारतीय संविधान की प्रस्तावना में भारत को किस रूप में वर्णित किया गया है?",["एकात्मक राजतंत्र","सम्प्रभु समाजवादी पंथनिरपेक्ष लोकतांत्रिक गणराज्य","सैन्य गणराज्य","संघीय राजतंत्र"],1,"प्रस्तावना भारत को सम्प्रभु, समाजवादी, पंथनिरपेक्ष, लोकतांत्रिक गणराज्य बताती है।"],["भारतीय संविधान की प्रस्तावना में भारत को किस रूप में वर्णित किया गया है?",["सैन्य गणराज्य","संघीय राजतंत्र","एकात्मक राजतंत्र","सम्प्रभु समाजवादी पंथनिरपेक्ष लोकतांत्रिक गणराज्य"],3,"प्रस्तावना भारत को सम्प्रभु, समाजवादी, पंथनिरपेक्ष, लोकतांत्रिक गणराज्य बताती है।"],["भारतीय संविधान की प्रस्तावना में भारत को किस रूप में वर्णित किया गया है?",["सम्प्रभु समाजवादी पंथनिरपेक्ष लोकतांत्रिक गणराज्य","एकात्मक राजतंत्र","सैन्य गणराज्य","संघीय राजतंत्र"],0,"प्रस्तावना भारत को सम्प्रभु, समाजवादी, पंथनिरपेक्ष, लोकतांत्रिक गणराज्य बताती है।"],["भारतीय संविधान की प्रस्तावना में भारत को किस रूप में वर्णित किया गया है?",["एकात्मक राजतंत्र","सैन्य गणराज्य","संघीय राजतंत्र","सम्प्रभु समाजवादी पंथनिरपेक्ष लोकतांत्रिक गणराज्य"],3,"प्रस्तावना भारत को सम्प्रभु, समाजवादी, पंथनिरपेक्ष, लोकतांत्रिक गणराज्य बताती है।"],["भारतीय संविधान की प्रस्तावना में भारत को किस रूप में वर्णित किया गया है?",["संघीय राजतंत्र","एकात्मक राजतंत्र","सैन्य गणराज्य","सम्प्रभु समाजवादी पंथनिरपेक्ष लोकतांत्रिक गणराज्य"],3,"प्रस्तावना भारत को सम्प्रभु, समाजवादी, पंथनिरपेक्ष, लोकतांत्रिक गणराज्य बताती है।"],["भारतीय संविधान की प्रस्तावना में भारत को किस रूप में वर्णित किया गया है?",["सैन्य गणराज्य","सम्प्रभु समाजवादी पंथनिरपेक्ष लोकतांत्रिक गणराज्य","संघीय राजतंत्र","एकात्मक राजतंत्र"],1,"प्रस्तावना भारत को सम्प्रभु, समाजवादी, पंथनिरपेक्ष, लोकतांत्रिक गणराज्य बताती है।"],["भारतीय संविधान की प्रस्तावना में भारत को किस रूप में वर्णित किया गया है?",["सैन्य गणराज्य","एकात्मक राजतंत्र","संघीय राजतंत्र","सम्प्रभु समाजवादी पंथनिरपेक्ष लोकतांत्रिक गणराज्य"],3,"प्रस्तावना भारत को सम्प्रभु, समाजवादी, पंथनिरपेक्ष, लोकतांत्रिक गणराज्य बताती है।"]],"Science":[["मानव शरीर में रक्त का शुद्धीकरण मुख्यतः किस अंग द्वारा होता है?",["गुर्दे","त्वचा","हृदय","अग्न्याशय"],0,"गुर्दे रक्त से अपशिष्ट पदार्थों को छानने में मुख्य भूमिका निभाते हैं।"],["मानव शरीर में रक्त का शुद्धीकरण मुख्यतः किस अंग द्वारा होता है?",["त्वचा","गुर्दे","हृदय","अग्न्याशय"],1,"गुर्दे रक्त से अपशिष्ट पदार्थों को छानने में मुख्य भूमिका निभाते हैं।"],["मानव शरीर में रक्त का शुद्धीकरण मुख्यतः किस अंग द्वारा होता है?",["त्वचा","गुर्दे","हृदय","अग्न्याशय"],1,"गुर्दे रक्त से अपशिष्ट पदार्थों को छानने में मुख्य भूमिका निभाते हैं।"],["मानव शरीर में रक्त का शुद्धीकरण मुख्यतः किस अंग द्वारा होता है?",["हृदय","अग्न्याशय","गुर्दे","त्वचा"],2,"गुर्दे रक्त से अपशिष्ट पदार्थों को छानने में मुख्य भूमिका निभाते हैं।"],["मानव शरीर में रक्त का शुद्धीकरण मुख्यतः किस अंग द्वारा होता है?",["हृदय","अग्न्याशय","गुर्दे","त्वचा"],2,"गुर्दे रक्त से अपशिष्ट पदार्थों को छानने में मुख्य भूमिका निभाते हैं।"],["मानव शरीर में रक्त का शुद्धीकरण मुख्यतः किस अंग द्वारा होता है?",["गुर्दे","अग्न्याशय","त्वचा","हृदय"],0,"गुर्दे रक्त से अपशिष्ट पदार्थों को छानने में मुख्य भूमिका निभाते हैं।"],["मानव शरीर में रक्त का शुद्धीकरण मुख्यतः किस अंग द्वारा होता है?",["गुर्दे","अग्न्याशय","त्वचा","हृदय"],0,"गुर्दे रक्त से अपशिष्ट पदार्थों को छानने में मुख्य भूमिका निभाते हैं।"],["मानव शरीर में रक्त का शुद्धीकरण मुख्यतः किस अंग द्वारा होता है?",["गुर्दे","त्वचा","अग्न्याशय","हृदय"],0,"गुर्दे रक्त से अपशिष्ट पदार्थों को छानने में मुख्य भूमिका निभाते हैं।"],["मानव शरीर में रक्त का शुद्धीकरण मुख्यतः किस अंग द्वारा होता है?",["हृदय","गुर्दे","अग्न्याशय","त्वचा"],1,"गुर्दे रक्त से अपशिष्ट पदार्थों को छानने में मुख्य भूमिका निभाते हैं।"],["मानव शरीर में रक्त का शुद्धीकरण मुख्यतः किस अंग द्वारा होता है?",["गुर्दे","हृदय","अग्न्याशय","त्वचा"],0,"गुर्दे रक्त से अपशिष्ट पदार्थों को छानने में मुख्य भूमिका निभाते हैं।"],["मानव शरीर में रक्त का शुद्धीकरण मुख्यतः किस अंग द्वारा होता है?",["गुर्दे","त्वचा","अग्न्याशय","हृदय"],0,"गुर्दे रक्त से अपशिष्ट पदार्थों को छानने में मुख्य भूमिका निभाते हैं।"],["मानव शरीर में रक्त का शुद्धीकरण मुख्यतः किस अंग द्वारा होता है?",["अग्न्याशय","गुर्दे","त्वचा","हृदय"],1,"गुर्दे रक्त से अपशिष्ट पदार्थों को छानने में मुख्य भूमिका निभाते हैं।"],["मानव शरीर में रक्त का शुद्धीकरण मुख्यतः किस अंग द्वारा होता है?",["त्वचा","अग्न्याशय","हृदय","गुर्दे"],3,"गुर्दे रक्त से अपशिष्ट पदार्थों को छानने में मुख्य भूमिका निभाते हैं।"],["मानव शरीर में रक्त का शुद्धीकरण मुख्यतः किस अंग द्वारा होता है?",["गुर्दे","त्वचा","अग्न्याशय","हृदय"],0,"गुर्दे रक्त से अपशिष्ट पदार्थों को छानने में मुख्य भूमिका निभाते हैं।"],["मानव शरीर में रक्त का शुद्धीकरण मुख्यतः किस अंग द्वारा होता है?",["हृदय","अग्न्याशय","गुर्दे","त्वचा"],2,"गुर्दे रक्त से अपशिष्ट पदार्थों को छानने में मुख्य भूमिका निभाते हैं।"],["मानव शरीर में रक्त का शुद्धीकरण मुख्यतः किस अंग द्वारा होता है?",["गुर्दे","हृदय","अग्न्याशय","त्वचा"],0,"गुर्दे रक्त से अपशिष्ट पदार्थों को छानने में मुख्य भूमिका निभाते हैं।"],["मानव शरीर में रक्त का शुद्धीकरण मुख्यतः किस अंग द्वारा होता है?",["त्वचा","हृदय","अग्न्याशय","गुर्दे"],3,"गुर्दे रक्त से अपशिष्ट पदार्थों को छानने में मुख्य भूमिका निभाते हैं।"],["मानव शरीर में रक्त का शुद्धीकरण मुख्यतः किस अंग द्वारा होता है?",["गुर्दे","हृदय","त्वचा","अग्न्याशय"],0,"गुर्दे रक्त से अपशिष्ट पदार्थों को छानने में मुख्य भूमिका निभाते हैं।"],["मानव शरीर में रक्त का शुद्धीकरण मुख्यतः किस अंग द्वारा होता है?",["त्वचा","गुर्दे","हृदय","अग्न्याशय"],1,"गुर्दे रक्त से अपशिष्ट पदार्थों को छानने में मुख्य भूमिका निभाते हैं।"],["मानव शरीर में रक्त का शुद्धीकरण मुख्यतः किस अंग द्वारा होता है?",["अग्न्याशय","त्वचा","हृदय","गुर्दे"],3,"गुर्दे रक्त से अपशिष्ट पदार्थों को छानने में मुख्य भूमिका निभाते हैं।"]],"Maths":[["एक वस्तु का अंकित मूल्य 800 रुपये है और 10% छूट है। विक्रय मूल्य क्या होगा?",["720","740","700","760"],0,"800 का 10% = 80, इसलिए विक्रय मूल्य 720 रुपये है।"],["एक वस्तु का अंकित मूल्य 800 रुपये है और 10% छूट है। विक्रय मूल्य क्या होगा?",["700","720","760","740"],1,"800 का 10% = 80, इसलिए विक्रय मूल्य 720 रुपये है।"],["एक वस्तु का अंकित मूल्य 800 रुपये है और 10% छूट है। विक्रय मूल्य क्या होगा?",["740","760","700","720"],3,"800 का 10% = 80, इसलिए विक्रय मूल्य 720 रुपये है।"],["एक वस्तु का अंकित मूल्य 800 रुपये है और 10% छूट है। विक्रय मूल्य क्या होगा?",["700","720","760","740"],1,"800 का 10% = 80, इसलिए विक्रय मूल्य 720 रुपये है।"],["एक वस्तु का अंकित मूल्य 800 रुपये है और 10% छूट है। विक्रय मूल्य क्या होगा?",["740","720","760","700"],1,"800 का 10% = 80, इसलिए विक्रय मूल्य 720 रुपये है।"],["एक वस्तु का अंकित मूल्य 800 रुपये है और 10% छूट है। विक्रय मूल्य क्या होगा?",["700","720","740","760"],1,"800 का 10% = 80, इसलिए विक्रय मूल्य 720 रुपये है।"],["एक वस्तु का अंकित मूल्य 800 रुपये है और 10% छूट है। विक्रय मूल्य क्या होगा?",["740","700","720","760"],2,"800 का 10% = 80, इसलिए विक्रय मूल्य 720 रुपये है।"],["एक वस्तु का अंकित मूल्य 800 रुपये है और 10% छूट है। विक्रय मूल्य क्या होगा?",["740","760","720","700"],2,"800 का 10% = 80, इसलिए विक्रय मूल्य 720 रुपये है।"],["एक वस्तु का अंकित मूल्य 800 रुपये है और 10% छूट है। विक्रय मूल्य क्या होगा?",["700","740","720","760"],2,"800 का 10% = 80, इसलिए विक्रय मूल्य 720 रुपये है।"],["एक वस्तु का अंकित मूल्य 800 रुपये है और 10% छूट है। विक्रय मूल्य क्या होगा?",["740","700","720","760"],2,"800 का 10% = 80, इसलिए विक्रय मूल्य 720 रुपये है।"],["एक वस्तु का अंकित मूल्य 800 रुपये है और 10% छूट है। विक्रय मूल्य क्या होगा?",["700","740","760","720"],3,"800 का 10% = 80, इसलिए विक्रय मूल्य 720 रुपये है।"],["एक वस्तु का अंकित मूल्य 800 रुपये है और 10% छूट है। विक्रय मूल्य क्या होगा?",["760","740","720","700"],2,"800 का 10% = 80, इसलिए विक्रय मूल्य 720 रुपये है।"],["एक वस्तु का अंकित मूल्य 800 रुपये है और 10% छूट है। विक्रय मूल्य क्या होगा?",["700","740","720","760"],2,"800 का 10% = 80, इसलिए विक्रय मूल्य 720 रुपये है।"],["एक वस्तु का अंकित मूल्य 800 रुपये है और 10% छूट है। विक्रय मूल्य क्या होगा?",["760","740","720","700"],2,"800 का 10% = 80, इसलिए विक्रय मूल्य 720 रुपये है।"],["एक वस्तु का अंकित मूल्य 800 रुपये है और 10% छूट है। विक्रय मूल्य क्या होगा?",["760","700","740","720"],3,"800 का 10% = 80, इसलिए विक्रय मूल्य 720 रुपये है।"],["एक वस्तु का अंकित मूल्य 800 रुपये है और 10% छूट है। विक्रय मूल्य क्या होगा?",["740","700","760","720"],3,"800 का 10% = 80, इसलिए विक्रय मूल्य 720 रुपये है।"],["एक वस्तु का अंकित मूल्य 800 रुपये है और 10% छूट है। विक्रय मूल्य क्या होगा?",["700","760","720","740"],2,"800 का 10% = 80, इसलिए विक्रय मूल्य 720 रुपये है।"],["एक वस्तु का अंकित मूल्य 800 रुपये है और 10% छूट है। विक्रय मूल्य क्या होगा?",["760","740","720","700"],2,"800 का 10% = 80, इसलिए विक्रय मूल्य 720 रुपये है।"],["एक वस्तु का अंकित मूल्य 800 रुपये है और 10% छूट है। विक्रय मूल्य क्या होगा?",["760","700","740","720"],3,"800 का 10% = 80, इसलिए विक्रय मूल्य 720 रुपये है।"],["एक वस्तु का अंकित मूल्य 800 रुपये है और 10% छूट है। विक्रय मूल्य क्या होगा?",["760","700","720","740"],2,"800 का 10% = 80, इसलिए विक्रय मूल्य 720 रुपये है।"]],"Reasoning":[["एक व्यक्ति उत्तर की ओर 10 m चलता है, फिर दाएँ मुड़कर 5 m चलता है। वह प्रारंभिक स्थान से किस दिशा में है?",["उत्तर-पश्चिम","उत्तर-पूर्व","दक्षिण-पश्चिम","दक्षिण-पूर्व"],1,"उत्तर के बाद दाएँ मुड़ने पर पूर्व दिशा आती है; स्थिति उत्तर-पूर्व है।"],["एक व्यक्ति उत्तर की ओर 10 m चलता है, फिर दाएँ मुड़कर 5 m चलता है। वह प्रारंभिक स्थान से किस दिशा में है?",["उत्तर-पूर्व","उत्तर-पश्चिम","दक्षिण-पूर्व","दक्षिण-पश्चिम"],0,"उत्तर के बाद दाएँ मुड़ने पर पूर्व दिशा आती है; स्थिति उत्तर-पूर्व है।"],["एक व्यक्ति उत्तर की ओर 10 m चलता है, फिर दाएँ मुड़कर 5 m चलता है। वह प्रारंभिक स्थान से किस दिशा में है?",["दक्षिण-पूर्व","उत्तर-पश्चिम","दक्षिण-पश्चिम","उत्तर-पूर्व"],3,"उत्तर के बाद दाएँ मुड़ने पर पूर्व दिशा आती है; स्थिति उत्तर-पूर्व है।"],["एक व्यक्ति उत्तर की ओर 10 m चलता है, फिर दाएँ मुड़कर 5 m चलता है। वह प्रारंभिक स्थान से किस दिशा में है?",["उत्तर-पश्चिम","दक्षिण-पूर्व","दक्षिण-पश्चिम","उत्तर-पूर्व"],3,"उत्तर के बाद दाएँ मुड़ने पर पूर्व दिशा आती है; स्थिति उत्तर-पूर्व है।"],["एक व्यक्ति उत्तर की ओर 10 m चलता है, फिर दाएँ मुड़कर 5 m चलता है। वह प्रारंभिक स्थान से किस दिशा में है?",["दक्षिण-पश्चिम","दक्षिण-पूर्व","उत्तर-पश्चिम","उत्तर-पूर्व"],3,"उत्तर के बाद दाएँ मुड़ने पर पूर्व दिशा आती है; स्थिति उत्तर-पूर्व है।"],["एक व्यक्ति उत्तर की ओर 10 m चलता है, फिर दाएँ मुड़कर 5 m चलता है। वह प्रारंभिक स्थान से किस दिशा में है?",["उत्तर-पूर्व","दक्षिण-पूर्व","दक्षिण-पश्चिम","उत्तर-पश्चिम"],0,"उत्तर के बाद दाएँ मुड़ने पर पूर्व दिशा आती है; स्थिति उत्तर-पूर्व है।"],["एक व्यक्ति उत्तर की ओर 10 m चलता है, फिर दाएँ मुड़कर 5 m चलता है। वह प्रारंभिक स्थान से किस दिशा में है?",["दक्षिण-पूर्व","दक्षिण-पश्चिम","उत्तर-पूर्व","उत्तर-पश्चिम"],2,"उत्तर के बाद दाएँ मुड़ने पर पूर्व दिशा आती है; स्थिति उत्तर-पूर्व है।"],["एक व्यक्ति उत्तर की ओर 10 m चलता है, फिर दाएँ मुड़कर 5 m चलता है। वह प्रारंभिक स्थान से किस दिशा में है?",["दक्षिण-पश्चिम","दक्षिण-पूर्व","उत्तर-पूर्व","उत्तर-पश्चिम"],2,"उत्तर के बाद दाएँ मुड़ने पर पूर्व दिशा आती है; स्थिति उत्तर-पूर्व है।"],["एक व्यक्ति उत्तर की ओर 10 m चलता है, फिर दाएँ मुड़कर 5 m चलता है। वह प्रारंभिक स्थान से किस दिशा में है?",["दक्षिण-पश्चिम","उत्तर-पूर्व","दक्षिण-पूर्व","उत्तर-पश्चिम"],1,"उत्तर के बाद दाएँ मुड़ने पर पूर्व दिशा आती है; स्थिति उत्तर-पूर्व है।"],["एक व्यक्ति उत्तर की ओर 10 m चलता है, फिर दाएँ मुड़कर 5 m चलता है। वह प्रारंभिक स्थान से किस दिशा में है?",["उत्तर-पूर्व","उत्तर-पश्चिम","दक्षिण-पश्चिम","दक्षिण-पूर्व"],0,"उत्तर के बाद दाएँ मुड़ने पर पूर्व दिशा आती है; स्थिति उत्तर-पूर्व है।"],["एक व्यक्ति उत्तर की ओर 10 m चलता है, फिर दाएँ मुड़कर 5 m चलता है। वह प्रारंभिक स्थान से किस दिशा में है?",["दक्षिण-पश्चिम","उत्तर-पूर्व","उत्तर-पश्चिम","दक्षिण-पूर्व"],1,"उत्तर के बाद दाएँ मुड़ने पर पूर्व दिशा आती है; स्थिति उत्तर-पूर्व है।"],["एक व्यक्ति उत्तर की ओर 10 m चलता है, फिर दाएँ मुड़कर 5 m चलता है। वह प्रारंभिक स्थान से किस दिशा में है?",["दक्षिण-पश्चिम","उत्तर-पश्चिम","दक्षिण-पूर्व","उत्तर-पूर्व"],3,"उत्तर के बाद दाएँ मुड़ने पर पूर्व दिशा आती है; स्थिति उत्तर-पूर्व है।"],["एक व्यक्ति उत्तर की ओर 10 m चलता है, फिर दाएँ मुड़कर 5 m चलता है। वह प्रारंभिक स्थान से किस दिशा में है?",["उत्तर-पूर्व","दक्षिण-पूर्व","दक्षिण-पश्चिम","उत्तर-पश्चिम"],0,"उत्तर के बाद दाएँ मुड़ने पर पूर्व दिशा आती है; स्थिति उत्तर-पूर्व है।"],["एक व्यक्ति उत्तर की ओर 10 m चलता है, फिर दाएँ मुड़कर 5 m चलता है। वह प्रारंभिक स्थान से किस दिशा में है?",["उत्तर-पूर्व","उत्तर-पश्चिम","दक्षिण-पश्चिम","दक्षिण-पूर्व"],0,"उत्तर के बाद दाएँ मुड़ने पर पूर्व दिशा आती है; स्थिति उत्तर-पूर्व है।"],["एक व्यक्ति उत्तर की ओर 10 m चलता है, फिर दाएँ मुड़कर 5 m चलता है। वह प्रारंभिक स्थान से किस दिशा में है?",["दक्षिण-पश्चिम","दक्षिण-पूर्व","उत्तर-पूर्व","उत्तर-पश्चिम"],2,"उत्तर के बाद दाएँ मुड़ने पर पूर्व दिशा आती है; स्थिति उत्तर-पूर्व है।"],["एक व्यक्ति उत्तर की ओर 10 m चलता है, फिर दाएँ मुड़कर 5 m चलता है। वह प्रारंभिक स्थान से किस दिशा में है?",["उत्तर-पश्चिम","दक्षिण-पश्चिम","उत्तर-पूर्व","दक्षिण-पूर्व"],2,"उत्तर के बाद दाएँ मुड़ने पर पूर्व दिशा आती है; स्थिति उत्तर-पूर्व है।"],["एक व्यक्ति उत्तर की ओर 10 m चलता है, फिर दाएँ मुड़कर 5 m चलता है। वह प्रारंभिक स्थान से किस दिशा में है?",["दक्षिण-पूर्व","दक्षिण-पश्चिम","उत्तर-पश्चिम","उत्तर-पूर्व"],3,"उत्तर के बाद दाएँ मुड़ने पर पूर्व दिशा आती है; स्थिति उत्तर-पूर्व है।"],["एक व्यक्ति उत्तर की ओर 10 m चलता है, फिर दाएँ मुड़कर 5 m चलता है। वह प्रारंभिक स्थान से किस दिशा में है?",["उत्तर-पूर्व","उत्तर-पश्चिम","दक्षिण-पूर्व","दक्षिण-पश्चिम"],0,"उत्तर के बाद दाएँ मुड़ने पर पूर्व दिशा आती है; स्थिति उत्तर-पूर्व है।"],["एक व्यक्ति उत्तर की ओर 10 m चलता है, फिर दाएँ मुड़कर 5 m चलता है। वह प्रारंभिक स्थान से किस दिशा में है?",["उत्तर-पूर्व","दक्षिण-पूर्व","उत्तर-पश्चिम","दक्षिण-पश्चिम"],0,"उत्तर के बाद दाएँ मुड़ने पर पूर्व दिशा आती है; स्थिति उत्तर-पूर्व है।"],["एक व्यक्ति उत्तर की ओर 10 m चलता है, फिर दाएँ मुड़कर 5 m चलता है। वह प्रारंभिक स्थान से किस दिशा में है?",["उत्तर-पश्चिम","दक्षिण-पश्चिम","उत्तर-पूर्व","दक्षिण-पूर्व"],2,"उत्तर के बाद दाएँ मुड़ने पर पूर्व दिशा आती है; स्थिति उत्तर-पूर्व है।"]],"Hindi":[["‘जो मेहनत करता है, वह सफल होता है।’ यह कौन सा वाक्य है?",["मिश्र","संयुक्त","सरल","विस्मयादिबोधक"],0,"इसमें एक प्रधान और एक आश्रित उपवाक्य है, इसलिए मिश्र वाक्य है।"],["‘जो मेहनत करता है, वह सफल होता है।’ यह कौन सा वाक्य है?",["मिश्र","सरल","संयुक्त","विस्मयादिबोधक"],0,"इसमें एक प्रधान और एक आश्रित उपवाक्य है, इसलिए मिश्र वाक्य है।"],["‘जो मेहनत करता है, वह सफल होता है।’ यह कौन सा वाक्य है?",["विस्मयादिबोधक","मिश्र","सरल","संयुक्त"],1,"इसमें एक प्रधान और एक आश्रित उपवाक्य है, इसलिए मिश्र वाक्य है।"],["‘जो मेहनत करता है, वह सफल होता है।’ यह कौन सा वाक्य है?",["सरल","संयुक्त","विस्मयादिबोधक","मिश्र"],3,"इसमें एक प्रधान और एक आश्रित उपवाक्य है, इसलिए मिश्र वाक्य है।"],["‘जो मेहनत करता है, वह सफल होता है।’ यह कौन सा वाक्य है?",["मिश्र","संयुक्त","सरल","विस्मयादिबोधक"],0,"इसमें एक प्रधान और एक आश्रित उपवाक्य है, इसलिए मिश्र वाक्य है।"],["‘जो मेहनत करता है, वह सफल होता है।’ यह कौन सा वाक्य है?",["मिश्र","संयुक्त","विस्मयादिबोधक","सरल"],0,"इसमें एक प्रधान और एक आश्रित उपवाक्य है, इसलिए मिश्र वाक्य है।"],["‘जो मेहनत करता है, वह सफल होता है।’ यह कौन सा वाक्य है?",["सरल","विस्मयादिबोधक","संयुक्त","मिश्र"],3,"इसमें एक प्रधान और एक आश्रित उपवाक्य है, इसलिए मिश्र वाक्य है।"],["‘जो मेहनत करता है, वह सफल होता है।’ यह कौन सा वाक्य है?",["सरल","विस्मयादिबोधक","मिश्र","संयुक्त"],2,"इसमें एक प्रधान और एक आश्रित उपवाक्य है, इसलिए मिश्र वाक्य है।"],["‘जो मेहनत करता है, वह सफल होता है।’ यह कौन सा वाक्य है?",["मिश्र","विस्मयादिबोधक","सरल","संयुक्त"],0,"इसमें एक प्रधान और एक आश्रित उपवाक्य है, इसलिए मिश्र वाक्य है।"],["‘जो मेहनत करता है, वह सफल होता है।’ यह कौन सा वाक्य है?",["मिश्र","संयुक्त","सरल","विस्मयादिबोधक"],0,"इसमें एक प्रधान और एक आश्रित उपवाक्य है, इसलिए मिश्र वाक्य है।"],["‘जो मेहनत करता है, वह सफल होता है।’ यह कौन सा वाक्य है?",["सरल","संयुक्त","मिश्र","विस्मयादिबोधक"],2,"इसमें एक प्रधान और एक आश्रित उपवाक्य है, इसलिए मिश्र वाक्य है।"],["‘जो मेहनत करता है, वह सफल होता है।’ यह कौन सा वाक्य है?",["मिश्र","संयुक्त","विस्मयादिबोधक","सरल"],0,"इसमें एक प्रधान और एक आश्रित उपवाक्य है, इसलिए मिश्र वाक्य है।"],["‘जो मेहनत करता है, वह सफल होता है।’ यह कौन सा वाक्य है?",["विस्मयादिबोधक","संयुक्त","सरल","मिश्र"],3,"इसमें एक प्रधान और एक आश्रित उपवाक्य है, इसलिए मिश्र वाक्य है।"],["‘जो मेहनत करता है, वह सफल होता है।’ यह कौन सा वाक्य है?",["विस्मयादिबोधक","संयुक्त","सरल","मिश्र"],3,"इसमें एक प्रधान और एक आश्रित उपवाक्य है, इसलिए मिश्र वाक्य है।"],["‘जो मेहनत करता है, वह सफल होता है।’ यह कौन सा वाक्य है?",["मिश्र","संयुक्त","विस्मयादिबोधक","सरल"],0,"इसमें एक प्रधान और एक आश्रित उपवाक्य है, इसलिए मिश्र वाक्य है।"],["‘जो मेहनत करता है, वह सफल होता है।’ यह कौन सा वाक्य है?",["संयुक्त","विस्मयादिबोधक","सरल","मिश्र"],3,"इसमें एक प्रधान और एक आश्रित उपवाक्य है, इसलिए मिश्र वाक्य है।"],["‘जो मेहनत करता है, वह सफल होता है।’ यह कौन सा वाक्य है?",["मिश्र","सरल","संयुक्त","विस्मयादिबोधक"],0,"इसमें एक प्रधान और एक आश्रित उपवाक्य है, इसलिए मिश्र वाक्य है।"],["‘जो मेहनत करता है, वह सफल होता है।’ यह कौन सा वाक्य है?",["मिश्र","संयुक्त","सरल","विस्मयादिबोधक"],0,"इसमें एक प्रधान और एक आश्रित उपवाक्य है, इसलिए मिश्र वाक्य है।"],["‘जो मेहनत करता है, वह सफल होता है।’ यह कौन सा वाक्य है?",["संयुक्त","मिश्र","सरल","विस्मयादिबोधक"],1,"इसमें एक प्रधान और एक आश्रित उपवाक्य है, इसलिए मिश्र वाक्य है।"],["‘जो मेहनत करता है, वह सफल होता है।’ यह कौन सा वाक्य है?",["सरल","संयुक्त","विस्मयादिबोधक","मिश्र"],3,"इसमें एक प्रधान और एक आश्रित उपवाक्य है, इसलिए मिश्र वाक्य है।"]],"English":[["Choose the correct conjunction: “I was tired ___ I continued working.”",["so","but","or","because"],1,"But connects two contrasting ideas."],["Choose the correct conjunction: “I was tired ___ I continued working.”",["so","because","but","or"],2,"But connects two contrasting ideas."],["Choose the correct conjunction: “I was tired ___ I continued working.”",["because","or","but","so"],2,"But connects two contrasting ideas."],["Choose the correct conjunction: “I was tired ___ I continued working.”",["so","but","or","because"],1,"But connects two contrasting ideas."],["Choose the correct conjunction: “I was tired ___ I continued working.”",["or","because","so","but"],3,"But connects two contrasting ideas."],["Choose the correct conjunction: “I was tired ___ I continued working.”",["or","but","so","because"],1,"But connects two contrasting ideas."],["Choose the correct conjunction: “I was tired ___ I continued working.”",["because","so","but","or"],2,"But connects two contrasting ideas."],["Choose the correct conjunction: “I was tired ___ I continued working.”",["but","or","because","so"],0,"But connects two contrasting ideas."],["Choose the correct conjunction: “I was tired ___ I continued working.”",["but","so","because","or"],0,"But connects two contrasting ideas."],["Choose the correct conjunction: “I was tired ___ I continued working.”",["or","but","because","so"],1,"But connects two contrasting ideas."],["Choose the correct conjunction: “I was tired ___ I continued working.”",["or","but","so","because"],1,"But connects two contrasting ideas."],["Choose the correct conjunction: “I was tired ___ I continued working.”",["because","or","so","but"],3,"But connects two contrasting ideas."],["Choose the correct conjunction: “I was tired ___ I continued working.”",["so","but","because","or"],1,"But connects two contrasting ideas."],["Choose the correct conjunction: “I was tired ___ I continued working.”",["or","so","but","because"],2,"But connects two contrasting ideas."],["Choose the correct conjunction: “I was tired ___ I continued working.”",["because","or","so","but"],3,"But connects two contrasting ideas."],["Choose the correct conjunction: “I was tired ___ I continued working.”",["or","so","because","but"],3,"But connects two contrasting ideas."],["Choose the correct conjunction: “I was tired ___ I continued working.”",["so","or","but","because"],2,"But connects two contrasting ideas."],["Choose the correct conjunction: “I was tired ___ I continued working.”",["because","or","but","so"],2,"But connects two contrasting ideas."],["Choose the correct conjunction: “I was tired ___ I continued working.”",["because","or","so","but"],3,"But connects two contrasting ideas."],["Choose the correct conjunction: “I was tired ___ I continued working.”",["because","but","or","so"],1,"But connects two contrasting ideas."]],"Economics":[["भारत में राष्ट्रीय आय के आधिकारिक अनुमान से संबंधित प्रमुख संस्था कौन सी है?",["SEBI","RBI केवल","NSO","UPSC"],2,"राष्ट्रीय सांख्यिकी कार्यालय (NSO) राष्ट्रीय आय के आंकड़ों से संबंधित प्रमुख संस्था है।"],["भारत में राष्ट्रीय आय के आधिकारिक अनुमान से संबंधित प्रमुख संस्था कौन सी है?",["NSO","SEBI","RBI केवल","UPSC"],0,"राष्ट्रीय सांख्यिकी कार्यालय (NSO) राष्ट्रीय आय के आंकड़ों से संबंधित प्रमुख संस्था है।"],["भारत में राष्ट्रीय आय के आधिकारिक अनुमान से संबंधित प्रमुख संस्था कौन सी है?",["NSO","RBI केवल","SEBI","UPSC"],0,"राष्ट्रीय सांख्यिकी कार्यालय (NSO) राष्ट्रीय आय के आंकड़ों से संबंधित प्रमुख संस्था है।"],["भारत में राष्ट्रीय आय के आधिकारिक अनुमान से संबंधित प्रमुख संस्था कौन सी है?",["NSO","SEBI","UPSC","RBI केवल"],0,"राष्ट्रीय सांख्यिकी कार्यालय (NSO) राष्ट्रीय आय के आंकड़ों से संबंधित प्रमुख संस्था है।"],["भारत में राष्ट्रीय आय के आधिकारिक अनुमान से संबंधित प्रमुख संस्था कौन सी है?",["NSO","SEBI","UPSC","RBI केवल"],0,"राष्ट्रीय सांख्यिकी कार्यालय (NSO) राष्ट्रीय आय के आंकड़ों से संबंधित प्रमुख संस्था है।"],["भारत में राष्ट्रीय आय के आधिकारिक अनुमान से संबंधित प्रमुख संस्था कौन सी है?",["RBI केवल","SEBI","NSO","UPSC"],2,"राष्ट्रीय सांख्यिकी कार्यालय (NSO) राष्ट्रीय आय के आंकड़ों से संबंधित प्रमुख संस्था है।"],["भारत में राष्ट्रीय आय के आधिकारिक अनुमान से संबंधित प्रमुख संस्था कौन सी है?",["SEBI","UPSC","RBI केवल","NSO"],3,"राष्ट्रीय सांख्यिकी कार्यालय (NSO) राष्ट्रीय आय के आंकड़ों से संबंधित प्रमुख संस्था है।"],["भारत में राष्ट्रीय आय के आधिकारिक अनुमान से संबंधित प्रमुख संस्था कौन सी है?",["RBI केवल","NSO","UPSC","SEBI"],1,"राष्ट्रीय सांख्यिकी कार्यालय (NSO) राष्ट्रीय आय के आंकड़ों से संबंधित प्रमुख संस्था है।"],["भारत में राष्ट्रीय आय के आधिकारिक अनुमान से संबंधित प्रमुख संस्था कौन सी है?",["SEBI","UPSC","RBI केवल","NSO"],3,"राष्ट्रीय सांख्यिकी कार्यालय (NSO) राष्ट्रीय आय के आंकड़ों से संबंधित प्रमुख संस्था है।"],["भारत में राष्ट्रीय आय के आधिकारिक अनुमान से संबंधित प्रमुख संस्था कौन सी है?",["UPSC","SEBI","NSO","RBI केवल"],2,"राष्ट्रीय सांख्यिकी कार्यालय (NSO) राष्ट्रीय आय के आंकड़ों से संबंधित प्रमुख संस्था है।"],["भारत में राष्ट्रीय आय के आधिकारिक अनुमान से संबंधित प्रमुख संस्था कौन सी है?",["SEBI","NSO","RBI केवल","UPSC"],1,"राष्ट्रीय सांख्यिकी कार्यालय (NSO) राष्ट्रीय आय के आंकड़ों से संबंधित प्रमुख संस्था है।"],["भारत में राष्ट्रीय आय के आधिकारिक अनुमान से संबंधित प्रमुख संस्था कौन सी है?",["UPSC","NSO","RBI केवल","SEBI"],1,"राष्ट्रीय सांख्यिकी कार्यालय (NSO) राष्ट्रीय आय के आंकड़ों से संबंधित प्रमुख संस्था है।"],["भारत में राष्ट्रीय आय के आधिकारिक अनुमान से संबंधित प्रमुख संस्था कौन सी है?",["SEBI","UPSC","NSO","RBI केवल"],2,"राष्ट्रीय सांख्यिकी कार्यालय (NSO) राष्ट्रीय आय के आंकड़ों से संबंधित प्रमुख संस्था है।"],["भारत में राष्ट्रीय आय के आधिकारिक अनुमान से संबंधित प्रमुख संस्था कौन सी है?",["NSO","RBI केवल","SEBI","UPSC"],0,"राष्ट्रीय सांख्यिकी कार्यालय (NSO) राष्ट्रीय आय के आंकड़ों से संबंधित प्रमुख संस्था है।"],["भारत में राष्ट्रीय आय के आधिकारिक अनुमान से संबंधित प्रमुख संस्था कौन सी है?",["UPSC","RBI केवल","SEBI","NSO"],3,"राष्ट्रीय सांख्यिकी कार्यालय (NSO) राष्ट्रीय आय के आंकड़ों से संबंधित प्रमुख संस्था है।"],["भारत में राष्ट्रीय आय के आधिकारिक अनुमान से संबंधित प्रमुख संस्था कौन सी है?",["UPSC","SEBI","NSO","RBI केवल"],2,"राष्ट्रीय सांख्यिकी कार्यालय (NSO) राष्ट्रीय आय के आंकड़ों से संबंधित प्रमुख संस्था है।"],["भारत में राष्ट्रीय आय के आधिकारिक अनुमान से संबंधित प्रमुख संस्था कौन सी है?",["UPSC","SEBI","NSO","RBI केवल"],2,"राष्ट्रीय सांख्यिकी कार्यालय (NSO) राष्ट्रीय आय के आंकड़ों से संबंधित प्रमुख संस्था है।"],["भारत में राष्ट्रीय आय के आधिकारिक अनुमान से संबंधित प्रमुख संस्था कौन सी है?",["NSO","UPSC","SEBI","RBI केवल"],0,"राष्ट्रीय सांख्यिकी कार्यालय (NSO) राष्ट्रीय आय के आंकड़ों से संबंधित प्रमुख संस्था है।"],["भारत में राष्ट्रीय आय के आधिकारिक अनुमान से संबंधित प्रमुख संस्था कौन सी है?",["SEBI","RBI केवल","UPSC","NSO"],3,"राष्ट्रीय सांख्यिकी कार्यालय (NSO) राष्ट्रीय आय के आंकड़ों से संबंधित प्रमुख संस्था है।"],["भारत में राष्ट्रीय आय के आधिकारिक अनुमान से संबंधित प्रमुख संस्था कौन सी है?",["UPSC","SEBI","RBI केवल","NSO"],3,"राष्ट्रीय सांख्यिकी कार्यालय (NSO) राष्ट्रीय आय के आंकड़ों से संबंधित प्रमुख संस्था है।"]],"Indian Art & Culture":[["भरतनाट्यम किस राज्य की प्रमुख शास्त्रीय नृत्य शैली है?",["असम","तमिलनाडु","ओडिशा","केरल"],1,"भरतनाट्यम तमिलनाडु से संबंधित शास्त्रीय नृत्य शैली है।"],["भरतनाट्यम किस राज्य की प्रमुख शास्त्रीय नृत्य शैली है?",["ओडिशा","तमिलनाडु","असम","केरल"],1,"भरतनाट्यम तमिलनाडु से संबंधित शास्त्रीय नृत्य शैली है।"],["भरतनाट्यम किस राज्य की प्रमुख शास्त्रीय नृत्य शैली है?",["तमिलनाडु","ओडिशा","असम","केरल"],0,"भरतनाट्यम तमिलनाडु से संबंधित शास्त्रीय नृत्य शैली है।"],["भरतनाट्यम किस राज्य की प्रमुख शास्त्रीय नृत्य शैली है?",["ओडिशा","तमिलनाडु","असम","केरल"],1,"भरतनाट्यम तमिलनाडु से संबंधित शास्त्रीय नृत्य शैली है।"],["भरतनाट्यम किस राज्य की प्रमुख शास्त्रीय नृत्य शैली है?",["असम","तमिलनाडु","केरल","ओडिशा"],1,"भरतनाट्यम तमिलनाडु से संबंधित शास्त्रीय नृत्य शैली है।"],["भरतनाट्यम किस राज्य की प्रमुख शास्त्रीय नृत्य शैली है?",["असम","ओडिशा","तमिलनाडु","केरल"],2,"भरतनाट्यम तमिलनाडु से संबंधित शास्त्रीय नृत्य शैली है।"],["भरतनाट्यम किस राज्य की प्रमुख शास्त्रीय नृत्य शैली है?",["केरल","ओडिशा","असम","तमिलनाडु"],3,"भरतनाट्यम तमिलनाडु से संबंधित शास्त्रीय नृत्य शैली है।"],["भरतनाट्यम किस राज्य की प्रमुख शास्त्रीय नृत्य शैली है?",["केरल","ओडिशा","तमिलनाडु","असम"],2,"भरतनाट्यम तमिलनाडु से संबंधित शास्त्रीय नृत्य शैली है।"],["भरतनाट्यम किस राज्य की प्रमुख शास्त्रीय नृत्य शैली है?",["केरल","ओडिशा","असम","तमिलनाडु"],3,"भरतनाट्यम तमिलनाडु से संबंधित शास्त्रीय नृत्य शैली है।"],["भरतनाट्यम किस राज्य की प्रमुख शास्त्रीय नृत्य शैली है?",["ओडिशा","तमिलनाडु","असम","केरल"],1,"भरतनाट्यम तमिलनाडु से संबंधित शास्त्रीय नृत्य शैली है।"],["भरतनाट्यम किस राज्य की प्रमुख शास्त्रीय नृत्य शैली है?",["तमिलनाडु","असम","ओडिशा","केरल"],0,"भरतनाट्यम तमिलनाडु से संबंधित शास्त्रीय नृत्य शैली है।"],["भरतनाट्यम किस राज्य की प्रमुख शास्त्रीय नृत्य शैली है?",["तमिलनाडु","ओडिशा","असम","केरल"],0,"भरतनाट्यम तमिलनाडु से संबंधित शास्त्रीय नृत्य शैली है।"],["भरतनाट्यम किस राज्य की प्रमुख शास्त्रीय नृत्य शैली है?",["असम","ओडिशा","तमिलनाडु","केरल"],2,"भरतनाट्यम तमिलनाडु से संबंधित शास्त्रीय नृत्य शैली है।"],["भरतनाट्यम किस राज्य की प्रमुख शास्त्रीय नृत्य शैली है?",["केरल","ओडिशा","असम","तमिलनाडु"],3,"भरतनाट्यम तमिलनाडु से संबंधित शास्त्रीय नृत्य शैली है।"],["भरतनाट्यम किस राज्य की प्रमुख शास्त्रीय नृत्य शैली है?",["असम","ओडिशा","केरल","तमिलनाडु"],3,"भरतनाट्यम तमिलनाडु से संबंधित शास्त्रीय नृत्य शैली है।"],["भरतनाट्यम किस राज्य की प्रमुख शास्त्रीय नृत्य शैली है?",["असम","तमिलनाडु","केरल","ओडिशा"],1,"भरतनाट्यम तमिलनाडु से संबंधित शास्त्रीय नृत्य शैली है।"],["भरतनाट्यम किस राज्य की प्रमुख शास्त्रीय नृत्य शैली है?",["असम","केरल","ओडिशा","तमिलनाडु"],3,"भरतनाट्यम तमिलनाडु से संबंधित शास्त्रीय नृत्य शैली है।"],["भरतनाट्यम किस राज्य की प्रमुख शास्त्रीय नृत्य शैली है?",["असम","केरल","तमिलनाडु","ओडिशा"],2,"भरतनाट्यम तमिलनाडु से संबंधित शास्त्रीय नृत्य शैली है।"],["भरतनाट्यम किस राज्य की प्रमुख शास्त्रीय नृत्य शैली है?",["असम","ओडिशा","तमिलनाडु","केरल"],2,"भरतनाट्यम तमिलनाडु से संबंधित शास्त्रीय नृत्य शैली है।"],["भरतनाट्यम किस राज्य की प्रमुख शास्त्रीय नृत्य शैली है?",["केरल","असम","ओडिशा","तमिलनाडु"],3,"भरतनाट्यम तमिलनाडु से संबंधित शास्त्रीय नृत्य शैली है।"]]};
Object.keys(quiz3V12).forEach(subject => { quizSets[subject][3] = quiz3V12[subject]; });
const quiz4V12={"GK":[["भारतीय अंतरिक्ष अनुसंधान संगठन का संक्षिप्त नाम क्या है?",["BARC","CSIR","ISRO","DRDO"],2,"Indian Space Research Organisation का संक्षिप्त नाम ISRO है।"],["भारत का सर्वोच्च शांतिकालीन वीरता पुरस्कार कौन सा है?",["अशोक चक्र","कीर्ति चक्र","शौर्य चक्र","परमवीर चक्र"],0,"अशोक चक्र सर्वोच्च शांतिकालीन वीरता पुरस्कार है।"],["भारत का सर्वोच्च युद्धकालीन वीरता पुरस्कार कौन सा है?",["परमवीर चक्र","वीर चक्र","महावीर चक्र","अशोक चक्र"],0,"परमवीर चक्र सर्वोच्च युद्धकालीन वीरता पुरस्कार है।"],["भारत का राष्ट्रीय कैलेंडर किस संवत पर आधारित है?",["शक संवत","विक्रम संवत","हिजरी संवत","बौद्ध संवत"],0,"भारत का राष्ट्रीय कैलेंडर शक संवत पर आधारित है।"],["भारत का राष्ट्रीय चिन्ह किससे लिया गया है?",["सांची स्तूप","कुतुब मीनार","कोणार्क मंदिर","सारनाथ का सिंह स्तंभ"],3,"राष्ट्रीय चिन्ह सारनाथ के अशोक सिंह स्तंभ के शीर्ष से लिया गया है।"],["भारत का सबसे बड़ा नागरिक सम्मान कौन सा है?",["पद्म श्री","पद्म विभूषण","भारत रत्न","पद्म भूषण"],2,"भारत रत्न भारत का सर्वोच्च नागरिक सम्मान है।"],["भारतीय राष्ट्रीय ध्वज में कितने रंग हैं?",["5","4","2","3"],3,"राष्ट्रीय ध्वज में तीन मुख्य रंग हैं।"],["भारतीय राष्ट्रीय गान के रचयिता कौन हैं?",["बंकिमचंद्र चट्टोपाध्याय","रवींद्रनाथ टैगोर","महादेवी वर्मा","सरोजिनी नायडू"],1,"जन गण मन के रचयिता रवींद्रनाथ टैगोर हैं।"],["राज्यसभा को किस नाम से भी जाना जाता है?",["जनसभा","लोक परिषद","उच्च सदन","निचला सदन"],2,"राज्यसभा संसद का उच्च सदन है।"],["भारत में कितने केंद्र शासित प्रदेश हैं?",["8","9","7","6"],0,"भारत में 8 केंद्र शासित प्रदेश हैं।"],["लोकसभा को किस नाम से भी जाना जाता है?",["उच्च सदन","राज्य परिषद","संघ परिषद","निचला सदन"],3,"लोकसभा संसद का निचला सदन है।"],["भारतीय राष्ट्रीय गीत का नाम क्या है?",["वंदे मातरम्","सारे जहाँ से अच्छा","जन गण मन","ऐ मेरे वतन"],0,"वंदे मातरम् भारत का राष्ट्रीय गीत है।"],["भारत का राष्ट्रीय जलीय जीव कौन है?",["मगरमच्छ","व्हेल","कछुआ","गंगा डॉल्फिन"],3,"गंगा नदी की डॉल्फिन भारत का राष्ट्रीय जलीय जीव है।"],["भारत का राष्ट्रीय वृक्ष कौन सा है?",["नीम","पीपल","आम","बरगद"],3,"बरगद भारत का राष्ट्रीय वृक्ष है।"],["भारत का राष्ट्रीय फूल कौन सा है?",["चमेली","गेंदा","कमल","गुलाब"],2,"भारत का राष्ट्रीय फूल कमल है।"],["भारत का राष्ट्रीय पक्षी कौन है?",["मोर","गरुड़","तोता","हंस"],0,"भारत का राष्ट्रीय पक्षी भारतीय मोर है।"],["भारत का राष्ट्रीय फल कौन सा है?",["केला","अमरूद","आम","सेब"],2,"आम भारत का राष्ट्रीय फल माना जाता है।"],["भारत का पहला उपग्रह कौन सा था?",["भास्कर","रोहिणी","आर्यभट्ट","इनसैट-1A"],2,"आर्यभट्ट भारत का पहला उपग्रह था।"],["भारत की संसद के कितने सदन हैं?",["तीन","एक","दो","चार"],2,"भारतीय संसद के दो सदन हैं—लोकसभा और राज्यसभा।"],["भारत का राष्ट्रीय पशु कौन है?",["हाथी","मोर","सिंह","बाघ"],3,"भारत का राष्ट्रीय पशु बाघ है।"]],"History":[["भारतीय राष्ट्रीय कांग्रेस के प्रथम अध्यक्ष कौन थे?",["डब्ल्यू. सी. बनर्जी","ए. ओ. ह्यूम","गोपाल कृष्ण गोखले","दादाभाई नौरोजी"],0,"1885 में कांग्रेस के प्रथम अध्यक्ष डब्ल्यू. सी. बनर्जी थे।"],["सिंधु घाटी सभ्यता का प्रसिद्ध बंदरगाह कौन सा था?",["मोहनजोदड़ो","हड़प्पा","कालीबंगा","लोथल"],3,"लोथल एक प्रमुख प्राचीन बंदरगाह स्थल था।"],["अशोक ने कलिंग युद्ध के बाद किस धर्म को अपनाया?",["बौद्ध धर्म","इस्लाम","सिख धर्म","जैन धर्म"],0,"कलिंग युद्ध के बाद अशोक बौद्ध धर्म से प्रभावित हुए।"],["गुप्त काल को प्रायः किस नाम से जाना जाता है?",["लौह युग","औद्योगिक युग","पाषाण युग","स्वर्ण युग"],3,"गुप्त काल को भारतीय इतिहास का स्वर्ण युग कहा जाता है।"],["भारतीय राष्ट्रीय कांग्रेस की स्थापना कब हुई?",["1885","1942","1905","1919"],0,"भारतीय राष्ट्रीय कांग्रेस की स्थापना 1885 में हुई।"],["1857 का विद्रोह सबसे पहले कहाँ से शुरू हुआ?",["मेरठ","झाँसी","दिल्ली","कानपुर"],0,"1857 का विद्रोह 10 मई को मेरठ से शुरू हुआ।"],["बौद्ध धर्म के संस्थापक कौन माने जाते हैं?",["अशोक","महावीर","नागार्जुन","गौतम बुद्ध"],3,"बौद्ध धर्म के संस्थापक गौतम बुद्ध माने जाते हैं।"],["कुतुब मीनार का निर्माण किसने शुरू कराया?",["इल्तुतमिश","अलाउद्दीन खिलजी","कुतुबुद्दीन ऐबक","बलबन"],2,"कुतुबुद्दीन ऐबक ने कुतुब मीनार का निर्माण शुरू कराया।"],["मोहनजोदड़ो वर्तमान में किस देश में है?",["भारत","अफगानिस्तान","नेपाल","पाकिस्तान"],3,"मोहनजोदड़ो वर्तमान पाकिस्तान में स्थित है।"],["जलियांवाला बाग हत्याकांड किस वर्ष हुआ?",["1905","1922","1930","1919"],3,"जलियांवाला बाग हत्याकांड 1919 में हुआ।"],["भारत छोड़ो आंदोलन किस वर्ष शुरू हुआ?",["1940","1942","1930","1947"],1,"भारत छोड़ो आंदोलन अगस्त 1942 में शुरू हुआ।"],["दांडी मार्च किस आंदोलन से जुड़ा था?",["भारत छोड़ो आंदोलन","सविनय अवज्ञा आंदोलन","असहयोग आंदोलन","स्वदेशी आंदोलन"],1,"दांडी मार्च 1930 के सविनय अवज्ञा आंदोलन से जुड़ा था।"],["मौर्य साम्राज्य के संस्थापक कौन थे?",["बिंदुसार","अशोक","कनिष्क","चंद्रगुप्त मौर्य"],3,"चंद्रगुप्त मौर्य ने मौर्य साम्राज्य की स्थापना की।"],["जैन धर्म के 24वें तीर्थंकर कौन थे?",["पार्श्वनाथ","महावीर","ऋषभदेव","नेमिनाथ"],1,"महावीर जैन धर्म के 24वें तीर्थंकर थे।"],["मुगल साम्राज्य का संस्थापक कौन था?",["हुमायूँ","अकबर","शाहजहाँ","बाबर"],3,"बाबर ने 1526 में मुगल साम्राज्य की स्थापना की।"],["हड़प्पा स्थल किस नदी के तट पर था?",["रावी","यमुना","गंगा","नर्मदा"],0,"हड़प्पा रावी नदी के निकट स्थित था।"],["पानीपत का प्रथम युद्ध कब हुआ?",["1556","1761","1757","1526"],3,"प्रथम पानीपत का युद्ध 1526 में हुआ।"],["भारतीय संविधान कब लागू हुआ?",["15 अगस्त 1947","26 जनवरी 1950","2 अक्टूबर 1950","26 नवंबर 1949"],1,"संविधान 26 जनवरी 1950 को लागू हुआ।"],["बंगाल विभाजन किस वर्ष हुआ?",["1911","1920","1905","1919"],2,"बंगाल विभाजन 1905 में हुआ।"],["साइमन कमीशन भारत कब आया?",["1919","1935","1928","1927"],2,"साइमन कमीशन 1928 में भारत आया।"]],"Geography":[["भारत का सबसे ऊँचा पर्वत शिखर जो पूरी तरह भारत में स्थित है, कौन सा है?",["कंचनजंघा","अनामुडी","नंदा देवी","कामेत"],2,"नंदा देवी भारत में स्थित सबसे ऊँची पर्वत चोटियों में प्रमुख है।"],["दक्कन का पठार मुख्यतः किस प्रकार की चट्टानों से संबंधित है?",["बेसाल्ट","बलुआ पत्थर","संगमरमर","चूना पत्थर"],0,"दक्कन ट्रैप का आधार मुख्यतः बेसाल्टिक लावा से बना है।"],["भारत में सबसे अधिक वर्षा वाला स्थान कौन सा माना जाता है?",["लेह","दिल्ली","मौसिनराम","जैसलमेर"],2,"मेघालय का मौसिनराम अत्यधिक वार्षिक वर्षा के लिए प्रसिद्ध है।"],["भारत का सबसे बड़ा राज्य क्षेत्रफल के आधार पर कौन सा है?",["राजस्थान","उत्तर प्रदेश","मध्य प्रदेश","महाराष्ट्र"],0,"क्षेत्रफल के आधार पर राजस्थान सबसे बड़ा राज्य है।"],["ब्रह्मपुत्र भारत में मुख्यतः किस राज्य से होकर बहती है?",["असम","पंजाब","गुजरात","बिहार"],0,"ब्रह्मपुत्र असम में प्रमुख नदी के रूप में बहती है।"],["नीलगिरि पहाड़ियाँ किन राज्यों के संगम क्षेत्र में हैं?",["बिहार-झारखंड-ओडिशा","गुजरात-महाराष्ट्र-गोवा","पंजाब-हरियाणा-राजस्थान","तमिलनाडु-कर्नाटक-केरल"],3,"नीलगिरि पहाड़ियाँ तमिलनाडु, कर्नाटक और केरल के संगम क्षेत्र में हैं।"],["भारत का सबसे लंबा समुद्र तट किस राज्य के पास है?",["तमिलनाडु","ओडिशा","गुजरात","आंध्र प्रदेश"],2,"भारत के राज्यों में सबसे लंबी तटरेखा गुजरात की है।"],["भारत में कर्क रेखा कितने राज्यों से गुजरती है?",["6","8","9","7"],1,"कर्क रेखा भारत के 8 राज्यों से गुजरती है।"],["भारत की सबसे बड़ी मीठे पानी की झील कौन सी है?",["चिल्का झील","वूलर झील","लोकटक झील","सांभर झील"],1,"वूलर झील भारत की प्रमुख और सबसे बड़ी मीठे पानी की झीलों में है।"],["सुंदरबन डेल्टा मुख्यतः किन नदियों से बना है?",["गोदावरी-कृष्णा","सिंधु-झेलम","नर्मदा-ताप्ती","गंगा-ब्रह्मपुत्र-मेघना"],3,"सुंदरबन डेल्टा गंगा, ब्रह्मपुत्र और मेघना नदी तंत्र से बनता है।"],["गंगा नदी का उद्गम किस हिमनद से माना जाता है?",["यमुनोत्री","गंगोत्री","सियाचिन","पिंडारी"],1,"भागीरथी का उद्गम गंगोत्री हिमनद से माना जाता है।"],["अरावली पर्वतमाला की दिशा सामान्यतः कैसी है?",["उत्तर-पूर्व से दक्षिण-पश्चिम","पूर्व से पश्चिम","उत्तर से दक्षिण","उत्तर-पश्चिम से दक्षिण-पूर्व"],0,"अरावली पर्वतमाला की सामान्य दिशा उत्तर-पूर्व से दक्षिण-पश्चिम है।"],["कावेरी नदी का उद्गम किस राज्य में है?",["आंध्र प्रदेश","कर्नाटक","केरल","तमिलनाडु"],1,"कावेरी का उद्गम कर्नाटक के ब्रह्मगिरि क्षेत्र में है।"],["थार मरुस्थल मुख्यतः किस राज्य में है?",["राजस्थान","बिहार","असम","ओडिशा"],0,"थार मरुस्थल का अधिकांश भाग राजस्थान में है।"],["चिल्का झील किस राज्य में स्थित है?",["पश्चिम बंगाल","ओडिशा","केरल","आंध्र प्रदेश"],1,"चिल्का झील ओडिशा में स्थित है।"],["ताप्ती नदी किस सागर में गिरती है?",["बंगाल की खाड़ी","अरब सागर","कैस्पियन सागर","हिंद महासागर"],1,"ताप्ती नदी अरब सागर में गिरती है।"],["भारत का दक्षिणतम बिंदु कौन सा है?",["इंदिरा प्वाइंट","पोर्ट ब्लेयर","कन्याकुमारी","रामेश्वरम"],0,"भारत का दक्षिणतम बिंदु इंदिरा प्वाइंट है।"],["नर्मदा नदी किस सागर में गिरती है?",["अरब सागर","बंगाल की खाड़ी","हिंद महासागर","लाल सागर"],0,"नर्मदा नदी अरब सागर में गिरती है।"],["पश्चिमी घाट का दूसरा नाम क्या है?",["सह्याद्रि","शिवालिक","अरावली","काराकोरम"],0,"पश्चिमी घाट को सह्याद्रि भी कहा जाता है।"],["भारत की सबसे लंबी नदी कौन सी है?",["गंगा","नर्मदा","यमुना","गोदावरी"],0,"भारत में बहने वाली सबसे लंबी नदी गंगा है।"]],"Polity":[["भारतीय संविधान की प्रस्तावना में भारत को किस रूप में वर्णित किया गया है?",["एकात्मक राजतंत्र","सैन्य गणराज्य","सम्प्रभु समाजवादी पंथनिरपेक्ष लोकतांत्रिक गणराज्य","संघीय राजतंत्र"],2,"प्रस्तावना भारत को सम्प्रभु, समाजवादी, पंथनिरपेक्ष, लोकतांत्रिक गणराज्य बताती है।"],["राज्यसभा के कितने सदस्य हर दो वर्ष में सेवानिवृत्त होते हैं?",["आधे","एक-तिहाई","एक-चौथाई","दो-तिहाई"],1,"राज्यसभा के लगभग एक-तिहाई सदस्य हर दो वर्ष में सेवानिवृत्त होते हैं।"],["राज्यसभा के एक सदस्य का सामान्य कार्यकाल कितने वर्ष का है?",["5","4","6","7"],2,"राज्यसभा सदस्य का कार्यकाल 6 वर्ष होता है।"],["भारत का नियंत्रक एवं महालेखा परीक्षक किस अनुच्छेद में है?",["324","360","148","280"],2,"CAG का प्रावधान अनुच्छेद 148 में है।"],["संविधान संशोधन की प्रक्रिया मुख्यतः किस अनुच्छेद में है?",["अनुच्छेद 356","अनुच्छेद 280","अनुच्छेद 123","अनुच्छेद 368"],3,"संविधान संशोधन की प्रक्रिया अनुच्छेद 368 में है।"],["भारत के उपराष्ट्रपति राज्यसभा में किस पद पर होते हैं?",["नेता सदन","उपसभापति","महासचिव","सभापति"],3,"उपराष्ट्रपति राज्यसभा के पदेन सभापति होते हैं।"],["भारत के राष्ट्रपति का कार्यकाल कितने वर्ष का होता है?",["4","6","7","5"],3,"राष्ट्रपति का कार्यकाल 5 वर्ष है।"],["संविधान का अनुच्छेद 32 किस अधिकार से संबंधित है?",["धर्म की स्वतंत्रता","समानता","संवैधानिक उपचार","शिक्षा"],2,"अनुच्छेद 32 संवैधानिक उपचार के अधिकार से संबंधित है।"],["नगरपालिकाओं से संबंधित संविधान संशोधन कौन सा है?",["75वाँ","72वाँ","73वाँ","74वाँ"],3,"74वाँ संशोधन नगरपालिकाओं से संबंधित है।"],["लोकसभा का अध्यक्ष किस सदन द्वारा चुना जाता है?",["राज्यसभा","राष्ट्रपति","सुप्रीम कोर्ट","लोकसभा"],3,"लोकसभा अपने अध्यक्ष का चुनाव स्वयं करती है।"],["निर्वाचन आयोग का प्रावधान किस अनुच्छेद में है?",["356","368","280","324"],3,"निर्वाचन आयोग का प्रावधान अनुच्छेद 324 में है।"],["मतदान की आयु 21 से 18 वर्ष किस संशोधन से हुई?",["61वाँ","44वाँ","42वाँ","73वाँ"],0,"61वें संविधान संशोधन अधिनियम ने मतदान आयु 18 वर्ष की।"],["भारत में सर्वोच्च न्यायालय की स्थापना कब हुई?",["1950","1947","1956","1952"],0,"सर्वोच्च न्यायालय ने 1950 में कार्य करना शुरू किया।"],["लोकसभा का सामान्य कार्यकाल कितने वर्ष का है?",["7","4","6","5"],3,"लोकसभा का सामान्य कार्यकाल 5 वर्ष है।"],["वित्त आयोग का प्रावधान किस अनुच्छेद में है?",["280","315","324","148"],0,"वित्त आयोग का प्रावधान अनुच्छेद 280 में है।"],["राज्य के नीति निदेशक तत्व किस भाग में हैं?",["भाग VI","भाग V","भाग III","भाग IV"],3,"नीति निदेशक तत्व भाग IV में हैं।"],["भारत में राष्ट्रपति का चुनाव कौन करता है?",["निर्वाचक मंडल","केवल राज्यसभा","सुप्रीम कोर्ट","केवल लोकसभा"],0,"राष्ट्रपति का चुनाव निर्वाचक मंडल करता है।"],["मौलिक अधिकार संविधान के किस भाग में हैं?",["भाग II","भाग V","भाग IV","भाग III"],3,"मौलिक अधिकार संविधान के भाग III में हैं।"],["पंचायती राज से संबंधित संशोधन कौन सा है?",["73वाँ","61वाँ","86वाँ","74वाँ"],0,"73वाँ संशोधन पंचायती राज से संबंधित है।"],["भारत में मतदान की न्यूनतम आयु कितनी है?",["16 वर्ष","21 वर्ष","25 वर्ष","18 वर्ष"],3,"भारत में मतदान की न्यूनतम आयु 18 वर्ष है।"]],"Science":[["मानव शरीर में रक्त का शुद्धीकरण मुख्यतः किस अंग द्वारा होता है?",["हृदय","अग्न्याशय","त्वचा","गुर्दे"],3,"गुर्दे रक्त से अपशिष्ट पदार्थों को छानने में मुख्य भूमिका निभाते हैं।"],["रक्त में ऑक्सीजन का परिवहन मुख्यतः किसके द्वारा होता है?",["श्वेत रक्त कोशिकाएँ","हीमोग्लोबिन","प्लेटलेट्स","प्लाज्मा"],1,"हीमोग्लोबिन ऑक्सीजन के परिवहन में मुख्य भूमिका निभाता है।"],["पौधों में प्रकाश संश्लेषण मुख्यतः किस अंगक में होता है?",["राइबोसोम","माइटोकॉन्ड्रिया","नाभिक","क्लोरोप्लास्ट"],3,"प्रकाश संश्लेषण क्लोरोप्लास्ट में होता है।"],["मानव शरीर में रक्त को पंप करने वाला अंग कौन है?",["यकृत","हृदय","फेफड़ा","गुर्दा"],1,"हृदय रक्त को पूरे शरीर में पंप करता है।"],["मानव शरीर में इंसुलिन किस अंग द्वारा बनता है?",["हृदय","गुर्दा","यकृत","अग्न्याशय"],3,"इंसुलिन अग्न्याशय की बीटा कोशिकाओं द्वारा बनता है।"],["प्रकाश की चाल निर्वात में लगभग कितनी है?",["3×10¹⁰ m/s","3×10⁸ m/s","3×10⁴ m/s","3×10⁶ m/s"],1,"निर्वात में प्रकाश की चाल लगभग 3×10⁸ m/s है।"],["विटामिन C की कमी से कौन सा रोग होता है?",["स्कर्वी","रिकेट्स","बेरी-बेरी","रातांधता"],0,"विटामिन C की कमी से स्कर्वी होता है।"],["विटामिन D की कमी से कौन सा रोग होता है?",["रिकेट्स","घेंघा","एनीमिया","स्कर्वी"],0,"विटामिन D की कमी से बच्चों में रिकेट्स हो सकता है।"],["मानव शरीर का सबसे बड़ा अंग कौन सा है?",["यकृत","फेफड़ा","त्वचा","हृदय"],2,"त्वचा मानव शरीर का सबसे बड़ा अंग है।"],["साधारण नमक का रासायनिक सूत्र क्या है?",["KCl","NaOH","NaCl","HCl"],2,"साधारण नमक का सूत्र NaCl है।"],["क्षार का pH सामान्यतः कितना होता है?",["7 के बराबर","7 से कम","7 से अधिक","0"],2,"क्षारीय विलयन का pH 7 से अधिक होता है।"],["अम्ल का pH सामान्यतः कितना होता है?",["7 के बराबर","14 से अधिक","7 से अधिक","7 से कम"],3,"अम्लीय विलयन का pH 7 से कम होता है।"],["कार्बन डाइऑक्साइड का सूत्र क्या है?",["CaCO₃","C₂O","CO","CO₂"],3,"कार्बन डाइऑक्साइड का रासायनिक सूत्र CO₂ है।"],["ध्वनि निर्वात में क्यों नहीं चलती?",["प्रकाश नहीं होता","माध्यम नहीं होता","तापमान कम होता है","गुरुत्व नहीं होता"],1,"ध्वनि के प्रसार के लिए भौतिक माध्यम आवश्यक होता है।"],["ऑक्सीजन का रासायनिक सूत्र क्या है?",["O₃","O","O₂","OH"],2,"सामान्य ऑक्सीजन अणु O₂ होता है।"],["विद्युत धारा की SI इकाई क्या है?",["ओम","एम्पियर","कूलॉम","वोल्ट"],1,"विद्युत धारा की SI इकाई एम्पियर है।"],["जल का रासायनिक सूत्र क्या है?",["H₂O","NaCl","CO₂","O₂"],0,"जल का रासायनिक सूत्र H₂O है।"],["प्रतिरोध की SI इकाई क्या है?",["ओम","वोल्ट","फैरड","वाट"],0,"प्रतिरोध की SI इकाई ओम है।"],["आवृत्ति की SI इकाई क्या है?",["पास्कल","न्यूटन","जूल","हर्ट्ज"],3,"आवृत्ति की SI इकाई हर्ट्ज है।"],["कार्य की SI इकाई क्या है?",["जूल","न्यूटन","वाट","एम्पियर"],0,"कार्य की SI इकाई जूल है।"]],"Maths":[["एक वस्तु का अंकित मूल्य 800 रुपये है और 10% छूट है। विक्रय मूल्य क्या होगा?",["720","760","700","740"],0,"800 का 10% = 80, इसलिए विक्रय मूल्य 720 रुपये है।"],["1000 रुपये पर 5% वार्षिक साधारण ब्याज 3 वर्षों का मिश्रधन क्या होगा?",["1200","1050","1150","1100"],2,"ब्याज 150 रुपये है; मिश्रधन 1150 रुपये।"],["500 रुपये पर 10% वार्षिक साधारण ब्याज 2 वर्षों का कितना होगा?",["50","125","75","100"],3,"SI = 500×10×2/100 = 100 रुपये।"],["एक आयत की लंबाई 12 cm और चौड़ाई 5 cm है। क्षेत्रफल क्या है?",["60 cm²","34 cm²","120 cm²","17 cm²"],0,"क्षेत्रफल = 12×5 = 60 cm²."],["यदि 5 पेन की कीमत 60 रुपये है, तो 8 पेन की कीमत कितनी होगी?",["84","90","96","100"],2,"एक पेन 12 रुपये का है; 8 पेन = 96 रुपये।"],["एक ट्रेन 60 km/h की गति से 2 घंटे चले तो दूरी कितनी होगी?",["120 km","100 km","140 km","160 km"],0,"दूरी = गति×समय = 60×2 = 120 km."],["अनुपात 3:5 में कुल 64 बाँटे जाएँ, तो पहला भाग कितना होगा?",["24","32","20","28"],0,"कुल 8 भाग हैं; 64×3/8 = 24."],["यदि किसी संख्या का 10% = 15 है, तो संख्या क्या होगी?",["150","100","200","120"],0,"15 × 100/10 = 150."],["एक संख्या 200 से 15% बढ़ती है। नई संख्या क्या होगी?",["230","240","225","215"],0,"200 का 15% = 30, इसलिए नई संख्या 230 है।"],["एक संख्या 500 से 20% घटती है। नई संख्या क्या होगी?",["400","380","450","420"],0,"500 का 20% = 100, इसलिए नई संख्या 400 है।"],["यदि किसी संख्या का 40% = 80 है, तो संख्या क्या है?",["200","160","180","240"],0,"संख्या = 80×100/40 = 200."],["वर्ग की भुजा 9 cm है। उसका क्षेत्रफल क्या होगा?",["72 cm²","18 cm²","36 cm²","81 cm²"],3,"वर्ग का क्षेत्रफल 9×9 = 81 cm²."],["वर्ग की भुजा 7 cm है। उसका परिमाप क्या होगा?",["14 cm","28 cm","49 cm","21 cm"],1,"परिमाप = 4×7 = 28 cm."],["2 घंटे 30 मिनट में कुल कितने मिनट होते हैं?",["130","120","180","150"],3,"2 घंटे = 120 मिनट; 120+30 = 150 मिनट।"],["एक संख्या का 3/5 = 24 है। संख्या क्या है?",["45","40","30","36"],1,"संख्या = 24×5/3 = 40."],["15, 20 और 25 का औसत क्या है?",["22","18","20","25"],2,"(15+20+25)/3 = 20."],["0.75 को भिन्न में बदलें।",["3/4","2/3","4/5","1/2"],0,"0.75 = 75/100 = 3/4."],["12 और 18 का LCM क्या है?",["48","36","30","24"],1,"12 और 18 का LCM 36 है।"],["24 और 36 का HCF क्या है?",["12","8","18","6"],0,"24 और 36 का HCF 12 है।"],["480 का 25% कितना है?",["120","140","160","100"],0,"480 × 25/100 = 120."]],"Reasoning":[["एक व्यक्ति उत्तर की ओर 10 m चलता है, फिर दाएँ मुड़कर 5 m चलता है। वह प्रारंभिक स्थान से किस दिशा में है?",["उत्तर-पूर्व","दक्षिण-पश्चिम","दक्षिण-पूर्व","उत्तर-पश्चिम"],0,"उत्तर के बाद दाएँ मुड़ने पर पूर्व दिशा आती है; स्थिति उत्तर-पूर्व है।"],["एक कक्षा में रवि ऊपर से 7वाँ और नीचे से 14वाँ है। कुल विद्यार्थी कितने हैं?",["20","19","21","22"],0,"कुल = 7+14−1 = 20."],["यदि सभी गुलाब फूल हैं और कुछ फूल लाल हैं, तो कौन सा निष्कर्ष निश्चित है?",["सभी गुलाब लाल हैं","सभी गुलाब फूल हैं","कोई फूल लाल नहीं है","कुछ गुलाब लाल हैं"],1,"पहला कथन सीधे बताता है कि सभी गुलाब फूल हैं।"],["राम, श्याम से लंबा है और श्याम, मोहन से लंबा है। सबसे छोटा कौन है?",["श्याम","निश्चित नहीं","राम","मोहन"],3,"राम > श्याम > मोहन, इसलिए मोहन सबसे छोटा है।"],["A, B का भाई है और B, C की बहन है। A का C से क्या संबंध निश्चित है?",["निश्चित नहीं","पिता","भाई","बहन"],0,"B का लिंग और A का लिंग दिए हैं, पर C का लिंग नहीं; इसलिए संबंध निश्चित नहीं।"],["यदि सभी A, B हैं और सभी B, C हैं, तो निश्चित निष्कर्ष क्या है?",["कुछ C, A नहीं हैं","सभी A, C हैं","कोई A, C नहीं है","सभी C, A हैं"],1,"A के सभी सदस्य B और B के सभी सदस्य C हैं, इसलिए सभी A, C हैं।"],["घड़ी में 3 बजे घंटे और मिनट की सुई के बीच कोण कितना होता है?",["120°","90°","60°","180°"],1,"3 बजे मिनट की सुई 12 पर और घंटे की 3 पर होती है; कोण 90° है।"],["यदि MANGO को NBOHP लिखा जाए, तो APPLE को क्या लिखा जाएगा?",["BQQLF","BQQMF","CQPMF","BPPMF"],1,"हर अक्षर को एक स्थान आगे किया गया है।"],["यदि SOUTH को TPVUI लिखा जाए, तो NORTH को क्या लिखा जाएगा?",["NPSUI","OPSUI","OPSTI","OQSVI"],1,"हर अक्षर को एक स्थान आगे किया गया है।"],["यदि BOOK को CPPL लिखा जाए, तो PEN को क्या लिखा जाएगा?",["QFO","QEN","RGP","PFN"],0,"हर अक्षर में 1 जोड़ा गया है।"],["यदि CAT को DBU लिखा जाए, तो DOG को क्या लिखा जाएगा?",["EPH","EOH","FPH","DPG"],0,"हर अक्षर में 1 जोड़ा गया है: D→E, O→P, G→H."],["यदि 1 जनवरी सोमवार है, तो 8 जनवरी कौन सा दिन होगा?",["सोमवार","मंगलवार","बुधवार","रविवार"],0,"7 दिन बाद वही दिन आता है, इसलिए सोमवार।"],["यदि आज सोमवार है, तो 10 दिन बाद कौन सा दिन होगा?",["शुक्रवार","शनिवार","गुरुवार","बुधवार"],2,"10 mod 7 = 3; सोमवार से 3 दिन बाद गुरुवार।"],["विषम चुनें: सेब, आम, केला, गाजर",["सेब","केला","आम","गाजर"],3,"गाजर सब्जी है, बाकी फल हैं।"],["श्रृंखला: 100, 90, 80, 70, ?",["50","65","60","55"],2,"हर बार 10 घटाया गया है।"],["श्रृंखला: 2, 3, 5, 8, 13, ?",["21","18","20","22"],0,"हर पद पिछले दो पदों का योग है; 8+13 = 21."],["विषम चुनें: 2, 4, 8, 16, 18",["16","2","8","18"],3,"2,4,8,16 क्रम में 2 की घातें हैं; 18 अलग है।"],["श्रृंखला: 5, 10, 15, 20, ?",["30","25","35","22"],1,"हर बार 5 जोड़ा गया है।"],["श्रृंखला: 3, 6, 12, 24, ?",["42","54","36","48"],3,"हर पद पिछले पद का 2 गुना है।"],["श्रृंखला: 2, 5, 10, 17, ?",["24","30","26","28"],2,"अंतर 3,5,7 है; अगला अंतर 9, इसलिए 26."]],"Hindi":[["‘जो मेहनत करता है, वह सफल होता है।’ यह कौन सा वाक्य है?",["मिश्र","संयुक्त","विस्मयादिबोधक","सरल"],0,"इसमें एक प्रधान और एक आश्रित उपवाक्य है, इसलिए मिश्र वाक्य है।"],["‘मैं स्कूल जाता हूँ।’ वाक्य में सर्वनाम कौन सा है?",["हूँ","स्कूल","जाता","मैं"],3,"‘मैं’ सर्वनाम है।"],["‘राम आया और श्याम चला गया।’ कौन सा वाक्य है?",["सरल","प्रश्नवाचक","संयुक्त","मिश्र"],2,"दो स्वतंत्र उपवाक्य ‘और’ से जुड़े हैं, इसलिए संयुक्त वाक्य है।"],["‘दूध का दूध, पानी का पानी’ का अर्थ क्या है?",["जल्दी करना","धोखा देना","न्यायपूर्ण निर्णय","बहुत मेहनत"],2,"इसका अर्थ सत्य और असत्य को स्पष्ट कर देना है।"],["‘धीरे-धीरे’ किस प्रकार का क्रियाविशेषण है?",["कालवाचक","रीतिवाचक","परिमाणवाचक","स्थानवाचक"],1,"‘धीरे-धीरे’ कार्य की रीति बताता है।"],["‘आँखों का तारा’ मुहावरे का अर्थ क्या है?",["बहुत क्रोधित","बहुत प्रिय","बहुत गरीब","बहुत दूर"],1,"‘आँखों का तारा’ का अर्थ बहुत प्रिय व्यक्ति है।"],["‘तीन लड़के’ में ‘तीन’ कौन सा विशेषण है?",["संबंधवाचक","गुणवाचक","संख्यावाचक","परिमाणवाचक"],2,"‘तीन’ निश्चित संख्या बताता है।"],["‘कल मैं बाजार गया।’ में ‘कल’ क्या है?",["सर्वनाम","विशेषण","संज्ञा","क्रियाविशेषण"],3,"‘कल’ समय बताने वाला क्रियाविशेषण है।"],["‘अधजल गगरी छलकत जाए’ का भाव क्या है?",["एकता में बल है","कम ज्ञान वाला अधिक दिखावा करता है","समय अमूल्य है","मेहनत का फल मिलता है"],1,"मुहावरे का आशय है कि कम ज्ञान वाला व्यक्ति अधिक दिखावा करता है।"],["‘राजा का पुत्र’ का समास रूप क्या है?",["राजपुत्र","राजर्षि","राजमार्ग","राजमहल"],0,"राजा का पुत्र = राजपुत्र, यह तत्पुरुष समास है।"],["‘नाक कटना’ मुहावरे का अर्थ क्या है?",["अपमान होना","बीमार होना","तेज दौड़ना","सम्मान मिलना"],0,"‘नाक कटना’ का अर्थ अपमान होना है।"],["‘विद्या + आलय’ का संधि रूप क्या है?",["विद्यलय","विद्याआलय","विद्यालय","विदालय"],2,"विद्या + आलय से विद्यालय बनता है।"],["‘राम ने फल खाया।’ में कर्ता कौन है?",["खाया","राम","फल","ने"],1,"कार्य करने वाला कर्ता राम है।"],["‘सुंदर’ किस प्रकार का विशेषण है?",["सार्वनामिक","परिमाणवाचक","गुणवाचक","संख्यावाचक"],2,"‘सुंदर’ गुण बताता है, इसलिए गुणवाचक विशेषण है।"],["‘अग्नि’ का पर्यायवाची कौन सा है?",["अमृत","अनल","अंबर","अचल"],1,"अग्नि का पर्यायवाची अनल है।"],["‘आकाश’ का पर्यायवाची कौन सा है?",["पवन","नीर","नभ","अनल"],2,"आकाश का पर्यायवाची नभ है।"],["'जल' का पर्यायवाची कौन सा है?",["अग्नि","वायु","नीर","धरती"],2,"जल का पर्यायवाची नीर है।"],["‘नदी’ शब्द का लिंग क्या है?",["स्त्रीलिंग","पुल्लिंग","उभयलिंग","नपुंसकलिंग"],0,"‘नदी’ स्त्रीलिंग शब्द है।"],["‘लड़का’ का बहुवचन क्या है?",["लड़की","लड़कियाँ","लड़के","लड़कों"],2,"‘लड़का’ का सामान्य बहुवचन ‘लड़के’ है।"],["'सुंदर' का विलोम क्या है?",["सरल","मधुर","अच्छा","कुरूप"],3,"सुंदर का विलोम कुरूप है।"]],"English":[["Choose the correct conjunction: “I was tired ___ I continued working.”",["but","or","because","so"],0,"But connects two contrasting ideas."],["Choose the correct article: “___ apple a day keeps the doctor away.”",["No article","A","The","An"],3,"“Apple” begins with a vowel sound, so “an” is used."],["Choose the correct preposition: “The book is ___ the table.”",["on","in","by","at"],0,"On is used for something resting on a surface."],["Choose the correct indirect speech: He said, “I am tired.”",["He said that he was tired.","He says he tired.","He said that I am tired.","He said that he is tired always."],0,"In standard reported speech, am changes to was with the past reporting verb."],["Choose the correct question tag: “You are coming, ___?”",["isn’t it","aren’t you","are you","don’t you"],1,"A positive statement with are takes the negative tag aren’t you."],["Choose the correct form: “He ___ to school every day.”",["going","go","gone","goes"],3,"With third-person singular he, the simple present uses goes."],["Identify the adjective: “She wore a beautiful dress.”",["dress","beautiful","wore","She"],1,"Beautiful describes the noun dress, so it is an adjective."],["Choose the correct form: “They ___ playing cricket.”",["is","was","am","are"],3,"The plural subject they takes are."],["Identify the noun: “Honesty is the best policy.”",["best","the","is","Honesty"],3,"Honesty is a noun naming a quality."],["Choose the passive voice: “Ram wrote a letter.”",["A letter was written by Ram.","Ram was written by a letter.","Ram is writing a letter.","A letter writes Ram."],0,"The passive form is A letter was written by Ram."],["What is the comparative form of “Good”?",["More good","Best","Gooder","Better"],3,"The comparative form of good is better."],["Identify the adverb: “He runs quickly.”",["none","quickly","He","runs"],1,"Quickly modifies the verb runs, so it is an adverb."],["What is the superlative form of “Bad”?",["Badder","Worst","Most bad","Worse"],1,"The superlative form of bad is worst."],["Choose the correct past tense of “Go”.",["Goed","Gone","Going","Went"],3,"The simple past of go is went."],["Choose the correct synonym of “Rapid”.",["Slow","Late","Fast","Weak"],2,"Rapid means fast."],["Choose the correct plural of “Child”.",["Childs","Childes","Childrens","Children"],3,"The standard plural of child is children."],["Choose the antonym of “Ancient”.",["Modern","Past","Old","Historic"],0,"Modern is the opposite of ancient."],["Choose the antonym of “Expand”.",["Enlarge","Extend","Increase","Contract"],3,"Contract means become smaller or reduce in size."],["Choose the synonym of “Brave”.",["Courageous","Weak","Lazy","Coward"],0,"Courageous means brave."],["Choose the correct spelling.",["Seprate","Seperate","Separate","Seperete"],2,"The correct spelling is Separate."]],"Economics":[["भारत में राष्ट्रीय आय के आधिकारिक अनुमान से संबंधित प्रमुख संस्था कौन सी है?",["SEBI","NSO","RBI केवल","UPSC"],1,"राष्ट्रीय सांख्यिकी कार्यालय (NSO) राष्ट्रीय आय के आंकड़ों से संबंधित प्रमुख संस्था है।"],["गरीबी रेखा का उपयोग मुख्यतः किसके आकलन में किया जाता है?",["निर्यात","गरीबी की स्थिति","जनसंख्या घनत्व","साक्षरता"],1,"गरीबी रेखा गरीबी की स्थिति के आकलन के लिए उपयोग की जाती है।"],["भारत में नोट जारी करने का प्रमुख अधिकार किसके पास है?",["SBI","RBI","SEBI","वित्त आयोग"],1,"RBI अधिकांश बैंक नोट जारी करता है; एक रुपये का नोट भारत सरकार जारी करती है।"],["बैंक में जमा धन पर मिलने वाली राशि को क्या कहते हैं?",["मूलधन","ब्याज","कर","लाभांश"],1,"जमा पर बैंक द्वारा दी जाने वाली अतिरिक्त राशि ब्याज कहलाती है।"],["SEBI मुख्यतः किस क्षेत्र को नियंत्रित करता है?",["बैंकिंग","प्रतिभूति बाजार","रेलवे","कृषि"],1,"SEBI प्रतिभूति बाजार का नियमन करता है।"],["भारत में बजट सामान्यतः कौन प्रस्तुत करता है?",["लोकसभा अध्यक्ष","RBI गवर्नर","प्रधान न्यायाधीश","केंद्रीय वित्त मंत्री"],3,"केंद्रीय बजट केंद्रीय वित्त मंत्री संसद में प्रस्तुत करते हैं।"],["मौद्रिक नीति में रेपो रेट किससे संबंधित है?",["आयकर दर","GST दर","किसानों की MSP","RBI द्वारा बैंकों को अल्पकालिक ऋण की दर"],3,"रेपो रेट वह दर है जिस पर RBI बैंकों को अल्पकालिक धन उधार देता है।"],["भारत में मौद्रिक नीति मुख्यतः कौन बनाता है?",["NITI Aayog","वित्त आयोग","SEBI","RBI"],3,"भारत में मौद्रिक नीति का संचालन RBI करता है।"],["प्रति व्यक्ति आय कैसे प्राप्त की जाती है?",["GDP × जनसंख्या","जनसंख्या ÷ राष्ट्रीय आय","कर ÷ जनसंख्या","राष्ट्रीय आय ÷ जनसंख्या"],3,"प्रति व्यक्ति आय = राष्ट्रीय आय ÷ जनसंख्या।"],["NABARD मुख्यतः किस क्षेत्र से संबंधित है?",["रेलवे","अंतरिक्ष","रक्षा","कृषि और ग्रामीण विकास"],3,"NABARD कृषि और ग्रामीण विकास से संबंधित प्रमुख संस्था है।"],["राजकोषीय नीति मुख्यतः किससे संबंधित है?",["सरकारी कर और व्यय","विदेश नीति","न्यायपालिका","मौद्रिक आपूर्ति केवल"],0,"राजकोषीय नीति सरकारी राजस्व, कर और व्यय से संबंधित होती है।"],["मुद्रास्फीति का सामान्य अर्थ क्या है?",["बेरोजगारी में कमी","उत्पादन का शून्य होना","कीमतों के सामान्य स्तर में वृद्धि","करों का समाप्त होना"],2,"मुद्रास्फीति में वस्तुओं और सेवाओं के सामान्य मूल्य स्तर में वृद्धि होती है।"],["अप्रत्यक्ष कर का उदाहरण कौन सा है?",["GST","कॉर्पोरेट कर","आयकर","संपत्ति कर"],0,"GST एक अप्रत्यक्ष कर है।"],["प्रत्यक्ष कर का उदाहरण कौन सा है?",["GST","उत्पाद शुल्क","आयकर","सीमा शुल्क"],2,"आयकर प्रत्यक्ष कर है।"],["भारत में केंद्रीय बैंक कौन सा है?",["SBI","NABARD","PNB","RBI"],3,"Reserve Bank of India भारत का केंद्रीय बैंक है।"],["बेरोजगारी का अर्थ क्या है?",["काम करने की इच्छा और क्षमता होने पर काम न मिलना","केवल पढ़ाई करना","काम न करना क्योंकि इच्छा नहीं है","सेवानिवृत्ति"],0,"बेरोजगारी में व्यक्ति काम करने की इच्छा और क्षमता रखते हुए रोजगार नहीं पा रहा होता है।"],["भारत में GST कब लागू हुआ?",["2019","2017","2016","2014"],1,"GST भारत में 1 जुलाई 2017 को लागू हुआ।"],["GDP का पूरा नाम क्या है?",["General Development Product","Gross Domestic Product","Gross Development Plan","General Domestic Price"],1,"GDP का पूरा नाम Gross Domestic Product है।"],["GST का पूरा नाम क्या है?",["Government Service Tax","Goods Supply Tariff","Goods and Services Tax","General Sales Tax"],2,"GST का पूरा नाम Goods and Services Tax है।"],["RBI का मुख्यालय कहाँ है?",["कोलकाता","चेन्नई","मुंबई","नई दिल्ली"],2,"RBI का केंद्रीय कार्यालय मुंबई में है।"]],"Indian Art & Culture":[["भरतनाट्यम किस राज्य की प्रमुख शास्त्रीय नृत्य शैली है?",["तमिलनाडु","असम","केरल","ओडिशा"],0,"भरतनाट्यम तमिलनाडु से संबंधित शास्त्रीय नृत्य शैली है।"],["कुचिपुड़ी किस राज्य से संबंधित शास्त्रीय नृत्य है?",["आंध्र प्रदेश","गुजरात","केरल","ओडिशा"],0,"कुचिपुड़ी आंध्र प्रदेश से संबंधित है।"],["कथकली किस राज्य की शास्त्रीय नृत्य-नाट्य शैली है?",["केरल","मणिपुर","असम","तमिलनाडु"],0,"कथकली केरल की प्रसिद्ध शास्त्रीय नृत्य-नाट्य शैली है।"],["गरबा मुख्यतः किस राज्य की लोक नृत्य परंपरा है?",["हरियाणा","गुजरात","राजस्थान","पंजाब"],1,"गरबा गुजरात की प्रसिद्ध लोक नृत्य परंपरा है।"],["वारली चित्रकला मुख्यतः किस राज्य से जुड़ी है?",["गुजरात","बिहार","ओडिशा","महाराष्ट्र"],3,"वारली चित्रकला महाराष्ट्र की जनजातीय कला परंपरा है।"],["कलमकारी कला मुख्यतः किस क्षेत्र से जुड़ी है?",["पंजाब","बिहार","हिमाचल प्रदेश","आंध्र प्रदेश और तेलंगाना"],3,"कलमकारी आंध्र प्रदेश और तेलंगाना क्षेत्र की प्रसिद्ध वस्त्र-कला है।"],["मोहिनीअट्टम किस राज्य का शास्त्रीय नृत्य है?",["कर्नाटक","तमिलनाडु","महाराष्ट्र","केरल"],3,"मोहिनीअट्टम केरल से संबंधित है।"],["पट्टचित्र कला मुख्यतः किस राज्य से जुड़ी है?",["पंजाब","ओडिशा","हरियाणा","सिक्किम"],1,"पट्टचित्र ओडिशा की प्रसिद्ध चित्रकला परंपरा है।"],["मधुबनी चित्रकला किस क्षेत्र से संबंधित है?",["मालवा","मेवाड़","कोंकण","मिथिला"],3,"मधुबनी चित्रकला मिथिला क्षेत्र की प्रसिद्ध कला है।"],["नाट्यशास्त्र के रचयिता किसे माना जाता है?",["बाणभट्ट","कालिदास","तुलसीदास","भरतमुनि"],3,"नाट्यशास्त्र के रचयिता परंपरागत रूप से भरतमुनि माने जाते हैं।"],["घूमर किस राज्य का प्रसिद्ध लोक नृत्य है?",["राजस्थान","गुजरात","उत्तर प्रदेश","मध्य प्रदेश"],0,"घूमर राजस्थान का प्रसिद्ध लोक नृत्य है।"],["तंजौर चित्रकला किस राज्य से संबंधित है?",["मणिपुर","असम","केरल","तमिलनाडु"],3,"तंजौर चित्रकला तमिलनाडु की प्रसिद्ध कला परंपरा है।"],["भांगड़ा किस राज्य की लोक नृत्य शैली है?",["असम","केरल","बिहार","पंजाब"],3,"भांगड़ा पंजाब की प्रसिद्ध लोक नृत्य शैली है।"],["सत्रिया नृत्य किस राज्य से संबंधित है?",["ओडिशा","असम","पश्चिम बंगाल","बिहार"],1,"सत्रिया असम का शास्त्रीय नृत्य है।"],["ओडिसी किस राज्य का शास्त्रीय नृत्य है?",["राजस्थान","ओडिशा","बिहार","पंजाब"],1,"ओडिसी ओडिशा का शास्त्रीय नृत्य है।"],["मणिपुरी नृत्य किस राज्य से संबंधित है?",["मेघालय","असम","त्रिपुरा","मणिपुर"],3,"मणिपुरी नृत्य मणिपुर से संबंधित है।"],["कोणार्क सूर्य मंदिर किस राज्य में है?",["बिहार","ओडिशा","महाराष्ट्र","गुजरात"],1,"कोणार्क सूर्य मंदिर ओडिशा में स्थित है।"],["सांची स्तूप किस राज्य में स्थित है?",["मध्य प्रदेश","उत्तर प्रदेश","बिहार","राजस्थान"],0,"सांची स्तूप मध्य प्रदेश में स्थित है।"],["बिहू नृत्य किस राज्य से संबंधित है?",["झारखंड","बिहार","ओडिशा","असम"],3,"बिहू असम की प्रमुख लोक परंपरा है।"],["अजंता की गुफाएँ किस राज्य में हैं?",["महाराष्ट्र","मध्य प्रदेश","राजस्थान","बिहार"],0,"अजंता की गुफाएँ महाराष्ट्र में हैं।"]]};
Object.keys(quiz4V12).forEach(subject => { quizSets[subject][4] = quiz4V12[subject]; });
const quiz5V12={"GK":[["भारत में कुल कितने राज्य हैं?",["29","28","27","26"],1,"भारत में 28 राज्य हैं।"],["DRDO का पूरा नाम क्या है?",["Digital Research and Data Organisation","Defence Research and Development Organisation","Defence Railway Development Organisation","Department of Rail Development Office"],1,"DRDO का पूरा नाम Defence Research and Development Organisation है।"],["भारत की राजधानी क्या है?",["मुंबई","कोलकाता","नई दिल्ली","चेन्नई"],2,"भारत की राजधानी नई दिल्ली है।"],["भारतीय अंतरिक्ष अनुसंधान संगठन का संक्षिप्त नाम क्या है?",["CSIR","BARC","DRDO","ISRO"],3,"Indian Space Research Organisation का संक्षिप्त नाम ISRO है।"],["भारतीय अंतरिक्ष अनुसंधान संगठन का संक्षिप्त नाम क्या है?",["BARC","ISRO","DRDO","CSIR"],1,"Indian Space Research Organisation का संक्षिप्त नाम ISRO है।"],["भारतीय अंतरिक्ष अनुसंधान संगठन का संक्षिप्त नाम क्या है?",["CSIR","DRDO","BARC","ISRO"],3,"Indian Space Research Organisation का संक्षिप्त नाम ISRO है।"],["भारतीय अंतरिक्ष अनुसंधान संगठन का संक्षिप्त नाम क्या है?",["ISRO","CSIR","BARC","DRDO"],0,"Indian Space Research Organisation का संक्षिप्त नाम ISRO है।"],["भारतीय अंतरिक्ष अनुसंधान संगठन का संक्षिप्त नाम क्या है?",["DRDO","CSIR","BARC","ISRO"],3,"Indian Space Research Organisation का संक्षिप्त नाम ISRO है।"],["भारतीय अंतरिक्ष अनुसंधान संगठन का संक्षिप्त नाम क्या है?",["DRDO","ISRO","BARC","CSIR"],1,"Indian Space Research Organisation का संक्षिप्त नाम ISRO है।"],["भारतीय अंतरिक्ष अनुसंधान संगठन का संक्षिप्त नाम क्या है?",["ISRO","CSIR","DRDO","BARC"],0,"Indian Space Research Organisation का संक्षिप्त नाम ISRO है।"],["भारतीय अंतरिक्ष अनुसंधान संगठन का संक्षिप्त नाम क्या है?",["ISRO","BARC","DRDO","CSIR"],0,"Indian Space Research Organisation का संक्षिप्त नाम ISRO है।"],["भारतीय अंतरिक्ष अनुसंधान संगठन का संक्षिप्त नाम क्या है?",["DRDO","ISRO","BARC","CSIR"],1,"Indian Space Research Organisation का संक्षिप्त नाम ISRO है।"],["भारतीय अंतरिक्ष अनुसंधान संगठन का संक्षिप्त नाम क्या है?",["DRDO","BARC","CSIR","ISRO"],3,"Indian Space Research Organisation का संक्षिप्त नाम ISRO है।"],["भारतीय अंतरिक्ष अनुसंधान संगठन का संक्षिप्त नाम क्या है?",["CSIR","DRDO","BARC","ISRO"],3,"Indian Space Research Organisation का संक्षिप्त नाम ISRO है।"],["भारतीय अंतरिक्ष अनुसंधान संगठन का संक्षिप्त नाम क्या है?",["BARC","CSIR","ISRO","DRDO"],2,"Indian Space Research Organisation का संक्षिप्त नाम ISRO है।"],["भारतीय अंतरिक्ष अनुसंधान संगठन का संक्षिप्त नाम क्या है?",["DRDO","CSIR","ISRO","BARC"],2,"Indian Space Research Organisation का संक्षिप्त नाम ISRO है।"],["भारतीय अंतरिक्ष अनुसंधान संगठन का संक्षिप्त नाम क्या है?",["DRDO","BARC","ISRO","CSIR"],2,"Indian Space Research Organisation का संक्षिप्त नाम ISRO है।"],["भारतीय अंतरिक्ष अनुसंधान संगठन का संक्षिप्त नाम क्या है?",["BARC","DRDO","CSIR","ISRO"],3,"Indian Space Research Organisation का संक्षिप्त नाम ISRO है।"],["भारतीय अंतरिक्ष अनुसंधान संगठन का संक्षिप्त नाम क्या है?",["DRDO","CSIR","BARC","ISRO"],3,"Indian Space Research Organisation का संक्षिप्त नाम ISRO है।"],["भारतीय अंतरिक्ष अनुसंधान संगठन का संक्षिप्त नाम क्या है?",["DRDO","ISRO","BARC","CSIR"],1,"Indian Space Research Organisation का संक्षिप्त नाम ISRO है।"]],"History":[["प्लासी का युद्ध कब हुआ?",["1857","1757","1740","1764"],1,"प्लासी का युद्ध 1757 में हुआ।"],["बक्सर का युद्ध कब हुआ?",["1757","1857","1772","1764"],3,"बक्सर का युद्ध 1764 में हुआ।"],["भारतीय राष्ट्रीय कांग्रेस के प्रथम अध्यक्ष कौन थे?",["डब्ल्यू. सी. बनर्जी","गोपाल कृष्ण गोखले","ए. ओ. ह्यूम","दादाभाई नौरोजी"],0,"1885 में कांग्रेस के प्रथम अध्यक्ष डब्ल्यू. सी. बनर्जी थे।"],["भारतीय राष्ट्रीय कांग्रेस के प्रथम अध्यक्ष कौन थे?",["गोपाल कृष्ण गोखले","दादाभाई नौरोजी","डब्ल्यू. सी. बनर्जी","ए. ओ. ह्यूम"],2,"1885 में कांग्रेस के प्रथम अध्यक्ष डब्ल्यू. सी. बनर्जी थे।"],["भारतीय राष्ट्रीय कांग्रेस के प्रथम अध्यक्ष कौन थे?",["डब्ल्यू. सी. बनर्जी","दादाभाई नौरोजी","गोपाल कृष्ण गोखले","ए. ओ. ह्यूम"],0,"1885 में कांग्रेस के प्रथम अध्यक्ष डब्ल्यू. सी. बनर्जी थे।"],["भारतीय राष्ट्रीय कांग्रेस के प्रथम अध्यक्ष कौन थे?",["डब्ल्यू. सी. बनर्जी","ए. ओ. ह्यूम","दादाभाई नौरोजी","गोपाल कृष्ण गोखले"],0,"1885 में कांग्रेस के प्रथम अध्यक्ष डब्ल्यू. सी. बनर्जी थे।"],["भारतीय राष्ट्रीय कांग्रेस के प्रथम अध्यक्ष कौन थे?",["दादाभाई नौरोजी","गोपाल कृष्ण गोखले","डब्ल्यू. सी. बनर्जी","ए. ओ. ह्यूम"],2,"1885 में कांग्रेस के प्रथम अध्यक्ष डब्ल्यू. सी. बनर्जी थे।"],["भारतीय राष्ट्रीय कांग्रेस के प्रथम अध्यक्ष कौन थे?",["दादाभाई नौरोजी","ए. ओ. ह्यूम","डब्ल्यू. सी. बनर्जी","गोपाल कृष्ण गोखले"],2,"1885 में कांग्रेस के प्रथम अध्यक्ष डब्ल्यू. सी. बनर्जी थे।"],["भारतीय राष्ट्रीय कांग्रेस के प्रथम अध्यक्ष कौन थे?",["गोपाल कृष्ण गोखले","डब्ल्यू. सी. बनर्जी","दादाभाई नौरोजी","ए. ओ. ह्यूम"],1,"1885 में कांग्रेस के प्रथम अध्यक्ष डब्ल्यू. सी. बनर्जी थे।"],["भारतीय राष्ट्रीय कांग्रेस के प्रथम अध्यक्ष कौन थे?",["ए. ओ. ह्यूम","डब्ल्यू. सी. बनर्जी","दादाभाई नौरोजी","गोपाल कृष्ण गोखले"],1,"1885 में कांग्रेस के प्रथम अध्यक्ष डब्ल्यू. सी. बनर्जी थे।"],["भारतीय राष्ट्रीय कांग्रेस के प्रथम अध्यक्ष कौन थे?",["गोपाल कृष्ण गोखले","डब्ल्यू. सी. बनर्जी","दादाभाई नौरोजी","ए. ओ. ह्यूम"],1,"1885 में कांग्रेस के प्रथम अध्यक्ष डब्ल्यू. सी. बनर्जी थे।"],["भारतीय राष्ट्रीय कांग्रेस के प्रथम अध्यक्ष कौन थे?",["ए. ओ. ह्यूम","डब्ल्यू. सी. बनर्जी","गोपाल कृष्ण गोखले","दादाभाई नौरोजी"],1,"1885 में कांग्रेस के प्रथम अध्यक्ष डब्ल्यू. सी. बनर्जी थे।"],["भारतीय राष्ट्रीय कांग्रेस के प्रथम अध्यक्ष कौन थे?",["ए. ओ. ह्यूम","दादाभाई नौरोजी","डब्ल्यू. सी. बनर्जी","गोपाल कृष्ण गोखले"],2,"1885 में कांग्रेस के प्रथम अध्यक्ष डब्ल्यू. सी. बनर्जी थे।"],["भारतीय राष्ट्रीय कांग्रेस के प्रथम अध्यक्ष कौन थे?",["डब्ल्यू. सी. बनर्जी","दादाभाई नौरोजी","गोपाल कृष्ण गोखले","ए. ओ. ह्यूम"],0,"1885 में कांग्रेस के प्रथम अध्यक्ष डब्ल्यू. सी. बनर्जी थे।"],["भारतीय राष्ट्रीय कांग्रेस के प्रथम अध्यक्ष कौन थे?",["दादाभाई नौरोजी","गोपाल कृष्ण गोखले","ए. ओ. ह्यूम","डब्ल्यू. सी. बनर्जी"],3,"1885 में कांग्रेस के प्रथम अध्यक्ष डब्ल्यू. सी. बनर्जी थे।"],["भारतीय राष्ट्रीय कांग्रेस के प्रथम अध्यक्ष कौन थे?",["डब्ल्यू. सी. बनर्जी","दादाभाई नौरोजी","ए. ओ. ह्यूम","गोपाल कृष्ण गोखले"],0,"1885 में कांग्रेस के प्रथम अध्यक्ष डब्ल्यू. सी. बनर्जी थे।"],["भारतीय राष्ट्रीय कांग्रेस के प्रथम अध्यक्ष कौन थे?",["गोपाल कृष्ण गोखले","डब्ल्यू. सी. बनर्जी","दादाभाई नौरोजी","ए. ओ. ह्यूम"],1,"1885 में कांग्रेस के प्रथम अध्यक्ष डब्ल्यू. सी. बनर्जी थे।"],["भारतीय राष्ट्रीय कांग्रेस के प्रथम अध्यक्ष कौन थे?",["गोपाल कृष्ण गोखले","दादाभाई नौरोजी","ए. ओ. ह्यूम","डब्ल्यू. सी. बनर्जी"],3,"1885 में कांग्रेस के प्रथम अध्यक्ष डब्ल्यू. सी. बनर्जी थे।"],["भारतीय राष्ट्रीय कांग्रेस के प्रथम अध्यक्ष कौन थे?",["डब्ल्यू. सी. बनर्जी","दादाभाई नौरोजी","ए. ओ. ह्यूम","गोपाल कृष्ण गोखले"],0,"1885 में कांग्रेस के प्रथम अध्यक्ष डब्ल्यू. सी. बनर्जी थे।"],["भारतीय राष्ट्रीय कांग्रेस के प्रथम अध्यक्ष कौन थे?",["डब्ल्यू. सी. बनर्जी","गोपाल कृष्ण गोखले","दादाभाई नौरोजी","ए. ओ. ह्यूम"],0,"1885 में कांग्रेस के प्रथम अध्यक्ष डब्ल्यू. सी. बनर्जी थे।"]],"Geography":[["सांभर झील किस राज्य में है?",["मध्य प्रदेश","हरियाणा","राजस्थान","गुजरात"],2,"सांभर झील राजस्थान में स्थित है।"],["लोकटक झील किस राज्य में है?",["मिजोरम","मेघालय","त्रिपुरा","मणिपुर"],3,"लोकटक झील मणिपुर में स्थित है।"],["भारत का सबसे ऊँचा पर्वत शिखर जो पूरी तरह भारत में स्थित है, कौन सा है?",["नंदा देवी","कामेत","कंचनजंघा","अनामुडी"],0,"नंदा देवी भारत में स्थित सबसे ऊँची पर्वत चोटियों में प्रमुख है।"],["भारत का सबसे ऊँचा पर्वत शिखर जो पूरी तरह भारत में स्थित है, कौन सा है?",["अनामुडी","कामेत","नंदा देवी","कंचनजंघा"],2,"नंदा देवी भारत में स्थित सबसे ऊँची पर्वत चोटियों में प्रमुख है।"],["भारत का सबसे ऊँचा पर्वत शिखर जो पूरी तरह भारत में स्थित है, कौन सा है?",["कंचनजंघा","नंदा देवी","अनामुडी","कामेत"],1,"नंदा देवी भारत में स्थित सबसे ऊँची पर्वत चोटियों में प्रमुख है।"],["भारत का सबसे ऊँचा पर्वत शिखर जो पूरी तरह भारत में स्थित है, कौन सा है?",["कामेत","अनामुडी","कंचनजंघा","नंदा देवी"],3,"नंदा देवी भारत में स्थित सबसे ऊँची पर्वत चोटियों में प्रमुख है।"],["भारत का सबसे ऊँचा पर्वत शिखर जो पूरी तरह भारत में स्थित है, कौन सा है?",["नंदा देवी","अनामुडी","कामेत","कंचनजंघा"],0,"नंदा देवी भारत में स्थित सबसे ऊँची पर्वत चोटियों में प्रमुख है।"],["भारत का सबसे ऊँचा पर्वत शिखर जो पूरी तरह भारत में स्थित है, कौन सा है?",["कंचनजंघा","कामेत","नंदा देवी","अनामुडी"],2,"नंदा देवी भारत में स्थित सबसे ऊँची पर्वत चोटियों में प्रमुख है।"],["भारत का सबसे ऊँचा पर्वत शिखर जो पूरी तरह भारत में स्थित है, कौन सा है?",["कंचनजंघा","अनामुडी","नंदा देवी","कामेत"],2,"नंदा देवी भारत में स्थित सबसे ऊँची पर्वत चोटियों में प्रमुख है।"],["भारत का सबसे ऊँचा पर्वत शिखर जो पूरी तरह भारत में स्थित है, कौन सा है?",["कंचनजंघा","अनामुडी","नंदा देवी","कामेत"],2,"नंदा देवी भारत में स्थित सबसे ऊँची पर्वत चोटियों में प्रमुख है।"],["भारत का सबसे ऊँचा पर्वत शिखर जो पूरी तरह भारत में स्थित है, कौन सा है?",["कंचनजंघा","अनामुडी","कामेत","नंदा देवी"],3,"नंदा देवी भारत में स्थित सबसे ऊँची पर्वत चोटियों में प्रमुख है।"],["भारत का सबसे ऊँचा पर्वत शिखर जो पूरी तरह भारत में स्थित है, कौन सा है?",["अनामुडी","नंदा देवी","कंचनजंघा","कामेत"],1,"नंदा देवी भारत में स्थित सबसे ऊँची पर्वत चोटियों में प्रमुख है।"],["भारत का सबसे ऊँचा पर्वत शिखर जो पूरी तरह भारत में स्थित है, कौन सा है?",["कंचनजंघा","अनामुडी","कामेत","नंदा देवी"],3,"नंदा देवी भारत में स्थित सबसे ऊँची पर्वत चोटियों में प्रमुख है।"],["भारत का सबसे ऊँचा पर्वत शिखर जो पूरी तरह भारत में स्थित है, कौन सा है?",["अनामुडी","कंचनजंघा","कामेत","नंदा देवी"],3,"नंदा देवी भारत में स्थित सबसे ऊँची पर्वत चोटियों में प्रमुख है।"],["भारत का सबसे ऊँचा पर्वत शिखर जो पूरी तरह भारत में स्थित है, कौन सा है?",["कामेत","नंदा देवी","अनामुडी","कंचनजंघा"],1,"नंदा देवी भारत में स्थित सबसे ऊँची पर्वत चोटियों में प्रमुख है।"],["भारत का सबसे ऊँचा पर्वत शिखर जो पूरी तरह भारत में स्थित है, कौन सा है?",["कंचनजंघा","अनामुडी","कामेत","नंदा देवी"],3,"नंदा देवी भारत में स्थित सबसे ऊँची पर्वत चोटियों में प्रमुख है।"],["भारत का सबसे ऊँचा पर्वत शिखर जो पूरी तरह भारत में स्थित है, कौन सा है?",["अनामुडी","नंदा देवी","कंचनजंघा","कामेत"],1,"नंदा देवी भारत में स्थित सबसे ऊँची पर्वत चोटियों में प्रमुख है।"],["भारत का सबसे ऊँचा पर्वत शिखर जो पूरी तरह भारत में स्थित है, कौन सा है?",["कंचनजंघा","अनामुडी","कामेत","नंदा देवी"],3,"नंदा देवी भारत में स्थित सबसे ऊँची पर्वत चोटियों में प्रमुख है।"],["भारत का सबसे ऊँचा पर्वत शिखर जो पूरी तरह भारत में स्थित है, कौन सा है?",["कंचनजंघा","अनामुडी","नंदा देवी","कामेत"],2,"नंदा देवी भारत में स्थित सबसे ऊँची पर्वत चोटियों में प्रमुख है।"],["भारत का सबसे ऊँचा पर्वत शिखर जो पूरी तरह भारत में स्थित है, कौन सा है?",["कंचनजंघा","नंदा देवी","कामेत","अनामुडी"],1,"नंदा देवी भारत में स्थित सबसे ऊँची पर्वत चोटियों में प्रमुख है।"]],"Polity":[["भारत का संविधान किस दिन अपनाया गया था?",["15 अगस्त 1947","26 नवंबर 1949","2 अक्टूबर 1950","26 जनवरी 1950"],1,"संविधान सभा ने 26 नवंबर 1949 को संविधान अपनाया।"],["मौलिक कर्तव्य किस अनुच्छेद में हैं?",["अनुच्छेद 21","अनुच्छेद 32","अनुच्छेद 368","अनुच्छेद 51A"],3,"मौलिक कर्तव्य अनुच्छेद 51A में हैं।"],["भारतीय संविधान की प्रस्तावना में भारत को किस रूप में वर्णित किया गया है?",["संघीय राजतंत्र","सैन्य गणराज्य","सम्प्रभु समाजवादी पंथनिरपेक्ष लोकतांत्रिक गणराज्य","एकात्मक राजतंत्र"],2,"प्रस्तावना भारत को सम्प्रभु, समाजवादी, पंथनिरपेक्ष, लोकतांत्रिक गणराज्य बताती है।"],["भारतीय संविधान की प्रस्तावना में भारत को किस रूप में वर्णित किया गया है?",["सम्प्रभु समाजवादी पंथनिरपेक्ष लोकतांत्रिक गणराज्य","सैन्य गणराज्य","एकात्मक राजतंत्र","संघीय राजतंत्र"],0,"प्रस्तावना भारत को सम्प्रभु, समाजवादी, पंथनिरपेक्ष, लोकतांत्रिक गणराज्य बताती है।"],["भारतीय संविधान की प्रस्तावना में भारत को किस रूप में वर्णित किया गया है?",["संघीय राजतंत्र","सम्प्रभु समाजवादी पंथनिरपेक्ष लोकतांत्रिक गणराज्य","सैन्य गणराज्य","एकात्मक राजतंत्र"],1,"प्रस्तावना भारत को सम्प्रभु, समाजवादी, पंथनिरपेक्ष, लोकतांत्रिक गणराज्य बताती है।"],["भारतीय संविधान की प्रस्तावना में भारत को किस रूप में वर्णित किया गया है?",["सैन्य गणराज्य","संघीय राजतंत्र","एकात्मक राजतंत्र","सम्प्रभु समाजवादी पंथनिरपेक्ष लोकतांत्रिक गणराज्य"],3,"प्रस्तावना भारत को सम्प्रभु, समाजवादी, पंथनिरपेक्ष, लोकतांत्रिक गणराज्य बताती है।"],["भारतीय संविधान की प्रस्तावना में भारत को किस रूप में वर्णित किया गया है?",["सम्प्रभु समाजवादी पंथनिरपेक्ष लोकतांत्रिक गणराज्य","एकात्मक राजतंत्र","सैन्य गणराज्य","संघीय राजतंत्र"],0,"प्रस्तावना भारत को सम्प्रभु, समाजवादी, पंथनिरपेक्ष, लोकतांत्रिक गणराज्य बताती है।"],["भारतीय संविधान की प्रस्तावना में भारत को किस रूप में वर्णित किया गया है?",["एकात्मक राजतंत्र","सम्प्रभु समाजवादी पंथनिरपेक्ष लोकतांत्रिक गणराज्य","सैन्य गणराज्य","संघीय राजतंत्र"],1,"प्रस्तावना भारत को सम्प्रभु, समाजवादी, पंथनिरपेक्ष, लोकतांत्रिक गणराज्य बताती है।"],["भारतीय संविधान की प्रस्तावना में भारत को किस रूप में वर्णित किया गया है?",["सैन्य गणराज्य","संघीय राजतंत्र","एकात्मक राजतंत्र","सम्प्रभु समाजवादी पंथनिरपेक्ष लोकतांत्रिक गणराज्य"],3,"प्रस्तावना भारत को सम्प्रभु, समाजवादी, पंथनिरपेक्ष, लोकतांत्रिक गणराज्य बताती है।"],["भारतीय संविधान की प्रस्तावना में भारत को किस रूप में वर्णित किया गया है?",["सैन्य गणराज्य","सम्प्रभु समाजवादी पंथनिरपेक्ष लोकतांत्रिक गणराज्य","एकात्मक राजतंत्र","संघीय राजतंत्र"],1,"प्रस्तावना भारत को सम्प्रभु, समाजवादी, पंथनिरपेक्ष, लोकतांत्रिक गणराज्य बताती है।"],["भारतीय संविधान की प्रस्तावना में भारत को किस रूप में वर्णित किया गया है?",["सम्प्रभु समाजवादी पंथनिरपेक्ष लोकतांत्रिक गणराज्य","सैन्य गणराज्य","संघीय राजतंत्र","एकात्मक राजतंत्र"],0,"प्रस्तावना भारत को सम्प्रभु, समाजवादी, पंथनिरपेक्ष, लोकतांत्रिक गणराज्य बताती है।"],["भारतीय संविधान की प्रस्तावना में भारत को किस रूप में वर्णित किया गया है?",["संघीय राजतंत्र","एकात्मक राजतंत्र","सम्प्रभु समाजवादी पंथनिरपेक्ष लोकतांत्रिक गणराज्य","सैन्य गणराज्य"],2,"प्रस्तावना भारत को सम्प्रभु, समाजवादी, पंथनिरपेक्ष, लोकतांत्रिक गणराज्य बताती है।"],["भारतीय संविधान की प्रस्तावना में भारत को किस रूप में वर्णित किया गया है?",["एकात्मक राजतंत्र","संघीय राजतंत्र","सम्प्रभु समाजवादी पंथनिरपेक्ष लोकतांत्रिक गणराज्य","सैन्य गणराज्य"],2,"प्रस्तावना भारत को सम्प्रभु, समाजवादी, पंथनिरपेक्ष, लोकतांत्रिक गणराज्य बताती है।"],["भारतीय संविधान की प्रस्तावना में भारत को किस रूप में वर्णित किया गया है?",["एकात्मक राजतंत्र","सैन्य गणराज्य","सम्प्रभु समाजवादी पंथनिरपेक्ष लोकतांत्रिक गणराज्य","संघीय राजतंत्र"],2,"प्रस्तावना भारत को सम्प्रभु, समाजवादी, पंथनिरपेक्ष, लोकतांत्रिक गणराज्य बताती है।"],["भारतीय संविधान की प्रस्तावना में भारत को किस रूप में वर्णित किया गया है?",["सम्प्रभु समाजवादी पंथनिरपेक्ष लोकतांत्रिक गणराज्य","संघीय राजतंत्र","एकात्मक राजतंत्र","सैन्य गणराज्य"],0,"प्रस्तावना भारत को सम्प्रभु, समाजवादी, पंथनिरपेक्ष, लोकतांत्रिक गणराज्य बताती है।"],["भारतीय संविधान की प्रस्तावना में भारत को किस रूप में वर्णित किया गया है?",["सैन्य गणराज्य","एकात्मक राजतंत्र","संघीय राजतंत्र","सम्प्रभु समाजवादी पंथनिरपेक्ष लोकतांत्रिक गणराज्य"],3,"प्रस्तावना भारत को सम्प्रभु, समाजवादी, पंथनिरपेक्ष, लोकतांत्रिक गणराज्य बताती है।"],["भारतीय संविधान की प्रस्तावना में भारत को किस रूप में वर्णित किया गया है?",["संघीय राजतंत्र","एकात्मक राजतंत्र","सम्प्रभु समाजवादी पंथनिरपेक्ष लोकतांत्रिक गणराज्य","सैन्य गणराज्य"],2,"प्रस्तावना भारत को सम्प्रभु, समाजवादी, पंथनिरपेक्ष, लोकतांत्रिक गणराज्य बताती है।"],["भारतीय संविधान की प्रस्तावना में भारत को किस रूप में वर्णित किया गया है?",["सैन्य गणराज्य","सम्प्रभु समाजवादी पंथनिरपेक्ष लोकतांत्रिक गणराज्य","एकात्मक राजतंत्र","संघीय राजतंत्र"],1,"प्रस्तावना भारत को सम्प्रभु, समाजवादी, पंथनिरपेक्ष, लोकतांत्रिक गणराज्य बताती है।"],["भारतीय संविधान की प्रस्तावना में भारत को किस रूप में वर्णित किया गया है?",["संघीय राजतंत्र","सैन्य गणराज्य","एकात्मक राजतंत्र","सम्प्रभु समाजवादी पंथनिरपेक्ष लोकतांत्रिक गणराज्य"],3,"प्रस्तावना भारत को सम्प्रभु, समाजवादी, पंथनिरपेक्ष, लोकतांत्रिक गणराज्य बताती है।"],["भारतीय संविधान की प्रस्तावना में भारत को किस रूप में वर्णित किया गया है?",["सैन्य गणराज्य","संघीय राजतंत्र","एकात्मक राजतंत्र","सम्प्रभु समाजवादी पंथनिरपेक्ष लोकतांत्रिक गणराज्य"],3,"प्रस्तावना भारत को सम्प्रभु, समाजवादी, पंथनिरपेक्ष, लोकतांत्रिक गणराज्य बताती है।"]],"Science":[["शक्ति की SI इकाई क्या है?",["वाट","न्यूटन","जूल","वोल्ट"],0,"शक्ति की SI इकाई वाट है।"],["बल की SI इकाई क्या है?",["वाट","पास्कल","जूल","न्यूटन"],3,"बल की SI इकाई न्यूटन है।"],["मानव शरीर में रक्त का शुद्धीकरण मुख्यतः किस अंग द्वारा होता है?",["त्वचा","अग्न्याशय","हृदय","गुर्दे"],3,"गुर्दे रक्त से अपशिष्ट पदार्थों को छानने में मुख्य भूमिका निभाते हैं।"],["मानव शरीर में रक्त का शुद्धीकरण मुख्यतः किस अंग द्वारा होता है?",["त्वचा","अग्न्याशय","हृदय","गुर्दे"],3,"गुर्दे रक्त से अपशिष्ट पदार्थों को छानने में मुख्य भूमिका निभाते हैं।"],["मानव शरीर में रक्त का शुद्धीकरण मुख्यतः किस अंग द्वारा होता है?",["अग्न्याशय","गुर्दे","त्वचा","हृदय"],1,"गुर्दे रक्त से अपशिष्ट पदार्थों को छानने में मुख्य भूमिका निभाते हैं।"],["मानव शरीर में रक्त का शुद्धीकरण मुख्यतः किस अंग द्वारा होता है?",["अग्न्याशय","गुर्दे","हृदय","त्वचा"],1,"गुर्दे रक्त से अपशिष्ट पदार्थों को छानने में मुख्य भूमिका निभाते हैं।"],["मानव शरीर में रक्त का शुद्धीकरण मुख्यतः किस अंग द्वारा होता है?",["अग्न्याशय","हृदय","त्वचा","गुर्दे"],3,"गुर्दे रक्त से अपशिष्ट पदार्थों को छानने में मुख्य भूमिका निभाते हैं।"],["मानव शरीर में रक्त का शुद्धीकरण मुख्यतः किस अंग द्वारा होता है?",["हृदय","अग्न्याशय","गुर्दे","त्वचा"],2,"गुर्दे रक्त से अपशिष्ट पदार्थों को छानने में मुख्य भूमिका निभाते हैं।"],["मानव शरीर में रक्त का शुद्धीकरण मुख्यतः किस अंग द्वारा होता है?",["हृदय","गुर्दे","त्वचा","अग्न्याशय"],1,"गुर्दे रक्त से अपशिष्ट पदार्थों को छानने में मुख्य भूमिका निभाते हैं।"],["मानव शरीर में रक्त का शुद्धीकरण मुख्यतः किस अंग द्वारा होता है?",["हृदय","अग्न्याशय","त्वचा","गुर्दे"],3,"गुर्दे रक्त से अपशिष्ट पदार्थों को छानने में मुख्य भूमिका निभाते हैं।"],["मानव शरीर में रक्त का शुद्धीकरण मुख्यतः किस अंग द्वारा होता है?",["अग्न्याशय","हृदय","गुर्दे","त्वचा"],2,"गुर्दे रक्त से अपशिष्ट पदार्थों को छानने में मुख्य भूमिका निभाते हैं।"],["मानव शरीर में रक्त का शुद्धीकरण मुख्यतः किस अंग द्वारा होता है?",["हृदय","गुर्दे","त्वचा","अग्न्याशय"],1,"गुर्दे रक्त से अपशिष्ट पदार्थों को छानने में मुख्य भूमिका निभाते हैं।"],["मानव शरीर में रक्त का शुद्धीकरण मुख्यतः किस अंग द्वारा होता है?",["हृदय","अग्न्याशय","गुर्दे","त्वचा"],2,"गुर्दे रक्त से अपशिष्ट पदार्थों को छानने में मुख्य भूमिका निभाते हैं।"],["मानव शरीर में रक्त का शुद्धीकरण मुख्यतः किस अंग द्वारा होता है?",["हृदय","अग्न्याशय","गुर्दे","त्वचा"],2,"गुर्दे रक्त से अपशिष्ट पदार्थों को छानने में मुख्य भूमिका निभाते हैं।"],["मानव शरीर में रक्त का शुद्धीकरण मुख्यतः किस अंग द्वारा होता है?",["गुर्दे","हृदय","त्वचा","अग्न्याशय"],0,"गुर्दे रक्त से अपशिष्ट पदार्थों को छानने में मुख्य भूमिका निभाते हैं।"],["मानव शरीर में रक्त का शुद्धीकरण मुख्यतः किस अंग द्वारा होता है?",["गुर्दे","हृदय","अग्न्याशय","त्वचा"],0,"गुर्दे रक्त से अपशिष्ट पदार्थों को छानने में मुख्य भूमिका निभाते हैं।"],["मानव शरीर में रक्त का शुद्धीकरण मुख्यतः किस अंग द्वारा होता है?",["त्वचा","अग्न्याशय","हृदय","गुर्दे"],3,"गुर्दे रक्त से अपशिष्ट पदार्थों को छानने में मुख्य भूमिका निभाते हैं।"],["मानव शरीर में रक्त का शुद्धीकरण मुख्यतः किस अंग द्वारा होता है?",["त्वचा","अग्न्याशय","गुर्दे","हृदय"],2,"गुर्दे रक्त से अपशिष्ट पदार्थों को छानने में मुख्य भूमिका निभाते हैं।"],["मानव शरीर में रक्त का शुद्धीकरण मुख्यतः किस अंग द्वारा होता है?",["गुर्दे","अग्न्याशय","त्वचा","हृदय"],0,"गुर्दे रक्त से अपशिष्ट पदार्थों को छानने में मुख्य भूमिका निभाते हैं।"],["मानव शरीर में रक्त का शुद्धीकरण मुख्यतः किस अंग द्वारा होता है?",["त्वचा","अग्न्याशय","हृदय","गुर्दे"],3,"गुर्दे रक्त से अपशिष्ट पदार्थों को छानने में मुख्य भूमिका निभाते हैं।"]],"Maths":[["250 का 12% कितना है?",["30","35","40","25"],0,"250 × 12/100 = 30."],["25 का 20% कितना है?",["10","5","4","20"],1,"25 × 20/100 = 5."],["एक वस्तु का अंकित मूल्य 800 रुपये है और 10% छूट है। विक्रय मूल्य क्या होगा?",["760","700","740","720"],3,"800 का 10% = 80, इसलिए विक्रय मूल्य 720 रुपये है।"],["एक वस्तु का अंकित मूल्य 800 रुपये है और 10% छूट है। विक्रय मूल्य क्या होगा?",["760","720","740","700"],1,"800 का 10% = 80, इसलिए विक्रय मूल्य 720 रुपये है।"],["एक वस्तु का अंकित मूल्य 800 रुपये है और 10% छूट है। विक्रय मूल्य क्या होगा?",["720","700","760","740"],0,"800 का 10% = 80, इसलिए विक्रय मूल्य 720 रुपये है।"],["एक वस्तु का अंकित मूल्य 800 रुपये है और 10% छूट है। विक्रय मूल्य क्या होगा?",["700","720","740","760"],1,"800 का 10% = 80, इसलिए विक्रय मूल्य 720 रुपये है।"],["एक वस्तु का अंकित मूल्य 800 रुपये है और 10% छूट है। विक्रय मूल्य क्या होगा?",["760","700","720","740"],2,"800 का 10% = 80, इसलिए विक्रय मूल्य 720 रुपये है।"],["एक वस्तु का अंकित मूल्य 800 रुपये है और 10% छूट है। विक्रय मूल्य क्या होगा?",["700","720","760","740"],1,"800 का 10% = 80, इसलिए विक्रय मूल्य 720 रुपये है।"],["एक वस्तु का अंकित मूल्य 800 रुपये है और 10% छूट है। विक्रय मूल्य क्या होगा?",["760","700","720","740"],2,"800 का 10% = 80, इसलिए विक्रय मूल्य 720 रुपये है।"],["एक वस्तु का अंकित मूल्य 800 रुपये है और 10% छूट है। विक्रय मूल्य क्या होगा?",["740","760","700","720"],3,"800 का 10% = 80, इसलिए विक्रय मूल्य 720 रुपये है।"],["एक वस्तु का अंकित मूल्य 800 रुपये है और 10% छूट है। विक्रय मूल्य क्या होगा?",["740","700","760","720"],3,"800 का 10% = 80, इसलिए विक्रय मूल्य 720 रुपये है।"],["एक वस्तु का अंकित मूल्य 800 रुपये है और 10% छूट है। विक्रय मूल्य क्या होगा?",["700","720","760","740"],1,"800 का 10% = 80, इसलिए विक्रय मूल्य 720 रुपये है।"],["एक वस्तु का अंकित मूल्य 800 रुपये है और 10% छूट है। विक्रय मूल्य क्या होगा?",["760","720","700","740"],1,"800 का 10% = 80, इसलिए विक्रय मूल्य 720 रुपये है।"],["एक वस्तु का अंकित मूल्य 800 रुपये है और 10% छूट है। विक्रय मूल्य क्या होगा?",["760","700","720","740"],2,"800 का 10% = 80, इसलिए विक्रय मूल्य 720 रुपये है।"],["एक वस्तु का अंकित मूल्य 800 रुपये है और 10% छूट है। विक्रय मूल्य क्या होगा?",["760","700","720","740"],2,"800 का 10% = 80, इसलिए विक्रय मूल्य 720 रुपये है।"],["एक वस्तु का अंकित मूल्य 800 रुपये है और 10% छूट है। विक्रय मूल्य क्या होगा?",["740","760","700","720"],3,"800 का 10% = 80, इसलिए विक्रय मूल्य 720 रुपये है।"],["एक वस्तु का अंकित मूल्य 800 रुपये है और 10% छूट है। विक्रय मूल्य क्या होगा?",["760","700","720","740"],2,"800 का 10% = 80, इसलिए विक्रय मूल्य 720 रुपये है।"],["एक वस्तु का अंकित मूल्य 800 रुपये है और 10% छूट है। विक्रय मूल्य क्या होगा?",["700","740","760","720"],3,"800 का 10% = 80, इसलिए विक्रय मूल्य 720 रुपये है।"],["एक वस्तु का अंकित मूल्य 800 रुपये है और 10% छूट है। विक्रय मूल्य क्या होगा?",["760","720","740","700"],1,"800 का 10% = 80, इसलिए विक्रय मूल्य 720 रुपये है।"],["एक वस्तु का अंकित मूल्य 800 रुपये है और 10% छूट है। विक्रय मूल्य क्या होगा?",["720","760","700","740"],0,"800 का 10% = 80, इसलिए विक्रय मूल्य 720 रुपये है।"]],"Reasoning":[["श्रृंखला: 2, 4, 8, 16, ?",["36","24","20","32"],3,"हर संख्या को 2 से गुणा किया गया है।"],["श्रृंखला: 1, 4, 9, 16, ?",["49","20","36","25"],3,"ये क्रमशः 1², 2², 3², 4² हैं; अगला 5² = 25."],["एक व्यक्ति उत्तर की ओर 10 m चलता है, फिर दाएँ मुड़कर 5 m चलता है। वह प्रारंभिक स्थान से किस दिशा में है?",["उत्तर-पूर्व","दक्षिण-पूर्व","दक्षिण-पश्चिम","उत्तर-पश्चिम"],0,"उत्तर के बाद दाएँ मुड़ने पर पूर्व दिशा आती है; स्थिति उत्तर-पूर्व है।"],["एक व्यक्ति उत्तर की ओर 10 m चलता है, फिर दाएँ मुड़कर 5 m चलता है। वह प्रारंभिक स्थान से किस दिशा में है?",["उत्तर-पश्चिम","उत्तर-पूर्व","दक्षिण-पूर्व","दक्षिण-पश्चिम"],1,"उत्तर के बाद दाएँ मुड़ने पर पूर्व दिशा आती है; स्थिति उत्तर-पूर्व है।"],["एक व्यक्ति उत्तर की ओर 10 m चलता है, फिर दाएँ मुड़कर 5 m चलता है। वह प्रारंभिक स्थान से किस दिशा में है?",["उत्तर-पूर्व","उत्तर-पश्चिम","दक्षिण-पूर्व","दक्षिण-पश्चिम"],0,"उत्तर के बाद दाएँ मुड़ने पर पूर्व दिशा आती है; स्थिति उत्तर-पूर्व है।"],["एक व्यक्ति उत्तर की ओर 10 m चलता है, फिर दाएँ मुड़कर 5 m चलता है। वह प्रारंभिक स्थान से किस दिशा में है?",["दक्षिण-पश्चिम","दक्षिण-पूर्व","उत्तर-पश्चिम","उत्तर-पूर्व"],3,"उत्तर के बाद दाएँ मुड़ने पर पूर्व दिशा आती है; स्थिति उत्तर-पूर्व है।"],["एक व्यक्ति उत्तर की ओर 10 m चलता है, फिर दाएँ मुड़कर 5 m चलता है। वह प्रारंभिक स्थान से किस दिशा में है?",["दक्षिण-पश्चिम","दक्षिण-पूर्व","उत्तर-पश्चिम","उत्तर-पूर्व"],3,"उत्तर के बाद दाएँ मुड़ने पर पूर्व दिशा आती है; स्थिति उत्तर-पूर्व है।"],["एक व्यक्ति उत्तर की ओर 10 m चलता है, फिर दाएँ मुड़कर 5 m चलता है। वह प्रारंभिक स्थान से किस दिशा में है?",["उत्तर-पश्चिम","दक्षिण-पश्चिम","उत्तर-पूर्व","दक्षिण-पूर्व"],2,"उत्तर के बाद दाएँ मुड़ने पर पूर्व दिशा आती है; स्थिति उत्तर-पूर्व है।"],["एक व्यक्ति उत्तर की ओर 10 m चलता है, फिर दाएँ मुड़कर 5 m चलता है। वह प्रारंभिक स्थान से किस दिशा में है?",["उत्तर-पश्चिम","दक्षिण-पूर्व","दक्षिण-पश्चिम","उत्तर-पूर्व"],3,"उत्तर के बाद दाएँ मुड़ने पर पूर्व दिशा आती है; स्थिति उत्तर-पूर्व है।"],["एक व्यक्ति उत्तर की ओर 10 m चलता है, फिर दाएँ मुड़कर 5 m चलता है। वह प्रारंभिक स्थान से किस दिशा में है?",["दक्षिण-पश्चिम","दक्षिण-पूर्व","उत्तर-पश्चिम","उत्तर-पूर्व"],3,"उत्तर के बाद दाएँ मुड़ने पर पूर्व दिशा आती है; स्थिति उत्तर-पूर्व है।"],["एक व्यक्ति उत्तर की ओर 10 m चलता है, फिर दाएँ मुड़कर 5 m चलता है। वह प्रारंभिक स्थान से किस दिशा में है?",["उत्तर-पूर्व","दक्षिण-पूर्व","दक्षिण-पश्चिम","उत्तर-पश्चिम"],0,"उत्तर के बाद दाएँ मुड़ने पर पूर्व दिशा आती है; स्थिति उत्तर-पूर्व है।"],["एक व्यक्ति उत्तर की ओर 10 m चलता है, फिर दाएँ मुड़कर 5 m चलता है। वह प्रारंभिक स्थान से किस दिशा में है?",["उत्तर-पश्चिम","दक्षिण-पश्चिम","उत्तर-पूर्व","दक्षिण-पूर्व"],2,"उत्तर के बाद दाएँ मुड़ने पर पूर्व दिशा आती है; स्थिति उत्तर-पूर्व है।"],["एक व्यक्ति उत्तर की ओर 10 m चलता है, फिर दाएँ मुड़कर 5 m चलता है। वह प्रारंभिक स्थान से किस दिशा में है?",["दक्षिण-पश्चिम","उत्तर-पूर्व","उत्तर-पश्चिम","दक्षिण-पूर्व"],1,"उत्तर के बाद दाएँ मुड़ने पर पूर्व दिशा आती है; स्थिति उत्तर-पूर्व है।"],["एक व्यक्ति उत्तर की ओर 10 m चलता है, फिर दाएँ मुड़कर 5 m चलता है। वह प्रारंभिक स्थान से किस दिशा में है?",["उत्तर-पूर्व","दक्षिण-पश्चिम","दक्षिण-पूर्व","उत्तर-पश्चिम"],0,"उत्तर के बाद दाएँ मुड़ने पर पूर्व दिशा आती है; स्थिति उत्तर-पूर्व है।"],["एक व्यक्ति उत्तर की ओर 10 m चलता है, फिर दाएँ मुड़कर 5 m चलता है। वह प्रारंभिक स्थान से किस दिशा में है?",["उत्तर-पूर्व","दक्षिण-पूर्व","दक्षिण-पश्चिम","उत्तर-पश्चिम"],0,"उत्तर के बाद दाएँ मुड़ने पर पूर्व दिशा आती है; स्थिति उत्तर-पूर्व है।"],["एक व्यक्ति उत्तर की ओर 10 m चलता है, फिर दाएँ मुड़कर 5 m चलता है। वह प्रारंभिक स्थान से किस दिशा में है?",["दक्षिण-पश्चिम","दक्षिण-पूर्व","उत्तर-पश्चिम","उत्तर-पूर्व"],3,"उत्तर के बाद दाएँ मुड़ने पर पूर्व दिशा आती है; स्थिति उत्तर-पूर्व है।"],["एक व्यक्ति उत्तर की ओर 10 m चलता है, फिर दाएँ मुड़कर 5 m चलता है। वह प्रारंभिक स्थान से किस दिशा में है?",["उत्तर-पश्चिम","दक्षिण-पश्चिम","दक्षिण-पूर्व","उत्तर-पूर्व"],3,"उत्तर के बाद दाएँ मुड़ने पर पूर्व दिशा आती है; स्थिति उत्तर-पूर्व है।"],["एक व्यक्ति उत्तर की ओर 10 m चलता है, फिर दाएँ मुड़कर 5 m चलता है। वह प्रारंभिक स्थान से किस दिशा में है?",["उत्तर-पूर्व","उत्तर-पश्चिम","दक्षिण-पूर्व","दक्षिण-पश्चिम"],0,"उत्तर के बाद दाएँ मुड़ने पर पूर्व दिशा आती है; स्थिति उत्तर-पूर्व है।"],["एक व्यक्ति उत्तर की ओर 10 m चलता है, फिर दाएँ मुड़कर 5 m चलता है। वह प्रारंभिक स्थान से किस दिशा में है?",["दक्षिण-पूर्व","दक्षिण-पश्चिम","उत्तर-पश्चिम","उत्तर-पूर्व"],3,"उत्तर के बाद दाएँ मुड़ने पर पूर्व दिशा आती है; स्थिति उत्तर-पूर्व है।"],["एक व्यक्ति उत्तर की ओर 10 m चलता है, फिर दाएँ मुड़कर 5 m चलता है। वह प्रारंभिक स्थान से किस दिशा में है?",["उत्तर-पूर्व","उत्तर-पश्चिम","दक्षिण-पश्चिम","दक्षिण-पूर्व"],0,"उत्तर के बाद दाएँ मुड़ने पर पूर्व दिशा आती है; स्थिति उत्तर-पूर्व है।"]],"Hindi":[["‘दिन’ का विलोम क्या है?",["दोपहर","संध्या","रात","प्रभात"],2,"दिन का विलोम रात है।"],["‘लाभ’ का विलोम क्या है?",["उन्नति","हानि","वृद्धि","जीत"],1,"लाभ का विलोम हानि है।"],["‘जो मेहनत करता है, वह सफल होता है।’ यह कौन सा वाक्य है?",["विस्मयादिबोधक","संयुक्त","सरल","मिश्र"],3,"इसमें एक प्रधान और एक आश्रित उपवाक्य है, इसलिए मिश्र वाक्य है।"],["‘जो मेहनत करता है, वह सफल होता है।’ यह कौन सा वाक्य है?",["विस्मयादिबोधक","सरल","संयुक्त","मिश्र"],3,"इसमें एक प्रधान और एक आश्रित उपवाक्य है, इसलिए मिश्र वाक्य है।"],["‘जो मेहनत करता है, वह सफल होता है।’ यह कौन सा वाक्य है?",["मिश्र","संयुक्त","सरल","विस्मयादिबोधक"],0,"इसमें एक प्रधान और एक आश्रित उपवाक्य है, इसलिए मिश्र वाक्य है।"],["‘जो मेहनत करता है, वह सफल होता है।’ यह कौन सा वाक्य है?",["विस्मयादिबोधक","संयुक्त","सरल","मिश्र"],3,"इसमें एक प्रधान और एक आश्रित उपवाक्य है, इसलिए मिश्र वाक्य है।"],["‘जो मेहनत करता है, वह सफल होता है।’ यह कौन सा वाक्य है?",["संयुक्त","मिश्र","विस्मयादिबोधक","सरल"],1,"इसमें एक प्रधान और एक आश्रित उपवाक्य है, इसलिए मिश्र वाक्य है।"],["‘जो मेहनत करता है, वह सफल होता है।’ यह कौन सा वाक्य है?",["सरल","मिश्र","विस्मयादिबोधक","संयुक्त"],1,"इसमें एक प्रधान और एक आश्रित उपवाक्य है, इसलिए मिश्र वाक्य है।"],["‘जो मेहनत करता है, वह सफल होता है।’ यह कौन सा वाक्य है?",["संयुक्त","सरल","विस्मयादिबोधक","मिश्र"],3,"इसमें एक प्रधान और एक आश्रित उपवाक्य है, इसलिए मिश्र वाक्य है।"],["‘जो मेहनत करता है, वह सफल होता है।’ यह कौन सा वाक्य है?",["विस्मयादिबोधक","मिश्र","सरल","संयुक्त"],1,"इसमें एक प्रधान और एक आश्रित उपवाक्य है, इसलिए मिश्र वाक्य है।"],["‘जो मेहनत करता है, वह सफल होता है।’ यह कौन सा वाक्य है?",["संयुक्त","विस्मयादिबोधक","मिश्र","सरल"],2,"इसमें एक प्रधान और एक आश्रित उपवाक्य है, इसलिए मिश्र वाक्य है।"],["‘जो मेहनत करता है, वह सफल होता है।’ यह कौन सा वाक्य है?",["मिश्र","संयुक्त","विस्मयादिबोधक","सरल"],0,"इसमें एक प्रधान और एक आश्रित उपवाक्य है, इसलिए मिश्र वाक्य है।"],["‘जो मेहनत करता है, वह सफल होता है।’ यह कौन सा वाक्य है?",["सरल","संयुक्त","विस्मयादिबोधक","मिश्र"],3,"इसमें एक प्रधान और एक आश्रित उपवाक्य है, इसलिए मिश्र वाक्य है।"],["‘जो मेहनत करता है, वह सफल होता है।’ यह कौन सा वाक्य है?",["विस्मयादिबोधक","सरल","मिश्र","संयुक्त"],2,"इसमें एक प्रधान और एक आश्रित उपवाक्य है, इसलिए मिश्र वाक्य है।"],["‘जो मेहनत करता है, वह सफल होता है।’ यह कौन सा वाक्य है?",["विस्मयादिबोधक","सरल","मिश्र","संयुक्त"],2,"इसमें एक प्रधान और एक आश्रित उपवाक्य है, इसलिए मिश्र वाक्य है।"],["‘जो मेहनत करता है, वह सफल होता है।’ यह कौन सा वाक्य है?",["सरल","संयुक्त","विस्मयादिबोधक","मिश्र"],3,"इसमें एक प्रधान और एक आश्रित उपवाक्य है, इसलिए मिश्र वाक्य है।"],["‘जो मेहनत करता है, वह सफल होता है।’ यह कौन सा वाक्य है?",["मिश्र","संयुक्त","सरल","विस्मयादिबोधक"],0,"इसमें एक प्रधान और एक आश्रित उपवाक्य है, इसलिए मिश्र वाक्य है।"],["‘जो मेहनत करता है, वह सफल होता है।’ यह कौन सा वाक्य है?",["मिश्र","संयुक्त","विस्मयादिबोधक","सरल"],0,"इसमें एक प्रधान और एक आश्रित उपवाक्य है, इसलिए मिश्र वाक्य है।"],["‘जो मेहनत करता है, वह सफल होता है।’ यह कौन सा वाक्य है?",["सरल","संयुक्त","विस्मयादिबोधक","मिश्र"],3,"इसमें एक प्रधान और एक आश्रित उपवाक्य है, इसलिए मिश्र वाक्य है।"],["‘जो मेहनत करता है, वह सफल होता है।’ यह कौन सा वाक्य है?",["संयुक्त","सरल","विस्मयादिबोधक","मिश्र"],3,"इसमें एक प्रधान और एक आश्रित उपवाक्य है, इसलिए मिश्र वाक्य है।"]],"English":[["Choose the correct spelling:",["Receve","Receeve","Recieve","Receive"],3,"The correct spelling is Receive."],["Opposite of 'Ancient' is:",["Historic","Modern","Old","Past"],1,"The opposite of Ancient is Modern."],["Choose the correct conjunction: “I was tired ___ I continued working.”",["or","so","but","because"],2,"But connects two contrasting ideas."],["Choose the correct conjunction: “I was tired ___ I continued working.”",["so","but","or","because"],1,"But connects two contrasting ideas."],["Choose the correct conjunction: “I was tired ___ I continued working.”",["because","or","but","so"],2,"But connects two contrasting ideas."],["Choose the correct conjunction: “I was tired ___ I continued working.”",["but","or","so","because"],0,"But connects two contrasting ideas."],["Choose the correct conjunction: “I was tired ___ I continued working.”",["but","or","because","so"],0,"But connects two contrasting ideas."],["Choose the correct conjunction: “I was tired ___ I continued working.”",["because","or","so","but"],3,"But connects two contrasting ideas."],["Choose the correct conjunction: “I was tired ___ I continued working.”",["because","so","or","but"],3,"But connects two contrasting ideas."],["Choose the correct conjunction: “I was tired ___ I continued working.”",["so","because","or","but"],3,"But connects two contrasting ideas."],["Choose the correct conjunction: “I was tired ___ I continued working.”",["because","but","so","or"],1,"But connects two contrasting ideas."],["Choose the correct conjunction: “I was tired ___ I continued working.”",["because","but","or","so"],1,"But connects two contrasting ideas."],["Choose the correct conjunction: “I was tired ___ I continued working.”",["or","because","but","so"],2,"But connects two contrasting ideas."],["Choose the correct conjunction: “I was tired ___ I continued working.”",["so","because","or","but"],3,"But connects two contrasting ideas."],["Choose the correct conjunction: “I was tired ___ I continued working.”",["so","because","but","or"],2,"But connects two contrasting ideas."],["Choose the correct conjunction: “I was tired ___ I continued working.”",["so","but","because","or"],1,"But connects two contrasting ideas."],["Choose the correct conjunction: “I was tired ___ I continued working.”",["but","so","or","because"],0,"But connects two contrasting ideas."],["Choose the correct conjunction: “I was tired ___ I continued working.”",["so","but","because","or"],1,"But connects two contrasting ideas."],["Choose the correct conjunction: “I was tired ___ I continued working.”",["but","because","or","so"],0,"But connects two contrasting ideas."],["Choose the correct conjunction: “I was tired ___ I continued working.”",["so","but","or","because"],1,"But connects two contrasting ideas."]],"Economics":[["भारत की मुद्रा क्या है?",["येन","रुपया","डॉलर","पाउंड"],1,"भारत की आधिकारिक मुद्रा भारतीय रुपया है।"],["भारत में राष्ट्रीय आय के आधिकारिक अनुमान से संबंधित प्रमुख संस्था कौन सी है?",["UPSC","SEBI","RBI केवल","NSO"],3,"राष्ट्रीय सांख्यिकी कार्यालय (NSO) राष्ट्रीय आय के आंकड़ों से संबंधित प्रमुख संस्था है।"],["भारत में राष्ट्रीय आय के आधिकारिक अनुमान से संबंधित प्रमुख संस्था कौन सी है?",["SEBI","NSO","UPSC","RBI केवल"],1,"राष्ट्रीय सांख्यिकी कार्यालय (NSO) राष्ट्रीय आय के आंकड़ों से संबंधित प्रमुख संस्था है।"],["भारत में राष्ट्रीय आय के आधिकारिक अनुमान से संबंधित प्रमुख संस्था कौन सी है?",["UPSC","SEBI","RBI केवल","NSO"],3,"राष्ट्रीय सांख्यिकी कार्यालय (NSO) राष्ट्रीय आय के आंकड़ों से संबंधित प्रमुख संस्था है।"],["भारत में राष्ट्रीय आय के आधिकारिक अनुमान से संबंधित प्रमुख संस्था कौन सी है?",["UPSC","SEBI","RBI केवल","NSO"],3,"राष्ट्रीय सांख्यिकी कार्यालय (NSO) राष्ट्रीय आय के आंकड़ों से संबंधित प्रमुख संस्था है।"],["भारत में राष्ट्रीय आय के आधिकारिक अनुमान से संबंधित प्रमुख संस्था कौन सी है?",["RBI केवल","NSO","UPSC","SEBI"],1,"राष्ट्रीय सांख्यिकी कार्यालय (NSO) राष्ट्रीय आय के आंकड़ों से संबंधित प्रमुख संस्था है।"],["भारत में राष्ट्रीय आय के आधिकारिक अनुमान से संबंधित प्रमुख संस्था कौन सी है?",["SEBI","RBI केवल","NSO","UPSC"],2,"राष्ट्रीय सांख्यिकी कार्यालय (NSO) राष्ट्रीय आय के आंकड़ों से संबंधित प्रमुख संस्था है।"],["भारत में राष्ट्रीय आय के आधिकारिक अनुमान से संबंधित प्रमुख संस्था कौन सी है?",["NSO","UPSC","RBI केवल","SEBI"],0,"राष्ट्रीय सांख्यिकी कार्यालय (NSO) राष्ट्रीय आय के आंकड़ों से संबंधित प्रमुख संस्था है।"],["भारत में राष्ट्रीय आय के आधिकारिक अनुमान से संबंधित प्रमुख संस्था कौन सी है?",["NSO","SEBI","UPSC","RBI केवल"],0,"राष्ट्रीय सांख्यिकी कार्यालय (NSO) राष्ट्रीय आय के आंकड़ों से संबंधित प्रमुख संस्था है।"],["भारत में राष्ट्रीय आय के आधिकारिक अनुमान से संबंधित प्रमुख संस्था कौन सी है?",["SEBI","UPSC","NSO","RBI केवल"],2,"राष्ट्रीय सांख्यिकी कार्यालय (NSO) राष्ट्रीय आय के आंकड़ों से संबंधित प्रमुख संस्था है।"],["भारत में राष्ट्रीय आय के आधिकारिक अनुमान से संबंधित प्रमुख संस्था कौन सी है?",["UPSC","NSO","RBI केवल","SEBI"],1,"राष्ट्रीय सांख्यिकी कार्यालय (NSO) राष्ट्रीय आय के आंकड़ों से संबंधित प्रमुख संस्था है।"],["भारत में राष्ट्रीय आय के आधिकारिक अनुमान से संबंधित प्रमुख संस्था कौन सी है?",["RBI केवल","UPSC","NSO","SEBI"],2,"राष्ट्रीय सांख्यिकी कार्यालय (NSO) राष्ट्रीय आय के आंकड़ों से संबंधित प्रमुख संस्था है।"],["भारत में राष्ट्रीय आय के आधिकारिक अनुमान से संबंधित प्रमुख संस्था कौन सी है?",["NSO","SEBI","RBI केवल","UPSC"],0,"राष्ट्रीय सांख्यिकी कार्यालय (NSO) राष्ट्रीय आय के आंकड़ों से संबंधित प्रमुख संस्था है।"],["भारत में राष्ट्रीय आय के आधिकारिक अनुमान से संबंधित प्रमुख संस्था कौन सी है?",["RBI केवल","UPSC","SEBI","NSO"],3,"राष्ट्रीय सांख्यिकी कार्यालय (NSO) राष्ट्रीय आय के आंकड़ों से संबंधित प्रमुख संस्था है।"],["भारत में राष्ट्रीय आय के आधिकारिक अनुमान से संबंधित प्रमुख संस्था कौन सी है?",["UPSC","NSO","SEBI","RBI केवल"],1,"राष्ट्रीय सांख्यिकी कार्यालय (NSO) राष्ट्रीय आय के आंकड़ों से संबंधित प्रमुख संस्था है।"],["भारत में राष्ट्रीय आय के आधिकारिक अनुमान से संबंधित प्रमुख संस्था कौन सी है?",["RBI केवल","SEBI","NSO","UPSC"],2,"राष्ट्रीय सांख्यिकी कार्यालय (NSO) राष्ट्रीय आय के आंकड़ों से संबंधित प्रमुख संस्था है।"],["भारत में राष्ट्रीय आय के आधिकारिक अनुमान से संबंधित प्रमुख संस्था कौन सी है?",["SEBI","UPSC","RBI केवल","NSO"],3,"राष्ट्रीय सांख्यिकी कार्यालय (NSO) राष्ट्रीय आय के आंकड़ों से संबंधित प्रमुख संस्था है।"],["भारत में राष्ट्रीय आय के आधिकारिक अनुमान से संबंधित प्रमुख संस्था कौन सी है?",["SEBI","UPSC","RBI केवल","NSO"],3,"राष्ट्रीय सांख्यिकी कार्यालय (NSO) राष्ट्रीय आय के आंकड़ों से संबंधित प्रमुख संस्था है।"],["भारत में राष्ट्रीय आय के आधिकारिक अनुमान से संबंधित प्रमुख संस्था कौन सी है?",["SEBI","NSO","RBI केवल","UPSC"],1,"राष्ट्रीय सांख्यिकी कार्यालय (NSO) राष्ट्रीय आय के आंकड़ों से संबंधित प्रमुख संस्था है।"],["भारत में राष्ट्रीय आय के आधिकारिक अनुमान से संबंधित प्रमुख संस्था कौन सी है?",["UPSC","NSO","RBI केवल","SEBI"],1,"राष्ट्रीय सांख्यिकी कार्यालय (NSO) राष्ट्रीय आय के आंकड़ों से संबंधित प्रमुख संस्था है।"]],"Indian Art & Culture":[["एलोरा की गुफाएँ किस राज्य में हैं?",["महाराष्ट्र","ओडिशा","कर्नाटक","गुजरात"],0,"एलोरा की गुफाएँ महाराष्ट्र में स्थित हैं।"],["भरतनाट्यम किस राज्य की प्रमुख शास्त्रीय नृत्य शैली है?",["ओडिशा","तमिलनाडु","असम","केरल"],1,"भरतनाट्यम तमिलनाडु से संबंधित शास्त्रीय नृत्य शैली है।"],["भरतनाट्यम किस राज्य की प्रमुख शास्त्रीय नृत्य शैली है?",["तमिलनाडु","असम","ओडिशा","केरल"],0,"भरतनाट्यम तमिलनाडु से संबंधित शास्त्रीय नृत्य शैली है।"],["भरतनाट्यम किस राज्य की प्रमुख शास्त्रीय नृत्य शैली है?",["केरल","ओडिशा","असम","तमिलनाडु"],3,"भरतनाट्यम तमिलनाडु से संबंधित शास्त्रीय नृत्य शैली है।"],["भरतनाट्यम किस राज्य की प्रमुख शास्त्रीय नृत्य शैली है?",["केरल","ओडिशा","असम","तमिलनाडु"],3,"भरतनाट्यम तमिलनाडु से संबंधित शास्त्रीय नृत्य शैली है।"],["भरतनाट्यम किस राज्य की प्रमुख शास्त्रीय नृत्य शैली है?",["असम","ओडिशा","तमिलनाडु","केरल"],2,"भरतनाट्यम तमिलनाडु से संबंधित शास्त्रीय नृत्य शैली है।"],["भरतनाट्यम किस राज्य की प्रमुख शास्त्रीय नृत्य शैली है?",["तमिलनाडु","ओडिशा","असम","केरल"],0,"भरतनाट्यम तमिलनाडु से संबंधित शास्त्रीय नृत्य शैली है।"],["भरतनाट्यम किस राज्य की प्रमुख शास्त्रीय नृत्य शैली है?",["केरल","तमिलनाडु","असम","ओडिशा"],1,"भरतनाट्यम तमिलनाडु से संबंधित शास्त्रीय नृत्य शैली है।"],["भरतनाट्यम किस राज्य की प्रमुख शास्त्रीय नृत्य शैली है?",["ओडिशा","असम","तमिलनाडु","केरल"],2,"भरतनाट्यम तमिलनाडु से संबंधित शास्त्रीय नृत्य शैली है।"],["भरतनाट्यम किस राज्य की प्रमुख शास्त्रीय नृत्य शैली है?",["ओडिशा","केरल","असम","तमिलनाडु"],3,"भरतनाट्यम तमिलनाडु से संबंधित शास्त्रीय नृत्य शैली है।"],["भरतनाट्यम किस राज्य की प्रमुख शास्त्रीय नृत्य शैली है?",["असम","ओडिशा","तमिलनाडु","केरल"],2,"भरतनाट्यम तमिलनाडु से संबंधित शास्त्रीय नृत्य शैली है।"],["भरतनाट्यम किस राज्य की प्रमुख शास्त्रीय नृत्य शैली है?",["तमिलनाडु","असम","ओडिशा","केरल"],0,"भरतनाट्यम तमिलनाडु से संबंधित शास्त्रीय नृत्य शैली है।"],["भरतनाट्यम किस राज्य की प्रमुख शास्त्रीय नृत्य शैली है?",["केरल","ओडिशा","तमिलनाडु","असम"],2,"भरतनाट्यम तमिलनाडु से संबंधित शास्त्रीय नृत्य शैली है।"],["भरतनाट्यम किस राज्य की प्रमुख शास्त्रीय नृत्य शैली है?",["तमिलनाडु","ओडिशा","असम","केरल"],0,"भरतनाट्यम तमिलनाडु से संबंधित शास्त्रीय नृत्य शैली है।"],["भरतनाट्यम किस राज्य की प्रमुख शास्त्रीय नृत्य शैली है?",["ओडिशा","केरल","असम","तमिलनाडु"],3,"भरतनाट्यम तमिलनाडु से संबंधित शास्त्रीय नृत्य शैली है।"],["भरतनाट्यम किस राज्य की प्रमुख शास्त्रीय नृत्य शैली है?",["तमिलनाडु","केरल","असम","ओडिशा"],0,"भरतनाट्यम तमिलनाडु से संबंधित शास्त्रीय नृत्य शैली है।"],["भरतनाट्यम किस राज्य की प्रमुख शास्त्रीय नृत्य शैली है?",["तमिलनाडु","असम","केरल","ओडिशा"],0,"भरतनाट्यम तमिलनाडु से संबंधित शास्त्रीय नृत्य शैली है।"],["भरतनाट्यम किस राज्य की प्रमुख शास्त्रीय नृत्य शैली है?",["तमिलनाडु","केरल","ओडिशा","असम"],0,"भरतनाट्यम तमिलनाडु से संबंधित शास्त्रीय नृत्य शैली है।"],["भरतनाट्यम किस राज्य की प्रमुख शास्त्रीय नृत्य शैली है?",["केरल","तमिलनाडु","असम","ओडिशा"],1,"भरतनाट्यम तमिलनाडु से संबंधित शास्त्रीय नृत्य शैली है।"],["भरतनाट्यम किस राज्य की प्रमुख शास्त्रीय नृत्य शैली है?",["केरल","ओडिशा","असम","तमिलनाडु"],3,"भरतनाट्यम तमिलनाडु से संबंधित शास्त्रीय नृत्य शैली है।"]]};
Object.keys(quiz5V12).forEach(subject => { quizSets[subject][5] = quiz5V12[subject]; });


// ===== V8 Option Click Feedback =====
document.addEventListener("click", (e) => {
  const btn = e.target.closest(".option");
  if(!btn) return;
  btn.classList.remove("option-tap");
  void btn.offsetWidth;
  btn.classList.add("option-tap");
}, {passive:true});


/* ===== V13 Progress + Bookmark + Search Engine ===== */
function saveBookmarks(){localStorage.setItem("nlqBookmarks",JSON.stringify(bookmarks));}
function toggleBookmark(key,q){
 const i=bookmarks.findIndex(b=>b.key===key);
 if(i>=0){bookmarks.splice(i,1); $("#bookmarkBtn").classList.remove("marked");}
 else{bookmarks.push({key,subject:selectedSubject,quiz:selectedQuiz,index,question:q[0],options:q[1],correct:q[2],explain:q[3]}); $("#bookmarkBtn").classList.add("marked");}
 saveBookmarks(); renderBookmarks();
}
function renderBookmarks(){
 const box=$("#bookmarkList"); if(!box)return;
 if(!bookmarks.length){box.innerHTML='<div class="bookmark-empty">🔖<br><br>अभी कोई question bookmark नहीं किया गया है।<br>Quiz में 🔖 दबाकर important questions save करो।</div>';return;}
 box.innerHTML=bookmarks.map((b,i)=>`<div class="bookmark-card"><div class="bookmark-top"><div><b>${escapeHtml(b.question)}</b><div class="bookmark-meta">${escapeHtml(b.subject)} • Quiz ${b.quiz} • Question ${b.index+1}</div></div><button class="remove-bookmark" data-rm="${i}">Remove</button></div><div class="search-actions"><button class="small-open" data-openbm="${i}">Question खोलें →</button></div></div>`).join('');
 box.querySelectorAll('[data-rm]').forEach(x=>x.onclick=()=>{bookmarks.splice(+x.dataset.rm,1);saveBookmarks();renderBookmarks();});
 box.querySelectorAll('[data-openbm]').forEach(x=>x.onclick=()=>{const b=bookmarks[+x.dataset.openbm]; show('quiz'); startQuiz(b.subject,b.quiz);});
}
function escapeHtml(v){return String(v).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));}
function allSearchQuestions(){
 const out=[]; Object.keys(quizSets).forEach(sub=>Object.keys(quizSets[sub]||{}).forEach(no=>{(quizSets[sub][no]||[]).forEach((q,i)=>out.push({subject:sub,quiz:+no,index:i,q}));})); return out;
}
function runSearch(){
 const term=( $("#searchInput")?.value||'' ).trim().toLowerCase(); const box=$("#searchResults"); if(!box)return;
 if(!term){box.innerHTML='<p class="muted">ऊपर search करके questions खोजें।</p>';return;}
 const hits=allSearchQuestions().filter(x=>[x.q[0],x.q[1].join(' '),x.q[3],x.subject].join(' ').toLowerCase().includes(term)).slice(0,50);
 box.innerHTML=hits.length?hits.map((x,i)=>`<div class="search-card"><b>${escapeHtml(x.q[0])}</b><div class="search-meta">${escapeHtml(x.subject)} • Quiz ${x.quiz} • Q${x.index+1}</div><div class="search-actions"><button class="small-open" data-result="${i}">Quiz में खोलें →</button></div></div>`).join(''):'<p class="muted">😕 कोई matching question नहीं मिला।</p>';
 box.querySelectorAll('[data-result]').forEach(btn=>btn.onclick=()=>{const x=hits[+btn.dataset.result];show('quiz');startQuiz(x.subject,x.quiz);});
}
renderBookmarks();
$("#searchInput")?.addEventListener('input',runSearch);




// ===== V14 MIXED MOCK TEST =====
let mockQuestions=[], mockAnswers={}, mockTimer=null, mockSeconds=1800;
function buildMock(){
 const pool=[]; Object.keys(quizSets).forEach(sub=>Object.keys(quizSets[sub]).forEach(n=>(quizSets[sub][n]||[]).forEach(q=>pool.push({subject:sub,q}))));
 const seen=new Set(), unique=pool.filter(x=>{const k=x.q[0]; if(seen.has(k))return false; seen.add(k); return true;});
 for(let i=unique.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[unique[i],unique[j]]=[unique[j],unique[i]]}
 mockQuestions=unique.slice(0,50); mockAnswers={};
}
function renderMock(){const a=document.querySelector('#mockArea'); if(!a)return; a.innerHTML=`<div class="mock-q"><b>Time: <span id="mockClock">30:00</span></b></div>`+mockQuestions.map((x,i)=>{const q=x.q; return `<div class="mock-q"><b>Q${i+1}. ${escapeHtml(q[0])}</b>${q[1].map((o,k)=>`<button class="mock-opt" data-mq="${i}" data-mo="${k}">${String.fromCharCode(65+k)}. ${escapeHtml(o)}</button>`).join('')}</div>`}).join('')+`<button class="primary mock-submit" id="submitMock">Submit Mock Test</button>`;
 a.querySelectorAll('.mock-opt').forEach(b=>b.onclick=()=>{const i=+b.dataset.mq; mockAnswers[i]=+b.dataset.mo; a.querySelectorAll(`[data-mq="${i}"]`).forEach(x=>x.classList.remove('selected'));b.classList.add('selected');});
 document.querySelector('#submitMock').onclick=finishMock; clearInterval(mockTimer); mockSeconds=1800; updateMockClock(); mockTimer=setInterval(()=>{mockSeconds--;updateMockClock();if(mockSeconds<=0)finishMock();},1000);
}
function updateMockClock(){const el=document.querySelector('#mockClock');if(el)el.textContent=`${String(Math.floor(mockSeconds/60)).padStart(2,'0')}:${String(mockSeconds%60).padStart(2,'0')}`;}
function finishMock(){clearInterval(mockTimer); let correct=0,wrong=0,attempted=0; mockQuestions.forEach((x,i)=>{if(mockAnswers[i]!==undefined){attempted++;if(mockAnswers[i]===x.q[2])correct++;else wrong++;}});const marks=correct-(wrong*.25); const a=document.querySelector('#mockArea'); if(a)a.innerHTML=`<div class="mock-result"><div class="score-big">${marks.toFixed(2)}</div><h3>Mock Test Complete 🎉</h3><p>Correct: ${correct} • Wrong: ${wrong} • Unattempted: ${50-attempted}</p><p>Accuracy: ${attempted?Math.round(correct/attempted*100):0}%</p><button class="primary" id="retryMock">Try Again</button></div>`; if(document.querySelector('#retryMock'))document.querySelector('#retryMock').onclick=startMock;}
function startMock(){buildMock();renderMock();}
if(document.querySelector('#startMock'))document.querySelector('#startMock').onclick=startMock;

/* ===== V16 Settings / Install / Share ===== */
(function(){
 const SOUND_KEY='nlqSoundEnabled', DARK_KEY='nlqDarkMode';
 const soundOn=localStorage.getItem(SOUND_KEY)!=='0';
 let deferredInstall=null;
 window.nlqSoundEnabled=soundOn;
 const originalPlayAnswerSound=window.playAnswerSound;
 window.playAnswerSound=function(ok){if(window.nlqSoundEnabled && originalPlayAnswerSound) originalPlayAnswerSound(ok)};
 function applyDark(on){document.documentElement.classList.toggle('dark',on);document.body.classList.toggle('dark',on);localStorage.setItem(DARK_KEY,on?'1':'0');}
 function initSettings(){
  const st=document.getElementById('soundToggle'), dt=document.getElementById('darkToggle');
  if(st){st.checked=window.nlqSoundEnabled;st.onchange=()=>{window.nlqSoundEnabled=st.checked;localStorage.setItem(SOUND_KEY,st.checked?'1':'0');};}
  if(dt){dt.checked=localStorage.getItem(DARK_KEY)==='1';dt.onchange=()=>applyDark(dt.checked);}
  const rb=document.getElementById('resetBtn'); if(rb) rb.onclick=()=>{if(confirm('Progress और Bookmarks reset करें?')){localStorage.removeItem('nlqStats');localStorage.removeItem('nlqBookmarks');location.reload();}};
  const sb=document.getElementById('shareBtn'); if(sb) sb.onclick=async()=>{const data={title:'Quiz By Saurabh Choudhary',text:'Quiz By Saurabh Choudhary – Smart Quiz Practice for Competitive Exams',url:location.href};try{if(navigator.share) await navigator.share(data);else{await navigator.clipboard.writeText(location.href);alert('App link copy हो गया।');}}catch(e){}};
  const ib=document.getElementById('installBtn'); if(ib) ib.onclick=async()=>{if(deferredInstall){deferredInstall.prompt();await deferredInstall.userChoice;deferredInstall=null;}else alert('Browser menu ⋮ से “Add to Home screen” / “Install app” चुनें।');};
 }
 window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferredInstall=e;const b=document.getElementById('installBtn');if(b)b.textContent='Install Now';});
 window.addEventListener('load',()=>{applyDark(localStorage.getItem(DARK_KEY)==='1');initSettings();});
})();
