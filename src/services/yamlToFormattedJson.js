const YAML = require("js-yaml");
const _ = require("lodash");

function flattenMessages(nestedMessages, prefix = "") {
    return Object.keys(nestedMessages).reduce((messages, key) => {
        let value = nestedMessages[key];
        let prefixedKey = prefix ? `${prefix}.${key}` : key;

        if (_.isString(value)) {
            messages[prefixedKey] = value;
        } else {
            Object.assign(messages, flattenMessages(value, prefixedKey));
        }

        return messages;
    }, {});
}

export const yamlToFormattedJson = yaml => {
    // Load yaml file using YAML.load
    console.log("native");
    const nativeObject = YAML.safeLoad(yaml);

    let messages = flattenMessages(nativeObject);
    console.log(messages);
    return messages;
};
