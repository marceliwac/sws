"use strict";

const wordCount = require("./actions/wordCount");

/**
 * @typedef {import('moleculer').ServiceSchema} ServiceSchema Moleculer's Service Schema
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */

/** @type {ServiceSchema} */
module.exports = {
  name: "swsapi",
  actions: {
    wordCount: {
      rest: {
        method: "GET",
        path: "/wordCount"
      },
      params: {
        address: {
          type: "string",
        },
        mode: {
          type: "string",
          enum: ["RAW", "BROWSER"],
          optional: true,
        },
        key: {
          type: "string",
          optional: true,
        },
        strategy: {
          type: "string",
          enum: ["FIRST", "LAST", "ALL"],
          optional: true,
        },
      },
      handler: wordCount,
    },
  },
};
