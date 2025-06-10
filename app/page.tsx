"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MicrolearningDashboard } from "@/components/microlearning-dashboard"
import { ReflectionDashboard } from "@/components/reflection-dashboard"
import { ProcessAdmin } from "@/components/process-admin"
import { Analytics } from "@/components/analytics"
import { UserProfile } from "@/components/user-profile"
import { Loader2, Users, Brain, Settings, BarChart3, Sparkles } from "lucide-react"

interface UserData {
  id: string
  name: string
  email: string
  role: "leader" | "employee" | "process_admin" | "org_admin" | "drift"
  teamId: string
  teamName: string
}

export default function MicrolearningApp() {
  const [loading, setLoading] = useState(true)
  const [userData, setUserData] = useState<UserData | null>(null)
  const [activeProcess, setActiveProcess] = useState(null)
  const [isInTeams, setIsInTeams] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // For nå, bruk alltid mock data i standalone modus
        // Teams SDK vil kun lastes når vi faktisk er i Teams
        await loadMockData()
        setLoading(false)
      } catch (err) {
        console.error("Failed to initialize app:", err)
        setError("Kunne ikke initialisere appen")
        setLoading(false)
      }
    }

    initializeApp()
  }, [])

  const loadMockData = async () => {
    try {
      // Mock user data for standalone testing
      const mockUser = {
        id: "user-123",
        name: "Ola Nordmann",
        email: "ola.nordmann@company.no",
        role: "leader",
        teamId: "team-456",
        teamName: "Utviklingsteam Alpha",
      }

      const mockProcess = {
        id: "process-789",
        name: "Tilbakemeldingskultur Q1 2024",
        currentWeek: 3,
        totalWeeks: 12,
        currentTheme: "Aktiv lytting",
        status: "active",
        startDate: "2024-01-01",
        userEngagement: 85,
      }

      setUserData(mockUser)
      setActiveProcess(mockProcess)
    } catch (error) {
      console.error("Failed to load mock data:", error)
      setError("Kunne ikke laste testdata")
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="flex flex-col items-center gap-4 p-8 rounded-2xl bg-card/80 backdrop-blur-sm shadow-soft">
          <div className="relative">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <Sparkles className="h-4 w-4 absolute -top-1 -right-1 text-accent animate-pulse" />
          </div>
          <div className="text-center">
            <h3 className="font-heading text-lg text-foreground mb-1">Laster mikrolæring</h3>
            <p className="text-sm text-muted-foreground">Forbereder din læringsreise...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!userData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <Card className="w-full max-w-md shadow-medium">
          <CardHeader className="text-center">
            <CardTitle className="text-destructive flex items-center gap-2 justify-center">
              <Brain className="h-5 w-5" />
              Autentisering påkrevd
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-muted-foreground">
              Kunne ikke hente brukerdata. Vennligst logg inn på nytt.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const getRoleDisplay = (role: string) => {
    const roleMap = {
      leader: "Leder",
      employee: "Medarbeider",
      process_admin: "Prosessansvarlig",
      org_admin: "Organisasjonsansvarlig",
      drift: "Drift",
    }
    return roleMap[role as keyof typeof roleMap] || role
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/3 via-background to-secondary/3">
      <div className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between animate-fade-in">
          <div className="space-y-2">
            <h1 className="text-gradient-primary font-heading text-4xl font-bold tracking-tight">
              Mikrolæring & Refleksjon
            </h1>
            <p className="text-muted-foreground text-lg">Fokusert teamutvikling gjennom kollektiv læring</p>
          </div>
          <div className="text-right space-y-2">
            <Badge variant="secondary" className="badge-primary text-sm px-3 py-1">
              {getRoleDisplay(userData.role)}
            </Badge>
            <p className="text-sm text-muted-foreground font-medium">{userData.teamName}</p>
          </div>
        </div>

        {/* User Profile */}
        <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <UserProfile userData={userData} activeProcess={activeProcess} />
        </div>

        {/* Main Content */}
        <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <Tabs defaultValue="dashboard" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-card/50 backdrop-blur-sm border border-border/50 shadow-soft">
              <TabsTrigger
                value="dashboard"
                className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-smooth"
              >
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">Dashboard</span>
              </TabsTrigger>
              <TabsTrigger
                value="reflection"
                className="flex items-center gap-2 data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground transition-smooth"
              >
                <Brain className="h-4 w-4" />
                <span className="hidden sm:inline">Refleksjon</span>
              </TabsTrigger>
              {(userData.role === "process_admin" || userData.role === "org_admin") && (
                <TabsTrigger
                  value="admin"
                  className="flex items-center gap-2 data-[state=active]:bg-accent data-[state=active]:text-accent-foreground transition-smooth"
                >
                  <Settings className="h-4 w-4" />
                  <span className="hidden sm:inline">Admin</span>
                </TabsTrigger>
              )}
              {(userData.role === "org_admin" || userData.role === "drift") && (
                <TabsTrigger
                  value="analytics"
                  className="flex items-center gap-2 data-[state=active]:bg-warning data-[state=active]:text-warning-foreground transition-smooth"
                >
                  <BarChart3 className="h-4 w-4" />
                  <span className="hidden sm:inline">Analyse</span>
                </TabsTrigger>
              )}
            </TabsList>

            <div className="mt-6">
              <TabsContent value="dashboard" className="animate-fade-in">
                <MicrolearningDashboard userData={userData} activeProcess={activeProcess} />
              </TabsContent>

              <TabsContent value="reflection" className="animate-fade-in">
                <ReflectionDashboard userData={userData} activeProcess={activeProcess} />
              </TabsContent>

              {(userData.role === "process_admin" || userData.role === "org_admin") && (
                <TabsContent value="admin" className="animate-fade-in">
                  <ProcessAdmin userData={userData} />
                </TabsContent>
              )}

              {(userData.role === "org_admin" || userData.role === "drift") && (
                <TabsContent value="analytics" className="animate-fade-in">
                  <Analytics userData={userData} />
                </TabsContent>
              )}
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
