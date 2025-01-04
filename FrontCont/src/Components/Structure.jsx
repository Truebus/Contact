import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { GrFormView } from "react-icons/gr";
import { Link, useNavigate } from "react-router-dom";
import { DeleteId } from "../endpoints/contactApi";

export const Structure = ({ data,deldata }) => {
    const navigates = useNavigate();
    

        const HandleDel=async()=>{
            await DeleteId(data._id);
            deldata(data._id)
        }
    
   
    return (
       <div className=" p-[10px] text-black bg-white">
         <div className="flex p-4 border-b-2">
            {/* Left side: Image */}
            <div className="flex-shrink-0">
                <img src={data.image} alt="img not found" className="h-[50px] w-[50px] rounded-full" />
            </div>

            {/* Right side: Name, Phone, Edit/Delete Buttons */}
            <div className="ml-4 flex w-full justify-between ">
                {/* Name and Phone */}
                <div className="flex flex-col font-serif font-semibold">
                    <h1 className="text-lg font-semibold">{data.name}</h1>
                    <p className="text-gray-600"><span className="text-lg text-blue-800">{data.phonetype}: </span> 
                    <span className="font-mono text-black">{data.mobilenumber}</span></p>
                </div>

                {/* Edit/Delete Buttons */}
                <div className="flex space-x-2">
                    <Link to={`/datalist/${data._id}`} ><button className="text-blue-500 flex">
                    <GrFormView className="mr-1 text-3xl"/>
                    </button></Link>
                    <button type="button" className="text-blue-500 flex"  onClick={() => navigates(`/update/${data._id}`)}>
                        <CiEdit className="mr-1 text-2xl"/>
                    </button>
                    <button type="button" className="text-red-500 flex"  onClick={HandleDel}>
                        <MdDelete className="mr-1 text-2xl" /> 
                    </button>
                </div>
            </div>
        </div>
       </div>
    );
};
