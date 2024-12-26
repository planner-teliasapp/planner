"use client"

import { MassUpdatable } from "@/models/assets/mass-update"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"

interface Props {
  data?: MassUpdatable[]
  isLoading?: boolean
  onValueChange: (id: string, value: string) => void
}

export default function MassUpdateTable({ data = [], isLoading, onValueChange }: Props) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Tipo</TableHead>
          <TableHead>Descrição</TableHead>
          <TableHead>Valor</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map(item => (
          <TableRow key={item.id}>
            <TableCell>{item.type}</TableCell>
            <TableCell>{item.description}</TableCell>
            <TableCell>
              <Input
                type="number"
                value={item.value}
                onChange={e => onValueChange(item.id, e.target.value)}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
