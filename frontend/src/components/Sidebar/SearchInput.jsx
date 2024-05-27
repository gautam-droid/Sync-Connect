import { RiUserSearchLine } from "react-icons/ri";
export const SearchInput = () => {
  return (
    <form className='flex items-center gap-2'>
        <button type='submit' className='btn btn-circle bg-orange-500 text-white '>
        <RiUserSearchLine className='w-5 h-5 outline-none'/>
        </button>
        <input type="text" placeholder='Search...' className='input input-bordered rounded-full'/>
    </form>
  )
}
