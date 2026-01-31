import OneSignal from "react-onesignal";

export const loginOneSignal = async (id: string) => {
  try {
    await OneSignal.login(id);
    return true;
  } catch (error) {
    console.error("Failed to login onesignal:", error);
    return false;
  }
};

export const logoutOneSignal = async () => {
  try {
    await OneSignal.logout();
    return true;
  } catch (error) {
    console.error("Failed to logout onesignal:", error);
    return false;
  }
};
