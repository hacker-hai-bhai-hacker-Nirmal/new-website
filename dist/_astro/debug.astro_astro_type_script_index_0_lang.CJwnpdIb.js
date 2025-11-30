window.debugData={};window.loadServerStatus=async function(){const s=document.getElementById("server-status");if(s){s.className="result loading",s.textContent="Loading server status...";try{const t=window.debugData||{debugSession:{mode:"UNKNOWN"},environmentCheck:{allFound:!1,variables:{JWT_SECRET:"NOT_FOUND",brevo_MCP_key:"NOT_FOUND"}},apiRoutesTest:{endpoints:[]}};s.className="result success",s.innerHTML=`
                    <span class="status-indicator status-success"></span>
                    <strong>Server Status:</strong> ${t.debugSession.mode}
                    <br><strong>Environment:</strong> ${t.environmentCheck.allFound?"✅ All Variables Found":"❌ Missing Variables"}
                    <br><strong>JWT_SECRET:</strong> ${t.environmentCheck.variables.JWT_SECRET}
                    <br><strong>API Endpoints:</strong> ${t.apiRoutesTest.endpoints.length} configured
                `}catch(t){s.className="result error",s.innerHTML=`<span class="status-indicator status-error"></span><strong>Error:</strong> ${t?.message||"Unknown error"}`}}};window.testEnvironment=async function(){const s=document.getElementById("env-test");if(s){s.className="result loading",s.textContent="Testing environment variables...";try{const e=await(await fetch("/debug",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:"test-env"})})).json(),n=Object.values(e.variables).every(o=>o==="FOUND");s.className=n?"result success":"result error",s.innerHTML=`
                    <strong>Environment Variables:</strong> ${n?"✅ All Found":"❌ Missing Variables"}
                    <br>JWT_SECRET: ${e.variables.JWT_SECRET}
                    <br>brevo_MCP_key: ${e.variables.brevo_MCP_key}
                    <br>APPWRITE_PROJECT_ID: ${e.variables.APPWRITE_PROJECT_ID}
                    <br>APPWRITE_ENDPOINT: ${e.variables.APPWRITE_ENDPOINT}
                    <br>APPWRITE_DATABASE_ID: ${e.variables.APPWRITE_DATABASE_ID}
                `}catch(t){s.className="result error",s.innerHTML=`<strong>Error:</strong> ${t?.message||"Unknown error"}`}}};window.testAPI=async function(s){const t=document.getElementById("api-test");if(t){t.className="result loading",t.textContent=`Testing ${s}...`;try{const n=await(await fetch("/debug",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:"test-api",endpoint:s})})).json(),o=n.status!==404;t.className=o?"result success":"result error",t.innerHTML=`
                    <strong>Endpoint:</strong> ${s}
                    <br><strong>Status:</strong> ${n.status} ${n.statusText}
                    <br><strong>Result:</strong> ${o?"✅ Working":"❌ 404 Not Found"}
                    <br><strong>Response:</strong> ${n.responseText.substring(0,200)}${n.responseText.length>200?"...":""}
                `}catch(e){t.className="result error",t.innerHTML=`<strong>Error testing ${s}:</strong> ${e?.message||"Unknown error"}`}}};window.testAllAPIs=async function(){const s=["/api/auth","/api/auth/register","/api/auth/verify-otp","/api/auth/me","/api/test-auth","/api/check-env"],t=document.getElementById("all-api-results");if(!t)return;t.innerHTML='<div class="result loading">Testing all endpoints...</div>';const e=[];for(const r of s)try{const i=await(await fetch("/debug",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:"test-api",endpoint:r})})).json();e.push({endpoint:r,status:i.status,success:i.status!==404})}catch(a){e.push({endpoint:r,status:"ERROR",success:!1,error:a?.message||"Unknown error"})}const n=e.filter(r=>r.success).length,o=e.length;t.innerHTML=`
                <div class="result ${n>0?"success":"error"}">
                    <strong>API Test Results:</strong> ${n}/${o} endpoints working
                    <br><br>${e.map(r=>`${r.success?"✅":"❌"} ${r.endpoint} - ${r.status}${r.error?" ("+r.error+")":""}`).join("<br>")}
                </div>
            `,window.updateDiagnosis(e)};window.updateDiagnosis=function(s){const t=document.getElementById("diagnosis");if(!t)return;const e=s.filter(r=>r.success).length,n=s.length;let o="";e===0?o=`
                    <div class="result error">
                        <strong>🚨 CRITICAL ISSUE:</strong> All API endpoints are failing (404 errors)
                        <br><br><strong>Root Cause:</strong> Cloudflare Pages Functions not properly configured
                        <br><strong>Next Steps:</strong>
                        <br>1. Check Cloudflare Pages Functions settings
                        <br>2. Verify wrangler.toml configuration
                        <br>3. Ensure output: 'server' is working correctly
                        <br>4. Check build output for _worker.js directory
                    </div>
                `:e<n?o=`
                    <div class="result info">
                        <strong>⚠️ PARTIAL ISSUE:</strong> Some API endpoints working, others failing
                        <br><br><strong>Working:</strong> ${e}/${n} endpoints
                        <br><strong>Root Cause:</strong> Specific API routes have configuration issues
                        <br><strong>Next Steps:</strong> Check individual failing endpoints
                    </div>
                `:o=`
                    <div class="result success">
                        <strong>✅ ALL GOOD:</strong> All API endpoints are working
                        <br><strong>Authentication system is functional!</strong>
                    </div>
                `,t.innerHTML=o};window.addEventListener("load",window.loadServerStatus);
