import { NativeModules } from "react-native"

const constants = {
    clientID: null,
    clientSecretID: null,
}

const build = false

if (build) {
    constants.clientID = "12c251bd9aa26a0"
    constants.clientSecretID = "94645a12533bb72611b7829ec40b13b022637c88"
} else {
    constants.clientID = "2ef18273aef6e2b"
    constants.clientSecretID = "7d15c18e6f8d5e99c6ebbe9c9ba32ed61cb323c9"
}

module.exports = { ...constants }
