document.querySelectorAll(".nav-item").forEach(e=>{e.addEventListener("click",t=>{t.preventDefault(),document.querySelectorAll(".nav-item").forEach(r=>r.classList.remove("active")),document.querySelectorAll(".content-section").forEach(r=>r.classList.remove("active")),e.classList.add("active");const o=e.getAttribute("href").substring(1),a=document.getElementById(o);a&&a.classList.add("active")})});document.getElementById("refreshData").addEventListener("click",()=>{l("Refreshing dashboard data..."),setTimeout(()=>{const e=document.getElementById("ordersToday"),t=parseInt(e.textContent);e.textContent=t+Math.floor(Math.random()*3);const o=document.getElementById("revenueToday"),a=parseInt(o.textContent.replace("₹","").replace(",",""));o.textContent="₹"+(a+Math.floor(Math.random()*1e3)).toLocaleString(),l("Data refreshed successfully!")},1500)});function u(){const e=document.getElementById("ordersFeed"),t=["Alice Johnson","Charlie Brown","Diana Prince","Edward Norton","Fiona Green"],o=["🥐×1","☕×2","🥗×1","🥩×1","🍮×2"],a=document.createElement("div");for(a.className="order-item new",a.innerHTML=`
        <div class="order-time">Just now</div>
        <div class="order-details">
          <div class="order-number">#ORD-2025-${Math.floor(Math.random()*1e3)}</div>
          <div class="order-customer">${t[Math.floor(Math.random()*t.length)]}</div>
          <div class="order-items">${o[Math.floor(Math.random()*o.length)]}</div>
          <div class="order-total">₹${Math.floor(Math.random()*1e3)+200}</div>
        </div>
        <div class="order-status-badge new">NEW</div>
      `,e.insertBefore(a,e.firstChild),setTimeout(()=>{a.classList.remove("new")},5e3);e.children.length>5;)e.removeChild(e.lastChild)}setInterval(u,1e4);document.querySelectorAll(".action-btn").forEach(e=>{e.addEventListener("click",()=>{const t=e.textContent.trim();l(`Executing: ${t}`)})});function l(e){const t=document.createElement("div");t.className="toast",t.textContent=e,document.body.appendChild(t),setTimeout(()=>t.remove(),3e3)}setInterval(()=>{const e=document.getElementById("activeUsers"),t=parseInt(e.textContent),o=Math.floor(Math.random()*21)-10;e.textContent=Math.max(250,t+o)},3e4);let s=[],d=[];document.querySelectorAll(".tab-btn").forEach(e=>{e.addEventListener("click",()=>{const t=e.dataset.tab;document.querySelectorAll(".tab-btn").forEach(o=>o.classList.remove("active")),e.classList.add("active"),document.querySelectorAll(".tab-content").forEach(o=>{o.classList.remove("active")}),document.getElementById(t).classList.add("active")})});async function i(){try{const e=await fetch("/api/users/auth");e.ok&&(s=await e.json());const t=await fetch("/api/users/profile");t.ok&&(d=await t.json()),f()}catch(e){console.error("Error loading users:",e),l("Error loading users data")}}function f(){document.getElementById("totalAuthUsers").textContent=s.length,document.getElementById("totalProfileUsers").textContent=d.length;const e=new Date().toDateString(),t=s.filter(o=>new Date(o.$createdAt).toDateString()===e).length;document.getElementById("newUsersToday").textContent=t,h(),v(),g()}function h(){const e=document.getElementById("authUsersTableBody");if(s.length===0){e.innerHTML='<tr><td colspan="6" class="no-data">No authentication users found</td></tr>';return}e.innerHTML=s.map(t=>`
        <tr>
          <td>${t.$id}</td>
          <td>${t.name||"N/A"}</td>
          <td>${t.email}</td>
          <td>${new Date(t.$createdAt).toLocaleDateString()}</td>
          <td><span class="status-badge ${t.status?"active":"inactive"}">${t.status?"Active":"Inactive"}</span></td>
          <td>
            <button class="action-btn-small" onclick="viewUserDetails('${t.$id}', 'auth')">View</button>
          </td>
        </tr>
      `).join("")}function v(){const e=document.getElementById("profileUsersTableBody");if(d.length===0){e.innerHTML='<tr><td colspan="7" class="no-data">No profile users found</td></tr>';return}e.innerHTML=d.map(t=>`
        <tr>
          <td>${t.userId}</td>
          <td>${t.fullName}</td>
          <td>${t.email||"N/A"}</td>
          <td>${t.phoneNumber||"N/A"}</td>
          <td>${t.tokenBalance||0}</td>
          <td>₹${(t.totalSpent||0).toLocaleString()}</td>
          <td>
            <button class="action-btn-small" onclick="viewUserDetails('${t.userId}', 'profile')">View</button>
            <button class="action-btn-small" onclick="editUserProfile('${t.userId}')">Edit</button>
          </td>
        </tr>
      `).join("")}function g(){const e=document.getElementById("allUsersTableBody"),t=new Map(d.map(n=>[n.userId,n])),o=s.map(n=>{const c=t.get(n.$id);return{...n,hasProfile:!!c,profile:c}}),a=o.filter(n=>!n.hasProfile).length,r=d.filter(n=>!s.find(c=>c.$id===n.userId)).length,m=o.filter(n=>n.hasProfile).length;if(document.getElementById("authOnlyCount").textContent=a,document.getElementById("profileOnlyCount").textContent=r,document.getElementById("completeUsersCount").textContent=m,o.length===0){e.innerHTML='<tr><td colspan="7" class="no-data">No users found</td></tr>';return}e.innerHTML=o.map(n=>`
        <tr>
          <td>${n.$id}</td>
          <td>${n.name||n.profile?.fullName||"N/A"}</td>
          <td>${n.email}</td>
          <td>
            <span class="status-badge ${n.hasProfile?"complete":"incomplete"}">
              ${n.hasProfile?"✅ Complete":"❌ Missing"}
            </span>
          </td>
          <td>${new Date(n.$createdAt).toLocaleDateString()}</td>
          <td><span class="status-badge ${n.status?"active":"inactive"}">${n.status?"Active":"Inactive"}</span></td>
          <td>
            <button class="action-btn-small" onclick="viewUserDetails('${n.$id}', 'combined')">View</button>
            ${n.hasProfile?"":`<button class="action-btn-small" onclick="createProfile('${n.$id}')">Create Profile</button>`}
          </td>
        </tr>
      `).join("")}document.getElementById("refreshUsers").addEventListener("click",()=>{l("Refreshing users data..."),i()});i();
