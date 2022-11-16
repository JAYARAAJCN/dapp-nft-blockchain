import { createContext, useState, useEffect } from 'react'
import { useMoralis, useMoralisQuery } from 'react-moralis'

export const NFTContext = createContext()

export const NFTProvider = ({children}) => {
 const [username, setUsername] = useState('')
 const [nickname, setNickname] = useState('')
 const [assets, setAssets] = useState([])

 const {
    authenticate,
    isAuthenticated,
    enableWeb3,
    Moralis,
    user,
    isWeb3Enabled,
 } = useMoralis()
 
 const {
   data: assetsData,
   error: assetsDataError,
   isLoading: assetsDataisLoading,
 } = useMoralisQuery('assets')

 const getAssets = async () => {
   try {
    await enableWeb3()
    setAssets(assetsData)
   } 
   catch(error) {
    console.log(error)
   }
 }
 
 useEffect(()=>{
   ;(async() => {
      if(isAuthenticated) {
         const currentUsername = await user?.get('nickname')
         setUsername(currentUsername)
      }
   })()
 },[isAuthenticated, user, username])

 useEffect(()=> {
   ;(async()=> {
      if(isWeb3Enabled) {
         await getAssets() 
      }
   })()
 }, [isWeb3Enabled, assetsData, assetsDataisLoading])

   const handleSetUsername = () => {
      if(user) {
         if(nickname) {
            user.set('nickname',nickname)
            user.save()
            setNickname('')
         } else {
            console.log("Can't set empty nickname")
         }
      } else {
         console.log('No user')
      }
   }

   
    return (
        <NFTContext.Provider
         value = {{
            isAuthenticated,
            nickname,
            setNickname,
            username,
            handleSetUsername,
            assets,
         }}
         >
            {children}
         </NFTContext.Provider>
    )
}