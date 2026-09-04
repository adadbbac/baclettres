
function toggleHint(id){
 const el=document.getElementById(id); if(!el)return;
 el.hidden=!el.hidden;
}
function markDone(key){
 localStorage.setItem('adab_bac_axis5_done_'+key,'1');
 const m=document.getElementById('doneMsg'); if(m){m.textContent='✓ تم حفظ إنجازك على هذا الجهاز';m.classList.add('show')}
}
function restoreDone(key){
 const m=document.getElementById('doneMsg');
 if(m && localStorage.getItem('adab_bac_axis5_done_'+key)==='1') m.textContent='✓ سبق أن أنجزت هذه المادة على هذا الجهاز';
}
function chooseOption(btn, correct){
 const box=btn.closest('.quiz'); if(!box)return;
 if(box.dataset.answered==='1') return;
 box.dataset.answered='1';
 const chosen=btn.dataset.letter;
 box.querySelectorAll('.opt').forEach(b=>b.disabled=true);
 btn.classList.add(chosen===correct?'correct':'wrong');
 if(chosen!==correct){
   const right=box.querySelector('.opt[data-letter="'+correct+'"]'); if(right)right.classList.add('correct');
 }
 const f=box.querySelector('.feedback');
 if(f) f.textContent=(chosen===correct?'✓ إجابة موفقة.':'✦ راجع الاختيار المميز ثم عد إلى الفكرة في المادة.')+' الإجابة الصحيحة: '+correct;
 updateQuizProgress();
}
function updateQuizProgress(){
 const qs=[...document.querySelectorAll('.quiz')];
 const done=qs.filter(q=>q.dataset.answered==='1').length;
 const bar=document.querySelector('#quizProgress');
 const txt=document.querySelector('#quizCount');
 if(bar)bar.style.width=(qs.length?done/qs.length*100:0)+'%';
 if(txt)txt.textContent=done+' / '+qs.length;
}
document.addEventListener('DOMContentLoaded',()=>{
 document.querySelectorAll('.step').forEach((el,i)=>{
   el.setAttribute('tabindex','0');
   el.addEventListener('click',()=>el.classList.toggle('active'));
   el.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();el.classList.toggle('active')}});
 });
 document.querySelectorAll('[data-done-key]').forEach(el=>restoreDone(el.dataset.doneKey));
 updateQuizProgress();
});
