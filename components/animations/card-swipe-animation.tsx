import { Card } from '@/types/AnimatedCardProps'
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import AnimatedCard from '../animatedComponents/animated-card'
import { ThemedText } from '../themed-text'

const CardSwipeAnimation = () => {

    const [cards, setCards] = useState<Card[]>([
        { title: 'Card 1', content: 'Content 1', category: 'Done' },
        { title: 'Card 2', content: 'Content 2', category: 'In progress' },
        { title: 'Card 3', content: 'Content 3', category: 'Done' },
        { title: 'Card 4', content: 'Content 4', category: 'In progress' },
        { title: 'Card 5', content: 'Content 5', category: 'Done' },
        { title: 'Card 6', content: 'Content 6', category: 'Done' },
        { title: 'Card 7', content: 'Content 7', category: 'In progress' }
    ])

    const toggleCardStatus = (title: string) => {
        setCards(prevCards => prevCards.map(c =>
            c.title === title
                ? { ...c, category: c.category === 'Done' ? 'In progress' : 'Done' }
                : c
        ))
    }

    const inProgressCards = cards.filter(card => card.category === 'In progress');
    const doneCards = cards.filter(card => card.category === 'Done');

    return (
        <View style={{ gap: 12 }}>
            <ThemedText type='subtitle'>Card Swipe Animation</ThemedText>

            <ScrollView style={{ flex: 1, padding: 20 }}>
                <ThemedText>In progress</ThemedText>
                <View style={{ gap: 10 }}>
                    {inProgressCards.map(card => (
                        <AnimatedCard
                            key={card.title}
                            card={card}
                            onSwipeRight={() => toggleCardStatus(card.title)}
                        />
                    ))}
                </View>

                <ThemedText>Done</ThemedText>
                <View style={{ gap: 10 }}>
                    {doneCards.map(card => (
                        <AnimatedCard
                            key={card.title}
                            card={card}
                            onSwipeRight={() => toggleCardStatus(card.title)}
                        />
                    ))}
                </View>
            </ScrollView>
        </View>
    )
}

export default CardSwipeAnimation

const styles = StyleSheet.create({})