import React, { useState } from "react";
import classNames from "classnames";
import styles from "./Input.module.scss";
import Icon from "@/components/icon/Icon";

const Input = ({
  id,
  label,
  name = "",
  labelVisible,
  icon,
  email,
  password,
  placeholder = "",
  readOnly,
  disabled,
  value,
  error: errorProp,
  className = "",
  onChange,
  ...restProps
}) => {
  const [inputValue, setInputValue] = useState(value ? value : "");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const handleChange = (e) => {
    setInputValue(e.target.value);
    onChange(e);
  };

  const inputType = email
    ? "email"
    : "password"
      ? isPasswordVisible
        ? "text"
        : "password"
      : "text";

  const iconType = isPasswordVisible ? "show" : "hide";
  const iconLabel = `비밀번호 ${isPasswordVisible ? "표시" : "감춤"}`;

  return (
    <div className={classNames(styles.formControl, className)}>
      <label
        htmlFor={id}
        className={classNames(styles.label, labelVisible || styles.labelHidden)}
      >
        {label}
      </label>

      <div
        className={classNames(
          styles.inputWrapper,
          errorProp && styles.inputWrapperError,
        )}
      >
        {icon ? <Icon /> : null}

        <input
          type={inputType}
          id={id}
          className={classNames(styles.input)}
          placeholder={placeholder}
          readOnly={readOnly}
          value={inputValue}
          onChange={handleChange}
          {...restProps}
        />

        {password ? (
          <button
            type={"button"}
            className={styles.button}
            onClick={() => setIsPasswordVisible((prev) => !prev)}
            disabled={disabled}
          >
            <Icon type={iconType} alt={iconLabel} title={iconLabel} />
          </button>
        ) : null}
      </div>

      {errorProp && (
        <span role={"alert"} className={styles.error}>
          {errorProp.message}
        </span>
      )}
    </div>
  );
};

export default Input;
