"use client";

import { useEffect, useState, type ReactNode } from "react";
import {
  Button,
  TextButton,
  Checkbox,
  Radio,
  Switch,
  RadioCard,
  Input,
  SearchField,
  Pill,
  Tooltip,
  Card,
} from "zenith-ui";
import { ThemeToggle } from "./theme-toggle";
import { Demo, InstallCommand } from "./demo";

const FIGMA_URL =
  "https://www.figma.com/community/file/1647841337852944963";
const NPM_URL = "https://www.npmjs.com/package/zenith-ui";

/* ----------------------------- interactive demos ----------------------------- */

function RadioDemo() {
  const [plan, setPlan] = useState("pro");
  const options = [
    { value: "starter", label: "Starter" },
    { value: "pro", label: "Pro" },
    { value: "enterprise", label: "Enterprise" },
  ];
  return (
    <>
      {options.map((o) => (
        <Radio
          key={o.value}
          name="plan"
          label={o.label}
          checked={plan === o.value}
          onChange={() => setPlan(o.value)}
        />
      ))}
      <Radio name="plan" label="Disabled" disabled />
    </>
  );
}

function RadioCardDemo() {
  const [tier, setTier] = useState("a");
  return (
    <>
      <RadioCard
        name="tier"
        title="Starter"
        description="Enter a short description of the product here."
        pill={<Pill color="info">Free</Pill>}
        checked={tier === "a"}
        onChange={() => setTier("a")}
      />
      <RadioCard
        name="tier"
        title="Pro"
        controlSide="right"
        description="Enter a short description of the product here."
        pill={<Pill color="promo">Popular</Pill>}
        checked={tier === "b"}
        onChange={() => setTier("b")}
      />
    </>
  );
}

/* --------------------------------- sections --------------------------------- */

type SectionDef = {
  key: string;
  name: string;
  eyebrow: string;
  title: ReactNode;
  lede: string;
  content: ReactNode;
};

const SECTIONS: SectionDef[] = [
  {
    key: "overview",
    name: "Overview",
    eyebrow: "Component library",
    title: (
      <>
        Build interfaces, <em>faster</em>.
      </>
    ),
    lede:
      "Eleven accessible React components from the Zenith Figma kit. Browse them on the left, copy the code, and ship. Light and dark themes included.",
    content: (
      <>
        <div className="stage-row" style={{ gap: 12, marginBottom: 24 }}>
          <InstallCommand />
          <a
            className="btn-pill btn-pill--primary"
            href={FIGMA_URL}
            target="_blank"
            rel="noreferrer"
          >
            Open in Figma
          </a>
        </div>

        <div className="figma-card">
          <div className="figma-card__icon">
            <FigmaGlyph />
          </div>
          <div className="figma-card__body">
            <div className="figma-card__title">Designers — grab the kit</div>
            <div className="figma-card__desc">
              The full Zenith UI Kit is published to the Figma Community. Duplicate
              it and design with the same components shipped here.
            </div>
          </div>
          <a
            className="btn-pill btn-pill--ghost"
            href={FIGMA_URL}
            target="_blank"
            rel="noreferrer"
          >
            Open file
          </a>
        </div>

        <div className="feature-grid" style={{ marginTop: 18 }}>
          <div className="feature">
            <div className="feature__k">11</div>
            <div className="feature__v">Components covering 13 Figma frames</div>
          </div>
          <div className="feature">
            <div className="feature__k">2</div>
            <div className="feature__v">Light &amp; dark themes via CSS variables</div>
          </div>
          <div className="feature">
            <div className="feature__k">0</div>
            <div className="feature__v">Runtime dependencies</div>
          </div>
        </div>

        <h2 className="main__sub">Install &amp; use</h2>
        <Demo
          code={`import { Button, Pill } from "zenith-ui";
import "zenith-ui/styles.css";

export default function App() {
  return (
    <div>
      <Button>Get started</Button>
      <Pill color="success">Ready</Pill>
    </div>
  );
}`}
        >
          <Button>Get started</Button>
          <Pill color="success">Ready</Pill>
        </Demo>
      </>
    ),
  },
  {
    key: "button",
    name: "Button",
    eyebrow: "Actions",
    title: "Button",
    lede:
      "Primary, secondary and tertiary styles. Hover, keyboard-focus and disabled states are all wired up.",
    content: (
      <>
        <Demo
          code={`<Button>Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="tertiary">Tertiary</Button>
<Button disabled>Disabled</Button>`}
        >
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="tertiary">Tertiary</Button>
          <Button disabled>Disabled</Button>
        </Demo>
        <Demo code={`<Button size="sm">Small</Button>`}>
          <Button size="sm">Small</Button>
          <Button size="sm" variant="secondary">
            Small
          </Button>
          <Button block>Full width</Button>
        </Demo>
      </>
    ),
  },
  {
    key: "textbutton",
    name: "Text button",
    eyebrow: "Actions",
    title: "Text button",
    lede:
      "An inline, accent-coloured action with a leading icon. The confirmable variant flips to a green “Added” state when clicked.",
    content: (
      <Demo
        column
        code={`<TextButton>Add item</TextButton>

{/* Click to confirm → animates to a green "Added" */}
<TextButton confirmable>Add item</TextButton>`}
      >
        <div className="stage-row">
          <TextButton>Add item</TextButton>
          <TextButton disabled>Add item</TextButton>
        </div>
        <div className="stage-row">
          <TextButton confirmable>Add item</TextButton>
        </div>
      </Demo>
    ),
  },
  {
    key: "checkbox",
    name: "Checkbox",
    eyebrow: "Selection",
    title: "Checkbox",
    lede: "A native checkbox behind a styled box — keyboard and form friendly.",
    content: (
      <Demo code={`<Checkbox label="Email me updates" defaultChecked />`}>
        <Checkbox label="Email me updates" defaultChecked />
        <Checkbox label="Unchecked" />
        <Checkbox label="Disabled" disabled />
      </Demo>
    ),
  },
  {
    key: "radio",
    name: "Radio",
    eyebrow: "Selection",
    title: "Radio",
    lede: "Grouped single-select, backed by native radio inputs.",
    content: (
      <Demo
        column
        code={`<Radio name="plan" label="Pro" />`}
      >
        <RadioDemo />
      </Demo>
    ),
  },
  {
    key: "switch",
    name: "Switch",
    eyebrow: "Selection",
    title: "Switch",
    lede: "A toggle for instant on/off settings.",
    content: (
      <Demo code={`<Switch label="Notifications" defaultChecked />`}>
        <Switch label="Notifications" defaultChecked />
        <Switch label="Off" />
        <Switch label="Disabled" disabled />
      </Demo>
    ),
  },
  {
    key: "radiocard",
    name: "Radio card",
    eyebrow: "Selection",
    title: "Radio card",
    lede:
      "A richer selectable surface with a title, pill and description. Control sits left or right.",
    content: (
      <Demo
        column
        code={`<RadioCard
  name="tier"
  title="Pro"
  description="Enter a short description of the product here."
  pill={<Pill color="promo">Popular</Pill>}
/>`}
      >
        <RadioCardDemo />
      </Demo>
    ),
  },
  {
    key: "input",
    name: "Input",
    eyebrow: "Forms",
    title: "Input field",
    lede:
      "A labelled text input with a clear button that appears as soon as there's a value.",
    content: (
      <Demo
        column
        code={`<Input label="Label" placeholder="Placeholder text" />`}
      >
        <Input label="Label" placeholder="Placeholder text" />
        <Input label="With value" defaultValue="ABCde123" />
        <Input label="Disabled" defaultValue="ABCde123" disabled />
      </Demo>
    ),
  },
  {
    key: "search",
    name: "Search field",
    eyebrow: "Forms",
    title: "Search field",
    lede: "A search input with a leading magnifier and a clear button.",
    content: (
      <Demo column code={`<SearchField placeholder="Search" />`}>
        <SearchField placeholder="Search" />
        <SearchField defaultValue="ABCde123" />
      </Demo>
    ),
  },
  {
    key: "pill",
    name: "Pill",
    eyebrow: "Display",
    title: "Pill",
    lede: "Small status labels in five semantic, theme-aware colours.",
    content: (
      <Demo
        column
        code={`<Pill color="info">Info</Pill>
<Pill color="info" inverted>Info</Pill>`}
      >
        <div className="stage-row">
          <Pill color="info">Info</Pill>
          <Pill color="promo">Promo</Pill>
          <Pill color="success">Success</Pill>
          <Pill color="alert">Alert</Pill>
          <Pill color="warning">Warning</Pill>
        </div>
        <div className="stage-row">
          <Pill color="info" inverted>
            Info
          </Pill>
          <Pill color="promo" inverted>
            Promo
          </Pill>
          <Pill color="success" inverted>
            Success
          </Pill>
          <Pill color="alert" inverted>
            Alert
          </Pill>
          <Pill color="warning" inverted>
            Warning
          </Pill>
        </div>
      </Demo>
    ),
  },
  {
    key: "tooltip",
    name: "Tooltip",
    eyebrow: "Display",
    title: "Tooltip",
    lede: "Hover or focus the trigger. Points from any of four sides.",
    content: (
      <Demo
        code={`<Tooltip side="top" title="Heading" content="Enter a short text description here.">
  <Button variant="secondary">Hover me</Button>
</Tooltip>`}
      >
        <Tooltip side="top" title="Heading" content="Enter a short text description here.">
          <Button variant="secondary">Top</Button>
        </Tooltip>
        <Tooltip side="bottom" title="Heading" content="Enter a short text description here.">
          <Button variant="secondary">Bottom</Button>
        </Tooltip>
        <Tooltip side="left" title="Heading" content="Short description.">
          <Button variant="secondary">Left</Button>
        </Tooltip>
        <Tooltip side="right" title="Heading" content="Short description.">
          <Button variant="secondary">Right</Button>
        </Tooltip>
      </Demo>
    ),
  },
  {
    key: "card",
    name: "Card",
    eyebrow: "Display",
    title: "Card",
    lede: "A composable surface — image, bullet list or stacked sections.",
    content: (
      <Demo column>
        <div className="stage-grid">
          <Card>
            <Card.Image />
            <div>
              <Card.Title>Heading</Card.Title>
              <Card.Description>And a short description.</Card.Description>
            </div>
          </Card>
          <Card>
            <div>
              <Card.Title>Heading</Card.Title>
              <Card.Description>And a short description.</Card.Description>
            </div>
            <Card.List
              items={[
                "Bullet point 1",
                "Bullet point 2",
                "Bullet point 3",
                "Bullet point 4",
              ]}
            />
            <Button block>Button</Button>
          </Card>
          <Card>
            {["Heading 1", "Heading 2", "Heading 3"].map((h) => (
              <Card.Section key={h}>
                <Card.Title style={{ fontSize: 20 }}>{h}</Card.Title>
                <Card.Description>And a short description.</Card.Description>
              </Card.Section>
            ))}
          </Card>
        </div>
      </Demo>
    ),
  },
];

const GROUPS: { label: string; keys: string[] }[] = [
  { label: "Get started", keys: ["overview"] },
  { label: "Actions", keys: ["button", "textbutton"] },
  { label: "Selection", keys: ["checkbox", "radio", "switch", "radiocard"] },
  { label: "Forms", keys: ["input", "search"] },
  { label: "Display", keys: ["pill", "tooltip", "card"] },
];

/* ---------------------------------- page ---------------------------------- */

export default function Home() {
  const [active, setActive] = useState("overview");

  useEffect(() => {
    const fromHash = window.location.hash.slice(1);
    if (fromHash && SECTIONS.some((s) => s.key === fromHash)) {
      setActive(fromHash);
    }
  }, []);

  function select(key: string) {
    setActive(key);
    history.replaceState(null, "", `#${key}`);
    document.querySelector(".main")?.scrollTo({ top: 0 });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const section = SECTIONS.find((s) => s.key === active) ?? SECTIONS[0];
  const byKey = Object.fromEntries(SECTIONS.map((s) => [s.key, s]));

  return (
    <>
      <header className="bar">
        <div className="nav-wrap">
          <div className="nav-inner">
            <a
              className="nav-logo"
              href="#overview"
              onClick={(e) => {
                e.preventDefault();
                select("overview");
              }}
            >
              Zenith UI
            </a>
            <nav className="nav-links">
              <a
                className="nav-btn"
                href={FIGMA_URL}
                target="_blank"
                rel="noreferrer"
              >
                Figma <ArrowIcon />
              </a>
              <a
                className="nav-btn"
                href={NPM_URL}
                target="_blank"
                rel="noreferrer"
              >
                npm <ArrowIcon />
              </a>
              <div className="nav-divider" />
              <ThemeToggle />
            </nav>
          </div>
        </div>
      </header>

      <div className="docs">
        <aside className="side">
          {GROUPS.map((group) => (
            <div className="side__group" key={group.label}>
              <div className="side__label">{group.label}</div>
              {group.keys.map((key) => (
                <button
                  key={key}
                  className={
                    "side__item" + (active === key ? " side__item--active" : "")
                  }
                  onClick={() => select(key)}
                >
                  <span className="side__dot" />
                  {byKey[key].name}
                </button>
              ))}
            </div>
          ))}
        </aside>

        <main className="main">
          {section.key === "overview" && (
            <span className="main__eyebrow">{section.eyebrow}</span>
          )}
          <h1 className="main__title">{section.title}</h1>
          <p className="main__lede">{section.lede}</p>
          {section.content}
        </main>
      </div>
    </>
  );
}

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      aria-hidden
    >
      <path d="M7 7h10v10M7 17 17 7" />
    </svg>
  );
}

function FigmaGlyph({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M8.5 24a3.5 3.5 0 0 0 3.5-3.5V17H8.5a3.5 3.5 0 1 0 0 7Z" fill="#0ACF83" />
      <path d="M5 12a3.5 3.5 0 0 1 3.5-3.5H12v7H8.5A3.5 3.5 0 0 1 5 12Z" fill="#A259FF" />
      <path d="M5 4.5A3.5 3.5 0 0 1 8.5 1H12v7H8.5A3.5 3.5 0 0 1 5 4.5Z" fill="#F24E1E" />
      <path d="M12 1h3.5a3.5 3.5 0 1 1 0 7H12V1Z" fill="#FF7262" />
      <path d="M19 12a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" fill="#1ABCFE" />
    </svg>
  );
}
