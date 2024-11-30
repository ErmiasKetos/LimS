'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Sample {
  id: string
  clientName: string
  sampleType: string
  dateReceived: string
  status: string
  parameters: string[]
}

export default function SampleManagement() {
  const [samples, setSamples] = useState<Sample[]>([
    { 
      id: '1', 
      clientName: 'ABC Corp', 
      sampleType: 'Water', 
      dateReceived: '2023-05-01', 
      status: 'Received',
      parameters: ['pH', 'Conductivity'],
    },
    { 
      id: '2', 
      clientName: 'XYZ Inc', 
      sampleType: 'Soil', 
      dateReceived: '2023-05-02', 
      status: 'In Progress',
      parameters: ['Lead', 'Cadmium'],
    },
  ])

  const [newSample, setNewSample] = useState<Omit<Sample, 'id'>>({
    clientName: '',
    sampleType: '',
    dateReceived: '',
    status: 'Received',
    parameters: [],
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewSample({ ...newSample, [e.target.name]: e.target.value })
  }

  const handleSelectChange = (value: string) => {
    setNewSample({ ...newSample, status: value })
  }

  const handleParametersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewSample({ ...newSample, parameters: e.target.value.split(',') })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const sampleWithId = { 
      ...newSample, 
      id: Date.now().toString(),
    }
    setSamples([...samples, sampleWithId])
    setNewSample({ 
      clientName: '', 
      sampleType: '', 
      dateReceived: '', 
      status: 'Received',
      parameters: [],
    })
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Sample Management</h1>
      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <div>
          <Label htmlFor="clientName">Client Name</Label>
          <Input
            id="clientName"
            name="clientName"
            value={newSample.clientName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="sampleType">Sample Type</Label>
          <Input
            id="sampleType"
            name="sampleType"
            value={newSample.sampleType}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="dateReceived">Date Received</Label>
          <Input
            id="dateReceived"
            name="dateReceived"
            type="date"
            value={newSample.dateReceived}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="parameters">Parameters (comma-separated)</Label>
          <Input
            id="parameters"
            name="parameters"
            value={newSample.parameters.join(',')}
            onChange={handleParametersChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="status">Status</Label>
          <Select onValueChange={handleSelectChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Received">Received</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button type="submit">Add Sample</Button>
      </form>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Client Name</TableHead>
            <TableHead>Sample Type</TableHead>
            <TableHead>Date Received</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Parameters</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {samples.map((sample) => (
            <TableRow key={sample.id}>
              <TableCell>{sample.id}</TableCell>
              <TableCell>{sample.clientName}</TableCell>
              <TableCell>{sample.sampleType}</TableCell>
              <TableCell>{sample.dateReceived}</TableCell>
              <TableCell>{sample.status}</TableCell>
              <TableCell>{sample.parameters.join(', ')}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

