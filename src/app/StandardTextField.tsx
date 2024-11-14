import TextField from "@mui/material/TextField";
import React from "react";

interface StandardTextFieldProps {
    label?: string;
    helperText?: string;
    type?: string;
    onChange?: (value: string) => void;
}

const defaultProps: StandardTextFieldProps = {
    label: "Your text",
    helperText: "",
    type: "",
}

const StandardTextField: React.FC<StandardTextFieldProps> = (props: StandardTextFieldProps) => (
    <TextField
        label={props.label === undefined ? defaultProps.label : props.label}
        onChange={(e) => {
            if (props.onChange !== undefined) {
                props.onChange(e.target.value);
            }
        }}
        type={props.type === undefined ? defaultProps.type : props.type}
        helperText={props.helperText === undefined ? defaultProps.helperText : props.helperText}
        variant="standard"
        color="primary"
        sx={{
            "& .MuiInput-root": {
                color: "rgba(255,255,255)",
                fontFamily: "Arial",
                fontWeight: "normal",
                // Bottom border
                "&:before": {
                    borderColor: "rgba(255,255,255,0.6)",
                    borderWidth: "1px",
                },
                // Border on focus
                "&:after": {
                    borderColor: "primary.main",
                    borderWidth: "1px",
                },
                ":hover:not(.Mui-focused)": {
                    "&:before": {
                        borderColor: "#e7e7e7",
                        borderWidth: "2px",
                    },
                },
            },
            // Label
            "& .MuiInputLabel-standard": {
                color: "rgba(255,255,255,0.6)",
                fontWeight: 300,
                "&.Mui-focused": {
                    color: "primary.main",
                },
            },
            "& .MuiFormHelperText-root": {
                color: "rgba(255,255,255,0.6)",
                fontWeight: 300,
                "&.Mui-focused": {
                    color: "primary.main",
                },
            }
        }}
    />
);

export default StandardTextField;