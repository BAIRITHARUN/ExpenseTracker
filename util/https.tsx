import axios from "axios";

const URL = 'https://react-native-course-bbd17-default-rtdb.firebaseio.com'
type expenseType = {
    id?: string
    amount: number,
    date: Date,
    description: string
}

export async function storeExpense(expenseData: expenseType) {
    const response = await axios.post(
        URL + '/expenses.json',
        expenseData
    )
    return response.data.id
}

export async function getExpenses() {
    const response = await axios.get(
        URL + '/expenses.json'
    )

    const expenses = []

    for (const key in response.data) {
        const expenseObj = {
            id: key,
            amount: response.data[key].amount,
            date: new Date(response.data[key].date),
            description: response.data[key].description,
        }
        expenses.push(expenseObj)
    }

    return expenses;
}

export function updateExpense (id: string, expenseData: expenseType) {
    console.log("http id", id)
    console.log("http expense", expenseData)
    return axios.put(URL+`/expenses/${id}.json`, expenseData)
}

export function deleteExpense (id: string) {
    return axios.delete(URL+`/expenses/${id}.json`)
}