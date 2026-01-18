export interface Token {
    id: string;
    symbol: string;
    name: string;
    address: string;
    logoUrl: string;
    price: number;
    priceChange24h: number;
    volume24h: number;
    marketCap: number;
    liquidity: number;
    holders: number;
    txns: number;
    audit: string;
    createdAt: string; // ISO string
    status: 'new' | 'final_stretch' | 'migrated';
    contractId: string; // e.g., "3zqm...pump"
    userCount: number; // Social users count
    chartCount: number; // Chart views count
    badges: {
        value: number; // percentage value
        color: 'red' | 'green'; // red for negative, green for positive
    }[];
    protocol: string; // e.g., "Pump", "Mayhem", "Raydium"
    quoteToken: string; // e.g., "SOL", "USDC", "USDT"
}

export interface MarketUpdate {
    tokenId: string;
    price: number;
    priceChange24h: number;
}

export interface WebSocketMessage {
    type: 'update' | 'initial';
    data: MarketUpdate[] | Token[];
}

// Sort types
export type SortField = 'marketCap' | 'volume' | 'liquidity' | 'time' | 'price' | 'holders';
export type SortDirection = 'asc' | 'desc';
export type ColumnType = 'new' | 'final_stretch' | 'migrated';
