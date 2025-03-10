import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Hub Dashboard | KITESTUDIOS",
  description: "Access the Hub Dashboard for KITESTUDIOS resources and tools.",
}

export default function HubLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
    </>
  )
} 