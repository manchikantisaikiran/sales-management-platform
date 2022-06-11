export interface Order {
    id: Number,
    order_date: string,
    order_price: string,
    order_status: 'requested' | 'in-transist' | 'delivered' | 'cancelled' | 'returned',
    customer: {
        name: string,
        email: string
    },
    showOrderActions?: boolean
}