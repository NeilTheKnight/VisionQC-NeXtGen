import { createContext, useContext, useState, useEffect, ReactNode } from "react"

interface User {
  email: string
  role: "admin" | "operator" | "guest"
  username: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (userData: User) => Promise<void>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for stored auth on mount
    const storedUser = localStorage.getItem("visionqc_user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        localStorage.removeItem("visionqc_user")
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (userData: User) => {
    setUser(userData)
    localStorage.setItem("visionqc_user", JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("visionqc_user")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}