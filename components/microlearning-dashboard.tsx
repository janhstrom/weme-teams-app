"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Clock, CheckCircle, ArrowRight, Lightbulb, Target } from "lucide-react"

interface MicrolearningContent {
  id: string
  week: number
  theme: string
  type: "microlearning" | "reflection"
  selfReflection?: string
  insight?: string
  actionInstructions?: string
  leaderContent?: string
  questions?: string[]
  isCompleted: boolean
  userResponse?: string
}

interface MicrolearningDashboardProps {
  userData: any
  activeProcess: any
}

export function MicrolearningDashboard({ userData, activeProcess }: MicrolearningDashboardProps) {
  const [currentContent, setCurrentContent] = useState<MicrolearningContent | null>(null)
  const [userResponse, setUserResponse] = useState("")
  const [loading, setLoading] = useState(true)
  const [weeklyProgress, setWeeklyProgress] = useState(0)

  useEffect(() => {
    loadCurrentContent()
  }, [userData, activeProcess])

  const loadCurrentContent = async () => {
    try {
      // Use mock data for standalone testing
      const mockContent = {
        id: "content-micro-123",
        week: 6,
        theme: "Aktiv lytting",
        type: "microlearning" as const,
        selfReflection:
          "Tenk over: Når var sist gang du virkelig følte deg hørt av noen? Hva var det som gjorde at du følte deg forstått? Og når var sist gang du ga din fulle oppmerksomhet til det noen sa til deg?",
        insight:
          "Aktiv lytting handler om å gi full oppmerksomhet til den som snakker, både verbalt og nonverbalt. Det innebærer å lytte for å forstå, ikke for å svare. Forskning viser at når vi føler oss hørt, øker tilliten og samarbeidet betydelig. I vårt team er dette spesielt viktig fordi vi arbeider tett sammen og er avhengige av god kommunikasjon for å levere kvalitet.",
        actionInstructions:
          "Denne uken: 1) I samtaler, fokuser på å stille oppfølgingsspørsmål som viser at du lytter ('Hvis jeg forstår deg rett...', 'Kan du utdype det?'), 2) Legg bort telefon og andre distraksjoner når noen snakker til deg, 3) Øv deg på å stille oppfølgingsspørsmål som viser at du lytter.",
        leaderContent:
          "Som leder er det spesielt viktig at du modellerer aktiv lytting. Medarbeidere kan oppleve at det føles 'kunstig' eller tidkrevende i starten - dette er normalt. Møt eventuell motstand med forståelse og del dine egne erfaringer.",
        isCompleted: false,
      }

      setCurrentContent(mockContent)

      // Calculate progress (mock data)
      const currentWeek = 6
      setWeeklyProgress((currentWeek / 12) * 100)
    } catch (error) {
      console.error("Failed to load content:", error)
    } finally {
      setLoading(false)
    }
  }

  const submitResponse = async () => {
    try {
      // Mock API call - in real app this would save to database
      console.log("Submitting response:", {
        contentId: currentContent?.id,
        userId: userData.id,
        response: userResponse,
      })

      // Mark as completed
      if (currentContent) {
        setCurrentContent({ ...currentContent, isCompleted: true, userResponse })
      }
    } catch (error) {
      console.error("Failed to submit response:", error)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 animate-spin text-primary" />
          <span>Laster innhold...</span>
        </div>
      </div>
    )
  }

  if (!currentContent) {
    return (
      <Card className="card-elevated">
        <CardHeader>
          <CardTitle>Ingen aktiv prosess</CardTitle>
          <CardDescription>Det er ingen aktiv mikrolæringsprosess for ditt team for øyeblikket.</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <Card className="card-elevated gradient-primary text-primary-foreground">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <BookOpen className="h-5 w-5" />
            Prosessfremdrift
          </CardTitle>
          <CardDescription className="text-primary-foreground/80">
            Uke {currentContent.week} av 12 • Tema: {currentContent.theme}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-primary-foreground/90">
              <span>Fremdrift</span>
              <span>{Math.round(weeklyProgress)}%</span>
            </div>
            <Progress value={weeklyProgress} className="w-full bg-primary-foreground/20" />
          </div>
        </CardContent>
      </Card>

      {/* Current Content */}
      {currentContent.type === "microlearning" ? (
        <div className="space-y-6">
          {/* Self Reflection */}
          <Card className="card-elevated card-hover">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-secondary">
                <Lightbulb className="h-5 w-5" />
                Egen refleksjon
              </CardTitle>
              <CardDescription>Ta deg tid til å reflektere over dette før du går videre</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">{currentContent.selfReflection}</p>
            </CardContent>
          </Card>

          {/* Insight */}
          <Card className="card-elevated card-hover">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <BookOpen className="h-5 w-5" />
                Innsikt
              </CardTitle>
              <CardDescription>Læring basert på teamets mål og retningslinjer</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed">{currentContent.insight}</p>
            </CardContent>
          </Card>

          {/* Action Instructions */}
          <Card className="card-elevated card-hover">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-accent">
                <Target className="h-5 w-5" />
                Handlingsinstruksjoner
              </CardTitle>
              <CardDescription>Konkrete steg for å omsette læringen til praksis</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed">{currentContent.actionInstructions}</p>
            </CardContent>
          </Card>

          {/* Leader Content (if user is leader) */}
          {userData.role === "leader" && currentContent.leaderContent && (
            <Card className="card-elevated border-warning/30 bg-warning/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-warning">
                  <Target className="h-5 w-5" />
                  Lederguide
                </CardTitle>
                <CardDescription className="text-warning/80">Spesifikk veiledning for å støtte teamet</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-warning-foreground">{currentContent.leaderContent}</p>
              </CardContent>
            </Card>
          )}
        </div>
      ) : (
        /* Reflection Questions */
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Refleksjonsspørsmål
            </CardTitle>
            <CardDescription>Tenk gjennom disse spørsmålene og del dine tanker</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {currentContent.questions?.map((question, index) => (
              <div key={index} className="p-4 bg-muted rounded-lg">
                <p className="font-medium text-sm mb-2">
                  {index + 1}. {question}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Response Section */}
      <Card className="card-elevated">
        <CardHeader>
          <CardTitle>Din respons</CardTitle>
          <CardDescription>
            {currentContent.type === "microlearning"
              ? "Hvordan vil du implementere dette i din hverdag?"
              : "Del dine refleksjoner og tanker"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Skriv din respons her..."
            value={userResponse}
            onChange={(e) => setUserResponse(e.target.value)}
            rows={6}
            disabled={currentContent.isCompleted}
            className="input-field"
          />

          {currentContent.isCompleted ? (
            <div className="flex items-center gap-2 text-success">
              <CheckCircle className="h-4 w-4" />
              <span className="text-sm">Fullført</span>
            </div>
          ) : (
            <Button onClick={submitResponse} disabled={!userResponse.trim()} className="w-full btn-primary">
              Send inn respons
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
