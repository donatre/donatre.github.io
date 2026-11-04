(function(){
'use strict';
var N=window.NETWORKS||[],$=function(s){return document.getElementById(s)};
var T={
ru:{title:'NomberFax — поддержать автора',desc:'Поддержать NomberFax: Boosty, DonationAlerts, Donatty и криптовалюта в 85+ сетях.',ogd:'Независимый разработчик и автор контента. Донаты картой и криптой.',
 avaAlt:'Аватар NomberFax',tag:'NomberProjects · независимый разработчик и автор контента',
 bio:'Делаю open-source проекты, полезные инструменты и творческие эксперименты. Ваша поддержка даёт мне больше времени на разработку, поддержку существующих проектов и новые идеи.',bioT:'Спасибо, что вы со мной! ❤️',
 linksAria:'Ссылки',portfolio:'Портфолио',hCards:'Донат картой',bSub:'Подписка',bOnce:'Разово',
 boostyP:'Платформа поддержки авторов. Можно оформить <strong>ежемесячную подписку</strong> и поддерживать регулярно, либо отправить разовый донат.',
 boostyN:'Принимаются Visa / Mastercard и другие банковские карты.',boostyGo:'Поддержать на Boosty →',
 daP:'Разовый донат с сообщением — картой или другим удобным способом.',daN:'Принимаются Visa / Mastercard и другие карты.',daGo:'Отправить донат →',
 dtP:'Быстрый разовый донат с сообщением, без регистрации.',dtN:'Оплата картой и другими способами — доступные варианты видны на странице доната.',dtGo:'Задонатить →',
 hCrypto:'Криптовалюта',show:'Показать все сети',hide:'Скрыть сети',hint:'Выберите сеть и скопируйте адрес. Отправляйте только в той сети, которая указана в строке.',
 searchLbl:'Поиск по сетям',ph:'Поиск: сеть, тикер, chain id…',empty:'Ничего не найдено — попробуйте название или тикер',found:'Найдено: {k} из {n}',
 hOther:'Другие способы',steamP:'Можно отправить скины или подарить игру',steamGo:'Профиль →',thanks:'Спасибо за поддержку!',
 qrAlt:'QR-код адреса',copy:'Копировать',copied:'✓ Скопировано',close:'Закрыть',toast:'Адрес скопирован',evmAll:' · ERC-20 и все EVM-сети',
 copyAria:'Копировать адрес ',qrAria:'QR-код ',qrBig:'Увеличить QR '},
en:{title:'NomberFax — support the creator',desc:'Support NomberFax: Boosty, DonationAlerts, Donatty and crypto on 85+ networks.',ogd:'Independent developer and content creator. Donate by card or crypto.',
 avaAlt:'NomberFax avatar',tag:'NomberProjects · independent developer & content creator',
 bio:'I build open-source projects, useful tools and creative experiments. Your support gives me more time to develop, maintain existing projects and try new ideas.',bioT:'Thank you for being here! ❤️',
 linksAria:'Links',portfolio:'Portfolio',hCards:'Donate by card',bSub:'Subscription',bOnce:'One-time',
 boostyP:'A creator support platform. You can set up a <strong>monthly subscription</strong> to support regularly, or send a one-time donation.',
 boostyN:'Visa, Mastercard and other major bank cards are accepted.',boostyGo:'Support on Boosty →',
 daP:'One-time donation with a message — by card or another convenient method.',daN:'Pay by Visa / Mastercard and other cards.',daGo:'Send a donation →',
 dtP:'Quick one-time donation with a message, no sign-up needed.',dtN:'Pay by Visa / Mastercard and other cards.',dtGo:'Donate →',
 hCrypto:'Crypto',show:'Show all networks',hide:'Hide networks',hint:'Pick a network and copy the address. Send only on the network shown in that row.',
 searchLbl:'Search networks',ph:'Search: network, ticker, chain id…',empty:'Nothing found — try a name or ticker',found:'Found: {k} of {n}',
 hOther:'Other ways',steamP:'You can send skins or gift a game',steamGo:'Profile →',thanks:'Thanks for your support!',
 qrAlt:'Address QR code',copy:'Copy',copied:'✓ Copied',close:'Close',toast:'Address copied',evmAll:' · ERC-20 & all EVM networks',
 copyAria:'Copy address ',qrAria:'QR code ',qrBig:'Enlarge QR '}};
function detect(){var p=null;try{p=new URLSearchParams(location.search).get('lang')}catch(e){}if(p==='ru'||p==='en')return p;
 var s=null;try{s=localStorage.getItem('lang')}catch(e){}if(s==='ru'||s==='en')return s;
 var L=(navigator.languages&&navigator.languages.length)?navigator.languages:[navigator.language||'en'];
 return /^(ru|uk|be|kk|ky|uz|tg|tk|hy|az|ka)\b/i.test(L[0]||'')?'ru':'en'}
var lang=detect();function t(k){return (T[lang]&&T[lang][k])||T.ru[k]||k}
function el(tg,c,txt){var e=document.createElement(tg);if(c)e.className=c;if(txt!=null)e.textContent=txt;return e}
function short(a){return a.length>20?a.slice(0,10)+'…'+a.slice(-8):a}
var tt;function toast(m){var x=$('toast');x.textContent=m;x.classList.add('on');clearTimeout(tt);tt=setTimeout(function(){x.classList.remove('on')},1800)}
function copy(text,btn){
 var done=function(){toast(t('toast'));if(btn){btn.textContent=t('copied');btn.classList.add('ok');setTimeout(function(){btn.textContent=t('copy');btn.classList.remove('ok')},1500)}};
 if(navigator.clipboard&&window.isSecureContext){navigator.clipboard.writeText(text).then(done,function(){fb(text);done()})}else{fb(text);done()}}
function fb(x){var a=document.createElement('textarea');a.value=x;a.setAttribute('readonly','');a.style.position='fixed';a.style.opacity='0';document.body.appendChild(a);a.select();try{document.execCommand('copy')}catch(e){}a.remove()}
function label(n){return n.family==='evm'&&n.id!=='eth'?'EVM · chain '+n.chainId:n.ticker}
var dlg=$('qrdlg'),cur='';
function showQR(n){cur=n.address;$('qrt').textContent=n.name+' ('+n.ticker+')';$('qri').src=n.qr;$('qra').textContent=n.address;if(dlg.showModal)dlg.showModal();else dlg.setAttribute('open','')}
$('qrc').onclick=function(){copy(cur,this)};$('qrx').onclick=function(){dlg.close?dlg.close():dlg.removeAttribute('open')};
dlg.addEventListener('click',function(e){if(e.target===dlg)dlg.close()});
var I18=[];// элементы с динамическими подписями: [el, attr, key, suffix]
function reg(e,attr,key,suf){I18.push([e,attr,key,suf||''])}
// основные монеты
var mc=$('main-coins');
N.filter(function(n){return n.main}).forEach(function(n){
 var c=el('article','coin reveal'),l=el('div');
 l.appendChild(el('h3',null,n.name));var sm=el('small');l.appendChild(sm);
 if(n.family==='evm')reg(sm,'pre',n.ticker,'evmAll');else sm.textContent=n.ticker;
 var code=el('code',null,n.address);code.setAttribute('data-address',n.address);l.appendChild(code);
 var b=el('button','btn');b.type='button';reg(b,'text','copy');reg(b,'aria-label','copyAria',n.name);b.onclick=function(){copy(n.address,b)};l.appendChild(b);
 var q=el('button','qr');q.type='button';reg(q,'aria-label','qrBig',n.name);var i=el('img');i.src=n.qr;i.alt='QR '+n.name;i.loading='lazy';q.appendChild(i);q.onclick=function(){showQR(n)};
 c.appendChild(l);c.appendChild(q);mc.appendChild(c)});
// полный список
function norm(s){return String(s).toLowerCase().replace(/ё/g,'е').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[‐-―_]/g,'-')}
var rest=N.filter(function(n){return !n.main}).sort(function(a,b){return a.rank-b.rank}),list=$('list'),rows=[];
$('cnt').textContent='('+rest.length+')';
rest.forEach(function(n){
 var li=el('li','row');var s=norm([n.name,n.ticker,n.id,n.family,n.chainId||''].concat(n.aliases||[]).join(' '));
 var d=el('div','n');d.appendChild(el('b',null,n.name));d.appendChild(el('em',null,label(n)));var cd=el('code',null,short(n.address));cd.title=n.address;cd.setAttribute('data-address',n.address);d.appendChild(cd);
 var q=el('button','btn ghost','QR');q.type='button';reg(q,'aria-label','qrAria',n.name);q.onclick=function(){showQR(n)};
 var b=el('button','btn');b.type='button';reg(b,'text','copy');reg(b,'aria-label','copyAria',n.name);b.onclick=function(){copy(n.address,b)};
 li.appendChild(d);li.appendChild(q);li.appendChild(b);list.appendChild(li);rows.push({li:li,s:s,ns:s.replace(/[\s-]/g,'')})});
var tg=$('toggle'),all=$('all'),inp=$('q');
function setOpen(o){all.hidden=!o;tg.setAttribute('aria-expanded',String(o));$('tgl').textContent=t(o?'hide':'show')}
tg.addEventListener('click',function(){var o=all.hidden;setOpen(o);if(o)inp.focus({preventScroll:true})});
var lastV='';
function filter(v){lastV=v;var w=norm(v).trim().split(/\s+/).filter(Boolean),k=0;
 rows.forEach(function(r){var ok=!w.length||w.every(function(x){return r.s.indexOf(x)>-1||r.ns.indexOf(x.replace(/-/g,''))>-1});
  r.li.hidden=!ok;r.li.classList.toggle('off',!ok);if(ok)k++});
 $('empty').hidden=k>0;$('res').textContent=w.length?t('found').replace('{k}',k).replace('{n}',rows.length):'';return k}
function onQ(){if(all.hidden&&inp.value)setOpen(true);filter(inp.value)}
['input','search','keyup','change'].forEach(function(e){inp.addEventListener(e,onQ)});
window.__filter=filter;
// язык
function apply(l){lang=l;document.documentElement.lang=l;document.title=t('title');
 var m=document.querySelector('meta[name=description]');if(m)m.content=t('desc');
 var og=document.querySelector('meta[property="og:title"]');if(og)og.content=t('title');
 var od=document.querySelector('meta[property="og:description"]');if(od)od.content=t('ogd');
 [].forEach.call(document.querySelectorAll('[data-i18n]'),function(e){e.textContent=t(e.getAttribute('data-i18n'))});
 [].forEach.call(document.querySelectorAll('[data-i18n-html]'),function(e){e.innerHTML=t(e.getAttribute('data-i18n-html'))});
 [].forEach.call(document.querySelectorAll('[data-i18n-ph]'),function(e){e.placeholder=t(e.getAttribute('data-i18n-ph'))});
 [].forEach.call(document.querySelectorAll('[data-i18n-alt]'),function(e){e.alt=t(e.getAttribute('data-i18n-alt'))});
 [].forEach.call(document.querySelectorAll('[data-i18n-aria]'),function(e){e.setAttribute('aria-label',t(e.getAttribute('data-i18n-aria')))});
 I18.forEach(function(x){var e=x[0];if(x[1]==='text'){if(!e.classList.contains('ok'))e.textContent=t(x[2])}else if(x[1]==='pre')e.textContent=x[2]+t(x[3]);else e.setAttribute(x[1],t(x[2])+x[3])});
 $('tgl').textContent=t(all.hidden?'show':'hide');$('qri').alt=t('qrAlt');filter(lastV);
 [].forEach.call(document.querySelectorAll('.langsw button'),function(b){var on=b.getAttribute('data-lang')===l;b.classList.toggle('on',on);b.setAttribute('aria-pressed',String(on))})}
[].forEach.call(document.querySelectorAll('.langsw button'),function(b){b.addEventListener('click',function(){var l=b.getAttribute('data-lang');try{localStorage.setItem('lang',l)}catch(e){}apply(l)})});
apply(lang);
// анимация появления
var rv=document.querySelectorAll('.reveal');
if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.1});rv.forEach(function(e){io.observe(e)})}else rv.forEach(function(e){e.classList.add('in')});
})();
