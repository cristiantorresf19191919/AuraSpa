import { auth0 } from "@/app/lib/auth0";
import UserProfile from "./components/UserProfile";
import ServiceSearchEnhanced from "./components/ServiceSearchEnhanced";

export default async function Home() {
  // Fetch the user session
  const session = await auth0.getSession();

  // If no session, show enhanced service search page
  if (!session) {
    return <ServiceSearchEnhanced />;
  }

  // If session exists, show the beautiful user profile component
  return <UserProfile />;
}