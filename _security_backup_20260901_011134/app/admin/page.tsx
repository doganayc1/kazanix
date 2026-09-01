"use client";

import Link from "next/link";

const stats = [
  {
    label: "Toplam Reklam",
    value: "â€”",
    detail: "Platformdaki toplam reklam",
  },
  {
    label: "Yayındaki Reklamlar",
    value: "â€”",
    detail: "Aktif olarak yayınlanan",
  },
  {
    label: "Onay Bekleyen",
    value: "â€”",
    detail: "İnceleme gerektiren",
  },
  {
    label: "Reklam Verenler",
    value: "â€”",
    detail: "Kayıtlı işletmeler",
  },
];

const menu = [
  {
    title: "Genel Bakış",
    href: "/admin",
    icon: "âŒ‚",
  },
  {
    title: "Reklamlar",
    href: "/admin",
    icon: "â–£",
  },
  {
    title: "Reklam Verenler",
    href: "/admin/advertisers",
    icon: "â—‹",
  },
  {
    title: "Ödemeler",
    href: "/admin/payments",
    icon: "â‚º",
  },
  {
    title: "Kampanyalar",
    href: "/admin/campaigns",
    icon: "â—‡",
  },
  {
    title: "Kategoriler",
    href: "/admin/categories",
    icon: "â‰¡",
  },
  {
    title: "Kullanıcılar",
    href: "/admin/users",
    icon: "â—",
  },
  {
    title: "Raporlar",
    href: "/admin/reports",
    icon: "â†—",
  },
  {
    title: "Bildirimler",
    href: "/admin/notifications",
    icon: "â—Œ",
  },
  {
    title: "Ayarlar",
    href: "/admin/settings",
    icon: "âš™",
  },
];

export default function AdminDashboard() {
  async function handleLogout() {
    try {
      await fetch("/api/admin/logout", {
        method: "POST",
        credentials: "include",
      });
    } finally {
      window.location.href = "/admin/login";
    }
  }

  return (
    <main className="admin-shell">

      <aside className="admin-sidebar">

        <div className="sidebar-brand">
          <Link href="/">
            KAZANIX
          </Link>

          <span>ADMIN</span>
        </div>

        <nav className="admin-nav">

          <div className="nav-section">
            YÖNETİM
          </div>

          {menu.slice(0, 7).map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className={
                index === 0
                  ? "admin-nav-link active"
                  : "admin-nav-link"
              }
            >
              <span className="nav-icon">
                {item.icon}
              </span>

              <span>
                {item.title}
              </span>
            </Link>
          ))}

          <div className="nav-section secondary">
            SİSTEM
          </div>

          {menu.slice(7).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="admin-nav-link"
            >
              <span className="nav-icon">
                {item.icon}
              </span>

              <span>
                {item.title}
              </span>
            </Link>
          ))}

        </nav>

        <div className="sidebar-bottom">

          <Link
            href="/"
            className="site-link"
          >
            â† Siteye dön
          </Link>

          <button
            onClick={handleLogout}
            className="logout-button"
          >
            <span>â†ª</span>
            Çıkış Yap
          </button>

        </div>

      </aside>

      <section className="admin-main">

        <header className="admin-header">

          <div>
            <div className="breadcrumb">
              KAZANIX / ADMIN
            </div>

            <h1>
              Genel Bakış
            </h1>
          </div>

          <div className="admin-user">

            <div className="user-info">
              <strong>
                Yönetici
              </strong>

              <span>
                Administrator
              </span>
            </div>

            <div className="avatar">
              A
            </div>

          </div>

        </header>

        <div className="admin-content">

          <div className="welcome">

            <div>
              <span className="eyebrow">
                YÖNETİM MERKEZİ
              </span>

              <h2>
                Günaydın, Yönetici.
              </h2>

              <p>
                Kazanix reklam platformunun
                genel durumunu buradan yönetin.
              </p>
            </div>

            <Link
              href="/admin"
              className="primary-action"
            >
              Reklamları Yönet
              <span>â†’</span>
            </Link>

          </div>

          <div className="stats-grid">

            {stats.map((stat) => (
              <div
                key={stat.label}
                className="stat-card"
              >
                <div className="stat-top">
                  <span>
                    {stat.label}
                  </span>

                  <span className="stat-dot" />
                </div>

                <strong>
                  {stat.value}
                </strong>

                <p>
                  {stat.detail}
                </p>
              </div>
            ))}

          </div>

          <div className="dashboard-grid">

            <div className="panel-card">

              <div className="panel-header">
                <div>
                  <span className="eyebrow">
                    AKTİVİTELER
                  </span>

                  <h3>
                    Son aktiviteler
                  </h3>
                </div>

                <Link href="/admin/notifications">
                  Tümünü gör â†’
                </Link>
              </div>

              <div className="empty-state">
                <div className="empty-icon">
                  â—Œ
                </div>

                <strong>
                  Henüz aktivite yok
                </strong>

                <p>
                  Platformdaki yeni işlemler
                  burada görünecek.
                </p>
              </div>

            </div>

            <div className="panel-card">

              <div className="panel-header">
                <div>
                  <span className="eyebrow">
                    HIZLI ERİÅİM
                  </span>

                  <h3>
                    Yönetim
                  </h3>
                </div>
              </div>

              <div className="quick-actions">

                <Link href="/admin">
                  <span>â–£</span>
                  <div>
                    <strong>
                      Reklamlar
                    </strong>
                    <small>
                      Reklamları incele ve yönet
                    </small>
                  </div>
                  <b>â†’</b>
                </Link>

                <Link href="/admin/advertisers">
                  <span>â—‹</span>
                  <div>
                    <strong>
                      Reklam Verenler
                    </strong>
                    <small>
                      İşletme hesaplarını yönet
                    </small>
                  </div>
                  <b>â†’</b>
                </Link>

                <Link href="/admin/payments">
                  <span>â‚º</span>
                  <div>
                    <strong>
                      Ödemeler
                    </strong>
                    <small>
                      Ödeme işlemlerini görüntüle
                    </small>
                  </div>
                  <b>â†’</b>
                </Link>

              </div>

            </div>

          </div>

        </div>

      </section>

      <style jsx global>{`

        * {
          box-sizing: border-box;
        }

        html,
        body {
          margin: 0;
          padding: 0;
          min-height: 100%;
        }

        body {
          background: #f5f5f7;
          color: #1d1d1f;
          font-family:
            -apple-system,
            BlinkMacSystemFont,
            "SF Pro Display",
            "SF Pro Text",
            "Helvetica Neue",
            Arial,
            sans-serif;
          -webkit-font-smoothing: antialiased;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        button {
          font: inherit;
        }

        .admin-shell {
          min-height: 100vh;
          display: flex;
          background: #f5f5f7;
        }

        .admin-sidebar {
          width: 248px;
          min-height: 100vh;
          position: fixed;
          left: 0;
          top: 0;
          bottom: 0;
          display: flex;
          flex-direction: column;
          padding: 28px 16px 20px;
          background: rgba(255,255,255,.86);
          border-right: 1px solid rgba(0,0,0,.07);
          backdrop-filter: blur(24px);
        }

        .sidebar-brand {
          padding: 0 12px;
          margin-bottom: 38px;
          display: flex;
          align-items: baseline;
          gap: 8px;
        }

        .sidebar-brand a {
          font-size: 20px;
          font-weight: 700;
          letter-spacing: -0.8px;
        }

        .sidebar-brand span {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 1px;
          color: #86868b;
        }

        .admin-nav {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .nav-section {
          margin: 0 12px 9px;
          padding-top: 2px;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 1.3px;
          color: #a1a1a6;
        }

        .nav-section.secondary {
          margin-top: 27px;
        }

        .admin-nav-link {
          min-height: 42px;
          padding: 0 12px;
          display: flex;
          align-items: center;
          gap: 12px;
          border-radius: 10px;
          color: #6e6e73;
          font-size: 13px;
          transition: .18s ease;
        }

        .admin-nav-link:hover {
          background: #f5f5f7;
          color: #1d1d1f;
        }

        .admin-nav-link.active {
          background: #1d1d1f;
          color: #fff;
        }

        .nav-icon {
          width: 19px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 15px;
        }

        .sidebar-bottom {
          margin-top: auto;
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .site-link,
        .logout-button {
          width: 100%;
          min-height: 42px;
          padding: 0 12px;
          display: flex;
          align-items: center;
          gap: 12px;
          border-radius: 10px;
          border: 0;
          background: transparent;
          color: #6e6e73;
          font-size: 13px;
          text-align: left;
          cursor: pointer;
        }

        .site-link:hover,
        .logout-button:hover {
          background: #f5f5f7;
          color: #1d1d1f;
        }

        .admin-main {
          width: calc(100% - 248px);
          margin-left: 248px;
          min-height: 100vh;
        }

        .admin-header {
          height: 94px;
          padding: 0 48px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid rgba(0,0,0,.06);
          background: rgba(245,245,247,.72);
          backdrop-filter: blur(20px);
        }

        .breadcrumb {
          margin-bottom: 6px;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 1.2px;
          color: #a1a1a6;
        }

        .admin-header h1 {
          margin: 0;
          font-size: 25px;
          letter-spacing: -1px;
        }

        .admin-user {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .user-info {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 3px;
        }

        .user-info strong {
          font-size: 13px;
        }

        .user-info span {
          font-size: 11px;
          color: #86868b;
        }

        .avatar {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: #1d1d1f;
          color: #fff;
          font-size: 13px;
          font-weight: 600;
        }

        .admin-content {
          max-width: 1500px;
          margin: 0 auto;
          padding: 46px 48px 70px;
        }

        .welcome {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 30px;
          margin-bottom: 34px;
        }

        .eyebrow {
          display: block;
          margin-bottom: 9px;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 1.4px;
          color: #a1a1a6;
        }

        .welcome h2 {
          margin: 0;
          font-size: 34px;
          letter-spacing: -1.7px;
        }

        .welcome p {
          margin: 9px 0 0;
          color: #86868b;
          font-size: 14px;
        }

        .primary-action {
          height: 46px;
          padding: 0 18px;
          display: inline-flex;
          align-items: center;
          gap: 15px;
          border-radius: 12px;
          background: #1d1d1f;
          color: #fff;
          font-size: 13px;
          font-weight: 600;
          transition: .18s ease;
        }

        .primary-action:hover {
          background: #000;
          transform: translateY(-1px);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 15px;
          margin-bottom: 15px;
        }

        .stat-card {
          padding: 24px;
          min-height: 150px;
          border-radius: 18px;
          background: rgba(255,255,255,.92);
          border: 1px solid rgba(0,0,0,.06);
          box-shadow:
            0 10px 30px rgba(0,0,0,.025);
        }

        .stat-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: #86868b;
          font-size: 12px;
        }

        .stat-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #d2d2d7;
        }

        .stat-card > strong {
          display: block;
          margin-top: 18px;
          font-size: 31px;
          letter-spacing: -1.5px;
        }

        .stat-card p {
          margin: 5px 0 0;
          color: #a1a1a6;
          font-size: 11px;
        }

        .dashboard-grid {
          display: grid;
          grid-template-columns: 1.35fr 1fr;
          gap: 15px;
        }

        .panel-card {
          min-height: 370px;
          padding: 26px;
          border-radius: 18px;
          background: rgba(255,255,255,.92);
          border: 1px solid rgba(0,0,0,.06);
          box-shadow:
            0 10px 30px rgba(0,0,0,.025);
        }

        .panel-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
        }

        .panel-header h3 {
          margin: 0;
          font-size: 18px;
          letter-spacing: -.5px;
        }

        .panel-header > a {
          color: #6e6e73;
          font-size: 11px;
        }

        .panel-header > a:hover {
          color: #1d1d1f;
        }

        .empty-state {
          min-height: 260px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
        }

        .empty-icon {
          width: 44px;
          height: 44px;
          margin-bottom: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: #f5f5f7;
          color: #a1a1a6;
          font-size: 20px;
        }

        .empty-state strong {
          font-size: 13px;
        }

        .empty-state p {
          max-width: 250px;
          margin: 7px 0 0;
          color: #a1a1a6;
          font-size: 11px;
          line-height: 1.5;
        }

        .quick-actions {
          margin-top: 22px;
          display: flex;
          flex-direction: column;
        }

        .quick-actions a {
          min-height: 76px;
          display: grid;
          grid-template-columns: 36px 1fr 20px;
          align-items: center;
          gap: 13px;
          border-top: 1px solid #f0f0f2;
          transition: .18s ease;
        }

        .quick-actions a:first-child {
          border-top: 0;
        }

        .quick-actions a > span {
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 10px;
          background: #f5f5f7;
          font-size: 14px;
        }

        .quick-actions a div {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .quick-actions strong {
          font-size: 13px;
        }

        .quick-actions small {
          color: #a1a1a6;
          font-size: 10px;
        }

        .quick-actions b {
          color: #a1a1a6;
          font-size: 15px;
          font-weight: 400;
        }

        .quick-actions a:hover b {
          color: #1d1d1f;
        }

        @media (max-width: 1100px) {

          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .dashboard-grid {
            grid-template-columns: 1fr;
          }

        }

        @media (max-width: 800px) {

          .admin-sidebar {
            width: 72px;
            padding-left: 10px;
            padding-right: 10px;
          }

          .sidebar-brand {
            justify-content: center;
            padding: 0;
          }

          .sidebar-brand a {
            font-size: 0;
          }

          .sidebar-brand a::after {
            content: "K";
            font-size: 20px;
          }

          .sidebar-brand span,
          .admin-nav-link span:last-child,
          .nav-section,
          .site-link,
          .logout-button {
            font-size: 0;
          }

          .admin-nav-link,
          .site-link,
          .logout-button {
            justify-content: center;
            padding: 0;
          }

          .nav-icon {
            font-size: 17px;
          }

          .admin-main {
            width: calc(100% - 72px);
            margin-left: 72px;
          }

          .admin-header {
            padding: 0 24px;
          }

          .admin-content {
            padding: 30px 24px 50px;
          }

        }

        @media (max-width: 600px) {

          .admin-header {
            height: 78px;
          }

          .admin-header h1 {
            font-size: 20px;
          }

          .user-info {
            display: none;
          }

          .welcome {
            flex-direction: column;
            align-items: flex-start;
          }

          .welcome h2 {
            font-size: 29px;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }

          .admin-content {
            padding-left: 16px;
            padding-right: 16px;
          }

          .admin-header {
            padding-left: 16px;
            padding-right: 16px;
          }

          .panel-card {
            padding: 20px;
          }

        }

      `}</style>

    </main>
  );
}