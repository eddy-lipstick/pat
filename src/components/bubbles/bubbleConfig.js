// bubbleConfig.js
export const BUBBLE_CONFIG = {
    // Base positions - control the overall radius of each bubble from center
    radiusMap: {
        "Politici": 380,
        "Toezichthouders": 420,
        "Rechters en arbiters": 440,
        "Investeerders": 360,
        "Bestuur": 320,
        "Klanten": 340,
        "Sales team": 300,
        "Collega's": 380,
        "Algemene publiek": 400,
    },

    // Individual size adjustments
    sizeMap: {
        "Politici": 100,
        "Toezichthouders": 120,
        "Rechters en arbiters": 130,
        "Investeerders": 110,
        "Bestuur": 100,
        "Klanten": 100,
        "Sales team": 100,
        "Collega's": 110,
        "Algemene publiek": 120,
    },

    // Fine-tune individual bubble positions with offsets
    offsetMap: {
        "Politici": { x: 0, y: 0 },
        "Toezichthouders": { x: 20, y: -30 },
        "Rechters en arbiters": { x: -20, y: 20 },
        "Investeerders": { x: 0, y: 40 },
        "Bestuur": { x: -30, y: 0 },
        "Klanten": { x: 40, y: -20 },
        "Sales team": { x: 20, y: 30 },
        "Collega's": { x: -40, y: -20 },
        "Algemene publiek": { x: 30, y: 40 },
    },

    // Customize the angle of each bubble (in radians)
    angleMap: {
        "Politici": 0.2,
        "Toezichthouders": 0.8,
        "Rechters en arbiters": 1.5,
        "Investeerders": 2.2,
        "Bestuur": 2.8,
        "Klanten": 3.5,
        "Sales team": 4.2,
        "Collega's": 4.8,
        "Algemene publiek": 5.5,
    },

    // Global settings
    defaults: {
        size: 100,
        radius: 350,
        subBubbleRadius: 120,
        subBubbleSize: 75,
    },
};