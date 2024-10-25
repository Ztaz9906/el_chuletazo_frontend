import GoogleButton from "@/components/auth/google/GoogleButton.jsx";
import GoogleButtonOneTap from "@/components/auth/google/GoogleButtonOneTap.jsx";
import { Box } from "@chakra-ui/react";
import { GoogleOAuthProvider } from "@react-oauth/google";

export default function CustomGoogleLogin({ useOneTap }) {
  return (
    <Box display={useOneTap ? "none" : "block"}>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        {useOneTap ? (
          <GoogleButtonOneTap useOneTap={useOneTap} />
        ) : (
          <GoogleButton />
        )}
      </GoogleOAuthProvider>
    </Box>
  );
}
