import { Account, Avatars, Client, Databases, ID, Query, Storage } from 'react-native-appwrite';

export const config = {
    endpoint: "https://cloud.appwrite.io/v1",
    platform: "com.jsm.aora",
    projectId: "66a898bd0033004822f9",
    databaseId: "66a89a58000b68f6d9ac",
    userCollectionId: "66a89a7b001e271b7627",
    videoCollectionId: "66a89a8300353ac12908",
    bookmarkCollectionId: "66ae031c0034c9eefb1e",
    storageId: "66a89c5f0003d5e08566",
}



const { endpoint, platform, projectId, bookmarkCollectionId, storageId, databaseId, userCollectionId, videoCollectionId } = config;


const client = new Client();

client
    .setEndpoint(config.endpoint)
    .setProject(config.projectId)
    .setPlatform(config.platform)
    ;


const account = new Account(client);
const avatars = new Avatars(client)
const database = new Databases(client)
const storage = new Storage(client)



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
            databaseId,
            userCollectionId,
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
            databaseId,
            userCollectionId,
            [Query.equal("accountId", currentAccount.$id)]
        )

        if (!currentUser) throw Error;

        return currentUser.documents[0]



    } catch (error) {
        throw new Error(error)

    }
}


export const GetAllPost = async () => {
    try {

        const post = await database.listDocuments(databaseId, videoCollectionId,
            [Query.orderDesc('$createdAt')]

        )
        return post.documents;
    } catch (error) {

        throw new Error(error)
    }

}

export const GetPostDetailById = async (postId) => {
    try {
        const post = await database.getDocument(databaseId, videoCollectionId, postId)
        return post;

    } catch (error) {
        throw new Error(error)
    }

}

export const GetLatestPost = async () => {
    try {

        const post = await database.listDocuments(databaseId, videoCollectionId,
            [Query.orderDesc('$createdAt'), Query.limit(7)]
        )
        return post.documents;
    } catch (error) {

        throw new Error(error)
    }

}

export const searchPosts = async (query) => {
    console.log("function samma query pugexa kinai", query)
    try {

        const post = await database.listDocuments(databaseId, videoCollectionId,
            [Query.search('title', query)]
        )
        return post.documents;
    } catch (error) {

        throw new Error(error)
    }

}

export const GetUserPost = async (userId) => {
    try {

        const post = await database.listDocuments(databaseId, videoCollectionId,
            [Query.equal('users', userId), Query.orderDesc('$createdAt')]
        )
        return post.documents;
    } catch (error) {

        throw new Error(error)
    }

}


export const signOut = async () => {
    try {

        const session = await account.deleteSession("current")
        return session;
    } catch (error) {
        throw new Error(error)

    }
}

export const getFilePreview = (fileId, type) => {

    let fileUrl;

    try {
        if (type === "video") {
            fileUrl = storage.getFileView(storageId, fileId)

        }
        else if (type === "image") {
            fileUrl = storage.getFilePreview(storageId, fileId, 2000, 2000, "top", 100)

        }
        else {
            throw new Error("Invalid file type")
        }
        if (!fileUrl) throw Error;

        return fileUrl;

    } catch (error) {
        throw new Error(error)
    }

}

export const uploadFile = async (file, type) => {
    console.log("this is ffile", file)
    if (!file) return;
    const { mimeType, ...rest } = file
    const asset = { type: mimeType, ...rest }

    try {
        const uploadedfile = await storage.createFile(
            storageId,
            ID.unique(),
            asset
        )
        console.log("this is uploadedfile ", uploadFile)
        const fileUrl = await getFilePreview(uploadedfile.$id, type)
        console.log("this is fileUrl", fileUrl)
        return fileUrl;
    } catch (error) {
        throw new Error(error)
    }

}


export const createVideo = async (form) => {
    console.log("form", form)
    try {
        const [thumbnailUrl, videoUrl] = await Promise.all([
            uploadFile(form.thumbnail, "image"),
            uploadFile(form.video, "video")

        ])
        console.log(`thumnailUrl: ${thumbnailUrl}, videoUrl: ${videoUrl}`)

        const newPost = await database.createDocument(databaseId, videoCollectionId, ID.unique(), {
            title: form.title,
            thumbnail: thumbnailUrl,
            video: videoUrl,
            prompt: form.prompt,
            users: form.userId
        })
        console.log("new post", newPost)
        return newPost;
    } catch (error) {
        throw new Error(error)

    }
}


export const createBookmark = async (userId, videoId) => {
    try {

        const response = await database.createDocument(databaseId, bookmarkCollectionId, ID.unique(), {
            userId: userId,
            videoId: videoId
        })
        console.log("Bookmark created", response)
    } catch (error) {
        throw new Error(error)
    }

}
export const getBookmark = async (userId) => {

    try {
        const bookmarksResponse = await database.listDocuments(databaseId, bookmarkCollectionId, [
            Query.equal('userId', userId)
        ]);
        const bookmarks = bookmarksResponse.documents;
        const videos = await Promise.all(bookmarks.map(async (bookmark) => {
            const videoResponse = await database.getDocument(databaseId, videoCollectionId, bookmark.videoId);
            return videoResponse;
        }));
        return videos;
    } catch (error) {

        throw new Error(error)
    }
}

export const updatePost = async (postId, updatedData) => {
    try {
        const updatedPost = await database.updateDocument(databaseId, videoCollectionId, postId, updatedData);
        console.log("Post updated", updatedPost);
        return updatedPost;
    } catch (error) {
        throw new Error(error);
    }
}

export const deletePost = async (postId) => {
    try {
        const deletePost = await database.deleteDocument(databaseId, videoCollectionId, postId);
        console.log("Post deleted", response)

    } catch (error) {
        throw new Error(error);
    }
}

export const deleteBookmark = async (bookmarkId) => {
    try {
        const response = await database.deleteDocument(databaseId, bookmarkCollectionId, bookmarkId);
        console.log("Bookmark deleted", response)
    } catch (error) {
        throw new Error(error);
    }
}