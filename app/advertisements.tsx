"use client";

import { useEffect, useState } from "react";

type Advertisement = {
  id: string;
  company: string;
  title: string;
  description: string;
  image: string | null;
  link: string | null;
  package: string;
};

export default function Advertisements() {
  const [advertisements, setAdvertisements] = useState<Advertisement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadAdvertisements() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("/api/advertisements", {
          method: "GET",
          cache: "no-store",
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            typeof data?.error === "string"
              ? data.error
              : "Reklamlar yüklenemedi."
          );
        }

        if (!Array.isArray(data)) {
          throw new Error("API geçersiz reklam verisi döndürdü.");
        }

        if (!cancelled) {
          setAdvertisements(data);
        }
      } catch (error) {
        console.error("Advertisement loading error:", error);

        if (!cancelled) {
          setAdvertisements([]);
          setError(
            error instanceof Error
              ? error.message
              : "Reklamlar yüklenirken bir hata oluştu."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadAdvertisements();

    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <p className="ads-loading">
        Reklamlar yükleniyor...
      </p>
    );
  }

  if (error) {
    return (
      <div className="ads-loading">
        <p>Reklamlar yüklenemedi.</p>
        <small>{error}</small>
      </div>
    );
  }

  if (advertisements.length === 0) {
    return (
      <p className="ads-loading">
        Henüz yayınlanmış reklam bulunmuyor.
      </p>
    );
  }

  return (
    <div className="ad-grid">
      {advertisements.map((ad) => (
        <article className="ad-card" key={ad.id}>
          <div
            className="ad-visual database-ad-visual"
            style={
              ad.image
                ? {
                    backgroundImage: `url(${ad.image})`,
                  }
                : undefined
            }
          >
            {!ad.image && <span>{ad.company}</span>}
          </div>

          <div className="ad-content">
            <div className="ad-meta">
              <span>SPONSORLU</span>
              <small>{ad.package}</small>
            </div>

            <h3>{ad.title}</h3>

            <p className="ad-description">
              {ad.description}
            </p>

            {ad.link ? (
              <a
                href={ad.link}
                target="_blank"
                rel="noopener noreferrer"
                className="ad-link"
              >
                Detayları Gör →
              </a>
            ) : (
              <span className="ad-link">
                Detayları Gör →
              </span>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}
