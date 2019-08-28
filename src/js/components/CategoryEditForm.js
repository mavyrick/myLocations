import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/AddCircle';
import Input from '@material-ui/core/Input';
import { connect } from "react-redux";
import {editCategory} from "../actions/actions";

const mapDispatchToProps = dispatch => {
    return {
        editCategory: category => dispatch(editCategory(category))
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
}));

const editStyle = {
    row: {
        height: 17,
        fontSize: "0.875rem"
    },
    icon: {
        color: "#4350AF"
    }
};

// Form for editing a single category
const CategoryEditForm = (props) => {

    const {item, isItemSelected, doneEdit, labelId} = props;

    const classes = useStyles();

    const [editInput, setInput] = useState({
        category: item.category,
    });

    const updateInput = (e) => {
        setInput({
            ...editInput,
            "category": e.target.value
        });
        console.log(editInput)
    };

    const handleSubmit = (e) => {
        props.editCategory({ ...editInput, id: item.id });
        doneEdit(e, item.id)
    };

    return (
        <TableRow
            hover
            role="checkbox"
            aria-checked={isItemSelected}
            tabIndex={-1}
            key={item.id}
            selected={isItemSelected}
        >
            <TableCell
                padding="checkbox"
            >
                <Tooltip
                    title="Done"
                    onClick={handleSubmit}
                    style={editStyle.icon}
                >
                    <IconButton aria-label="delete">
                        <AddIcon/>
                    </IconButton>
                </Tooltip>
            </TableCell>
            <TableCell component="th" id={labelId} scope="row" padding="none">
                <Input
                    className={classes.input}
                    name="category"
                    value={editInput.category}
                    inputProps={{
                        'aria-label': 'description',
                    }}
                    style={editStyle.row}
                    onChange={updateInput}
                />
            </TableCell>
        </TableRow>
    )
};

export default connect(null, mapDispatchToProps)(CategoryEditForm);