import { createNavigationContainerRef } from "@react-navigation/native";

export const navigationRef = createNavigationContainerRef();

export function navigate(name, params) {
  console.log("REF RUNNING;;;", navigationRef);
  // navigationRef.current?.navigate(name, params);
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}
