import"./hoisted.tx2Ou5m7.js";let a=[],r=0;const y=document.querySelector(".cart-count"),d=document.getElementById("cartSummary"),i=document.getElementById("cartItems"),p=document.getElementById("cartTotal"),l=document.querySelectorAll(".filter-btn"),q=document.querySelectorAll(".menu-item");l.forEach(c=>{c.addEventListener("click",()=>{const t=c.dataset.category;l.forEach(e=>e.classList.remove("active")),c.classList.add("active"),q.forEach(e=>{t==="all"||e.dataset.category===t?e.style.display="block":e.style.display="none"})})});document.querySelectorAll(".add-to-cart").forEach(c=>{c.addEventListener("click",t=>{const e=t.target.closest(".menu-item"),s=e.querySelector("h3").textContent,n=parseInt(e.querySelector(".price").textContent.replace("₹","")),o=e.querySelector(".menu-image").textContent,m={id:Date.now(),name:s,price:n,image:o,quantity:1};a.push(m),u(),v(`${s} added to cart!`)})});function u(){r=a.reduce((t,e)=>t+e.quantity,0),y.textContent=r,a.length===0?(i.innerHTML='<p class="empty-cart">Your cart is empty</p>',document.querySelector(".checkout-btn").disabled=!0):(i.innerHTML=a.map(t=>`
          <div class="cart-item">
            <span class="cart-item-image">${t.image}</span>
            <div class="cart-item-details">
              <h4>${t.name}</h4>
              <span>₹${t.price}</span>
            </div>
            <div class="cart-item-quantity">
              <button class="quantity-btn minus" data-id="${t.id}">-</button>
              <span>${t.quantity}</span>
              <button class="quantity-btn plus" data-id="${t.id}">+</button>
            </div>
          </div>
        `).join(""),document.querySelector(".checkout-btn").disabled=!1);const c=a.reduce((t,e)=>t+e.price*e.quantity,0);p.textContent=c,document.querySelectorAll(".quantity-btn").forEach(t=>{t.addEventListener("click",e=>{const s=parseInt(e.target.dataset.id),n=a.find(o=>o.id===s);e.target.classList.contains("plus")?n.quantity++:e.target.classList.contains("minus")&&n.quantity>1&&n.quantity--,u()})})}document.querySelector(".cart-icon").addEventListener("click",()=>{d.classList.toggle("active")});document.querySelector(".close-cart").addEventListener("click",()=>{d.classList.remove("active")});function v(c){const t=document.createElement("div");t.className="toast",t.textContent=c,document.body.appendChild(t),setTimeout(()=>t.remove(),2e3)}
