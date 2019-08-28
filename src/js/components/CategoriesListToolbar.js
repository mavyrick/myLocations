import React from "react";
import {makeStyles} from "@material-ui/core";
import {lighten} from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from '@material-ui/icons/Edit';
import PropTypes from "prop-types";
import clsx from 'clsx';
import DeleteIcon from '@material-ui/icons/Delete';
import CancelEditIcon from "@material-ui/icons/CancelPresentation";

const useToolbarStyles = makeStyles(theme => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.primary.main,
                backgroundColor: lighten(theme.palette.primary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    spacer: {
        flex: '1 1 100%',
    },
    actions: {
        color: theme.palette.text.secondary,
    },
    title: {
        flex: '0 0 auto',
    },
}));

const CategoriesListToolbar = props => {

    const classes = useToolbarStyles();
    const {numSelected, uncheckSelects, makeEditable, editable} = props;

    const handleDelete = (selected) => {
        props.deleteCategory(selected);
        uncheckSelects()
    };

    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            <div className={classes.title}>
                {numSelected > 0 ? (
                    <Typography color="inherit" variant="subtitle1">
                        {numSelected} selected
                    </Typography>
                ) : (
                    <Typography variant="h6" id="tableTitle">
                        Categories
                    </Typography>
                )}
            </div>
            <div className={classes.spacer}/>
            <div className={classes.actions}>
                {numSelected > 0 ? (
                    <div>
                        <table>
                            <tr>
                                <div>
                                    <td> <Tooltip title={editable ? ("Cancel Edit") : ("Edit")}>
                                        <IconButton aria-label="edit" onClick={() => makeEditable()}>
                                            {editable ? (
                                                <CancelEditIcon />
                                            ) : (
                                                <EditIcon />
                                            )}
                                        </IconButton>
                                    </Tooltip>
                                    </td>
                                    <td>
                                        <Tooltip title="Delete">
                                            <IconButton aria-label="delete"
                                                        onClick={() => handleDelete(props.selected)}>
                                                <DeleteIcon/>
                                            </IconButton>
                                        </Tooltip>
                                    </td>
                                </div>
                            </tr>
                        </table>
                    </div>
                ) : (
                    <div />
                )}
            </div>
        </Toolbar>
    )
};

CategoriesListToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

export default CategoriesListToolbar