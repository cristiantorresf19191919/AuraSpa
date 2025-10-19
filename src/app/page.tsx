import { auth0 } from "@/app/lib/auth0";
import UserProfile from "./components/UserProfile";
import NoSession from "./components/NoSession";

export default async function Home() {
  // Fetch the user session
  const session = await auth0.getSession();

  // If no session, show sign-up and login buttons
  if (!session) {
    return <NoSession />;
  }

  // If session exists, show the beautiful user profile component
  return <UserProfile />;
}