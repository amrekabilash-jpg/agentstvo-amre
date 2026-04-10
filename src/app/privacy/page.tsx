import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Политика конфиденциальности",
  description: "Политика конфиденциальности цифрового агентства Агентство. Обработка персональных данных.",
  alternates: { canonical: "https://agentsvo.com/privacy" },
};

export default function PrivacyPage(): React.ReactElement {
  return (
    <div className="bg-white">
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-20">
        <div className="container-atlantis max-w-3xl">
          <h1 className="display-hero mb-8">Политика конфиденциальности</h1>
          <p className="text-body mb-6">Дата вступления в силу: 1 января 2026 г.</p>

          <div className="space-y-8 text-body leading-relaxed">
            <section>
              <h2 className="text-h3 mb-3">1. Общие положения</h2>
              <p>Настоящая Политика конфиденциальности определяет порядок обработки и защиты персональных данных пользователей сайта agentsvo.com (далее — «Сайт»), принадлежащего ТОО «Агентство» (далее — «Компания»).</p>
            </section>

            <section>
              <h2 className="text-h3 mb-3">2. Какие данные мы собираем</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Имя и фамилия</li>
                <li>Адрес электронной почты</li>
                <li>Номер телефона</li>
                <li>Данные, предоставленные через форму обратной связи</li>
                <li>Файлы, прикреплённые к заявкам</li>
                <li>Техническая информация (IP-адрес, браузер, cookies)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-h3 mb-3">3. Цели обработки данных</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Обработка заявок и обращений</li>
                <li>Связь с клиентами по вопросам оказания услуг</li>
                <li>Улучшение качества обслуживания</li>
                <li>Аналитика использования сайта</li>
                <li>Выполнение требований законодательства РК</li>
              </ul>
            </section>

            <section>
              <h2 className="text-h3 mb-3">4. Защита данных</h2>
              <p>Компания принимает необходимые организационные и технические меры для защиты персональных данных от несанкционированного доступа, изменения, раскрытия или уничтожения. Передача данных осуществляется по защищённому протоколу HTTPS.</p>
            </section>

            <section>
              <h2 className="text-h3 mb-3">5. Передача данных третьим лицам</h2>
              <p>Компания не передаёт персональные данные третьим лицам, за исключением случаев, предусмотренных законодательством Республики Казахстан, а также при использовании сервисов аналитики (Google Analytics, Яндекс.Метрика).</p>
            </section>

            <section>
              <h2 className="text-h3 mb-3">6. Cookies</h2>
              <p>Сайт использует файлы cookies для улучшения работы сайта и анализа трафика. Вы можете отключить cookies в настройках браузера.</p>
            </section>

            <section>
              <h2 className="text-h3 mb-3">7. Права пользователя</h2>
              <p>Вы вправе запросить информацию о ваших персональных данных, их изменение или удаление, направив запрос на <a href="mailto:hello@agentsvo.com" className="text-[var(--accent-blue)] hover:underline">hello@agentsvo.com</a>.</p>
            </section>

            <section>
              <h2 className="text-h3 mb-3">8. Контакты</h2>
              <p>По вопросам обработки персональных данных:</p>
              <p className="mt-2">Email: <a href="mailto:hello@agentsvo.com" className="text-[var(--accent-blue)] hover:underline">hello@agentsvo.com</a></p>
              <p>Телефон: <a href="tel:+77017282236" className="text-[var(--accent-blue)] hover:underline">+7 701 728 22 36</a></p>
              <p>Адрес: Казахстан, г. Алматы</p>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}
