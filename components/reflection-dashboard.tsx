"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageSquare, TrendingUp, Users, Calendar } from "lucide-react"

interface ReflectionEntry {
  id: string
  week: number
  theme: string
  questions: string[]
  response: string
  createdAt: string
  insights?: string[]
}

interface ReflectionDashboardProps {
  userData: any
  activeProcess: any
}

export function ReflectionDashboard({ userData, activeProcess }: ReflectionDashboardProps) {
  const [reflections, setReflections] = useState<ReflectionEntry[]>([])
  const [teamInsights, setTeamInsights] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadReflectionData()
  }, [userData])

  const loadReflectionData = async () => {
    try {
      // Mock reflection data for standalone testing
      const mockReflections = [
        {
          id: "ref-1",
          week: 2,
          theme: "Konstruktiv tilbakemelding",
          questions: [
            "Hvilke situasjoner denne uken har gitt deg mulighet til å gi konstruktiv tilbakemelding?",
            "Hvordan ble tilbakemeldingen mottatt?",
            "Hva kunne du gjort annerledes?",
          ],
          response:
            "Jeg ga tilbakemelding til en kollega om presentasjonen deres. Fokuserte på konkrete forbedringsforslag i stedet for bare å peke på problemer.",
          createdAt: "2024-01-15",
          insights: [
            "Du viser god forståelse for balansen mellom støtte og utfordring",
            "Fortsett å fokusere på konkrete eksempler når du gir tilbakemelding",
          ],
        },
        {
          id: "ref-2",
          week: 4,
          theme: "Aktiv lytting",
          questions: [
            "Når praktiserte du aktiv lytting denne uken?",
            "Hva merket du når du lyttet mer aktivt?",
            "Hvilke utfordringer møtte du?",
          ],
          response:
            "Øvde på å stille oppfølgingsspørsmål i teammøter. Merket at folk åpnet seg mer når jeg virkelig lyttet.",
          createdAt: "2024-01-29",
        },
      ]

      setReflections(mockReflections)

      // Mock team insights for leaders/admins
      if (userData.role === "leader" || userData.role === "process_admin" || userData.role === "org_admin") {
        const mockInsights = [
          {
            title: "Økt bevissthet rundt lytting",
            description: "Teamet viser god fremgang i å praktisere aktiv lytting",
            recommendations: ["Fortsett å øve på oppfølgingsspørsmål", "Fokuser på nonverbal kommunikasjon neste uke"],
          },
        ]
        setTeamInsights(mockInsights)
      }
    } catch (error) {
      console.error("Failed to load reflection data:", error)
    } finally {
      setLoading(false)
    }
  }

  const generateAICoaching = async (reflectionId: string) => {
    try {
      const response = await fetch("/api/ai/coaching", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reflectionId,
          userId: userData.id,
          userRole: userData.role,
        }),
      })

      if (response.ok) {
        const coaching = await response.json()
        // Update reflection with AI insights
        setReflections((prev) => prev.map((r) => (r.id === reflectionId ? { ...r, insights: coaching.insights } : r)))
      }
    } catch (error) {
      console.error("Failed to generate AI coaching:", error)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 animate-spin" />
          <span>Laster refleksjoner...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Totale refleksjoner</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reflections.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aktuelle tema</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeProcess?.currentTheme || "Ingen"}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Prosessuke</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeProcess?.currentWeek || 0}/12</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="my-reflections" className="w-full">
        <TabsList>
          <TabsTrigger value="my-reflections">Mine refleksjoner</TabsTrigger>
          {(userData.role === "leader" || userData.role === "process_admin") && (
            <TabsTrigger value="team-insights">Team innsikt</TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="my-reflections" className="space-y-4">
          {reflections.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center text-muted-foreground">
                  <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Ingen refleksjoner ennå</p>
                  <p className="text-sm">Dine refleksjoner vil vises her etter hvert som du deltar i prosessen.</p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <ScrollArea className="h-[600px]">
              <div className="space-y-4">
                {reflections.map((reflection) => (
                  <Card key={reflection.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">
                          Uke {reflection.week}: {reflection.theme}
                        </CardTitle>
                        <Badge variant="outline">{new Date(reflection.createdAt).toLocaleDateString("no-NO")}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-medium text-sm mb-2">Spørsmål:</h4>
                        <ul className="space-y-1">
                          {reflection.questions.map((question, index) => (
                            <li key={index} className="text-sm text-muted-foreground">
                              {index + 1}. {question}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-medium text-sm mb-2">Din respons:</h4>
                        <p className="text-sm leading-relaxed">{reflection.response}</p>
                      </div>

                      {reflection.insights && reflection.insights.length > 0 && (
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <h4 className="font-medium text-sm mb-2 text-blue-800">AI Coaching:</h4>
                          <ul className="space-y-1">
                            {reflection.insights.map((insight, index) => (
                              <li key={index} className="text-sm text-blue-700">
                                • {insight}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {!reflection.insights && (
                        <Button variant="outline" size="sm" onClick={() => generateAICoaching(reflection.id)}>
                          Få AI-basert coaching
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          )}
        </TabsContent>

        {(userData.role === "leader" || userData.role === "process_admin") && (
          <TabsContent value="team-insights" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Team Innsikt
                </CardTitle>
                <CardDescription>
                  Kollektive mønstre og utviklingsområder basert på teamets refleksjoner
                </CardDescription>
              </CardHeader>
              <CardContent>
                {teamInsights.length === 0 ? (
                  <p className="text-muted-foreground">Ingen team-innsikt tilgjengelig ennå.</p>
                ) : (
                  <div className="space-y-4">
                    {teamInsights.map((insight, index) => (
                      <div key={index} className="p-4 bg-muted rounded-lg">
                        <h4 className="font-medium mb-2">{insight.title}</h4>
                        <p className="text-sm text-muted-foreground">{insight.description}</p>
                        {insight.recommendations && (
                          <div className="mt-3">
                            <h5 className="text-sm font-medium mb-1">Anbefalinger:</h5>
                            <ul className="text-sm space-y-1">
                              {insight.recommendations.map((rec: string, i: number) => (
                                <li key={i} className="text-muted-foreground">
                                  • {rec}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  )
}
