import React from 'react';
import { AuthProvider } from './context/AuthContext';

export default function App({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
