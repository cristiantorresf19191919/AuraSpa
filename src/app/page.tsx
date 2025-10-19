import { auth0 } from "@/app/lib/auth0";
import UserProfile from "./components/UserProfile";
import ServiceSearch from "./components/ServiceSearch";

export default async function Home() {
  // Fetch the user session
  const session = await auth0.getSession();

  // If no session, show service search page
  if (!session) {
    return <ServiceSearch />;
  }

  // If session exists, show the beautiful user profile component
  return <UserProfile />;
}