import OneSignal from "react-onesignal";


export const loginOneSignal = async (id: string) => {
  await OneSignal.login(id);
}



export const logoutOneSignal = async () => {
  await OneSignal.logout()
}