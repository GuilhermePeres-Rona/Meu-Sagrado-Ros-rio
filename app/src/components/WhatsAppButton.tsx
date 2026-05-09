import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => (
  <a
    href="https://wa.me/5511999999999?text=Olá! Gostaria de saber mais sobre os terços."
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20BD5A] text-primary-foreground p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
    aria-label="Contato via WhatsApp"
  >
    <MessageCircle size={24} />
  </a>
);

export default WhatsAppButton;
