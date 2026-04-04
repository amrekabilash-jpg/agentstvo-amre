import Link from "next/link";
import { GradientButton } from "@/components/ui/gradient-button";

export default function NotFound(): React.ReactElement {
  return (
    <div className="bg-white min-h-[70vh] flex items-center justify-center">
      <div className="container-atlantis text-center">
        <p className="text-[clamp(100px,20vw,200px)] font-black text-slate-100 leading-none select-none">404</p>
        <h1 className="display-section mt-4 mb-4">Страница не найдена</h1>
        <p className="text-body max-w-md mx-auto mb-8">
          Возможно, страница была удалена или вы ввели неверный адрес. Вернитесь на главную или свяжитесь с нами.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/">
            <GradientButton>На главную</GradientButton>
          </Link>
          <Link href="/contacts">
            <GradientButton variant="variant">Связаться с нами</GradientButton>
          </Link>
        </div>
      </div>
    </div>
  );
}
