import { fetchUtils, DataProvider, DeleteResult } from "react-admin";
import queryString from "query-string";
import { DB_NAME, mongoClient_Name } from "./config";
import realmApp from "./realmconfig";

import * as Realm from "realm-web";
const {
  BSON: { ObjectId },
} = Realm;

export default (
  api: string,
  httpClient = fetchUtils.fetchJson
): DataProvider => ({

  getList: async (resource, params) => {
    if (!realmApp.currentUser) {
      throw new Error("User needs to be logged in to fetch data.");
    }
  
    const collection = realmApp.currentUser
      .mongoClient(mongoClient_Name)
      .db(DB_NAME)
      .collection(resource);
  
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const skip = (page - 1) * perPage;
    const sortOrder = order === "ASC" ? 1 : -1;
    const filterKeys = Object.keys(params.filter);

    const query = filterKeys.reduce((acc:any, key) => {
      if (key.startsWith("name_")) {
        acc[key.slice(5)] = { $regex: `^${params.filter[key]}`, $options: "i" };
      } else {
        acc[key] = params.filter[key];
      }
      return acc;
    }, {});
  
    const pipeline = [
      { $match: query },
      { $sort: { [field]: sortOrder, _id: 1 } },
      { $skip: skip },
      { $limit: perPage },
    ];
  
    const countPipeline = [
      { $match: query },
      { $count: "total" }
    ];

    // Execute the pipelines
    const [countResult] = await collection.aggregate(countPipeline);
    const totalData = countResult ? countResult.total : 0;
    const documents = await collection.aggregate(pipeline);
  
    const totalPages = Math.ceil(totalData / perPage);
  
    return {
      data: documents.map((doc:any) => ({ ...doc, id: doc._id.toString() })),
      total: totalData,
      totalPages: totalPages,
      currentPage: page
    };
  },
  
  getOne: (resource, params) => {
    // Ensure the user is logged in
    if (!realmApp.currentUser) {
      console.error("User needs to be logged in to fetch data.");
      return Promise.reject(new Error("User needs to be logged in to fetch data."));
    }

    // Define the MongoDB collection
    const collection = realmApp.currentUser.mongoClient(mongoClient_Name).db(DB_NAME).collection(resource);

    try {
      // Convert the params.id to ObjectId
      const paramsId = new ObjectId(params.id.toString()); // Ensure it's a string
      console.log("Fetching document with ID:", params.id);

      return collection
        .findOne({ _id: paramsId })
        .then((document: any) => {
          if (!document) {
            const errorMessage = `getOne: Document with ID ${params.id} not found in collection ${resource}.`;
            console.error(errorMessage);
            throw new Error(errorMessage);
          }

          console.log("Found document:", document);

          // Return the transformed data
          return {
            data: {
              ...document,
              id: document._id,
            },
          };
        })
        .catch((err: any) => {
          console.error("Failed to fetch data:", err);
          throw new Error("Failed to fetch data.");
        });
    } catch (error) {
      console.error("Error converting ObjectId:", error);
      return Promise.reject(new Error("Invalid ID format."));
    }
  },

  getMany: async (resource, params) => {


    if (!realmApp.currentUser) {
      console.error("User needs to be logged in to fetch data.");
      return Promise.reject(
        new Error("User needs to be logged in to fetch data.")
      );
    }

    const collection = realmApp.currentUser
      .mongoClient(mongoClient_Name)
      .db(DB_NAME)
      .collection(resource);

    const filter = { _id: { $in: params.ids.flat() } };

    const documents = await collection.find(filter);



    return { data: documents.map((doc: any) => ({ ...doc, id: doc._id })) };
  },


  getManyReference: (resource, params) => {
    // console.log("getManyReference ----------------------------- ", resource);

    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;

    const query = {
      sort: field,
      order: order,
      start: page,
      end: perPage,
      filter: JSON.stringify(params.filter),
    };

    const url = `${api}/dasdsad${resource}?${queryString.stringify(query)}`;

    return httpClient(url).then(({ headers, json }) => {
      if (!headers.has("x-total-count")) {
        throw new Error(
          "The X-Total-Count header is missing in the HTTP Response. The jsonServer Data Provider expects responses for lists of resources to contain this header with the total number of results to build the pagination. If you are using CORS, did you declare X-Total-Count in the Access-Control-Expose-Headers header?"
        );
      }
      return {
        data: json.map((resource: { _id: any; id: any }) => ({
          ...resource,
          id: resource._id || resource.id,
        })),
        total: parseInt(
          //@ts-ignore
          headers.get("x-total-count").split("/").pop(),
          10
        ),
      };
    });
  },
  update: async (resource: any, params: any) => {

    if (!realmApp.currentUser) {
      console.error("User needs to be logged in to update data.");
      throw new Error("User needs to be logged in to update data.");
    }

    const collection = realmApp.currentUser
      .mongoClient(mongoClient_Name)
      .db(DB_NAME)
      .collection(resource);

    const nid = new ObjectId(params.id);
    // Update the document
    const updateResult = await collection.updateOne(
      { _id: nid },
      { $set: params.data }
    );

    if (updateResult.matchedCount === 0) {
      throw new Error(`update: Document with ID ${params.id} not found.`);
    }

    // Fetching the updated document to return
    const updatedDocument = await collection.findOne({ _id: nid });

    if (!updatedDocument) {
      throw new Error(
        `Failed to fetch the updated document with ID ${params.id}.`
      );
    }

    return {
      data: { ...updatedDocument, id: updatedDocument._id },
    };
  },

  updateMany: (resource, params) =>
    Promise.all(
      params.ids.map((id) =>
        httpClient(`${api}/${resource}/${id}`, {
          method: "PUT",
          body: JSON.stringify(params.data),
        })
      )
    ).then((responses) => ({ data: responses.map(({ json }) => json.id) })),



  create: async (resource, params: any) => {
    // console.log("create =================================", resource);

    // Ensure the user is logged in
    if (!realmApp.currentUser) {
      console.error("User needs to be logged in to update data.");
      throw new Error("User needs to be logged in to update data.");
    }

    const collection = realmApp.currentUser
      .mongoClient(mongoClient_Name)
      .db(DB_NAME)
      .collection(resource);

    try {
      const result = await collection.insertOne(params.data);
      console.log(result);
      //return {data: result};
      return { data: { ...params.data, id: result.insertedId } };
    } catch (error) {
      console.error("Error during insertion:", error);
      throw error;
    }

  },
  _delete: async (resource: string, params: { id: any; }): Promise<{ data: { id: any; }; }> => {
    if (!realmApp.currentUser) {
      console.error("User needs to be logged in to delete data.");
      throw new Error("User needs to be logged in to delete data.");
    }

    const collection = realmApp.currentUser
      .mongoClient(mongoClient_Name)
      .db(DB_NAME)
      .collection(resource);

    const nid = new ObjectId(params.id);

    // Delete the document
    const deleteResult = await collection.deleteOne({ _id: nid });

    if (deleteResult.deletedCount === 0) {
      throw new Error(`delete: Document with ID ${params.id} not found.`);
    }

    return {
      data: { id: params.id },
    };
  },
  get delete() {
    return this._delete;
  },
  set delete(value) {
    this._delete = value;
  },

  deleteMany: async (resource, params) => {
    console.log('Deleting items:', params.ids);

    if (!realmApp.currentUser) {
      console.error("User needs to be logged in to fetch data.");
      throw new Error("User needs to be logged in to fetch data.");
    }

    const currentUser = realmApp.currentUser
      .mongoClient(mongoClient_Name)
      .db(DB_NAME)

    const query = { _id: { $in: params.ids.map((id) => new ObjectId(id)) } };

    try {
      const result = await currentUser.collection(resource).deleteMany(query);
      console.log('Delete result:', result);

      return { data: [{ id: params.ids[0], deletedCount: result.deletedCount }] } as DeleteResult;
    } catch (error) {
      console.error(`Failed to delete items: ${error}`);
      throw new Error(`Failed to delete items: ${error}`);
    }
  },
});
