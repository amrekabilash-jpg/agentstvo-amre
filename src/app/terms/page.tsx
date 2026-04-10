import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Условия использования",
  description: "Условия использования сайта и услуг цифрового агентства Агентство.",
  alternates: { canonical: "https://agentsvo.com/terms" },
};

export default function TermsPage(): React.ReactElement {
  return (
    <div className="bg-white">
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-20">
        <div className="container-atlantis max-w-3xl">
          <h1 className="display-hero mb-8">Условия использования</h1>
          <p className="text-body mb-6">Дата вступления в силу: 1 января 2026 г.</p>

          <div className="space-y-8 text-body leading-relaxed">
            <section>
              <h2 className="text-h3 mb-3">1. Общие положения</h2>
              <p>Настоящие Условия регулируют использование сайта agentsvo.com и услуг, предоставляемых ТОО «Агентство» (далее — «Компания»). Используя сайт, вы соглашаетесь с данными условиями.</p>
            </section>

            <section>
              <h2 className="text-h3 mb-3">2. Услуги</h2>
              <p>Компания предоставляет услуги в области:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>SEO-оптимизация и GEO-продвижение</li>
                <li>Креативный дизайн и разработка</li>
                <li>AI-автоматизация бизнес-процессов</li>
                <li>Консалтинг в области digital-маркетинга</li>
              </ul>
            </section>

            <section>
              <h2 className="text-h3 mb-3">3. Порядок оказания услуг</h2>
              <p>Услуги оказываются на основании индивидуального договора, заключённого между Компанией и Клиентом. Объём, сроки и стоимость услуг определяются в договоре.</p>
            </section>

            <section>
              <h2 className="text-h3 mb-3">4. Интеллектуальная собственность</h2>
              <p>Все материалы сайта (тексты, изображения, дизайн, код) являются интеллектуальной собственностью Компании и защищены законодательством РК. Копирование без письменного согласия запрещено.</p>
            </section>

            <section>
              <h2 className="text-h3 mb-3">5. Ответственность</h2>
              <p>Компания не несёт ответственности за перебои в работе сайта, вызванные техническими причинами. Компания стремится обеспечить актуальность информации на сайте, но не гарантирует её полноту.</p>
            </section>

            <section>
              <h2 className="text-h3 mb-3">6. Разрешение споров</h2>
              <p>Споры разрешаются путём переговоров. При невозможности урегулирования спора он подлежит рассмотрению в судах Республики Казахстан в соответствии с действующим законодательством.</p>
            </section>

            <section>
              <h2 className="text-h3 mb-3">7. Контакты</h2>
              <p>Email: <a href="mailto:hello@agentsvo.com" className="text-[var(--accent-blue)] hover:underline">hello@agentsvo.com</a></p>
              <p>Телефон: <a href="tel:+77017282236" className="text-[var(--accent-blue)] hover:underline">+7 701 728 22 36</a></p>
              <p>Адрес: Казахстан, г. Алматы</p>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}
