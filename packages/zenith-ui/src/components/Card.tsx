import {
  forwardRef,
  type HTMLAttributes,
  type ImgHTMLAttributes,
  type ReactNode,
} from "react";
import { cx } from "../utils";
import { ImagePlaceholderIcon } from "../icons";

/** Surface container. Compose with the Card.* sub-components. */
export const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function Card({ className, ...rest }, ref) {
    return <div ref={ref} className={cx("zen-card", className)} {...rest} />;
  }
) as React.ForwardRefExoticComponent<
  HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>
> & {
  Image: typeof CardImage;
  Title: typeof CardTitle;
  Description: typeof CardDescription;
  List: typeof CardList;
  Section: typeof CardSection;
};

export interface CardImageProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> {
  /** Image source. When omitted, a dashed placeholder is shown. */
  src?: string;
}

export function CardImage({ src, alt = "", className, ...rest }: CardImageProps) {
  return (
    <div className={cx("zen-card__image", className)}>
      {src ? (
        <img src={src} alt={alt} {...rest} />
      ) : (
        <ImagePlaceholderIcon width={44} height={44} />
      )}
    </div>
  );
}

export function CardTitle({
  className,
  ...rest
}: HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cx("zen-card__title", className)} {...rest} />;
}

export function CardDescription({
  className,
  ...rest
}: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cx("zen-card__desc", className)} {...rest} />;
}

export interface CardListProps extends HTMLAttributes<HTMLUListElement> {
  /** Convenience: render items from an array. */
  items?: ReactNode[];
}

export function CardList({ items, children, className, ...rest }: CardListProps) {
  return (
    <ul className={cx("zen-card__list", className)} {...rest}>
      {items ? items.map((it, i) => <li key={i}>{it}</li>) : children}
    </ul>
  );
}

export function CardSection({
  className,
  ...rest
}: HTMLAttributes<HTMLDivElement>) {
  return <div className={cx("zen-card__section", className)} {...rest} />;
}

Card.Image = CardImage;
Card.Title = CardTitle;
Card.Description = CardDescription;
Card.List = CardList;
Card.Section = CardSection;
