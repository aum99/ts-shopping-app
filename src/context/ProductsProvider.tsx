import { ReactElement, createContext, useEffect, useState } from "react"

type ProductType = {
    sku: string,
    name:string,
    price:number
}

const initState:ProductType[] = []

type UseProductContextType = {
    products: ProductType[]
}

const initContextState:UseProductContextType = {products: []}

const ProductsContext = createContext<UseProductContextType>(initContextState)

type ChildrenType = {
    children:ReactElement | ReactElement[]
}

export const ProductsProvider = ({children}:ChildrenType ):ReactElement=> {
    const [products, setProducts] = useState<ProductType[]>(initState)

    useEffect(() => {
        const fetchProducts = async():Promise<ProductType[]> => {
            const data = await fetch("http://localhost:3500/products").then(res => {return res.json()}).catch(err => {
                if(err instanceof Error) console.log(err.message)
            })
            return data
        }

        fetchProducts().then(products => setProducts(products))

    },[])

    return (
        <ProductsContext.Provider value={{products}}>
            {children}
        </ProductsContext.Provider>
    )
}