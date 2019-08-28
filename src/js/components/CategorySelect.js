import React from "react";
import {makeStyles} from "@material-ui/core";
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
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
        minWidth: 200,
        bottom: 8
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

// Good example of managing the state of a component with a parent component
const CategorySelect = ({categories, handleSelect, categorySelect}) => {

    const classes = useStyles();

    return (
        <FormControl className={classes.formControl} variant="outlined">
            <InputLabel htmlFor="age-simple">Category</InputLabel>
            <Select
                name="category"
                value={categorySelect}
                input={<OutlinedInput />}
                onChange={e => handleSelect(e.target.value)}
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

export default connect(mapStateToProps)(CategorySelect);