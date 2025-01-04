import axios from "axios";

const BASE_URL = "http://localhost:2000";

const api = axios.create({
    baseURL: BASE_URL,
    headers:{
        'Content-Type': 'application/json',
    }
})

export const Create = async(contdata)=>{
    try{
    const data = await api.post('http://localhost:2000/api/contact/create',contdata,{
      headers:{
        "Content-Type": 'multipart/form-data'
      }
    });
    return data.data;
    }
    catch(err){
        console.log('error in creating data',err);
        return err;
    }
}

export const FetchAll = async()=>{
    // try{
       const data = await api.get('/api/contact/getall');
       return data.data;
    // }
    // catch(err){
    //   console.log('error in getting data');
    //   return err;
    // }
}

export const FetchId = async(id)=>{
    try{
      const data = await api.get(`/api/contact/getId/${id}`);
      return data.data;
    }
    catch(err){
      console.log('error in fetching data by Id');
      return err;
    }
}

export const DeleteData = async()=>{
    try{
      const data = await api.delete('/api/contact/delall');
      return data.data;
    }
    catch(err){
      console.log('error in delete all data');
      return err;
    }
}

export const DeleteId=async(id)=>{
    try{
       const data = await api.delete(`/api/contact/delId/${id}`);
       return data.data;
    }
    catch(err){
      console.log('error in delete data by Id');
      return err;
    }
}

export const Update = async(id,contdata)=>{
    try{
      const data = await api.put(`/api/contact/update/${id}`,contdata,{
        headers:{
          "Content-Type": 'multipart/form-data',
        }
      });
      return data.data;
    }
    catch(err){
        console.log('error in update data');
        return err
    }
}