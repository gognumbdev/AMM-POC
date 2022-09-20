const getCalculationFromX = (x: number, depX: number, y: number, k: number) => {
    // Calculate variables from amount of A (amount to deposits) as a initlial variable
    // (x+depX)(y-swapY) = k
    let newY = k / (x + depX);
    let swapY = y - newY;
    return { newY, swapY };
};

const getCalculationFromY = (
    x: number,
    y: number,
    swapY: number,
    k: number
) => {
    // Calculate variables from amount of B (amount to swap) as a initlial variable
    // (x+depX)(y-swapY) = k
    let newX = k / (y - swapY);
    let depX = newX - x;
    return { newX, depX };
};

const getExchangeRate = (newX: number, newY: number) => {
    return newX / newY;
};

export { getCalculationFromX, getCalculationFromY, getExchangeRate };
