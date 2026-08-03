import { useAuth } from "@aledx18/react";
import { createElement } from "react";
import { createRoot } from "react-dom/client";

function App() {
  const { isAuthenticated, session, signIn, signOut } = useAuth();

  return createElement(
    "main",
    null,
    createElement("h1", null, "authkit lab"),
    createElement("p", null, isAuthenticated ? `Signed in as ${session?.user}` : "Not signed in"),
    createElement(
      "button",
      { disabled: isAuthenticated, onClick: () => signIn("Ale"), type: "button" },
      "Sign in",
    ),
    createElement(
      "button",
      { disabled: !isAuthenticated, onClick: signOut, type: "button" },
      "Sign out",
    ),
  );
}

const rootElement = document.getElementById("root");

if (rootElement === null) {
  throw new Error("Lab root element was not found.");
}

createRoot(rootElement).render(createElement(App));
