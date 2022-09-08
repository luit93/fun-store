import axios from 'axios'


export const getAllProducts =(keyword = "",currPage=1,price=[0,9000],categories,ratings=0)=>{
    return new Promise(async (resolve,reject)=>{
        try {
            let link =`http://localhost:9000/api/v1/products?keyword=${keyword}&page=${currPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`
            if(categories){
                link=`http://localhost:9000/api/v1/products?keyword=${keyword}&page=${currPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&categories=${categories}&ratings[gte]=${ratings}`
            }
            const result = await axios.get(link)
             
            
            // console.log(result)
            resolve(result)
        } catch (error) {
            reject(error)
        }
    })
}
export const getProductDetails =(id)=>{
    return new Promise(async (resolve,reject)=>{
        try {
            const result = await axios.get(
                `http://localhost:9000/api/v1/product/${id}`,
                // {headers:{
                //     Authorization:sessionStorage.getItem('accessJWT')
                // }}
            )
            resolve(result)
        } catch (error) {
            reject(error)
        }
    })
}