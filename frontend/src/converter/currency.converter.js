import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import NumberFormat from 'react-number-format';
import { fetchConvertAmount } from '../action/converter.action'

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

const CurrencyConverter = ({ dispatch, status, message, hasErrors, loading, amount }) => {
    const classes = useStyles();

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
        dispatch(fetchConvertAmount(values.numberFormat));
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
            <p>€ {amount}</p>
            <Button variant="contained" color="primary" onClick={onClickChangeAmount}>
                Convert
            </Button>
        </div>
    );
}

const mapStateToProps = state => ({
    status: state.converterData.status,
    message: state.converterData.message,
    hasErrors: state.converterData.hasErrors,
    loading: state.converterData.loading,
    amount: state.converterData.amount,
});

export default connect(mapStateToProps)(CurrencyConverter);