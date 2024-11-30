'use client'

import { useState } from 'react'
import Layout from '../components/layout'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface AuditLog {
  id: string
  userId: string
  action: string
  tableName: string
  recordId: string
  timestamp: string
}

export default function ComplianceManagement() {
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([
    { id: '1', userId: 'user1', action: 'UPDATE', tableName: 'samples', recordId: '1', timestamp: '2023-05-03 14:30:00' },
    { id: '2', userId: 'user2', action: 'INSERT', tableName: 'qc_data', recordId: '1', timestamp: '2023-05-03 15:45:00' },
    { id: '3', userId: 'user1', action: 'DELETE', tableName: 'reports', recordId: '2', timestamp: '2023-05-04 09:15:00' },
  ])

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Compliance Management</h1>
      <h2 className="text-2xl font-bold mb-4">Audit Logs</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User ID</TableHead>
            <TableHead>Action</TableHead>
            <TableHead>Table</TableHead>
            <TableHead>Record ID</TableHead>
            <TableHead>Timestamp</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {auditLogs.map((log) => (
            <TableRow key={log.id}>
              <TableCell>{log.userId}</TableCell>
              <TableCell>{log.action}</TableCell>
              <TableCell>{log.tableName}</TableCell>
              <TableCell>{log.recordId}</TableCell>
              <TableCell>{log.timestamp}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Layout>
  )
}

