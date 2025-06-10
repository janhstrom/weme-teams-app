"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Calendar, Target, TrendingUp } from "lucide-react"

interface UserProfileProps {
  userData: any
  activeProcess: any
}

export function UserProfile({ userData, activeProcess }: UserProfileProps) {
  const getProgressPercentage = () => {
    if (!activeProcess) return 0
    return (activeProcess.currentWeek / 12) * 100
  }

  const getRoleColor = (role: string) => {
    const colors = {
      leader: "bg-blue-500",
      employee: "bg-green-500",
      process_admin: "bg-purple-500",
      org_admin: "bg-orange-500",
      drift: "bg-red-500",
    }
    return colors[role as keyof typeof colors] || "bg-gray-500"
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={`/placeholder.svg?height=64&width=64`} />
            <AvatarFallback className={`text-white ${getRoleColor(userData.role)}`}>
              {userData.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-xl font-semibold">{userData.name}</h3>
              <Badge variant="secondary">
                {userData.role === "leader"
                  ? "Leder"
                  : userData.role === "employee"
                    ? "Medarbeider"
                    : userData.role === "process_admin"
                      ? "Prosessansvarlig"
                      : userData.role === "org_admin"
                        ? "Organisasjonsansvarlig"
                        : "Drift"}
              </Badge>
            </div>
            <p className="text-muted-foreground">{userData.email}</p>
            <p className="text-sm text-muted-foreground">{userData.teamName}</p>
          </div>
        </div>
      </CardHeader>

      {activeProcess && (
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Aktiv prosess</span>
              </div>
              <Badge variant="outline">{activeProcess.name}</Badge>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Fremdrift</span>
                <span>Uke {activeProcess.currentWeek}/12</span>
              </div>
              <Progress value={getProgressPercentage()} className="h-2" />
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-muted-foreground">Nåværende tema</p>
                  <p className="font-medium">{activeProcess.currentTheme}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-muted-foreground">Ditt engasjement</p>
                  <p className="font-medium">{activeProcess.userEngagement}%</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  )
}
