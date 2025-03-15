import {useForm} from "react-hook-form"
import { NavLink } from "react-router-dom"
import { useMutation } from "react-query"
import { userRegister } from "../../api/Register"
import { userBody } from "../../types"

export default function Register (){
  const {register,handleSubmit,formState:{errors},reset} = useForm<userBody>()

  const mutation = useMutation(userRegister,{
    onSuccess : () => {
      reset()
      alert("Register Success")
    },
    onError : (error) => {
      alert(error)
      
    }
  })

  function onSubmit(data:userBody){
    const newData = {...data}
    newData.status = "unverified"
    console.log(newData)
    mutation.mutate(newData)
  }

    return(
        <div className='flex items-center flex-col md:w-1/2 lg:w-1/3 text-slate-600 gap-6 w-3/4 p-5 py-10 min-h-[80%] bg-cyan-50/60  '>
      <h1 className='text-3xl font-bold '>Register</h1>
      <form className='flex flex-col font-semibold gap-5' onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col gap-2'>
          <label htmlFor="email" className='text-[1.1rem]'>Email : </label>
          <input {...register("email",{required:"This field is required"})} type="email" id="email" placeholder='Enter your email' className='bg-slate-100 p-1 rounded-lg w-64 px-2 shadow-xl' />
          {errors.email && <p>{errors.email.message}</p> }
        </div>
        <div className='flex flex-col gap-2'>
          <label htmlFor="username" className='text-[1.1rem]'>Username : </label>
          <input {...register("username",{required:"This field is required",minLength:{message:"Must contain minimal 5 character",value:5}})} type="text" id="username" placeholder='Enter your username' className='bg-slate-100 p-1 rounded-lg w-64 px-2 shadow-xl' />
          {errors.username && <p className="text-red-500">{errors.username.message}</p> }

        </div>
        <div className='flex flex-col gap-2'>
          <label htmlFor="password" className='text-[1.1rem]'>Password : </label>
          <input {...register("password",{required:"This field is required",minLength:{message:"Must contain minimal 8 character",value:8}})} type="password" id="password" placeholder='Enter your password' className='bg-slate-100 p-1 rounded-lg w-64 px-2 shadow-xl' />
          {errors.password && <p className="text-red-500">{errors.password.message}</p> }

        </div>
        
          <button className='cursor-pointer bg-green-400 p-1 w-24 rounded-lg mx-auto text-slate-100 mt-2'>Submit</button>
      </form>
      <p className='-mb-5'>Already have account ? </p>
      <NavLink to="/login" className='bg-indigo-400 p-1 w-24 rounded-lg text-center mx-auto font-semibold text-slate-100'>Login</NavLink>

    </div>
    )
}