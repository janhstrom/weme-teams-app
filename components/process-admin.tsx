"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Settings, Zap, Calendar, Send } from "lucide-react"

interface ProcessAdminProps {
  userData: any
}

export function ProcessAdmin({ userData }: ProcessAdminProps) {
  const [processes, setProcesses] = useState<any[]>([])
  const [teams, setTeams] = useState<any[]>([])
  const [selectedProcess, setSelectedProcess] = useState<any>(null)
  const [aiContentGeneration, setAiContentGeneration] = useState(false)

  useEffect(() => {
    loadProcessData()
  }, [])

  const loadProcessData = async () => {
    try {
      // Mock processes data
      const mockProcesses = [
        {
          id: "proc-1",
          name: "Tilbakemeldingskultur Q1 2024",
          description: "Fokus på konstruktiv tilbakemelding og aktiv lytting",
          teamName: "Utviklingsteam Alpha",
          status: "active",
          duration: 12,
          currentWeek: 6,
          totalWeeks: 12,
        },
        {
          id: "proc-2",
          name: "Stressforebygging Q1 2024",
          description: "Grensesetting og samhandling for bedre arbeidsbalanse",
          teamName: "Salgsteam Beta",
          status: "planned",
          duration: 12,
          currentWeek: 0,
          totalWeeks: 12,
        },
      ]

      const mockTeams = [
        {
          id: "team-1",
          name: "Utviklingsteam Alpha",
          description: "Frontend og backend utvikling",
          memberCount: 8,
          activeProcesses: 1,
          leader: "Ola Nordmann",
        },
        {
          id: "team-2",
          name: "Salgsteam Beta",
          description: "B2B salg og kundeoppfølging",
          memberCount: 6,
          activeProcesses: 0,
          leader: "Kari Hansen",
        },
      ]

      setProcesses(mockProcesses)
      setTeams(mockTeams)
    } catch (error) {
      console.error("Failed to load process data:", error)
    }
  }

  const createNewProcess = async (processData: any) => {
    try {
      const response = await fetch("/api/admin/processes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(processData),
      })

      if (response.ok) {
        loadProcessData()
      }
    } catch (error) {
      console.error("Failed to create process:", error)
    }
  }

  const generateAIContent = async (theme: string, week: number, type: "microlearning" | "reflection") => {
    try {
      const response = await fetch("/api/ai/generate-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          theme,
          week,
          type,
          organizationContext: userData.organizationContext,
        }),
      })

      if (response.ok) {
        const content = await response.json()
        return content
      }
    } catch (error) {
      console.error("Failed to generate AI content:", error)
    }
  }

  const publishToTeams = async (contentId: string, teamIds: string[]) => {
    try {
      const response = await fetch("/api/teams/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contentId,
          teamIds,
        }),
      })

      if (response.ok) {
        // Content published successfully
        console.log("Content published to Teams")
      }
    } catch (error) {
      console.error("Failed to publish to Teams:", error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Prosessadministrasjon</h2>
          <p className="text-muted-foreground">Administrer mikrolæringsprosesser og innhold</p>
        </div>
        <Button onClick={() => setSelectedProcess(null)}>
          <Settings className="h-4 w-4 mr-2" />
          Ny prosess
        </Button>
      </div>

      <Tabs defaultValue="processes" className="w-full">
        <TabsList>
          <TabsTrigger value="processes">Prosesser</TabsTrigger>
          <TabsTrigger value="content">Innhold</TabsTrigger>
          <TabsTrigger value="teams">Team</TabsTrigger>
          <TabsTrigger value="publish">Publisering</TabsTrigger>
        </TabsList>

        <TabsContent value="processes" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {processes.map((process) => (
              <Card key={process.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{process.name}</CardTitle>
                    <Badge variant={process.status === "active" ? "default" : "secondary"}>{process.status}</Badge>
                  </div>
                  <CardDescription>{process.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Team:</span>
                      <span>{process.teamName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Varighet:</span>
                      <span>{process.duration} uker</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Fremdrift:</span>
                      <span>
                        {process.currentWeek}/{process.totalWeeks}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* New Process Form */}
          <Card>
            <CardHeader>
              <CardTitle>Opprett ny prosess</CardTitle>
              <CardDescription>Sett opp en ny 3-måneders mikrolæringsprosess</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="processName">Prosessnavn</Label>
                  <Input id="processName" placeholder="F.eks. Tilbakemeldingskultur Q1 2024" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="team">Team</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Velg team" />
                    </SelectTrigger>
                    <SelectContent>
                      {teams.map((team) => (
                        <SelectItem key={team.id} value={team.id}>
                          {team.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Beskrivelse</Label>
                <Textarea id="description" placeholder="Beskriv prosessens mål og fokusområder..." rows={3} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="mainTheme">Hovedtema</Label>
                <Input id="mainTheme" placeholder="F.eks. Tilbakemelding og kommunikasjon" />
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="aiGeneration" checked={aiContentGeneration} onCheckedChange={setAiContentGeneration} />
                <Label htmlFor="aiGeneration">Aktiver AI-generert innhold</Label>
              </div>

              <Button className="w-full">
                <Calendar className="h-4 w-4 mr-2" />
                Opprett prosess
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                AI Innholdsgenerering
              </CardTitle>
              <CardDescription>
                Generer mikrolæring og refleksjonsspørsmål basert på tema og organisasjonens behov
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="contentTheme">Tema</Label>
                  <Input id="contentTheme" placeholder="F.eks. Konstruktiv tilbakemelding" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contentWeek">Uke</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Velg uke" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 12 }, (_, i) => (
                        <SelectItem key={i + 1} value={String(i + 1)}>
                          Uke {i + 1}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="contentType">Innholdstype</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Velg type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="microlearning">Mikrolæring</SelectItem>
                    <SelectItem value="reflection">Refleksjon</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="orgContext">Organisasjonskontekst</Label>
                <Textarea
                  id="orgContext"
                  placeholder="Beskriv organisasjonens verdier, mål og spesifikke utfordringer..."
                  rows={3}
                />
              </div>

              <Button className="w-full">
                <Zap className="h-4 w-4 mr-2" />
                Generer innhold med AI
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="teams" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {teams.map((team) => (
              <Card key={team.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{team.name}</CardTitle>
                  <CardDescription>{team.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Medlemmer:</span>
                      <Badge variant="outline">{team.memberCount}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Aktive prosesser:</span>
                      <Badge variant="outline">{team.activeProcesses}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Leder:</span>
                      <span className="text-muted-foreground">{team.leader}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="publish" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Send className="h-5 w-5" />
                Publiser til Teams
              </CardTitle>
              <CardDescription>Send mikrolæring og refleksjonsspørsmål direkte til Teams-kanaler</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="publishContent">Velg innhold</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Velg innhold å publisere" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="week1-micro">Uke 1: Mikrolæring - Aktiv lytting</SelectItem>
                    <SelectItem value="week1-reflection">Uke 1: Refleksjon - Lyttevaner</SelectItem>
                    <SelectItem value="week2-micro">Uke 2: Mikrolæring - Åpne spørsmål</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="publishTeams">Velg team</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Velg team å publisere til" />
                  </SelectTrigger>
                  <SelectContent>
                    {teams.map((team) => (
                      <SelectItem key={team.id} value={team.id}>
                        {team.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="publishSchedule">Publiseringstidspunkt</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Velg når innholdet skal publiseres" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="now">Publiser nå</SelectItem>
                    <SelectItem value="scheduled">Planlegg publisering</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div>
                  <h4 className="font-medium">Automatisk publisering</h4>
                  <p className="text-sm text-muted-foreground">Publiser innhold automatisk hver annen uke</p>
                </div>
                <Switch />
              </div>

              <Button className="w-full">
                <Send className="h-4 w-4 mr-2" />
                Publiser innhold
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
