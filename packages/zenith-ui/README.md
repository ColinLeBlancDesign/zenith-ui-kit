# Zenith UI

A dark-first, accessible React component library. 12 components, themeable via CSS
variables, zero runtime dependencies. Built from the Zenith UI Figma kit.

## Install

```bash
npm i zenith-ui
```

## Use

```tsx
import { Button, Pill, Input } from "zenith-ui";
import "zenith-ui/styles.css"; // once, at the root of your app

export default function App() {
  return (
    <div>
      <Button>Get started</Button>
      <Pill color="success">Ready</Pill>
      <Input label="Email" placeholder="you@example.com" />
    </div>
  );
}
```

## Theming

Components read their colors from CSS custom properties. Set `data-theme` on a
parent (usually `<html>`):

```html
<html data-theme="dark">
  <!-- or data-theme="light" -->
</html>
```

If you don't set `data-theme`, Zenith follows the user's
`prefers-color-scheme`. Override any token to customise:

```css
:root {
  --zen-accent: #7a9af9;
  --zen-radius-m: 8px;
}
```

## Components

| Component | Props of note |
| --- | --- |
| `Button` | `variant` (`primary` \| `secondary` \| `tertiary`), `size`, `block` |
| `TextButton` | `icon` |
| `Checkbox` | `label`, plus native checkbox props |
| `Radio` | `label`, plus native radio props |
| `Switch` | `label`, plus native checkbox props |
| `RadioCard` | `title`, `description`, `pill`, `controlSide` |
| `Input` | `label`, `clearable`, `onValueChange`, `onClear` |
| `SearchField` | `clearable`, `onValueChange`, `onClear` |
| `Combobox` | `options`, `label`, `placeholder`, `value`, `onValueChange`, `disabled` |
| `Pill` | `color` (`info` \| `promo` \| `success` \| `alert` \| `warning`) |
| `Tooltip` | `title`, `content`, `side`, `open` |
| `Card` | `Card.Image`, `Card.Title`, `Card.Description`, `Card.List`, `Card.Section` |

All form components wrap native inputs, so they work with labels, forms and
keyboard navigation out of the box.

## License

MIT © Colin LeBlanc
