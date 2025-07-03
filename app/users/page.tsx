import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Filter, Plus, Search, Download } from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { MainNavigation } from "@/components/main-navigation"

export default function UsersPage() {
  const users = [
    {
      id: "1",
      name: "João Silva",
      email: "joao@empresa.pt",
      role: "admin",
      status: "active",
      lastLogin: "2023-12-01",
    },
    {
      id: "2",
      name: "Maria Santos",
      email: "maria@empresa.pt",
      role: "user",
      status: "active",
      lastLogin: "2023-11-30",
    },
    {
      id: "3",
      name: "Pedro Costa",
      email: "pedro@empresa.pt",
      role: "user",
      status: "inactive",
      lastLogin: "2023-11-15",
    },
    {
      id: "4",
      name: "Ana Rodrigues",
      email: "ana@empresa.pt",
      role: "user",
      status: "active",
      lastLogin: "2023-12-02",
    },
    {
      id: "5",
      name: "Carlos Oliveira",
      email: "carlos@empresa.pt",
      role: "admin",
      status: "active",
      lastLogin: "2023-12-01",
    },
  ]

  return (
    <div className="flex min-h-screen w-full flex-col">
      <MainNavigation />
      <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight neon-text bg-gradient-to-r from-neon-purple to-neon-blue bg-clip-text text-transparent">
            Utilizadores
          </h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="border-neon-blue text-neon-blue hover:bg-neon-blue/10">
              <Download className="mr-2 h-4 w-4" />
              Exportar Lista
            </Button>
            <Link href="/users/new">
              <Button className="bg-neon-purple hover:bg-neon-purple/80 text-white">
                <Plus className="mr-2 h-4 w-4" />
                Novo Utilizador
              </Button>
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-neon-purple" />
            <Input
              type="search"
              placeholder="Pesquisar utilizadores..."
              className="w-full pl-8 bg-muted/50 border-neon-purple/30 focus:border-neon-purple focus:ring-neon-purple/30"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
            <span className="sr-only">Filtrar</span>
          </Button>
        </div>

        <Card className="futuristic-card">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-b-neon-purple/20 hover:bg-muted/30">
                  <TableHead className="text-neon-blue">Nome</TableHead>
                  <TableHead className="text-neon-blue">Email</TableHead>
                  <TableHead className="text-neon-blue">Função</TableHead>
                  <TableHead className="text-neon-blue">Estado</TableHead>
                  <TableHead className="text-neon-blue">Último Login</TableHead>
                  <TableHead className="text-right text-neon-blue">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge variant={user.role === "admin" ? "default" : "secondary"}>
                        {user.role === "admin" ? "Administrador" : "Utilizador"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={user.status === "active" ? "outline" : "secondary"}
                        className={
                          user.status === "active"
                            ? "border-neon-green text-neon-green"
                            : "bg-neon-pink/20 text-neon-pink"
                        }
                      >
                        {user.status === "active" ? "Ativo" : "Inativo"}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(user.lastLogin).toLocaleDateString("pt-PT")}</TableCell>
                    <TableCell className="text-right">
                      <Link href={`/users/${user.id}`}>
                        <Button variant="ghost" size="sm">
                          Ver
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
