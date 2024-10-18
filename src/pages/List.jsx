import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {backendUrl, currency} from '../App'
import { toast } from 'react-toastify'

const List = ({token}) => {

  const [list,setList] = useState([])

  const fetchList = async  ()=>{
      try {
        const response = await axios.get(backendUrl + '/api/product/list') 
        if (response.data.success) {
          setList(response.data.products);
        }
        else{
          toast.error(response.data.message)
        }
        
      } catch (error) {
        console.log(error);
        toast.error(error.message)
        
      }
  }


  const removeProduct = async (id)=>{
    try {
      
      const response = await axios.post(backendUrl + '/api/product/remove' , {id} ,{headers:{token}})

      if(response.data.success){
        toast.success(response.data.message)
        await fetchList();
      }else{
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  useEffect(()=>{
  fetchList()
  },[])

  return (
    <>
      <p className='mb-2'>All Products List</p>
      <div className='flex flex-col gap-2'>
        {/* List Table Title */}

      <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border border-gray-100 text-sm'>
        <b>Image</b>
        <b>Name</b>
        <b>Category</b>
        <b>Price</b>
        <b className='text-center'>Action</b>
      </div>

        {/* Product List  */}
      {
        list.map((item,index)=>(
          <div className='grid grid-cols-[1fr_3f_r1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm' key={index}>
            <img className='w-25 md:w-[200px]' src={item.image[0]} alt="" />
            <p className='text-2xl font-bold  text-black md:text-lg'>{item.name}</p>
            <p className='text-lg font-bold text-black md:text-sm'>{item.category}</p>
            <p className='text-lg font-bold text-green-400 md:text-sm' > {currency}{item.price}</p>
            <button onClick={()=>removeProduct(item._id)} className='text-left md:text-center cursor-pointer bg-black text-white w-24 py-2 px-2 flex items-center justify-center pt-2 text-sm hover:bg-red-600 hover:text-white hover:font-semibold transition-all ease-out duration-100 hover:rounded-lg '>Remove</button>
          </div>
        ))
      }

      </div>
    </>
  )
}

export default List
