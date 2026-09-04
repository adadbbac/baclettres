
function toggleGuide(btn){const box=btn.closest('.tool');box.classList.toggle('open');btn.textContent=box.classList.contains('open')?'إخفاء التوجيه':'أظهر التوجيه'}
function markProgress(key){localStorage.setItem('adab_axis3_progress_'+key,'done');const el=document.querySelector('[data-progress="'+key+'"]');if(el)el.textContent='✓ تم الإنجاز'}
function initProgress(key){const el=document.querySelector('[data-progress="'+key+'"]');if(el&&localStorage.getItem('adab_axis3_progress_'+key)==='done')el.textContent='✓ تم الإنجاز'}
function goBack(){if(history.length>1)history.back();else location.href='axis-03.html'}
document.addEventListener('DOMContentLoaded',()=>{document.querySelectorAll('[data-guide]').forEach(b=>b.addEventListener('click',()=>toggleGuide(b)));});
