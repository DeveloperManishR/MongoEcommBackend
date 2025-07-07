import bcrypt from "bcrypt"


export const hashingPassword=async(password)=>{
   return await bcrypt.hash(password,10) 
}

export const compairPassword =  async(password,hashedPassword) =>{
    return bcrypt.compare(password,hashedPassword)
}