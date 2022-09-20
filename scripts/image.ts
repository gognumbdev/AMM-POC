import USDC from "../public/image/USDC.png";
import ETH from "../public/image/ETH.png";
import DAI from "../public/image/DAI.png";

const getImageSrc = (asset: string) => {
    switch (asset) {
        case "USDC":
            return USDC;
        case "ETH":
            return ETH;
        case "DAI":
            return DAI;
        default:
            return "";
    }
};

export { getImageSrc };
