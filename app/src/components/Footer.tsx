import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

const Footer = () => (
  <footer className="bg-card border-t border-border mt-20">
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-heading text-xl font-semibold text-gradient-gold mb-4">Meu Sagrado Rosário</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Levando fé, devoção e espiritualidade através de terços artesanais feitos com amor e oração.
          </p>
        </div>
        <div>
          <h4 className="font-heading text-lg font-medium mb-4 text-foreground">Navegação</h4>
          <div className="flex flex-col gap-2">
            <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">Início</Link>
            <Link to="/catalogo" className="text-sm text-muted-foreground hover:text-primary transition-colors">Catálogo</Link>
            <Link to="/kits" className="text-sm text-muted-foreground hover:text-primary transition-colors">Kits Especiais</Link>
            <Link to="/clube" className="text-sm text-muted-foreground hover:text-primary transition-colors">Clube do Terço</Link>
          </div>
        </div>
        <div>
          <h4 className="font-heading text-lg font-medium mb-4 text-foreground">Atendimento</h4>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <span>annajulhasilva5@gmail.com</span>
            <span>(34) 98441-5630</span>
            <span>Seg-Sex: 9h às 12h e 18h às 22h</span>
          </div>
        </div>
        <div>
          <h4 className="font-heading text-lg font-medium mb-4 text-foreground">Pagamento</h4>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <span>💳 Cartão de Crédito</span>
            <span>📱 Pix</span>
            <span>📄 Boleto Bancário</span>
          </div>
        </div>
      </div>
      <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
        <span>© 2026 Meu Sagrado Rosário. Todos os direitos reservados.</span>
        <span className="flex items-center gap-1 mt-2 md:mt-0">
          Feito com <Heart size={14} className="text-primary" /> e fé
        </span>
      </div>
    </div>
  </footer>
);

export default Footer;
