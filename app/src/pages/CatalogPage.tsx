import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Filter, X } from "lucide-react";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";

const materials = ["Madeira", "Cristal", "Metal Banhado a Ouro", "Pérola", "Acrílico", "Misto", "Pérola e Ouro"];
const colors = ["Marrom", "Transparente", "Dourado", "Rosa", "Colorido", "Branco e Dourado"];
const types = ["masculino", "feminino", "infantil", "unissex"];
const categoryLabels: Record<string, string> = { tradicional: "Tradicional", luxo: "Luxo", personalizado: "Personalizado", infantil: "Infantil", kit: "Kits" };

const CatalogPage = () => {
  const [params] = useSearchParams();
  const initialCat = params.get("categoria") || "";
  const [category, setCategory] = useState(initialCat);
  const [material, setMaterial] = useState("");
  const [color, setColor] = useState("");
  const [type, setType] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (category && p.category !== category) return false;
      if (material && p.material !== material) return false;
      if (color && p.color !== color) return false;
      if (type && p.type !== type) return false;
      if (p.price < priceRange[0] || p.price > priceRange[1]) return false;
      return true;
    });
  }, [category, material, color, type, priceRange]);

  const clearFilters = () => { setCategory(""); setMaterial(""); setColor(""); setType(""); setPriceRange([0, 500]); };
  const hasFilters = category || material || color || type;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
          Nosso <span className="text-gradient-gold">Catálogo</span>
        </h1>
        <p className="text-muted-foreground mt-2">Explore nossa coleção de terços artesanais</p>
      </div>

      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => setShowFilters(!showFilters)} className="inline-flex items-center gap-2 border border-border px-4 py-2 rounded-lg text-sm font-medium hover:bg-card transition-colors">
          <Filter size={16} /> Filtros
        </button>
        {hasFilters && (
          <button onClick={clearFilters} className="inline-flex items-center gap-1 text-sm text-primary hover:underline">
            <X size={14} /> Limpar filtros
          </button>
        )}
        <span className="text-sm text-muted-foreground ml-auto">{filtered.length} produto(s)</span>
      </div>

      {showFilters && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8 p-4 bg-card border border-border rounded-xl animate-fade-in">
          <div>
            <label className="text-xs font-semibold text-foreground mb-1 block">Categoria</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm">
              <option value="">Todas</option>
              {Object.entries(categoryLabels).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-foreground mb-1 block">Material</label>
            <select value={material} onChange={(e) => setMaterial(e.target.value)} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm">
              <option value="">Todos</option>
              {materials.map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-foreground mb-1 block">Cor</label>
            <select value={color} onChange={(e) => setColor(e.target.value)} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm">
              <option value="">Todas</option>
              {colors.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-foreground mb-1 block">Tipo</label>
            <select value={type} onChange={(e) => setType(e.target.value)} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm">
              <option value="">Todos</option>
              {types.map((t) => <option key={t} value={t} className="capitalize">{t}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-foreground mb-1 block">Preço máx: R$ {priceRange[1]}</label>
            <input type="range" min={0} max={500} step={10} value={priceRange[1]} onChange={(e) => setPriceRange([0, Number(e.target.value)])} className="w-full accent-primary" />
          </div>
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-lg text-muted-foreground">Nenhum produto encontrado com esses filtros.</p>
          <button onClick={clearFilters} className="mt-4 text-primary font-medium hover:underline">Limpar filtros</button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
};

export default CatalogPage;
