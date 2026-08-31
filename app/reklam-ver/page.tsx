"use client";

import { useState } from "react";
import Link from "next/link";

export default function ReklamVerPage() {
  const [form, setForm] = useState({
    company: "",
    email: "",
    title: "",
    description: "",
    image: "",
    link: "",
    package: "BASLANGIC",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/advertisements", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.error || "Bir hata oluştu.");
        return;
      }

      setMessage(
        "Reklam talebiniz başarıyla gönderildi. Admin onayı bekleniyor."
      );

      setForm({
        company: "",
        email: "",
        title: "",
        description: "",
        image: "",
        link: "",
        package: "BASLANGIC",
      });
    } catch {
      setMessage("Bağlantı sırasında bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="kazanix-user-dark" >
      <div className="container form-container">
        <Link href="/" className="back-link">
          ← Kazanix'e Dön
        </Link>

        <div className="form-header">
          <span>REKLAM VER</span>
          <h1>Markanızı Kazanix'te yayınlayın.</h1>
          <p>
            Reklam bilgilerinizi gönderin. Talebiniz admin onayından
            sonra yayınlanacaktır.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="advertisement-form">
          <label>
            Firma Adı *
            <input
              name="company"
              value={form.company}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            E-posta *
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Reklam Başlığı *
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Reklam Açıklaması *
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              rows={5}
            />
          </label>

          <label>
            Görsel URL (opsiyonel)
            <input
              name="image"
              value={form.image}
              onChange={handleChange}
              placeholder="https://..."
            />
          </label>

          <label>
            Web Sitesi URL (opsiyonel)
            <input
              name="link"
              value={form.link}
              onChange={handleChange}
              placeholder="https://..."
            />
          </label>

          <label>
            Reklam Paketi
            <select
              name="package"
              value={form.package}
              onChange={handleChange}
            >
              <option value="BASLANGIC">
                Başlangıç
              </option>

              <option value="STANDART">
                Standart
              </option>

              <option value="ONE_CIKAN">
                Öne Çıkan
              </option>
            </select>
          </label>

          <button
            type="submit"
            className="primary-btn"
            disabled={loading}
          >
            {loading
              ? "Gönderiliyor..."
              : "Reklam Talebini Gönder →"}
          </button>

          {message && (
            <p className="form-message">
              {message}
            </p>
          )}
        </form>
      </div>
    </main>
  );
}
