"use strict";

import axios from "axios";

// https://developer.github.com/v3/#root-endpoint
module.exports = async (endpointUrl, config) => {
  return await axios.get(endpointUrl, config);
};
