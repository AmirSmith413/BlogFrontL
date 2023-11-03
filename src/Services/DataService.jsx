let userData = {}

//create a function to help us check our local storage

function checkToken()
{
    let result = false;
    let lsData = localStorage.getItem("Token");
    if(lsData && lsData != null)
    {
        result = true
    }
    return result
}

const sendData = async (endpoint,passedInData) =>
{
    let result = await fetch(`http://localhost:5169/user/${endpoint}`,{
        method:"POST",
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(passedInData)
    })
    if(!result.ok)
    {
        const message = `An error has occured : ${result.status}`
        throw new Error(message)
    }
 
    let data = await result.json()
 
    return data
}

const createAccount = async (createdUser) => 
{
   let result = await fetch("http://localhost:5169/user/AddUsers",{
    method:"POST",
    headers: {
        "Content-Type": 'application/json'
    },
    body: JSON.stringify(createdUser)
   })
   if(!result.ok)
   {
       const message = `An error has occured : ${result.status}`
       throw new Error(message)
   }

   let data = await result.json()
   console.log(data)
   return data
    
}
const login = async (loginUser) => 
{
    let result = await fetch("http://localhost:5169/user/Login",
    {
        method:"POST",
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(loginUser)
       })
       if(!result.ok)
       {
           const message = `An error has occured : ${result.status}`
           throw new Error(message)
       }
    
       let data = await result.json()
    
       
    //    if(data.token != null)
    //    {
    //     localStorage.setItem("token",data.token)
    //    }
       
       return data
}

const GetLoggedInUser = async (username) =>
{
  
 let result = await fetch(`http://localhost:5169/user/userbyusername/${username}`)
  userData = await result.json();
  console.log(userData)
}

const LoggedInData = () => 
{
   return userData
}

const AddBlogItems = async (blogItems) =>
{
    let result = await fetch("http://localhost:5169/blog/AddBlogItems",{
        method:"POST",
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(blogItems)
    })
    if(!result.ok)
       {
           const message = `An error has occured : ${result.status}`
           throw new Error(message)
       }
    
       let data = await result.json()
       return data
}
const getBlogItems = async () => 
{
    let result = await fetch("http://localhost:5169/blog/GetBlogItem")
    let data = await result.json()
    return data
}
const GetblogItemsByUserId = async (userId) =>
{
    let result = await fetch(`http://localhost:5169/blog/GetItemsByUserID/${userId}`)
    let data = await result.json()
    console.log(userId)
    return data
}
const updateBlogItems = async (blogItems) => 
{
    let result = await fetch(`http://localhost:5169/blog/UpdateBlogItems`,{
        method:"POST",
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(blogItems)
    })
    if(!result.ok)
    {
        const message = `An error has occured : ${result.status}`
        throw new Error(message)
    }
 
    let data = await result.json()
    return data
}

const getPublishedBlogItems = async () => 
{
    let result = await fetch(`http://localhost:5169/blog/GetPublishedItems`)
    let data = await result.json()
    return data
}

export {checkToken,createAccount, login,LoggedInData,GetLoggedInUser,AddBlogItems,sendData,getBlogItems,GetblogItemsByUserId,updateBlogItems,getPublishedBlogItems}