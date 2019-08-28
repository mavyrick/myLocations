export function addCategory(payload) {
    return { type: "ADD_CATEGORY", payload }
};

export function addLocation(payload) {
    return { type: "ADD_LOCATION", payload }
};

export function editCategory(payload) {
    return { type: "EDIT_CATEGORY", payload }
};

export function editLocation(payload) {
    return { type: "EDIT_LOCATION", payload }
};

export function deleteCategory(payload) {
    return { type: "DELETE_CATEGORY", payload }
};

export function deleteLocation(payload) {
    return { type: "DELETE_LOCATION", payload }
};

export function dragMapMarker(payload) {
    return { type: "DRAG_MAP_MARKER", payload }
};