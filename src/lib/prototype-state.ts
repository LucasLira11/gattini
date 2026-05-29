import { useState, useEffect } from "react";

export function useMockAuth() {
  const [user, setUser] = useState<{ username: string; role: string; name: string } | null>(() => {
    if (typeof window === "undefined") return null;
    const saved = localStorage.getItem("auth_user");
    return saved ? JSON.parse(saved) : null;
  });

  const login = (username: string, pass: string) => {
    let u = null;
    if (username === "juliagattini" && pass === "1234") {
      u = { username, role: "user", name: "Júlia Gattini" };
    } else if (username === "carlosgattini" && pass === "1234") {
      u = { username, role: "admin", name: "Carlos Gattini" };
    } else {
      return false; 
    }

    localStorage.setItem("auth_user", JSON.stringify(u));
    setUser(u);
    window.dispatchEvent(new Event("auth-change"));
    return true;
  };

  const logout = () => {
    localStorage.removeItem("auth_user");
    setUser(null);
    window.dispatchEvent(new Event("auth-change"));
  };

  useEffect(() => {
    const handle = () => {
      const saved = localStorage.getItem("auth_user");
      setUser(saved ? JSON.parse(saved) : null);
    };
    window.addEventListener("auth-change", handle);
    return () => window.removeEventListener("auth-change", handle);
  }, []);

  return { user, login, logout };
}

export function useMockSettings() {
  const [requireAdminAuth, setRequireAdminAuth] = useState(() => {
    if (typeof window === "undefined") return true;
    const saved = localStorage.getItem("setting_require_admin");
    return saved ? JSON.parse(saved) : true;
  });

  const toggleSetting = () => {
    const next = !requireAdminAuth;
    localStorage.setItem("setting_require_admin", JSON.stringify(next));
    setRequireAdminAuth(next);
    window.dispatchEvent(new Event("settings-change"));
  };

  useEffect(() => {
    const handle = () => {
      const saved = localStorage.getItem("setting_require_admin");
      setRequireAdminAuth(saved ? JSON.parse(saved) : true);
    };
    window.addEventListener("settings-change", handle);
    return () => window.removeEventListener("settings-change", handle);
  }, []);

  return { requireAdminAuth, toggleSetting };
}