<script>
  import { onMount } from 'svelte';
  import { user, logout } from '$lib/stores/auth';
  import { goto } from '$app/navigation';
  
  let loading = false;
  
  onMount(() => {
    // Redirect to login if not authenticated
    if (!$user) {
      goto('/login');
    }
  });
  
  async function handleLogout() {
    loading = true;
    await logout();
    goto('/login');
  }
</script>

<div class="min-h-screen bg-gray-100">
  <div class="bg-indigo-600">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16 items-center">
        <div class="flex-shrink-0 flex items-center">
          <span class="text-white font-bold text-xl">Litterateur Cafe</span>
        </div>
        <div class="flex items-center">
          <span class="text-white mr-4">Welcome, {$user?.name || 'User'}</span>
          <button
            on:click={handleLogout}
            class="bg-white text-indigo-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Logging out...' : 'Logout'}
          </button>
        </div>
      </div>
    </div>
  </div>

  <div class="py-10">
    <header>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold leading-tight text-gray-900">Dashboard</h1>
      </div>
    </header>
    <main>
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div class="px-4 py-8 sm:px-0">
          <div class="border-2 border-dashed border-gray-200 rounded-lg h-96 flex items-center justify-center">
            <p class="text-gray-500">Your dashboard content will go here</p>
          </div>
        </div>
      </div>
    </main>
  </div>
</div>
