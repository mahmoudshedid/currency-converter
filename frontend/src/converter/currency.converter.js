import React from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import NumberFormat from 'react-number-format';
import { fetchConvertAmount } from '../action/converter.action';
import ButtonProgress from '../progress/button.progress';
import NotificationSnackbar from '../notification/notification.snackbar';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

function NumberFormatCustom(props) {
    const { inputRef, onChange, ...other } = props;
    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value,
                    },
                });
            }}
            thousandSeparator
            isNumericString
            prefix="zł "
        />
    );
}

const CurrencyConverter = (props) => {
    const classes = useStyles();
    let fromTo = 'PLN_EUR';

    const [values, setValues] = React.useState({
        numberFormat: '0',
    });

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
    };

    const onClickChangeAmount = () => {
        props.dispatch(fetchConvertAmount(values.numberFormat, fromTo));
    }

    return (
        <div className={classes.root}>
            <p>From Polish złoty:</p>
            <TextField
                label="Amount"
                value={values.numberFormat}
                onChange={handleChange}
                name="numberFormat"
                id="amount-input"
                InputProps={{
                    inputComponent: NumberFormatCustom,
                }}
            />

            <p>To Euro:</p>
            <p>€ {props.amount}</p>
            <ButtonProgress loading={props.loading} onClick={onClickChangeAmount.bind(this)} />
            <NotificationSnackbar
                allowNotification={props.allowNotification}
                status={props.status}
                loading={props.loading}
                message={props.message} />
        </div>
    );
}

const mapStateToProps = state => ({
    status: state.converterData.status,
    message: state.converterData.message,
    allowNotification: state.converterData.allowNotification,
    loading: state.converterData.loading,
    amount: state.converterData.amount,
});

export default connect(mapStateToProps)(CurrencyConverter);