import { Types } from 'mongoose';
import AnimalModel from 'server/mongodb/models/Animal';
import UserModel from 'server/mongodb/models/User';
import dbConnect from 'server/utils/dbConnect';
import { HandlerType, Role, UserFilter } from 'src/utils/types';

export async function findUserById(userId: Types.ObjectId | string) {
  await dbConnect();
  const user = await UserModel.findById(userId);
  return user;
}

export async function findUserByFirebaseUid(firebaseUid: string) {
  await dbConnect();
  const user = await UserModel.findOne({ firebaseUid: firebaseUid });
  return user;
}

export async function findUserByEmail(email: string) {
  await dbConnect();
  const user = await UserModel.findOne({ email });
  return user;
}

export async function createUser(
  email: string,
  firebaseUid: string,
  roles: Array<Role>,
  birthday?: Date,
  firstName?: string,
  lastName?: string,
  handlerType?: HandlerType,
  profileImage?: string,
  verifiedByAdmin?: boolean,
  emailVerified?: boolean
) {
  await dbConnect();
  const user = await UserModel.create({
    email: email,
    firebaseUid: firebaseUid,
    roles: roles,
    birthday: birthday,
    firstName: firstName,
    lastName: lastName,
    handlerType: handlerType,
    profileImage: profileImage,
    verifiedByAdmin: verifiedByAdmin,
    emailVerified: emailVerified,
  });
  return user;
}

export async function updateUser(
  userId: Types.ObjectId,
  birthday?: Date,
  roles?: Array<Role>,
  firstName?: string,
  lastName?: string,
  handlerType?: HandlerType,
  profileImage?: string
) {
  await dbConnect();
  const user = UserModel.findByIdAndUpdate(userId, {
    roles: roles,
    firstName: firstName,
    lastName: lastName,
    handlerType: handlerType,
    birthday: birthday,
    profileImage: profileImage,
  });
  return user;
}

export async function verifyUser(userId: Types.ObjectId) {
  await dbConnect();

  const user = UserModel.findByIdAndUpdate(
    userId,
    { verifiedByAdmin: true },
    { new: true }
  );

  return user;
}

export async function adminGetUsers(
  pageSize: number,
  afterId?: Types.ObjectId,
  filter?: UserFilter,
  searchText?: string
) {
  await dbConnect();
  searchText = searchText ? '^' + searchText + '(.*)' : searchText;
  const searchQuery = {
    ...(afterId && { _id: { $gt: afterId } }),
    ...(searchText && {
      $or: [
        { email: { $regex: searchText, $options: 'i' } },
        { firstName: { $regex: searchText, $options: 'i' } },
        { lastName: { $regex: searchText, $options: 'i' } },
      ],
    }),
  };

  let query: any;

  if (!filter || filter === UserFilter.NONPROFIT_USERS) {
    query = {
      ...searchQuery,
      roles: { $nin: [Role.NONPROFIT_ADMIN] },
    };
  } else if (filter === UserFilter.UNVERIFIED_USERS) {
    query = {
      ...searchQuery,
      verifiedByAdmin: false,
    };
  } else if (filter === UserFilter.WITH_800_HOURS_USERS) {
    const handlers = await AnimalModel.find({
      totalHours: { $gte: 800 },
    }).select('handler');

    query = {
      _id: {
        ...(afterId && { $gt: afterId }),
        $in: handlers.map((item) => item.handler),
      },
    };
  } else if (filter === UserFilter.WITHOUT_800_HOURS_USERS) {
    const handlers = await AnimalModel.find({
      totalHours: { $gte: 800 },
    }).select('handler');

    query = {
      _id: {
        ...(afterId && { $gt: afterId }),
        $nin: handlers.map((item) => item.handler),
      },
      verifiedByAdmin: true,
    };
  } else if (filter === UserFilter.NONPROFIT_ADMINS) {
    query = {
      ...searchQuery,
      roles: { $in: [Role.NONPROFIT_ADMIN] },
    };
  }

  const users = await UserModel.find(query).limit(pageSize);
  const totalCount = await UserModel.countDocuments(query);

  return { users, totalCount };
}

export async function verifyUserEmail(userId: Types.ObjectId) {
  await dbConnect();

  const user = UserModel.findByIdAndUpdate(
    userId,
    { emailVerified: true },
    { new: true }
  );

  return user;
}

export async function deleteUserByUserId(userId: Types.ObjectId) {
  await dbConnect();

  const user = UserModel.findByIdAndDelete(userId);

  return user;
}
