import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

import './LoadingButton.css';

/**
 @param {{
  isLoading: boolean,
  children: JSX.Element | string | array | Element,
  className: string,
  disabled: boolean,
  onClick: object
 }} props
 */
const LoadingButton = props => {
  const { isLoading, children } = props;
  const { className, disabled, onClick } = props;
  const newProps = {
    className,
    disabled,
    onClick,
  };

  return (
    <Button {...newProps}>
      {!isLoading && <span>{children}</span>}

      {isLoading && <div className="lds-dual-ring" />}
    </Button>
  );
};

LoadingButton.defaultProps = {
  onClick: () => {},
  disabled: false,
  className: '',
};

LoadingButton.propTypes = {
  className: PropTypes.string,
  isLoading: PropTypes.bool.isRequired,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
    PropTypes.array,
    PropTypes.string,
  ]).isRequired,
};

export default LoadingButton;
