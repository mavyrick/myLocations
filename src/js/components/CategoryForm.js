import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import uuidv1 from "uuid";
import {connect} from "react-redux";
import {addCategory} from "../actions/actions";
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';

const mapDispatchToProps = dispatch => {
    return {
        addCategory: category => dispatch(addCategory(category))
    };
};

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        paddingTop: 20,
        paddingLeft: 25,
        paddingBottom: 25
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 300,
    },
    dense: {
        marginTop: 19,
    },
    menu: {
        width: 200,
    },
    fab: {
        top: 19,
        left: 5,
        height: 50,
        width: 50
    }
}));

const CategoryForm = (props) => {

    const classes = useStyles();

    const [categoryInput, setInput] = useState({ category: "" });

    const updateInput = (e) => {
        setInput({
            category: e.target.value
        })
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (categoryInput.category === "") {
            alert("Category must be filled")
        } else {
            const id = uuidv1();
            props.addCategory({...categoryInput, id: id});
            setInput({
                category: ""
            })
        }
    };

    return (
        <div>
            <form className={classes.container}
                  noValidate
                  autoComplete="off"
                  onSubmit={handleSubmit}
            >
                <TextField
                    id="standard-name"
                    className={classes.textField}
                    label="New category"
                    variant="outlined"
                    inputProps={{
                        'aria-label': 'description',
                    }}
                    value={categoryInput.category}
                    margin="normal"
                    onChange={updateInput}
                />
                <Fab color="primary"
                     type="submit"
                     size="small"
                     aria-label="add"
                     className={classes.fab}
                >
                    <AddIcon/>
                </Fab>
            </form>
            <Divider />
        </div>
    );
};

export default connect(null, mapDispatchToProps)(CategoryForm);