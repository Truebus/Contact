import { useEffect, useState } from "react"; 
import { FetchAll } from "../endpoints/contactApi";
import { Structure } from "./Structure";
import { MdPersonAddAlt1 } from "react-icons/md";
import { Link } from "react-router-dom";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export const Map = () => {
    const [storedata, setStoreData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search,setSearch] = useState('');
    useEffect(() => {
        const HandleData = async () => {
            setLoading(true);
            setError(null);

            try {
                const data = await FetchAll();
                setStoreData(data);
            } catch (err) {
                setError('Error fetching data. Please try again.');
                console.log('Error fetching data:', err);
            } finally {
                setLoading(false);
            }
        };
        HandleData();
    }, []);

    const HandleDelte=(id)=>{
        setStoreData((prev)=>prev.filter(x=>x._id!==id));
    }
    const HandleSearch=(e)=>{
        setSearch(e.target.value)
    }

    const filteredData = storedata.filter((x) => 
        x.name.toLowerCase().includes(search.toLowerCase())  // Case-insensitive search by name
    );
    return (
        <div className="p-[5px] bg-amber-100">
            {/* Button for navigating to data list */}
            <div className="flex justify-end mr-[100px] mt-[50px] items-center">
                <Link to={'/datalist'}>
                    <button type="button">
                        <MdPersonAddAlt1 className="text-3xl text-center"/>
                    </button>
                </Link>
            </div>
            <div className="flex justify-center items-center mt-5">
                <input
                    type="text"
                    placeholder="Search by name..."
                    value={search}
                    onChange={HandleSearch}
                    className="border-2 border-gray-400 shadow-md shadow-gray-700 outline-none hover:-translate-y-2 duration-300 p-2 rounded-lg w-1/2"
                />
            </div>
            <div className="h-auto w-[750px] shadow-md shadow-gray-600 m-auto mt-[40px]">
                {loading ? (
                    <div className="flex flex-col">
                        {/* Skeleton loader for image, name, phone, and action buttons */}
                        <div className="flex p-4 border-b-2">
                            {/* Left side: Skeleton for image */}
                            <Skeleton circle={true} height={50} width={50} className="ml-2" />

                            {/* Right side: Skeleton for name, phone, and action buttons */}
                            <div className="ml-4 flex w-full justify-between items-center">
                                <div className="flex flex-col w-[70%]">
                                    <Skeleton height={24} width={200} style={{ marginTop: '10px' }} />
                                    <Skeleton height={16} width="50%" style={{ marginTop: '10px' }} />
                                </div>
                                <div className="flex space-x-2 w-[10%] justify-end">
                                    <Skeleton height={40} width={40} circle />
                                    <Skeleton height={40} width={40} />
                                    <Skeleton height={40} width={40} />
                                </div>
                            </div>
                        </div>
                    </div>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : filteredData.length > 0 ? (
                    filteredData.map((x) => (
                        <div key={x._id}>
                            <Structure data={x} deldata={HandleDelte}/>
                        </div>
                    ))
                ) : (
                    <div className="p-[10px]">
                        <p className="p-3 text-2xl text-blue-800 font-serif font-semibold text-center animate-pulse shadow-lg shadow-red-600">No contacts available</p>
                    </div>
                )}
            </div>
        </div>
    );
};
