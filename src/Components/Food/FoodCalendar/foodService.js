const STORAGE_KEY = 'FoodApp'

export const getData = () => {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : { food: [] }
}

export const saveData = (data) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export const getFoodsByDate = (date) => {
    const data = getData()
    return data.food.filter(item => item.date === date)
}

export const getFoodDataForDate = (date) => {
    const existingData = getFoodsByDate(date)
    
    if (existingData.length > 0) {
        return existingData[0]
    }

    return {
        id: Date.now().toString(),
        date: date,
        url:'',
        kkal: '',
        protein: '',
        fats: '',
        carbs: ''
    }
}

export const saveFoodData = (foodData) => {
    const data = getData()
    const existingIndex = data.food.findIndex(item => item.id === foodData.id)
    
    if (existingIndex !== -1) {
        data.food[existingIndex] = foodData
    } else {
        data.food.push(foodData)
    }
    
    saveData(data)
    return foodData
}

export const getFoodsByDateRange = (startDate, endDate) => {
    const data = getData()
    return data.food.filter(item => 
        item.date >= startDate && item.date <= endDate
    )
}