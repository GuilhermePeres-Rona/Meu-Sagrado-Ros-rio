import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertCircle } from 'lucide-react';

interface LoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type UserType = 'admin' | 'vendedor' | 'cliente';

export const LoginModal = ({ open, onOpenChange }: LoginModalProps) => {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [userType, setUserType] = useState<UserType>('cliente');

  const testAccounts = {
    admin: {
      email: 'admin@rosario.com',
      password: 'admin123',
      description: 'Acesso total ao sistema'
    },
    vendedor: {
      email: 'vendedor@rosario.com',
      password: 'vendedor123',
      description: 'Pode gerenciar produtos'
    },
    cliente: {
      email: 'cliente@rosario.com',
      password: 'cliente123',
      description: 'Acesso a compras'
    }
  };

  const handleQuickLogin = async (type: UserType) => {
    setLoading(true);
    setError('');
    const account = testAccounts[type];
    
    try {
      const { error: signInError } = await signIn(account.email, account.password);
      if (signInError) {
        setError(`Erro ao fazer login: ${signInError.message}`);
      } else {
        onOpenChange(false);
        setEmail('');
        setPassword('');
      }
    } catch (err: any) {
      setError('Erro ao fazer login. Verifique suas credenciais.');
    } finally {
      setLoading(false);
    }
  };

  const handleCustomLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error: signInError } = await signIn(email, password);
      if (signInError) {
        setError(`Erro ao fazer login: ${signInError.message}`);
      } else {
        onOpenChange(false);
        setEmail('');
        setPassword('');
      }
    } catch (err: any) {
      setError('Erro ao fazer login. Verifique suas credenciais.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Fazer Login</DialogTitle>
          <DialogDescription>
            Escolha um tipo de conta de teste ou faça login com suas credenciais
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Botões de Login Rápido */}
          <div className="space-y-3">
            <p className="text-sm font-semibold text-foreground">Contas de Teste</p>
            <div className="grid grid-cols-3 gap-3">
              {(['admin', 'vendedor', 'cliente'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => handleQuickLogin(type)}
                  disabled={loading}
                  className="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-border hover:border-primary hover:bg-primary/5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="text-sm font-bold capitalize text-primary mb-1">{type}</span>
                  <span className="text-xs text-muted-foreground text-center leading-tight">
                    {testAccounts[type].description}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Divisor */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Ou</span>
            </div>
          </div>

          {/* Formulário de Login Customizado */}
          <form onSubmit={handleCustomLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                required
              />
            </div>

            {error && (
              <div className="flex gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>

          {/* Informação das Contas */}
          <div className="bg-muted p-4 rounded-lg space-y-2 text-xs">
            <p className="font-semibold text-foreground">Credenciais de Teste:</p>
            {(['admin', 'vendedor', 'cliente'] as const).map((type) => (
              <div key={type} className="space-y-1">
                <p className="font-medium capitalize text-foreground">{type}</p>
                <p className="text-muted-foreground">
                  Email: <code className="bg-background px-1 rounded">{testAccounts[type].email}</code>
                </p>
                <p className="text-muted-foreground">
                  Senha: <code className="bg-background px-1 rounded">{testAccounts[type].password}</code>
                </p>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
