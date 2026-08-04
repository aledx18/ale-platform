import {
  AuthProvider,
  ForgotPassword,
  RequireAuth,
  SignIn,
  SignUp,
  UpdatePassword,
  UserButton,
  useAuth,
} from "@aledx18/supabase-auth";
import "@aledx18/supabase-auth/styles.css";
import { createClient } from "@supabase/supabase-js";
import { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./lab.css";

type View = "sign-in" | "sign-up" | "forgot" | "update-password" | "app";

function createSupabase() {
  const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

  if (!url || !anonKey) {
    return null;
  }

  return createClient(url, anonKey);
}

function Shell() {
  const { isAuthenticated, isLoading, user } = useAuth();
  const [view, setView] = useState<View>("sign-in");
  const authedView = view === "update-password" ? "update-password" : "app";

  if (isLoading) {
    return <p className="lab-muted">Loading session…</p>;
  }

  if (isAuthenticated) {
    return (
      <RequireAuth>
        <section className="lab-panel">
          <header className="lab-header">
            <div>
              <h1>authkit lab</h1>
              <p className="lab-muted">Signed in as {user?.email}</p>
            </div>
            <UserButton />
          </header>
          <div className="lab-actions">
            <button
              data-active={authedView === "update-password"}
              onClick={() => setView("update-password")}
              type="button"
            >
              Update password
            </button>
            <button data-active={authedView === "app"} onClick={() => setView("app")} type="button">
              Profile
            </button>
          </div>
          {authedView === "update-password" ? <UpdatePassword /> : null}
          {authedView === "app" ? (
            <pre className="lab-pre">{JSON.stringify(user, null, 2)}</pre>
          ) : null}
        </section>
      </RequireAuth>
    );
  }

  return (
    <section className="lab-panel">
      <header className="lab-header">
        <div>
          <h1>authkit lab</h1>
          <p className="lab-muted">React + Supabase auth playground</p>
        </div>
      </header>
      <nav className="lab-actions">
        <button data-active={view === "sign-in"} onClick={() => setView("sign-in")} type="button">
          Sign in
        </button>
        <button data-active={view === "sign-up"} onClick={() => setView("sign-up")} type="button">
          Sign up
        </button>
        <button data-active={view === "forgot"} onClick={() => setView("forgot")} type="button">
          Forgot password
        </button>
      </nav>
      {view === "sign-in" ? <SignIn /> : null}
      {view === "sign-up" ? <SignUp /> : null}
      {view === "forgot" ? <ForgotPassword /> : null}
    </section>
  );
}

function MissingEnv() {
  return (
    <main className="lab-root">
      <section className="lab-panel">
        <h1>authkit lab</h1>
        <p>
          Create <code>apps/lab/.env</code> with your Supabase project keys:
        </p>
        <pre className="lab-pre">{`VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key`}</pre>
      </section>
    </main>
  );
}

function App() {
  const supabase = useMemo(() => createSupabase(), []);

  if (!supabase) {
    return <MissingEnv />;
  }

  return (
    <main className="lab-root">
      <AuthProvider supabase={supabase}>
        <Shell />
      </AuthProvider>
    </main>
  );
}

const rootElement = document.getElementById("root");

if (rootElement === null) {
  throw new Error("Lab root element was not found.");
}

createRoot(rootElement).render(<App />);
