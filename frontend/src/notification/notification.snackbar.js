import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { notification } from '../action/converter.action';
import { connect } from 'react-redux';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const NotificationSnackbar = (props) => {
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        if (!props.loading && props.allowNotification) {
            setOpen(true);
            props.notification();
        }
    }, [props]);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setOpen(false);
    };

    return (
        <div>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'left' }}>
                <Alert onClose={handleClose} severity={props.status}>
                    {props.message}
                </Alert>
            </Snackbar>
        </div>
    );
}

export default connect(null, { notification })(NotificationSnackbar);