import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Notifications from 'expo-notifications'
import { Platform } from 'react-native'
import { useEffect, useState } from 'react'

export const sanitizeString = (str) => {
    return str.toLocaleLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, "")
}

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowBanner: true,
        shouldShowList: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
})

if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
        name: 'Défaut',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
    })
}

export const notify = async (body) => {
    try {
        const { status: existingStatus } = await Notifications.getPermissionsAsync()
        let finalStatus = existingStatus
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync()
            finalStatus = status
        }
        if (finalStatus !== 'granted') {
            console.warn('Permission de notification refusée')
            return
        }

        await Notifications.scheduleNotificationAsync({
            content: {
                title: 'Francodex',
                body,
            },
            trigger: null,
        })
    } catch (error) {
        console.error('Erreur lors de la notification:', error)
    }
}

export const useStorage = (key, defaultValue) => {

    const [storage, setStorage] = useState(defaultValue)

    useEffect(() => {
        AsyncStorage.getItem(key)
            .then(JSON.parse)
            .then(data => setStorage(data ?? defaultValue))
            .catch(console.error)
    }, [])

    useEffect(() => {
        AsyncStorage.setItem(key, JSON.stringify(storage))
    }, [storage])

    return { storage, setStorage };
}