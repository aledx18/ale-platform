import { ping } from "@aledx18/core";

export function login(user: string) {
  const result = ping();
  console.log(result);

  return {
    authenticated: true,
    user,
    timestamp: Date.now(),
  };
}
