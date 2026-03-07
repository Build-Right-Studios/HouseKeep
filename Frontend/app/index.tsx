// import { useEffect } from "react";
// import { Text, View } from "react-native";
// import { router } from "expo-router";

// export default function Index() {

//   useEffect(() => {
//     router.replace("/welcome");
//   }, []);

//   return (
//     <View />
//   );
// }

import { Redirect } from "expo-router";

export default function Index() {
  return <Redirect href="/welcome" />;
}