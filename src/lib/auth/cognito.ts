import { CognitoIdentityProvider } from "@aws-sdk/client-cognito-identity-provider";

const cognitoClient = new CognitoIdentityProvider({
  region: process.env.NEXT_PUBLIC_AWS_REGION,
});

const COGNITO_DOMAIN = process.env.NEXT_PUBLIC_COGNITO_DOMAIN!;
const AWS_REGION = process.env.NEXT_PUBLIC_AWS_REGION!;
const CLIENT_ID = process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID!;
const CLIENT_SECRET = process.env.NEXT_PUBLIC_COGNITO_CLIENT_SECRET!;
const REDIRECT_URI =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/auth/callback"
    : "https://petiary.link/auth/callback";

export const signInWithGoogle = async () => {
  try {
    const clientId = process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID;
    const redirectUri =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/auth/callback"
        : "https://petiary.link/auth/callback";

    const loginUrl =
      `https://ap-northeast-2vei2svb4o.auth.ap-northeast-2.amazoncognito.com/oauth2/authorize?` +
      `client_id=${clientId}&` +
      `response_type=code&` +
      `scope=phone+email+openid+profile+aws.cognito.signin.user.admin&` +
      `redirect_uri=${encodeURIComponent(redirectUri)}&` +
      `identity_provider=Google`;

    if (typeof window !== "undefined") {
      window.open(loginUrl, "_blank", "noopener,noreferrer");
    }
  } catch (error) {
    console.error("Google sign in error:", error);
    throw error;
  }
};

export const handleCallback = async (code: string) => {
  try {
    const domain =
      "ap-northeast-2vei2svb4o.auth.ap-northeast-2.amazoncognito.com";
    const clientId = process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID!;
    const clientSecret = process.env.NEXT_PUBLIC_COGNITO_CLIENT_SECRET!;
    const redirectUri =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/auth/callback"
        : "https://petiary.link/auth/callback";

    const tokenEndpoint = `https://${domain}/oauth2/token`;
    const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString(
      "base64"
    );

    const params = new URLSearchParams({
      grant_type: "authorization_code",
      client_id: clientId,
      code: code,
      redirect_uri: redirectUri,
    });

    const response = await fetch(tokenEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${credentials}`,
      },
      body: params,
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Token exchange error:", errorData);
      throw new Error(errorData.error || "Token exchange failed");
    }

    const tokens = await response.json();

    if (tokens.access_token) {
      localStorage.setItem("accessToken", tokens.access_token);

      // 사용자 정보 가져오기
      const userInfoEndpoint = `https://${domain}/oauth2/userInfo`;
      const userInfoResponse = await fetch(userInfoEndpoint, {
        headers: {
          Authorization: `Bearer ${tokens.access_token}`,
        },
      });

      const userInfo = await userInfoResponse.json();
      console.log("User info:", userInfo);
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
    }

    return tokens;
  } catch (error) {
    console.error("Auth callback error:", error);
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    const result = await cognitoClient.getUser({
      AccessToken: localStorage.getItem("accessToken") || "",
    });
    return result;
  } catch (error) {
    return null;
  }
};

export const signOut = async () => {
  try {
    localStorage.removeItem("accessToken");
    const domain = `${process.env.NEXT_PUBLIC_COGNITO_DOMAIN}.auth.${process.env.NEXT_PUBLIC_AWS_REGION}.amazoncognito.com`;
    const clientId = process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID;
    const logoutUrl = `https://${domain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(
      window.location.origin
    )}`;
    window.location.href = logoutUrl;
  } catch (error) {
    console.error("Sign out error:", error);
    throw error;
  }
};
