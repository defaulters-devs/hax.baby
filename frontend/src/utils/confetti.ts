import confetti from 'canvas-confetti';

export function fireStarConfetti() {
  // Burst of golden starlight from center
  confetti({
    particleCount: 40,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#F59E0B', '#FBBF24', '#38BDF8', '#7DD3FC', '#FCE7F3'],
    shapes: ['star', 'circle'],
    scalar: 1.2,
    ticks: 200,
  });

  // Secondary gentle celestial shower
  setTimeout(() => {
    confetti({
      particleCount: 25,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: ['#FCD34D', '#38BDF8'],
    });
    confetti({
      particleCount: 25,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: ['#FCD34D', '#38BDF8'],
    });
  }, 150);
}
