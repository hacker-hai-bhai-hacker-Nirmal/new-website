window.debugData={};window.loadServerStatus=async function(){const t=document.getElementById("server-status");t.className="result loading",t.textContent="Loading server status...";try{const s=await(await fetch("/debug",{method:"GET"})).json();window.debugData=s,t.className="result success",t.innerHTML=`
                    <span class="status-indicator status-success"></span>
                    <strong>Server Status:</strong> ${s.debugSession.mode}
                    <br><strong>Environment:</strong> ${s.environmentCheck.allFound?"✅ All Variables Found":"❌ Missing Variables"}
                    <br><strong>JWT_SECRET:</strong> ${s.environmentCheck.variables.JWT_SECRET}
                    <br><strong>API Endpoints:</strong> ${s.apiRoutesTest.endpoints.length} configured
                `}catch(e){t.className="result error",t.innerHTML=`<span class="status-indicator status-error"></span><strong>Error:</strong> ${e.message}`}};window.testEnvironment=async function(){const t=document.getElementById("env-test");t.className="result loading",t.textContent="Testing environment variables...";try{const s=await(await fetch("/debug",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:"test-env"})})).json(),n=Object.values(s.variables).every(o=>o==="FOUND");t.className=n?"result success":"result error",t.innerHTML=`
                    <strong>Environment Variables:</strong> ${n?"✅ All Found":"❌ Missing Variables"}
                    <br>JWT_SECRET: ${s.variables.JWT_SECRET}
                    <br>brevo_MCP_key: ${s.variables.brevo_MCP_key}
                    <br>APPWRITE_PROJECT_ID: ${s.variables.APPWRITE_PROJECT_ID}
                    <br>APPWRITE_ENDPOINT: ${s.variables.APPWRITE_ENDPOINT}
                    <br>APPWRITE_DATABASE_ID: ${s.variables.APPWRITE_DATABASE_ID}
                `}catch(e){t.className="result error",t.innerHTML=`<strong>Error:</strong> ${e.message}`}};window.testAPI=async function(t){const e=document.getElementById("api-test");e.className="result loading",e.textContent=`Testing ${t}...`;try{const n=await(await fetch("/debug",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:"test-api",endpoint:t})})).json(),o=n.status!==404;e.className=o?"result success":"result error",e.innerHTML=`
                    <strong>Endpoint:</strong> ${t}
                    <br><strong>Status:</strong> ${n.status} ${n.statusText}
                    <br><strong>Result:</strong> ${o?"✅ Working":"❌ 404 Not Found"}
                    <br><strong>Response:</strong> ${n.responseText.substring(0,200)}${n.responseText.length>200?"...":""}
                `}catch(s){e.className="result error",e.innerHTML=`<strong>Error testing ${t}:</strong> ${s.message}`}};window.testAllAPIs=async function(){const t=["/api/auth","/api/auth/register","/api/auth/verify-otp","/api/auth/me","/api/test-auth","/api/check-env"],e=document.getElementById("all-api-results");e.innerHTML='<div class="result loading">Testing all endpoints...</div>';const s=[];for(const r of t)try{const i=await(await fetch("/debug",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:"test-api",endpoint:r})})).json();s.push({endpoint:r,status:i.status,success:i.status!==404})}catch(a){s.push({endpoint:r,status:"ERROR",success:!1,error:a.message})}const n=s.filter(r=>r.success).length,o=s.length;e.innerHTML=`
                <div class="result ${n>0?"success":"error"}">
                    <strong>API Test Results:</strong> ${n}/${o} endpoints working
                    <br><br>${s.map(r=>`${r.success?"✅":"❌"} ${r.endpoint} - ${r.status}${r.error?" ("+r.error+")":""}`).join("<br>")}
                </div>
            `,window.updateDiagnosis(s)};window.updateDiagnosis=function(t){const e=document.getElementById("diagnosis"),s=t.filter(r=>r.success).length,n=t.length;let o="";s===0?o=`
                    <div class="result error">
                        <strong>🚨 CRITICAL ISSUE:</strong> All API endpoints are failing (404 errors)
                        <br><br><strong>Root Cause:</strong> Cloudflare Pages Functions not properly configured
                        <br><strong>Next Steps:</strong>
                        <br>1. Check Cloudflare Pages Functions settings
                        <br>2. Verify wrangler.toml configuration
                        <br>3. Ensure output: 'server' is working correctly
                        <br>4. Check build output for _worker.js directory
                    </div>
                `:s<n?o=`
                    <div class="result info">
                        <strong>⚠️ PARTIAL ISSUE:</strong> Some API endpoints working, others failing
                        <br><br><strong>Working:</strong> ${s}/${n} endpoints
                        <br><strong>Root Cause:</strong> Specific API routes have configuration issues
                        <br><strong>Next Steps:</strong> Check individual failing endpoints
                    </div>
                `:o=`
                    <div class="result success">
                        <strong>✅ ALL GOOD:</strong> All API endpoints are working
                        <br><strong>Authentication system is functional!</strong>
                    </div>
                `,e.innerHTML=o};window.addEventListener("load",window.loadServerStatus);
