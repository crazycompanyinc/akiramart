"use client";

import { useEffect } from "react";

/* ═══════════════════════════════════════════════════════════
   PIXEL SPRITE SVGs — Each character as inline SVG
   No canvas, no useEffect needed. Pure SVG pixel art.
   ═══════════════════════════════════════════════════════════ */

function PixelSprite({ type, size = 120 }: { type: string; size?: number }) {
  const s = size / 16; // pixel unit size

  const sprites: Record<string, { bg: string; pixels: [number, number, number, string][] }> = {
    tanjiro: {
      bg: "#2a2420",
      pixels: [
        // Hair top
        ...[2,3,4,5,6,7,8,9,10,11,12,13].map(x => [x,0,"#1a1a1a"] as [number,number,string]),
        ...[2,3,4,5,6,7,8,9,10,11,12,13].map(x => [x,1,"#1a1a1a"] as [number,number,string]),
        ...[1,2,3,4,5,6,7,8,9,10,11,12,13,14].map(x => [x,2,"#1a1a1a"] as [number,number,string]),
        // Hair sides
        ...[3,4,5,6,7,8,9,10].map(y => [2,y,"#1a1a1a"] as [number,number,string]),
        ...[3,4,5,6,7,8,9,10].map(y => [13,y,"#1a1a1a"] as [number,number,string]),
        // Red tips
        [1,3,"#8b1a1a"],[14,3,"#8b1a1a"],[1,4,"#8b1a1a"],[14,4,"#8b1a1a"],
        // Face
        ...[3,4,5,6,7,8,9,10,11,12].flatMap(x => 
          [3,4,5,6,7].map(y => [x,y,"#f0d0b0"] as [number,number,string])
        ).filter((v,i,a) => a.findIndex(t => t[0]===v[0] && t[1]===v[1]) === i),
        // Eyes
        [5,4,"#ffffff"],[6,4,"#ffffff"],[9,4,"#ffffff"],[10,4,"#ffffff"],
        [5,5,"#2a1a0a"],[6,5,"#2a1a0a"],[9,5,"#2a1a0a"],[10,5,"#2a1a0a"],
        // Eyebrows
        [4,3,"#1a1a1a"],[5,3,"#1a1a1a"],[6,3,"#1a1a1a"],
        [9,3,"#1a1a1a"],[10,3,"#1a1a1a"],[11,3,"#1a1a1a"],
        // Nose
        [7,6,"#d8b898"],[8,6,"#d8b898"],
        // Mouth
        [6,7,"#c08070"],[7,7,"#c08070"],[8,7,"#c08070"],[9,7,"#c08070"],
        // Haori body (green-black check)
        ...[8,9,10,11,12,13,14,15,16,17,18,19].flatMap(y =>
          [3,4,5,6,7,8,9,10,11,12].map(x => [x,y,(x+y)%2===0?"#2a4a2a":"#1a1a1a"] as [number,number,string])
        ).filter((v,i,a) => a.findIndex(t => t[0]===v[0] && t[1]===v[1]) === i),
        // Arms
        ...[9,10,11,12,13,14,15,16,17].map(y => [1,y,"#2a4a2a"] as [number,number,string]),
        ...[9,10,11,12,13,14,15,16,17].map(y => [2,y,"#1a1a1a"] as [number,number,string]),
        ...[9,10,11,12,13,14,15,16,17].map(y => [13,y,"#1a1a1a"] as [number,number,string]),
        ...[9,10,11,12,13,14,15,16,17].map(y => [14,y,"#2a4a2a"] as [number,number,string]),
        // Hands
        [1,18,"#f0d0b0"],[2,18,"#f0d0b0"],[13,18,"#f0d0b0"],[14,18,"#f0d0b0"],
      ]
    },
    nezuko: {
      bg: "#2a2420",
      pixels: [
        // Hair
        ...[2,3,4,5,6,7,8,9,10,11,12,13].map(x => [x,0,"#1a0a0a"] as [number,number,string]),
        ...[2,3,4,5,6,7,8,9,10,11,12,13].map(x => [x,1,"#1a0a0a"] as [number,number,string]),
        ...[1,2,3,4,5,6,7,8,9,10,11,12,13,14].map(x => [x,2,"#1a0a0a"] as [number,number,string]),
        ...[2,3,4,5,6,7,8,9,10,11,12].map(y => [1,y,"#1a0a0a"] as [number,number,string]),
        ...[2,3,4,5,6,7,8,9,10,11,12].map(y => [2,y,"#1a0a0a"] as [number,number,string]),
        ...[2,3,4,5,6,7,8,9,10,11,12].map(y => [13,y,"#1a0a0a"] as [number,number,string]),
        ...[2,3,4,5,6,7,8,9,10,11,12].map(y => [14,y,"#1a0a0a"] as [number,number,string]),
        // Bangs
        ...[3,4,5,6,7,8,9,10,11,12].map(x => [x,3,"#1a0a0a"] as [number,number,string]),
        [3,4,"#1a0a0a"],[4,4,"#1a0a0a"],[11,4,"#1a0a0a"],[12,4,"#1a0a0a"],
        // Face
        ...[3,4,5,6,7,8,9,10,11,12].flatMap(x =>
          [3,4,5,6,7].map(y => [x,y,"#f0d0b0"] as [number,number,string])
        ).filter((v,i,a) => a.findIndex(t => t[0]===v[0] && t[1]===v[1]) === i),
        // Eyes
        [5,4,"#ffffff"],[6,4,"#ffffff"],[9,4,"#ffffff"],[10,4,"#ffffff"],
        [5,5,"#6a2060"],[6,5,"#6a2060"],[9,5,"#6a2060"],[10,5,"#6a2060"],
        // Blush
        [4,6,"#ffb0b0"],[11,6,"#ffb0b0"],
        // Mouth
        [7,7,"#c07080"],[8,7,"#c07080"],
        // Bamboo
        [7,8,"#4a8a3a"],[8,8,"#4a8a3a"],
        // Kimono
        ...[8,9,10,11,12,13,14,15,16,17,18,19].flatMap(y =>
          [3,4,5,6,7,8,9,10,11,12].map(x => [x,y,(x+y)%2===0?"#d44060":"#b03050"] as [number,number,string])
        ).filter((v,i,a) => a.findIndex(t => t[0]===v[0] && t[1]===v[1]) === i),
        // Obi
        ...[3,4,5,6,7,8,9,10,11,12].map(x => [x,12,"#ffe0f0"] as [number,number,string]),
        ...[3,4,5,6,7,8,9,10,11,12].map(x => [x,13,"#ffe0f0"] as [number,number,string]),
        // Arms
        ...[9,10,11,12,13,14,15,16,17].map(y => [1,y,"#d44060"] as [number,number,string]),
        ...[9,10,11,12,13,14,15,16,17].map(y => [2,y,"#b03050"] as [number,number,string]),
        ...[9,10,11,12,13,14,15,16,17].map(y => [13,y,"#b03050"] as [number,number,string]),
        ...[9,10,11,12,13,14,15,16,17].map(y => [14,y,"#d44060"] as [number,number,string]),
        [1,18,"#f0d0b0"],[2,18,"#f0d0b0"],[13,18,"#f0d0b0"],[14,18,"#f0d0b0"],
      ]
    },
    goku: {
      bg: "#2a2420",
      pixels: [
        // SSJ Hair (gold, spiky)
        ...[1,2,3,4,5,6,7,8,9,10,11,12,13,14].map(x => [x,0,"#ffaa00"] as [number,number,string]),
        ...[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].map(x => [x,1,"#ffaa00"] as [number,number,string]),
        ...[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].map(x => [x,2,"#ffaa00"] as [number,number,string]),
        [0,3,"#ffaa00"],[15,3,"#ffaa00"],
        // Face
        ...[3,4,5,6,7,8,9,10,11,12].flatMap(x =>
          [3,4,5,6,7].map(y => [x,y,"#f0d0b0"] as [number,number,string])
        ).filter((v,i,a) => a.findIndex(t => t[0]===v[0] && t[1]===v[1]) === i),
        // Eyes
        [5,4,"#ffffff"],[6,4,"#ffffff"],[9,4,"#ffffff"],[10,4,"#ffffff"],
        [5,5,"#1a1a1a"],[6,5,"#1a1a1a"],[9,5,"#1a1a1a"],[10,5,"#1a1a1a"],
        // Angry eyebrows
        [4,3,"#1a1a1a"],[5,3,"#1a1a1a"],[6,3,"#1a1a1a"],
        [9,3,"#1a1a1a"],[10,3,"#1a1a1a"],[11,3,"#1a1a1a"],
        // Nose & mouth
        [7,6,"#d8b898"],[8,6,"#d8b898"],
        [6,7,"#a07060"],[7,7,"#a07060"],[8,7,"#a07060"],[9,7,"#a07060"],
        // Gi body (orange)
        ...[8,9,10,11,12,13,14,15,16,17,18,19].flatMap(y =>
          [3,4,5,6,7,8,9,10,11,12].map(x => [x,y,(x+y)%2===0?"#e06020":"#c05010"] as [number,number,string])
        ).filter((v,i,a) => a.findIndex(t => t[0]===v[0] && t[1]===v[1]) === i),
        // Belt
        ...[3,4,5,6,7,8,9,10,11,12].map(x => [x,13,"#2040a0"] as [number,number,string]),
        ...[3,4,5,6,7,8,9,10,11,12].map(x => [x,14,"#2040a0"] as [number,number,string]),
        // Arms
        ...[9,10,11,12,13,14,15,16,17].flatMap(y =>
          [0,1,2].map(x => [x,y,x%2===0?"#e06020":"#c05010"] as [number,number,string])
        ).filter((v,i,a) => a.findIndex(t => t[0]===v[0] && t[1]===v[1]) === i),
        ...[9,10,11,12,13,14,15,16,17].flatMap(y =>
          [13,14,15].map(x => [x,y,x%2===0?"#c05010":"#e06020"] as [number,number,string])
        ).filter((v,i,a) => a.findIndex(t => t[0]===v[0] && t[1]===v[1]) === i),
        [0,18,"#f0d0b0"],[1,18,"#f0d0b0"],[14,18,"#f0d0b0"],[15,18,"#f0d0b0"],
      ]
    },
    luffy: {
      bg: "#2a2420",
      pixels: [
        // Straw hat
        ...[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].map(x => [x,0,"#e8d080"] as [number,number,string]),
        ...[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].map(x => [x,1,"#e8d080"] as [number,number,string]),
        // Face
        ...[3,4,5,6,7,8,9,10,11,12].flatMap(x =>
          [2,3,4,5,6,7].map(y => [x,y,"#f0d0b0"] as [number,number,string])
        ).filter((v,i,a) => a.findIndex(t => t[0]===v[0] && t[1]===v[1]) === i),
        // Hair under hat
        ...[2,3,4,5,6,7,8,9,10,11,12,13].map(x => [x,2,"#1a1a1a"] as [number,number,string]),
        ...[3,4,5,6].map(y => [2,y,"#1a1a1a"] as [number,number,string]),
        ...[3,4,5,6].map(y => [13,y,"#1a1a1a"] as [number,number,string]),
        // Eyes
        [5,4,"#ffffff"],[6,4,"#ffffff"],[9,4,"#ffffff"],[10,4,"#ffffff"],
        [5,5,"#1a1a1a"],[6,5,"#1a1a1a"],[9,5,"#1a1a1a"],[10,5,"#1a1a1a"],
        // Scar
        [10,6,"#c08070"],[11,6,"#c08070"],
        // Big smile
        [5,7,"#804030"],[6,7,"#804030"],[7,7,"#804030"],[8,7,"#804030"],[9,7,"#804030"],[10,7,"#804030"],
        // Vest (red)
        ...[8,9,10,11,12,13,14].flatMap(y =>
          [3,4,5,6,7,8,9,10,11,12].map(x => [x,y,"#c02020"] as [number,number,string])
        ).filter((v,i,a) => a.findIndex(t => t[0]===v[0] && t[1]===v[1]) === i),
        // Skin showing (chest)
        [6,9,"#f0d0b0"],[7,9,"#f0d0b0"],[8,9,"#f0d0b0"],[9,9,"#f0d0b0"],
        [6,10,"#f0d0b0"],[7,10,"#f0d0b0"],[8,10,"#f0d0b0"],[9,10,"#f0d0b0"],
        // Shorts (blue)
        ...[15,16,17,18,19].flatMap(y =>
          [3,4,5,6,7,8,9,10,11,12].map(x => [x,y,"#2040a0"] as [number,number,string])
        ).filter((v,i,a) => a.findIndex(t => t[0]===v[0] && t[1]===v[1]) === i),
        // Arms (skin)
        ...[9,10,11,12,13,14,15,16,17].map(y => [1,y,"#f0d0b0"] as [number,number,string]),
        ...[9,10,11,12,13,14,15,16,17].map(y => [2,y,"#f0d0b0"] as [number,number,string]),
        ...[9,10,11,12,13,14,15,16,17].map(y => [13,y,"#f0d0b0"] as [number,number,string]),
        ...[9,10,11,12,13,14,15,16,17].map(y => [14,y,"#f0d0b0"] as [number,number,string]),
        // Legs
        [5,18,"#f0d0b0"],[6,18,"#f0d0b0"],[9,18,"#f0d0b0"],[10,18,"#f0d0b0"],
        [5,19,"#f0d0b0"],[6,19,"#f0d0b0"],[9,19,"#f0d0b0"],[10,19,"#f0d0b0"],
      ]
    },
    sakura: {
      bg: "#2a2420",
      pixels: [
        // Hair (pink)
        ...[2,3,4,5,6,7,8,9,10,11,12,13].map(x => [x,0,"#e08090"] as [number,number,string]),
        ...[2,3,4,5,6,7,8,9,10,11,12,13].map(x => [x,1,"#e08090"] as [number,number,string]),
        ...[1,2,3,4,5,6,7,8,9,10,11,12,13,14].map(x => [x,2,"#e08090"] as [number,number,string]),
        ...[2,3,4,5,6,7,8,9,10].map(y => [1,y,"#c06070"] as [number,number,string]),
        ...[2,3,4,5,6,7,8,9,10].map(y => [2,y,"#e08090"] as [number,number,string]),
        ...[2,3,4,5,6,7,8,9,10].map(y => [13,y,"#e08090"] as [number,number,string]),
        ...[2,3,4,5,6,7,8,9,10].map(y => [14,y,"#c06070"] as [number,number,string]),
        // Bangs
        ...[3,4,5,6,7,8,9,10,11,12].map(x => [x,3,"#e08090"] as [number,number,string]),
        [3,4,"#e08090"],[4,4,"#e08090"],[11,4,"#e08090"],[12,4,"#e08090"],
        // Headband
        ...[2,3,4,5,6,7,8,9,10,11,12,13].map(x => [x,3,"#c02020"] as [number,number,string]),
        [7,3,"#c0c0c0"],[8,3,"#c0c0c0"],
        // Face
        ...[3,4,5,6,7,8,9,10,11,12].flatMap(x =>
          [3,4,5,6,7].map(y => [x,y,"#f0d0b0"] as [number,number,string])
        ).filter((v,i,a) => a.findIndex(t => t[0]===v[0] && t[1]===v[1]) === i),
        // Eyes (big green)
        [5,4,"#ffffff"],[6,4,"#ffffff"],[7,4,"#ffffff"],
        [9,4,"#ffffff"],[10,4,"#ffffff"],[11,4,"#ffffff"],
        [5,5,"#40a060"],[6,5,"#40a060"],[10,5,"#40a060"],[11,5,"#40a060"],
        // Blush
        [4,6,"#ffb0b0"],[11,6,"#ffb0b0"],
        // Mouth
        [7,7,"#c07080"],[8,7,"#c07080"],
        // Dress (pink)
        ...[8,9,10,11,12,13,14,15,16,17,18,19].flatMap(y =>
          [3,4,5,6,7,8,9,10,11,12].map(x => [x,y,(x+y)%2===0?"#ff6080":"#e04060"] as [number,number,string])
        ).filter((v,i,a) => a.findIndex(t => t[0]===v[0] && t[1]===v[1]) === i),
        // Arms
        ...[9,10,11,12,13,14,15,16,17].map(y => [1,y,"#ff6080"] as [number,number,string]),
        ...[9,10,11,12,13,14,15,16,17].map(y => [2,y,"#e04060"] as [number,number,string]),
        ...[9,10,11,12,13,14,15,16,17].map(y => [13,y,"#e04060"] as [number,number,string]),
        ...[9,10,11,12,13,14,15,16,17].map(y => [14,y,"#ff6080"] as [number,number,string]),
        [1,18,"#f0d0b0"],[2,18,"#f0d0b0"],[13,18,"#f0d0b0"],[14,18,"#f0d0b0"],
      ]
    },
    rem: {
      bg: "#2a2420",
      pixels: [
        // Hair (blue bob)
        ...[1,2,3,4,5,6,7,8,9,10,11,12,13,14].map(x => [x,0,"#4090d0"] as [number,number,string]),
        ...[1,2,3,4,5,6,7,8,9,10,11,12,13,14].map(x => [x,1,"#4090d0"] as [number,number,string]),
        ...[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].map(x => [x,2,"#4090d0"] as [number,number,string]),
        ...[3,4,5,6,7,8].map(y => [0,y,"#3070b0"] as [number,number,string]),
        ...[3,4,5,6,7,8].map(y => [1,y,"#4090d0"] as [number,number,string]),
        ...[3,4,5,6,7,8].map(y => [14,y,"#4090d0"] as [number,number,string]),
        ...[3,4,5,6,7,8].map(y => [15,y,"#3070b0"] as [number,number,string]),
        // Bangs
        ...[3,4,5,6,7,8,9,10,11,12].map(x => [x,3,"#4090d0"] as [number,number,string]),
        [3,4,"#4090d0"],[4,4,"#4090d0"],[11,4,"#4090d0"],[12,4,"#4090d0"],
        // Ribbon
        [1,1,"#ff4060"],[2,1,"#ff4060"],[1,2,"#ff4060"],
        // Face
        ...[3,4,5,6,7,8,9,10,11,12].flatMap(x =>
          [3,4,5,6,7].map(y => [x,y,"#f0d8c0"] as [number,number,string])
        ).filter((v,i,a) => a.findIndex(t => t[0]===v[0] && t[1]===v[1]) === i),
        // Eyes
        [5,4,"#ffffff"],[6,4,"#ffffff"],[9,4,"#ffffff"],[10,4,"#ffffff"],
        [5,5,"#d04060"],[6,5,"#d04060"],[9,5,"#d04060"],[10,5,"#d04060"],
        // Mouth
        [7,7,"#c08090"],[8,7,"#c08090"],
        // Maid dress (black)
        ...[8,9,10,11,12,13,14,15,16,17,18,19].flatMap(y =>
          [3,4,5,6,7,8,9,10,11,12].map(x => [x,y,(x+y)%2===0?"#202030":"#303040"] as [number,number,string])
        ).filter((v,i,a) => a.findIndex(t => t[0]===v[0] && t[1]===v[1]) === i),
        // Apron (white)
        ...[5,6,7,8,9,10].map(x => [x,10,"#f0f0f0"] as [number,number,string]),
        ...[5,6,7,8,9,10].map(x => [x,11,"#f0f0f0"] as [number,number,string]),
        ...[5,6,7,8,9,10].map(x => [x,12,"#f0f0f0"] as [number,number,string]),
        ...[5,6,7,8,9,10].map(x => [x,13,"#f0f0f0"] as [number,number,string]),
        // Arms
        ...[9,10,11,12,13,14,15,16,17].map(y => [1,y,"#202030"] as [number,number,string]),
        ...[9,10,11,12,13,14,15,16,17].map(y => [2,y,"#303040"] as [number,number,string]),
        ...[9,10,11,12,13,14,15,16,17].map(y => [13,y,"#303040"] as [number,number,string]),
        ...[9,10,11,12,13,14,15,16,17].map(y => [14,y,"#202030"] as [number,number,string]),
        [1,18,"#f0d8c0"],[2,18,"#f0d8c0"],[13,18,"#f0d8c0"],[14,18,"#f0d8c0"],
      ]
    },
  };

  const sprite = sprites[type] || sprites.tanjiro;
  const viewBox = `0 0 ${16 * s} ${20 * s}`;

  return (
    <svg
      width={size}
      height={size * 1.25}
      viewBox={viewBox}
      style={{ imageRendering: "pixelated" }}
      aria-label={type}
    >
      <rect width={16 * s} height={20 * s} fill={sprite.bg} />
      {sprite.pixels.map(([x, y, color], i) => (
        <rect key={i} x={x * s} y={y * s} width={s} height={s} fill={color} />
      ))}
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════
   PRODUCT DATA
   ═══════════════════════════════════════════════════════════ */
const productos = [
  { name: "Tanjiro Kamado", price: "89.99€", sprite: "tanjiro", tag: "¡Nuevo!" },
  { name: "Nezuko Kamado", price: "79.99€", sprite: "nezuko", tag: "Hot" },
  { name: "Goku SSJ", price: "99.99€", sprite: "goku", tag: "" },
  { name: "Monkey D. Luffy", price: "69.99€", sprite: "luffy", tag: "" },
  { name: "Sakura Haruno", price: "59.99€", sprite: "sakura", tag: "Sale" },
  { name: "Rem", price: "84.99€", sprite: "rem", tag: "¡Nuevo!" },
];

const mangas = [
  { name: "One Piece", count: "Vol. 1-106", price: "Desde 7.99€" },
  { name: "Naruto", count: "Vol. 1-72", price: "Desde 6.99€" },
  { name: "Dragon Ball", count: "Vol. 1-42", price: "Desde 8.99€" },
  { name: "Jujutsu Kaisen", count: "Vol. 1-24", price: "Desde 9.99€" },
  { name: "Chainsaw Man", count: "Vol. 1-15", price: "Desde 9.99€" },
  { name: "Spy x Family", count: "Vol. 1-12", price: "Desde 8.49€" },
];

/* ═══════════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════════ */
export default function Home() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <main>
      {/* HERO */}
      <section className="hero">
        <div className="door-frame">
          <div className="door">
            <div className="door-sign">Entra, no muerdo</div>
            <div className="door-knock"></div>
          </div>
          <div className="door-light"></div>
        </div>
        <div className="hero-content">
          <p className="caption">+10.000 cosas que necesitas</p>
          <h1 className="display">La estantería<br />de tu vecino otaku</h1>
          <p className="body-text">Figuras. Mangas. Merch. Ese thing que no sabías que existías pero que ahora necesitas.</p>
          <a href="#estanteria" className="cta">Echar un vistazo →</a>
        </div>
      </section>

      {/* ESTANTERÍA */}
      <section className="estanteria" id="estanteria">
        <div className="section-header reveal">
          <p className="caption">Balda 1 — Figuras</p>
          <h2 className="heading">Cada figura tiene historia</h2>
        </div>
        <div className="shelf">
          <div className="shelf-row reveal">
            <div className="shelf-board"></div>
            <div className="shelf-items">
              {productos.map((prod) => (
                <div key={prod.name} className="producto">
                  <div className="producto-foto">
                    <PixelSprite type={prod.sprite} size={120} />
                  </div>
                  {prod.tag && <div className="producto-sticky">{prod.tag}</div>}
                  <div className="producto-info">
                    <span className="producto-nombre">{prod.name}</span>
                    <span className="producto-precio">{prod.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SUELO */}
      <section className="suelo" id="mangas">
        <div className="section-header reveal">
          <p className="caption">El suelo — Mangas apilados</p>
          <h2 className="heading">Pilas de cosas buenas</h2>
        </div>
        <div className="manga-pilas">
          {mangas.map((manga, i) => (
            <div key={manga.name} className="manga-pila reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
              <div className="pila-stack">
                {[0,1,2,3,4].map((j) => (
                  <div key={j} className="manga" style={{ "--rotate": `${(j - 2) * 1.5}deg` } as React.CSSProperties} />
                ))}
              </div>
              <div className="pila-info">
                <span className="pila-nombre">{manga.name}</span>
                <span className="pila-count">{manga.count}</span>
                <span className="pila-precio">{manga.price}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ESCRITORIO */}
      <section className="escritorio" id="checkout">
        <div className="section-header reveal">
          <p className="caption">El escritorio — Tu carrito</p>
          <h2 className="heading">Tu ticket de compra</h2>
        </div>
        <div className="desk-surface reveal">
          <div className="keyboard">
            <div className="key-row">{["Q","W","E","R","T","Y"].map(k => <span key={k} className="key">{k}</span>)}</div>
            <div className="key-row">{["A","S","D","F","G","H"].map(k => <span key={k} className="key">{k}</span>)}</div>
          </div>
          <div className="coffee-mug">
            <div className="mug-steam"></div>
            <span className="mug-text">お疲れ様</span>
          </div>
          <div className="ticket">
            <div className="ticket-header">
              <span className="ticket-title">Mi carrito</span>
              <span className="ticket-count">3 cosas</span>
            </div>
            <div className="ticket-items">
              <div className="ticket-item"><span>Tanjiro Figure</span><span>89.99€</span></div>
              <div className="ticket-item"><span>One Piece Vol. 106</span><span>7.99€</span></div>
              <div className="ticket-item"><span>Body Pillow — Rem</span><span>45.99€</span></div>
            </div>
            <div className="ticket-total"><span>Total</span><span>143.97€</span></div>
            <button className="ticket-cta">Comprar antes de que se agoten</button>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p className="footer-text">AKIRAMART — La estantería de tu vecino otaku — 2026</p>
      </footer>
    </main>
  );
}
