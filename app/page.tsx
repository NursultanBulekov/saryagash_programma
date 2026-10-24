"use client";

import {
  ArrowUpRight,
  Camera,
  Check,
  ChevronDown,
  Clock3,
  Cpu,
  HardDrive,
  MapPin,
  MonitorCog,
  Phone,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { FaInstagram, FaTelegramPlane, FaWhatsapp } from "react-icons/fa";

type Language = "ru" | "kz";
type Service = [string, string, typeof MonitorCog];

const languages: { code: Language; label: string; short: string }[] = [
  { code: "ru", label: "Русский", short: "РУС" },
  { code: "kz", label: "Қазақша", short: "ҚАЗ" },
];

const copy = {
  ru: {
    navServices: "Услуги",
    navPrices: "Цены",
    navAbout: "Как работаю",
    navContacts: "Контакты",
    contactSub: "Напишите или позвоните - отвечу быстро.",
    city: "Сарыагаш, Казахстан",
    language: "ҚАЗ",
    eyebrow: "Компьютерная помощь рядом",
    title: "Компьютер работает медленно?",
    accent: "Вернём ему скорость.",
    description:
      "Настройка, ремонт и обслуживание компьютеров и ноутбуков в Сарыагаше. Понятно объясняю, делаю аккуратно.",
    primary: "Написать в Instagram",
    secondary: "Смотреть цены",
    note: "Работаю с ПК и ноутбуками",
    servicesLabel: "Что могу сделать",
    servicesTitle: "Всё, чтобы техника работала как надо",
    pricesLabel: "Прайс-лист",
    pricesTitle: "Популярные услуги",
    currency: "₸",
    allPrices: "Перейти в Instagram",
    processLabel: "Просто и прозрачно",
    processTitle: "Как проходит работа",
    footerText: "Компьютерная помощь в Сарыагаше",
    footerAction: "Написать",
    contactTitle: "Нужна помощь с компьютером?",
    priceNote:
      "Цены ориентировочные — точную стоимость скажу после короткой консультации.",
  },
  kz: {
    navServices: "Қызметтер",
    navPrices: "Бағалар",
    navAbout: "Қалай жұмыс істеймін",
    navContacts: "Контакттер",
    contactSub:
      "Instagram-да жазыңыз немесе телефонға шақырыңыз - жылдам қайта шығамын.",
    city: "Сарыағаш, Қазақстан",
    language: "РУС",
    eyebrow: "Компьютер көмегі — жақын жерде",
    title: "Компьютеріңіз баяу жұмыс істей ме?",
    accent: "Жылдамдығын қайтарамыз.",
    description:
      "Сарыағашта компьютерлер мен ноутбуктерді баптау, жөндеу және қызмет көрсету. Барлығын түсінікті етіп түсіндіремін.",
    primary: "Instagram-ға жазу",
    secondary: "Бағаларды көру",
    note: "ДK және ноутбуктермен жұмыс істеймін",
    servicesLabel: "Не істей аламын",
    servicesTitle: "Техникаңыз дұрыс жұмыс істеуі үшін барлығы",
    pricesLabel: "Баға тізімі",
    pricesTitle: "Танымал қызметтер",
    currency: "₸",
    allPrices: "Instagram-ға өтіңіз",
    processLabel: "Оңай әрі түсінікті",
    processTitle: "Жұмыс қалай өтеді",
    footerText: "Сарыағаштағы компьютерлік көмек",
    footerAction: "Жазу",
    contactTitle: "Компьютерге көмек керек пе?",
    priceNote:
      "Бағалар шамамен берілген — нақты құнын қысқа кеңестен кейін айтамын.",
  },
};

const services: Record<Language, Service[]> = {
  ru: [
    [
      "Установка Windows",
      "Чистая установка, драйверы и настройка системы.",
      MonitorCog,
    ],
    [
      "Активация Windows",
      "Помогу привести систему в порядок и активировать.",
      ShieldCheck,
    ],
    ["Microsoft Office", "Установка и настройка Word, Excel, PowerPoint.", Cpu],
    [
      "Ускорение ПК",
      "SSD, чистка системы и оптимизация для быстрой работы.",
      HardDrive,
    ],
    [
      "Чистка и термопаста",
      "Профилактика перегрева, замена термопасты.",
      Wrench,
    ],
    [
      "Настройка и консультация",
      "Программы, принтеры, аккаунты и другие задачи.",
      Check,
    ],
  ],
  kz: [
    [
      "Windows орнату",
      "Таза орнату, драйверлер және жүйені баптау.",
      MonitorCog,
    ],
    [
      "Windows белсендіру",
      "Жүйені реттеп, белсендіруге көмектесемін.",
      ShieldCheck,
    ],
    ["Microsoft Office", "Word, Excel, PowerPoint орнату және баптау.", Cpu],
    [
      "ДК жылдамдату",
      "SSD, жүйені тазалау және жылдам жұмысқа оңтайландыру.",
      HardDrive,
    ],
    [
      "Тазалау және термопаста",
      "Қызудың алдын алу, термопастаны ауыстыру.",
      Wrench,
    ],
    [
      "Баптау және кеңес",
      "Бағдарламалар, принтерлер, аккаунттар және басқа істер.",
      Check,
    ],
  ],
};
const prices = {
  ru: [
    ["Установка Windows + драйверы", "от 7 000₸"],
    ["Установка Microsoft Office", "от 3 000₸"],
    ["Активация Windows", "от 3 000₸"],
    ["Чистка + замена термопасты", "от 4 000₸"],
    ["Установка SSD", "от 4 000₸"],
  ],
  kz: [
    ["Windows + драйверлер орнату", "7 000₸ бастап"],
    ["Microsoft Office орнату", "3 000₸ бастап"],
    ["Windows белсендіру", "3 000₸ бастап"],
    ["Тазалау + термопастаны ауыстыру", "4 000₸ бастап"],
    ["SSD орнату", "4 000₸ бастап"],
  ],
};
const steps = {
  ru: [
    [
      "01",
      "Напишите мне",
      "Опишите проблему в Instagram — отвечу и сориентирую по цене.",
    ],
    ["02", "Привезите технику", "Договоримся об удобном времени в Сарыагаше."],
    ["03", "Заберите готовый ПК", "Проверим результат вместе, всё объясню."],
  ],
  kz: [
    [
      "01",
      "Маған жазыңыз",
      "Instagram-да мәселені сипаттаңыз — бағаны бірден айтамын.",
    ],
    ["02", "Техниканы әкеліңіз", "Сарыағашта ыңғайлы уақытқа келісеміз."],
    [
      "03",
      "Дайын ДК-ні алыңыз",
      "Нәтижені бірге тексеріп, бәрін түсіндіремін.",
    ],
  ],
};

export default function Home() {
  const [language, setLanguage] = useState<Language>("ru");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const text = copy[language];
  const instagram = "https://instagram.com/saryagash_programma";
  const phone = "+77757485939";
  const phoneDisplay = "+7 (775) 748-59-39";
  const telegram = "https://t.me/nedeiberesinmagan";
  const whatsapp = "https://wa.me/77757485939";
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node))
        setMenuOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <main>
      <header className="site-header">
        <nav className="nav wrap">
          <a className="brand" href="#top">
            <span className="brand-mark">TS</span>
            <span>
              tech<span>service</span>
            </span>
          </a>

          <div className="nav-links">
            <a href="#services">{text.navServices}</a>
            <a href="#prices">{text.navPrices}</a>
            <a href="#process">{text.navAbout}</a>
            <a href="#contact">{text.navContacts}</a>
          </div>

          <div className="nav-right">
            <a
              className="phone"
              href={`tel:${phone}`}
              aria-label={phoneDisplay}
            >
              <Phone size={15} />
              <span>{phoneDisplay}</span>
            </a>

            <div className="language-wrap" ref={menuRef}>
              <button
                className="language"
                onClick={() => setMenuOpen((o) => !o)}
                aria-haspopup="listbox"
                aria-expanded={menuOpen}
              >
                <span>{languages.find((l) => l.code === language)!.short}</span>
                <ChevronDown
                  size={14}
                  className={menuOpen ? "chevron-open" : ""}
                />
              </button>

              {menuOpen && (
                <ul className="language-menu" role="listbox">
                  {languages.map((l) => (
                    <li key={l.code}>
                      <button
                        role="option"
                        aria-selected={l.code === language}
                        className={l.code === language ? "active" : ""}
                        onClick={() => {
                          setLanguage(l.code);
                          setMenuOpen(false);
                        }}
                      >
                        {l.label}
                        {l.code === language && <Check size={14} />}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </nav>
      </header>
      <section className="hero" id="top">
        <div className="hero-content wrap">
          <div className="location">
            <MapPin size={16} /> {text.city}
          </div>
          <p className="eyebrow">{text.eyebrow}</p>
          <h1>
            {text.title} <em>{text.accent}</em>
          </h1>
          <p className="hero-description">{text.description}</p>
          <div className="hero-actions">
            <a
              className="button button-primary"
              href={instagram}
              target="_blank"
              rel="noreferrer"
            >
              <Camera size={18} /> {text.primary}
            </a>
            <a className="button button-quiet" href="#prices">
              {text.secondary} <ArrowUpRight size={18} />
            </a>
          </div>
          <div className="hero-note">
            <Check size={15} /> {text.note}
          </div>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="glow glow-one" />
          <div className="glow glow-two" />
          <div className="terminal-window">
            <div className="terminal-head">
              <span />
              <span />
              <span />
              <b>system status</b>
            </div>
            <div className="terminal-lines">
              <i />
              <i />
              <i />
              <i />
            </div>
            <div className="terminal-status">
              <span>●</span> READY TO WORK
            </div>
          </div>
          <div className="hardware-card">
            <HardDrive size={31} />
            <span>
              SSD
              <br />
              <b>UPGRADE</b>
            </span>
          </div>
        </div>
      </section>
      <section className="section wrap" id="services">
        <div className="section-heading">
          <p className="eyebrow">{text.servicesLabel}</p>
          <h2>{text.servicesTitle}</h2>
        </div>
        <div className="service-grid">
          {services[language].map(([name, detail, Icon]) => (
            <article className="service-card" key={name as string}>
              <div className="service-icon">
                <Icon size={23} />
              </div>
              <h3>{name}</h3>
              <p>{detail}</p>
              <ArrowUpRight className="service-arrow" size={19} />
            </article>
          ))}
        </div>
      </section>
      <section className="prices-section" id="prices">
        <div className="wrap prices-layout">
          <div className="prices-intro">
            <p className="eyebrow">{text.pricesLabel}</p>
            <h2>{text.pricesTitle}</h2>
            <p>{text.priceNote}</p>
            <a href={instagram} target="_blank" rel="noreferrer">
              {text.allPrices} <ArrowUpRight size={17} />
            </a>
          </div>
          <div className="price-list">
            {prices[language].map(([name, price]) => (
              <div className="price-row" key={name}>
                <span>{name}</span>
                <strong>
                  {price} {text.currency}
                </strong>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section wrap process" id="process">
        <div className="section-heading">
          <p className="eyebrow">{text.processLabel}</p>
          <h2>{text.processTitle}</h2>
        </div>
        <div className="steps">
          {steps[language].map(([number, title, detail]) => (
            <article key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{detail}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="contact wrap" id="contact">
        <div>
          <p className="eyebrow">{text.city}</p>
          <h2>{text.contactTitle}</h2>
          <p className="contact-sub">{text.contactSub}</p>
          <a className="contact-phone" href={`tel:${phone}`}>
            <Phone size={18} /> {phoneDisplay}
          </a>
        </div>
        <div className="contact-actions">
          <a
            className="social social-tg"
            href={telegram}
            target="_blank"
            rel="noreferrer"
          >
            <FaTelegramPlane size={20} /> Telegram
          </a>
          <a
            className="social social-wa"
            href={whatsapp}
            target="_blank"
            rel="noreferrer"
          >
            <FaWhatsapp size={20} /> WhatsApp
          </a>
          <a
            className="social social-ig"
            href={instagram}
            target="_blank"
            rel="noreferrer"
          >
            <FaInstagram size={20} /> Instagram
          </a>
        </div>
      </section>
      <footer className="wrap">
        <a className="brand" href="#top">
          <span className="brand-mark">TS</span>
          <span>
            tech<span>service</span>
          </span>
        </a>
        <p>© 2026 · {text.footerText}</p>
        <span className="footer-online">
          <Clock3 size={14} /> online
        </span>
      </footer>
    </main>
  );
}
