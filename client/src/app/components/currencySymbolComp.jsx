import { useState } from "react";
import { FaEthereum } from "react-icons/fa";
import { SiBinance, SiTether } from "react-icons/si";

const currencies = [
    { value: "ETH", label: "ETH", icon: <FaEthereum className="inline mr-2 text-purple-400" /> },
    { value: "BNB", label: "BNB", icon: <SiBinance className="inline mr-2 text-yellow-400" /> },
    { value: "USDT", label: "USDT", icon: <SiTether className="inline mr-2 text-green-400" /> },
];

function currencySymbolComp({currency, setCurrency}) {
    const [open, setOpen] = useState(false);

    const selected = currencies.find((c) => c.value === currency);

    return (
        <div className="absolute right-2 top-3">
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="flex items-center bg-gray-900 text-white text-sm rounded px-2 py-1 border border-gray-700 focus:ring-white focus:border-white"
            >
                {selected.icon} {selected.label}
            </button>

            {open && (
                <div className="absolute right-0 mt-2 w-28 bg-gray-900 border border-gray-700 rounded-lg shadow-lg z-20">
                    {currencies.map((c) => (
                        <div
                            key={c.value}
                            onClick={() => {
                                setCurrency(c.value);
                                setOpen(false);
                            }}
                            className="flex items-center px-3 py-2 text-white text-sm hover:bg-gray-800 cursor-pointer"
                        >
                            {c.icon} {c.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default currencySymbolComp
