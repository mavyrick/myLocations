import React from "react";
import {makeStyles} from "@material-ui/core";
import {lighten} from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from '@material-ui/icons/Edit';
import CancelEditIcon from '@material-ui/icons/CancelPresentation';
import PropTypes from "prop-types";
import clsx from 'clsx';
import MapIcon from '@material-ui/icons/Public';
import BackIcon from '@material-ui/icons/ArrowBack';
import DeleteIcon from '@material-ui/icons/Delete';

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

const LocationsListToolbar = props => {

    const classes = useToolbarStyles();
    const { numSelected, uncheckSelects, makeEditable, handleMapVisibility, editable } = props;

    const handleDelete = (selected) => {
        props.deleteLocation(selected);
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
                        Locations
                    </Typography>
                )}
            </div>
            <div className={classes.spacer} />
            <div className={classes.actions}>
                {numSelected > 0 ? (
                    <div>
                        <table>
                            <tr>
                                <div style={props.showActions ? ({visibility: "visible"}) : ({visibility: "hidden"})}>
                                    <td>
                                        <Tooltip title={editable ? ("Cancel Edit") : ("Edit")}>
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
                                            <IconButton aria-label="delete" onClick={() => handleDelete(props.selected)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </td>
                                </div>
                                <td>
                                    {props.showActions ? (
                                        <Tooltip title="View locations on map">
                                            <IconButton onClick={() => handleMapVisibility()}>
                                                <MapIcon />
                                            </IconButton>
                                        </Tooltip>
                                    ) : (
                                        <Tooltip title="Back to list">
                                            <IconButton onClick={() => handleMapVisibility()}>
                                                <BackIcon />
                                            </IconButton>
                                        </Tooltip>
                                    )}
                                </td>
                            </tr>
                        </table>
                    </div>
                ) : (
                    <div>
                        <Tooltip title={props.showActions ? "Map" : "Back to list"}>
                            <IconButton  onClick={() => handleMapVisibility()}>
                                {props.showActions ? (
                                    <MapIcon />
                                ) : (
                                    <BackIcon />
                                )}
                            </IconButton>
                        </Tooltip>
                    </div>
                )}
            </div>
        </Toolbar>
    );
};

LocationsListToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

export default LocationsListToolbar