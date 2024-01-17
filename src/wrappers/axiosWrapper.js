import axios from "axios"
export async function axiosGet(route, options) {
    let res = await axios.get(route, options)

    if (!res) {
        console.error(`request to ${route} failed`)
    }

    if (res.Error) {
        console.error(res)
    }

    return res
}