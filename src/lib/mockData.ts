import { Token } from '@/types';

// Helper to generate random contract IDs
const generateContractId = (prefix: string) => `${prefix.slice(0, 4)}...pump`;

// Helper to generate random badge values
const randomBadge = () => ({
    value: Math.floor(Math.random() * 90), // 0-90%
    color: (Math.random() > 0.6 ? 'green' : 'red') as 'green' | 'red'
});

const randomBadges = () => [
    randomBadge(),
    randomBadge(),
    randomBadge(),
    randomBadge(),
    randomBadge()
];

const tokenNames = [
    { symbol: "SUNNY", name: "SunnySide Coin", bg: "F9A8D4" },
    { symbol: "NOVA", name: "Nova Burst AI", bg: "A5B4FC" },
    { symbol: "SOLX", name: "SolX Fusion", bg: "7DD3FC" },
    { symbol: "PIXEL", name: "Pixel Legends", bg: "FDE68A" },
    { symbol: "SLOTH", name: "Solana Sloth", bg: "FCA5A5" },
    { symbol: "SPRK", name: "Spark Reactor", bg: "FDBA74" },
    { symbol: "MOONI", name: "Mooni Cat", bg: "6EE7B7" },
    { symbol: "SHELL", name: "Shell Protocol", bg: "C4B5FD" },
    { symbol: "GHOST", name: "GhostChain", bg: "FBCFE8" },
    { symbol: "SOLPY", name: "Sol Python", bg: "99F6E4" },
    { symbol: "ALGAE", name: "Algae Finance", bg: "86EFAC" },
    { symbol: "SWORD", name: "Sword of Sol", bg: "F9A8D4" },
    { symbol: "DRGNS", name: "Dragon Sol", bg: "FDBA74" },
    { symbol: "WAVE", name: "WaveRunner", bg: "7DD3FC" },
    { symbol: "ELEV", name: "ElevateAI", bg: "C7D2FE" },
    { symbol: "PLUTO", name: "PlutoVerse", bg: "FECACA" },
    { symbol: "HONEY", name: "HoneyBee Swap", bg: "FDE047" },
    { symbol: "RUNE", name: "Rune Knight", bg: "D8B4FE" },
    { symbol: "SOLB", name: "Solana Bear", bg: "FCA5A5" },
    { symbol: "NEON", name: "Neon Protocol", bg: "34D399" },
    { symbol: "SWARM", name: "Sol Swarm", bg: "F9A8D4" },
    { symbol: "TANGO", name: "Tango Coin", bg: "FDBA74" },
    { symbol: "BYTE", name: "ByteBuddies", bg: "A7F3D0" },
    { symbol: "CLOUD", name: "CloudRunner", bg: "93C5FD" },
    { symbol: "SNYX", name: "Snyx AI", bg: "FECACA" },
    { symbol: "KNITE", name: "Knight Protocol", bg: "DDD6FE" },
    { symbol: "OWL", name: "Night Owl", bg: "BAE6FD" },
    { symbol: "MINTY", name: "Minty Fresh", bg: "6EE7B7" },
    { symbol: "NUTS", name: "Nutty Squirrel", bg: "FDE68A" },
    { symbol: "SLICK", name: "Slick Memecoin", bg: "FBCFE8" },
];

/**
 * Generates a mock Token object with randomized data based on the provided parameters.
 *
 * @param id - The unique identifier for the token.
 * @param status - The status of the token, which can be 'new', 'final_stretch', or 'migrated'.
 * @param baseTime - The base time in milliseconds used to calculate the token's creation date.
 * @returns A Token object populated with mock data, including randomized price, volume, market cap, liquidity, holders, and other properties.
 */
const generateToken = (id: number, status: 'new' | 'final_stretch' | 'migrated', baseTime: number): Token => {
    const tokenInfo = tokenNames[id % tokenNames.length];
    const isNew = status === 'new';
    const isFinal = status === 'final_stretch';

    // Random protocol and quote token assignment
    const protocols = ['Pump', 'Mayhem', 'Bonk', 'Raydium', 'Moonshot', 'Orca', 'Jupiter Studio', 'Meteora AMM', 'Daos.fun', 'LaunchLab'];
    const quoteTokens = ['SOL', 'USDC', 'USDT'];

    return {
        id: id.toString(),
        symbol: tokenInfo.symbol,
        name: tokenInfo.name,
        address: generateContractId(tokenInfo.symbol + Math.random().toString(36).substring(7)),
        price: isNew ? Math.random() * 0.1 : (isFinal ? Math.random() * 15 + 0.5 : Math.random() * 50 + 1),
        priceChange24h: Math.floor(Math.random() * 80),
        volume24h: isNew ? Math.floor(Math.random() * 5000) : (isFinal ? Math.floor(Math.random() * 500000) + 50000 : Math.floor(Math.random() * 800000) + 100000),
        marketCap: isNew ? Math.floor(Math.random() * 10000) + 2000 : (isFinal ? Math.floor(Math.random() * 600000) + 30000 : Math.floor(Math.random() * 200000) + 30000),
        liquidity: isNew ? Math.floor(Math.random() * 8000) + 2000 : (isFinal ? Math.floor(Math.random() * 500000) + 30000 : Math.floor(Math.random() * 150000) + 30000),
        holders: isNew ? Math.floor(Math.random() * 20) : (isFinal ? Math.floor(Math.random() * 600) + 100 : Math.floor(Math.random() * 1000) + 200),
        createdAt: new Date(Date.now() - baseTime).toISOString(),
        logoUrl: `https://ui-avatars.com/api/?name=${tokenInfo.symbol}&background=${tokenInfo.bg}`,
        status,
        txns: isNew ? Math.floor(Math.random() * 50) + 1 : (isFinal ? Math.floor(Math.random() * 6000) + 500 : Math.floor(Math.random() * 10000) + 1000),
        audit: 'passed',
        contractId: generateContractId(tokenInfo.symbol),
        userCount: isNew ? Math.floor(Math.random() * 15) : (isFinal ? Math.floor(Math.random() * 100) + 10 : Math.floor(Math.random() * 300) + 20),
        chartCount: isNew ? Math.floor(Math.random() * 5) : (isFinal ? Math.floor(Math.random() * 150) + 10 : Math.floor(Math.random() * 1000) + 50),
        badges: randomBadges(),
        protocol: protocols[Math.floor(Math.random() * protocols.length)],
        quoteToken: quoteTokens[Math.floor(Math.random() * quoteTokens.length)]
    };
};

// Generate 56 tokens (show only 10-12 per column after filtering)
export const MOCK_TOKENS: Token[] = [
    // New Pairs (20 tokens)
    ...Array.from({ length: 20 }, (_, i) => generateToken(i, 'new', (i + 1) * 5000 + Math.random() * 10000)),

    // Final Stretch (18 tokens)
    ...Array.from({ length: 18 }, (_, i) => generateToken(i + 20, 'final_stretch', (i + 1) * 3600000 + Math.random() * 7200000)),

    // Migrated (18 tokens)
    ...Array.from({ length: 18 }, (_, i) => generateToken(i + 38, 'migrated', (i + 1) * 1800000 + Math.random() * 3600000))
];

const bnbTokenNames = [
    { symbol: "BUNNY", name: "Bunny Rampage", bg: "F9C74F" },
    { symbol: "ROCKET", name: "RocketBSC", bg: "F94144" },
    { symbol: "BSCX", name: "BSC-Xpress", bg: "90BE6D" },
    { symbol: "PANDA", name: "Panda Swap", bg: "577590" },
    { symbol: "MOONB", name: "MoonBiscuit", bg: "F9844A" },
    { symbol: "APEZ", name: "Apez Kingdom", bg: "4D908E" },
    { symbol: "ZILLA", name: "Zilla Protocol", bg: "F3722C" },
    { symbol: "SMASH", name: "Smash Token", bg: "43AA8B" },
    { symbol: "WHISK", name: "Whisker Inu", bg: "F9C74F" },
    { symbol: "BOLT", name: "ThunderBolt", bg: "577590" },
    { symbol: "PUPPY", name: "PuppyChain", bg: "FFC6FF" },
    { symbol: "BRICK", name: "BrickLayer", bg: "FF595E" },
    { symbol: "KOALA", name: "Koala Swap", bg: "DDDF00" },
    { symbol: "SUSHI2", name: "Sushi 2.0 BSC", bg: "F15BB5" },
    { symbol: "HAMMER", name: "HammerChain", bg: "00F5D4" },
    { symbol: "BSCBOT", name: "BSC Bot AI", bg: "9B5DE5" },
    { symbol: "CRAZY", name: "Crazy Frog BNB", bg: "00BBF9" },
    { symbol: "GOOSE", name: "Goose Protocol", bg: "FEE440" },
    { symbol: "FOXAI", name: "FoxAI BNB", bg: "283618" },
    { symbol: "MILK", name: "Milkshake Swap", bg: "F7B801" },
    { symbol: "MONK", name: "MonkChain", bg: "6A4C93" },
    { symbol: "BUFF", name: "BuffBull", bg: "F3722C" },
    { symbol: "BOLT2", name: "Bolt Unlimited", bg: "577590" },
    { symbol: "STORM", name: "StormShiba BNB", bg: "8ECAE6" },
    { symbol: "CHEEZ", name: "CheezBurgerSwap", bg: "FFCA3A" },
    { symbol: "BSCAPE", name: "BSC Ape Island", bg: "1982C4" },
    { symbol: "WOOL", name: "Wool Finance", bg: "FB5607" },
    { symbol: "VIBE", name: "VibeChain", bg: "FF006E" },
    { symbol: "GREML", name: "Gremlin BSC", bg: "C9ADA7" },
    { symbol: "CRUNCH", name: "CryptoCrunch", bg: "8AC926" },
];

/**
 * Generates a mock BNB token object with randomized properties for testing or demonstration purposes.
 *
 * @param id - The unique identifier for the token.
 * @param status - The status of the token, which can be 'new', 'final_stretch', or 'migrated'.
 * @param baseTime - The base time in milliseconds used to calculate the token's creation date.
 * @param offset - (Optional) An offset applied to the token index to ensure uniqueness across categories. Defaults to 0.
 * @returns A `Token` object populated with randomized and status-dependent mock data.
 */
const generateBNBToken = (id: number, status: 'new' | 'final_stretch' | 'migrated', baseTime: number, offset: number = 0): Token => {
    // Use offset to ensure different tokens for different categories
    const tokenInfo = bnbTokenNames[(id + offset) % bnbTokenNames.length];
    const isNew = status === 'new';
    const isFinal = status === 'final_stretch';

    // BNB specific protocols
    const protocols = ['PancakeSwap', 'BakerySwap', 'Biswap', 'ApeSwap', 'BabySwap'];
    const quoteTokens = ['WBNB', 'BUSD', 'USDT'];

    return {
        id: `bnb-${id}`,
        symbol: tokenInfo.symbol,
        name: tokenInfo.name,
        address: `0x${Math.random().toString(16).substring(2, 42)}`,
        price: isNew ? Math.random() * 0.01 : (isFinal ? Math.random() * 5 + 0.1 : Math.random() * 20 + 0.5),
        priceChange24h: Math.floor(Math.random() * 60),
        volume24h: isNew ? Math.floor(Math.random() * 3000) : (isFinal ? Math.floor(Math.random() * 300000) + 30000 : Math.floor(Math.random() * 500000) + 80000),
        marketCap: isNew ? Math.floor(Math.random() * 8000) + 1000 : (isFinal ? Math.floor(Math.random() * 400000) + 20000 : Math.floor(Math.random() * 150000) + 20000),
        liquidity: isNew ? Math.floor(Math.random() * 5000) + 1000 : (isFinal ? Math.floor(Math.random() * 300000) + 20000 : Math.floor(Math.random() * 100000) + 20000),
        holders: isNew ? Math.floor(Math.random() * 15) : (isFinal ? Math.floor(Math.random() * 400) + 50 : Math.floor(Math.random() * 800) + 100),
        createdAt: new Date(Date.now() - baseTime).toISOString(),
        logoUrl: `https://ui-avatars.com/api/?name=${tokenInfo.symbol}&background=${tokenInfo.bg}`,
        status,
        txns: isNew ? Math.floor(Math.random() * 40) + 1 : (isFinal ? Math.floor(Math.random() * 4000) + 300 : Math.floor(Math.random() * 8000) + 800),
        audit: 'passed',
        contractId: `0x${Math.random().toString(16).substring(2, 10)}...bsc`,
        userCount: isNew ? Math.floor(Math.random() * 10) : (isFinal ? Math.floor(Math.random() * 80) + 5 : Math.floor(Math.random() * 200) + 15),
        chartCount: isNew ? Math.floor(Math.random() * 3) : (isFinal ? Math.floor(Math.random() * 100) + 5 : Math.floor(Math.random() * 800) + 30),
        badges: randomBadges(),
        protocol: protocols[Math.floor(Math.random() * protocols.length)],
        quoteToken: quoteTokens[Math.floor(Math.random() * quoteTokens.length)]
    };
};

export const MOCK_TOKENS_BNB: Token[] = [
    // New Pairs (20 tokens) - Start from index 0
    ...Array.from({ length: 20 }, (_, i) => generateBNBToken(i, 'new', (i + 1) * 5000 + Math.random() * 10000, 0)),

    // Final Stretch (18 tokens) - Start from index 20
    ...Array.from({ length: 18 }, (_, i) => generateBNBToken(i + 20, 'final_stretch', (i + 1) * 3600000 + Math.random() * 7200000, 20)),

    // Migrated (18 tokens) - Start from index 38
    ...Array.from({ length: 18 }, (_, i) => generateBNBToken(i + 38, 'migrated', (i + 1) * 1800000 + Math.random() * 3600000, 38))
];

// Counters for generating new tokens dynamically
let solTokenCounter = 100;
let bnbTokenCounter = 100;

// Generate a new SOL token with current timestamp (0 elapsed time)
/**
 * Generates a new mock SOL token object with randomized properties for testing or demonstration purposes.
 *
 * The generated token includes randomized values for price, price change, volume, market cap, liquidity,
 * holders, transaction count, user count, chart count, and other relevant fields. The token's symbol and name
 * are selected from a predefined list, and additional attributes such as protocol and quote token are chosen
 * randomly from available options.
 *
 * @returns {Token} A newly generated mock SOL token object with unique and randomized attributes.
 */
export const generateNewSOLToken = (): Token => {
    const tokenInfo = tokenNames[solTokenCounter % tokenNames.length];
    const protocols = ['Pump', 'Mayhem', 'Bonk', 'Raydium', 'Moonshot', 'Orca', 'Jupiter Studio', 'Meteora AMM', 'Daos.fun', 'LaunchLab'];
    const quoteTokens = ['SOL', 'USDC', 'USDT'];

    const token: Token = {
        id: `new-sol-${solTokenCounter}`,
        symbol: tokenInfo.symbol,
        name: tokenInfo.name,
        address: generateContractId(tokenInfo.symbol + Math.random().toString(36).substring(7)),
        price: Math.random() * 0.1,
        priceChange24h: Math.floor(Math.random() * 80),
        volume24h: Math.floor(Math.random() * 5000),
        marketCap: Math.floor(Math.random() * 10000) + 2000,
        liquidity: Math.floor(Math.random() * 8000) + 2000,
        holders: Math.floor(Math.random() * 20),
        createdAt: new Date().toISOString(), // Current time = 0 elapsed seconds
        logoUrl: `https://ui-avatars.com/api/?name=${tokenInfo.symbol}&background=${tokenInfo.bg}`,
        status: 'new',
        txns: Math.floor(Math.random() * 50) + 1,
        audit: 'passed',
        contractId: generateContractId(tokenInfo.symbol),
        userCount: Math.floor(Math.random() * 15),
        chartCount: Math.floor(Math.random() * 5),
        badges: randomBadges(),
        protocol: protocols[Math.floor(Math.random() * protocols.length)],
        quoteToken: quoteTokens[Math.floor(Math.random() * quoteTokens.length)]
    };

    solTokenCounter++;
    return token;
};

// Generate a new BNB token with current timestamp (0 elapsed time)
/**
 * Generates a new mock BNB token object with randomized properties for testing or demonstration purposes.
 *
 * The generated token includes random values for price, price change, volume, market cap, liquidity, holders,
 * transaction count, user count, chart count, and other relevant fields. The token's symbol and name are selected
 * from a predefined list, and its protocol and quote token are chosen randomly from available options.
 *
 * @returns {Token} A new mock BNB token object with randomized attributes.
 */
export const generateNewBNBToken = (): Token => {
    const tokenInfo = bnbTokenNames[bnbTokenCounter % bnbTokenNames.length];
    const protocols = ['PancakeSwap', 'BakerySwap', 'Biswap', 'ApeSwap', 'BabySwap'];
    const quoteTokens = ['WBNB', 'BUSD', 'USDT'];

    const token: Token = {
        id: `new-bnb-${bnbTokenCounter}`,
        symbol: tokenInfo.symbol,
        name: tokenInfo.name,
        address: `0x${Math.random().toString(16).substring(2, 42)}`,
        price: Math.random() * 0.01,
        priceChange24h: Math.floor(Math.random() * 60),
        volume24h: Math.floor(Math.random() * 3000),
        marketCap: Math.floor(Math.random() * 8000) + 1000,
        liquidity: Math.floor(Math.random() * 5000) + 1000,
        holders: Math.floor(Math.random() * 15),
        createdAt: new Date().toISOString(), // Current time = 0 elapsed seconds
        logoUrl: `https://ui-avatars.com/api/?name=${tokenInfo.symbol}&background=${tokenInfo.bg}`,
        status: 'new',
        txns: Math.floor(Math.random() * 40) + 1,
        audit: 'passed',
        contractId: `0x${Math.random().toString(16).substring(2, 10)}...bsc`,
        userCount: Math.floor(Math.random() * 10),
        chartCount: Math.floor(Math.random() * 3),
        badges: randomBadges(),
        protocol: protocols[Math.floor(Math.random() * protocols.length)],
        quoteToken: quoteTokens[Math.floor(Math.random() * quoteTokens.length)]
    };

    bnbTokenCounter++;
    return token;
};

// Export function to update token data (for real-time updates)
/**
 * Updates the properties of a given token with simulated random changes.
 *
 * - `price` is adjusted by up to ±10%.
 * - `volume24h` is adjusted by up to ±20%.
 * - `txns` is incremented by a random integer between 0 and 4.
 * - `userCount` is adjusted by a random integer between -3 and +3, but not below 0.
 * - `chartCount` is adjusted by a random integer between -2 and +2, but not below 0.
 * - Each badge's `value` is adjusted by a random integer between -10 and +9, clamped between 0 and 90.
 * - Each badge's `color` has a 20% chance to toggle between 'red' and 'green'.
 *
 * @param token - The token object to update.
 * @returns A new token object with updated properties.
 */
export const updateTokenData = (token: Token): Token => {
    const priceChange = (Math.random() - 0.5) * 0.1; // ±10% change
    const volumeChange = (Math.random() - 0.5) * 0.2; // ±20% change

    return {
        ...token,
        price: Math.max(0.001, token.price * (1 + priceChange)),
        volume24h: Math.max(0, token.volume24h * (1 + volumeChange)),
        txns: token.txns + Math.floor(Math.random() * 5),
        userCount: Math.max(0, token.userCount + Math.floor(Math.random() * 7) - 3),
        chartCount: Math.max(0, token.chartCount + Math.floor(Math.random() * 5) - 2),
        badges: token.badges.map(badge => ({
            value: Math.min(90, Math.max(0, badge.value + Math.floor(Math.random() * 20) - 10)),
            color: (Math.random() > 0.8 ? (badge.color === 'red' ? 'green' : 'red') : badge.color) as 'green' | 'red'
        }))
    };
};
