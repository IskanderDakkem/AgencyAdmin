const ApiLinks = {
  Brands: {
    getAll: "/brand/get/all",
    getOne: "/brand/get/one/", //** +id */
    update: "/brand/update/", //** +id */
    create: "/brand/create", //** +id */
    delete: "/brand/delete/", //**+id */
  },
  Sheet: {
    getAll: "/sheet/get/all",
    getOne: "/sheet/get/one/", //+id
    delete: "/sheet/delete/", //+id
    update: "/sheet/update/",
    create: "/sheet/create",
  },
  Agency: {
    create: "/agency/create",
    delete: "/agency/delete/", //+id
    update: "/agency/update/all/", //+id
    updateLogo: "/agency/updte/logo/", //+id
    updatePassword: "/agency/update/password", //+id
    getOne: "/agency/get/one/", //+id
    getAll: "/agency/get/all",
    block: "/agency/update/suspend/", //+id
    sendResetLink: "/agency/send/resetPassword/", //+id
  },
};

export default ApiLinks;
