"use strict";

const countWordsOnPage = require("./actions/countWordsOnPage");
const getTextByKey = require("./methods/getTextByKey");
const browserFetchHtml = require("./methods/browserFetchHtml");
const countWordsInText = require("./methods/countWordsInText");
const fetchHtml = require("./methods/fetchHtml");

module.exports = {
  name: "scraper",
  actions: {
    countWordsOnPage: {
      handler: countWordsOnPage,
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
    }
  },
  methods: {
    fetchHtml,
    browserFetchHtml,
    countWordsInText,
    getTextByKey,
  }
};
