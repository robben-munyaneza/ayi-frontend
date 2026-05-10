"use client";
import { SessionProvider } from "next-auth/react";
import { ContentProvider } from "../context/ContentContext.jsx";

export function Providers({ children }) {
  return (
    <SessionProvider>
      <ContentProvider>
        {children}
      </ContentProvider>
    </SessionProvider>
  );
}
