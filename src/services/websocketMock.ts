import { Token, MarketUpdate } from '@/types';

type Listener = (data: MarketUpdate[]) => void;

class WebSocketMock {
    private listeners: Listener[] = [];
    private intervalId: NodeJS.Timeout | null = null;
    private tokens: Token[] = [];

    constructor() {
        // Initialize with some dummy data if needed, or wait for setTokens
    }

    setTokens(tokens: Token[]) {
        this.tokens = tokens;
    }

    connect() {
        if (this.intervalId) return;

        this.intervalId = setInterval(() => {
            this.emitUpdates();
        }, 2000); // Update every 2 seconds
    }

    disconnect() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    subscribe(listener: Listener) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter((l) => l !== listener);
        };
    }

    private emitUpdates() {
        if (this.tokens.length === 0) return;

        const updates: MarketUpdate[] = [];
        const numUpdates = Math.floor(Math.random() * 3) + 1; // Update 1-3 tokens at a time

        for (let i = 0; i < numUpdates; i++) {
            const randomIndex = Math.floor(Math.random() * this.tokens.length);
            const token = this.tokens[randomIndex];

            // Simulate price change (-5% to +5%)
            const changePercent = (Math.random() * 10) - 5;
            const newPrice = token.price * (1 + changePercent / 100);

            updates.push({
                tokenId: token.id,
                price: newPrice,
                priceChange24h: token.priceChange24h + changePercent, // Simplified accumulation
            });
        }

        this.listeners.forEach((listener) => listener(updates));
    }
}

export const webSocketService = new WebSocketMock();
