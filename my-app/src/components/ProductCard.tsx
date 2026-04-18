import { Link } from "react-router-dom";
import { Star, ShoppingBag } from "lucide-react";
import type { Product } from "@/data/products";
import { useCart } from "@/contexts/CartContext";

const ProductCard = ({ product }: { product: Product }) => {
  const { addItem } = useCart();

  return (
    <div className="group bg-card rounded-lg border border-border overflow-hidden hover:shadow-gold transition-all duration-300 hover:-translate-y-1">
      <Link to={`/produto/${product.id}`} className="block relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={400}
          height={400}
          className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.badge && (
          <span className="absolute top-3 left-3 bg-gradient-gold text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
            {product.badge}
          </span>
        )}
      </Link>

      <div className="p-4">
        <Link to={`/produto/${product.id}`}>
          <h3 className="font-heading text-lg font-semibold text-foreground line-clamp-1 hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-1 mt-1">
          <Star size={14} className="fill-primary text-primary" />
          <span className="text-sm font-medium text-foreground">{product.rating}</span>
          <span className="text-xs text-muted-foreground">({product.reviews})</span>
        </div>

        <div className="flex items-center justify-between mt-3">
          <div>
            {product.originalPrice && (
              <span className="text-xs text-muted-foreground line-through mr-2">
                R$ {product.originalPrice.toFixed(2)}
              </span>
            )}
            <span className="text-lg font-bold text-foreground">
              R$ {product.price.toFixed(2)}
            </span>
          </div>
          <button
            onClick={() => addItem(product)}
            className="bg-primary hover:bg-gold-dark text-primary-foreground p-2 rounded-lg transition-colors"
            aria-label="Adicionar ao carrinho"
          >
            <ShoppingBag size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
