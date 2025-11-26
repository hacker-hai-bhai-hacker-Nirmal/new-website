<script>
  import { onMount } from 'svelte';
  import { user } from '$lib/stores/auth';
  import { goto } from '$app/navigation';
  
  onMount(() => {
    // Redirect to login if not authenticated
    const unsubscribe = user.subscribe(($user) => {
      if (!$user) {
        goto('/login');
      }
    });
    
    return () => unsubscribe();
  });
</script>

<slot />
