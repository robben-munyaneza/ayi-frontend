import { getServerSession } from 'next-auth/next';
import { authOptions } from '../app/api/auth/[...nextauth]/route';

/**
 * Returns the admin session if the request is from a logged-in admin,
 * otherwise null. Use at the top of any mutating API route.
 */
export async function getAdminSession() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) return null;
  return session;
}
