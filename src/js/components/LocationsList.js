import React from 'react';
import ListMap from './ListMap'
import LocationsListToolbar from './LocationsListToolbar'
import EditForm from './LocationEditForm'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import { connect } from "react-redux";
import { deleteLocation } from "../actions/actions";

const mapStateToProps = state => {
    return { locations: state.locations };
};

const mapDispatchToProps = dispatch => {
    return {
        deleteLocation: location => dispatch(deleteLocation(location))
    };
};

function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const headRows = [
    { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
    { id: 'address', numeric: true, disablePadding: false, label: 'Address' },
    { id: 'coordinates', numeric: true, disablePadding: false, label: 'Coordinates' },
    { id: 'category', numeric: true, disablePadding: false, label: 'Category' },
];

function EnhancedTableHead(props) {
    const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = property => event => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{ 'aria-label': 'select all desserts' }}
                    />
                </TableCell>
                {headRows.map(row => (
                    <TableCell
                        key={row.id}
                        // align={row.numeric ? 'right' : 'left'}
                        padding={row.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === row.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === row.id}
                            direction={order}
                            onClick={createSortHandler(row.id)}
                        >
                            {row.label}
                            {orderBy === row.id ? (
                                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
}));

const LocationsList = (props) => {
    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [editable, setEditable] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [mapVisible, setMapVisible] = React.useState(false);

    function handleRequestSort(event, property) {
        const isDesc = orderBy === property && order === 'desc';
        setOrder(isDesc ? 'asc' : 'desc');
        setOrderBy(property);
    }

    function handleSelectAllClick(event) {
        if (event.target.checked) {
            const newSelecteds = props.locations.map(n => n.id);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    }

    const handleMapVisibility = () => {
        if (mapVisible) {
            setMapVisible(false)
        } else {
            setMapVisible(true)
        }
    };

    // To be passed down to the toolbar to uncheck all the selects on delete.
    const uncheckSelects = () => {
        setSelected([])
    };

    const makeEditable = () => {
        if (editable) {
            setEditable(false)
        } else {
            setEditable(true)
        }
    };

    function handleSelectClick(event, id) {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
        if (newSelected.length === 0) {
            setEditable(false)
        }
    }

    function handleChangePage(event, newPage) {
        setPage(newPage);
    }

    function handleChangeRowsPerPage(event) {
        setRowsPerPage(+event.target.value);
        setPage(0);
    }

    // Determine whether latitude value is North or South
    const getLatHemisphere = (coordinate) => {
        if (coordinate > 0) {
            return "N"
        } else if (coordinate < 0) {
            return "S"
        } else {
            return ""
        }
    };

    // Determine whether longitude value is East or West
    const getLongHemisphere = (coordinate) => {
        if (coordinate > 0) {
            return "E"
        } else if (coordinate < 0) {
            return "W"
        } else {
            return ""
        }
    };

    const isSelected = id => selected.indexOf(id) !== -1;

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, props.locations.length - page * rowsPerPage);

    if (mapVisible) {
        return (
            <div className={classes.root}>
                <Paper className={classes.paper}>
                    <LocationsListToolbar
                        selected={selected}
                        numSelected={selected.length}
                        deleteLocation={props.deleteLocation}
                        uncheckSelects={uncheckSelects}
                        makeEditable={makeEditable}
                        editable={editable}
                        handleMapVisibility={handleMapVisibility}
                        showActions={false}
                    />
                    <ListMap selectedItems={selected}/>
                </Paper>
            </div>
        )
    } else {
        return (
            <div>
                <div className={classes.root}>
                    <Paper className={classes.paper}>
                        <LocationsListToolbar
                            selected={selected}
                            numSelected={selected.length}
                            deleteLocation={props.deleteLocation}
                            uncheckSelects={uncheckSelects}
                            makeEditable={makeEditable}
                            editable={editable}
                            handleMapVisibility={handleMapVisibility}
                            showActions={true}
                        />
                        <div className={classes.tableWrapper}>
                            <Table
                                className={classes.table}
                                aria-labelledby="tableTitle"
                                size='medium'
                            >
                                <EnhancedTableHead
                                    classes={classes}
                                    numSelected={selected.length}
                                    order={order}
                                    orderBy={orderBy}
                                    onSelectAllClick={handleSelectAllClick}
                                    onRequestSort={handleRequestSort}
                                    rowCount={props.locations.length}
                                />
                                <TableBody>
                                    {stableSort(props.locations, getSorting(order, orderBy))
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((item, index) => {
                                            const isItemSelected = isSelected(item.id);
                                            const labelId = `enhanced-table-checkbox-${index}`;
                                            const lat = parseFloat(item.latitude).toFixed(5);
                                            const long = parseFloat(item.longitude).toFixed(5);

                                            if (editable && isItemSelected) {
                                                return (
                                                    <EditForm
                                                        item={item}
                                                        index={index}
                                                        isItemSelected={isItemSelected}
                                                        labelId={labelId}
                                                        onClick={event => handleSelectClick(event, item.id)}
                                                        doneEdit={handleSelectClick}
                                                    />
                                                )
                                            } else {

                                                return (
                                                    <TableRow
                                                        hover
                                                        tabIndex={-1}
                                                        key={item.id}
                                                    >
                                                        <TableCell padding="checkbox">
                                                            <Checkbox
                                                                checked={isItemSelected}
                                                                inputProps={{'aria-labelledby': labelId}}
                                                                role="checkbox"
                                                                onClick={e => handleSelectClick(e, item.id)}
                                                            />
                                                        </TableCell>
                                                        <TableCell component="th" id={labelId} scope="row" padding="none">
                                                            {item.name}
                                                        </TableCell>
                                                        <TableCell>{item.address}</TableCell>
                                                        <TableCell>
                                                            {Math.abs(lat)}°{getLatHemisphere(lat)}
                                                            , {Math.abs(long)}°{getLongHemisphere(long)}
                                                        </TableCell>
                                                        <TableCell>{item.category}</TableCell>
                                                    </TableRow>
                                                );
                                            }
                                        })}
                                    {emptyRows > 0 && (
                                        <TableRow style={{ height: 49 * emptyRows }}>
                                            <TableCell colSpan={6} />
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                        <TablePagination
                            component="div"
                            count={props.locations.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            backIconButtonProps={{
                                'aria-label': 'previous page',
                            }}
                            nextIconButtonProps={{
                                'aria-label': 'next page',
                            }}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                        />
                    </Paper>
                </div>
            </div>
        )
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LocationsList);
