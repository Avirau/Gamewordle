// A small list of possible solution words (all 5 letters, uppercase).
export const WORDS = [
  "APPLE", "BRAIN", "CHAIR", "DANCE", "EARTH", "FLAME", "GRAPE", "HEART",
  "IMAGE", "JOKER", "KNIFE", "LEMON", "MOUSE", "NIGHT", "OCEAN", "PLANT",
  "QUEEN", "RIVER", "STONE", "TIGER", "UNITY", "VOICE", "WATER", "YOUTH",
  "ZEBRA", "BREAD", "CLOUD", "DREAM", "FIELD", "GHOST", "HOUSE", "LIGHT",
  "MUSIC", "PAPER", "SMILE", "TRAIN", "WORLD", "BEACH", "CANDY", "SUGAR",
];

export function pickRandomWord() {
  return WORDS[Math.floor(Math.random() * WORDS.length)];
}
