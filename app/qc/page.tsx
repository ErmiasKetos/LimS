'use client'

import { useState } from 'react'
import Layout from '../components/layout'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface QCData {
  id: string
  sampleId: string
  parameter: string
  value: number
  unit: string
  dateAnalyzed: string
  qcType: string
  acceptanceCriteria: string
  withinLimits: boolean
}

export default function QCManagement() {
  const [qcData, setQCData] = useState<QCData[]>([
    { id: '1', sampleId: '1', parameter: 'pH', value: 7.2, unit: 'pH units', dateAnalyzed: '2023-05-03', qcType: 'LCS', acceptanceCriteria: '7.0 ± 0.5', withinLimits: true },
    { id: '2', sampleId: '1', parameter: 'Conductivity', value: 520, unit: 'µS/cm', dateAnalyzed: '2023-05-03', qcType: 'Duplicate', acceptanceCriteria: '< 10% RPD', withinLimits: true },
    { id: '3', sampleId: '2', parameter: 'Lead', value: 0.05, unit: 'mg/L', dateAnalyzed: '2023-05-04', qcType: 'Method Blank', acceptanceCriteria: '< 0.01 mg/L', withinLimits: false },
  ])

  const [newQCData, setNewQCData] = useState<Omit<QCData, 'id' | 'withinLimits'>>({
    sampleId: '',
    parameter: '',
    value: 0,
    unit: '',
    dateAnalyzed: '',
    qcType: '',
    acceptanceCriteria: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewQCData({ ...newQCData, [e.target.name]: e.target.value })
  }

  const handleSelectChange = (name: string, value: string) => {
    setNewQCData({ ...newQCData, [name]: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const qcDataWithId = { 
      ...newQCData, 
      id: Date.now().toString(),
      withinLimits: Math.random() > 0.2 // Simulating QC check, replace with actual logic
    }
    setQCData([...qcData, qcDataWithId])
    setNewQCData({ 
      sampleId: '',
      parameter: '',
      value: 0,
      unit: '',
      dateAnalyzed: '',
      qcType: '',
      acceptanceCriteria: '',
    })
  }

  const chartData = qcData
    .filter(data => data.parameter === 'pH') // Example: filtering for pH data
    .map(data => ({
      date: data.dateAnalyzed,
      value: data.value,
    }))

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Quality Control Management</h1>
      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <div>
          <Label htmlFor="sampleId">Sample ID</Label>
          <Input
            id="sampleId"
            name="sampleId"
            value={newQCData.sampleId}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="parameter">Parameter</Label>
          <Input
            id="parameter"
            name="parameter"
            value={newQCData.parameter}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="value">Value</Label>
          <Input
            id="value"
            name="value"
            type="number"
            value={newQCData.value}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="unit">Unit</Label>
          <Input
            id="unit"
            name="unit"
            value={newQCData.unit}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="dateAnalyzed">Date Analyzed</Label>
          <Input
            id="dateAnalyzed"
            name="dateAnalyzed"
            type="date"
            value={newQCData.dateAnalyzed}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="qcType">QC Type</Label>
          <Select name="qcType" onValueChange={(value) => handleSelectChange('qcType', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select QC type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="LCS">LCS</SelectItem>
              <SelectItem value="Duplicate">Duplicate</SelectItem>
              <SelectItem value="Method Blank">Method Blank</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="acceptanceCriteria">Acceptance Criteria</Label>
          <Input
            id="acceptanceCriteria"
            name="acceptanceCriteria"
            value={newQCData.acceptanceCriteria}
            onChange={handleInputChange}
            required
          />
        </div>
        <Button type="submit">Add QC Data</Button>
      </form>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Sample ID</TableHead>
            <TableHead>Parameter</TableHead>
            <TableHead>Value</TableHead>
            <TableHead>Unit</TableHead>
            <TableHead>Date Analyzed</TableHead>
            <TableHead>QC Type</TableHead>
            <TableHead>Acceptance Criteria</TableHead>
            <TableHead>Within Limits</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {qcData.map((data) => (
            <TableRow key={data.id}>
              <TableCell>{data.sampleId}</TableCell>
              <TableCell>{data.parameter}</TableCell>
              <TableCell>{data.value}</TableCell>
              <TableCell>{data.unit}</TableCell>
              <TableCell>{data.dateAnalyzed}</TableCell>
              <TableCell>{data.qcType}</TableCell>
              <TableCell>{data.acceptanceCriteria}</TableCell>
              <TableCell>{data.withinLimits ? 'Yes' : 'No'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Control Chart (pH)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Layout>
  )
}

