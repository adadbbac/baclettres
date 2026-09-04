(function(){
const KEY='adab_bac_users_v2', LEGACY='adab_bac_user_v1', CURRENT='adab_bac_current_v1';
function users(){try{return JSON.parse(localStorage.getItem(KEY)||'[]')}catch(e){return []}}
function saveUsers(a){localStorage.setItem(KEY,JSON.stringify(a))}
function migrate(){let a=users();if(!a.length){try{const old=JSON.parse(localStorage.getItem(LEGACY)||'null');if(old)a=[old]}catch(e){}}if(a.length)localStorage.setItem(KEY,JSON.stringify(a));return a}
function get(){const id=localStorage.getItem(CURRENT);if(!id)return null;return users().find(u=>u.phone===id)||null}
function save(u){const a=users();const i=a.findIndex(x=>x.phone===u.phone);if(i>=0)a[i]=u;else a.push(u);saveUsers(a);localStorage.setItem(CURRENT,u.phone)}
function register(u){migrate();if(users().some(x=>x.phone===u.phone))return false;save(u);return true}
function login(phone,password){migrate();const u=users().find(x=>x.phone===phone&&x.password===password);if(u){localStorage.setItem(CURRENT,u.phone);return u}return null}
function role(u){return u?.status||'guest'}
function can(u,section){if(!u)return false;if(u.status==='suspended')return false;if(section==='research')return ['new','active','verified'].includes(role(u));if(section==='accompaniment')return role(u)==='verified';if(['lessons','exercises','axis'].includes(section))return ['active','verified'].includes(role(u));return false}
window.AdabAuth={get,save,register,login,users,role,can,logout:()=>{localStorage.removeItem(CURRENT);location.href='student-login.html'}};
document.addEventListener('DOMContentLoaded',()=>{migrate();const user=get();document.querySelectorAll('[data-auth-section]').forEach(el=>{const section=el.dataset.authSection;if(!can(user,section)){el.addEventListener('click',e=>{e.preventDefault();location.href='student-login.html?reason='+encodeURIComponent(section)})}});document.querySelectorAll('[data-user-name]').forEach(el=>el.textContent=user?.name||'زائر');document.querySelectorAll('[data-user-status]').forEach(el=>el.textContent=({new:'مستخدم جديد',active:'مستخدم فعليّ',verified:'مستخدم موثّق',suspended:'حساب معلّق'}[role(user)]||'زائر'));});
})();
