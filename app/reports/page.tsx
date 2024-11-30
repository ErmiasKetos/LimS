'use client'

import { useState } from 'react'
import Layout from '../components/layout'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Report {
  id: string
  sampleId: string
  reportType: string
  generatedDate: string
  status: string
}

export default function ReportManagement() {
  const [reports, setReports] = useState<Report[]>([
    { id: '1', sampleId: '1', reportType: 'CoA', generatedDate: '2023-05-05', status: 'Generated' },
    { id: '2', sampleId: '2', reportType: 'QC Summary', generatedDate: '2023-05-06', status: 'Pending' },
  ])

  const [newReport, setNewReport] = useState<Omit<Report, 'id' | 'generatedDate' | 'status'>>({
    sampleId: '',
    reportType: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewReport({ ...newReport, [e.target.name]: e.target.value })
  }

  const handleSelectChange = (name: string, value: string) => {
    setNewReport({ ...newReport, [name]: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const reportWithId = { 
      ...newReport, 
      id: Date.now().toString(),
      generatedDate: new Date().toISOString().split('T')[0],
      status: 'Pending'
    }
    setReports([...reports, reportWithId])
    setNewReport({ 
      sampleId: '',
      reportType: '',
    })
  }

  const generateReport = (id: string) => {
    setReports(reports.map(report => 
      report.id === id ? { ...report, status: 'Generated' } : report
    ))
  }

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Report Management</h1>
      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <div>
          <Label htmlFor="sampleId">Sample ID</Label>
          <Input
            id="sampleId"
            name="sampleId"
            value={newReport.sampleId}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="reportType">Report Type</Label>
          <Select name="reportType" onValueChange={(value) => handleSelectChange('reportType', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select report type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="CoA">Certificate of Analysis</SelectItem>
              <SelectItem value="QC Summary">QC Summary</SelectItem>
              <SelectItem value="Regulatory Report">Regulatory Report</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button type="submit">Create Report</Button>
      </form>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Sample ID</TableHead>
            <TableHead>Report Type</TableHead>
            <TableHead>Generated Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reports.map((report) => (
            <TableRow key={report.id}>
              <TableCell>{report.sampleId}</TableCell>
              <TableCell>{report.reportType}</TableCell>
              <TableCell>{report.generatedDate}</TableCell>
              <TableCell>{report.status}</TableCell>
              <TableCell>
                {report.status === 'Pending' && (
                  <Button onClick={() => generateReport(report.id)}>Generate</Button>
                )}
                {report.status === 'Generated' && (
                  <Button>Download</Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Layout>
  )
}

