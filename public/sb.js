import("https://esm.sh/@supabase/ssr@0.12.7")
  .then((m) => {
    if (typeof window !== "undefined" && !window.__supabase) {
      window.__supabase = m.createBrowserClient(
        "https://vklnyrgmeyxuqjkeucfu.supabase.co",
        "sb_publishable_DE-0uo-djg-fzymAqC8zRw_moUxh2lq",
      );
    }
  })
  .catch(() => {});
