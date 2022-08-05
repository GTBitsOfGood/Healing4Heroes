import { NextApiRequest, NextApiResponse } from "next";
import { createUserWithEmail } from "../../../../server/mongodb/actions/User";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {  
    try {
      const email = req.body.email; 
      // All errors handled in backend action
      const user = await createUserWithEmail(email);

      return res.status(200).json({
            success: true,
            user: user
      });

    } catch (error: any) {
      return res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  };

  export default handler;