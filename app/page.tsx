"use client";

import { useState } from "react";
import Advertisements from "./advertisements";
const categories = [
  "E-Ticaret",
  "Teknoloji",
  "Finans",
  "Mobil Uygulama",
  "Eğitim",
  "Diger",
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToAds = () => {
    document.getElementById("reklamlar")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const scrollToContact = () => {
    document.getElementById("iletisim")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <main className="kazanix-user-dark">
      <nav className="navbar">
        <div className="container nav-inner">
          <a href="#" className="logo">
            KAZAN<span>IX</span>
          </a>

          <button
            className="mobile-menu"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            ☰
          </button>

          <div className={`nav-links ${menuOpen ? "show" : ""}`}>
            <a href="#anasayfa">Ana Sayfa</a>
            <a href="#nasil-calisir">Nasıl Çalışır?</a>
            <a href="#reklamlar">Reklamlar</a>
            <a href="#iletisim">İletişim</a>
            <button onClick={scrollToContact}>Reklam Ver</button>
          </div>
        </div>
      </nav>

      <section className="hero" id="anasayfa">
        <div className="container hero-grid">
          <div className="hero-content">
            <div className="badge">
              <span></span>
              YENİ NESİL REKLAM PLATFORMU
            </div>

            <h1>
              Markanızı
              <br />
              <strong>Doğru Kitleyle</strong>
              <br />
              Buluşturun.
            </h1>

            <p>
              Kazanix ile markanızı daha fazla kişiye ulaştırın.
              Dijital reklam alanlarinizi yönetin ve yeni müşteri
              potansiyellerine ulasin.
            </p>

            <div className="hero-buttons">
              <button className="primary-btn" onClick={scrollToContact}>
                Reklam Vermeye Basla
                <span>→</span>
              </button>

              <button className="secondary-btn" onClick={scrollToAds}>
                Reklamlari Kesfet
              </button>
            </div>

            <div className="hero-stats">
              <div>
                <strong>10K+</strong>
                <span>Potansiyel Erisim</span>
              </div>
              <div>
                <strong>100+</strong>
                <span>Reklam Firsati</span>
              </div>
              <div>
                <strong>7/24</strong>
                <span>Yayin Kontrolu</span>
              </div>
            </div>
          </div>

          <div className="hero-card">
            <div className="glow glow-one"></div>
            <div className="glow glow-two"></div>

            <div className="dashboard">
              <div className="dash-top">
                <span className="mini-logo">K</span>
                <span>Reklam Performansı</span>
                <span className="live">CANLI</span>
              </div>

              <div className="chart-card">
                <span>Toplam Görüntülenme</span>
                <strong>128.4K</strong>
                <small>+24.8% bu ay</small>
                <div className="chart">
                  <i></i><i></i><i></i><i></i><i></i><i></i><i></i>
                  <i></i><i></i><i></i><i></i><i></i>
                </div>
              </div>

              <div className="dash-bottom">
                <div>
                  <span>Tıklanma</span>
                  <strong>12.8K</strong>
                </div>
                <div>
                  <span>Dönüşüm</span>
                  <strong>%8.4</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="brands">
        <div className="container">
          <p>MARKANIZIN DIJITAL BUYUMESI ICIN TEK NOKTA</p>
          <div className="brand-row">
            <span>KAZANIX</span>
            <span>DIGITAL</span>
            <span>GROWTH</span>
            <span>REACH</span>
            <span>MEDIA</span>
          </div>
        </div>
      </section>

      <section className="section" id="nasil-calisir">
        <div className="container">
          <div className="section-heading">
            <span>NASIL CALISIR?</span>
            <h2>Reklamınızı dakikalar içinde yayınlayın.</h2>
            <p>
              Karmaşık süreçler olmadan markanızı ve kampanyanızı
              potansiyel müşterilerle buluşturun.
            </p>
          </div>

          <div className="steps">
            <article className="step-card">
              <div className="step-number">01</div>
   <div className="step-icon">✦</div>
              <h3>Reklamınızı Oluşturun</h3>
              <p>
                Markanızı, kampanyanızı ve hedef kitlenizi belirleyin.
              </p>
            </article>

            <article className="step-card featured">
              <div className="step-number">02</div>
              <div className="step-icon">◉</div>
              <h3>Hedef Kitlenize Ulaşın</h3>
              <p>
                Reklamınız ilgili kullanicilar tarafindan keşfedilsin.
              </p>
            </article>

            <article className="step-card">
              <div className="step-number">03</div>
              <div className="step-icon">↗</div>
              <h3>Sonuçları Takip Edin</h3>
              <p>
                Performans verilerini takip edin ve reklamlarınızı geliştirin.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="ads-section" id="reklamlar">
        <div className="container">
          <div className="ads-header">
            <div>
              <span>ÖNE ÇIKANLAR</span>
              <h2>Yeni Fırsatları Keşfedin.</h2>
            </div>
            <button className="secondary-btn" onClick={scrollToContact}>
              Siz de Reklam Ver
            </button>
          </div>

          <Advertisements />
        </div>
      </section>

      <section className="cta" id="iletisim">
        <div className="container cta-box">
          <div>
            <span>REKLAMINIZI YAYINLAMAYA HAZIR MISINIZ?</span>
            <h2>Markanızın hikayesi daha fazla kişiye ulassin.</h2>
            <p>
              Kazanix ile dijital görünürlüğünüzü güçlendirin.
            </p>
          </div>

          <a
            className="primary-btn"
            href="/reklam-ver"
          >
            Bizimle İletişime Gec
            <span>→</span>
          </a>
        </div>
      </section>

      <footer>
        <div className="container footer-inner">
          <div>
            <a href="#" className="logo">
              KAZAN<span>IX</span>
            </a>
            <p>Dijital reklam ve marka görünürlüğü platformu.</p>
          </div>

          <div className="footer-links">
            <a href="#anasayfa">Ana Sayfa</a>
            <a href="#nasil-calisir">Nasıl Çalışır?</a>
            <a href="#reklamlar">Reklamlar</a>
            <a href="#iletisim">İletişim</a>
          </div>
        </div>

        <div className="container copyright">
          © 2026 Kazanix. Tüm hakları saklıdır.
        </div>
      </footer>
    </main>
  );
}
