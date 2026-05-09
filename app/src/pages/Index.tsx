import { Link } from "react-router-dom";
import { ArrowRight, Star, Sparkles, Gift, ChevronRight } from "lucide-react";
import heroImage from "@/assets/hero-rosary.jpg";
import { products, dailyPrayers, testimonials, categories } from "@/data/products";
import ProductCard from "@/components/ProductCard";

const Index = () => {
  const today = new Date().getDay();
  const prayer = dailyPrayers[today % dailyPrayers.length];
  const featured = products.filter((p) => p.badge);
  const bestSellers = products.filter((p) => p.reviews > 100).slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-up">
              <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-4">
                <Sparkles size={14} /> Fé que se carrega no coração
              </span>
              <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground leading-tight mb-6">
                Cada conta,{" "}
                <span className="text-gradient-gold">uma oração.</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-md">
                Terços artesanais feitos com devoção para fortalecer sua fé e transformar seus momentos de oração.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/catalogo"
                  className="inline-flex items-center gap-2 bg-gradient-gold text-primary-foreground px-8 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity shadow-gold"
                >
                  Ver Coleção <ArrowRight size={18} />
                </Link>
                <Link
                  to="/kits"
                  className="inline-flex items-center gap-2 border-2 border-primary text-primary px-8 py-3 rounded-lg font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <Gift size={18} /> Kits Especiais
                </Link>
              </div>
            </div>
            <div className="relative animate-fade-in">
              <div className="rounded-2xl overflow-hidden shadow-gold">
                <img src={heroImage} alt="Terço artesanal sagrado" width={1920} height={1080} className="w-full h-auto object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Daily Prayer */}
      <section className="bg-card border-y border-border">
        <div className="container mx-auto px-4 py-8 text-center">
          <span className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">🙏 Versículo do Dia</span>
          <p className="font-heading text-lg md:text-xl italic text-foreground/80 mt-3 max-w-2xl mx-auto">
            {prayer}
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
            Nossas <span className="text-gradient-gold">Categorias</span>
          </h2>
          <p className="text-muted-foreground mt-2">Encontre o terço perfeito para cada momento de fé</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/catalogo?categoria=${cat.id}`}
              className="bg-card border border-border rounded-xl p-6 text-center hover:shadow-gold hover:-translate-y-1 transition-all duration-300 group"
            >
              <span className="text-3xl">{cat.icon}</span>
              <h3 className="font-heading text-base font-semibold mt-3 text-foreground group-hover:text-primary transition-colors">{cat.name}</h3>
              <p className="text-xs text-muted-foreground mt-1 hidden md:block">{cat.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
              Em <span className="text-gradient-gold">Destaque</span>
            </h2>
            <p className="text-muted-foreground mt-1">Os mais amados pela nossa comunidade</p>
          </div>
          <Link to="/catalogo" className="hidden md:inline-flex items-center gap-1 text-sm text-primary font-medium hover:underline">
            Ver todos <ChevronRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Best Sellers */}
      <section className="bg-card border-y border-border py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
              Mais <span className="text-gradient-gold">Vendidos</span>
            </h2>
            <p className="text-muted-foreground mt-1">Escolhidos por milhares de fiéis</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {bestSellers.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
            O que dizem nossos <span className="text-gradient-gold">fiéis</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-card border border-border rounded-xl p-6 hover:shadow-gold transition-shadow">
              <div className="flex gap-1 mb-3">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={14} className="fill-primary text-primary" />
                ))}
              </div>
              <p className="text-sm text-foreground/80 leading-relaxed mb-4">"{t.text}"</p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-foreground">{t.name}</span>
                <span className="text-xs text-muted-foreground">{t.date}</span>
              </div>
              {t.photo && <span className="inline-block mt-2 text-xs text-primary">📷 Com foto</span>}
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter / Club CTA */}
      <section className="bg-gradient-gold py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Clube do Terço 🙏
          </h2>
          <p className="text-primary-foreground/80 max-w-lg mx-auto mb-8">
            Receba um terço exclusivo todo mês + conteúdo espiritual. Fortaleça sua fé com nosso clube de assinaturas.
          </p>
          <Link
            to="/clube"
            className="inline-flex items-center gap-2 bg-background text-foreground px-8 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Conhecer o Clube <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
