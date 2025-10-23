import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Notifications from 'expo-notifications'
import { useEffect, useState } from 'react'

export const sanitizeString = (str) => {
    return str.toLocaleLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, "")
}

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldPlaySound: false,
        shouldSetBadge: false,
        shouldShowAlert: true
    })
})

export const notify = async (body) => {
    await Notifications.scheduleNotificationAsync({
        content: {
            title: 'Pokemon 📬',
            body,
        },
        trigger: { seconds: 0.5 }
    })
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