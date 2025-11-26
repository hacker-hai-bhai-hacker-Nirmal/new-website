<script>
  import { user, logout } from '$lib/stores/auth';
  import { goto } from '$app/navigation';
  
  let isMenuOpen = false;
  let loading = false;
  
  async function handleLogout() {
    loading = true;
    await logout();
    goto('/login');
  }
  
  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }
</script>

<nav class="bg-white shadow-sm">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between h-16">
      <div class="flex">
        <div class="flex-shrink-0 flex items-center">
          <a href="/" class="text-xl font-bold text-indigo-600">Litterateur Cafe</a>
        </div>
        <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
          <a href="/" class="border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
            Home
          </a>
          {#if $user}
            <a href="/dashboard" class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
              Dashboard
            </a>
          {/if}
        </div>
      </div>
      <div class="hidden sm:ml-6 sm:flex sm:items-center">
        {#if $user}
          <div class="ml-3 relative">
            <div>
              <button
                on:click={toggleMenu}
                class="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                id="user-menu"
                aria-expanded="false"
                aria-haspopup="true"
              >
                <span class="sr-only">Open user menu</span>
                <div class="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium">
                  {$user?.name?.charAt(0) || 'U'}
                </div>
              </button>
            </div>
            {#if isMenuOpen}
              <div
                class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu"
                tabindex="-1"
              >
                <a
                  href="/dashboard"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                  tabindex="-1"
                  id="user-menu-item-0"
                >
                  Your Profile
                </a>
                <button
                  on:click={handleLogout}
                  class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                  tabindex="-1"
                  id="user-menu-item-2"
                  disabled={loading}
                >
                  {loading ? 'Signing out...' : 'Sign out'}
                </button>
              </div>
            {/if}
          </div>
        {:else}
          <div class="flex space-x-4">
            <a
              href="/login"
              class="text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium"
            >
              Sign in
            </a>
            <a
              href="/register"
              class="bg-indigo-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-700"
            >
              Sign up
            </a>
          </div>
        {/if}
      </div>
      <div class="-mr-2 flex items-center sm:hidden">
        <button
          on:click={toggleMenu}
          type="button"
          class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          aria-controls="mobile-menu"
          aria-expanded="false"
        >
          <span class="sr-only">Open main menu</span>
          <svg
            class="block h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          <svg
            class="hidden h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>

  <!-- Mobile menu, show/hide based on menu state. -->
  {#if isMenuOpen}
    <div class="sm:hidden" id="mobile-menu">
      <div class="pt-2 pb-3 space-y-1">
        <a
          href="/"
          class="bg-indigo-50 border-indigo-500 text-indigo-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
        >
          Home
        </a>
        {#if $user}
          <a
            href="/dashboard"
            class="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
          >
            Dashboard
          </a>
          <button
            on:click={handleLogout}
            class="w-full text-left border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
            disabled={loading}
          >
            {loading ? 'Signing out...' : 'Sign out'}
          </button>
        {:else}
          <a
            href="/login"
            class="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
          >
            Sign in
          </a>
          <a
            href="/register"
            class="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
          >
            Sign up
          </a>
        {/if}
      </div>
    </div>
  {/if}
</nav>
