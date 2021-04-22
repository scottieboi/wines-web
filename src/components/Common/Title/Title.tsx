import * as React from "react";
import Typography from "@material-ui/core/Typography";

interface TitleProps {
  children: React.ReactNode;
  subtitle?: boolean;
  className?: string;
}

const Title: React.FunctionComponent<TitleProps> = ({
  children,
  subtitle,
  className,
}: TitleProps) => {
  return (
    <Typography
      className={className}
      component="h2"
      variant={subtitle ? "subtitle1" : "h6"}
      color="primary"
      gutterBottom
    >
      {children}
    </Typography>
  );
};

Title.defaultProps = {
  subtitle: false,
  className: undefined,
};

export default Title;
