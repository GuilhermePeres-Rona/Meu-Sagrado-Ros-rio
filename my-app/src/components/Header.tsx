import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Menu, X, Search, Heart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { itemCount } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="container mx-auto flex items-center justify-between py-4 px-4">
        <Link to="/" className="flex flex-col items-center">
          <span className="font-heading text-2xl md:text-3xl font-semibold text-gradient-gold tracking-wide">
            Meu Sagrado Rosário
          </span>
          <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            Fé & Devoção
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">Início</Link>
          <Link to="/catalogo" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">Catálogo</Link>
          <Link to="/kits" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">Kits Especiais</Link>
          <Link to="/clube" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">Clube do Terço</Link>
        </nav>

        <div className="flex items-center gap-3">
          <button className="p-2 text-foreground/70 hover:text-primary transition-colors" aria-label="Buscar">
            <Search size={20} />
          </button>
          <button className="p-2 text-foreground/70 hover:text-primary transition-colors hidden md:block" aria-label="Favoritos">
            <Heart size={20} />
          </button>
          <Link to="/carrinho" className="relative p-2 text-foreground/70 hover:text-primary transition-colors">
            <ShoppingBag size={20} />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>
          <button className="md:hidden p-2 text-foreground/70" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="md:hidden border-t border-border bg-background animate-fade-in">
          <div className="flex flex-col py-4 px-6 gap-4">
            <Link to="/" className="text-sm font-medium py-2" onClick={() => setMenuOpen(false)}>Início</Link>
            <Link to="/catalogo" className="text-sm font-medium py-2" onClick={() => setMenuOpen(false)}>Catálogo</Link>
            <Link to="/kits" className="text-sm font-medium py-2" onClick={() => setMenuOpen(false)}>Kits Especiais</Link>
            <Link to="/clube" className="text-sm font-medium py-2" onClick={() => setMenuOpen(false)}>Clube do Terço</Link>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
