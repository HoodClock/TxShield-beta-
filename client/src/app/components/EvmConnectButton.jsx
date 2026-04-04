"use client"

import { ConnectButton } from "thirdweb/react";
import { client } from "@/lib/thirdwebClient";

export default function EvmConnectButton() {
    return (
        <div className="rainbowkit-connect-wrapper">
            <ConnectButton client={client} />
        </div>
    )
}

