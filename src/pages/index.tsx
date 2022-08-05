import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { getUserByEmail } from './actions/User';

const Home: NextPage = () => {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    async function getUser() {
      const user = await getUserByEmail("testing@bitsofgood.org");
    }

    getUser().then(() => {
      setLoading(false)
    }).catch((error: Error) => {
      console.log(error);
    })
  
  }, []
    
  )

  return (
    <div>
      Healing 4 Heroes Home Page
    </div>
  )
}

export default Home
