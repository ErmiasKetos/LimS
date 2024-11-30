'use client'

import { useState } from 'react'
import Layout from '../components/layout'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Document {
  id: string
  name: string
  type: string
  version: string
  lastUpdated: string
}

export default function DocumentManagement() {
  const [documents, setDocuments] = useState<Document[]>([
    { id: '1', name: 'Sample Collection SOP', type: 'SOP', version: '1.2', lastUpdated: '2023-04-15' },
    { id: '2', name: 'Quality Manual', type: 'Policy', version: '2.0', lastUpdated: '2023-03-01' },
  ])

  const [newDocument, setNewDocument] = useState<Omit<Document, 'id' | 'lastUpdated'>>({
    name: '',
    type: '',
    version: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewDocument({ ...newDocument, [e.target.name]: e.target.value })
  }

  const handleSelectChange = (name: string, value: string) => {
    setNewDocument({ ...newDocument, [name]: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const documentWithId = { 
      ...newDocument, 
      id: Date.now().toString(),
      lastUpdated: new Date().toISOString().split('T')[0]
    }
    setDocuments([...documents, documentWithId])
    setNewDocument({ 
      name: '',
      type: '',
      version: '',
    })
  }

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Document Management</h1>
      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <div>
          <Label htmlFor="name">Document Name</Label>
          <Input
            id="name"
            name="name"
            value={newDocument.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="type">Document Type</Label>
          <Select name="type" onValueChange={(value) => handleSelectChange('type', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select document type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="SOP">Standard Operating Procedure</SelectItem>
              <SelectItem value="Policy">Policy</SelectItem>
              <SelectItem value="Form">Form</SelectItem>
              <SelectItem value="Manual">Manual</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="version">Version</Label>
          <Input
            id="version"
            name="version"
            value={newDocument.version}
            onChange={handleInputChange}
            required
          />
        </div>
        <Button type="submit">Add Document</Button>
      </form>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Version</TableHead>
            <TableHead>Last Updated</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {documents.map((document) => (
            <TableRow key={document.id}>
              <TableCell>{document.name}</TableCell>
              <TableCell>{document.type}</TableCell>
              <TableCell>{document.version}</TableCell>
              <TableCell>{document.lastUpdated}</TableCell>
              <TableCell>
                <Button>View</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Layout>
  )
}

