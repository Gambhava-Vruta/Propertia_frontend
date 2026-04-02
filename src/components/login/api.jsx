// import { getToken, isTokenExpired, clearAuthData } from './Auth';

// export const fetchWithAuth = async (url, options = {}) => {

//   // ── 1. Token expired by time? Log out silently ──
//   if (isTokenExpired()) {
//     console.warn('⚠️ Token expired - logging out');
//     clearAuthData();
//     window.location.href = '/Auth';
//     return null;
//   }

//   const token = getToken();

//   // ── 2. No token at all → redirect to login ──
//   if (!token) {
//     console.warn('⚠️ No token found - redirecting to login');
//     window.location.href = '/Auth';
//     return null;
//   }

//   options.headers = {
//     'Content-Type': 'application/json',
//     'Accept':       'application/json',
//     ...(options.headers || {}),
//     Authorization: `Bearer ${token}`,
//   };

//   try {
//     const res = await fetch(url, options);

//     // ── 3. 401 = server rejected the token → force logout ──
//     if (res.status === 401) {
//       console.warn('❌ 401 Unauthorized - token rejected, logging out');
//       clearAuthData();
//       window.location.href = '/Auth';
//       return null;
//     }

//     // ── 4. 403 = logged in but no permission → do NOT log out ──
//     if (res.status === 403) {
//       console.warn('❌ 403 Forbidden - user lacks permission');
//       throw new Error('You do not have permission to perform this action.');
//     }

//     if (res.status === 204) return null; // No Content

//     if (res.ok) {
//       return await res.json();
//     }

//     // ── 5. Other HTTP errors (400, 404, 500, etc.) → throw for caller to handle ──
//     // const errData = await res.json().catch(() => ({}));
//     // window.location.href = '/Error';
//     // throw new Error(errData?.message || `Request failed (${res.status})`);
//     const errData = await res.json().catch(() => ({}));

// window.location.href = `/error?code=${res.status}`;

// throw new Error(errData?.message || `Request failed (${res.status})`);

//   } catch (err) {
//     // ── 6. NETWORK ERROR (server down, CORS, no internet) ──
//     //    Do NOT redirect to login — user IS authenticated, server is just unreachable
//     if (err.name === 'TypeError' && err.message.toLowerCase().includes('fetch')) {
//       console.error('🌐 Network error - server unreachable:', url);
//       throw new Error('Cannot connect to server. Please check your connection or try again later.');
//     }
//     // Re-throw everything else (our custom errors from above)
//     throw err;
//   }
// };
import { getToken, isTokenExpired, clearAuthData } from './Auth';

// ── Global loading event bus ──────────────────────────────────────────────────
// Components can listen to these events to show/hide loading indicators
export const loadingEvents = {
  start: () => window.dispatchEvent(new CustomEvent('fetch:start')),
  end:   () => window.dispatchEvent(new CustomEvent('fetch:end')),
};

// ── fetchWithAuth ─────────────────────────────────────────────────────────────
export const fetchWithAuth = async (url, options = {}) => {

  // ── 1. Token expired by time? Log out silently ──
  if (isTokenExpired()) {
    console.warn('⚠️ Token expired - logging out');
    clearAuthData();
    window.location.href = '/Auth';
    return null;
  }

  const token = getToken();

  // ── 2. No token at all → redirect to login ──
  if (!token) {
    console.warn('⚠️ No token found - redirecting to login');
    window.location.href = '/Auth';
    return null;
  }

  options.headers = {
    'Content-Type': 'application/json',
    'Accept':       'application/json',
    ...(options.headers || {}),
    Authorization: `Bearer ${token}`,
  };

  // ── 3. Signal loading START ──
  loadingEvents.start();

  try {
    const res = await fetch(url, options);

    if (res.status === 401) {
      console.warn('❌ 401 Unauthorized - token rejected, logging out');
      clearAuthData();
      window.location.href = '/Auth';
      return null;
    }

    if (res.status === 403) {
      console.warn('❌ 403 Forbidden - user lacks permission');
      throw new Error('You do not have permission to perform this action.');
    }

    if (res.status === 204) return null;

    if (res.ok) {
      return await res.json();
    }

    const errData = await res.json().catch(() => ({}));
    // We intentionally removed window.location.href = `/error?code=${res.status}`;
    // to allow discrete components like the chatbot to handle 404s and other errors gracefully.
    throw new Error(errData?.message || `Request failed (${res.status})`);

  } catch (err) {
    if (err.name === 'TypeError' && err.message.toLowerCase().includes('fetch')) {
      console.error('🌐 Network error - server unreachable:', url);
      throw new Error('Cannot connect to server. Please check your connection or try again later.');
    }
    throw err;
  } finally {
    // ── 4. Signal loading END (always, even on error) ──
    loadingEvents.end();
  }
};