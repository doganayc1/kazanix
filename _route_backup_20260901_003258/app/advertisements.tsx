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

  useEffect(() => {
    fetch("/api/advertisements")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setAdvertisements(data);
        }
      })
      .catch(() => {
        setAdvertisements([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="ads-loading">Reklamlar yukleniyor...</p>;
  }

  if (advertisements.length === 0) {
    return (
      <p className="ads-loading">
        Henuz yayinlanmis reklam bulunmuyor.
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
                Detaylari Gor →
              </a>
            ) : (
              <span className="ad-link">
                Detaylari Gor →
              </span>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}
