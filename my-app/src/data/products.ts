import productWood from "@/assets/product-wood.jpg";
import productCrystal from "@/assets/product-crystal.jpg";
import productGold from "@/assets/product-gold.jpg";
import productPearl from "@/assets/product-pearl.jpg";
import productKids from "@/assets/product-kids.jpg";
import kitBatismo from "@/assets/kit-batismo.jpg";
import kitCasamento from "@/assets/kit-casamento.jpg";

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  category: "tradicional" | "personalizado" | "luxo" | "infantil" | "kit";
  material: string;
  color: string;
  type: "masculino" | "feminino" | "infantil" | "unissex";
  description: string;
  meaning: string;
  indicatedFor: string[];
  badge?: string;
  rating: number;
  reviews: number;
  inStock: boolean;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;
  date: string;
  photo?: boolean;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Terço de Madeira Sagrada",
    price: 89.90,
    originalPrice: 119.90,
    image: productWood,
    images: [productWood, productWood],
    category: "tradicional",
    material: "Madeira",
    color: "Marrom",
    type: "unissex",
    description: "Terço artesanal em madeira nobre com crucifixo banhado a ouro. Cada conta é cuidadosamente polida à mão, trazendo a beleza natural da madeira e a força da fé.",
    meaning: "A madeira simboliza a cruz de Cristo, representando sacrifício, amor e redenção. Este terço conecta o fiel à tradição milenar da oração do rosário.",
    indicatedFor: ["Proteção", "Paz Interior", "Meditação"],
    badge: "Mais Vendido",
    rating: 4.9,
    reviews: 234,
    inStock: true,
  },
  {
    id: "2",
    name: "Terço de Cristal Celestial",
    price: 149.90,
    image: productCrystal,
    images: [productCrystal, productCrystal],
    category: "luxo",
    material: "Cristal",
    color: "Transparente",
    type: "feminino",
    description: "Terço delicado em cristal lapidado com acabamento em prata. Cada conta reflete a luz como uma prece que sobe aos céus, criando um momento único de contemplação.",
    meaning: "O cristal representa pureza e clareza espiritual. Suas facetas refletem a luz divina, lembrando que somos chamados a ser luz no mundo.",
    indicatedFor: ["Gratidão", "Purificação", "Fé"],
    badge: "Novo",
    rating: 4.8,
    reviews: 89,
    inStock: true,
  },
  {
    id: "3",
    name: "Terço Dourado Imperial",
    price: 299.90,
    originalPrice: 399.90,
    image: productGold,
    images: [productGold, productGold],
    category: "luxo",
    material: "Metal Banhado a Ouro",
    color: "Dourado",
    type: "unissex",
    description: "Terço premium com contas banhadas a ouro 18k e crucifixo detalhado. Uma peça de arte sacra que une fé e sofisticação em cada detalhe.",
    meaning: "O ouro na tradição cristã simboliza a divindade e a glória celestial. Este terço é um tributo à majestade de Deus e à preciosidade da oração.",
    indicatedFor: ["Fé Profunda", "Presente Especial", "Devoção"],
    badge: "Premium",
    rating: 5.0,
    reviews: 156,
    inStock: true,
  },
  {
    id: "4",
    name: "Terço Rosé Nossa Senhora",
    price: 129.90,
    image: productPearl,
    images: [productPearl, productPearl],
    category: "tradicional",
    material: "Pérola",
    color: "Rosa",
    type: "feminino",
    description: "Terço feminino em pérolas rosé com crucifixo em ouro rosé. Inspirado na delicadeza de Nossa Senhora, é perfeito para mulheres que buscam fortalecer sua devoção.",
    meaning: "As pérolas representam a sabedoria e a beleza que nasce da adversidade. O rosa simboliza o amor maternal de Maria por todos os seus filhos.",
    indicatedFor: ["Amor", "Proteção Maternal", "Serenidade"],
    rating: 4.7,
    reviews: 178,
    inStock: true,
  },
  {
    id: "5",
    name: "Terço Infantil Arco-Íris",
    price: 49.90,
    image: productKids,
    images: [productKids, productKids],
    category: "infantil",
    material: "Acrílico",
    color: "Colorido",
    type: "infantil",
    description: "Terço colorido e resistente, perfeito para iniciar as crianças na vida de oração. Contas em cores vibrantes que tornam o momento espiritual ainda mais especial.",
    meaning: "As cores representam as virtudes cristãs: azul (fé), verde (esperança), rosa (caridade), amarelo (alegria) e laranja (coragem).",
    indicatedFor: ["Primeira Oração", "Presente Infantil", "Catequese"],
    badge: "Kids",
    rating: 4.9,
    reviews: 312,
    inStock: true,
  },
  {
    id: "6",
    name: "Kit Batismo Abençoado",
    price: 199.90,
    image: kitBatismo,
    images: [kitBatismo, kitBatismo],
    category: "kit",
    material: "Misto",
    color: "Dourado",
    type: "unissex",
    description: "Kit especial para batismo contendo terço banhado a ouro, caixa presenteável e cartão com oração. O presente perfeito para celebrar esse sacramento sagrado.",
    meaning: "O batismo é o primeiro sacramento da fé cristã. Este kit celebra o início de uma jornada espiritual com elegância e significado.",
    indicatedFor: ["Batismo", "Presente", "Celebração"],
    badge: "Kit Especial",
    rating: 4.9,
    reviews: 98,
    inStock: true,
  },
  {
    id: "7",
    name: "Kit Casamento Eterno",
    price: 349.90,
    image: kitCasamento,
    images: [kitCasamento, kitCasamento],
    category: "kit",
    material: "Pérola e Ouro",
    color: "Branco e Dourado",
    type: "unissex",
    description: "Kit nupcial com par de terços em pérola e ouro, caixa de luxo e votos de oração. Simboliza a união sagrada do casal perante Deus.",
    meaning: "O matrimônio é um sacramento de amor eterno. Este kit representa o compromisso do casal em trilhar juntos o caminho da fé.",
    indicatedFor: ["Casamento", "União", "Bênção"],
    rating: 5.0,
    reviews: 67,
    inStock: true,
  },
];

export const dailyPrayers = [
  '"Confiai no Senhor de todo o coração e não vos apoieis na vossa própria inteligência." — Provérbios 3:5',
  '"O Senhor é meu pastor, nada me faltará." — Salmo 23:1',
  '"Tudo posso naquele que me fortalece." — Filipenses 4:13',
  '"A fé é a certeza daquilo que esperamos e a prova das coisas que não vemos." — Hebreus 11:1',
  '"Entrega o teu caminho ao Senhor; confia nele, e ele tudo fará." — Salmo 37:5',
];

export const testimonials: Review[] = [
  { id: "1", name: "Maria Clara S.", rating: 5, text: "O terço de madeira é simplesmente lindo! Cada vez que rezo, sinto uma paz inexplicável. A qualidade é excepcional.", date: "Há 3 dias", photo: true },
  { id: "2", name: "João Pedro M.", rating: 5, text: "Presenteei minha mãe com o Kit Batismo para minha filha. Ela chorou de emoção. Embalagem impecável!", date: "Há 1 semana", photo: true },
  { id: "3", name: "Ana Beatriz L.", rating: 5, text: "O terço de cristal é uma verdadeira obra de arte. Recomendo para todas que buscam um momento especial com Deus.", date: "Há 2 semanas" },
  { id: "4", name: "Carlos Eduardo R.", rating: 5, text: "Comprei o Dourado Imperial para meu casamento. Superou todas as expectativas. Entrega rápida e segura!", date: "Há 1 mês", photo: true },
];

export const categories = [
  { id: "tradicional", name: "Tradicional", description: "Terços clássicos para a oração diária", icon: "✝️" },
  { id: "luxo", name: "Luxo", description: "Peças premium com acabamento refinado", icon: "👑" },
  { id: "personalizado", name: "Personalizado", description: "Crie seu terço único e especial", icon: "✨" },
  { id: "infantil", name: "Infantil", description: "Para os pequenos fiéis", icon: "🌈" },
  { id: "kit", name: "Kits Especiais", description: "Presentes para momentos sagrados", icon: "🎁" },
];
