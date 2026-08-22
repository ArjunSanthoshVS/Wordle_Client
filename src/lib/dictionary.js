import wordsList from '../words.json';

/**
 * Curated list of common, practical 5-letter English words familiar to everyday
 * Indian English speakers (daily conversation, school, college, office, shopping,
 * travel, food, family, technology, and general life).
 * 
 * Obscure, archaic, highly technical, literary, slang-heavy, and rare words have been removed.
 */
const practicalCommonWords = [
  // A
  "about", "above", "abuse", "actor", "acute", "adapt", "admit", "adopt", "adult", "after",
  "again", "agent", "agree", "ahead", "alarm", "album", "alert", "alien", "alike", "alive",
  "allow", "alone", "along", "aloud", "alter", "amaze", "amber", "amend", "among", "ample",
  "angel", "anger", "angle", "angry", "ankle", "apart", "apple", "apply", "arena", "argue",
  "arise", "armor", "aroma", "array", "arrow", "aside", "asset", "atlas", "attic", "audio",
  "audit", "aunty", "avoid", "await", "awake", "award", "aware", "awful",

  // B
  "bacon", "badge", "badly", "bagel", "baker", "balls", "bands", "banks", "basic", "basin",
  "basis", "batch", "beach", "beans", "beard", "beast", "begin", "being", "belly", "below",
  "belts", "bench", "berry", "bikes", "bills", "birds", "birth", "bison", "black", "blade",
  "blame", "blank", "blast", "blaze", "blend", "bless", "blind", "blink", "block", "blogs",
  "blond", "blood", "bloom", "blown", "blows", "board", "boast", "boats", "bonus", "books",
  "boost", "booth", "boots", "bound", "bowls", "boxes", "brain", "brake", "brand", "brass",
  "brave", "bread", "break", "breed", "brick", "bride", "brief", "bring", "broad", "broom",
  "brown", "brush", "build", "built", "bunch", "burns", "burnt", "buses", "buyer",

  // C
  "cabin", "cable", "cakes", "calls", "camel", "camps", "canal", "candy", "cards", "cargo",
  "carry", "catch", "cause", "cease", "cells", "chain", "chair", "chalk", "champ", "chant",
  "chaos", "charm", "chart", "chase", "cheap", "cheat", "check", "cheek", "cheer", "chess",
  "chest", "chick", "chief", "child", "chili", "chill", "chips", "chord", "chore", "cigar",
  "cinch", "civic", "civil", "claim", "claps", "class", "clean", "clear", "clerk", "click",
  "cliff", "climb", "cloak", "clock", "close", "cloth", "cloud", "clove", "clown", "clubs",
  "coach", "coast", "cocoa", "coins", "color", "comet", "comic", "coral", "corps", "couch",
  "cough", "could", "count", "court", "cover", "crack", "craft", "crane", "crash", "crate",
  "crawl", "crazy", "cream", "creek", "creep", "crime", "crisp", "cross", "crowd", "crown",
  "crude", "cruel", "crush", "crust", "curry", "curve", "cycle",

  // D
  "daily", "dairy", "daisy", "dance", "dated", "dates", "deals", "dealt", "death", "debug",
  "debut", "decay", "decor", "delay", "delta", "dense", "depth", "derby", "desks", "deter",
  "devil", "diary", "digit", "diner", "dirty", "disco", "discs", "disks", "ditch", "diver",
  "dizzy", "dodge", "doing", "donor", "doors", "doubt", "dough", "draft", "drain", "drama",
  "drank", "drawn", "draws", "dream", "dress", "dried", "drift", "drill", "drink", "drive",
  "drops", "drove", "drown", "drugs", "drums", "drunk", "dryer", "ducks", "dusty", "dying",

  // E
  "eager", "eagle", "early", "earth", "eaten", "edges", "eight", "elbow", "elder", "elect",
  "elite", "email", "empty", "enemy", "enjoy", "enter", "entry", "equal", "equip", "erase",
  "error", "essay", "event", "every", "exact", "exams", "excel", "exile", "exist", "exits",
  "extra",

  // F
  "fable", "faced", "faces", "facts", "faint", "fairy", "faith", "falls", "false", "fame",
  "fancy", "farms", "fatal", "fault", "favor", "fears", "feast", "feeds", "feels", "fever",
  "fewer", "fiber", "field", "fiery", "fifth", "fifty", "fight", "files", "films", "final",
  "finds", "fined", "fines", "fired", "fires", "firms", "first", "fishy", "fixed", "fixes",
  "flags", "flame", "flash", "flask", "flats", "fleet", "flesh", "flies", "float", "flock",
  "flood", "floor", "flour", "flows", "fluid", "flush", "flute", "focus", "folks", "force",
  "forge", "forms", "forth", "forty", "forum", "found", "frame", "fraud", "fresh", "fried",
  "fries", "front", "frost", "fruit", "fuels", "fully", "funds", "funny",

  // G
  "gamer", "games", "gates", "gauge", "gears", "genes", "genre", "ghost", "giant", "gifts",
  "girls", "given", "giver", "gives", "glass", "globe", "glory", "glove", "glows", "goals",
  "goats", "going", "goods", "grace", "grade", "grain", "grand", "grant", "grape", "graph",
  "grasp", "grass", "grave", "gravy", "great", "greed", "green", "greet", "grief", "grill",
  "grind", "grips", "groan", "groom", "group", "grove", "grown", "grows", "guard", "guess",
  "guest", "guide", "guild", "guilt",

  // H
  "habit", "hairs", "hands", "handy", "happy", "harsh", "haste", "hasty", "hatch", "hated",
  "hater", "hates", "haven", "hawks", "heads", "heard", "hears", "heart", "heavy", "hedge",
  "heels", "hello", "helps", "herbs", "hides", "highs", "hills", "hints", "hired", "hires",
  "hobby", "holds", "holes", "holly", "homes", "honey", "honor", "hooks", "hoped", "hopes",
  "horns", "horse", "hosts", "hotel", "hound", "hours", "house", "hover", "human", "humor",
  "hurry", "hurts",

  // I
  "icons", "ideal", "ideas", "idiot", "image", "imply", "inbox", "incur", "index", "india",
  "inner", "input", "intro", "irony", "issue", "items", "ivory",

  // J
  "jeans", "jelly", "jewel", "joins", "joint", "jokes", "judge", "juice", "juicy", "jumbo",
  "jumps", "jumpy",

  // K
  "karma", "keeps", "kicks", "kills", "kilos", "kinds", "kings", "kiosk", "kites", "knees",
  "knelt", "knife", "knock", "knots", "known", "knows",

  // L
  "label", "labor", "lacks", "lakes", "lamps", "lands", "lanes", "large", "laser", "lasts",
  "later", "laugh", "layer", "leads", "leaks", "learn", "lease", "least", "leave", "legal",
  "lemon", "level", "lever", "light", "liked", "likes", "limit", "lined", "lines", "links",
  "lions", "lists", "lived", "liver", "lives", "loads", "loans", "lobby", "local", "locks",
  "lodge", "logic", "login", "logos", "looks", "loose", "lords", "lorry", "loser", "loses",
  "lotus", "loved", "lover", "loves", "lower", "loyal", "lucky", "lumps", "lunch", "lungs",

  // M
  "macro", "magic", "maids", "mails", "major", "maker", "makes", "mango", "mania", "manor",
  "maple", "march", "marks", "marry", "marsh", "masks", "match", "mates", "maths", "maxim",
  "maybe", "mayor", "meals", "means", "meant", "meats", "medal", "media", "medic", "meets",
  "melon", "melts", "menus", "mercy", "merge", "merit", "merry", "metal", "meter", "micro",
  "might", "miles", "milky", "minds", "mined", "miner", "mines", "minor", "mints", "minus",
  "mixed", "mixer", "mixes", "modal", "model", "modem", "modes", "moist", "money", "monks",
  "month", "moods", "moody", "moral", "motor", "mount", "mouse", "mouth", "moved", "mover",
  "moves", "movie", "muddy", "multi", "music", "muted",

  // N
  "nails", "named", "names", "nasal", "nasty", "naval", "needs", "needy", "nerve", "never",
  "newer", "newly", "nexus", "nicer", "niche", "niece", "night", "ninth", "noble", "noise",
  "noisy", "norms", "north", "nosed", "noses", "notch", "noted", "notes", "novel", "nurse",
  "nutty",

  // O
  "oasis", "ocean", "offer", "often", "oiled", "older", "olive", "onion", "onset", "opens",
  "opera", "opted", "optic", "orbit", "order", "organ", "other", "ought", "ounce", "outer",
  "outdo", "owned", "owner", "oxide",

  // P
  "paced", "paces", "packs", "pages", "pains", "paint", "pairs", "palms", "panel", "panic",
  "paper", "parks", "parts", "party", "pasta", "paste", "patch", "paths", "pause", "peace",
  "peach", "peaks", "pearl", "peers", "penal", "penny", "phase", "phone", "photo", "piano",
  "picks", "piece", "pills", "pilot", "pinch", "pinks", "pipes", "pitch", "pivot", "pixel",
  "pizza", "place", "plain", "plane", "plans", "plant", "plate", "plays", "plaza", "plead",
  "plots", "plugs", "poems", "poets", "point", "polar", "poles", "polls", "pools", "poppy",
  "porch", "ports", "posed", "poses", "power", "prank", "prays", "press", "price", "pride",
  "prime", "print", "prior", "prize", "probe", "prone", "proof", "props", "prose", "proud",
  "prove", "pulse", "pumps", "punch", "pupil", "puppy", "puree", "purse",

  // Q
  "queen", "query", "quest", "queue", "quick", "quiet", "quilt", "quite", "quote",

  // R
  "radar", "radio", "rails", "rains", "rainy", "raise", "rally", "ranch", "range", "rapid",
  "rated", "rates", "ratio", "reach", "react", "reads", "ready", "realm", "rebel", "refer",
  "relax", "relay", "remix", "renew", "repay", "reply", "reset", "rests", "rhyme", "rider",
  "rides", "ridge", "rifle", "right", "rigid", "rings", "rinse", "riots", "risen", "riser",
  "rises", "risks", "risky", "rival", "river", "roads", "roast", "robot", "rocks", "rocky",
  "roles", "rolls", "roman", "roofs", "rooms", "roots", "ropes", "roses", "rough", "round",
  "route", "rover", "royal", "rules", "ruler", "rumor", "rupee", "rural", "rusty",

  // S
  "sadly", "safer", "safes", "salad", "sales", "salon", "salsa", "salty", "sands", "sandy",
  "saree", "sauce", "sauna", "saved", "saver", "saves", "scale", "scalp", "scams", "scare",
  "scarf", "scary", "scene", "scent", "school", "scope", "score", "scout", "scrap", "screw",
  "seats", "seeds", "seeks", "seems", "seize", "sells", "sends", "sense", "serve", "setup",
  "seven", "shade", "shake", "shall", "shame", "shape", "share", "shark", "sharp", "sheep",
  "sheet", "shelf", "shell", "shift", "shine", "shiny", "ships", "shirt", "shock", "shoes",
  "shook", "shoot", "shops", "shore", "short", "shots", "shout", "shown", "shows", "sides",
  "sight", "sigma", "signs", "silky", "silly", "since", "sinks", "sites", "sixth", "sixty",
  "sized", "sizes", "skate", "skill", "skins", "skirt", "skull", "slate", "slave", "sleep",
  "slept", "slice", "slide", "slims", "slope", "slots", "slows", "small", "smart", "smell",
  "smile", "smoke", "snack", "snake", "snaps", "socks", "solar", "solid", "solve", "songs",
  "sonic", "sorry", "sorts", "souls", "sound", "soups", "south", "space", "spade", "spark",
  "speak", "speed", "spell", "spend", "spent", "spice", "spicy", "spies", "spill", "spine",
  "spite", "split", "spoil", "spoke", "spoon", "sport", "spots", "spray", "squad", "stack",
  "staff", "stage", "stain", "stair", "stake", "stale", "stamp", "stand", "stare", "stars",
  "start", "state", "stats", "stays", "steak", "steal", "steam", "steel", "steep", "steer",
  "stems", "steps", "stick", "stiff", "still", "stock", "stole", "stone", "stood", "stool",
  "stops", "store", "storm", "story", "stove", "strap", "straw", "strip", "stuck", "study",
  "stuff", "style", "sugar", "suite", "suits", "sunny", "super", "surge", "swans", "swear",
  "sweat", "sweep", "sweet", "swept", "swift", "swims", "swing", "sword", "syrup",

  // T
  "table", "taken", "takes", "tales", "talks", "taste", "tasty", "taxes", "teach", "teams",
  "tears", "teeth", "tempo", "tends", "tenth", "terms", "tests", "texas", "texts", "thank",
  "theft", "their", "theme", "there", "these", "thick", "thief", "thigh", "thing", "think",
  "third", "those", "three", "threw", "throw", "thumb", "tiger", "tight", "tiles", "timer",
  "times", "tired", "tires", "title", "toast", "today", "token", "tombs", "toned", "tones",
  "tools", "tooth", "topic", "torch", "total", "touch", "tough", "tours", "towel", "tower",
  "towns", "toxic", "trace", "track", "tract", "trade", "trail", "train", "trait", "tramp",
  "traps", "trash", "treat", "trees", "trend", "trial", "tribe", "trick", "tried", "tries",
  "trips", "troop", "truck", "truly", "trunk", "trust", "truth", "tubes", "tulip", "tumor",
  "tuned", "tunes", "turbo", "turns", "tutor", "twice", "twins", "twist", "types", "tyres",

  // U
  "ultra", "uncle", "under", "unify", "union", "unite", "units", "unity", "untie", "until",
  "upper", "upset", "urban", "urged", "usage", "users", "using", "usual",

  // V
  "vague", "valid", "value", "valve", "vapor", "vegan", "veins", "venue", "verbs", "verse",
  "video", "views", "villa", "viral", "virus", "visit", "visor", "vista", "vital", "vivid",
  "vocal", "voice", "volts", "voted", "voter", "votes",

  // W
  "wages", "wagon", "waist", "waits", "walks", "walls", "wants", "warns", "waste", "watch",
  "water", "waved", "waves", "wears", "weary", "weeks", "weigh", "weird", "whale", "wheat",
  "wheel", "where", "which", "while", "white", "whole", "whose", "wider", "widow", "width",
  "winds", "windy", "wines", "wings", "wiped", "wipes", "wired", "wires", "witch", "wives",
  "woman", "women", "woods", "words", "works", "world", "worms", "worry", "worse", "worst",
  "worth", "would", "wound", "wraps", "wreck", "wrist", "write", "wrong", "wrote",

  // Y
  "yacht", "yards", "years", "yeast", "yield", "young", "yours", "youth",

  // Z
  "zebra", "zeros", "zones"
];

// Pre-index valid words into a high-performance Set
const validWordsSet = new Set();

function registerWord(word) {
  if (!word || typeof word !== 'string') return;
  const cleaned = word.trim().toLowerCase();
  if (cleaned.length === 5 && /^[a-z]{5}$/.test(cleaned)) {
    validWordsSet.add(cleaned);
  }
}

// 1. Ingest practical common vocabulary
for (let i = 0; i < practicalCommonWords.length; i++) {
  registerWord(practicalCommonWords[i]);
}

// 2. Ingest words from wordsList.words & meanings
if (Array.isArray(wordsList.words)) {
  for (let i = 0; i < wordsList.words.length; i++) {
    registerWord(wordsList.words[i]);
  }
}

if (wordsList.meanings && typeof wordsList.meanings === 'object') {
  for (const key of Object.keys(wordsList.meanings)) {
    registerWord(key);
  }
}

if (wordsList.meanings_extra && typeof wordsList.meanings_extra === 'object') {
  for (const key of Object.keys(wordsList.meanings_extra)) {
    registerWord(key);
  }
}

/**
 * Instant in-memory validation for common 5-letter English words.
 * Returns true if word is recognized as a valid playable word.
 * Runs in O(1) time (< 0.01ms).
 */
export function isValidWord(word) {
  if (!word || word.length !== 5) return false;
  const lower = word.toLowerCase();
  return validWordsSet.has(lower);
}

/**
 * Calculates letter status in a single pass without extra allocations.
 * Returns Array of 5 statuses: 'correct' | 'present' | 'absent'.
 */
export function computeWordStatuses(guessUpper, targetUpper) {
  const guess = guessUpper.split('');
  const target = targetUpper.split('');
  const statuses = ['absent', 'absent', 'absent', 'absent', 'absent'];
  const targetUsed = [false, false, false, false, false];

  // Pass 1: Exact matches (green / correct)
  for (let i = 0; i < 5; i++) {
    if (guess[i] === target[i]) {
      statuses[i] = 'correct';
      targetUsed[i] = true;
    }
  }

  // Pass 2: Misplaced matches (yellow / present)
  for (let i = 0; i < 5; i++) {
    if (statuses[i] === 'correct') continue;
    for (let j = 0; j < 5; j++) {
      if (!targetUsed[j] && guess[i] === target[j]) {
        statuses[i] = 'present';
        targetUsed[j] = true;
        break;
      }
    }
  }

  return statuses;
}

/**
 * Gets a random 5-letter puzzle target word and definition from words.json.
 */
export function getRandomTargetWord() {
  const words = (wordsList.words || []).filter(w => (w || '').length === 5);
  const randomWord = words[Math.floor(Math.random() * words.length)].toUpperCase();
  const lower = randomWord.toLowerCase();
  const meaning = (wordsList.meanings?.[lower]) || (wordsList.meanings_extra?.[lower]) || 'A special 5-letter English word';

  return {
    word: randomWord,
    meaning: meaning
  };
}
