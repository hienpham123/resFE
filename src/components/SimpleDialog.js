import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';



function SimpleDialog(props) {
    const { onClose, selectedValue, open, emails} = props;

    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleListItemClick = (value) => {
        onClose(value);
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Chọn giờ đến</DialogTitle>
            <List sx={{ pt: 0 }}>
                {emails.map((email) => (
                    <ListItem button onClick={() => handleListItemClick(email)} key={email}>
                        <ListItemText sx={{textAlign: "center"}} primary={email} />
                    </ListItem>
                ))}
            </List>
        </Dialog>
    );
}

SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
};

export default function SimpleDialogDemo({datas=["1"], restaurantId = false}) {
    const emails = datas;
    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState(String(emails[0]));

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
        setSelectedValue(value);
    };

    React.useEffect(()=>{
        localStorage.setItem("timeS" + restaurantId, selectedValue);
    }, [selectedValue])

    React.useEffect(()=>{
        if(localStorage.getItem("timeS" + restaurantId)){
            setSelectedValue(localStorage.getItem("timeS" + restaurantId))
        }
    }, [restaurantId])

    return (
        <div>
            <Typography variant="subtitle1" component="div" onClick={handleClickOpen}>
                {selectedValue}
            </Typography>
            <br />
            <SimpleDialog
                selectedValue={selectedValue}
                open={open}
                onClose={handleClose}
                emails={emails}
            />
        </div>
    );
}
