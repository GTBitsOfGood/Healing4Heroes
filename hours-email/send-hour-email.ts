import juno from "juno-sdk";
import mongoose from "mongoose";
import { EmailContent, EmailRecipient } from "juno-sdk/internal/api";
import { Types } from "mongoose";
import { UserFilter, Role, User } from "./types";
import { AnimalModel, UserModel} from "./models";

const DATABASE_URL = process.env.DATABASE_URL as string;
const DATABASE_NAME = process.env.DATABASE_NAME as string;
const JUNO_API_KEY = process.env.JUNO_API_KEY as string;
const JUNO_BASE_URL = process.env.JUNO_BASE_URL as string
const JUNO_SENDER_EMAIL = process.env.JUNO_SENDER_EMAIL as string;
const JUNO_SENDER_NAME = process.env.JUNO_SENDER_NAME as string;
const PAGE_SIZE = 50;

juno.init({
  apiKey: JUNO_API_KEY as string,
  baseURL: JUNO_BASE_URL as string
})

async function dbConnect(): Promise<void> {
    if (mongoose.connections[0].readyState) return;

    await mongoose
      .connect(DATABASE_URL as string, {
        socketTimeoutMS: 360000,
        dbName: DATABASE_NAME,
      })
      .catch((error) => {
        console.error("Unable to connect to database.");
  
        throw error;
      });
  }

export async function sendHourReminderEmail() {
  try {
    const { usersList, totalUserCount } = await getUsersWithout800Hours(PAGE_SIZE);

    await Promise.all(
      usersList.map((user) =>
        juno.email.sendEmail({
          recipients: [{
            "email": user.email,
            "name": user.firstName
          }],
          cc: [],
          bcc: [],
          sender: {
            email: JUNO_SENDER_EMAIL as string,
            name: JUNO_SENDER_NAME as string
          },
          subject: "Reminder: Camp Grace - 800 Hours Requirement",
          contents: [{"type": "text/html", "value": generateEmailContent(user)}]
    })))
  } catch (e) {
    console.log(e)
    throw e;
  }
}


async function adminGetUsers(
  pageSize: number,
  afterId?: Types.ObjectId,
  filter?: UserFilter,
  searchText?: string
) {
  await dbConnect();
  searchText = searchText ? "^" + searchText + "(.*)" : searchText;
  const searchQuery = {
    ...(afterId && { _id: { $gt: afterId } }),
    ...(searchText && {
      $or: [
        { email: { $regex: searchText, $options: "i" } },
        { firstName: { $regex: searchText, $options: "i" } },
        { lastName: { $regex: searchText, $options: "i" } },
      ],
    }),
  };

  let query: any;

  if (!filter || filter === UserFilter.NONPROFIT_USERS) {
    query = {
      ...searchQuery,
      roles: { $nin: [Role.NONPROFIT_ADMIN] },
    };
  }

  if (filter === UserFilter.UNVERIFIED_USERS) {
    query = {
      ...searchQuery,
      verifiedByAdmin: false,
    };
  }

  // Hours is on the Animal, not the users
  if (filter === UserFilter.WITH_800_HOURS_USERS) {
    const handlers = await AnimalModel.find({
      totalHours: { $gte: 800 },
    }).select("handler");

    query = {
      _id: {
        ...(afterId && { $gt: afterId }),
        $in: handlers.map((item) => item.handler),
      },
    };
  }

  if (filter === UserFilter.WITHOUT_800_HOURS_USERS) {
    const handlers = await AnimalModel.find({
      totalHours: { $gte: 800 },
    }).select("handler");

    query = {
      _id: {
        ...(afterId && { $gt: afterId }),
        // some verified users do not have an animal
        $nin: handlers.map((item) => item.handler),
      },
      verifiedByAdmin: true,
    };
  }

  if (filter === UserFilter.NONPROFIT_ADMINS) {
    query = {
      ...searchQuery,
      roles: { $in: [Role.NONPROFIT_ADMIN] },
    };
  }

  const users = await UserModel.find(query, null, { sort: { _id: 1 } }).limit(
    pageSize
  );
  const totalCount = await UserModel.countDocuments(query);

  return { users, totalCount };
}

export async function getUsersWithout800Hours(pageSize) {
  let usersList: User[] = [];
  let totalUserCount = 0;
  let afterId;

  try {
    while (true) {
      // Fetch a page of users with the filter and pagination
      const { users, totalCount } = await adminGetUsers(
        pageSize,
        afterId,
        UserFilter.WITHOUT_800_HOURS_USERS
      );

      usersList = [...usersList, ...users];
      totalUserCount = totalCount;

      if (users.length < pageSize) break;

      afterId = users[users.length - 1]._id;
    }
  } catch (error) {
    console.error("Error fetching users:", error);
  }
  return { usersList, totalUserCount };
}


const generateEmailContent = (user) => `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html
    dir="ltr"
    xmlns="http://www.w3.org/1999/xhtml"
    xmlns:o="urn:schemas-microsoft-com:office:office"
    lang="en"
>
    <head>
        <meta charset="UTF-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta name="x-apple-disable-message-reformatting" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta content="telephone=no" name="format-detection" />
        <title>🏕 Join Us at Camp Grace by Completing Your Hours</title>
        <!--[if (mso 16)]>
            <style type="text/css">
                a {
                    text-decoration: none;
                }
            </style>
        <![endif]-->
        <!--[if gte mso 9]>
            <style>
                sup {
                    font-size: 100% !important;
                }
            </style>
        <![endif]-->
        <!--[if gte mso 9]>
            <noscript>
                <xml>
                    <o:OfficeDocumentSettings>
                        <o:AllowPNG></o:AllowPNG>
                        <o:PixelsPerInch>96</o:PixelsPerInch>
                    </o:OfficeDocumentSettings>
                </xml>
            </noscript>
        <![endif]-->
        <style type="text/css">
            .rollover:hover .rollover-first {
                max-height: 0px !important;
                display: none !important;
            }
            .rollover:hover .rollover-second {
                max-height: none !important;
                display: block !important;
            }
            .rollover span {
                font-size: 0px;
            }
            u + .body img ~ div div {
                display: none;
            }
            #outlook a {
                padding: 0;
            }
            span.MsoHyperlink,
            span.MsoHyperlinkFollowed {
                color: inherit;
                mso-style-priority: 99;
            }
            a.es-button {
                mso-style-priority: 100 !important;
                text-decoration: none !important;
            }
            a[x-apple-data-detectors],
            #MessageViewBody a {
                color: inherit !important;
                text-decoration: none !important;
                font-size: inherit !important;
                font-family: inherit !important;
                font-weight: inherit !important;
                line-height: inherit !important;
            }
            .es-desk-hidden {
                display: none;
                float: left;
                overflow: hidden;
                width: 0;
                max-height: 0;
                line-height: 0;
                mso-hide: all;
            }
            @media only screen and (max-width: 600px) {
                .es-p-default {
                }
                *[class="gmail-fix"] {
                    display: none !important;
                }
                p,
                a {
                    line-height: 150% !important;
                }
                h1,
                h1 a {
                    line-height: 120% !important;
                }
                h2,
                h2 a {
                    line-height: 120% !important;
                }
                h3,
                h3 a {
                    line-height: 120% !important;
                }
                h4,
                h4 a {
                    line-height: 120% !important;
                }
                h5,
                h5 a {
                    line-height: 120% !important;
                }
                h6,
                h6 a {
                    line-height: 120% !important;
                }
                .es-header-body p {
                }
                .es-content-body p {
                }
                .es-footer-body p {
                }
                .es-infoblock p {
                }
                h1 {
                    font-size: 30px !important;
                    text-align: left;
                }
                h2 {
                    font-size: 24px !important;
                    text-align: left;
                }
                h3 {
                    font-size: 20px !important;
                    text-align: left;
                }
                h4 {
                    font-size: 24px !important;
                    text-align: left;
                }
                h5 {
                    font-size: 20px !important;
                    text-align: left;
                }
                h6 {
                    font-size: 16px !important;
                    text-align: left;
                }
                .es-header-body h1 a,
                .es-content-body h1 a,
                .es-footer-body h1 a {
                    font-size: 30px !important;
                }
                .es-header-body h2 a,
                .es-content-body h2 a,
                .es-footer-body h2 a {
                    font-size: 24px !important;
                }
                .es-header-body h3 a,
                .es-content-body h3 a,
                .es-footer-body h3 a {
                    font-size: 20px !important;
                }
                .es-header-body h4 a,
                .es-content-body h4 a,
                .es-footer-body h4 a {
                    font-size: 24px !important;
                }
                .es-header-body h5 a,
                .es-content-body h5 a,
                .es-footer-body h5 a {
                    font-size: 20px !important;
                }
                .es-header-body h6 a,
                .es-content-body h6 a,
                .es-footer-body h6 a {
                    font-size: 16px !important;
                }
                .es-menu td a {
                    font-size: 14px !important;
                }
                .es-header-body p,
                .es-header-body a {
                    font-size: 14px !important;
                }
                .es-content-body p,
                .es-content-body a {
                    font-size: 14px !important;
                }
                .es-footer-body p,
                .es-footer-body a {
                    font-size: 14px !important;
                }
                .es-infoblock p,
                .es-infoblock a {
                    font-size: 12px !important;
                }
                .es-m-txt-c,
                .es-m-txt-c h1,
                .es-m-txt-c h2,
                .es-m-txt-c h3,
                .es-m-txt-c h4,
                .es-m-txt-c h5,
                .es-m-txt-c h6 {
                    text-align: center !important;
                }
                .es-m-txt-r,
                .es-m-txt-r h1,
                .es-m-txt-r h2,
                .es-m-txt-r h3,
                .es-m-txt-r h4,
                .es-m-txt-r h5,
                .es-m-txt-r h6 {
                    text-align: right !important;
                }
                .es-m-txt-j,
                .es-m-txt-j h1,
                .es-m-txt-j h2,
                .es-m-txt-j h3,
                .es-m-txt-j h4,
                .es-m-txt-j h5,
                .es-m-txt-j h6 {
                    text-align: justify !important;
                }
                .es-m-txt-l,
                .es-m-txt-l h1,
                .es-m-txt-l h2,
                .es-m-txt-l h3,
                .es-m-txt-l h4,
                .es-m-txt-l h5,
                .es-m-txt-l h6 {
                    text-align: left !important;
                }
                .es-m-txt-r img,
                .es-m-txt-c img,
                .es-m-txt-l img {
                    display: inline !important;
                }
                .es-m-txt-r .rollover:hover .rollover-second,
                .es-m-txt-c .rollover:hover .rollover-second,
                .es-m-txt-l .rollover:hover .rollover-second {
                    display: inline !important;
                }
                .es-m-txt-r .rollover span,
                .es-m-txt-c .rollover span,
                .es-m-txt-l .rollover span {
                    line-height: 0 !important;
                    font-size: 0 !important;
                    display: block;
                }
                .es-spacer {
                    display: inline-table;
                }
                a.es-button,
                button.es-button {
                    font-size: 18px !important;
                    padding: 10px 20px 10px 20px !important;
                    line-height: 120% !important;
                }
                a.es-button,
                button.es-button,
                .es-button-border {
                    display: inline-block !important;
                }
                .es-m-fw,
                .es-m-fw.es-fw,
                .es-m-fw .es-button {
                    display: block !important;
                }
                .es-m-il,
                .es-m-il .es-button,
                .es-social,
                .es-social td,
                .es-menu {
                    display: inline-block !important;
                }
                .es-adaptive table,
                .es-left,
                .es-right {
                    width: 100% !important;
                }
                .es-content table,
                .es-header table,
                .es-footer table,
                .es-content,
                .es-footer,
                .es-header {
                    width: 100% !important;
                    max-width: 600px !important;
                }
                .adapt-img {
                    width: 100% !important;
                    height: auto !important;
                }
                .es-mobile-hidden,
                .es-hidden {
                    display: none !important;
                }
                .es-desk-hidden {
                    width: auto !important;
                    overflow: visible !important;
                    float: none !important;
                    max-height: inherit !important;
                    line-height: inherit !important;
                }
                tr.es-desk-hidden {
                    display: table-row !important;
                }
                table.es-desk-hidden {
                    display: table !important;
                }
                td.es-desk-menu-hidden {
                    display: table-cell !important;
                }
                .es-menu td {
                    width: 1% !important;
                }
                table.es-table-not-adapt,
                .esd-block-html table {
                    width: auto !important;
                }
                .h-auto {
                    height: auto !important;
                }
            }
            @media screen and (max-width: 384px) {
                .mail-message-content {
                    width: 414px !important;
                }
            }
        </style>
    </head>
    <body
        class="body"
        style="
            width: 100%;
            height: 100%;
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
            padding: 0;
            margin: 0;
        "
    >
        <div
            dir="ltr"
            class="es-wrapper-color"
            lang="en"
            style="background-color: #f6f6f6"
        >
            <!--[if gte mso 9]>
                <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
                    <v:fill type="tile" color="#f6f6f6"></v:fill>
                </v:background>
            <![endif]-->
            <table
                width="100%"
                cellspacing="0"
                cellpadding="0"
                class="es-wrapper"
                style="
                    mso-table-lspace: 0pt;
                    mso-table-rspace: 0pt;
                    border-collapse: collapse;
                    border-spacing: 0px;
                    padding: 0;
                    margin: 0;
                    width: 100%;
                    height: 100%;
                    background-repeat: repeat;
                    background-position: center top;
                    background-color: #f6f6f6;
                "
            >
                <tr>
                    <td valign="top" style="padding: 0; margin: 0">
                        <table
                            cellspacing="0"
                            cellpadding="0"
                            align="center"
                            class="es-content"
                            style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                border-collapse: collapse;
                                border-spacing: 0px;
                                width: 100%;
                                table-layout: fixed !important;
                            "
                        >
                            <tr>
                                <td
                                    align="center"
                                    style="padding: 0; margin: 0"
                                >
                                    <table
                                        cellspacing="0"
                                        cellpadding="0"
                                        bgcolor="#ffffff"
                                        align="center"
                                        class="es-content-body"
                                        style="
                                            mso-table-lspace: 0pt;
                                            mso-table-rspace: 0pt;
                                            border-collapse: collapse;
                                            border-spacing: 0px;
                                            background-color: #ffffff;
                                            width: 600px;
                                        "
                                    >
                                        <tr>
                                            <td
                                                align="left"
                                                style="
                                                    padding: 0;
                                                    margin: 0;
                                                    padding-top: 20px;
                                                    padding-right: 20px;
                                                    padding-left: 20px;
                                                "
                                            >
                                                <table
                                                    width="100%"
                                                    cellpadding="0"
                                                    cellspacing="0"
                                                    style="
                                                        mso-table-lspace: 0pt;
                                                        mso-table-rspace: 0pt;
                                                        border-collapse: collapse;
                                                        border-spacing: 0px;
                                                    "
                                                >
                                                    <tr>
                                                        <td
                                                            align="left"
                                                            style="
                                                                padding: 0;
                                                                margin: 0;
                                                                width: 560px;
                                                            "
                                                        >
                                                            <table
                                                                cellspacing="0"
                                                                width="100%"
                                                                role="presentation"
                                                                cellpadding="0"
                                                                style="
                                                                    mso-table-lspace: 0pt;
                                                                    mso-table-rspace: 0pt;
                                                                    border-collapse: collapse;
                                                                    border-spacing: 0px;
                                                                "
                                                            >
                                                                <tr>
                                                                    <td
                                                                        align="left"
                                                                        style="
                                                                            padding: 0;
                                                                            margin: 0;
                                                                        "
                                                                    >
                                                                        <h1
                                                                            style="
                                                                                margin: 0;
                                                                                font-family: arial,
                                                                                    'helvetica neue',
                                                                                    helvetica,
                                                                                    sans-serif;
                                                                                mso-line-height-rule: exactly;
                                                                                letter-spacing: 0;
                                                                                font-size: 30px;
                                                                                font-style: normal;
                                                                                font-weight: normal;
                                                                                line-height: 36px;
                                                                                color: #333333;
                                                                            "
                                                                        >
                                                                            🏕
                                                                            Camp
                                                                            Grace
                                                                            Hours
                                                                            Reminder
                                                                        </h1>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td
                                                align="left"
                                                style="
                                                    padding: 0;
                                                    margin: 0;
                                                    padding-top: 20px;
                                                    padding-right: 20px;
                                                    padding-left: 20px;
                                                "
                                            >
                                                <table
                                                    width="100%"
                                                    cellspacing="0"
                                                    cellpadding="0"
                                                    style="
                                                        mso-table-lspace: 0pt;
                                                        mso-table-rspace: 0pt;
                                                        border-collapse: collapse;
                                                        border-spacing: 0px;
                                                    "
                                                >
                                                    <tr>
                                                        <td
                                                            valign="top"
                                                            align="center"
                                                            style="
                                                                padding: 0;
                                                                margin: 0;
                                                                width: 560px;
                                                            "
                                                        >
                                                            <table
                                                                width="100%"
                                                                cellspacing="0"
                                                                cellpadding="0"
                                                                style="
                                                                    mso-table-lspace: 0pt;
                                                                    mso-table-rspace: 0pt;
                                                                    border-collapse: collapse;
                                                                    border-spacing: 0px;
                                                                "
                                                            >
                                                                <tr>
                                                                    <td
                                                                        align="left"
                                                                        style="
                                                                            padding: 0;
                                                                            margin: 0;
                                                                        "
                                                                    >
                                                                        <p
                                                                            style="
                                                                                margin: 0;
                                                                                mso-line-height-rule: exactly;
                                                                                font-family: arial,
                                                                                    'helvetica neue',
                                                                                    helvetica,
                                                                                    sans-serif;
                                                                                line-height: 21px;
                                                                                letter-spacing: 0;
                                                                                color: #333333;
                                                                                font-size: 14px;
                                                                            "
                                                                        >
                                                                            Hi
                                                                            ${user.firstName},
                                                                        </p>
                                                                        <p
                                                                            style="
                                                                                margin: 0;
                                                                                mso-line-height-rule: exactly;
                                                                                font-family: arial,
                                                                                    'helvetica neue',
                                                                                    helvetica,
                                                                                    sans-serif;
                                                                                line-height: 21px;
                                                                                letter-spacing: 0;
                                                                                color: #333333;
                                                                                font-size: 14px;
                                                                            "
                                                                        >
                                                                            <br />
                                                                        </p>
                                                                        <p
                                                                            style="
                                                                                margin: 0;
                                                                                mso-line-height-rule: exactly;
                                                                                font-family: arial,
                                                                                    'helvetica neue',
                                                                                    helvetica,
                                                                                    sans-serif;
                                                                                line-height: 21px;
                                                                                letter-spacing: 0;
                                                                                color: #333333;
                                                                                font-size: 14px;
                                                                            "
                                                                        >
                                                                            This
                                                                            is a
                                                                            friendly
                                                                            reminder
                                                                            that
                                                                            completing
                                                                            800
                                                                            hours
                                                                            of
                                                                            training
                                                                            is
                                                                            required
                                                                            in
                                                                            order
                                                                            to
                                                                            attend
                                                                            our
                                                                            4-day
                                                                            advanced
                                                                            training
                                                                            at
                                                                            Camp
                                                                            Grace
                                                                            in
                                                                            Mobile,
                                                                            Alabama!
                                                                            Please
                                                                            make
                                                                            sure
                                                                            to
                                                                            track
                                                                            your
                                                                            progress
                                                                            and
                                                                            work
                                                                            towards
                                                                            the
                                                                            800-hour
                                                                            goal.
                                                                            This
                                                                            training
                                                                            is
                                                                            essential
                                                                            to
                                                                            help
                                                                            you
                                                                            gain
                                                                            the
                                                                            skills
                                                                            and
                                                                            knowledge
                                                                            needed
                                                                            for
                                                                            success
                                                                            in
                                                                            the
                                                                            program.
                                                                        </p>
                                                                        <p
                                                                            style="
                                                                                margin: 0;
                                                                                mso-line-height-rule: exactly;
                                                                                font-family: arial,
                                                                                    'helvetica neue',
                                                                                    helvetica,
                                                                                    sans-serif;
                                                                                line-height: 21px;
                                                                                letter-spacing: 0;
                                                                                color: #333333;
                                                                                font-size: 14px;
                                                                            "
                                                                        >
                                                                            <br />
                                                                        </p>
                                                                        <p
                                                                            style="
                                                                                margin: 0;
                                                                                mso-line-height-rule: exactly;
                                                                                font-family: arial,
                                                                                    'helvetica neue',
                                                                                    helvetica,
                                                                                    sans-serif;
                                                                                line-height: 21px;
                                                                                letter-spacing: 0;
                                                                                color: #333333;
                                                                                font-size: 14px;
                                                                            "
                                                                        >
                                                                            Thank
                                                                            you
                                                                            for
                                                                            your
                                                                            commitment,
                                                                            and
                                                                            we
                                                                            look
                                                                            forward
                                                                            to
                                                                            seeing
                                                                            you
                                                                            at
                                                                            Camp
                                                                            Grace!
                                                                        </p>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td
                                                                        align="center"
                                                                        style="
                                                                            padding: 0;
                                                                            margin: 0;
                                                                            padding-top: 45px;
                                                                            font-size: 0;
                                                                        "
                                                                    >
                                                                        <img
                                                                            alt=""
                                                                            width="179"
                                                                            src="https://frtlngh.stripocdn.email/content/guids/CABINET_62d3c098a87f3711a2652871aa1c9df59f90ea24f3fb35845e9dab31006d25dd/images/screenshot_20241112_at_54630pm.png"
                                                                            style="
                                                                                display: block;
                                                                                font-size: 14px;
                                                                                border: 0;
                                                                                outline: none;
                                                                                text-decoration: none;
                                                                            "
                                                                        />
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </div>
    </body>
</html>
`