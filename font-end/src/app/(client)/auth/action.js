"use server"
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const handleLogin=async(formData)=>{
    const form=Object.fromEntries(formData);
    const responese= await fetch(`${process.env.SERVER_API}/auth/login`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'Accept':'application/json',

    },
    body: JSON.stringify(form),
});
if(!responese.ok){
    return false;
}
const{success,token}= await responese.json();
if(!success){
    return false;
}
cookies().set("token", token, {
    httpOnly: true,
    secure: false,
    path: "/",
    maxAge: 86400, //1 ngày
});
redirect("/");
};