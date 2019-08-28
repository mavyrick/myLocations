import { ADD_CATEGORY } from "../constants/action-types";
import { ADD_LOCATION } from "../constants/action-types";
import { EDIT_CATEGORY } from "../constants/action-types";
import { EDIT_LOCATION } from "../constants/action-types";
import { DELETE_CATEGORY } from "../constants/action-types";
import { DELETE_LOCATION } from "../constants/action-types";
import { DRAG_MAP_MARKER } from "../constants/action-types";

const initialState = {
    categories: [],
    locations: [],
};

function rootReducer(state = initialState, action) {
    if (action.type === ADD_CATEGORY) {
        return Object.assign({}, state, {
            categories: state.categories.concat(action.payload)
        })
    } else if (action.type === ADD_LOCATION) {
        console.log(state.locations)

        return Object.assign({}, state, {
            locations: state.locations.concat(action.payload)
        })
    } else if (action.type === EDIT_CATEGORY) {
        return Object.assign({}, state, {
            categories: state.categories.map((item) => {
                console.log(item)
                if (item.id === action.payload.id) {
                    return {
                        ...item,
                        category: action.payload.category,
                    }
                }
                return item
            })

        })
    } else if (action.type === EDIT_LOCATION) {
        return Object.assign({}, state, {
         locations: state.locations.map((item) => {
             console.log(item)
                if (item.id === action.payload.id) {
                    return {
                        ...item,
                        name: action.payload.name,
                        address: action.payload.address,
                        latitude: action.payload.latitude,
                        longitude: action.payload.longitude,
                        category: action.payload.category,
                    }
                }
                console.log(item)
               return item
            })

        })
    } else if (action.type === DELETE_CATEGORY) {
        return Object.assign({}, state, {
            ...state, categories: state.categories.filter(
                function(item) {
                    return this.indexOf(item.id) < 0;
                },
                action.payload
            )
        })
    } else if (action.type === DELETE_LOCATION) {
        return Object.assign({}, state, {
            ...state, locations: state.locations.filter(
                function(item) {
                    return this.indexOf(item.id) < 0;
                },
                action.payload
            )
    })
    } else if (action.type === DRAG_MAP_MARKER) {
    return Object.assign({}, state, {
        locations: state.locations.map((item) => {
            if (item.id === action.payload.id) {
                return {
                    ...item,
                    latitude: action.payload.latitude,
                    longitude: action.payload.longitude,
                }
            }
            return item
        })

    })}
    return state;
}

export default rootReducer;

// } else if (action.type === DELETE_CATEGORY) {
//     return Object.assign({}, state, {
//         categories: state.categories.concat(action.payload)
//     })}

// / return Object.assign({}, state, {
// return state.filter((categories) => categories.index !== action.index)

// return Object.assign({}, state, {
//     ...state,
//     categories: [...state.categories.filter(item => item.id !== action.id)],
// });

// urn Object.assign({}, state, {
//     return state.locations.map(item => {
//         console.log(item.id)
//         // if (item.id === action.payload.id) {
//         //     return item
//         // }
//         // return item;
//     })