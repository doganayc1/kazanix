"use client";

import Advertisements from "./advertisements";
import { useState } from "react";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToAds = () => {
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
            <a href="#anasayfa">Ana Sayfa</a>
            <a href="#nasil-calisir">Nasıl Çalışır?</a>
            <a href="#reklamlar">Reklamlar</a>
            <a href="/reklam-ver">Reklam Ver</a>
            <a href="/reklamveren/giris">
              Giriş Yap
            </a>
          </div>

        </div>
      </nav>


      <section className="hero" id="anasayfa">

        <div className="container hero-grid">

          <div className="hero-content">

            <div className="badge">
              <span></span>
              YENİ NESİL DİJİTAL REKLAM PLATFORMU
            </div>


            <h1>
              Markanızı
              <br />
              <strong>Doğru Kitleyle</strong>
              <br />
              Buluşturun.
            </h1>


            <p>
              Kazanix ile reklamınızı yayınlayın,
              markanızı büyütün ve yeni müşterilere
              ulaşın.
            </p>


            <div className="hero-buttons">

              <a
                href="/reklam-ver"
                className="primary-btn"
              >
                Reklam Vermeye Başla
                <span>→</span>
              </a>


              <button
                className="secondary-btn"
                onClick={scrollToAds}
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
                <span>Kontrollü Sistem</span>
              </div>

            </div>


          </div>


          <div className="hero-card">

            <div className="glow glow-one"></div>
            <div className="glow glow-two"></div>


            <div className="dashboard">

              <div className="dash-top">

                <span className="mini-logo">
                  K
                </span>

                <span>
                  Reklam Performansı
                </span>

                <span className="live">
                  CANLI
                </span>

              </div>


              <div className="chart-card">

                <span>
                  Toplam Görüntülenme
                </span>

                <strong>
                  128.4K
                </strong>

                <small>
                  +24.8% büyüme
                </small>


                <div className="chart">

                  <i></i>
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
                  <span>
                    Tıklanma
                  </span>

                  <strong>
                    12.8K
                  </strong>
                </div>


                <div>
                  <span>
                    Dönüşüm
                  </span>

                  <strong>
                    %8.4
                  </strong>
                </div>


              </div>


            </div>


          </div>


        </div>

      </section>