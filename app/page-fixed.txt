"use client";

import { useState } from "react";
import Advertisements from "./advertisements";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollAds = () => {
    document
      .getElementById("reklamlar")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="kazanix-user-dark">

      <nav className="navbar">
        <div className="container nav-inner">

          <a href="/" className="logo">
            KAZAN<span>IX</span>
          </a>

          <button
            className="mobile-menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>

          <div className={`nav-links ${menuOpen ? "show" : ""}`}>
            <a href="/">Ana Sayfa</a>
            <a href="#nasil-calisir">Nasıl Çalışır?</a>
            <a href="#reklamlar">Reklamlar</a>
            <a href="/reklam-ver">Reklam Ver</a>
            <a href="/reklamveren/giris">Giriş</a>
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
              Kazanix ile dijital reklamlarınızı yönetin,
              markanızı büyütün ve potansiyel müşterilerinize
              daha hızlı ulaşın.
            </p>


            <div className="hero-buttons">

              <a
                href="/reklam-ver"
                className="primary-btn"
              >
                Reklam Vermeye Başla →
              </a>


              <button
                className="secondary-btn"
                onClick={scrollAds}
              >
                Reklamları Keşfet
              </button>

            </div>


            <div className="hero-stats">

              <div>
                <strong>7/24</strong>
                <span>Aktif Yayın</span>
              </div>

              <div>
                <strong>100+</strong>
                <span>Reklam Alanı</span>
              </div>

              <div>
                <strong>%100</strong>
                <span>Kontrol</span>
              </div>

            </div>


          </div>



          <div className="hero-card">

            <div className="dashboard">

              <div className="dash-top">

                <span className="mini-logo">
                  K
                </span>

                <span>
                  Reklam Paneli
                </span>

                <span className="live">
                  CANLI
                </span>

              </div>


              <div className="chart-card">

                <span>
                  Görüntülenme
                </span>

                <strong>
                  128.4K
                </strong>

                <small>
                  Bu ay +24.8%
                </small>


                <div className="chart">
                  <i></i>
                  <i></i>
                  <i></i>
                  <i></i>
                  <i></i>
                  <i></i>
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



      <section
        className="section"
        id="nasil-calisir"
      >

        <div className="container">

          <div className="section-heading">

            <span>
              NASIL ÇALIŞIR?
            </span>

            <h2>
              Reklamınızı dakikalar içinde yayınlayın.
            </h2>

            <p>
              Basit adımlarla reklam oluşturun,
              hedef kitlenize ulaşın ve sonuçları takip edin.
            </p>

          </div>



          <div className="steps">


            <article className="step-card">

              <div className="step-number">
                01
              </div>

              <h3>
                Reklam Oluşturun
              </h3>

              <p>
                Markanızı ve kampanyanızı sisteme ekleyin.
              </p>

            </article>



            <article className="step-card featured">

              <div className="step-number">
                02
              </div>

              <h3>
                Yayına Alın
              </h3>

              <p>
                Onay sonrası reklamınız kullanıcılarla buluşsun.
              </p>

            </article>



            <article className="step-card">

              <div className="step-number">
                03
              </div>

              <h3>
                Sonuçları İzleyin
              </h3>

              <p>
                Görüntülenme ve performansı takip edin.
              </p>

            </article>


          </div>

        </div>

      </section>



      <section
        className="ads-section"
        id="reklamlar"
      >

        <div className="container">

          <div className="ads-header">

            <div>

              <span>
                ÖNE ÇIKANLAR
              </span>

              <h2>
                Yeni Reklam Fırsatları
              </h2>

            </div>


            <a
              href="/reklam-ver"
              className="secondary-btn"
            >
              Siz de Reklam Verin
            </a>

          </div>


          <Advertisements />


        </div>

      </section>



      <section className="cta">

        <div className="container cta-box">

          <div>

            <span>
              MARKANIZI BÜYÜTMEYE HAZIR MISINIZ?
            </span>

            <h2>
              Reklamınızı bugün yayınlayın.
            </h2>

            <p>
              Kazanix ile dijital görünürlüğünüzü artırın.
            </p>

          </div>


          <a
            href="/reklam-ver"
            className="primary-btn"
          >
            Reklam Ver →
          </a>


        </div>

      </section>



      <footer>

        <div className="container footer-inner">

          <div>

            <a href="/" className="logo">
              KAZAN<span>IX</span>
            </a>

            <p>
              Dijital reklam platformu.
            </p>

          </div>


        </div>


        <div className="container copyright">

          © 2026 Kazanix. Tüm hakları saklıdır.

        </div>


      </footer>


    </main>
  );
}
