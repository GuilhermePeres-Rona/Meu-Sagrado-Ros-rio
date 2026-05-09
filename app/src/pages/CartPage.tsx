import { Link } from "react-router-dom";
import { Trash2, Plus, Minus, ArrowRight, Gift, Tag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { products } from "@/data/products";
import { useState } from "react";

const CartPage = () => {
  const { items, removeItem, updateQuantity, total, itemCount, coupon, setCoupon, discount, applyCoupon } = useCart();
  const [couponMsg, setCouponMsg] = useState("");
  const [showUpsell, setShowUpsell] = useState(true);
  const giftBoxPrice = 29.90;
  const [addedGiftBox, setAddedGiftBox] = useState(false);

  const subtotal = items.reduce((s, i) => s + i.product.price * i.quantity, 0);
  const freeShipping = subtotal >= 150;

  const handleCoupon = () => {
    if (applyCoupon()) setCouponMsg("Cupom aplicado com sucesso! 🎉");
    else setCouponMsg("Cupom inválido. Tente: FE10, BENDITO20 ou GRACA15");
  };

  // Upsell: suggest product not in cart
  const cartIds = items.map((i) => i.product.id);
  const upsellProduct = products.find((p) => !cartIds.includes(p.id) && p.price < 100);

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="font-heading text-3xl font-bold text-foreground mb-4">Seu carrinho está vazio</h1>
        <p className="text-muted-foreground mb-8">Que tal explorar nossa coleção e encontrar o terço perfeito?</p>
        <Link to="/catalogo" className="inline-flex items-center gap-2 bg-gradient-gold text-primary-foreground px-8 py-3 rounded-lg font-medium shadow-gold">
          Ver Catálogo <ArrowRight size={18} />
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8">
        Seu <span className="text-gradient-gold">Carrinho</span>
        <span className="text-base font-body text-muted-foreground ml-3">({itemCount} {itemCount === 1 ? "item" : "itens"})</span>
      </h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.product.id} className="flex gap-4 bg-card border border-border rounded-xl p-4">
              <Link to={`/produto/${item.product.id}`}>
                <img src={item.product.image} alt={item.product.name} loading="lazy" width={100} height={100} className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-lg" />
              </Link>
              <div className="flex-1 min-w-0">
                <Link to={`/produto/${item.product.id}`} className="font-heading text-base font-semibold text-foreground line-clamp-1 hover:text-primary">
                  {item.product.name}
                </Link>
                <p className="text-sm text-muted-foreground">{item.product.material} • {item.product.color}</p>
                <div className="flex items-center gap-3 mt-2">
                  <div className="flex items-center border border-border rounded-lg">
                    <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="p-1.5 text-muted-foreground hover:text-foreground"><Minus size={14} /></button>
                    <span className="px-3 text-sm font-medium">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="p-1.5 text-muted-foreground hover:text-foreground"><Plus size={14} /></button>
                  </div>
                  <span className="font-bold text-foreground">R$ {(item.product.price * item.quantity).toFixed(2)}</span>
                  <button onClick={() => removeItem(item.product.id)} className="ml-auto p-1.5 text-muted-foreground hover:text-destructive transition-colors" aria-label="Remover">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Upsell */}
          {showUpsell && upsellProduct && (
            <div className="bg-secondary/50 border border-primary/20 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Gift size={16} className="text-primary" />
                <span className="text-sm font-semibold text-foreground">Que tal adicionar?</span>
                <button onClick={() => setShowUpsell(false)} className="ml-auto text-xs text-muted-foreground hover:underline">Fechar</button>
              </div>
              <div className="flex items-center gap-3">
                <img src={upsellProduct.image} alt={upsellProduct.name} loading="lazy" width={60} height={60} className="w-14 h-14 object-cover rounded-lg" />
                <div className="flex-1">
                  <p className="text-sm font-medium">{upsellProduct.name}</p>
                  <p className="text-sm text-primary font-bold">R$ {upsellProduct.price.toFixed(2)}</p>
                </div>
                <Link to={`/produto/${upsellProduct.id}`} className="text-xs text-primary font-medium hover:underline">Ver</Link>
              </div>
            </div>
          )}

          {/* Gift box upsell */}
          {!addedGiftBox && (
            <div className="bg-secondary/50 border border-primary/20 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🎁</span>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Caixa de Presente Premium</p>
                    <p className="text-xs text-muted-foreground">Embalagem especial com laço dourado + R$ {giftBoxPrice.toFixed(2)}</p>
                  </div>
                </div>
                <button onClick={() => setAddedGiftBox(true)} className="text-sm text-primary font-medium hover:underline">Adicionar</button>
              </div>
            </div>
          )}
        </div>

        {/* Summary */}
        <div className="bg-card border border-border rounded-xl p-6 h-fit sticky top-24 space-y-4">
          <h2 className="font-heading text-xl font-bold text-foreground">Resumo do Pedido</h2>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>R$ {subtotal.toFixed(2)}</span></div>
            {addedGiftBox && <div className="flex justify-between"><span className="text-muted-foreground">Caixa presente</span><span>R$ {giftBoxPrice.toFixed(2)}</span></div>}
            {discount > 0 && <div className="flex justify-between text-primary"><span>Desconto ({(discount * 100).toFixed(0)}%)</span><span>-R$ {(subtotal * discount).toFixed(2)}</span></div>}
            <div className="flex justify-between"><span className="text-muted-foreground">Frete</span><span className={freeShipping ? "text-primary font-medium" : ""}>{freeShipping ? "Grátis 🎉" : "Calcular no checkout"}</span></div>
          </div>

          {/* Coupon */}
          <div>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  placeholder="Cupom de desconto"
                  className="w-full pl-9 pr-3 py-2 text-sm border border-border rounded-lg bg-background"
                />
              </div>
              <button onClick={handleCoupon} className="px-4 py-2 bg-secondary text-secondary-foreground text-sm font-medium rounded-lg hover:bg-accent transition-colors">Aplicar</button>
            </div>
            {couponMsg && <p className={`text-xs mt-1 ${discount > 0 ? "text-primary" : "text-destructive"}`}>{couponMsg}</p>}
          </div>

          <div className="border-t border-border pt-4">
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>R$ {(total + (addedGiftBox ? giftBoxPrice : 0)).toFixed(2)}</span>
            </div>
          </div>

          <button className="w-full bg-gradient-gold text-primary-foreground py-3 rounded-lg font-medium hover:opacity-90 transition-opacity shadow-gold flex items-center justify-center gap-2">
            Finalizar Compra <ArrowRight size={18} />
          </button>

          {!freeShipping && (
            <p className="text-xs text-center text-muted-foreground">
              Faltam <strong className="text-primary">R$ {(150 - subtotal).toFixed(2)}</strong> para frete grátis!
            </p>
          )}

          {/* Progressive discount */}
          <div className="text-xs text-center text-muted-foreground border-t border-border pt-3">
            🔥 Desconto progressivo: 2 itens = 5% off • 3+ itens = 10% off
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
