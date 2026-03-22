import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type HeatmapData = {
  date: string
  value: number
}

export default function HeatMap() {
  const [data, setData] = useState<HeatmapData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 🔄 Simulação de API
    setTimeout(() => {
      const mockData: HeatmapData[] = Array.from({ length: 30 }, (_, i) => ({
        date: `2026-03-${i + 1}`,
        value: Math.floor(Math.random() * 5),
      }))

      setData(mockData)
      setLoading(false)
    }, 1200)
  }, [])

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Heatmap</h1>

      <Card>
        <CardHeader>
          <CardTitle>Activity Overview</CardTitle>
        </CardHeader>

        <CardContent>
          {loading && <p>Loading heatmap...</p>}

          {!loading && data.length === 0 && (
            <p>No activity found.</p>
          )}

          {!loading && data.length > 0 && (
            <div className="grid grid-cols-6 gap-2">
              {data.map((item, index) => (
                <div
                  key={index}
                  className={`h-10 w-full rounded-md ${
                    item.value === 0
                      ? "bg-gray-200"
                      : item.value === 1
                      ? "bg-green-200"
                      : item.value === 2
                      ? "bg-green-400"
                      : item.value === 3
                      ? "bg-green-600"
                      : "bg-green-800"
                  }`}
                  title={`${item.date} - ${item.value} activities`}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}