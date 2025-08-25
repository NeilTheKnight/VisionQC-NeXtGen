import { Navigation } from "@/components/layout/navigation"

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background flex">
      <Navigation />
      <main className="flex-1 overflow-hidden">
        {children}
      </main>
    </div>
  )
}