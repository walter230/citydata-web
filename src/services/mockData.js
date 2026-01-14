
// Helper to generate realistic random data for demo purposes

const CONGESTION_LEVELS = ['여유', '보통', '약간 붐빔', '붐빔'];
const CONGESTION_MESSAGES = {
    '여유': '사람이 적어 한적합니다.',
    '보통': '적당한 인구 밀도입니다.',
    '약간 붐빔': '사람이 다소 많습니다.',
    '붐빔': '매우 혼잡하니 주의하세요.'
};

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const generateMockData = (areaName) => {
    // Deterministic random based on areaName char code sum so it doesn't flicker on re-renders too wildly
    // Actually, improved: just random for now, we want it to look "live" if it refreshes

    const congestionLvl = CONGESTION_LEVELS[getRandomInt(0, 3)];
    const pplMin = getRandomInt(5000, 30000);
    const pplMax = pplMin + getRandomInt(500, 5000);

    // Generate random age distribution (rough approximation)
    let ageRates = [];
    let remaining = 100;
    for (let i = 0; i < 7; i++) {
        const rate = getRandomInt(5, remaining - 10);
        ageRates.push(rate);
        remaining -= rate;
    }
    ageRates.push(remaining); // Last one takes the rest

    const maleRate = getRandomInt(30, 70);
    const femaleRate = 100 - maleRate;

    const now = new Date();
    const timeString = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    return {
        AREA_NM: areaName,
        AREA_CONGEST_LVL: congestionLvl,
        AREA_CONGEST_MSG: CONGESTION_MESSAGES[congestionLvl],
        AREA_PPLTN_MIN: pplMin,
        AREA_PPLTN_MAX: pplMax,
        LIVE_PPLTN_STTS: `${pplMin.toLocaleString()} ~ ${pplMax.toLocaleString()}`,
        PPLTN_TIME: timeString,

        // Demographics
        PPLTN_RATE_0: ageRates[0],
        PPLTN_RATE_10: ageRates[1],
        PPLTN_RATE_20: ageRates[2],
        PPLTN_RATE_30: ageRates[3],
        PPLTN_RATE_40: ageRates[4],
        PPLTN_RATE_50: ageRates[5],
        PPLTN_RATE_60: ageRates[6],
        PPLTN_RATE_70: ageRates[7],

        // Consumption
        CMRCL_MALE_RATE: maleRate,
        CMRCL_FEMALE_RATE: femaleRate
    };
};
