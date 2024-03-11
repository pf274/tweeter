import type { AWS } from "@serverless/typescript";
import CategoriesTable from "./resources/CategoriesTable";
import CollectionsTable from "./resources/CollectionsTable";
import PromptsTable from "./resources/PromptsTable";
import VideosTable from "./resources/VideosTable";
import UsersTable from "./resources/UsersTable";

const serverlessResources: AWS["resources"] = {
  Resources: {
    CategoriesTable,
    CollectionsTable,
    PromptsTable,
    VideosTable,
    UsersTable,
  },
};

export default serverlessResources;
