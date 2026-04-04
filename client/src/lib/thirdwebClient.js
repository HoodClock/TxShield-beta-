import { createThirdwebClient } from "thirdweb";

// Replace this with your client ID from the Thirdweb dashboard
const clientId = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID || "14b2d86fbe4c7003c401d43a6efad697";

export const client = createThirdwebClient({
  clientId: clientId,
});
