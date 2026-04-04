"use client";

import React from "react";
import { ConnectButton } from "thirdweb/react";
import { client } from "@/lib/thirdwebClient";

export default function ConnectButtonWrapper() {
    return <ConnectButton client={client} />;
}
