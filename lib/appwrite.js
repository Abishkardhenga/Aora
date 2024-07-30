import { Account, Avatars, Client, Databases, ID, Query } from 'react-native-appwrite';

export const config = {
    endpoint: "https://cloud.appwrite.io/v1",
    platform: "com.jsm.aora",
    projectId: "66a898bd0033004822f9",
    databaseId: "66a89a58000b68f6d9ac",
    userCollectionId: "66a89a7b001e271b7627",
    videoCollectionId: "66a89a8300353ac12908",
    storageId: "66a89c5f0003d5e08566"
}



const client = new Client();

client
    .setEndpoint(config.endpoint)
    .setProject(config.projectId)
    .setPlatform(config.platform)
    ;


const account = new Account(client);
const avatars = new Avatars(client)
const database = new Databases(client)



export const createUser = async (email, password, username) => {
    try {
        const newAccount = await account.create(
            ID.unique(),
            email, password, username
        );
        if (!newAccount) throw new Error

        const avatarUrl = avatars.getInitials(username)
        await SignIn(email, password);
        const newUser = await database.createDocument(
            config.databaseId,
            config.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email,
                username,
                avatar: avatarUrl
            }

        )
        return newUser;
    } catch (error) {
        throw new Error(error)

    }
}



export const SignIn = async (email, password) => {
    try {
        const sesssion = await account.createEmailPasswordSession(email, password)
        return sesssion

    } catch (error) {
        throw new Error(error)

    }

}



export const GetCurrentUser = async () => {
    try {
        const currentAccount = await account.get()

        if (!currentAccount) throw Error;


        const currentUser = await database.listDocuments(
            config.databaseId,
            config.userCollectionId,
            [Query.equal("accountId", currentAccount.$id)]
        )

        if (!currentUser) throw Error;

        return currentUser.documents[0]



    } catch (error) {
        throw new Error(error)

    }
}