"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type Timer = {
  hours: number;
  minutes: number;
  seconds: number;
};

export default function Home() {
  const [showModal, setShowModal] = useState(true);
  const [timer, setTimer] = useState<Timer>({
    hours: 0,
    minutes: 16,
    seconds: 34,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        let { hours, minutes, seconds } = prev;

        if (seconds > 0) seconds--;
        else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        }

        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number) =>
    num.toString().padStart(2, "0");

  const dayTracker = [
    { day: "01", points: 50 },
    { day: "02", points: 100 },
    { day: "03", points: 150 },
    { day: "04", points: 200 },
    { day: "05", points: 250 },
    { day: "06", points: 300 },
  ];

  return (
    <main className="min-h-screen pb-8">
      <header className="text-center py-4">
        <h1 className="text-lg font-semibold text-gray-800">
          TikTok Bônus
        </h1>
      </header>

      <section className="max-w-md mx-auto px-4 space-y-4">
        <div className="card-section flex justify-between items-center">
          <div>
            <span className="text-sm text-gray-600">Seu saldo</span>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">
                R$ 4.596,72
              </span>
              <Image
                src="https://ext.same-assets.com/815575447/326258435.svg"
                alt="coin"
                width={20}
                height={20}
              />
            </div>
          </div>
          <button className="btn-sacar">Sacar</button>
        </div>
      </section>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="text-xl font-bold mb-2">
              Gol de Prêmios
            </h2>

            <p className="text-4xl font-bold mb-4">
              R$ 4.596,72
            </p>

            <div className="flex justify-center gap-1 mb-6">
              <div className="timer-box">
                {formatNumber(timer.hours)}
              </div>
              :
              <div className="timer-box">
                {formatNumber(timer.minutes)}
              </div>
              :
              <div className="timer-box">
                {formatNumber(timer.seconds)}
              </div>
            </div>

            <button
              className="btn-obrigado"
              onClick={() => setShowModal(false)}
            >
              Obrigado
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
