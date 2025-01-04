import { useState, useEffect } from "react";
import { FetchId, Update } from "../endpoints/contactApi";
import { Link, useParams, useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";

export const UpdateForm = () => {
    const { id } = useParams();  // Get the contact ID from the URL
    const [storedata, setStoreData] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phonetype, setPhoneType] = useState('Mobile');
    const [mobilenumber, setMobileNumber] = useState('');
    const [address, setAddress] = useState('');
    const [image, setImage] = useState(null);
    const [error, setError] = useState({});
    const [message,setMessage] = useState('');
    const [alerttype,setAlertType] = useState('');
    const navigate = useNavigate();

    const phoneRegex = /^[0-9]{10}$/;

    const HandleImg = (e) => {
        setImage(e.target.files[0]);
    };

    // Handle form submission
    const HandleData = async (e) => {
        e.preventDefault();

        // if (!phoneRegex.test(mobilenumber)) {
        //     setError("Please enter a valid phone number.");
        //     return;
        // }
        let validate={};

        if(!name.trim()){
            validate.name="Name is Required."
        }
        if(!email.trim()){
            validate.email="Email is Required."
        }

        if(!phoneRegex.test(mobilenumber)) {
            validate.mobilenumber="Please enter a valid phone number."
        }

        if(!image){
            validate.image="Image is Required."
        }

        if(!address.trim()){
            validate.address="Address is Required."
        }

        {if(Object.keys(validate).length>0){
            setError(validate);
            return;
        }}

        try {
            const formdata = new FormData();
            formdata.append('name', name);
            formdata.append('email', email);
            formdata.append('phonetype', phonetype);
            formdata.append('mobilenumber', mobilenumber);
            formdata.append('address', address);
            formdata.append('image', image);

            const data = await Update(id, formdata);
            setAlertType('success');
            setMessage('Contact Update Successfully..')
            if (data) {
                setStoreData(data);
                setName('');
                setEmail('');
                setPhoneType('Mobile');
                setMobileNumber('');
                setAddress('');
                setImage(null);
                setError('');
                // navigate('/');  // Navigate back to the list or home page
                setTimeout(()=>{
                    setAlertType('');
                    setMessage('');
                },3000)
            }
        } catch (err) {
            console.log('Error saving data:', err);
            setAlertType('error');
            setMessage('Sorry, Please try again later...')
        }
    };

    // Fetch contact details by ID
    useEffect(() => {
        const handleGetId = async () => {
            try {
                const data = await FetchId(id);
                setStoreData(data);
                setName(data.name);
                setEmail(data.email);
                setPhoneType(data.phonetype);
                setMobileNumber(data.mobilenumber);
                setAddress(data.address);
                setImage(data.image);
            } catch (err) {
                console.log('Error fetching data:', err);
            }
        };
        handleGetId();
    }, [id]);  // Only refetch when the ID changes

    const HandleOption = (e) => {
        setPhoneType(e.target.value);
    };

    return (
        <div className="p-[10px] h-auto w-full font-serif bg-gradient-to-tl from-amber-200 to-slate-300">
            <div className="p-[10px] flex items-center justify-center text-2xl bg-amber-100 text-red-500 font-bold rounded-t-2xl shadow-lg shadow-red-600 animate-pulse">
            {/* <img src="src/assets/contact.gif" alt="not match" className="h-[40px] w-[40px] mr-2 rounded-full" /> */}
                
                <h1>Welcome To My Contact Management App (MyCircle)</h1>
            </div>

            <div className="flex items-center mt-2">
                <h1 className="text-blue-700 font-serif font-semibold">
                    <Link to={'/'}><IoMdArrowRoundBack className="inline-flex text-xl" />Back To Previous Page</Link>
                </h1>
            </div>
            {alerttype==='success'&&<h1 className="text-green-700 font-serif font-semibold text-center text-2xl">{message}</h1>}
            {alerttype==='error'&&<h1 className="text-red-700 font-serif font-semibold">{message}</h1>}
            <div className="flex" id="animate">
                <img
                    src="https://cdn3.vectorstock.com/i/1000x1000/54/02/boy-pushing-wall-on-white-background-vector-28935402.jpg"
                    alt="not found"
                    className="h-[500px] w-[300px] mt-[20px] relative left-[250px]"
                />
                <div className="shadow-md shadow-gray-500 mt-[20px] m-auto p-[10px] h-auto w-[400px] bg-white">
                    <form className="border-2 border-slate-600 p-[15px] rounded-2xl" onSubmit={HandleData}>
                        <div className="mt-[20px]">
                            <label className="font-semibold text-2xl text-blue-800">Name:</label><br />
                            <input
                                type="text"
                                placeholder="Your Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="border-2 border-black w-full mt-2 p-2 rounded-lg hover:scale-105 duration-300"
                            />
                            {error.name&&<p className="text-red-500 font-semibold mt-1">{error.name}</p>}
                        </div>
                        <div className="mt-[20px]">
                            <label className="font-semibold text-2xl text-blue-800">Email:</label><br />
                            <input
                                type="email"
                                placeholder="Your Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="border-2 border-black w-full mt-2 p-2 rounded-lg hover:scale-105 duration-300"
                            />
                            {error.email &&<p className="text-red-500 font-semibold mt-1">{error.email}</p>}
                        </div>
                        <div className="mt-[20px]">
                            <div className="font-mono">
                                <select
                                    className="text-xl font-semibold p-1 border-none outline-none text-blue-800"
                                    value={phonetype}
                                    onChange={HandleOption}
                                >
                                    <option value="Mobile">Mobile</option>
                                    <option value="Work">Work</option>
                                    <option value="Home">Home</option>
                                    <option value="Custom">Custom</option>
                                    <option value="Other">Other</option>
                                </select><br />
                            </div>
                            <input
                                type="telephone"
                                placeholder="Your Telephone Number"
                                value={mobilenumber}
                                onChange={(e) => setMobileNumber(e.target.value)}
                                className="border-2 border-black mt-[10px] w-full font-mono p-2 rounded-lg hover:scale-105 duration-300"
                            />
                        </div>
                        {error && <div className="text-red-500 font-semibold mt-1">{error.mobilenumber}</div>}
                        <div className="mt-[20px]">
                            <label className="font-semibold text-2xl text-blue-800">Address:</label><br />
                            <input
                                type="text"
                                placeholder="Your Address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="border-2 border-black w-full mt-2 p-2 rounded-lg hover:scale-105 duration-300"
                            />
                            {error.address&&<p className="text-red-500 font-semibold mt-1">{error.address}</p>}
                        </div>
                        <div className="mt-[15px]">
                            <input type="file" alt="image not found" onChange={HandleImg} />
                        </div>
                        <div className="mt-[20px]">
                            <button type="submit" className="bg-sky-500 w-[100px] p-2 font-bold text-xl rounded-lg hover:scale-105 duration-500">
                                Update Contact
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
