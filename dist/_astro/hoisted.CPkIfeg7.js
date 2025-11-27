import"./hoisted.tx2Ou5m7.js";const r=document.querySelectorAll(".tab-btn"),s=document.querySelectorAll(".tab-pane");r.forEach(e=>{e.addEventListener("click",()=>{const t=e.dataset.tab;r.forEach(a=>a.classList.remove("active")),s.forEach(a=>a.classList.remove("active")),e.classList.add("active"),document.getElementById(t).classList.add("active")})});const d=document.querySelectorAll(".nav-btn");d.forEach(e=>{e.addEventListener("click",()=>{d.forEach(t=>t.classList.remove("active")),e.classList.add("active")})});const l=document.getElementById("availabilityToggle");document.querySelector(".status-text");const i=document.querySelector(".status");l.addEventListener("change",()=>{l.checked?(i.textContent="Online",i.className="status online",c("You are now online and available for deliveries")):(i.textContent="Offline",i.className="status offline",c("You are now offline"))});document.querySelectorAll(".action-btn.accept").forEach(e=>{e.addEventListener("click",()=>{const t=e.closest(".delivery-card"),a=t.querySelector(".order-number").textContent;t.style.transform="translateX(100%)",t.style.opacity="0",setTimeout(()=>{t.remove(),o(),c(`Accepted ${a}`),document.querySelector('[data-tab="active"]').click()},300)})});document.querySelectorAll(".action-btn.decline").forEach(e=>{e.addEventListener("click",()=>{const t=e.closest(".delivery-card"),a=t.querySelector(".order-number").textContent;t.style.transform="translateX(-100%)",t.style.opacity="0",setTimeout(()=>{t.remove(),o(),c(`Declined ${a}`)},300)})});document.querySelectorAll(".action-btn.success").forEach(e=>{e.addEventListener("click",()=>{confirm("Mark this delivery as completed?")&&(c("Delivery marked as completed!"),setTimeout(()=>{document.querySelector('[data-tab="completed"]').click()},1e3))})});document.querySelectorAll(".action-btn.primary").forEach(e=>{e.textContent.includes("Call")&&e.addEventListener("click",()=>{c("Calling customer...")})});document.querySelectorAll(".action-btn.secondary").forEach(e=>{e.textContent.includes("Navigate")&&e.addEventListener("click",()=>{c("Opening navigation...")})});function o(){const e=document.querySelectorAll("#available .delivery-card").length,t=document.querySelectorAll("#active .active-delivery").length,a=document.querySelectorAll("#completed .completed-card").length;document.querySelector('[data-tab="available"] .tab-count').textContent=e,document.querySelector('[data-tab="active"] .tab-count').textContent=t,document.querySelector('[data-tab="completed"] .tab-count').textContent=a}function c(e){const t=document.createElement("div");t.className="toast",t.textContent=e,document.body.appendChild(t),setTimeout(()=>t.remove(),3e3)}function v(){const e=document.querySelector("#available .delivery-list");if(e.children.length<5){const t=document.createElement("div");t.className="delivery-card",t.innerHTML=`
          <div class="delivery-header">
            <div class="delivery-info">
              <div class="order-number">#ORD-2025-${Math.floor(Math.random()*1e3)}</div>
              <div class="delivery-time">${new Date().toLocaleTimeString("en-US",{hour:"numeric",minute:"2-digit",hour12:!0})}</div>
            </div>
            <div class="delivery-amount">₹${Math.floor(Math.random()*500)+500}</div>
          </div>
          
          <div class="delivery-details">
            <div class="pickup-info">
              <div class="location-type">📍 Pickup</div>
              <div class="location-name">Litterateur Cafe</div>
              <div class="location-address">123 Literary Lane, Cafe District</div>
              <div class="location-distance">0.5 km away</div>
            </div>
            
            <div class="route-arrow">↓</div>
            
            <div class="dropoff-info">
              <div class="location-type">🏠 Drop-off</div>
              <div class="location-name">New Customer</div>
              <div class="location-address">Random Address</div>
              <div class="location-distance">${(Math.random()*3+1).toFixed(1)} km away</div>
            </div>
          </div>
          
          <div class="delivery-items">
            <div class="items-preview">
              <span class="item-emoji">🍽️</span>
              <span class="item-count">Multiple items</span>
            </div>
            <div class="delivery-time-estimate">~${Math.floor(Math.random()*10+15)} min delivery</div>
          </div>
          
          <div class="delivery-actions">
            <button class="action-btn accept">Accept Delivery</button>
            <button class="action-btn decline">Decline</button>
          </div>
        `,e.insertBefore(t,e.firstChild),o(),c("New delivery available!"),t.querySelector(".action-btn.accept").addEventListener("click",function(){const a=this.closest(".delivery-card"),n=a.querySelector(".order-number").textContent;a.style.transform="translateX(100%)",a.style.opacity="0",setTimeout(()=>{a.remove(),o(),c(`Accepted ${n}`),document.querySelector('[data-tab="active"]').click()},300)}),t.querySelector(".action-btn.decline").addEventListener("click",function(){const a=this.closest(".delivery-card"),n=a.querySelector(".order-number").textContent;a.style.transform="translateX(-100%)",a.style.opacity="0",setTimeout(()=>{a.remove(),o(),c(`Declined ${n}`)},300)})}}setInterval(()=>{l.checked&&v()},3e4);o();
