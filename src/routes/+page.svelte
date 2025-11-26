<script>
  import Navigation from '$components/Navigation.svelte';
  import { user } from '$lib/stores/auth';
  import { goto } from '$app/navigation';
  
  function goToDashboard() {
    goto('/dashboard');
  }
  
  function goToLogin() {
    goto('/login');
  }
</script>

<Navigation />

<main class="min-h-screen bg-gray-50">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <div class="text-center">
      <h1 class="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
        <span class="block">Welcome to</span>
        <span class="block text-indigo-600">Litterateur Cafe</span>
      </h1>
      <p class="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
        A cozy place for book lovers and coffee enthusiasts to connect and share their passion.
      </p>
      <div class="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
        {#if $user}
          <div class="rounded-md shadow">
            <button
              on:click={goToDashboard}
              class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
            >
              Go to Dashboard
            </button>
          </div>
        {:else}
          <div class="rounded-md shadow">
            <button
              on:click={goToLogin}
              class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
            >
              Get started
            </button>
          </div>
          <div class="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
            <a
              href="/register"
              class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
            >
              Sign up
            </a>
          </div>
        {/if}
      </div>
    </div>
  </div>
  
  <div class="bg-white py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="lg:text-center">
        <h2 class="text-base text-indigo-600 font-semibold tracking-wide uppercase">Features</h2>
        <p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          A better way to enjoy your coffee and books
        </p>
      </div>

      <div class="mt-10">
        <div class="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
          <div class="relative">
            <div class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <p class="ml-16 text-lg leading-6 font-medium text-gray-900">Book Recommendations</p>
            <p class="mt-2 ml-16 text-base text-gray-500">Discover new books based on your reading preferences and what's trending in our community.</p>
          </div>

          <div class="relative">
            <div class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
              </svg>
            </div>
            <p class="ml-16 text-lg leading-6 font-medium text-gray-900">Coffee Pairings</p>
            <p class="mt-2 ml-16 text-base text-gray-500">Find the perfect coffee to complement your current read with our expert pairing suggestions.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</main>

<footer class="bg-white">
  <div class="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
    <p class="mt-8 text-center text-base text-gray-400">
      &copy; {new Date().getFullYear()} Litterateur Cafe. All rights reserved.
    </p>
  </div>
</footer>
