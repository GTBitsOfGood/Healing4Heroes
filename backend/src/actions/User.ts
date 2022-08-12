import { internalRequest } from "src/utils/requests";
import { HttpMethod, User } from "src/utils/types";
import { urls } from "src/utils/urls";

export const getUserById = async (userId: string) => {
  return internalRequest<User>({
    url: urls.api.user.get,
    method: HttpMethod.GET,
    queryParams: {
      userId,
    },
  });
};
