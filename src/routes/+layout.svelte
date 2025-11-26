<script>
  import { user, checkAuth } from '$lib/stores/auth';
  import { onMount } from 'svelte';
  import '../app.css';
  
  onMount(() => {
    // Check auth status when the app loads
    checkAuth();
  });
</script>

<slot />

<style>
  /* Add any global styles here */
  :global(body) {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
</style>
