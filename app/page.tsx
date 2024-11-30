'use client'

import { useState, useEffect } from 'react'
import Layout from './components/layout'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { withAuth } from './components/withAuth'

interface DashboardData {
  totalSamples: number
  samplesInProgress: number
  completedSamples: number
  qcAlerts: number
}

function Dashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    totalSamples: 0,
    samplesInProgress: 0,
    completedSamples: 0,
    qcAlerts: 0,
  })

  useEffect(() => {
    // In a real application, this would be an API call
    const fetchDashboardData = () => {
      setDashboardData({
        totalSamples: 150,
        samplesInProgress: 45,
        completedSamples: 100,
        qcAlerts: 5,
      })
    }

    fetchDashboardData()
  }, [])

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Samples</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{dashboardData.totalSamples}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Samples In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{dashboardData.samplesInProgress}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Completed Samples</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{dashboardData.completedSamples}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>QC Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-red-500">{dashboardData.qcAlerts}</p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}

export default withAuth(Dashboard, ['admin', 'analyst', 'viewer'])

