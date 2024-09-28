import { GoogleOAuthProvider } from "@react-oauth/google";
import { Box } from "@chakra-ui/react";
import GoogleButton from "@/components/auth/google/GoogleButton.jsx";
import GoogleButtonOneTap from "@/components/auth/google/GoogleButtonOneTap.jsx";

export default function CustomGoogleLogin({ useOneTap }) {
  return (
    <Box display={"block"}>
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
