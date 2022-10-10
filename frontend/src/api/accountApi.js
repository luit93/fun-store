import axios from 'axios'


export const accountLoginApi =(email,password)=>{
    return new Promise(async (resolve,reject)=>{
        try {
            const link="http://localhost:9000/api/v1/login"
            const config={headers: { "Content-Type": "application/json" }}
            const result = await axios.post(link,{email,password},config)
            resolve(result)
        } catch (error) {
            reject(error)
        }
    })
}
export const accountRegisterApi =(accountData)=>{
    return new Promise(async (resolve,reject)=>{
        try {
            const link="http://localhost:9000/api/v1/register"
            const config={headers: { "Content-Type": "multipart/form-data" }}
            const result = await axios.post(link,accountData,config)
            resolve(result)
        } catch (error) {
            reject(error)
        }
    })
}

export const getUserDetailsApi=()=>{
    return new Promise(async (resolve,reject)=>{
        try {
            const link="http://localhost:9000/api/v1/me"
            const result = await axios.get(link)
            resolve(result)
        } catch (error) {
            reject(error)
        }
    })
}

//error in logging out

export const logoutApi=async()=>{
    const link="http://localhost:9000/api/v1/logout"
    // axios.get(link)
    try {
        await axios.get(link, {
          headers: {
            Authorization: sessionStorage.removeItem("accessJWT"),
          },
          
        });
      } catch (error) {
        console.log(error);
      }
   
}