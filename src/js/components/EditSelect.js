import React from "react";
import {makeStyles} from "@material-ui/core";
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { connect } from "react-redux";

const mapStateToProps = state => {
    return { categories: state.categories };
};

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const selectStyle = {
    height: 25,
    margin: 0
};

// The select menu for the location edit form
const EditSelect = ({ categories, handleUpdateInput, currentCategory }) => {

    const classes = useStyles();

    const [categorySelect, setSelect] = React.useState(currentCategory);

    const handleSelect = (e) => {
        setSelect(e.target.value)
        handleUpdateInput(e, e.target.value)
    };

    return (
        <FormControl className={classes.formControl} style={selectStyle} >
            <Select
                name="category"
                style={selectStyle}
                value={categorySelect}
                input={<OutlinedInput />}
                onChange={handleSelect}
            >
                {categories.map((item) =>
                    <MenuItem key={item.id} value={item.category}>
                        {item.category}
                    </MenuItem>
                )}
            </Select>
        </FormControl>
    );
};

export default connect(mapStateToProps)(EditSelect);