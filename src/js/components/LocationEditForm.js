import React, {useState} from 'react';
import EditSelect from './EditSelect'
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/AddCircle';
import Input from '@material-ui/core/Input';
import { connect } from "react-redux";
import {editLocation} from "../actions/actions";

const mapDispatchToProps = dispatch => {
    return {
        editLocation: location => dispatch(editLocation(location))
    };
};

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
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
        width: 100,
        marginRight: 8
    }
}));

const editStyle = {
    row: {
        height: 17,
        fontSize: "0.875rem"
    },
    icon: {
        color: "#4350AF"
    },
    coordinates: {
        height: 17,
        fontSize: "0.875rem",
        paddingRight: 3
    }
};

// Form for editing a single location
const LocationEditForm = (props) => {

    const {item, isItemSelected, doneEdit, labelId} = props;

    const classes = useStyles();

    const [editInput, setInput] = useState({
        name: item.name,
        address: item.address,
        latitude: item.latitude,
        longitude: item.longitude,
        category: item.category,
    });

    const updateInput = (e) => {
        setInput({
            ...editInput,
            [e.target.name]: e.target.value
        });
    };

    const updateSelectInput = (e, value) => {
        setInput({
            ...editInput,
            "category": value
        })
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let filled = true;
        // Check if any fields are empty
        for (let key in editInput) {
            if (editInput[key] === "") {
                filled = false;
                alert("All fields must be filled.");
                break
            }
        }
        if (filled) {
            let lat = parseFloat(editInput.latitude);
            let long = parseFloat(editInput.longitude);
            if ((lat >= -90 && lat <= 90) && (long >= -180 && long <= 180)) {
                props.editLocation({...editInput, id: item.id});
                doneEdit(e, item.id)
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
        <TableRow
            tabIndex={-1}
            key={item.id}
        >
            <TableCell
                padding="checkbox"
                style={editStyle.row}
            >
                <Tooltip title="Done">
                    <IconButton aria-label="delete"
                                role="checkbox"
                                aria-checked={isItemSelected}
                                tabIndex={-1}
                                selected={isItemSelected}
                                onClick={handleSubmit}
                    >
                        <AddIcon style={editStyle.icon}/>
                    </IconButton>
                </Tooltip>
            </TableCell>
            <TableCell component="th" id={labelId} scope="row" padding="none">
                <Input
                    className={classes.input}
                    name="name"
                    value={editInput.name}
                    inputProps={{
                        'aria-label': 'description',
                    }}
                    style={editStyle.row}
                    onChange={updateInput}
                />
            </TableCell>
            <TableCell>
                <Input
                    className={classes.input}
                    name="address"
                    value={editInput.address}
                    inputProps={{
                        'aria-label': 'description',
                    }}
                    style={editStyle.row}
                    onChange={updateInput}
                />
            </TableCell>
            <TableCell>
                <Input
                    className={classes.coordinates}
                    name="latitude"
                    value={editInput.latitude}
                    inputProps={{
                        'aria-label': 'description',
                    }}
                    style={editStyle.coordinates}
                    onChange={updateInput}
                />
                <Input
                    className={classes.coordinates}
                    name="longitude"
                    value={editInput.longitude}
                    inputProps={{
                        'aria-label': 'description',
                    }}
                    style={editStyle.coordinates}
                    onChange={updateInput}
                />
            </TableCell>
            <TableCell>
                <EditSelect
                    handleUpdateInput={updateSelectInput}
                    currentCategory={item.category}
                />
            </TableCell>
        </TableRow>
    )
};

export default connect(null, mapDispatchToProps)(LocationEditForm);