import { useParams, Link } from "react-router-dom";
import { Star, ShoppingBag, Heart, Shield, Truck, RotateCcw, ChevronRight } from "lucide-react";
import { products, testimonials } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import ProductCard from "@/components/ProductCard";
import { useState } from "react";

const ProductPage = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="font-heading text-2xl">Produto não encontrado</h1>
        <Link to="/catalogo" className="text-primary hover:underline mt-4 inline-block">Voltar ao catálogo</Link>
      </div>
    );
  }

  const related = products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4);
  const alsoLiked = products.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
        <Link to="/" className="hover:text-primary">Início</Link>
        <ChevronRight size={14} />
        <Link to="/catalogo" className="hover:text-primary">Catálogo</Link>
        <ChevronRight size={14} />
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-8 md:gap-12">
        {/* Gallery */}
        <div className="space-y-4">
          <div className="rounded-2xl overflow-hidden bg-card border border-border">
            <img src={product.image} alt={product.name} width={800} height={800} className="w-full aspect-square object-cover hover:scale-105 transition-transform duration-500" />
          </div>
        </div>

        {/* Details */}
        <div className="space-y-6">
          {product.badge && (
            <span className="inline-block bg-gradient-gold text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
              {product.badge}
            </span>
          )}
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground">{product.name}</h1>

          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={16} className={i < Math.floor(product.rating) ? "fill-primary text-primary" : "text-border"} />
              ))}
            </div>
            <span className="text-sm font-medium">{product.rating}</span>
            <span className="text-sm text-muted-foreground">({product.reviews} avaliações)</span>
          </div>

          <div className="flex items-baseline gap-3">
            {product.originalPrice && (
              <span className="text-lg text-muted-foreground line-through">R$ {product.originalPrice.toFixed(2)}</span>
            )}
            <span className="text-3xl font-bold text-foreground">R$ {product.price.toFixed(2)}</span>
          </div>
          <p className="text-sm text-muted-foreground">ou 3x de R$ {(product.price / 3).toFixed(2)} sem juros</p>

          <p className="text-foreground/80 leading-relaxed">{product.description}</p>

          {/* Indicated for */}
          <div>
            <h3 className="font-heading text-lg font-semibold mb-2">Indicado para</h3>
            <div className="flex flex-wrap gap-2">
              {product.indicatedFor.map((item) => (
                <span key={item} className="bg-secondary text-secondary-foreground text-sm px-3 py-1 rounded-full">{item}</span>
              ))}
            </div>
          </div>

          {/* Add to cart */}
          <div className="flex items-center gap-4 pt-4">
            <div className="flex items-center border border-border rounded-lg">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 py-2 text-lg font-medium text-muted-foreground hover:text-foreground">−</button>
              <span className="px-4 py-2 font-medium min-w-[2rem] text-center">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="px-3 py-2 text-lg font-medium text-muted-foreground hover:text-foreground">+</button>
            </div>
            <button
              onClick={() => { for (let i = 0; i < qty; i++) addItem(product); }}
              className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-gold text-primary-foreground py-3 rounded-lg font-medium hover:opacity-90 transition-opacity shadow-gold"
            >
              <ShoppingBag size={18} /> Adicionar ao Carrinho
            </button>
            <button className="p-3 border border-border rounded-lg text-muted-foreground hover:text-primary hover:border-primary transition-colors" aria-label="Favoritar">
              <Heart size={20} />
            </button>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
            <div className="flex flex-col items-center text-center gap-1">
              <Shield size={20} className="text-primary" />
              <span className="text-xs text-muted-foreground">Compra Segura</span>
            </div>
            <div className="flex flex-col items-center text-center gap-1">
              <Truck size={20} className="text-primary" />
              <span className="text-xs text-muted-foreground">Frete Grátis +R$150</span>
            </div>
            <div className="flex flex-col items-center text-center gap-1">
              <RotateCcw size={20} className="text-primary" />
              <span className="text-xs text-muted-foreground">Troca em 30 dias</span>
            </div>
          </div>
        </div>
      </div>

      {/* Meaning */}
      <section className="mt-16 bg-card border border-border rounded-2xl p-8">
        <h2 className="font-heading text-2xl font-bold text-foreground mb-4">✝️ Significado & História</h2>
        <p className="text-foreground/80 leading-relaxed">{product.meaning}</p>
      </section>

      {/* Reviews */}
      <section className="mt-16">
        <h2 className="font-heading text-2xl font-bold text-foreground mb-8">Avaliações dos Fiéis</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.slice(0, 4).map((t) => (
            <div key={t.id} className="bg-card border border-border rounded-xl p-6">
              <div className="flex gap-0.5 mb-2">
                {Array.from({ length: t.rating }).map((_, i) => <Star key={i} size={14} className="fill-primary text-primary" />)}
              </div>
              <p className="text-sm text-foreground/80 mb-3">"{t.text}"</p>
              <span className="text-sm font-semibold">{t.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Related */}
      {(related.length > 0 || alsoLiked.length > 0) && (
        <section className="mt-16">
          <h2 className="font-heading text-2xl font-bold text-foreground mb-8">
            Quem viu este, também <span className="text-gradient-gold">gostou</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {(related.length > 0 ? related : alsoLiked).map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductPage;
