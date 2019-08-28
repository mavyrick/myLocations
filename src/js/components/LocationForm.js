import React, {useState} from 'react';
import CategorySelect from "./CategorySelect"
import {makeStyles} from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import uuidv1 from "uuid";
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import clsx from 'clsx';
import Divider from '@material-ui/core/Divider';
import {connect} from "react-redux";
import {addLocation} from "../actions/actions";

const mapDispatchToProps = dispatch => {
    return {
        addLocation: location => dispatch(addLocation(location))
    };
};

const useStyles = makeStyles(theme => ({
        container: {
            display: 'flex',
            flexWrap: 'wrap',
            paddingTop: 20,
            paddingLeft: 12,
            paddingBottom: 10
        },
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: 200,
        },
        dense: {
            marginTop: 19,
        },
        menu: {
            width: 200,
        },
        coordinates: {
            width: 115
        },
        fab: {
            top: 3,
            left: 6,
            height: 50,
            width: 50
        },
    }
));

const LocationForm = (props) => {

    const classes = useStyles();

    const [locationInput, setInput] = useState({
        name: "",
        address: "",
        latitude: "",
        longitude: "",
        category: ""
    });

    const [categorySelect, setSelect] = React.useState("");

    const updateInput = (e) => {
        setInput({
            ...locationInput,
            [e.target.name]: e.target.value
        })
    };

    const handleSelect = (value) => {
        setSelect(value);
        setInput({
            ...locationInput,
            "category": value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let filled = true;
        for (let key in locationInput) {
            if (locationInput[key] === "") {
                filled = false;
                alert("All fields must be filled.");
                break
            }
        }
        if (filled) {
            let lat = parseFloat(locationInput.latitude);
            let long = parseFloat(locationInput.longitude);
            if ((lat >= -90 && lat <= 90) && (long >= -180 && long <= 180)) {
                const id = uuidv1();
                props.addLocation({...locationInput, id: id});
                setInput({
                    name: "",
                    address: "",
                    latitude: "",
                    longitude: "",
                    category: ""
                });
                setSelect("")
            } else {
                alert(
                    "Invalid coordinates.\n" +
                    "Latitude must be between -90° and 90°.\n" +
                    "Longitude must be between -180° and 180°."
                )
            }
        }
    };

    return (
        <div>
            <div className={classes.container}>
                <form className={classes.container}
                      noValidate
                      autoComplete="off"
                      onSubmit={handleSubmit}
                >
                    <TextField
                        className={clsx(classes.margin, classes.textField)}
                        variant="outlined"
                        name="name"
                        label="Name"
                        value={locationInput.name}
                        maxLength="100"
                        onChange={updateInput}
                    />
                    <TextField
                        className={clsx(classes.margin, classes.textField)}
                        variant="outlined"
                        name="address"
                        label="Address"
                        value={locationInput.address}
                        onChange={updateInput}
                    />
                    <TextField
                        className={clsx(classes.margin, classes.textField, classes.coordinates)}
                        variant="outlined"
                        name="latitude"
                        label="Latitude"
                        helperText="(-90° - 90°)"
                        InputProps={{
                            endAdornment: <InputAdornment position="end">°</InputAdornment>,
                        }}
                        value={locationInput.latitude}
                        onChange={updateInput}
                    />
                    <TextField
                        className={clsx(classes.margin, classes.textField, classes.coordinates)}
                        name="longitude"
                        variant="outlined"
                        label="Longitude"
                        helperText="(-180° - 180°)"
                        InputProps={{
                            endAdornment: <InputAdornment position="end">°</InputAdornment>
                        }}
                        value={locationInput.longitude}
                        onChange={updateInput}
                    />
                    <div>
                        <CategorySelect
                            handleSelect={handleSelect}
                            categorySelect={categorySelect}
                        />
                    </div>
                    <Fab color="primary"
                         type="submit"
                         size="small"
                         aria-label="add"
                         className={classes.fab}
                    >
                        <AddIcon/>
                    </Fab>
                </form>
            </div>
            <Divider />
        </div>
    );
};

export default connect(null, mapDispatchToProps)(LocationForm);