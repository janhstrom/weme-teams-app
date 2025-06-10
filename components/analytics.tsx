"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart3, TrendingUp, Users, MessageSquare, Target, Award } from "lucide-react"

interface AnalyticsProps {
  userData: any
}

export function Analytics({ userData }: AnalyticsProps) {
  const [analyticsData, setAnalyticsData] = useState<any>(null)
  const [selectedTeam, setSelectedTeam] = useState<string>("all")
  const [selectedPeriod, setSelectedPeriod] = useState<string>("3months")

  useEffect(() => {
    loadAnalyticsData()
  }, [selectedTeam, selectedPeriod])

  const loadAnalyticsData = async () => {
    try {
      // Mock analytics data
      const mockData = {
        activeProcesses: 3,
        processGrowth: 15,
        totalParticipants: 42,
        participationRate: 87,
        totalReflections: 156,
        avgReflectionsPerUser: 3.7,
        engagementScore: 82,
        engagementGrowth: 12,
        participationTrend: [
          { week: 1, participation: 95 },
          { week: 2, participation: 89 },
          { week: 3, participation: 92 },
          { week: 4, participation: 87 },
          { week: 5, participation: 91 },
          { week: 6, participation: 88 },
        ],
        topThemes: [
          { name: "Aktiv lytting", responses: 45, engagementScore: 92 },
          { name: "Konstruktiv tilbakemelding", responses: 38, engagementScore: 87 },
          { name: "Grensesetting", responses: 32, engagementScore: 79 },
        ],
        teamStats: [
          {
            id: "team-1",
            name: "Utviklingsteam Alpha",
            currentTheme: "Aktiv lytting",
            status: "active",
            participationRate: 92,
            members: 8,
            reflections: 24,
            developmentAreas: ["Lytting", "Tilbakemelding"],
          },
          {
            id: "team-2",
            name: "Salgsteam Beta",
            currentTheme: "Stressforebygging",
            status: "active",
            participationRate: 85,
            members: 6,
            reflections: 18,
            developmentAreas: ["Grensesetting", "Samhandling"],
          },
        ],
        themeAnalysis: [
          {
            name: "Aktiv lytting",
            completionRate: 88,
            microlearnings: 3,
            reflections: 45,
            engagementScore: 92,
            insights: [
              "Høy deltakelse i refleksjonsspørsmål",
              "Praktiske eksempler fungerer godt",
              "Behov for mer fokus på nonverbal kommunikasjon",
            ],
          },
        ],
        processProgress: [
          {
            name: "Tilbakemeldingskultur Q1 2024",
            team: "Utviklingsteam Alpha",
            status: "on-track",
            progress: 50,
            currentWeek: 6,
            participation: 92,
            responses: 24,
            nextMilestone: "Refleksjon uke 8",
          },
        ],
      }

      setAnalyticsData(mockData)
    } catch (error) {
      console.error("Failed to load analytics:", error)
    }
  }

  if (!analyticsData) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 animate-spin" />
          <span>Laster analysedata...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Analyse & Rapporter</h2>
          <p className="text-muted-foreground">Innsikt i prosessfremdrift og teamutvikling</p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedTeam} onValueChange={setSelectedTeam}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Velg team" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Alle team</SelectItem>
              <SelectItem value="team1">Utviklingsteam</SelectItem>
              <SelectItem value="team2">Salgsteam</SelectItem>
              <SelectItem value="team3">Markedsteam</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Velg periode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1month">Siste måned</SelectItem>
              <SelectItem value="3months">Siste 3 måneder</SelectItem>
              <SelectItem value="6months">Siste 6 måneder</SelectItem>
              <SelectItem value="1year">Siste år</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aktive prosesser</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.activeProcesses}</div>
            <p className="text-xs text-muted-foreground">+{analyticsData.processGrowth}% fra forrige periode</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Deltakere</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.totalParticipants}</div>
            <p className="text-xs text-muted-foreground">{analyticsData.participationRate}% deltakelsesgrad</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Refleksjoner</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.totalReflections}</div>
            <p className="text-xs text-muted-foreground">
              Gjennomsnitt {analyticsData.avgReflectionsPerUser} per bruker
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Engasjement</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.engagementScore}%</div>
            <p className="text-xs text-muted-foreground">+{analyticsData.engagementGrowth}% fra forrige periode</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Oversikt</TabsTrigger>
          <TabsTrigger value="teams">Team</TabsTrigger>
          <TabsTrigger value="themes">Tema</TabsTrigger>
          <TabsTrigger value="progress">Fremdrift</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Deltakelsesgrad over tid</CardTitle>
                <CardDescription>Hvordan deltakelsen har utviklet seg</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.participationTrend.map((week: any, index: number) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Uke {week.week}</span>
                        <span>{week.participation}%</span>
                      </div>
                      <Progress value={week.participation} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Mest aktive tema</CardTitle>
                <CardDescription>Tema som genererer mest engasjement</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.topThemes.map((theme: any, index: number) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">{theme.name}</p>
                        <p className="text-xs text-muted-foreground">{theme.responses} svar</p>
                      </div>
                      <Badge variant="outline">{theme.engagementScore}%</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="teams" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {analyticsData.teamStats.map((team: any) => (
              <Card key={team.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{team.name}</CardTitle>
                    <Badge variant={team.status === "active" ? "default" : "secondary"}>{team.status}</Badge>
                  </div>
                  <CardDescription>{team.currentTheme}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Deltakelse</span>
                      <span>{team.participationRate}%</span>
                    </div>
                    <Progress value={team.participationRate} className="h-2" />
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Medlemmer</p>
                      <p className="font-medium">{team.members}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Refleksjoner</p>
                      <p className="font-medium">{team.reflections}</p>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <p className="text-sm font-medium">Utviklingsområder:</p>
                    <div className="flex flex-wrap gap-1">
                      {team.developmentAreas.map((area: string, index: number) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {area}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="themes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tema analyse</CardTitle>
              <CardDescription>Dybdeanalyse av tema og deres effektivitet</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {analyticsData.themeAnalysis.map((theme: any, index: number) => (
                  <div key={index} className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{theme.name}</h3>
                      <Badge variant="outline">{theme.completionRate}% fullført</Badge>
                    </div>

                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-blue-600">{theme.microlearnings}</p>
                        <p className="text-sm text-muted-foreground">Mikrolæringer</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-green-600">{theme.reflections}</p>
                        <p className="text-sm text-muted-foreground">Refleksjoner</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-purple-600">{theme.engagementScore}</p>
                        <p className="text-sm text-muted-foreground">Engasjement</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm font-medium">Nøkkelinnsikter:</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {theme.insights.map((insight: string, i: number) => (
                          <li key={i}>• {insight}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="progress" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Samlet fremdrift
              </CardTitle>
              <CardDescription>Oversikt over alle aktive prosesser</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {analyticsData.processProgress.map((process: any, index: number) => (
                  <div key={index} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{process.name}</h3>
                        <p className="text-sm text-muted-foreground">{process.team}</p>
                      </div>
                      <Badge variant={process.status === "on-track" ? "default" : "secondary"}>
                        {process.status === "on-track" ? "På sporet" : "Forsinket"}
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Fremdrift</span>
                        <span>
                          {process.progress}% (Uke {process.currentWeek}/12)
                        </span>
                      </div>
                      <Progress value={process.progress} className="h-2" />
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Deltakelse</p>
                        <p className="font-medium">{process.participation}%</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Svar</p>
                        <p className="font-medium">{process.responses}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Neste milepæl</p>
                        <p className="font-medium">{process.nextMilestone}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
