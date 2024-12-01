import { CognitoIdentityProvider } from "@aws-sdk/client-cognito-identity-provider";

const cognitoClient = new CognitoIdentityProvider({
  region: process.env.NEXT_PUBLIC_AWS_REGION,
});

export const signInWithGoogle = async () => {
  try {
    // Cognito 호스팅 UI로 리다이렉트
    const domain = `${process.env.NEXT_PUBLIC_COGNITO_DOMAIN}.auth.${process.env.NEXT_PUBLIC_AWS_REGION}.amazoncognito.com`;
    const clientId = process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID;
    const redirectUri =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/auth/callback"
        : "https://d1gop06qpjqrbi.cloudfront.net/auth/callback";

    const loginUrl =
      `https://${domain}/oauth2/authorize?` +
      `client_id=${clientId}&` +
      `response_type=code&` +
      `scope=email+openid+profile&` +
      `redirect_uri=${encodeURIComponent(redirectUri)}&` +
      `identity_provider=Google`;

    window.location.href = loginUrl;
  } catch (error) {
    console.error("Google sign in error:", error);
    throw error;
  }
};

export const handleCallback = async (code: string) => {
  try {
    const result = await cognitoClient.initiateAuth({
      AuthFlow: "USER_PASSWORD_AUTH",
      ClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID!,
      AuthParameters: {
        CODE: code,
      },
    });
    return result.AuthenticationResult;
  } catch (error) {
    console.error("Auth callback error:", error);
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    return await Auth.currentAuthenticatedUser();
  } catch (error) {
    return null;
  }
};

export const signOut = async () => {
  try {
    await Auth.signOut();
  } catch (error) {
    console.error("Sign out error:", error);
    throw error;
  }
};
