import { GestureResponderEvent, ViewProps } from "react-native";

export type CardProp = {
    card: Card,
    onPress?: ((event: GestureResponderEvent) => void)
    onSwipeRight?: ((event: GestureResponderEvent) => void)
} & ViewProps;

export type Card = {
    title: string,
    content: string,
    category: 'Done' | 'In progress'
}