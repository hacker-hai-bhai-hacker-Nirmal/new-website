// Comprehensive Environment Variable Discovery
// GET /api/discover-env-vars

export async function GET({ locals }: { locals: any }): Promise<Response> {
  try {
    // Get all available environment variables
    const localsEnv = locals?.env || {};
    const importEnv = import.meta.env;
    
    // Discover all variables that might be Brevo-related
    const allLocalsKeys = Object.keys(localsEnv);
    const allImportKeys = Object.keys(importEnv);
    
    // Look for any variable containing 'brevo' (case-insensitive)
    const brevoCandidates = [
      ...allLocalsKeys.filter(key => key.toLowerCase().includes('brevo')),
      ...allImportKeys.filter(key => key.toLowerCase().includes('brevo'))
    ];
    
    // Look for any variable containing 'mcp' (case-insensitive)
    const mcpCandidates = [
      ...allLocalsKeys.filter(key => key.toLowerCase().includes('mcp')),
      ...allImportKeys.filter(key => key.toLowerCase().includes('mcp'))
    ];
    
    // Look for any variable containing 'api' (case-insensitive)
    const apiCandidates = [
      ...allLocalsKeys.filter(key => key.toLowerCase().includes('api')),
      ...allImportKeys.filter(key => key.toLowerCase().includes('api'))
    ];
    
    // Get values for all candidates
    const candidateValues = {};
    
    [...new Set([...brevoCandidates, ...mcpCandidates, ...apiCandidates])].forEach(key => {
      candidateValues[key] = {
        localsValue: localsEnv[key] || 'NOT_FOUND',
        importValue: importEnv[key] || 'NOT_FOUND',
        length: localsEnv[key] ? localsEnv[key].length : (importEnv[key] ? importEnv[key].length : 0)
      };
    });
    
    const discovery = {
      timestamp: new Date().toISOString(),
      test: 'Comprehensive Environment Variable Discovery',
      summary: {
        totalLocalsKeys: allLocalsKeys.length,
        totalImportKeys: allImportKeys.length,
        brevoCandidates: brevoCandidates.length,
        mcpCandidates: mcpCandidates.length,
        apiCandidates: apiCandidates.length
      },
      allKeys: {
        localsEnv: allLocalsKeys,
        importMetaEnv: allImportKeys
      },
      candidates: {
        brevo: brevoCandidates,
        mcp: mcpCandidates,
        api: apiCandidates
      },
      candidateValues: candidateValues,
      recommendations: {
        nextSteps: [
          'Check if any candidate variables contain the Brevo API key',
          'Look for variables with length > 50 characters (likely API keys)',
          'Verify exact variable names in Cloudflare Pages dashboard',
          'Ensure variables are set for Production environment'
        ]
      }
    };
    
    return new Response(
      JSON.stringify(discovery, null, 2),
      { 
        status: 200, 
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        } 
      }
    );
    
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        error: 'Environment discovery failed',
        message: error.message,
        timestamp: new Date().toISOString()
      }, null, 2),
      { 
        status: 500, 
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        } 
      }
    );
  }
}
