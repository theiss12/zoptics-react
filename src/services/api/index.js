import {API_RESOURCES} from "../../constants";
export const loadData = (resourceType, setter, action) => {
    const endpointUrl = API_RESOURCES.get(resourceType).endpointUrl;
    fetch(endpointUrl)
        .then(response => response.json())
        .then(json => { setter(json.data); return json.data})
        .then(data => action(data))
        .catch(error => console.log(error));
}