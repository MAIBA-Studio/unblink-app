"use client";

import { BorderWrapper, IBorderWrapperProps } from "@/components/BorderWrapper";
import { shouldNotForwardPropsWithKeys } from "@/lib/utils";
import {
  Box,
  BoxProps,
  CSSObject,
  InputBase,
  InputBaseProps,
  InputLabel as InputLabelBase,
  InputLabelProps,
  styled,
} from "@mui/material";

interface IContentContainer extends BoxProps {
  disabled?: boolean;
}

const ContentContainer = styled(Box, {
  shouldForwardProp: shouldNotForwardPropsWithKeys(["disabled"]),
})<IContentContainer>(({ theme, disabled = false }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  width: "100%",
  "&:hover .input-area-border": disabled
    ? {}
    : {
        background: theme.palette.warning.main,
      },
  "&:focus-within .input-area-border": disabled
    ? {}
    : {
        background: theme.palette.warning.dark,
      },
}));

const TextArea = styled(InputBase)(({ theme }) => ({
  ...theme.typography.base.sm,
  color: theme.palette.neutral[80],
  backgroundColor: theme.palette.neutral[0],
  padding: theme.spacing(1),
  height: "40px",
  width: "100%",
  borderRadius: "4px",
  gap: theme.spacing(0.5),
  "& .MuiInputBase-input": {
    padding: "0px",
    width: "100%",
    "&::placeholder": {
      color: theme.palette.neutral[60],
      opacity: 1,
    },
    "&.Mui-disabled": {
      color: theme.palette.neutral[20],
      "-webkit-text-fill-color": theme.palette.neutral[20],
    },
  },
  "&.Mui-disabled": {
    color: theme.palette.neutral[20],
    backgroundColor: theme.palette.neutral[80],
  },
}));

interface IBorder extends IBorderWrapperProps {
  disabled?: boolean;
}

const Border = styled(BorderWrapper, {
  shouldForwardProp: shouldNotForwardPropsWithKeys(["disabled"]),
})<IBorder>(({ theme, disabled = false }) => ({
  background: !disabled ? theme.palette.neutral[20] : theme.palette.neutral[60],
  borderRadius: "4px",
  width: "100%",
}));

interface IInputLabelProps extends InputLabelProps {
  label?: string;
}
const InputLabel = styled(InputLabelBase, {
  shouldForwardProp: shouldNotForwardPropsWithKeys<IInputLabelProps>(["label"]),
})<IInputLabelProps>(({ theme, label }) => {
  const styles: CSSObject = {
    ...theme.typography.base.xxs,
    color: theme.palette.neutral[20],
    padding: theme.spacing(1),
    transform: "none",
    width: "100%",
    position: "relative",
    "&.Mui-focused": {
      color: theme.palette.neutral[60],
    },
  };

  if (!label) styles.padding = theme.spacing(0);

  return styles;
});

interface ITextInput extends InputBaseProps {
  label?: string;
}

export const TextInput = ({
  label,
  placeholder,
  value,
  onChange,
  id,
  disabled,
  ...rest
}: ITextInput) => {
  return (
    <ContentContainer disabled={disabled}>
      <InputLabel htmlFor={id} label={label}>
        {label}
      </InputLabel>
      <Border borderWidth={2} disabled={disabled} className="input-area-border">
        <TextArea
          id={id}
          value={value}
          onChange={onChange}
          onWheel={(e) => e.currentTarget.blur()}
          onFocus={(e) =>
            e.target.addEventListener(
              "wheel",
              function (e) {
                e.preventDefault();
              },
              { passive: false }
            )
          }
          placeholder={placeholder}
          disabled={disabled}
          {...rest}
        />
      </Border>
    </ContentContainer>
  );
};
