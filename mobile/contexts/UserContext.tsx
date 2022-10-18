import React, { createContext, useEffect, useState } from "react";
import { userGetAnimal } from "../actions/Animal";
import { userGetUserInfo } from "../actions/User";
import { ServiceAnimal, User, UserContextType } from "../utils/types";

export const UserContext = createContext<UserContextType>({
    user: null,
    animal: null,
  });
  
  const UserProvider = ({ children }: { children: React.ReactNode}) => {    
    const [user, setUser] = useState<User | null>(null);
    const [animal, setAnimal] = useState<ServiceAnimal | null>(null)

    useEffect(() => {
        async function loadUserContext() {
            const userInfo = await userGetUserInfo();
            const animalInfo = await userGetAnimal();
            setUser(userInfo);
            setAnimal(animalInfo);
        }

        loadUserContext().then().catch();
    }, [])
    return (
      <UserContext.Provider value={{ user, animal }}>
        {children}
      </UserContext.Provider>
    );
  };
  
  export default UserProvider;