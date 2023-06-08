import { useQuery } from '@tanstack/react-query'
import { useAuthContext } from '../providers/AuthProvider'
import useAxiosSecure from './useAxiosSecure'

const useCart = email => {
    const { user, loading } = useAuthContext()
    const token = localStorage.getItem('access-token')
    const [axiosSecure] = useAxiosSecure()

    const { data: cart = [], refetch } = useQuery({
        queryKey: ['carts', user?.email],
        enabled: !loading,
        // queryFn: async () => {
        //     const res = await fetch(`http://127.0.0.1:5000/carts?email=${user?.email}`, {
        //         headers: {
        //             authorization: `bearer ${token}`
        //         }
        //     })
        //     return res.json()
        // },
        queryFn: async () => {
            const res = await axiosSecure(`/carts?email=${user?.email}`)
            return res.data
        },
    })
    return [cart, refetch]
}
export default useCart