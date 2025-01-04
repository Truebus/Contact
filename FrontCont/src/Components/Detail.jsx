import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FetchId } from "../endpoints/contactApi"; 
import { TbLoader } from "react-icons/tb";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";

export const Detail = () => {
    const [contact, setContact] = useState(null); // Store only one contact data
    const { id } = useParams(); // Get ID from URL
    const [Isloading,setIsLoading] = useState(true);

    useEffect(() => {
        const fetchContactDetails = async () => {
           try{
            const data = await FetchId(id); // Fetch contact by ID
            setContact(data); // Set the contact state
           }
           catch(err){
            console.log('error')
           }
           finally{
            setIsLoading(false);
           }
        };

        fetchContactDetails();
    }, [id]); // Runs whenever `id` changes

    return (
        <div className="h-[100vh] w-full p-[10px] bg-gradient-to-tr from-gray-200 to-gray-300">
            <div className="flex items-center mt-2">
                <h1 className="text-blue-700 font-serif font-semibold"><Link to={'/'}><IoMdArrowRoundBack className="inline-flex text-xl"/>
                Back To Previous Page</Link></h1>
            </div>
            <div className="flex justify-center items-center h-[70vh] w-full">
            
            {Isloading ? (
                <div>
                    <TbLoader className="text-8xl"/>
                </div>
            ) : (
                <div className="border-2 border-gray-400 rounded-2xl shadow-md shadow-black p-[15px] font-serif bg-gray-100">
                <img src={contact.image} alt="image not found" className="h-[100px] w-[100px] rounded-full
                m-auto"/>
           <div className="mt-[20px]">
           <h1><span className="font-semibold text-lg">Name: </span>{contact.name}</h1>
            <p className="font-mono mt-[10px]"><span className="font-serif font-semibold text-lg">{contact.phonetype}:</span> {contact.mobilenumber}</p>
            <p className="mt-[10px]"><span className="font-serif font-semibold text-lg">Email: </span>{contact.email}</p>
            <p className="mt-[10px]"><span className="font-serif font-semibold text-lg">Address: </span>{contact.address}</p>
            
           </div>
        </div>
            )}
            
        </div>
        </div>
        
    );
};
