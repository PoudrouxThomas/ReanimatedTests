import { SharedValue } from "react-native-reanimated";

export type AnimatedLoadingProps = {
    animatedProgress: SharedValue<number>;
    isLoading?: SharedValue<boolean>;
};