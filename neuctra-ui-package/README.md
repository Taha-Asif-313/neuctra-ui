
# @neuctra/ui

A modern, customizable, and fully responsive React UI component library built with Tailwind CSS, TypeScript, and Vite.

> ⚡ Rapidly build accessible and beautiful interfaces using clean, developer-friendly components.

---

## 📦 Installation

### Using npm

```bash
npm install @neuctra/ui
````

### Using yarn

```bash
yarn add @neuctra/ui
````



## 🧱 Usage

Import and use any component:

```tsx
import { Button, Dropdown, Input } from '@neuctra/ui';

export default function App() {
  return (
    <div className="p-4">
      <Button>Click Me</Button>

      <Dropdown
        options={[
          { label: 'Option 1', value: '1' },
          { label: 'Option 2', value: '2' },
        ]}
        placeholder="Select an option"
      />

      <Input placeholder="Type here..." />
    </div>
  );
}
```

---

## 🎨 Customization

Components support rich props like:

* `className` for Tailwind overrides
* Color, padding, margin, radius, shadow via props
* Icon support (via `lucide-react` or `react-icons`)
* Controlled or uncontrolled components
* Transition and animation props

Each component is designed with flexibility and accessibility in mind.

---

## 📚 Components

> Full documentation coming soon

* `Button`
* `Input`
* `TextArea`
* `Dropdown`
* `AudioPlayer`
* `VideoPlayer`
* `Accordion`
* `Drawer`
* `Alert`
* More coming...

---


## 📄 License

MIT © [Taha Asif](https://github.com/Taha-Asif-313)

---

## 🌐 Links

* [GitHub Repository](https://github.com/Taha-Asif-313/neuctra-ui)
* [NPM Package](https://www.npmjs.com/package/@neuctra/ui)
* [Documentation (coming soon)](https://neuctra-ui.vercel.app)
