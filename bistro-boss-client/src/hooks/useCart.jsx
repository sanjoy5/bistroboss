import { useQuery } from '@tanstack/react-query'
import { useAuthContext } from '../providers/AuthProvider'

const useCart = email => {
    const { user } = useAuthContext()

    const { isLoading, refetch, data: cart = [] } = useQuery({
        queryKey: ['carts', user?.email],
        queryFn: async () => {
            const res = await fetch(`http://127.0.0.1:5000/carts?email=${user?.email}`)
            return res.json()
        },
    })
    return [cart, refetch, isLoading]
}
export default useCart