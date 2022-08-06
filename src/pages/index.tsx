import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { getUserById } from "src/actions/User";

const Home: NextPage = () => {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    async function getUser() {
      const user = await getUserById("62ed9937b052f60447816f42");
      console.log(user);
    }

    getUser()
      .then(() => {
        setLoading(false);
      })
      .catch((error: Error) => {
        console.log(error);
      });
  }, []);

  return <div>Healing 4 Heroes Home Page</div>;
};

export default Home;
