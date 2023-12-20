'use client'

import { SessionProvider } from "next-auth/react"
import { ReactNode } from "react"

type ProviderProps = {
  children: ReactNode,
  session: any // replace `any` with the appropriate type for the `session` prop
}

export default function Provider ({ children, session }: ProviderProps) {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  )
}