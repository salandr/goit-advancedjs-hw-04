import{a as L,i as a,S as w}from"./assets/vendor-5f0e12e0.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))c(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&c(n)}).observe(document,{childList:!0,subtree:!0});function l(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerpolicy&&(r.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?r.credentials="include":s.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function c(s){if(s.ep)return;s.ep=!0;const r=l(s);fetch(s.href,r)}})();const S="40913956-3fb26abc12009e80362ea258a";async function y(e,t){return(await L.get(`https://pixabay.com/api/?key=${S}&q=${e}&image_type=photo&orientation=horizontal&safesearch=true&page=${t}&per_page=40`)).data}function f(e,t,l){const{hits:c}=e,s=c.map(({webformatURL:r,largeImageURL:n,likes:h,views:b,comments:v,downloads:$,tags:p})=>`<div class="photo-card">    
                  <a href="${n}">
                  <img class="searched-image" src="${r}" alt="${p}" loading="lazy" data-title="${p}"/></a>
                  <div class="info">
                      <p class="info-item">
                          <b>Likes</b><span class="info-data">${h}</span>
                      </p>
                          <p class="info-item">
                      <b>Views</b><span class="info-data">${b}</span>
                      </p>
                      <p class="info-item">
                          <b>Comments</b><span class="info-data">${v}</span>
                      </p>
                      <p class="info-item">
                          <b>Downloads</b><span class="info-data">${$}
                          </p></span>
                  </div>
              </div>`).join("");t.insertAdjacentHTML("beforeend",s),l.refresh()}function k(){const{height:e}=document.querySelector(".photo-card").getBoundingClientRect(),t=window.innerHeight;window.scrollBy({top:t-e,behavior:"smooth"})}a.settings({position:"bottomRight",timeout:3e3,maxWidth:300});let g=new w(".gallery a",{captionType:"data",captionDelay:250});const m=document.querySelector(".gallery"),q=document.querySelector(".search-form"),o=document.querySelector(".load-more"),u=document.querySelector(".end-of-img-list");q.addEventListener("submit",H);o.addEventListener("click",P);let i,d;async function H(e){if(e.preventDefault(),i=1,d=e.target.searchQuery.value.trim(),d===""){a.warning({message:"Please specify search criteria!"});return}m.innerHTML="",u.style.display="none",o.style.display="none";try{const t=await y(d,i);if(t.hits.length===0){a.error({message:"Sorry, there are no images matching your search query. Please try again."}),e.target.searchQuery.value="";return}if(f(t,m,g),e.target.searchQuery.value="",a.success({message:`Hooray! We found ${t.totalHits} images`}),t.hits.length<40){u.style.display="block";return}o.style.display="block"}catch(t){a.error({message:`${t.message}`}),console.log(t.message)}}async function P(){i++,o.visibility="hidden";try{const e=await y(d,i);if(f(e,m,g),k(),i===13){o.style.display="none",u.style.display="block";return}if(e.hits.length<40||e.hits.length===0){o.style.display="none",u.style.display="block";return}o.visibility="visible"}catch(e){a.error({message:`${e.message}`}),console.log(e.message)}}
//# sourceMappingURL=commonHelpers.js.map
