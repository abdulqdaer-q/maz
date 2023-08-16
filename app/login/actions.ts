'use server'

import { axios } from "@/utils/axios";

export  async function login(fd: FormData) {
  const email = fd.get('email');
  const password = fd.get('password');
  
  try {
    const {data} = await axios.post('/auth/local', {
      identifier: email,
      password
    });

    console.log(data);
    
  }
  catch(err) {
    console.log(err);
    
  }
    
}