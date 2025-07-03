import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight neon-text bg-gradient-to-r from-neon-purple to-neon-blue bg-clip-text text-transparent">
          Configurações
        </h1>
      </div>

      <div className="grid gap-6">
        <Card className="futuristic-card">
          <CardHeader>
            <CardTitle className="text-neon-purple neon-text">Configurações da Empresa</CardTitle>
            <CardDescription>Gerir informações da empresa e configurações gerais.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3">
              <Label htmlFor="company-name">Nome da Empresa</Label>
              <Input
                id="company-name"
                placeholder="Nome da sua empresa"
                defaultValue="Empresa ABC Lda."
                className="bg-muted/50 border-neon-purple/30 focus:border-neon-purple focus:ring-neon-purple/30"
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="company-vat">NIF da Empresa</Label>
              <Input
                id="company-vat"
                placeholder="PT123456789"
                defaultValue="PT123456789"
                className="bg-muted/50 border-neon-purple/30 focus:border-neon-purple focus:ring-neon-purple/30"
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="company-address">Morada</Label>
              <Input
                id="company-address"
                placeholder="Rua da Empresa, 123, 1000-001 Lisboa"
                defaultValue="Rua da Empresa, 123, 1000-001 Lisboa"
                className="bg-muted/50 border-neon-purple/30 focus:border-neon-purple focus:ring-neon-purple/30"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="futuristic-card">
          <CardHeader>
            <CardTitle className="text-neon-purple neon-text">Notificações</CardTitle>
            <CardDescription>Configurar alertas e notificações do sistema.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Notificações de Email</Label>
                <p className="text-sm text-muted-foreground">Receber notificações por email</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator className="bg-neon-purple/20" />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Alertas de Vencimento</Label>
                <p className="text-sm text-muted-foreground">Alertas para faturas próximas do vencimento</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator className="bg-neon-purple/20" />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Relatórios Automáticos</Label>
                <p className="text-sm text-muted-foreground">Gerar relatórios mensais automaticamente</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        <Card className="futuristic-card">
          <CardHeader>
            <CardTitle className="text-neon-purple neon-text">Segurança</CardTitle>
            <CardDescription>Configurações de segurança e acesso.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Autenticação de Dois Fatores</Label>
                <p className="text-sm text-muted-foreground">Adicionar camada extra de segurança</p>
              </div>
              <Switch />
            </div>
            <Separator className="bg-neon-purple/20" />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Sessões Automáticas</Label>
                <p className="text-sm text-muted-foreground">Terminar sessão automaticamente após inatividade</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button className="bg-neon-purple hover:bg-neon-purple/80 text-white">Guardar Configurações</Button>
        </div>
      </div>
    </div>
  )
}
