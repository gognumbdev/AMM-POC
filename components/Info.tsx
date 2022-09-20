import Image from "next/image";
import React from "react";
import USDC from "../public/image/USDC.png";
import ETH from "../public/image/ETH.png";
import DAI from "../public/image/DAI.png";

interface InfoProps {
    pool: string;
    assetA: string;
    assetB: string;
    setPool: (pool: string) => void;
}

const Info = ({ pool, assetA, assetB, setPool }: InfoProps) => {
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
    return (
        <div
            className="p-6 w-11/12 sm:w-10/12 md:w-8/12 lg:w-6/12 text-white bg-gradient-to-b 
        from-black via-neutral-900 to-neutral-800 shadow-gray-800 rounded-md shadow-lg "
        >
            <p className="text-base sm:text-lg md:text-xl lg:text-3xl font-bold">
                This is AMM MVP application to simulate how AMM works
            </p>
            <div className="flex text-sm sm:text-base md:text-lg lg:text-xl gap-4">
                <p>Now You are on the liquidity pool :</p>

                <div className="flex gap-2">
                    <Image
                        src={getImageSrc(assetA)}
                        width={30}
                        height={30}
                        objectFit="contain"
                    />
                    <Image
                        src={getImageSrc(assetB)}
                        width={30}
                        height={30}
                        objectFit="contain"
                    />
                    <p className="font-bold">{pool}</p>
                </div>
            </div>
        </div>
    );
};

export default Info;
