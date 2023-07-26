import { withIronSession } from 'next-iron-session';

export default function withSession(handler) {
  return withIronSession(handler, {
    password: 'alysha', // Replace with a strong password
    cookieName: 'spotify-cookie', // Replace with a unique cookie name
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production',
    },
  });
}