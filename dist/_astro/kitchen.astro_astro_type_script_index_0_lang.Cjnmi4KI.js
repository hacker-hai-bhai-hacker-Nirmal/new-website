function y(){const e=new Date().toLocaleTimeString("en-US",{hour:"numeric",minute:"2-digit",hour12:!0});document.getElementById("currentTime").textContent=e}setInterval(y,1e3);y();const g=document.querySelectorAll(".tab-btn"),p={pending:document.getElementById("pendingOrders"),preparing:document.getElementById("preparingOrders"),ready:document.getElementById("readyOrders")};g.forEach(t=>{t.addEventListener("click",()=>{const e=t.dataset.status;g.forEach(r=>r.classList.remove("active")),t.classList.add("active"),Object.values(p).forEach(r=>{r.style.display="none"}),p[e].style.display="grid"})});function v(){document.querySelectorAll(".order-timer").forEach(t=>{const e=t.dataset.startTime;if(e){const[r,o]=e.split(":").map(Number),s=new Date;s.setHours(r,o,0,0);const d=Math.floor((new Date-s)/1e3),i=Math.floor(d/60),f=d%60;t.querySelector(".timer-display").textContent=`${i.toString().padStart(2,"0")}:${f.toString().padStart(2,"0")}`;const h=t.querySelector(".progress-ring"),S=d%1800/1800,u=2*Math.PI*45,C=u-S*u;h.style.strokeDashoffset=C}})}setInterval(v,1e3);v();document.addEventListener("click",t=>{if(t.target.classList.contains("start-preparing")){const e=t.target.closest(".order-card");e.dataset.orderId,e.classList.remove("pending"),e.classList.add("preparing"),e.querySelector(".action-btn.start-preparing").textContent="Mark Ready",e.querySelector(".action-btn.start-preparing").classList.remove("start-preparing"),e.querySelector(".action-btn.start-preparing").classList.add("mark-ready"),a(),n("Order moved to preparing")}if(t.target.classList.contains("mark-ready")){const e=t.target.closest(".order-card");e.dataset.orderId,e.classList.remove("preparing"),e.classList.add("ready"),e.querySelector(".action-btn.mark-ready").textContent="Complete",e.querySelector(".action-btn.mark-ready").classList.remove("mark-ready"),e.querySelector(".action-btn.mark-ready").classList.add("complete"),a(),n("Order marked as ready!"),l()}if(t.target.classList.contains("complete")){const e=t.target.closest(".order-card");e.dataset.orderId,e.style.transform="translateX(100%)",e.style.opacity="0",setTimeout(()=>{e.remove(),a()},300),n("Order completed!")}if(t.target.classList.contains("reject")&&confirm("Are you sure you want to reject this order?")){const e=t.target.closest(".order-card");e.style.transform="translateX(-100%)",e.style.opacity="0",setTimeout(()=>{e.remove(),a()},300),n("Order rejected")}t.target.classList.contains("notify")&&(n("Staff notified!"),l()),t.target.classList.contains("view-details")&&n("Order details view")});function a(){const t=document.querySelectorAll(".order-card.pending").length,e=document.querySelectorAll(".order-card.preparing").length,r=document.querySelectorAll(".order-card.ready").length;document.getElementById("pendingCount").textContent=t,document.getElementById("preparingCount").textContent=e,document.getElementById("readyCount").textContent=r,document.getElementById("pendingTabCount").textContent=t,document.getElementById("preparingTabCount").textContent=e,document.getElementById("readyTabCount").textContent=r}let c=!0;document.getElementById("soundToggle").addEventListener("click",t=>{c=!c,t.target.textContent=c?"🔊":"🔇"});function l(){c&&document.getElementById("notificationSound").play().catch(e=>console.log("Audio play failed:",e))}document.getElementById("refreshOrders").addEventListener("click",()=>{n("Refreshing orders..."),setTimeout(()=>{n("Orders refreshed!")},1e3)});function E(){const t=document.getElementById("pendingOrders"),e=["Edward Norton","Fiona Green","George Miller"],r=[{emoji:"🥐",name:"Artisan Croissant",mods:"Standard"},{emoji:"☕",name:"Signature Coffee",mods:"Iced"},{emoji:"🥗",name:"Garden Salad",mods:"No onions"}],o=document.createElement("div");o.className="order-card pending",o.dataset.orderId=`ORD-2025-${Math.floor(Math.random()*1e3)}`;const s=new Date,m=s.toLocaleTimeString("en-US",{hour:"numeric",minute:"2-digit",hour12:!0}),d=r.slice(0,Math.floor(Math.random()*3)+1);o.innerHTML=`
        <div class="order-header">
          <div class="order-info">
            <div class="order-number">#${o.dataset.orderId}</div>
            <div class="order-time">${m}</div>
          </div>
          <div class="order-timer" data-start-time="${s.getHours()}:${s.getMinutes().toString().padStart(2,"0")}">
            <span class="timer-display">00:01</span>
            <div class="timer-progress">
              <div class="progress-ring"></div>
            </div>
          </div>
        </div>
        
        <div class="order-items">
          ${d.map(i=>`
            <div class="item-row">
              <div class="item-details">
                <span class="item-emoji">${i.emoji}</span>
                <div class="item-info">
                  <div class="item-name">${i.name}</div>
                  <div class="item-mods">${i.mods}</div>
                </div>
              </div>
              <div class="item-quantity">×${Math.floor(Math.random()*2)+1}</div>
            </div>
          `).join("")}
        </div>
        
        <div class="order-footer">
          <div class="customer-info">
            <div class="customer-name">${e[Math.floor(Math.random()*e.length)]}</div>
            <div class="order-type">📱 Delivery</div>
          </div>
          <div class="order-actions">
            <button class="action-btn start-preparing">Start Preparing</button>
            <button class="action-btn reject">Reject</button>
          </div>
        </div>
      `,t.insertBefore(o,t.firstChild),a(),l(),n("New order received!")}setInterval(E,45e3);function n(t){const e=document.createElement("div");e.className="toast",e.textContent=t,document.body.appendChild(e),setTimeout(()=>e.remove(),3e3)}a();
